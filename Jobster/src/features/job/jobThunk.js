import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearValues } from './jobSlice'
import { toast } from 'react-toastify'

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job)
    thunkAPI.dispatch(clearValues())
    toast.success('Create Job Succeed')
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const editJobThunk = async ({ editJobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${editJobId}`, job)
    thunkAPI.dispatch(clearValues())
    toast.success('Update Job Succeed')
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
