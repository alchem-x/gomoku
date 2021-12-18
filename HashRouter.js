import { html, Router, useEffect, useState } from './modules.js'

const navigate = (to) => (window.location.hash = to)
const currentLocation = () => (window.location.hash.replace(/^#/, '') || '/')

function useHashLocation() {
    const [loc, setLoc] = useState(currentLocation())

    useEffect(() => {
        const handler = () => setLoc(currentLocation())
        window.addEventListener('hashchange', handler)
        return () => window.removeEventListener('hashchange', handler)
    }, [])

    return [loc, navigate]
}

export default function HashRouter(props) {
    return html`
        <${Router} ...${props} hook=${useHashLocation}></Router>
    `
}