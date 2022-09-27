import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Flex from '../atoms/Flex'
import { useDispatch } from 'react-redux'
import { pushToUndo, setCanvas } from '../../store/slices/canvasSlice'

interface BlockProps {
  id?: string
  onMouseDown?: (e: any) => void
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
  }, []);

  const onMouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current?.toDataURL()));
  }

  return (
    <Flex justifyContent='center' alignItems='center'>
      <BlockStyled
        onMouseDown={onMouseDownHandler}
        ref={canvasRef}
        {...props}
      ></BlockStyled>
    </Flex>
  )
}

export default Canvas
