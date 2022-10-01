import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharsContainer from '../../components/CharsContainer'
import StatsContainer from '../../components/StatsContainer'
import { showStats } from '../../features/allJobs/allJobsSlice'
import { Loading } from '../../components'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showStats())
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <Loading center={true} />

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <CharsContainer />}
    </>
  )
}

export default Stats
