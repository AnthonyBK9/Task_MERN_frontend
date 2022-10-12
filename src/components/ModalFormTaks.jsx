import { Dialog, Transition } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form' 
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import useProjects from '../hooks/useProjects'

const prioritySections = ['Baja', 'Media', 'Alta']

function ModalFormTaks() {
    
    const { handleModalTask, modalForm, task } = useProjects()
    const { submitTask } = useProjects()
    const params = useParams()
    useEffect(() => {
        if (task?._id) {
            reset({
                id: task._id,
                name: task.name,
                description: task.description,
                deliveryDate: task.deliveryDate?.split('T')[0],
                priority: task.priority,
            })  
        }
        else reset(valueDefaults)
    },[task])

    const schema = yup.object({
        name: yup.string().required("Nombre del Proyecto requerido").min(3,`El nombre debe ser mayor a 3 caracteres`),
        description: yup.string().required("Descripción requerida"),
        deliveryDate: yup.string().required("La fecha es requerida"),
        priority: yup.string().required("La prioridad es requerida"),
    })
    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})
    const valueDefaults = {
        name: '',
        description: '',
        deliveryDate: '',
        priority: ''
    }
    const submit = (data) => {
        // El id como un dato vació para validar si se genera una nueva tarea o se actualza
        if (task?._id) {
            data.id = task._id
        } else {
            data.id = ''
        }
        data.project = params.id
        submitTask(data)
        reset(valueDefaults)
    }

    return (
        <Transition.Root show={ modalForm } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalTask}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalTask }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h2" className="text-2xl leading-6 font-bold text-gray-900">
                                        { task?._id ? 'Actualizar Tarea' : 'Crear Tarea' }
                                    </Dialog.Title>
                                    <form className="my-10" onSubmit={handleSubmit(submit)}>
                                        <div className="my-5">
                                            <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">Nombre de la Tarea</label>
                                            <input {...register('name')} id="name" type="text" className={ errors.name?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'} placeholder="Nombre del proyecto" />
                                            { errors.name?.message && <p className="text-red-600 font-bold">{errors.name?.message}</p>}
                                        </div>
                                        <div className="my-5">
                                            <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">Descripción</label>
                                            <textarea {...register('description')} id="description" type="text" className={ errors.description?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'}  placeholder="Nombre del proyecto" />
                                            { errors.description?.message && <p className="text-red-600 font-bold">{errors.description?.message}</p>}
                                        </div>
                                        <div className="my-5">
                                            <label htmlFor="delivery-date" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>
                                            <input {...register('deliveryDate')} id="delivery-date" type="date" className={ errors.deliveryDate?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'} placeholder="Nombre del proyecto" />
                                            { errors.deliveryDate?.message && <p className="text-red-600 font-bold">{errors.deliveryDate?.message}</p>}
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="priority" 
                                                className="text-gray-700 uppercase font-bold text-sm">Prioridad</label>
                                            <select  {...register('priority')}  type="text"id="name" className={ errors.priority?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'}>
                                                <option value="" className="text-gray-500">--- Seleccionar ---</option>
                                                { 
                                                    prioritySections.map( priority => (
                                                        <option value={priority} key={priority}>{priority}</option>
                                                    ))
                                                }
                                            </select>
                                            { errors.priority?.message && <p className="text-red-600 font-bold">{errors.priority?.message}</p>}
                                        </div>
                                        <input type="submit" value={ task?._id ? 'Guardar cambios' : 'Crear Tarea' } className="w-full bg-sky-600 hover:bg-sky-700 transition-colors py-3 mt-5 text-whote uppercase font-bold text-white rounded hover:cursor-pointer "/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormTaks