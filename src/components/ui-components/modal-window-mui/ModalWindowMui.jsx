import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';

const colorStyle = {
  color: (theme) => theme.palette.grey[500],
};

const ModalWindowMui = function (props) {
  const {
    isActiveModal, sx, title, children, clickButton, ...other
  } = props;
  return (
    <Dialog open={isActiveModal} {...other}>
      <DialogTitle className={sx}>
        {title}
        <IconButton
          onClick={clickButton}
          aria-label="close"
          sx={colorStyle}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

ModalWindowMui.defaultProps = {
  sx: null,
  title: null,
  children: null,
};

ModalWindowMui.propTypes = {
  isActiveModal: PropTypes.bool.isRequired,
  sx: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.instanceOf(Object),
  clickButton: PropTypes.func.isRequired,
};

export default ModalWindowMui;
