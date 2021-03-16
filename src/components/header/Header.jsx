import React from 'react';
import s from './header.module.scss';
import Navbar from '../navbar/Navbar';
import userService from '../../services/userService';

const Header = () => {
    
    return(
        <header className={"container-fluid "+s.main}>
            <h1 className="text-left">פרוייקט רשימת משימות 2020</h1>
            {
            userService.getCurrentUser() ? <div>שלום משתמש</div> : <div>{ '{ שעורי בית של כרמית ויניק }'  }</div>
            }
            
            <div>
                <Navbar />
            </div>
        </header>
    )
}

export default Header;
