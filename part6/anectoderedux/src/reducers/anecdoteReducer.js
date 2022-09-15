import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newNote = action.payload
      state.push(newNote)
    },
    vote(state, action) {
      const id = action.payload
      const anectodeToChange = state.find((n) => n.id === id)
      const votedAnectode = {
        ...anectodeToChange,
        votes: anectodeToChange.votes + 1,
      }
      return state.map((anectode) =>
        anectode.id !== id ? anectode : votedAnectode
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
