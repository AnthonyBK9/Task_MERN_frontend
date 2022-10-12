import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

  const { auth } = useAuth()
  // console.log(auth);
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold text-yellow-50">Hola: <span>{auth.name}</span></p>
        <Link to="crear-proyecto" className="text-white text-sm bg-teal-600 p-3 rounded-md uppercase font-bold hover:bg-teal-700 block mt-5 text-center">
            Nuevo Proyecto
        </Link>
    </aside>
  )
}

export default Sidebar