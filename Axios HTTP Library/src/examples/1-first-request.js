import { useEffect } from 'react'
import axios from 'axios'
// limit, if 429 wait for 15 min and try again
const url = 'https://course-api.com/react-store-products'

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const reponse = await axios.get(url)
      const data = reponse.data
      console.log(data)
    } catch (error) {
      console.log(error.reponse)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <h2 className='text-center'>first request</h2>
}
export default FirstRequest
