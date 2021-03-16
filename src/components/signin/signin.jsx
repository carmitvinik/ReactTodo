import React from "react";
import LogIn from '../form/login';
import userService from '../../services/userService';
import { Redirect } from "react-router-dom";


const Signin = () => {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>כניסה לחשבון</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>כניסה לחשבון משתמש</p>
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <div className="col-lg-6">
            <LogIn />                
          </div>
        </div>
      </div>
    );
 
}
 
export default Signin;