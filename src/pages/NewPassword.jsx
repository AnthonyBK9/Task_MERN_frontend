import React from 'react'
import { useParams, Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import ClientAxios from '../config/ClientAxios'
import { useState } from 'react'
import Alert from '../components/Alert'
import { useEffect } from 'react'

const NewPassword = () => {

    const [alert, setAlert] = useState({})
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [validToken, setValidToken] = useState(false)

    const schema = yup.object({
        password: yup.string().required("Password requerido").min(8,`Mínimo 8 caracteres`).max(32, `Maximo 32 caracteres`),
        confirmPassword: yup.string().required("Confirmar password requerido").oneOf([yup.ref("password"), null],"Tus Password no coinciden")
    })

    const params = useParams()
    const { token } = params
    const defaultValue = {
        password: '',
        confirmPassword: ''
    }

    const { register, handleSubmit, reset, formState: { errors }  } = useForm({resolver:yupResolver(schema)})

    useEffect(() => {
        const validateToken = async () => {
            try {
                await ClientAxios(`/users/reestablecer-password/${token}`)
                setValidToken(true)

            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        validateToken()
    }, [])
    
    
    const submit = async (data) => {
        const { password } = data
        try {
            const url = `/users/reestablecer-password/${token}`
            const { data } = await ClientAxios.post(url, {password})
            reset(defaultValue)
            setAlert({
                msg: data.msg,
                error: false
            })
            setConfirmPassword(true)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }


    const { msg } = alert
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl">
            Restablece tu Password
        </h1>
        {
            msg && <Alert alert={alert} />
        }
      
        {
            validToken && (
                <form className="mt-5 bg-slate-100 rounded-lg p-5" onSubmit={handleSubmit(submit)}>
            <div className="my-3">
                <label htmlFor="password" className="uppercase text-gray-800 block text-xl">Nuevo Password</label>
                <input {...register('password')}  type="password" placeholder='Password' id="password" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.password?.message && <p role="alert" className="text-red-600 font-bold">{errors.password?.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="confirmPassword" className="uppercase text-gray-800 block text-xl">Confirmar Password</label>
                <input {...register('confirmPassword')} type="password" placeholder='Repetir Password' id="confirmPassword" className="w-full mt-3 p-3 border rounded-lg bg-gray-200"/>
                {errors.confirmPassword?.message && <p role="alert" className="text-red-600 font-bold">{errors.confirmPassword?.message}</p>}
            </div>
            <input type="submit" value="Reestablcer Password" className="w-full bg-sky-700 py-3 text-whote uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
            {
            confirmPassword && (
                <Link to="/" className="block my-8 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors text-center">Iniciar sesión</Link>
                )
             
            }
        </form>
            )
        }
        

    </>
  )
}

export default NewPassword