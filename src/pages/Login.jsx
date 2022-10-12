import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import ClientAxios from '../config/ClientAxios'
import Alert from '../components/Alert'
import UseAuth from '../hooks/UseAuth'

const Login = () => {

    const [alert, setAlert] = useState({})
    const { setAuth } = UseAuth()
    const navigate = useNavigate()
    const schema = yup.object({
        email: yup.string().required("Email es requerido").email("Email no valido"),
        password: yup.string().required("Password requerido")
    })
    const defaultValue = {
        email: '',
        password: ''
    }
    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})

    const submit = async (data) => {
        const { email, password} = data
        try {
            const { data } = await ClientAxios.post('/users/login',{email, password})
            setAlert({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            reset(defaultValue)
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
            Inicia Sesión <span className="text-slate-700">UpTask</span>
        </h1>
        {
            msg && <Alert alert={alert} />
        }
        <form className="mt-5 bg-slate-100 rounded-lg p-5" onSubmit={handleSubmit(submit)}>
            <div className="my-3">
                <label htmlFor="email" className="uppercase text-gray-800 block text-xl">Email</label>
                <input {...register('email')} type="email" placeholder='Ingresa tu email' id="email" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.email?.message && <p role="alert" className="text-red-600 font-bold">{errors.email?.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="password" className="uppercase text-gray-800 block text-xl">Password</label>
                <input {...register('password')} type="password" placeholder='Ingresa tu email' id="password" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.password?.message && <p role="alert" className="text-red-600 font-bold">{errors.password?.message}</p>}
            </div>
            <input type="submit" value="Iniciar Sesión" className="w-full bg-sky-700 py-3 text-whote uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
        </form>
        <nav className="lg:flex flex-col">
            <Link to="registrar" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">¿No tienes una cuenta? Registrate</Link>
            <Link to="reestablecer-password" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">Recuperar Password</Link>
        </nav>
    </>
  )
}

export default Login
