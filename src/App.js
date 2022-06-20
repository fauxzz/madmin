import './App.less';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './container/singIn';
import Panel from './container/Panel';
import ForgotPassword from './container/ForgotPassword';
import ResetPassword from './container/ResetPassword';
import { useAuth } from './hooks/authContext';
import { useEffect } from 'react';
import { getStorage } from './tools/storage';
import { USER_DATA } from './tools/constants';

function App() {
  // const {auth, setAuth} = useAuth()
  // useEffect(() => {
  //   const user = getStorage(USER_DATA);
  //   if (user !== null) setAuth(user) 
  //   console.log(auth)
    
  // },[])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* <Route path="/" element={<Navigate to={auth !== null ? "/app/categories-subcategories#category" : "/login"} />} /> */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/app/*" element={<Panel />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password/:email' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
