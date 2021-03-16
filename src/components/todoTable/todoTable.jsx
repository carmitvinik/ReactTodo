import React from  'react';
import todoService from '../../services/todoService.js';
import userService from '../../services/userService';
import CreateTodo from '../createTodo/createTodo';
import appStyle from '../todos/todos.module.scss';

class TodoTable extends React.Component {
    constructor(props){
        super();
        this.state = {
            todolist: [],
        };
        this.updatetodo=this.updatetodoView.bind(this);
        this.applyTable=this.applyTable.bind(this);
        this.delTodo=this.delTodo.bind(this);
        this.makeDone=this.makeDone.bind(this); 
    }
    componentDidMount = async () => {
        let todos =  await todoService.retrieveTodo({_id: userService.getCurrentUser()._id});
        this.setState({todolist:todos});
    }
    componentDidUpdate = (prevProps,prevState) => {
        console.log("component did update **",prevState);
    }

    updatetodoView = async () =>{
        let todos =  await todoService.retrieveTodo({_id: userService.getCurrentUser()._id});
        await this.setState({todolist:todos});
        console.log(todos);
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
    editModeButton = () => {
        return  <button className="btn btn-danger"   
                onClick={(e)=>{ 
                        let el=e.target.parentElement.parentElement;
                        el.classList.add('collapse');                            
                        el.nextSibling.classList.remove('collapse');                             
                        }}       
                >ערוך 
                </button>;
      
    }
    exitEditModeButton = () => {
        return ( <button className="btn btn-danger"   
                onClick={(e)=>{ 
                    let el=e.target.parentElement.parentElement;
                    let pel=el.previousSibling;
                    el.className=el.className+' collapse';
                    pel.classList.remove('collapse');
                }} 
                >צא ממצב עריכה
                </button> )
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
                        <th scope="col">#</th>
                        <th scope="col" >משימה</th>
                        <th scope="col">סטטוס ביצוע</th>
                        <th scope="col" colSpan="3">נוסף בתאריך</th>

                    </tr> 
                    </thead>
                    <tbody>
                    {this.state.todolist.map((todo,idx) => {
                    let {_id , todoTitle, isdone, createdAt} = todo;
                    //let editableRef = React.createRef();
                    
                    
                    return (   
                        <React.Fragment key={idx+1}>                                        
                    <tr >
                         <th scope="row">{idx+1}</th>
                         <td> {this.editableContentToView(todoTitle)}</td>
                         <td> {this.applyDoneButton(todo)}</td>
                         <td> {this.createdDate(createdAt)}</td>
                         <td> {this.delButton(_id)}  </td>
                         <td> {this.editModeButton()} </td>
                    </tr> 
                    <tr className="collapse bg-warning border">
                        <th scope="row">{"מצב עריכה של-"+(idx+1)}</th>
                        <td contentEditable="true" >{this.editableContentToView(todoTitle)}</td>
                        <td> <input className={appStyle.roundedTwo} type="checkbox" value={isdone} /></td>
                        <td> {this.createdDate(createdAt)}</td>
                        <td> {this.updateButton(_id)} </td>
                        <td> {this.exitEditModeButton()}</td>                    

                    </tr>
                     </React.Fragment>
                    );
                })}
                </tbody></table></div>
        );
    }

    render() {
        return(
            <div className="container">
                <div className="row">                   
                    <CreateTodo update={this.updatetodo}/>                   
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

export default TodoTable;