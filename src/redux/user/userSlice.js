import { createSlice } from '@reduxjs/toolkit';
import { set } from 'firebase/database';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  status:false,
  workerFirst: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.status = true;
      state.workerFirst = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.status = false;
      state.workerFirst = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.workerFirst = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.workerFirst = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.status = false;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.status = false;
      state.workerFirst = false;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.workerFirst = false;
    },
    setWorkerStatus: (state) => {
      state.workerFirst = true;
    },
    removeWorkerStatus: (state) => {
      state.workerFirst = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
  setWorkerStatus,
  removeWorkerStatus,
} = userSlice.actions;

export default userSlice.reducer;
