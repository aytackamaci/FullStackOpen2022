const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const g = state.good
      const changedState = {
        ...state,
        good: g + 1,
      }
      return changedState
    }
    case 'OK': {
      const g = state.ok
      const changedState = {
        ...state,
        ok: g + 1,
      }
      return changedState
    }
    case 'BAD': {
      const g = state.bad
      const changedState = {
        ...state,
        bad: g + 1,
      }
      return changedState
    }
    case 'ZERO': {
      const changedState = {
        bad: 0,
        good: 0,
        ok: 0,
      }
      return changedState
    }
    default:
      return state
  }
}

export default counterReducer
