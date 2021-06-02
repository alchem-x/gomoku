import { html, render } from './modules.js'
import App from './App.js'
import { ContextProvider } from './context.js'

render(html`
    <${ContextProvider}>
        <${App} />
    </ContextProvider>
`, document.querySelector('#app'))
