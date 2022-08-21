import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import StyleNavbar from '../components/StyleNavbar'

const SharedProductLayout = () => {
  return (
    <>
      <h2>Products</h2>
      <Outlet />
    </>
  )
}
export default SharedProductLayout
