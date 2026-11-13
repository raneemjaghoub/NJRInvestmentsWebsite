import './office-map.css'

export default function OfficeMap({ className }: { className: string }) {
  return <div className={`${className} office-map`}>
    <iframe
      title="Map: Business Central Towers, Dubai Media City"
      src="https://maps.google.com/maps?q=Business%20Central%20Towers%20Tower%20B%20Dubai%20Media%20City&t=m&z=16&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
}
