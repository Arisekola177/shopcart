import AdminNavbar from '../components/Admin/AdminNavbar'

export const metadata = {
    title: "Admin",
    description: "Shopcart Admin Dashboard",
  };

const AdminLayout = ({children}) => {
  return (
    <div>
       <div><AdminNavbar /></div>
            {children}
    </div>
  )
}

export default AdminLayout
