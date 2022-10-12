import React from 'react'
import formatDate from '../helpers/formatDate'
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Task = ({task}) => {
    const { name, description, priority, deliveryDate, state, _id } = task
    const { handleModalEditTasks, deleteTask , completeTask} = useProjects()
    const MySwal = withReactContent(Swal)
    const admin = useAdmin()

    const submitDeleteTask = () => {
        MySwal.fire({
            title: '¿Quieres eliminar esta tarea?',
            text: 'Una vez eliminado no se podrá recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                  'Eliminado Correctamente',
                  'Puedes continuar',
                  'success'
                )
                deleteTask(task)
            }
        })
    }

  return (
    <div>
        <div className="border-b p-5 flex flex-col gap-2 md:flex-row justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="text-xl">{name}</p>
                <p className="text-sm text-gray-500 uppercase">{description}</p>
                <p className="text-sm">{formatDate(deliveryDate)}</p>
                <p className="text-gray-600">Prioridad {priority}</p>
                {
                    state && <p className="bg-emerald-700 text-white px-2 rounded-lg font-bold">Completada por: <span>{ task.completed?.name }</span></p>
                }
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                { 
                    admin && (
                        <button className="bg-sky-600 px-2 py-2 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleModalEditTasks(task)}>Editar</button>
                    )
                }
                     <button onClick={() => completeTask(_id)}className={`${state ? 'bg-green-600' : 'bg-gray-600'} px-2 py-2 text-white uppercase font-bold text-sm rounded-lg`}>{state ? 'Completa' : 'Incompleta'}</button>
                { 
                    admin && (
                        <button onClick={submitDeleteTask} className="bg-red-600 px-2 py-2 text-white uppercase font-bold text-sm rounded-lg">Eliminar</button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Task