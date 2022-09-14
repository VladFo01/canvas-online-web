import { ReactNode } from 'react'
import styled from '@emotion/styled'

interface BlockProps {
  children: ReactNode | any
  onClick?: (event: any) => void
  justifyContent?: string
  alignItems?: string
  flexDirection?: string
  padding?: string
  boxShadow?: string
  width?: string
  height?: string
}

const BlockStyled = styled.div<BlockProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
  padding: ${(props) => props.padding};
  box-shadow: ${(props) => props.boxShadow};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

const Flex = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Flex
