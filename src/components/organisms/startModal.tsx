import { Modal } from 'antd'
import { useState } from 'react'

const startModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [usernameValue, setUsernameValue] = useState<string>('')

  const handleOk = () => {
    setConfirmLoading(true)
  }

  return (
    <Modal
      title={'Input your name:'}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    ></Modal>
  )
}
