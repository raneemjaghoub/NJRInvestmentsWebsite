import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './navigation.css'
import App from './App.tsx'
import './seo-responsive.css'

const root = document.getElementById('root')!
const application = <StrictMode><App /></StrictMode>
const prerenderPath = root.dataset.prerenderPath
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const canHydrate = prerenderPath === currentPath || (prerenderPath === '/404' && !['/', '/about', '/what-we-do', '/contact', '/privacy-policy', '/terms-of-use'].includes(currentPath))
if (root.hasChildNodes() && canHydrate) hydrateRoot(root, application)
else createRoot(root).render(application)
