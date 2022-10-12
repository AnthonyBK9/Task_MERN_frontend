import { useContext } from 'react'
import ProjectsProvider from '../context/ProjectsProvider'

const useProjects = () => {
  return  useContext(ProjectsProvider)
}

export default useProjects