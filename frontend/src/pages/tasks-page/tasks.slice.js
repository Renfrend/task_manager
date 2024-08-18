import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenSaveModal: false,
  selectedTask: null,
};

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    openSaveModal: (state, { payload }) => {
      state.isOpenSaveModal = true;
      state.selectedTask = payload;
    },
    closeSaveModal: (state) => {
      state.isOpenSaveModal = false;
      state.selectedTask = null;
    },
  },
});

export const { openSaveModal, closeSaveModal } = tasksSlice.actions;
export const selectTasksState = (state) => state.tasksSlice;
