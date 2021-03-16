import React from 'react';
import s from './input.module.scss';
import FA from './inputIcons';

let k = React.createRef();
let font_pw = {...FA["password"][0],key: "tmpPwkey"};
let font_pwShow = {...FA["showPassword"][0],key: "tmpShowPwkey"};

const Input = ({id, title, errors, ...rest}) => {
    if (rest.type==="submit") {      
        return (          
            <button {...rest} 
            name={id}  id={id} className={"btn btn-warning border" + rest.className}>
                 {title} 
            </button>                 
        )
    } 
    if (rest.type==="text2") {      
      return (    <>      
        <label></label>
        <input {...rest} name={id} id={id} className="form-control d-block" placeholder={title} />
        <span className="text-danger">
            {errors} &nbsp;
        </span>                    
        </>
      )
    }
    if (rest.type==="textAdd") {
      return (    <>      
        <label></label>
        <input {...rest} name={id} id={id} className="form-control d-block" value={title}  />
        <span className="text-danger">
            {errors} &nbsp;
        </span>                    
        </>
      )
    }
    if (rest.type==="password") {
      return (   
        <div className={`form-group ${s.fh}`}>
            <label htmlFor={id}>{title}</label>            
            <div className="d-flex flex-row-reverse" >
               { font_pw } 
               <input ref={k} {...rest} name={id} id={id} className="form-control d-block ml-2 mr-2" /> 
               <button 
                 className="mr-2 rounded bg-trans"
                 onClick={(e)=>{  e.preventDefault();  return false   }}
                 onMouseDown={()=>{ k.current.type="text";            }}
                 onMouseUp={(e)=>{   k.current.type="password";  k.current.focus();      }}
                 onMouseOut={(e)=>{   k.current.type="password";  k.current.focus();  }}
               >
                     {font_pwShow}
               </button>
            </div>
            <span className="text-danger">
                {errors} &nbsp;
            </span>                  
         </div>
      )
    }
    return (
      <div className={`form-group ${s.fh}`}>
        <label htmlFor={id}>{title}</label>
        <input {...rest} name={id} id={id} className="form-control d-block" placeholder={title} />
        <span className="text-danger">
            {errors} 
        </span>       
      </div>
    );
};

export default Input;