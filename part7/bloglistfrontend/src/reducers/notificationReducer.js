/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

var timeoutHelper
const initialState = [
  { message: 'This is place holder for notification', visibility: 0, type: 1 },
]

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload[0]
      const type = action.payload[2]
      const messageToChange = state[0]

      const changedMessage = {
        ...messageToChange,
        message: message,
        visibility: 1,
        type: type,
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

export const setNotification = (message) => {
  return async (dispatch) => {
    clearTimeout(timeoutHelper)
    timeoutHelper = setTimeout(() => {
      dispatch(deleteMessage())
    }, message[1] * 1000)
    dispatch(setMessage(message))
  }
}
export default notificationSlice.reducer
