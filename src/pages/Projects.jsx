import { useEffect } from 'react';
import PreviewProject from '../components/PreviewProject'
import useProjects from '../hooks/useProjects'
import { io } from "socket.io-client";
let socket 

const Projects = () => {

  const { projects } = useProjects()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  },[])
  

  return (
    <>
      <h2 className="text-white mt-10 font-bold text-xl">Proyectos</h2>
      <div className="bg-white shadow mt-10 rounded-lg">
        { projects.length ? 
          projects.map(project => (
            <PreviewProject 
              key={project._id}
              project={project}
            />
          ))
        : 
        <p className="text-center text-gray-600 uppercase font-bold p-5">No hay Proyectos aún</p> }
      </div>
    </>
  )
}

export default Projects