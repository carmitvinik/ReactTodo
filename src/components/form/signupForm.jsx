import React, {useState} from 'react';
import Joi from 'joi-browser';
import JoiHeb from './joiHeb'; // its just an errors translations to hebrew of Joi
import {useHistory} from 'react-router-dom';
import { toast } from "react-toastify";
import userService from '../../services/userService';
import schema from './schema';
import Input from './input';

const SignUpForm  = () => {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState({
        username: '', password: '', email:''
    });
    const joiOptions = { abortEarly:false };
    const history = useHistory();
    
    
    return (
        <form onSubmit={ async (e)=>{ 
             e.preventDefault();
             let joiObj = Joi.validate({username: username,password:password, email:email},schema.signup,joiOptions);
             if (!joiObj.error) { //do submit
                try {
                    userService.createUser(username,email,password);
                    toast("החשבון נפתח בהצלחה");
                    history.replace("/signin"); //redirect
                } 
                catch (ex) {
                    if (ex.response && ex.response.status === 400) {      setErrors({ ...errors,  email: JoiHeb['email.taken'] });      }
                    else if (ex.response && ex.response.status === 404) { alert(JoiHeb['server404'])}
                }
             } else { // handle errors
                let joiErr = joiObj.error.details[0];
                JoiHeb[joiErr.type] ? 
                setErrors({ ...errors,  [joiErr.path[0]] : JoiHeb[joiErr.type] }) :
                setErrors({ ...errors,  [joiErr.path[0]] : joiErr.message }) ;
                return false;
             }
        }}>
            <Input type="text" id="username" title="שם משתמש" errors={errors.username} 
            onChange={ (e) => { setErrors({    username: '', password: '', email:''   });    setUsername(e.target.value);  }} 
            onKeyPress={(e)=>{if (e.key==="Enter") {
                document.getElementById("email").focus();
                document.getElementById("email").select();
            }}}
            />
            <Input type="text" id="email" title="אימייל" errors={errors.email} 
            onChange={ (e) => { setErrors({    username: '', password: '', email:''   });    setEmail(e.target.value);     }} 
            onKeyPress={(e)=>{if (e.key==="Enter") {
                document.getElementById("pw").focus();
                document.getElementById("pw").select();
            }}}
            />
            <Input type="password" id="pw" title="סיסמה" errors={errors.password} 
            onChange={ (e) => { setErrors({    username: '', password: '', email:''   });    setPass(e.target.value);       }} 
             onKeyPress={(e)=>{if (e.key==="Enter") {
                document.getElementById("submit").focus();
            }}}
            />   
            <Input type="submit" id="submit" title="הרשם"  />                                                         
        </form>
    )
}

export default SignUpForm;