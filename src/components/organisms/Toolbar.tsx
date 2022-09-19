import { useDispatch, useSelector } from 'react-redux'
import { setColor, setTool } from '../../store/slices/toolSlice'
import Brush from '../../tools/Brush'
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

const Toolbar = (props: ToolbarProps) => {
  const dispatch = useDispatch()
  const color = useSelector((state: any) => state.tool.color)
  const canvas = useSelector((state: any) => state.canvas.canvas)

  const onColorChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(setColor(e.target.value))
  }

  const onToolChangeHandler = (ToolClass: any) => {
    dispatch(setTool(new ToolClass(canvas)))
  }

  return (
    <Flex
      justifyContent='space-between'
      padding='10px 25px'
      boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <Flex>
        <Button
          backgroundImage={props.brushBgImage}
          {...toolbarButtonSizes}
          onClick={onToolChangeHandler.bind(null, Brush)}
          marginRight='20px'
        />
        <Button
          backgroundImage={props.rectBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          backgroundImage={props.circleBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          backgroundImage={props.eraserBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
        />
        <Button
          backgroundImage={props.lineBgImage}
          {...toolbarButtonSizes}
          marginRight='20px'
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
