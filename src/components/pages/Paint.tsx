/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { WebsocketService } from '../../utils/websocketService'
import { setSessionId, setSocket } from '../../store/slices/sessionSlice'

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
import redoBgImage from '../../assets/redo.svg'
import saveBgImage from '../../assets/save.svg'

import type { messageRequest } from '../../types'
import { buildConnectionTitle } from '../../utils/buildConnectionTitle'

const toolbarBgImages: ToolbarProps = {
  brushBgImage,
  rectBgImage,
  circleBgImage,
  lineBgImage,
  eraserBgImage,
  undoBgImage,
  redoBgImage,
  saveBgImage,
}

const Paint = () => {
  const dispatch = useDispatch()
  const username = useSelector((state: any) => state.session.username)

  const { id } = useParams()

  useEffect(() => {
    if (username) {
      const socket = new WebSocket('ws://localhost:5002/user')
      const websocketService = new WebsocketService(socket)

      dispatch(setSocket(socket))
      dispatch(setSessionId(id!))

      websocketService.handleConnection(() => {
        websocketService.sendMessage<messageRequest>({
          id,
          username,
          method: 'connection',
        })
      })

      websocketService.handleMessage((event: MessageEvent) => {
        const msg: messageRequest = JSON.parse(event.data);

        switch (msg.method) {
          case 'connection':
            return connectionModal({
              secondsToGo: 3,
              title: buildConnectionTitle(msg.username)
            })
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
