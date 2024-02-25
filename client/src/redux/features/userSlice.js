import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStarted: (state) => {
      state.loading = true
      state.error = null
    },
    authSuccessful: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
    },
    authFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logoutStarted: (state) => {
      state.loading = true
      state.error = null
    },
    logoutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    logoutFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  authStarted,
  authSuccessful,
  authFailed,
  logoutStarted,
  logoutSuccess,
  logoutFailed,
} = userSlice.actions

export default userSlice.reducer
