import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import EmployeeList from './components/EmployeeList'

const App = () => {
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