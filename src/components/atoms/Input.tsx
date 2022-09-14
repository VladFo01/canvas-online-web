import styled from '@emotion/styled'

interface BlockProps {
  type: string
  value: string | number
  onChange?: (event: any) => void
  id?: string
  disabled?: boolean
  placeholder?: string
  min?: string
  max?: string
  step?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  margin?: string
  border?: string
  width?: string
  height?: string
}

const BlockStyled = styled.input<BlockProps>`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

const Input = (props: BlockProps) => {
  return <BlockStyled {...props}></BlockStyled>
}

export default Input
