import Flex from '../atoms/Flex'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import Typography from '../atoms/Typography'

const SettingBar = () => {
  return (
    <Flex
      alignItems='center'
      boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
      padding='12px 0 7px 10px'
    >
      <Flex>
        <Label htmlFor='lineSize' marginRight='15px'>
          <Typography fontSize='18px' lineHeight='21px'>
            Font size
          </Typography>
        </Label>
        <Input
          type='number'
          min='8'
          max='24'
          step='4'
          value={8}
          height='21px'
          width='45px'
        />
      </Flex>
    </Flex>
  )
}

export default SettingBar
