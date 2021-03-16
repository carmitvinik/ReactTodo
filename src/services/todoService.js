import http from "./httpService";
import { apiURL } from "../components/config.json";

const createTodo = async (todoTitle) => {
    await http.post(`${apiURL}/Todos`, {todoTitle});
}

const retrieveTodo = async (currentUser) => {
    let x = await http.get(`${apiURL}/todos`,{currentUser});
    let data = await x.data;
    return data;
   
}

const updateTodo = async (todoId,todoTitle,isdone) => {
    await http.put(`${apiURL}/todos/${todoId}`, {todoTitle,isdone});

}

const deleteTodo = async (todoId) => { //now
    await http.delete(`${apiURL}/todos/${todoId}`);

}

export default { 
  createTodo,
  retrieveTodo,
  updateTodo,
  deleteTodo, 
};