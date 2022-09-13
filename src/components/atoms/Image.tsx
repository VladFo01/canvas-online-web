import styled from '@emotion/styled'

interface BlockProps {
  src: string
  alt: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
}

const BlockStyled = styled.img<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
`

const Image = (props: BlockProps) => {
  return <BlockStyled {...props}></BlockStyled>
}

export default Image
