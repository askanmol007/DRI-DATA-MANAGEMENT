import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Home,LoginPage } from "./pages"
import {AdminDash,Upload,Data,Team} from './pages/dashboard'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        
        <Route path="/" element={ <AdminDash/>} >
          <Route  index element={<Upload/>} />
          <Route path="Data" element={<Data/>} />
          <Route path="team" element={<Team/>} />
        </Route>
        <Route path="/auth" element={<LoginPage/>} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
