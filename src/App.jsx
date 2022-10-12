import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute'

import ConfirmAccount from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import NewPassword from './pages/NewPassword'
import Register from './pages/Register'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import Project from './pages/Project'

import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectsProvider'
import EditProject from './pages/EditProject'
import NewPartner from './pages/NewPartner'



function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>

            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login />}/>
              <Route path="registrar" element={<Register />}/>
              <Route path="reestablecer-password" element={<ForgetPassword />}/>
              <Route path="reestablecer-password/:token" element={<NewPassword />}/>
              <Route path="confirmar-cuenta/:id" element={<ConfirmAccount />}/>
            </Route>

            <Route path="/proyectos" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="crear-proyecto" element={<NewProject />} />
              <Route path="nuevo-colaborador/:id" element={<NewPartner />} />
              <Route path=":id" element={<Project />} />
              <Route path="editar/:id" element={<EditProject />} />
            </Route>

          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
