import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import ClientAxios from '../config/ClientAxios'
import { useState } from 'react'
import Alert from '../components/Alert'

const Register = () => {
    const [alert, setAlert] = useState({})

    const schema = yup.object({
        name: yup.string().required("El Nombre es requerido").min(3,`El nombre debe ser mayor a 3 caracteres`),
        email: yup.string().required("Email requerido perro").email("Email no valido"),
        password: yup.string().required("Password requerido").min(8,`Mínimo 8 caracteres`).max(32, `Maximo 32 caracteres`),
        confirmPassword: yup.string().required("Confirmar password requerido").oneOf([yup.ref("password"), null],"Tus Password no coinciden")
    })
    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})
    const defaultValue = {
        name: '', 
        email: '', 
        password: '',
        confirmPassword: '',
    }
    const submit = async (data) => {
        const { name, email, password } = data
        try {
            const { data } = await ClientAxios.post(`/users`, {name, email, password})
            reset(defaultValue)
            setAlert({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            // console.log(error.response.data.msg)
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    const { msg } = alert;
    
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl">
            Crea Tu Cuenta en <span className="text-slate-700">UpTask</span>
        </h1>
        {
            msg && <Alert alert={alert}/>
        }
        <form className="mt-5 bg-slate-100 rounded-lg p-5" onSubmit={handleSubmit(submit)}>
            <div className="my-3">
                <label htmlFor="name" className="uppercase text-gray-800 block text-xl">Nombre</label>
                <input {...register('name', {required: true})} type="text" placeholder='Ingresa tu nombre' id="name" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                { errors.name?.message && <p className="text-red-600 font-bold">{errors.name?.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="email" className="uppercase text-gray-800 block text-xl">Email</label>
                <input {...register('email', {required: true})} type="email" placeholder='Ingresa tu email' id="email" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.email?.message && <p role="alert" className="text-red-600 font-bold">{errors.email?.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="password" className="uppercase text-gray-800 block text-xl">Password</label>
                <input {...register('password', {required: true})} type="password" placeholder='Password' id="password" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.password?.message && <p role="alert" className="text-red-600 font-bold">{errors.password?.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="confirmPassword" className="uppercase text-gray-800 block text-xl">Confirmar Password</label>
                <input {...register('confirmPassword', {required: true})} type="password" placeholder='Repetir Password' id="confirmPassword" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.confirmPassword?.message && <p role="alert" className="text-red-600 font-bold">{errors.confirmPassword?.message}</p>}
            </div>
            <input type="submit" value="Crear Cuenta" className="w-full bg-sky-700 py-3 text-whote uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
        </form>
        <nav className="lg:flex flex-col">
            <Link to="/" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link to="/reestablecer-password" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">Recuperar Password</Link>
        </nav>
    </>
  )
}

export default Register