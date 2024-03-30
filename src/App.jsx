import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import EmployeeList from './components/EmployeeList'
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/login')
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/employeelist' element={<EmployeeList/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
