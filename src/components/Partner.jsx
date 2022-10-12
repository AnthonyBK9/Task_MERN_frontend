import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'

const Partner = ({partner}) => {

    const { handleDeletePartner, partnerTask } = useProjects()
    const { name, email } = partner
    const MySwal = withReactContent(Swal)
    const admin = useAdmin()
    const submitDeleteTask = () => {
        MySwal.fire({
            title: '¿Quieres eliminar a este colaborador?',
            text: 'Una vez eliminado, está persona no podrá acceder al proyecto',
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
                handleDeletePartner(partner)
            }
        })
    }

  return (
    <div className="border-b p-5 flex flex-col gap-2 md:flex-row  justify-between items-center">
        <div className="text-center md:text-left">
            <p className="text-2xl text-gray-700">{name}</p>
            <p className="text-xl text-gray-600">{email}</p>
        </div>
        <div>
            { 
                admin && (
                <button onClick={submitDeleteTask} type="button" className="bg-red-600 px-2 py-2 text-white uppercase font-bold text-sm rounded-lg">
                    Eliminar
                </button>
                )
            }
        </div>
    </div>
  )
}

export default Partner