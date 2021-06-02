import { styled } from './modules.js'

const Button = styled.button`
  box-sizing: border-box;
  color: #000;
  border: solid 2px #000;
  border-radius: 2px;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: unset;
  line-height: 1.75rem;
  min-height: 2.5rem;
  min-width: 9rem;
  transition-property: background-color, color, transform;
  transition-duration: 200ms;
  padding: 0 1.5rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;

  &:hover {
    color: #fff;
    background-color: #000;
  }

  &:active {
    transform: scale(0.95, 0.95);
    color: #fff;
    background-color: #000;
  }
`

export default Button