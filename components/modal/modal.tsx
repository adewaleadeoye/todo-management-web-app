import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
type Props = {
  show: boolean;
  content: string;
  setModal: Function;
};
const ErrorModal = ({ show, content, setModal }: Props) => {
  const handleClose = () => setModal({ show: false, content: '' });

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="p">
          {content}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
