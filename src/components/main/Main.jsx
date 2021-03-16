import React from 'react';
import s from './main.module.scss';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/home';
import About from '../about/about';
import Signup from '../signup/signup';
import Signin from '../signin/signin';
import Logout from '../logout/logout';
import Todos from '../todos/todos';
const Main = () => {   
   return(
       <>
       <main className={s.minHeight}>
       <Switch>
           <Route path="/about" component={About} />
           <Route path="/" exact component={Home} />
           <Route path="/signup" component={Signup}/>
           <Route path="/signin" component={Signin} />
           <Route path="/logout" component={Logout} />
           <Route path="/todos" component={Todos} />
           
       </Switch>
       </main>
       </>
        )    
}
export default Main;