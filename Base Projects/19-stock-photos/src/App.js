import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    url = `${mainUrl}${clientID}${urlPage}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data]
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldValue) => {
          return oldValue + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input type='text' placeholder='search' className='form-input' />
          <button className='submit-btn' type='submit' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((image) => {
            return <Photo key={image.id} {...image} />
          })}
        </div>
      </section>
    </main>
  )
}

export default App
