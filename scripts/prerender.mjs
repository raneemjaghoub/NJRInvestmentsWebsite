import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { render, pages, pageMetadata, canonicalPath, siteUrl, structuredData } from '../.prerender/entry-server.js'
const template = await readFile('dist/index.html', 'utf8')
const staging = process.env.VITE_SITE_ENV === 'staging'
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const files = await readdir('dist/assets')
const fonts = ['mulish-latin-400-normal-', 'playfair-display-latin-400-normal-'].map(prefix => files.find(file => file.startsWith(prefix) && file.endsWith('.woff2'))).filter(Boolean)
function head(path) {
 const meta = pageMetadata(path)
 const canonical = siteUrl + canonicalPath(path)
 const known = path in pages
 const tags = [
  `<title>${escape(meta.title)}</title>`,
  `<meta name="description" content="${escape(meta.description)}">`,
  `<meta name="robots" content="${staging || !known ? 'noindex, nofollow' : 'index, follow'}">`,
  `<link rel="canonical" href="${canonical}">`,
 ]
 for (const [key,value] of Object.entries({'og:type':'website','og:site_name':'NJR Investments','og:locale':'en_AE','og:title':meta.title,'og:description':meta.description,'og:url':canonical,'og:image':siteUrl+'/assets/njr-social.png','og:image:width':'1200','og:image:height':'630','og:image:alt':'NJR Investments — partners for business across the Gulf, Dubai, UAE'})) tags.push(`<meta property="${key}" content="${escape(value)}">`)
 for (const [key,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':siteUrl+'/assets/njr-social.png'})) tags.push(`<meta name="${key}" content="${escape(value)}">`)
 for(const font of fonts) tags.push(`<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>`)
 if(path==='/') tags.push('<link rel="preload" as="image" href="/assets/imgHero-1024.webp" imagesrcset="/assets/imgHero-768.webp 768w, /assets/imgHero-1024.webp 1024w" imagesizes="100vw" media="(min-width: 600px)">','<link rel="preload" as="image" href="/assets/hero-mobile-780.webp" imagesrcset="/assets/hero-mobile-390.webp 390w, /assets/hero-mobile-780.webp 780w" imagesizes="100vw" media="(max-width: 599px)">')
 tags.push(`<script id="njr-structured-data" type="application/ld+json">${JSON.stringify(structuredData(path)).replaceAll('<','\\u003c')}</script>`)
 return tags.join('\n    ')
}
for (const path of [...Object.keys(pages), '/404']) {
 let html=template.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'')
 html=html.replace('</head>',head(path)+'\n  </head>').replace('<div id="root"></div>',`<div id="root" data-prerender-path="${path}">${render(path)}</div>`)
 const target=path==='/404'?'dist/404.html':path==='/'?'dist/index.html':`dist${path}/index.html`
 await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true})
 await writeFile(target,html)
}
const urls=Object.keys(pages).map(path=>`  <url><loc>${siteUrl+canonicalPath(path)}</loc></url>`).join('\n')
await writeFile('dist/sitemap-pages.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile('dist/sitemap_index.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${siteUrl}/sitemap-pages.xml</loc></sitemap></sitemapindex>\n`)
await writeFile('dist/robots.txt',staging?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap_index.xml\n`)
const redirects=staging?'':`RewriteCond %{HTTP_HOST} !^www\\.njrinvestments\\.net$ [NC]\nRewriteRule ^ https://www.njrinvestments.net%{REQUEST_URI} [R=301,L,NE]\n\nRewriteCond %{HTTPS} !=on\nRewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]\nRewriteRule ^ https://www.njrinvestments.net%{REQUEST_URI} [R=301,L,NE]\n\n`
await writeFile('dist/.htaccess',`Options -Indexes\nDirectoryIndex index.html\nErrorDocument 404 /404.html\n<IfModule mod_rewrite.c>\nRewriteEngine On\n${redirects}# Canonical trailing-slash URLs for the six static pages.\nRewriteRule ^(about|what-we-do|contact|privacy-policy|terms-of-use)$ /$1/ [R=301,L]\n# Add verified old URL redirects here before launch.\n</IfModule>\n<IfModule mod_headers.c>\n${staging?'Header set X-Robots-Tag "noindex, nofollow"\n':''}</IfModule>\n`)
console.log(`Prerendered six pages and 404; ${staging?'staging is noindex':'production is indexable'}.`)
