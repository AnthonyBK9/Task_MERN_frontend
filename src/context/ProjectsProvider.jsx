import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientAxios from '../config/ClientAxios'
import { io } from 'socket.io-client'
import UseAuth from '../hooks/useAuth'
let socket

const ProjectsContext = createContext()

const ProjectProvider = ({children}) => {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [partner, setPartner] = useState({})
    const [partnerTask, setPartnerTask] = useState({})
    const [task, setTask] = useState({})
    const [alert, setAlert] = useState({})
    const [search, setSearch] = useState(false)

    const navigate = useNavigate()
    const { auth } = UseAuth()
    useEffect(() => {
        //Obtener los proyectos creados desde la base de datos
        const getProject = async () => {
            try {
                //Validamos el token para la autorización
                const token = localStorage.getItem('token')
                if(!token) return

                const config ={
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` 
                    }
                }
                //Hacemos la consulta a la API 
                const { data } = await ClientAxios('/projects', config)
                setProjects(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        getProject()
    },[auth])

    //? Conexión con Socket.io
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    },[])

    const submitProyect = async (project) => {
        //Verificamos si estamos editando o creando un nuevo proyecto
        if (project.id) {
           await editProject(project)
        } else {
           await newProject(project)
        }
    }

    //Fumción para editar un proyecto
    const editProject = async (project) => {

        try {
             //Validamos el token para la autorización
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
            // Realiza la petición a la API
            const { data } = await ClientAxios.put(`/projects/${project.id}`, project, config)
            // Recorremos el arreglo de projects y validamos en cada posición que cumpla la condicón de project._id y data._id, 
            // en dado caso que se cumpla retornamos data, de lo contrario retornamos project
            const projectsUpdated = projects.map(project => project._id === data._id ? data : project )
            // Agregamos este nuevo array a setProjects con el dato actualizado
            setProjects(projectsUpdated)
            setTimeout(() => {
                navigate('/proyectos')
            }, 2500);
        } catch (error) {
            console.log(error)
        } 
        // 182LFWON
    }

    const newProject = async (project) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios.post('/projects', project, config)
            setProjects([...projects, data])
            setTimeout(() => {
                navigate('/proyectos')
            }, 2500);
           

        } catch (error) {
            console.log(error)
        }
    }

    const getProjectById = async (id) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios(`/projects/${id}`, config)
            setProject(data)
            setAlert({})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios.delete(`/projects/${id}`, config)
            
            const delProject = projects.filter(project => project._id !== id)
            setProjects(delProject)
            setTimeout(() => {
                navigate('/proyectos')
            }, 2500);
            
        } catch (error) {
            console.log(error);
        }
    }

    const submitTask = async (task) => {

        if(task?.id){
           await editTask(task);
        } else {
           await createTask(task)
        }
    }

    const handleModalTask = () => {
        setModalForm(!modalForm)
        setTask({})
    }

    const createTask = async (task) => {

        try {
            
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios.post('/task', task, config)
            
            //agega la tarea al state
            
            setModalForm(false)

            //Socket io
            socket.emit('newTask', data)

        } catch (error) {
            console.log(error)
        }
    }

    const editTask = async (task) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios.put(`/task/${task.id}`, task, config)
            // const updatedProject = {...project}
            // updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === data._id ? data : taskState)
            // setProject(updatedProject)
            setModalForm(false)

            //? Socket IO Actualizar Tarea
            socket.emit('updateTask', data)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (task) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
            const { data } = await ClientAxios.delete(`/task/${task._id}`, config)
            setModalForm(false)
            //Socket io Eliminar tarea
            socket.emit('deleteTask', task)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditTasks = (task) => {
        setTask(task)
        setModalForm(true)
    }

    const submitPartner = async(email) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const {data} = await ClientAxios.post('/projects/partners', {email}, config)
            setPartner(data)
            setAlert({})
        } catch (error) {
            console.log(error)
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false)
        }
    }

    //? Agregando un nuevo colaborador
    const addPartner = async (email) => {
    
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
            const {data} = await ClientAxios.post(`/projects/partners/${project._id}`, email, config)
            setAlert({
                msg: data.msg,
                error: false
            })
            setPartner({})
            setTimeout(() => {
                setAlert({})
            }, 2000)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleDeletePartner = (partner) => {
        // console.log(partner)
        setPartnerTask(partner)
        deletePartner(partner)
    }

    const deletePartner = async (partner) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            //Consulta a la API eliminar colaborador
            const {data} = await ClientAxios.post(`/projects/delete-partner/${project._id}`, {id: partner._id}, config)
            // Obtenemos una copia del proyecto, para no modificar el actual
            const updatedProject = {...project}
            //?  Realimos un filtro a proyecto coloboradores para traernos todos excepto al que eliminamos y lo guardo en el setProject
            updatedProject.partners = updatedProject.partners.filter( partnerState => partnerState._id !== partner._id)
            setProject(updatedProject)
            setPartner({})

        } catch (error) {
            console.log(error.response);
        }
    }

    const completeTask = async(id) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            const { data } = await ClientAxios.post(`/task/state/${id}`, {},config)
            // const updatedProject = {...project}
            // updatedProject.tasks = updatedProject.tasks.map(task => task._id === data._id ? data : task)
            // setProject(updatedProject)

            //? Socket IO actualizar tarea
            socket.emit('completeTask', data)

            setTask({})
            setAlert({})
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSearch = () => {
        setSearch(!search)
    }

    const submitTaskProject = (task) => {
   
        const updatedProject = {...project}
        updatedProject.tasks = [...updatedProject.tasks, task]
        setProject(updatedProject)
    }

    const deleteTaskProject = (task) => {
        const updatedProject = {...project}
        updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id)
        setProject(updatedProject)
    }

    const updateTaskProject = (task) => {
        const updatedProject = {...project}
        updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(updatedProject)
    }

    const completeStateTask = (task) => {
        const updatedProject = {...project}
        updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)
        setProject(updatedProject)
    }

    //Cerrar sesión
    const signOut = (task) => {
        setProject({})
        setProjects([])
        setAlert({})
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                alert,
                submitProyect,
                getProjectById,
                deleteProject,
                project,
                loading,
                handleModalTask,
                modalForm,
                submitTask,
                createTask,
                editTask,
                deleteTask,
                handleModalEditTasks,
                setTask,
                task,
                submitPartner,
                partner,
                addPartner,
                handleDeletePartner,
                partnerTask,
                deletePartner,
                completeTask,
                handleSearch,
                search,
                submitTaskProject,
                deleteTaskProject,
                updateTaskProject,
                completeStateTask,
                signOut
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectProvider
}

export default ProjectsContext