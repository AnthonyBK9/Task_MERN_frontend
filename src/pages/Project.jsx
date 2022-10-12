import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'
import { MagnifyingGlass } from  'react-loader-spinner'
import ModalFormTaks from '../components/ModalFormTaks'
import Task from '../components/Task'
import Partner from '../components/Partner'
import {io} from 'socket.io-client'
let socket

const Project = () => {
    
    const { getProjectById, project, loading, handleModalTask, submitTaskProject, deleteTaskProject, updateTaskProject, completeStateTask} = useProjects()
    const { id } = useParams()

    useEffect(() => {
        getProjectById(id)
    },[])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('openProject', id)

    },[])

   useEffect(() => {
    //Creación de agregar tarea en tiempo real para todos los usuarios
        socket.on('addTask', task => {
            if (task.project === project._id) {
                submitTaskProject(task)
            }
        })

        socket.on('removeTask', task => {
            if (task.project === project._id) {
                deleteTaskProject(task)
            }
        })

        socket.on('updatedTask', task => {
            if (task.project._id === project._id) {
                updateTaskProject(task)
            }
        })

        socket.on('completedTask', task => {
            if (task.project._id === project._id) {
                completeStateTask(task)
            }
        })
   })

    const admin = useAdmin()
    
  return (
    loading ? 
    <div className="mt-10 flex items-center justify-center">
        <MagnifyingGlass 
            visible={true}
            height="180"
            width="180"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#2e2e2e'
        />
    </div>
     : (
    <>
        <div className="flex justify-between">
            <h1 className="font-black text-4xl text-white">
                {project?.name}
            </h1>
            {
                admin && (
                <div className="text-white flex items-center gap-2 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    
                    <Link to={`/proyectos/editar/${id}`} className="uppercase font-bold">
                        Editar
                    </Link>
                </div>)
            }
            
        </div>
        {
            admin && (
            <div className="flex flex-col md:flex-row gap-3">
                <button onClick={handleModalTask} type="button" className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-500 text-white text-center flex gap-2 items-center justify-center">
                    <i className="fa-solid fa-circle-plus"></i>
                    Nueva Tarea
                </button>
                <Link to={`/proyectos/nuevo-colaborador/${project._id}`} type="button" className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-center flex gap-2 items-center justify-center">
                    <i className="fa-solid fa-user-plus"></i>   
                    Agregar Colaborador
                </Link>
            </div>
            )
        }
        <p className="font-bold text-xl mt-10 text-white">Tareas del Proyecto</p>
        <div className="bg-white shadow mt-10 rounded-lg">
            { project.tasks?.length ? 
                project?.tasks.map(task => (
                    <Task key={task._id} task={task}/>
                ))  :
                (
                    <p className="text-center text-gray-600 uppercase font-bold my-5 p-10">No hay tareas</p>
                )
            
            }
        </div>
        
        <p className="font-bold text-xl mt-10 text-white">Colaboradores</p>
        <div className="bg-white shadow mt-10 rounded-lg">
            { project.partners?.length ? 
                project?.partners.map(partner => (
                    <Partner  key={partner._id} partner={partner} />
                ))  :
                (
                    <p className="text-center text-gray-600 uppercase font-bold my-5 p-10">No hay Colaboradoes</p>
                )
            
            }
        </div>
        <ModalFormTaks />
    </>
    )
  )
}

export default Project