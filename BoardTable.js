import { html, Link, styled, useRef } from './modules.js'
import { MAP_56, PIECE_COLOR, useDispatch, useSelector } from './context.js'
import Button from './Button.js'

const LatticeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  ${props => {
    if (props.empty) {
      return styled.css`
        cursor: pointer;
      `
    } else {
      return styled.css`
        cursor: not-allowed;
      `
    }
  }}
`

const LineX = styled.span`
  position: absolute;
  height: 4px;
  width: 100%;
  top: calc(50% - 2px);
  background-color: #000;
  opacity: .7;
`

const LineY = styled.span`
  position: absolute;
  width: 4px;
  height: 100%;
  left: calc(50% - 2px);
  background-color: #000;
  opacity: .7;
`

const Piece = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
  ${props => {
    switch (props.color) {
      case PIECE_COLOR.BLACK:
        return styled.css`
          background-color: #000;
        `
      case PIECE_COLOR.WHITE:
        return styled.css`
          background-color: #fff;
        `
    }
  }}
`

function Lattice(props) {

    return html`
        <${LatticeContainer} onMouseDown=${props.onPut} empty=${!props.color}>
            <${LineX} />
            <${LineY} />
            ${props.color && html`
                <${Piece} color=${props.color} />
            `}
        </LatticeContainer>
    `
}

const BoardContainer = styled.div`
  position: relative;
  display: grid;
  padding: 16px;
  ${props => {
    return styled.css`
      grid-template-columns: repeat(${props.size}, 44px);
      grid-template-rows: repeat(${props.size}, 44px);
    `
  }}
`

const WinnerTipBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 1;
  top: 20%;
  left: 0;
  right: 0;
  text-align: center;
`

const WinnerTipText = styled.span`
  border-radius: 10px;
  padding: 8px 32px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.10);
  font-weight: 700;
  font-size: 72px;
  color: #000;
  opacity: .9;
  cursor: default;
`

function WinnerTip(props) {
    if (!props.winnerColor) {
        return ''
    }
    let colorText
    switch (props.winnerColor) {
        case PIECE_COLOR.BLACK:
            colorText = '黑'
            break
        case PIECE_COLOR.WHITE:
            colorText = '白'
            break
    }
    return html`
        <${WinnerTipBox}>
            <${WinnerTipText}>${MAP_56[props.type]}子连珠：${colorText}胜</WinnerTipText>
        </WinnerTipBox>
    `
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  gap: 16px;
`

const Sidebar = styled.div`
  padding: 16px;
`

const TipContainer = styled.div`
  position: absolute;
  inset: 0;
`

const BoardLabel = styled.div`
  cursor: default;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
  color: #000;
  opacity: .7;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
`

export default function BoardTable(props) {

    const type = props.type
    const tipContainerRef = useRef()

    const dispatch = useDispatch()
    const table = useSelector(state => state.table)
    const tableHistory = useSelector(state => state.tableHistory)
    const currentColor = useSelector(state => state.currentColor)
    const size = useSelector(state => state.size)
    const winnerColor = useSelector(state => state.winnerColor)

    function resetTable() {
        dispatch({ type: 'resetTable' })
    }

    function handlePut(gi, ii) {
        dispatch({
            type: 'putPiece' + type,
            payload: [gi, ii],
        })
    }


    function repentanceStep() {
        dispatch({ type: 'repentanceStep' + type })
    }

    return html`
        <${Container}>
            <${Content}>
                <${BoardContainer} size=${size}>
                    <${WinnerTip} type=${type} winnerColor=${winnerColor} />
                    <${TipContainer} ref=${tipContainerRef} />
                    ${table.map((group, groupIndex) => html`
                                ${group.map((item, itemIndex) => {
                                    return html`
                                        <${Lattice} color=${item.color} onPut=${() => handlePut(groupIndex, itemIndex)} />
                                    `
                                })}
                            `
                    )}
                </BoardContainer>
                <${Sidebar}>
                    <${Piece} color=${currentColor} style=${{ marginTop: '2rem' }} />
                    <${BoardLabel} style=${{ marginTop: '1rem' }}>棋盘：${size} x ${size}</BoardLabel>
                    <${BoardLabel} style=${{ marginTop: '1rem' }}>胜利：${MAP_56[type]}子连珠</BoardLabel>
                    <${Link} to="/">
                    <${Button} onClick=${resetTable} style=${{ marginTop: '1.5rem' }}>返回菜单</Button>
                    </Link>
                    ${tableHistory.length > 1 && html`
                        <br />
                        <${Button} onClick=${resetTable} style=${{ marginTop: '1.5rem' }}>
                            再来一局
                        </Button>
                        <br />
                        <${Button} style=${{ marginTop: '.5rem' }} onClick=${repentanceStep}>
                            悔棋一步
                        </Button>
                    `}
                </Sidebar>
            </Content>
        </Container>
    `
}


