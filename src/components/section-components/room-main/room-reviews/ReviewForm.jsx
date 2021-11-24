import { useSelector } from 'react-redux';
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextareaAutosize } from '@material-ui/core';
import { userSelector } from '../../../../store/slice/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ReviewForm = function () {
  const textRef = useRef();
  const {
    firstName,
  } = useSelector(
    userSelector,
  );

  const addComment = (e) => {
    e.preventDefault();
    if (!textRef.current.value) {
      return;
    }
    const commentData = {
      name: firstName,
      comment: textRef.current.value,
    };
    console.log(commentData);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Leave a comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4>Leave a comment</h4>
          <form onSubmit={addComment}>
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              ref={textRef}
              style={{ width: 350, height: 100 }}
            />
            <button className="btn-add" type="submit">Add </button>
          </form>
        </Box>
      </Modal>

    </div>
  );
};
