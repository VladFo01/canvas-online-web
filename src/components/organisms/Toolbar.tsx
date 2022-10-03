/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUploadImageMutation } from '../../store/slices/apiSlice'
import { setColor, setFillColor, setTool } from '../../store/slices/toolSlice'
import { Brush } from '../../tools/Brush'
import { Circle } from '../../tools/Circle'
import { Erase } from '../../tools/Erase'
import { Line } from '../../tools/Line'
import { Rect } from '../../tools/Rect'
import type { WebsocketMessage } from '../../types'
import { WebsocketService } from '../../utils/websocketService'
import Button from '../atoms/Button'
import Flex from '../atoms/Flex'
import Input from '../atoms/Input'

export interface ToolbarProps {
  brushBgImage: string
  rectBgImage: string
  circleBgImage: string
  eraserBgImage: string
  lineBgImage: string
  undoBgImage: string
  undoDisabledBgImage: string
  redoBgImage: string
  redoDisabledBgImage: string
  saveBgImage: string
}

interface ToolbarButtonSizeProps {
  width: string
  height: string
}

const toolbarButtonSizes: ToolbarButtonSizeProps = {
  width: '25px',
  height: '25px',
}

const activeToolStyle: React.CSSProperties = {
  border: '2px solid #9EBEFF',
  borderRadius: '5px',
}

const Toolbar = (props: ToolbarProps) => {
  const dispatch = useDispatch()
  const { socket, id } = useSelector((state: any) => state.session)
  const { color, width } = useSelector((state: any) => state.tool)
  const { canvas, undoList, redoList } = useSelector((state: any) => state.canvas)
  const [uploadImage] = useUploadImageMutation();

  const redoDisabled = !redoList.length
  const undoDisabled = !undoList.length

  const [currentTool, setCurrentTool] = useState<string>('')

  const onColorChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(setColor(e.target.value))
    dispatch(setFillColor(e.target.value))
  }

  const onToolChangeHandler = (
    ToolClass: any,
    event: React.ChangeEvent<HTMLButtonElement>,
  ) => {
    dispatch(setTool(new ToolClass(canvas, width, color, socket, id)))
    setCurrentTool(event.target.id)
  }

  const download = () => {
    const dataUrl = canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${Date.now()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const onReduHandler = useCallback(async () => {
    new WebsocketService(socket).sendMessage<WebsocketMessage>({
      id,
      method: 'redo'
    })
    await uploadImage({
      image: redoList.at(-1),
      sessionId: id
    })
  }, [socket, id, redoList]);

  const onUndoHandler = useCallback(async () => {
    new WebsocketService(socket).sendMessage<WebsocketMessage>({
      id,
      method: 'undo'
    })
    await uploadImage({
      image: undoList.at(-1),
      sessionId: id
    })
  }, [socket, id, undoList]);

  return (
    <Flex
      justifyContent='space-between'
      padding='10px 25px'
      boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <Flex>
        <Button
          id='brush'
          backgroundImage={props.brushBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Brush)}
          marginRight='20px'
          style={currentTool === 'brush' ? activeToolStyle : undefined}
        />
        <Button
          id='rect'
          backgroundImage={props.rectBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Rect)}
          marginRight='20px'
          style={currentTool === 'rect' ? activeToolStyle : undefined}
        />
        <Button
          id='circle'
          backgroundImage={props.circleBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Circle)}
          marginRight='20px'
          style={currentTool === 'circle' ? activeToolStyle : undefined}
        />
        <Button
          id='eraser'
          backgroundImage={props.eraserBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Erase)}
          marginRight='20px'
          style={currentTool === 'eraser' ? activeToolStyle : undefined}
        />
        <Button
          id='line'
          backgroundImage={props.lineBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Line)}
          marginRight='20px'
          style={currentTool === 'line' ? activeToolStyle : undefined}
        />
        <Input
          type='color'
          value={color}
          onChange={onColorChangeHandler}
          {...toolbarButtonSizes}
          border='none'
        />
      </Flex>
      <Flex>
        <Button
          onClick={onUndoHandler}
          disabled={undoDisabled}
          backgroundImage={undoDisabled ? props.undoDisabledBgImage : props.undoBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          onClick={onReduHandler}
          disabled={redoDisabled}
          backgroundImage={redoDisabled ? props.redoDisabledBgImage : props.redoBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          onClick={() => download()}
          backgroundImage={props.saveBgImage}
          {...toolbarButtonSizes}
        />
      </Flex>
    </Flex>
  )
}

export default Toolbar
