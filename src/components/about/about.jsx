import React from "react";
import { Redirect } from "react-router-dom";
import userService from  '../../services/userService';
 
const About = () => {   
    if (userService.getCurrentUser())  return <Redirect to="/" />;
 
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>עלינו</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>
              כרמית ויניק
              מתכנתת כללית ומתכנתת ווב
              פתרונות פלסטר ופתרונות לטווח ארוך 
              מחקר ופיתוח
              פיתוח טכנולוגיות לפי הצורך
            </p>
          </div>
        </div>
      </div>
    );
}

 
export default About;