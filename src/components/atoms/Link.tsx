import styled from '@emotion/styled'

interface BlockProps {
  href?: string
  onClick?: (event: any) => void
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
}

const BlockStyled = styled.a<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
`

const Link = (props: BlockProps) => {
  return <BlockStyled {...props}></BlockStyled>
}

export default Link
