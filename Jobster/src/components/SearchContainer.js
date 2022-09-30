import React from 'react'
import Wrapper from '../assets/wrappers/SearchContainer'
import { FormRow, FormRowSelect } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice'

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs)

  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            type='submit'
            onClick={() => dispatch(clearFilters())}
          >
            {isLoading ? 'loading...' : 'clear filters'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
