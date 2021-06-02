import { html, styled } from './modules.js'

const Image = styled.img`
  width: 100px;
  height: 100px;
`

const iconUrl = new URL('./icon.png', import.meta.url)

export default function Icon(props) {
    return html`
        <${Image} src=${iconUrl} alt="" />
    `
}