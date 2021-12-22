import BodyContainer from './bodyFile/BodyContainer';
import Login from './login/Login';
import { BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import {ProviderLogin} from './ContextLogin';
import { useState } from 'react';
export default function AdminRouter() {
  const [stateLogin,setStateLogin] = useState({
    estadoLogin:false,
    dataLogin:''
  });
  window.addEventListener('popstate',(e)=>{if(window.location.pathname==='/'){
    setStateLogin({
      estadoLogin:false,
      dataLogin:''
    });
  }});
    return (
      <>
        <ProviderLogin value = {setStateLogin}>
          <Router>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path="/registerUser" element={stateLogin.estadoLogin ? <BodyContainer /> : <Navigate to="/" />}></Route>
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </ProviderLogin>
      </>
    );
}
  