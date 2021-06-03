import { html, Link, styled } from './modules.js'
import Icon from './Icon.js'
import Button from './Button.js'
import { SIZE_TYPE, useDispatch, useSelector } from './context.js'

const MenuContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 25vh 0;
  align-items: center;
  min-width: fit-content;
  flex-direction: column;
  min-height: 100vh;
`

const SizeInputContainer = styled.div`
  margin: 2rem 0 1rem;
  font-size: 1.25rem;
  display: flex;
  gap: .5rem;

  & > label {
    display: flex;
    align-items: center;

    & > input {
      width: 1.125rem;
      height: 1.5rem;
    }
  }
`

export default function Menu() {

    const size = useSelector(state => state.size)
    const dispatch = useDispatch()

    function handleSelectSize(ev) {
        dispatch({ type: 'setSize', payload: Number(ev.target.value) })
    }

    return html`
        <${MenuContainer}>
            <${Icon} />
            <${SizeInputContainer}>
                ${Object.values(SIZE_TYPE).map((it => {
                    return html`
                        <label>
                            <input name="size"
                                   checked=${it === size}
                                   onChange=${handleSelectSize} type="radio" value=${it} />
                            <span>${it} x ${it}</span>
                        </label>
                    `
                }))}
            </SizeInputContainer>
            <${Link} to="/5">
            <${Button} style=${{ marginTop: '.5rem' }}>五子棋</Button>
            </Link>
            <${Link} to="/6">
            <${Button} style=${{ marginTop: '.5rem' }}>六子棋</Button>
            </Link>
        </MenuContainer>
    `
}