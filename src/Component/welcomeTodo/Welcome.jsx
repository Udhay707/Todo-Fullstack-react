import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Table } from 'react-bootstrap';
import './welcome.css'
import HelloWorldService from '../api/HelloWorldService';
import AuthenticationService from '../login/AuthenticationService';
import TodoService from '../api/TodoService';
import moment from 'moment';


const Welcome = () => {
  const param = useParams();
  const navigate = useNavigate();
  const userName = AuthenticationService.getUserName();

  const obj = {
    todo: [],
    message: null
  }


  const [list, setList] = useState(obj);
  const [user, setUser] = useState("");
  //const [fetchList, setFetchList] = useState(true);

  // const todoList = async ()=> await TodoService.getTodoList(userName) //get todoList
  //             .then((resp)=>setList({...list,todo: resp.data}));

  async function todoList(deleted = true) {
    if (deleted === false) {
      await TodoService.getTodoList(userName) //get todoList
        .then((resp) => setList({ ...list, todo: resp.data, message: `Deleted task Successfully` }));
    }
    else {
      await TodoService.getTodoList(userName) //get todoList
        .then((resp) => setList({ ...list, todo: resp.data, message: null }));
    }
  }

  async function changeComplete(id, isDone) {
    await TodoService.getTodo(userName, id)
      .then((resp) => {
        var ob = resp.data;
        changeData(isDone, id, ob);
      })
  }

  async function changeData(isDone, id, ob) {
    const newObj = { ...ob, done: !isDone };
    //console.log(newObj);
    await TodoService.editTodo(userName, id, newObj) //put
      .then(() => todoList());
  }

  useEffect( // name retrive
    () => {
      const wecomeData = () => HelloWorldService.retriveHelloWorld(param)
        .then((resp) => setUser({ welcomeMessage: resp.data.name }))
        .catch((err) => console.log(err));
      //console.warn(`Bearer ${sessionStorage.getItem("TOKEN")}`)

      AuthenticationService.addInterceptors(`Bearer ${sessionStorage.getItem("TOKEN")}`);
      wecomeData();
      todoList();
    }, [])


  async function deleteByid(id) {
    if (window.confirm("Are you sure do u want to delete ?")) {
      await TodoService.deleteTodo(userName, id)
        .then(() => todoList(false))
        //console.log("list deleted ",list)
        ;
    }
  }

  function updateByid(id) {
    navigate(`/home/${userName}/${id}`)
  }

  return <div className='welcome'>
    <h1> {user.welcomeMessage} </h1>
    {list.message && <Alert variant='warning' className='text-center'>{list.message}</Alert>}
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Description</th>
          <th>Target Date</th>
          <th>Status</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          list.todo.map(
            (k) => (
              <tr key={k.id}>
                <td>{k.description}</td>
                <td>{moment(k.targetDate).format("MM-DD-YYYY")}</td>
                <td onClick={() => changeComplete(k.id, k.done)}>
                  {(k.done.toString() === "false") ?
                    <i className="fa fa-times-circle red"></i>:
                    <i className="fa fa-check green" aria-hidden="true"></i>}</td>
                <td>
                  <Button className="margin" variant="warning" size="sm" onClick={() => {
                    updateByid(k.id)
                  }}>Edit</Button>
                </td>
                <td>
                  <Button className="margin" variant="danger" size="sm" onClick={() => {
                    deleteByid(k.id)
                  }}>Delete</Button>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
    <Link to={`/home/${userName}/-1`}>
      <Button className="margin" variant="success">Add</Button>
    </Link>
  </div>;
};

export default Welcome;
