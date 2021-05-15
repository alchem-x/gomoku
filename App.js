import { html, styled, useState } from './modules.js'
import { showTip, TIP_TYPE } from './tip.js'

const PIECE_COLOR = {
    BLACK: 'BLACK',
    WHITE: 'WHITE',
}

const SIZE = 15

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
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
  background-color: #6e6e6e;
`

const LineY = styled.span`
  position: absolute;
  width: 4px;
  height: 100%;
  left: calc(50% - 2px);
  background-color: #6e6e6e;
`

const Piece = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 24px;
  background-color: #fff;
  text-shadow: 1px 1px 3px rgb(36 37 47 / 25%);
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
        <${Box} onMouseDown="${props.onPut}" empty=${!props.color}>
            <${LineX} />
            <${LineY} />
            ${props.color && html`
                <${Piece} color=${props.color} />
            `}
        </Box>
    `
}

function nextColor(color) {
    if (color === PIECE_COLOR.BLACK) {
        return PIECE_COLOR.WHITE
    }
    if (color === PIECE_COLOR.WHITE) {
        return PIECE_COLOR.BLACK
    }
}


const Board = styled.div`
  display: grid;
  padding: 30px;
  margin: 0 auto;
  grid-template-columns: repeat(15, 50px);
  grid-template-rows: repeat(15, 50px);
  width: fit-content;
`

function getTipType(color) {
    if (color === PIECE_COLOR.BLACK) {
        return TIP_TYPE.LEFT
    }
    if (color === PIECE_COLOR.WHITE) {
        return TIP_TYPE.RIGHT
    }
}

function initialTable() {
    return Array.from({ length: SIZE }).map(() => Array.from({ length: SIZE }).map(() => ({})))
}

export default function App(props) {

    const [table, setTable] = useState(initialTable())
    const [currentColor, setCurrentColor] = useState(PIECE_COLOR.BLACK)

    function handlePut(gi, ii) {
        if (table[gi][ii].color) {
            return
        }
        setTable(table.map((group, groupIndex) => {
            if (groupIndex !== gi) {
                return group
            } else {
                return group.map((item, itemIndex) => {
                    if (itemIndex !== ii) {
                        return item
                    } else if (!item.color) {
                        setCurrentColor(nextColor(currentColor))
                        return { ...item, color: currentColor }
                    } else {
                        return item
                    }
                })
            }
        }))

        showTip(getTipType(currentColor))
    }

    return html`
        <${Board}>
            ${table.map((group, groupIndex) => html`
                        ${group.map((item, itemIndex) => {
                            return html`
                                <${Lattice} color="${item.color}" onPut="${() => handlePut(groupIndex, itemIndex)}" />
                            `
                        })}
                    `
            )}
        </Board>
    `
}
