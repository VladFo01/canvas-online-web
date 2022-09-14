import { ReactNode } from 'react'
import styled from '@emotion/styled'

export interface BlockProps {
  children: ReactNode
  for: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
}

const BlockStyled = styled.label<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
`
const Label = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Label
