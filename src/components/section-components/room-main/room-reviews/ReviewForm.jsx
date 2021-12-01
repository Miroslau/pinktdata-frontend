import { useDispatch, useSelector } from 'react-redux';
import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import Button from '@mui/material/Button';
import { TextareaAutosize } from '@material-ui/core';
import PropTypes from 'prop-types';
import { clearState, userSelector } from '../../../../store/slice/userSlice';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';
import useStyles from '../../../../style/style';
import Authorization from '../../../authorization/Authorization';
import { loginUser, signupUser } from '../../../../store/actions/userAction';
import { ADD, LEAVE_COMMENT } from '../../../../constants/reviews';
import { roomContext } from '../../../../store/context/roomContext';
import { authorizationLocalization } from '../../../../constants/Localizations/authorizationLocalization';

const {
  TITLE_SIGN_IN,
} = authorizationLocalization;

const TEXTAREA_STYLE = {
  width: 350,
  height: 100,
  borderRadius: 4,
  borderColor: '#9e9e9e',
  outline: 'none',
  padding: 8,
  fontStyle: 'italic',
};
const AREA_LABEL = 'maximum-height';

export const ReviewForm = function ({ addComment, isActiveModal, setModalActive }) {
  const dispatch = useDispatch();
  const [isSignIn, setSignIn] = useState(true);
  const textRef = useRef();
  const { id } = useContext(roomContext);

  const useStyle = useStyles();

  const {
    isSuccess, isError, token,
  } = useSelector(
    userSelector,
  );

  const closeModal = () => {
    setModalActive(false);
    setSignIn(true);
    if (isError) {
      dispatch(clearState());
    }
  };
  // eslint-disable-next-line max-len
  const authorizationUser = (user) => (isSignIn ? dispatch(loginUser(user)) : dispatch(signupUser(user)));

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isSuccess]);

  const openRegisterForm = () => {
    dispatch(clearState());
    setSignIn(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { value } = textRef.current;
    if (!value) return;
    const commentData = {
      roomId: id,
      comment: value,
    };
    addComment(commentData);
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={() => setModalActive(true)}>
        {LEAVE_COMMENT}
      </Button>

      <ModalWindowMui
        title={token ? LEAVE_COMMENT : TITLE_SIGN_IN}
        clickButton={closeModal}
        isActiveModal={isActiveModal}
        sx={useStyle.dialog}
      >
        {
          token
            ? (
              <form onSubmit={submitForm} className="form">
                <TextareaAutosize
                  maxRows={4}
                  aria-label={AREA_LABEL}
                  ref={textRef}
                  style={TEXTAREA_STYLE}
                />
                <button className="button btn-add" type="submit">{ADD}</button>
              </form>

            )
            : (
              <Authorization
                isSignIn={isSignIn}
                submitForm={authorizationUser}
                openForm={openRegisterForm}
              />
            )
        }
      </ModalWindowMui>
    </div>
  );
};

ReviewForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  isActiveModal: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
