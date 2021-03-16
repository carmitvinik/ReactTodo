import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';


function App() {
  return (
    <>
    <ToastContainer />
    <Header />       
    <Main />     
    <Footer />

    </>
  );
}

export default App;
