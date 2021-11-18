import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalActive: false,
  isEditCardMode: false,
  isEditCard: false,
  isActiveCancelBtn: false,
  isSaveCard: false,
  isCanceled: false,
};

const modalSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    modalActive: (state) => {
      state.isModalActive = true;
    },
    setModalActive: (state) => {
      state.isModalActive = false;
    },
    editRoomMode: (state) => {
      state.isEditCardMode = true;
    },
    setEditRoomMode: (state) => {
      state.isEditCardMode = false;
    },
    editRoom: (state) => {
      state.isEditCard = true;
    },
    setEditRoom: (state) => {
      state.isEditCard = false;
    },
    activeCancelBtn: (state) => {
      state.isActiveCancelBtn = true;
    },
    setCancelBtn: (state) => {
      state.isActiveCancelBtn = false;
    },
    saveCard: (state) => {
      state.isSaveCard = true;
    },
    setSaveCard: (state) => {
      state.isSaveCard = false;
    },
    isCanceled: (state) => {
      state.isCanceled = true;
    },
    setIsCanceled: (state) => {
      state.isCanceled = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
