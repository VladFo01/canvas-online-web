/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRef, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const { color, width } = useSelector((state: any) => state.tool)
  const canvas = useSelector((state: any) => state.canvas.canvas)

  const [currentTool, setCurrentTool] = useState<string>('');

  const onColorChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(setColor(e.target.value))
    dispatch(setFillColor(e.target.value))
  }

  const onToolChangeHandler = (ToolClass: any, event: React.ChangeEvent<HTMLButtonElement>) => {
    dispatch(setTool(new ToolClass(canvas, width, color)))
    setCurrentTool(event.target.id);
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
          style={currentTool === 'brush' ? activeToolStyle : null}
        />
        <Button
          id='rect'
          backgroundImage={props.rectBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Rect)}
          marginRight='20px'
          style={currentTool === 'rect' ? activeToolStyle : null}
        />
        <Button
          id='circle'
          backgroundImage={props.circleBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Circle)}
          marginRight='20px'
          style={currentTool === 'circle' ? activeToolStyle : null}
        />
        <Button
          id='eraser'
          backgroundImage={props.eraserBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Erase)}
          marginRight='20px'
          style={currentTool === 'eraser' ? activeToolStyle : null}
        />
        <Button
          id='line'
          backgroundImage={props.lineBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Line)}
          marginRight='20px'
          style={currentTool === 'line' ? activeToolStyle : null}
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
          backgroundImage={props.undoBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          backgroundImage={props.redoBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button backgroundImage={props.saveBgImage} {...toolbarButtonSizes} />
      </Flex>
    </Flex>
  )
}

export default Toolbar
