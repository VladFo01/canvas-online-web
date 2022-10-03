/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import Flex from '../atoms/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { setCanvas } from '../../store/slices/canvasSlice'
import { useGetImageQuery, useUploadImageMutation } from '../../store/slices/apiSlice'
import { updateImage } from '../../utils/updateImage'
import { WebsocketService } from '../../utils/websocketService'
import type { WebsocketMessage } from '../../types'

interface BlockProps {
  id?: string
  onMouseDown?: () => void
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
  const { id: sessionId, socket } = useSelector((state: any) => state.session)
  const [uploadImage] = useUploadImageMutation();
  const { data, refetch, isSuccess } = useGetImageQuery({ sessionId });
  let websocketService: WebsocketService;

  useEffect(() => {
    if (socket) {
      websocketService = new WebsocketService(socket);
    }
  })

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current));

    if (sessionId && isSuccess) {
      updateImage(canvasRef.current!, data.image);
    } else {
      refetch();
    }
  }, [sessionId, isSuccess]);

  const onMouseDownHandler = useCallback(() => {
    websocketService.sendMessage<WebsocketMessage>({
      id: sessionId,
      method: 'save',
      dataUrl: canvasRef.current?.toDataURL()
    });
  }, [socket, sessionId]);

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
