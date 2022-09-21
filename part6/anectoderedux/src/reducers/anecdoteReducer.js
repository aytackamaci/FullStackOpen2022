import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anectodeToChange = state.find((n) => n.id === id)
      const votedAnectode = {
        ...anectodeToChange,
        votes: anectodeToChange.votes + 1,
      }
      saveVotes(id, votedAnectode)
      return state.map((anectode) =>
        anectode.id !== id ? anectode : votedAnectode
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const saveVotes = (anecdote) => {
  return async (dispatch) => {
    const { id } = await anecdoteService.update(anecdote)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
