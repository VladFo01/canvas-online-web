import { Modal } from "antd";

interface connectionModalProps {
  secondsToGo: number
  title: string
}

const connectionModal = ({ secondsToGo, title }: connectionModalProps) => {
  const modal = Modal.success({
    title,
    mask: false,
    keyboard: false,
    style: {
      top: '30px'
    }
  });

  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
};

export default connectionModal;