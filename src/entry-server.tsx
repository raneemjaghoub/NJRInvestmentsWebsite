import { renderToString } from 'react-dom/server'
import App from './App'
import { canonicalPath, pageMetadata, pages, siteUrl, structuredData } from './seo'
export function render(path: string) { return renderToString(<App initialLocation={path} />) }
export { canonicalPath, pageMetadata, pages, siteUrl, structuredData }
