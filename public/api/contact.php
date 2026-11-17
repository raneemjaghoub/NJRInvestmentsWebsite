<?php
// SiteGround PHP endpoint. No SMTP credentials are sent to the browser.
declare(strict_types=1);
header('Content-Type: application/json');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$reference = 'NJR-' . strtoupper(bin2hex(random_bytes(4)));
function respond(int $status, array $body): void { http_response_code($status); echo json_encode($body); exit; }
function fail(int $status, string $message, string $code): void { global $reference; respond($status, ['success'=>false, 'message'=>$message, 'reference'=>"$reference-$code"]); }
// A per-IP counter also limits clients that discard their session cookie.
function allowed(string $kind, int $maximum): bool {
    $file = sys_get_temp_dir() . '/njr-form-' . hash('sha256', __DIR__ . ($_SERVER['REMOTE_ADDR'] ?? '') . $kind);
    $handle = fopen($file, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) return false;
    $entry = json_decode(stream_get_contents($handle), true);
    if (!is_array($entry) || ($entry['expires'] ?? 0) < time()) $entry = ['count'=>0, 'expires'=>time()+600];
    $entry['count']++;
    ftruncate($handle, 0); rewind($handle); fwrite($handle, json_encode($entry)); flock($handle, LOCK_UN); fclose($handle);
    return $entry['count'] <= $maximum;
}
try {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]) fail(403, 'Please submit from the website.', 'ORIGIN');
    session_name('njr_captcha');
    session_start(['use_strict_mode'=>true, 'cookie_httponly'=>true, 'cookie_secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', 'cookie_samesite'=>'Strict', 'cookie_path'=>'/api', 'cookie_lifetime'=>600]);
    $method = $_SERVER['REQUEST_METHOD'] ?? '';
    if ($method === 'GET') {
        if (!allowed('challenge', 60)) fail(429, 'Too many code requests. Please wait ten minutes.', 'RATE');
        $glyphs = json_decode(file_get_contents(__DIR__.'/glyphs.json'), true, 512, JSON_THROW_ON_ERROR);
        $alphabet = array_keys($glyphs); $code = '';
        for ($i=0; $i<6; $i++) $code .= $alphabet[random_int(0, count($alphabet)-1)];
        $_SESSION['captcha'] = ['hash'=>hash('sha256', $code), 'expires'=>time()+300];
        session_write_close();
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72"><rect width="240" height="72" fill="#f4f0e5"/>';
        for ($i=0; $i<10; $i++) $svg .= '<path d="M'.random_int(0,239).' '.random_int(0,71).'L'.random_int(0,239).' '.random_int(0,71).'" stroke="#d8ceae" stroke-width="1"/>';
        foreach (str_split($code) as $i=>$char) {
            $svg .= '<g fill="#35372e" transform="translate('.(14+$i*37).' '.(18+random_int(-3,3)).') rotate('.random_int(-9,9).' 12 18)">';
            foreach ($glyphs[$char] as $y=>$row) foreach (str_split($row) as $x=>$pixel) if ($pixel==='1') $svg .= '<rect x="'.($x*4).'" y="'.($y*5).'" width="4.3" height="5.3"/>';
            $svg .= '</g>';
        }
        respond(200, ['image'=>'data:image/svg+xml;base64,'.base64_encode($svg.'</svg>')]);
    }
    if ($method !== 'POST') { header('Allow: GET, POST'); fail(405, 'Unsupported request.', 'METHOD'); }
    if (!allowed('send', 10)) fail(429, 'Too many attempts. Please wait ten minutes.', 'RATE');
    if (strpos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) fail(415, 'Invalid request.', 'FORMAT');
    $body = file_get_contents('php://input', false, null, 0, 20001);
    if (strlen($body)>20000) fail(413, 'Your message is too long.', 'SIZE');
    $data = json_decode($body, true);
    if (!is_array($data)) fail(400, 'Invalid request.', 'FORMAT');
    if (!empty($data['_honey'])) fail(400, 'Your enquiry could not be verified.', 'VERIFY');
    $challenge = $_SESSION['captcha'] ?? null; unset($_SESSION['captcha']); session_write_close();
    $supplied = is_string($data['captchaCode'] ?? null) ? strtoupper(trim($data['captchaCode'])) : '';
    if (!$challenge || $challenge['expires'] < time() || !hash_equals($challenge['hash'], hash('sha256', $supplied))) fail(422, 'The security code is incorrect or has expired. Enter the new code and try again.', 'CAPTCHA');
    $text = static function(string $key) use ($data): string { return is_string($data[$key] ?? null) ? trim($data[$key]) : ''; };
    $name=$text('fullName'); $email=$text('email'); $message=$text('message'); $company=$text('company'); $phone=$text('phone'); $type=$text('enquiryType');
    $countries=json_decode(file_get_contents(__DIR__.'/countries.json'), true, 512, JSON_THROW_ON_ERROR); $country=null;
    foreach ($countries as $item) if ($item['code']===$text('country')) $country=$item['name'];
    if (!$name || strlen($name)>480 || !filter_var($email,FILTER_VALIDATE_EMAIL) || strlen($email)>254 || !$message || strlen($message)>16000 || strlen($company)>640 || strlen($phone)>160 || !$country || ($data['consent']??false)!==true || !in_array($type,['Advisory services','Strategic connections','Joint ventures','Other'],true)) fail(422,'Please check the required fields and try again.','FIELDS');
    $payload=['_url'=>'https://www.njrinvestments.net/contact/','_subject'=>"NJR Investments | New enquiry — $type",'_template'=>'table','_captcha'=>'false','_replyto'=>$email,'Submission reference'=>$reference,'Enquiry type'=>$type,'Name'=>$name,'email'=>$email,'Company'=>$company?:'Not provided','Phone'=>$phone?:'Not provided','Country'=>$country,'Message'=>$message,'Consent'=>'Agreed to using these details to respond to this enquiry'];
    $config=json_decode(file_get_contents(__DIR__.'/contact-config.json'), true, 512, JSON_THROW_ON_ERROR);
    $recipient=$config['recipientEmail'] ?? '';
    if (!is_string($recipient) || !filter_var($recipient,FILTER_VALIDATE_EMAIL)) fail(500,'The enquiry service is not configured correctly. Please email us directly.','CONFIG');
    $curl=curl_init('https://formsubmit.co/ajax/'.rawurlencode($recipient));
    $addresses=dns_get_record('formsubmit.co', DNS_A);
    if (!$addresses) fail(502,'The email service could not be reached. Please try again shortly.','DNS');
    curl_setopt($curl, CURLOPT_RESOLVE, ['formsubmit.co:443:'.$addresses[0]['ip']]);
    curl_setopt_array($curl,[CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>json_encode($payload),CURLOPT_HTTPHEADER=>['Content-Type: application/json','Accept: application/json','Origin: https://www.njrinvestments.net','Referer: https://www.njrinvestments.net/contact/','X-Requested-With: XMLHttpRequest'],CURLOPT_RETURNTRANSFER=>true,CURLOPT_CONNECTTIMEOUT=>5,CURLOPT_TIMEOUT=>45,CURLOPT_PROTOCOLS=>CURLPROTO_HTTPS]);
    $response=curl_exec($curl); $status=curl_getinfo($curl,CURLINFO_HTTP_CODE); $curlError=curl_errno($curl); curl_close($curl);
    if ($curlError === CURLE_OPERATION_TIMEDOUT) fail(502,'The email service took too long to respond. Your details have been kept. Please try again shortly.','EMAIL_TIMEOUT');
    $result=is_string($response)?json_decode($response,true):null;
    if ($status<200 || $status>=300 || !in_array($result['success']??false,[true,'true'],true) || preg_match('/activat|confirm your email/i',$result['message']??'')) fail(502,'Email delivery could not be confirmed. Please try again later or email us directly.','DELIVERY');
    respond(200,['success'=>true,'reference'=>$reference]);
} catch (Throwable $error) { fail(502,'Your enquiry could not be sent. Please try again shortly.','SEND'); }
