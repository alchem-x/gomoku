import { html, styled, HashRouter as Router, Route, Switch, Suspense, lazy } from './modules.js'
import Icon from './Icon.js'

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh;
  font-size: 1.125rem;
  line-height: 1.75rem;
`

const LoadingText = styled.span`
  color: #000;
  margin-top: .5rem;
  font-size: 1.25rem;
  font-weight: 500;
`

const loading = html`
    <${CenterBox}>
        <${Icon} />
        <${LoadingText}>Loading...</LoadingText>
    </CenterBox>
`

const Menu = lazy(() => import('./Menu.js'))
const BoardTable = lazy(() => import('./BoardTable.js'))

export default function App(props) {

    return html`
        <${Router}>
            <${Suspense} fallback=${loading}>
                <${Switch}>
                    <${Route} path="/" exact>
                        <${Menu} />
                    </Route>
                    <${Route} path="/5">
                        <${BoardTable} type="5" />
                    </Route>
                    <${Route} path="/6">
                        <${BoardTable} type="6" />
                    </Route>
                    <${Route} path="*">
                        <div>No match route</div>
                    </Route>
                </Switch>
            </Suspense>
        </Router>



    `
}
