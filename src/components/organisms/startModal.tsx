import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsername } from '../../store/slices/sessionSlice'

import Input from '../atoms/Input'

const StartModal: React.FC = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [usernameValue, setUsernameValue] = useState<string>('')

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleOk = () => {
    if (usernameValue) {
      setConfirmLoading(true)
      dispatch(setUsername(usernameValue))
      setOpen(false)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value)
  }

  return (
    <Modal
      title={'Input your name:'}
      open={open}
      closable={false}
      footer={[
        <Button
          key='submit'
          type='primary'
          loading={confirmLoading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Input
        onChange={onChangeHandler}
        type='text'
        value={usernameValue}
        placeholder={'username...'}
        padding={'5px'}
        width={'100%'}
      />
    </Modal>
  )
}

export default StartModal
