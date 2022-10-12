import { Link } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'
import useProjects from '../hooks/useProjects'
import Search from './Search'

const Header = () => {

    const { handleSearch, search, signOut } = useProjects()
    const { signOutProject } = UseAuth()

    const handleSingOut = () => {
        signOut()
        signOutProject()
        localStorage.removeItem('token')
    }

  return (
    <header className="px-4 py-5 bg-slate-800">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-slate-300 font-black text-center mb-5 md:mb-0">
                Uptask
            </h2>
           
            <div className="flex flex-col md:flex-row items-center gap-4">
                <button onClick={handleSearch} type="button" className="font-bold uppercase text-cyan-200">
                    Buscar Proyecto
                </button>
                <Link to="/proyectos" className="font-bold uppercase text-cyan-200">
                    Proyectos
                </Link>
                <button onClick={handleSingOut} type="button" className="text-white text-sm bg-rose-700 p-1 rounded-md uppercase font-bold hover:bg-rose-900">Cerrar Sesión</button>
                <Search />
            </div>
        </div>
    </header>
  )
}

export default Header