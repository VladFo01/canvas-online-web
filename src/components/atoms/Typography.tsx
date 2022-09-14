import styled from '@emotion/styled'

interface BlockProps {
  children: string
  fontSize: string
  fontWeight?: string
  color?: string
  lineHeight?: string
  fontFamily?: string
}

const BlockStyled = styled.span<BlockProps>`
    font-size: ${(props) => props.fontSize}
    font-family: ${(props) => props.fontFamily}
    color: ${(props) => props.color}
    line-height: ${(props) => props.lineHeight}
    font-weight: ${(props) => props.fontWeight}
`

const Typography = ({ children, ...props }: BlockProps) => {
  return <BlockStyled {...props}>{children}</BlockStyled>
}

export default Typography
