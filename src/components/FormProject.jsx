import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import useProjects from '../hooks/useProjects'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const FormProject = () => {

    const { submitProyect, project } = useProjects()
    const MySwal = withReactContent(Swal)
    const params = useParams()

    const schema = yup.object({
        name: yup.string().required("Nombre del Proyecto requerido").min(3,`El nombre debe ser mayor a 3 caracteres`),
        description: yup.string().required("Descripción requerida"),
        deliveryDate: yup.string().required("La fecha es requerida"),
        client: yup.string().required("El nombre del Cliente es requerido")
    })

    const valueDefaults = {
        name: '',
        description: '',
        deliveryDate: '',
        client: '',
    }

    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})

    const submit = async(data) => {
        // return console.log(data,project)
        if (data.id) {
            submitProyect(data)
            MySwal.fire({
                icon: 'success',
                title: 'Proyecto editado correctamente',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            submitProyect(data)
            MySwal.fire({
                icon: 'success',
                title: 'Proyecto creado correctamente',
                showConfirmButton: false,
                timer: 2000
            })
        }
        reset(valueDefaults)
    }
 
    

    useEffect(() => {
        if (params.id){
            reset({
                id: project._id,
                name: project.name, 
                description: project.description,
                deliveryDate: project.deliveryDate?.split('T')[0],
                client: project.client
            })
        }

    }, [params])
    
  return (
    <form className="bg-gray-100 py-10 px-3 mx-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit(submit)}>
        <div>
            <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
            <input {...register('name')} id="name" type="text" className={ errors.name?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'} placeholder="Nombre del proyecto" />
            { errors.name?.message && <p className="text-red-600 font-bold">{errors.name?.message}</p>}
        </div>
        <div>
            <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">Descripción</label>
            <textarea {...register('description')} id="description" type="text" className={ errors.description?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'}  placeholder="Nombre del proyecto" />
            { errors.description?.message && <p className="text-red-600 font-bold">{errors.description?.message}</p>}
        </div>

        <div>
            <label htmlFor="delivery-date" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>
            <input {...register('deliveryDate')} id="delivery-date" type="date" className={ errors.deliveryDate?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'} placeholder="Nombre del proyecto" />
            { errors.deliveryDate?.message && <p className="text-red-600 font-bold">{errors.deliveryDate?.message}</p>}
        </div>

        <div>
            <label htmlFor="name-cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre del Cliente</label>
            <input {...register('client')} id="name-cliente" type="text" className={ errors.client?.message ? 'border-red-600 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600' : 'border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-cyan-600'} placeholder="Nombre del proyecto" />
            { errors.client?.message && <p className="text-red-600 font-bold">{errors.client?.message}</p>}
        </div>

        <input type="submit" value={ params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'} className="w-full bg-emerald-700 py-3 mt-5 text-whote uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-emerald-800 transition-colors"/>
    </form>
  )
}

export default FormProject