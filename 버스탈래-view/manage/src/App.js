import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Main from './components/Main';
import Login from './components/Login';
import Manage from './components/Manage';
import Detail from './components/Detail';
import Delete from './components/Delete';
import Update from './components/Update';
import UpdateCheck from './components/UpdateCheck';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route> 
          <Route path='/main' element={<Main />}></Route>
          <Route path='/regist' element={<Register />}></Route>
          <Route path='/manage' element={<Manage />}></Route>
          <Route path='/detail' element={<Detail />}></Route>
          <Route path='/delete' element={<Delete />}></Route>
          <Route path='/update' element={<Update />}></Route>
          <Route path='/updateCheck' element={<UpdateCheck />}></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;