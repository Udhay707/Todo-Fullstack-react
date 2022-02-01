import './App.css';
import LoginComp from './Component/login/LoginComp';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Welcome from './Component/welcomeTodo/Welcome';
import ErrorComp from './Component/error/ErrorComp';
import Navbarr from './Component/navbar/Navbarr';
import AuthenticatedRoute from './Component/login/AuthenticatedRoute';
import Edit from './Component/edit/Edit'


function App() {
  return (
    
    <BrowserRouter>
      <Navbarr />
      <Routes>
        <Route path="/" exact element={<LoginComp />} />
        <Route path="/home/:username" element={
                                                <AuthenticatedRoute>
                                                      <Welcome />
                                                </AuthenticatedRoute>    
                                               } />
        <Route path="/home/:username/:id" element={
                                                  <AuthenticatedRoute>
                                                      <Edit />
                                                  </AuthenticatedRoute>
                                                  } />
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
