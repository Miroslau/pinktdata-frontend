import { useDispatch, useSelector } from 'react-redux';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Button from '@mui/material/Button';
import { TextareaAutosize } from '@material-ui/core';
import { clearState, userSelector } from '../../../../store/slice/userSlice';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';
import useStyles from '../../../../style/style';
import Authorization from '../../../authorization/Authorization';
import { loginUser, signupUser } from '../../../../store/actions/userAction';
import { ADD, LEAVE_COMMENT } from '../../../../constants/reviews';
import reviewsAPI from '../../../../api/reviews/reviewsAPI';
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

export const ReviewForm = function () {
  const dispatch = useDispatch();
  const [isActiveModal, setModalActive] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
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
      setModalActive(false);
      dispatch(clearState());
    }
  }, [isSuccess]);

  const openRegisterForm = () => {
    dispatch(clearState());
    setSignIn(false);
  };

  const textRef = useRef();

  const addComment = async (e) => {
    e.preventDefault();
    if (!textRef.current.value) {
      return;
    }
    try {
      const commentData = {
        roomId: id,
        comment: textRef.current.value,
      };
      const { status } = await reviewsAPI.review(commentData);
      if (status !== 201) {
        setModalActive(false);
        return;
      }
      textRef.current.value = '';
      setModalActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={() => setModalActive(true)}>
        {LEAVE_COMMENT}
      </Button>

      <ModalWindowMui
        title={token ? LEAVE_COMMENT : TITLE_SIGN_IN}
        // title={token ? LEAVE_COMMENT : isSignIn
        //   ? TITLE_SIGN_IN : TITLE_SIGN_UP} // change
        clickButton={closeModal}
        isActiveModal={isActiveModal}
        sx={useStyle.dialog}
      >
        {
          token
            ? (
              <form onSubmit={addComment} className="form">
                <TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
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
