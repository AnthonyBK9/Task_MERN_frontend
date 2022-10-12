import React, { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import ClientAxios from '../config/ClientAxios'
import Alert from '../components/Alert'

const ConfirmAccount = () => {

  const [alert, setAlert] = useState({})
  const [accountConfirm, setAccountConfirm] = useState(false)

  const params = useParams()
  const { id } = params
  
  useEffect(() => {
      const confirmAccount = async () => {
        try {
          const url = `/users/confirm/${id}`
          const { data } = await ClientAxios.get(url)
          setAlert({
            msg: data.msg,
            error: false
          })
          setAccountConfirm(true)
        } catch (error) {
          console.log(error)
          setAlert({
            msg: error.response.data.msg,
            error: true
          })
        }
      }
      confirmAccount()
  }, [])
  
  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
          Confirma tu cuenta
      </h1>
      <div className="mt-15 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {
          msg && <Alert alert={alert}/>
        }
        {
          accountConfirm &&  <Link to="/" className="block my-1 text-slate-600 uppercase text-sm font-bold hover:cursor-pointer hover:text-sky-600 transition-colors">Inicia sesión</Link>
        }
      </div>

    </>
  )
}

export default ConfirmAccount