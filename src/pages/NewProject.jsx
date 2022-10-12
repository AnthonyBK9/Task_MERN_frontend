import React from 'react'
import FormProject from '../components/FormProject'

const NewProject = () => {
  return (
    <>
      <h2 className="text-white mt-10 font-bold text-xl">Crear Proyecto</h2>
      <div className="mt-10 flex justify-center">
          <FormProject/>
      </div>
    </>
  )
}

export default NewProject