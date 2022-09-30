/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import Flex from '../atoms/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { pushToUndo, setCanvas } from '../../store/slices/canvasSlice'
import { useGetImageQuery, useUploadImageMutation } from '../../store/slices/apiSlice'
import { updateImage } from '../../utils/updateImage'

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
  const sessionId = useSelector((state: any) => state.session.id);
  const [uploadImage] = useUploadImageMutation();
  const { data, refetch, isSuccess } = useGetImageQuery({ sessionId });

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));

    if (sessionId && isSuccess) {
      updateImage(canvasRef.current!, data.image);
    } else {
      refetch();
    }
  }, [sessionId, isSuccess]);

  const onMouseDownHandler = useCallback(() => {
    dispatch(pushToUndo(canvasRef.current?.toDataURL()));
  }, []);

  const onMouseUpHandler = useCallback(async () => {
    await uploadImage({
      image: canvasRef.current!.toDataURL(),
      sessionId
    })
  }, [sessionId]);

  return (
    <Flex justifyContent='center' alignItems='center'>
      <BlockStyled
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        ref={canvasRef}
        {...props}
      ></BlockStyled>
    </Flex>
  )
}

export default Canvas
