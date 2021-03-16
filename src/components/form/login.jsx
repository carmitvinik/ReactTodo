import React, {useState} from 'react';
import Joi from 'joi-browser';
import userService from '../../services/userService';
import JoiHeb from './joiHeb';
import {login} from './schema';
import { toast } from "react-toastify";
import Input from './input';
import ttext from '../configTranslate';
const LogIn = () => {
    const [password, setPass] = useState('');
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState({    username: '', password: '', email:''    });
    const joiOptions = { abortEarly:false };
    return (
        <form onSubmit={ async (e)=>{ 
             e.preventDefault();
             let joiObj = Joi.validate({password:password, email:email},login,joiOptions);
             if (!joiObj.error) { //do submit
                try {
                    await userService.login(email,password);
                    toast(ttext["loginMsg"]);
                    window.location = '/'; //redirect full refresh
                } 
                catch (ex) {
                    if (ex.response && ex.response.status === 400) {      setErrors({ ...errors,  email: JoiHeb['auth400'] });      }
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
            <Input type="text" id="email" title="אימייל" errors={errors.email} icon="email"
            onChange={ (e) => { setErrors({    username: '', password: '', email:''   });    setEmail(e.target.value);     }} 
            onKeyPress= { (e)=> { 
                if (e.key==="Enter") {
                    
                    document.getElementById("pw").focus();
                    document.getElementById("pw").select();
                    
                }
                } 
            }
            />            
            <Input type="password" id="pw" title="סיסמה" errors={errors.password} 
            onChange={ (e) => { setErrors({    username: '', password: '', email:''   });    setPass(e.target.value);       }} 
            onKeyPress={ (e)=> { if (e.key==="Enter") {
                    document.getElementById("submit").focus();
                }}
            }
            /> 
            <Input type="submit" id="submit" title={JoiHeb['btnLogin']}  />                                                         
        </form>
    )
    
}

export default LogIn;