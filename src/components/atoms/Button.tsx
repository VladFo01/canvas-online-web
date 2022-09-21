import { ReactNode, RefObject } from 'react'
import styled from '@emotion/styled'

interface BlockProps {
  children?: ReactNode | string
  onClick?: (event: any) => void
  backgroundImage?: string
  ref?: RefObject<HTMLButtonElement>
  id?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
  border?: string
  width?: string
  height?: string
  style?: object | null
}

const BlockStyled = styled.button<BlockProps>`
  background: url('${(props) => props.backgroundImage}') no-repeat center center;
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
`

const Button = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Button
