import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import ClientAxios from '../config/ClientAxios'
import Alert from '../components/Alert'

const ForgetPassword = () => {
    const [alert, setAlert] = useState({})

    const schema = yup.object({
        email: yup.string().required("Email es requerido").email("Email no valido")
    })

    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})
    const valueDefaults = {
        email: ''
    }

    const submit = async (data) => {
        const { email } = data
        try {
            // TODO: mover hacia un cliente Axios
            const { data } = await ClientAxios.post(`/users/reestablecer-password`, {email})
            reset(valueDefaults)
            setAlert({
                msg: data.msg,
                error: false
            })
            console.log(data)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            reset(valueDefaults)
            console.log(error)
        }
    }
    const { msg } = alert;
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl">
            Recupera tu Password
        </h1>
        {
            msg && <Alert alert={alert} />
        }
        <form className="mt-5 bg-slate-100 rounded-lg p-5" onSubmit={handleSubmit(submit)}>
            <div className="my-3">
                <label htmlFor="email" className="uppercase text-gray-800 block text-xl">Ingresa Email</label>
                <input {...register('email')} type="email" placeholder='Ingresa tu email' id="email" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.email?.message && <p role="alert" className="text-red-600 font-bold">{errors.email?.message}</p>}
            </div>
            <input type="submit" value="Enviar Instrucciones" className="w-full bg-sky-700 py-3 text-whote uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
        </form>
        <nav className="lg:flex flex-col">
            <Link to="/" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">Iniciar Sesión</Link>
            <Link to="/registrar" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">¿No tienes una cuenta? Registrate</Link>
        </nav>
    </>
  )
}

export default ForgetPassword