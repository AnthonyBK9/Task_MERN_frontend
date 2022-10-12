import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {

    const { auth, loading } = useAuth()
    if (loading) return 'Cargando'

  return (
    <>
        { auth.name ? 
        (
          <div className="bg-sky-900">
            <Header/>
            <div className="md:flex md:min-h-screen">
              <Sidebar />
              <main className="bg-sky-800 flex-1 p-10">
                <Outlet />
              </main>
            </div>
          </div>
        ) : <Navigate to='/' />}
    </>
  )
}

export default ProtectedRoute