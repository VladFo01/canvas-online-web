import Canvas from '../organisms/Canvas'
import SettingBar from '../organisms/SettingBar'
import Toolbar, { ToolbarProps } from '../organisms/Toolbar'

import brushBgImage from '../../assets/brush.svg'
import rectBgImage from '../../assets/rect.svg'
import circleBgImage from '../../assets/circle.svg'
import lineBgImage from '../../assets/line.svg'
import eraserBgImage from '../../assets/eraser.svg'
import undoBgImage from '../../assets/undo.svg'
import redoBgImage from '../../assets/redo.svg'
import saveBgImage from '../../assets/save.svg'

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
  return (
    <>
      <Toolbar {...toolbarBgImages} />
      <SettingBar />
      <Canvas width='1500' height='650' />
    </>
  )
}

export default Paint
