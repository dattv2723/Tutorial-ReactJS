import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useSelector, useDispatch } from 'react-redux'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../features/allJobs/allJobsSlice'

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) newPage = 1
    dispatch(changePage(newPage))
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) newPage = numOfPages
    dispatch(changePage(newPage))
  }

  return (
    <Wrapper>
      <button className='prev-btn' type='button' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
