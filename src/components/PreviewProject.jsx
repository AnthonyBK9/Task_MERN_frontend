import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProject = ({project}) => {

    const { auth } = useAuth()
    const { name, _id, client, creator} = project

  return (
    <div className="border-b p-5 flex flex-col gap-2 md:flex-row justify-between">
      <div className="flex flex-col  md:flex-row gap-3">
        <p className="flex-1 text-sky-800 font-bold">{name} <span className="text-sm text-gray-500 uppercase">{client}</span>  </p>
        { 
          auth._id !== creator && (
            <p className="text-white text-center text-xs font-bold bg-emerald-800 p-1 px-3 rounded-2xl">Colaborador</p>
          )
        }
      </div>
        <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-black">Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProject