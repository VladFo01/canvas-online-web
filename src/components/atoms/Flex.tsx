import { ReactNode } from 'react'
import styled from '@emotion/styled'

export interface BlockProps {
  children: ReactNode | any
  onClick?: (event: any) => void
  justifyContent?: string
  alignItems?: string
  flexDirection?: string
}

const BlockStyled = styled.div<BlockProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
`

const Flex = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Flex