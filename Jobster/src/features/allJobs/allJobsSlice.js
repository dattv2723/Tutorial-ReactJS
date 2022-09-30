import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobsThunk } from './allJobsThunk'

const initialFilterState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplication: [],
  ...initialFilterState,
}

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState }
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.jobs = payload.jobs
      state.numOfPages = payload.numOfPages
      state.totalJobs = payload.totalJobs
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { handleChange, clearFilters, changePage } = allJobsSlice.actions

export default allJobsSlice.reducer
