import React from "react";
import SignUpForm from '../form/signupForm';
import s from './signup.module.scss';
import { Redirect } from 'react-router-dom';
import userService from '../../services/userService';
 
const Signup = () => { 
  if (userService.getCurrentUser()) return <Redirect to="/" />;

  return (
    <div className={`container ${s.direction}`}>
      <div className={`row`}>
        <div className={`col-12 mt-4`}>
          <h1> הרשמה לשירות רשימת משימות אישית</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>אתה יכול לפתוח חשבון חופשי!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
         <SignUpForm />                
        </div>
      </div>
    </div>
  );
}   

 
export default Signup;