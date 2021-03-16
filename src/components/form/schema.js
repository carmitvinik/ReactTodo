import Joi from 'joi-browser';

export const signup = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().alphanum().required().min(6).label("Password"),
    username: Joi.string().alphanum().required().min(2).max(30).label("Name"),
};

export const login = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().alphanum().required().min(6).label("Password"),
};




export default {
    signup,
    login,
   
}