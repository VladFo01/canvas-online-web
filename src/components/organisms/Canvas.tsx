import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Flex from '../atoms/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { setCanvas } from '../../store/slices/canvasSlice'
import Brush from '../../tools/Brush'
import { setTool } from '../../store/slices/toolSlice'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));
  }, [])


  return (
    <Flex justifyContent='center' alignItems='center'>
      <BlockStyled
        ref={canvasRef}
        {...props}
      ></BlockStyled>
    </Flex>
  )
}

export default Canvas
