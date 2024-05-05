
import { Route,Routes } from 'react-router-dom';
import { Header } from './component';
import Login from './component/views/Login';
import {name,email,token} from "./utils/constant"
import Body from './component/Body'
import User from './component/user';
function App() {
  return (

 <div className=' '>
<Routes>
<Route path="/" element={<Body />} />
<Route path="/login" element={<Login />} />
<Route path='/user' element={<User/>}/>
</Routes>
 </div>
 
  );
}

export default App;
