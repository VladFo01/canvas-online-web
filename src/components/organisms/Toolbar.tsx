/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redo, undo } from '../../store/slices/canvasSlice'
import { setColor, setFillColor, setTool } from '../../store/slices/toolSlice'
import Brush from '../../tools/Brush'
import { Circle } from '../../tools/Circle'
import { Erase } from '../../tools/Erase'
import { Line } from '../../tools/Line'
import { Rect } from '../../tools/Rect'
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
  redoBgImage: string
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
  const canvas = useSelector((state: any) => state.canvas.canvas)

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

  const onReduHandler = () => {
    dispatch(redo())
  }

  const onUndoHandler = () => {
    dispatch(undo())
  }

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
          backgroundImage={props.undoBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          onClick={onReduHandler}
          backgroundImage={props.redoBgImage}
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
