import { ReactNode } from 'react'
import styled from '@emotion/styled'

interface BlockProps {
  children?: ReactNode | any
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

const Button = (props: BlockProps) => {
  return <BlockStyled {...props}></BlockStyled>
}
