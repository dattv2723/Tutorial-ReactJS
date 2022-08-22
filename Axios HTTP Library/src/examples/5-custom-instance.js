import { useEffect } from 'react'
import authFecth from '../axios/custom'
import axios from 'axios'

const randomUserUrl = 'https://randomuser.me/api'

const CustomInstance = () => {
  const fetchData = async () => {
    try {
      const resp1 = await authFecth('/react-store-products')
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <h2 className='text-center'>custom instance</h2>
}
export default CustomInstance
