import { html, Link, styled } from './modules.js'
import Icon from './Icon.js'
import Button from './Button.js'

const MenuContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 25vh 0;
  align-items: center;
  min-width: fit-content;
  flex-direction: column;
  min-height: 100vh;
`

export default function Menu() {
    return html`
        <${MenuContainer}>
            <${Icon} />
            <${Link} to="/5">
            <${Button} style=${{ marginTop: '1rem' }}>五子棋</Button>
            </Link>
            <${Link} to="/6">
            <${Button} style=${{ marginTop: '.5rem' }}>六子棋</Button>
            </Link>
        </MenuContainer>
    `
}