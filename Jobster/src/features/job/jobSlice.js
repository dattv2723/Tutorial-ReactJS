import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createJob = createAsyncThunk('job/createJob', createJobThunk)

export const editJob = createAsyncThunk('job/editJob', editJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer
