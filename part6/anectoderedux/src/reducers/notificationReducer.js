import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { message: 'This is place holder for notification', visibility: 0 },
]

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = `you voted '${action.payload}' `
      const messageToChange = state[0]
      const changedMessage = {
        ...messageToChange,
        message: message,
        visibility: 1,
      }
      return state.map((message) => (message = changedMessage))
    },
    deleteMessage(state) {
      const messageToChange = state[0]
      const changedMessage = {
        ...messageToChange,
        visibility: 0,
      }
      return state.map((message) => (message = changedMessage))
    },
  },
})

export const { setMessage, deleteMessage } = notificationSlice.actions
export default notificationSlice.reducer
