import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import useProjects from '../hooks/useProjects'
import Alert from './Alert'


const FormPartner = () => {

    const { submitPartner, alert } = useProjects()

    const schema = yup.object({
        email: yup.string().required("Email requerido perro").email("Email no valido")
    })
    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})
    const defaultValue = { 
        email: ''
    }

    const searchPartner = (data) => {
        submitPartner(data.email)
        reset(defaultValue)
    }

    const { msg } = alert
  return (
    <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit(searchPartner)}>
        {
            msg ? <Alert alert={alert}/> : ''
        }
        <div className="my-3">
            <label htmlFor="email" className="uppercase text-gray-800 block text-xl">Email</label>
            <input {...register('email', {required: true})} type="email" placeholder='Email del usuario' id="email" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
            {errors.email?.message && <p role="alert" className="text-red-600 font-bold">{errors.email?.message}</p>}
        </div>
        <input type="submit" value="Buscar Colaborador" className="w-full bg-sky-600 hover:bg-sky-700 transition-colors py-3 mt-5 text-whote uppercase font-bold text-white rounded hover:cursor-pointer "/>
    </form>
  )
}

export default FormPartner