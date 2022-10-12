import React from 'react'
import { useEffect } from 'react'
import FormPartner from '../components/FormPartner'
import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'
import { MagnifyingGlass } from  'react-loader-spinner'
import Alert from '../components/Alert'

const NewPartner = () => {
  const { getProjectById, project, loading, partner, addPartner, alert } = useProjects()
  const params = useParams()
 
  useEffect(() => {
    getProjectById(params.id)
  },[])

  if(!project?._id) return <Alert alert={alert}/>
  return (
    <>  
        
        <h1 className="text-4xl font-black text-white">Añadir Colaborador(a)</h1>
        <h2 className="text-xl font-black text-white">Proyecto: {project.name}</h2>
        <div className="mt-10 flex justify-center">
            <FormPartner />
        </div>
        { loading ? 
          <div className="mt-10 flex justify-center">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow flex justify-center">
              <MagnifyingGlass 
                  visible={true}
                  height="130"
                  width="130"
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperStyle={{}}
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor = '#c0efff'
                  color = '#2e2e2e'
              /> 
            </div>
          </div> : 
          partner._id && (
            <div className="flex justify-center mt-10">
              <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                <div className="flex flex-col gap-2 md:flex-row justify-between items-center">
                  <p className="text-emerald-600 font-bold text-2xl">{partner.name}</p>
                  <button onClick={() => addPartner({email: partner.email})} type="button" className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm">Agregar al Proyecto</button>
                </div>
              </div>
            </div>
        )}
    </>
  )
}

export default NewPartner