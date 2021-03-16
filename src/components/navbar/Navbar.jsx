import React, {Component} from 'react';
import { NavLink, Link } from "react-router-dom";
import s from './navbar.module.scss';
import userService from '../../services/userService';


class Navbar extends Component {
    state={};
    render(){
        return(
            <>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">      
                <div className="container">
                    <Link className="nav-item nav-link" to="/">
                        עמוד הבית
                    </Link>
                    <button className="navbar-toggler"
                            type="button"               data-toggle="collapse"
                            data-target="#navbarNav"    aria-controls="navbarNav"
                            aria-expanded="false"       aria-label="Toggle Navigation"
                    > 
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        { !userService.getCurrentUser() &&
                        <ul className="navbar-nav">
                            <li key="abounlnk" className={`nav-item ${s["item-width"]}`}>
                                <NavLink className="nav-item nav-link" to="/about">
                                עלינו
                                </NavLink>
                            </li>
                        </ul>
                        }
                        {
                        userService.getCurrentUser() &&
                        <ul className="navbar-nav">
                        <li key="mytodolnk" className={`nav-item ${s["item-width"]}`}>
                            <NavLink className="nav-item nav-link" to="/todos">
                            רשימת המשימות שלי
                            </NavLink>
                        </li>
                        <li key="mytodolnk" className={`nav-item ${s["item-width"]}`}>
                            <NavLink className="nav-item nav-link" to="/todos">
                            2רשימת המשימות שלי
                            </NavLink>
                        </li>
                        </ul>
                        }

                        { 
                        !userService.getCurrentUser() &&
                        <ul className="navbar-nav ml-auto">
                            <li key="loginLnk" className={`nav-item ${s["underline"]}`} >
                                <NavLink className="nav-item nav-link" to="/signin">
                                כניסה לחשבון
                                </NavLink>
                            </li>
                            <li key="signupLnk" className={`nav-item ${s["underline"]}`}>
                                <NavLink className="nav-item nav-link" to="/signup">
                                הרשמה
                                </NavLink>
                            </li>
                        </ul>
                        }
                        {
                        userService.getCurrentUser() &&
                        <ul className="navbar-nav ml-auto">
                            <li key="exitlnk" className={`nav-item ${s["underline"]}`}>
                                <NavLink className="nav-item nav-link" to="/logout">
                                     יציאה
                                </NavLink>
                            </li>
                       </ul>
                        }
                    </div>
                </div>
            </nav>
            </>
        )
    }
}
export default Navbar;