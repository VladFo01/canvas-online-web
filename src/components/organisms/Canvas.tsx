import styled from '@emotion/styled'
import Flex from '../atoms/Flex'

interface BlockProps {
  id?: string
  width?: string
  height?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
}

const BlockStyled = styled.canvas<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
  border: 2px solid #000;
`

const Canvas = (props: BlockProps) => {
  return (
    <Flex justifyContent='center' alignItems='center'>
      <BlockStyled {...props}></BlockStyled>
    </Flex>
  )
}

export default Canvas
