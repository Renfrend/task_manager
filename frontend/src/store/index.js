import { configureStore } from '@reduxjs/toolkit';

import { api } from '../api';
import { authSlice } from '../auth/auth.slice';
import { tasksSlice } from '../pages/tasks-page/tasks.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
