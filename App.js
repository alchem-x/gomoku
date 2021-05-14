import { html, styled, useState } from './modules.js'

const BLACK = 'BLACK'
const WHITE = 'WHITE'
const SIZE = 15

function Lattice(props) {

    const Box = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      width: 60px;
      height: 60px;
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
      ${props => {
        switch (props.color) {
          case BLACK:
            return styled.css`
              background-color: #000;
            `
          case WHITE:
            return styled.css`
              background-color: #fff;
            `
          default:
            return styled.css`
              cursor: pointer;
              opacity: 0;
            `
        }
      }}
    `

    return html`
        <${Box}>
            <${LineX} />
            <${LineY} />
            <${Piece} ...${props} onClick="${props.onClick}" />
        <//>
    `
}

function nextColor(color) {
    if (color === BLACK) {
        return WHITE
    }
    if (color === WHITE) {
        return BLACK
    }
}

export default function App(props) {

    const [table, setTable] = useState(Array.from({ length: SIZE }).map(() => Array.from({ length: SIZE }).map(() => ({}))))
    const [currentColor, setCurrentColor] = useState(BLACK)

    const Board = styled.div`
      display: grid;
      padding: 30px;
      margin: 0 auto;
      background-color: #d2d2d2;
      grid-template-columns: repeat(15, 60px);
      grid-template-rows: repeat(15, 60px);
      width: fit-content;
    `

    function handleClick(gi, ii) {
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
    }

    return html`
        <${Board}>
            ${table.map((group, groupIndex) => html`
                        ${group.map((item, itemIndex) => {
                            return html`
                                <${Lattice} color="${item.color}" onClick="${() => handleClick(groupIndex, itemIndex)}" />
                            `
                        })}
                    `
            )}
        <//>
    `
}