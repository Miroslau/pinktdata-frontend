import React from 'react';
import './ModalWindow.scss';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const ModalWindow = function ({ active, closeModal, children }) {
  return (
    <div className={active ? 'modal-window modal-window-active' : 'modal-window'}>
      <div className="modal-window-container">
        <div className="modal-window__icon">
          <CloseIcon
            onClick={closeModal}
          />
        </div>
        <div className="modal-window-content">
          {children}
        </div>
      </div>
    </div>
  );
};

ModalWindow.defaultProps = {
  children: null,
};

ModalWindow.propTypes = {
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object),
};

export default ModalWindow;
