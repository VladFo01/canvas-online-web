/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSessionId, setSocket } from '../../store/slices/sessionSlice'
import { clearRedo, pushToUndo, redo, undo } from '../../store/slices/canvasSlice'
import { WebsocketService } from '../../utils/websocketService'
import { buildConnectionTitle } from '../../utils/buildConnectionTitle'
import { drawHandler } from '../../utils/drawHandler'

import Canvas from '../organisms/Canvas'
import SettingBar from '../organisms/SettingBar'
import Toolbar, { ToolbarProps } from '../organisms/Toolbar'
import StartModal from '../organisms/StartModal'
import connectionModal from '../organisms/connectionModal'

import brushBgImage from '../../assets/brush.svg'
import rectBgImage from '../../assets/rect.svg'
import circleBgImage from '../../assets/circle.svg'
import lineBgImage from '../../assets/line.svg'
import eraserBgImage from '../../assets/eraser.svg'
import undoBgImage from '../../assets/undo.svg'
import undoDisabledBgImage from '../../assets/undo-disabled.svg'
import redoBgImage from '../../assets/redo.svg'
import redoDisabledBgImage from '../../assets/redo-disabled.svg'
import saveBgImage from '../../assets/save.svg'

import type { WebsocketMessage } from '../../types'

const toolbarBgImages: ToolbarProps = {
  brushBgImage,
  rectBgImage,
  circleBgImage,
  lineBgImage,
  eraserBgImage,
  undoBgImage,
  undoDisabledBgImage,
  redoBgImage,
  redoDisabledBgImage,
  saveBgImage,
}

const Paint = () => {
  const dispatch = useDispatch()
  const username: string = useSelector((state: any) => state.session.username)
  const canvas: HTMLCanvasElement = useSelector((state: any) => state.canvas.canvas)

  const { id } = useParams()

  useEffect(() => {
    dispatch(setSessionId(id!))
  }, []);

  useEffect(() => {
    if (username) {
      const socket = new WebSocket('ws://localhost:5002/user')
      const websocketService = new WebsocketService(socket)

      dispatch(setSocket(socket))

      websocketService.handleConnection(() => {
        websocketService.sendMessage<WebsocketMessage>({
          id,
          username,
          method: 'connection',
        })
      })

      websocketService.handleMessage((event: MessageEvent) => {
        const msg: WebsocketMessage = JSON.parse(event.data);

        switch (msg.method) {
          case 'connection':
            return connectionModal({
              secondsToGo: 3,
              title: buildConnectionTitle(msg.username!)
            });
          case 'draw':
            return drawHandler(msg, canvas.getContext('2d')!);
          case 'save':
            dispatch(pushToUndo(msg.dataUrl));
            dispatch(clearRedo());
            return;
          case 'undo':
            dispatch(undo());
            return;
          case 'redo':
            dispatch(redo());
            return;
          default:
            return null;
        }
      })
    }
  }, [username])

  return (
    <>
      <StartModal />
      <Toolbar {...toolbarBgImages} />
      <SettingBar />
      <Canvas width='1500' height='650' marginTop={'10px'} />
    </>
  )
}

export default Paint
