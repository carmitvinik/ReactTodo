import React , {useState} from  'react';
import Input from '../form/input';
import todoService from '../../services/todoService.js';
import ttext from '../configTranslate';
import { toast } from 'react-toastify';

const CreateTodo = (props) => {
    const [errors,setErrors] = useState({});
    const [todoTitle, setTitle] = useState("");
    const resetTitle = (str="") => {
        setTitle(str);
        setErrors({});              
    }
    return (       
        <form 
            className="h-50 col-12 d-inline-flex flex-row-reverse justify-content-center m-2" 
            onSubmit={ async (e)=>{ 
                    e.preventDefault();
                    if (todoTitle.length<2) {  
                        setErrors({ addTodo: ttext['errLessThenTwoCharacters'] });
                    }
                    else{
                        let currentTitle=todoTitle;
                        resetTitle();
                        
                        todoService.createTodo(currentTitle)
                        .then( () =>{ 
                            toast(ttext['msgTodoAdded']);
                            props.update();   
                            
                        })
                        .catch(e => {
                            toast(ttext.JoiHeb['server404']);
                            setErrors({ ...errors,  addTodo: ttext.JoiHeb['server404'] }); // wont work
                        });                     
                    };
                }                    
            }
        >           
            <div>          
                <Input 
                type="textAdd" 
                title={todoTitle}
                errors={errors.addTodo}
                onChange={(e) => { resetTitle(e.target.value) } }         
                />
            </div> 
            <div className="align-self-center">               
                <Input type="submit" id="submit" title={ttext.add}  /> 
            </div>                
        </form>    
    )
}
export default CreateTodo;