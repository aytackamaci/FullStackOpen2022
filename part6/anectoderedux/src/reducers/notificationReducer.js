import { createSlice } from '@reduxjs/toolkit'

const initialState = ['This is place holder for notification']

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage(state) {
      return initialState
    },
  },
})

export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer
