import { html, styled, useState, useEffect, render, createElement } from './modules.js'

const BLACK = 'BLACK'
const WHITE = 'WHITE'
const SIZE = 15

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
  text-shadow: 1px 1px 3px rgb(36 37 47 / 25%);
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

function Lattice(props) {

    return html`
        <${Box}>
            <${LineX} />
            <${LineY} />
            <${Piece} color=${props.color} onMouseDown="${props.onPut}" />
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

const Tip = styled.div`
  position: fixed;
  font-size: 72px;
  z-index: 1;
  font-weight: 700;
  color: white;
  transition: opacity 300ms;
  ${props => {
    if (props.visible) {
      return styled.css`
        opacity: 1;
      `
    } else {
      return styled.css`
        opacity: 0;
      `
    }
  }}
  ${props => {
    switch (props.location) {
      case 'LEFT':
        return styled.css`
          left: 120px;
          top: 40px;
        `
      case 'RIGHT':
        return styled.css`
          right: 80px;
          top: 40px;
        `
    }
  }}
`

function FadeTip(props) {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 1000)
    }, [])

    if (props.color === WHITE) {
        return html`
            <${Tip} location="RIGHT" visible=${visible}>咚！</Tip>
        `
    }

    if (props.color === BLACK) {
        return html`
            <${Tip} location="LEFT" visible=${visible}>啪！</Tip>
        `
    }
}

async function showTip(color) {
    const div = document.createElement('div')
    document.body.insertAdjacentElement('afterbegin', div)
    render(html`
        <${FadeTip} color=${color}/>
    `, div)
    setTimeout(() => {
        div.remove()
    }, 2000)

}

const Board = styled.div`
  display: grid;
  padding: 30px;
  margin: 0 auto;
  background-color: #d2d2d2;
  grid-template-columns: repeat(15, 60px);
  grid-template-rows: repeat(15, 60px);
  width: fit-content;
`

export default function App(props) {

    const [table, setTable] = useState(Array.from({ length: SIZE }).map(() => Array.from({ length: SIZE }).map(() => ({}))))
    const [currentColor, setCurrentColor] = useState(BLACK)

    async function handlePut(gi, ii) {
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
        await showTip(currentColor)
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