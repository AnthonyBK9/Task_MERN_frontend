import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MagnifyingGlass } from  'react-loader-spinner'
import useProjects from '../hooks/useProjects'
import FormProject from '../components/FormProject'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditProject = () => {
    
    const { project, deleteProject, login } = useProjects()
    const params = useParams()
    const MySwal = withReactContent(Swal)
    const handleClick = () => {
        MySwal.fire({
            title: '¿Quieres eliminar este proyecto?',
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
                deleteProject(params.id)
            }
        })
    }

  return (
    login ? 
        <MagnifyingGlass 
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#2e2e2e'
        />
        :
        <>
            
            <div className="flex justify-between">
                <h1 className="text-white text-2xl font-semibold">
                    Editar Proyecto: <span className="text-3xl font-bold">{project.name}</span>
                </h1>
                <div onClick={handleClick} className="text-white text-sm bg-rose-600 p-1 rounded-md uppercase font-bold hover:bg-rose-700 hover:cursor-pointer flex gap-2 items-center">
                    <i className="fa-solid fa-trash-can"></i>
                    <button >Eliminar</button>
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <FormProject />
            </div>
        </>
  )
}

export default EditProject