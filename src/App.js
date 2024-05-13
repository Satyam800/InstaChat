
import { Route,Routes } from 'react-router-dom';
import { Header } from './component';
import Login from './component/views/Login';
import {name,email,token} from "./utils/constant"
import Body from './component/Body'
import User from './component/user';
import Search from './component/search';
import SearchProfile from './component/searchProfile';
import TweetCard from './component/tweetCard';
function App() {
  return (

 <div className=' '>
<Routes>
<Route path="/" element={<Body />} />
<Route path="/login" element={<Login />} />
<Route path='/user' element={<User/>}/>
<Route path='/search' element={<Search/>}/>
<Route path='/searchProfile/:name' element={<SearchProfile/>}/>
</Routes>
 </div>
 
  );
}

export default App;
