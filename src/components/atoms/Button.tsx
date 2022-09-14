import { ReactNode } from 'react'
import styled from '@emotion/styled'

export interface BlockProps {
  children?: ReactNode | string
  onClick?: (event: any) => void
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
  border?: string
}

const BlockStyled = styled.button<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
`

const Button = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Button
