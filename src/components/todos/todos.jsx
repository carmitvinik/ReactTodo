import React from  'react';
import todoService from '../../services/todoService.js';
import userService from '../../services/userService';
import CreateTodo from '../createTodo/createTodo';
import appStyle from './todos.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit} from '@fortawesome/free-solid-svg-icons';
import ttext from '../configTranslate';
import { Redirect } from "react-router-dom";

class Todos extends React.Component {
    constructor(props){
        super();
        this.state = {
            todolist: [],
            createTitle: '',
            todolistEditModeStatus:[],
            todolistRefs:[]
          
        };
        this.updatetodo=this.updatetodoView.bind(this);
        this.applyTable=this.applyTable.bind(this);
        
                
        
    }
    componentDidMount = async () => {
        if (userService.getCurrentUser()!==null) {
        let todos =  await todoService.retrieveTodo({_id: userService.getCurrentUser()._id});
        this.setState({todolist:todos}); 
        let edStatus = todos.map(item=> false);       
        this.setState({ todolistEditModeStatus: edStatus });
        let refarr= todos.map(item=> React.createRef);
        this.setState({todolistRefs:refarr});
        }
        

    }
    componentDidUpdate = (prevProps,prevState) => {
       /*  console.log("component did update ** prevState",prevState);
        console.log("component did update ** State",this.state); */
       
        console.log('did update');
        console.log('update editmode',this.state.todolistEditModeStatus);


        
    }

    updatetodoView = async () =>{
        let todos =  await todoService.retrieveTodo({_id: userService.getCurrentUser()._id});
        await this.setState({todolist:todos});
        await this.setState({createTitle:''});
        let edStatus = todos.map(item=> false);       
        this.setState({ todolistEditModeStatus: edStatus });
        let refarr= todos.map(item=> React.createRef);
        this.setState({todolistRefs:refarr});
    }
    delTodo = async (_id) =>{
        todoService.deleteTodo(_id);
        this.updatetodoView();
        
    }
    makeDone = async (_id,todoTitle) =>{
        todoService.updateTodo(_id,todoTitle,true);
        this.updatetodoView();       
    }
    delButton = (_id) => {       
       return(
        <button className="btn btn-danger" onClick={async ()=>{this.delTodo(_id)}}>מחק</button>
       )
    }
    updateButton = (_id) => {
        return(
        <button className="btn btn-danger"   onClick={(e)=>{ 
            let el=e.target.parentElement.parentElement;
            let pel=el.previousSibling;
            el.classList.add('collapse');
            pel.classList.remove('collapse');
            let upob={};
            upob.todoTitle=el.children[1].innerHTML;
            upob.isdone=el.children[2].firstElementChild.checked;
            console.log(upob);
            todoService.updateTodo(_id,upob.todoTitle,upob.isdone);
            this.updatetodoView();       
        }}       
        >עדכן 
        </button>
        )
    }
    editModeButton = (idx) => {

        return  <button className="btn btn-danger"   
                onClick={()=>{
                    let editstatus = [...this.state.todolistEditModeStatus];
                    editstatus[idx] = !editstatus[idx];
                    this.setState({todolistEditModeStatus: editstatus});
                            
                   
                    }}       
                >
                    <FontAwesomeIcon icon={faEdit} /> {ttext.edit} 
                </button>;
      
    }
    exitEditModeButton = () => {
        return  <button className="btn btn-danger"   
                onClick={(e)=>{ 
                    let el=e.target.parentElement.parentElement;
                    let pel=el.previousSibling;
                    el.classList.add('collapse');
                    pel.classList.remove('collapse');
                }} 
                >צא ממצב עריכה
                </button> ;
    }

    applyDoneButton = (todo) => {
        if (todo.isdone) 
            return <input className={appStyle.roundedTwo} type="checkbox" checked="checked" onChange={()=>{}} disabled value="false" />;
        else
            return <input className={appStyle.roundedTwo} type="checkbox" value="true" onChange={()=>{ this.makeDone(todo._id,todo.todoTitle) }} />;

    }

    editableContentToView = (content) => {
        return <div dangerouslySetInnerHTML={{__html:content}}></div>;
    }

    createdDate = (createdAt) => {
        let currentDateTime = new Date(createdAt);
        currentDateTime = currentDateTime.toLocaleDateString();
        return currentDateTime;
    }
    

    applyTable = () => {
        
       
        return(
            <div className="table-responsive ">
            <table className="table" dir="rtl">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col"><FontAwesomeIcon icon={faCoffee} /></th>
                        <th scope="col" >משימה</th>
                        <th scope="col">סטטוס ביצוע</th>
                        <th scope="col" colSpan="3">נוסף בתאריך</th>

                    </tr> 
                    </thead>
                    <tbody>
                    {this.state.todolist.map((todo,idx) => {
                        let {_id , todoTitle, createdAt} = todo;                                                                                                        
                        return (   
                                <React.Fragment key={idx+1}>                                        
                            <tr 
                            onClick={ (e)=>{
                                e.preventDefault();
                                console.log(e.target);
                            }} 
                            className={ this.state.todolistEditModeStatus[idx] ? "table-danger" : ""}
                            >
                                <th scope="row">{idx+1}</th>
                                <td 
                                onKeyDownCapture={()=>{console.log('change ev');}}
                                onPasteCapture={()=>{console.log('paste ev');}}
                                suppressContentEditableWarning
                                contentEditable={this.state.todolistEditModeStatus[idx]}> 
                                    {this.editableContentToView(todoTitle)}
                                </td>
                                <td> {this.applyDoneButton(todo)}</td>
                                <td> {this.createdDate(createdAt)}</td>
                                <td> {this.delButton(_id)}  </td>
                                <td> {this.editModeButton(idx)}
                                 </td>
                            </tr> 
                           
                        </React.Fragment>
                        );
                })}
                </tbody></table></div>
        );
    }

    render() {
        if (!userService.getCurrentUser())  return <Redirect to="/" />;

        return(
            <div className="container">
                <div className="row">                   
                    <CreateTodo update={this.updatetodo} title={this.state.createTitle} />                   
                </div>
                <div className="row">
                    <div className="col-12 align-items-center">
                        {this.applyTable()}                
                    </div>                
                </div>
            </div>                      
        )
    }
}






export default Todos;