import HeaderSite from './components/headerFile/HeaderSite';
import './App.css';
import React from 'react';
import AdminRouter from './components/AdminRouter';
function App() {
  return (
    <>
      <HeaderSite></HeaderSite>
      <AdminRouter></AdminRouter>
    </>
  );
}

export default App;