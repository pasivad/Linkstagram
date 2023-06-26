import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchLogin = createAsyncThunk('/user/fetchLogin', async (params:Object) => {
   const { data } = await axios.post('/user/login', params)
   return data
})

export const fetchLoginMe = createAsyncThunk('/user/fetchLoginMe', async () => {
   const { data } = await axios.get('/user/me')
   return data
})

export const fetchRegister = createAsyncThunk('/user/fetchRegister', async (params:Object) => {
   const { data } = await axios.post('/user/register', params)
   return data
})


const initialState = {
   data: null,
   status: 'loading'
}

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null 
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchLogin.pending, (state) => {
         state.data = null
         state.status = 'loading'
      })
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
         state.data = action.payload
         state.status = 'loaded'
      })
      builder.addCase(fetchLogin.rejected, (state) => {
         state.data = null
         state.status = 'error'
      })
      builder.addCase(fetchLoginMe.pending, (state) => {
         state.data = null
         state.status = 'loading'
      })
      builder.addCase(fetchLoginMe.fulfilled, (state, action) => {
         state.data = action.payload
         state.status = 'loaded'
      })
      builder.addCase(fetchLoginMe.rejected, (state) => {
         state.data = null
         state.status = 'error'
      })
      builder.addCase(fetchRegister.pending, (state) => {
         state.data = null
         state.status = 'loading'
      })
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
         state.data = action.payload
         state.status = 'loaded'
      })
      builder.addCase(fetchRegister.rejected, (state) => {
         state.data = null
         state.status = 'error'
      })
   }
})

export const selectIsLogin = (state: any) => Boolean(state.user.data)

export const userReducer = userSlice.reducer

export const { logout } = userSlice.actions