import './App.less';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './container/singIn';
import Panel from './container/Panel';
import ForgotPassword from './container/ForgotPassword';
import ResetPassword from './container/ResetPassword';
import { useAuth } from './hooks/authContext';
import { useEffect } from 'react';
import { getStorage } from './tools/storage';
import { TOKEN, USER_DATA } from './tools/constants';
import Cookies from './tools/cookies';

const cookies = new Cookies();

function App() {
  const {setAuth, setToken, auth} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const t = cookies.getCookie(TOKEN);
    if(cookies) {
      setAuth(getStorage(USER_DATA));
      setToken(t)
      navigate("/app/categories-subcategories#category");
      console.log({t, data: getStorage(USER_DATA)})
    } else {
      navigate("/");
    }
  },[])
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/app/*" element={<Panel />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password/:email' element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
