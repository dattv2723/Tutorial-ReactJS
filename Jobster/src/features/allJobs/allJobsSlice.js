import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk'

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
  monthlyApplications: [],
  ...initialFilterState,
}

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

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
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
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
    [showStats.pending]: (state) => {
      state.isLoading = true
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const {
  handleChange,
  clearFilters,
  changePage,
  showLoading,
  hideLoading,
} = allJobsSlice.actions

export default allJobsSlice.reducer
