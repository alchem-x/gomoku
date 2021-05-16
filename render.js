import { html, render } from './modules.js'
import App from './App.js'

render(html`
    <${App} />
`, document.querySelector('#app'))
