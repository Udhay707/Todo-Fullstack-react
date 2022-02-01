import { Form, Button, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './edit.css'
import moment from 'moment';
import TodoService from '../api/TodoService';
import AuthenticationService from '../login/AuthenticationService';

const Edit = () => {

    const [desc, setdesc] = useState("");
    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState(false);
    const [descError, setDescError] = useState(false);

    const id = useParams().id;
    const user = AuthenticationService.getUserName();

    const navigate = useNavigate();

    useEffect(
        () => {
            const getdata = async () => await TodoService.getTodo(user, id)
                .then((resp) => {
                    setdesc(resp.data.description);
                    setDate(moment(resp.data.targetDate).format('YYYY-MM-DD'));
                })
            AuthenticationService.addInterceptors(`Bearer ${sessionStorage.getItem("TOKEN")}`);
            getdata()
        }, [id, user])



    function validate() {
        let dateTobeCompared = date;
        let b = moment(dateTobeCompared).isSameOrAfter(moment(new Date()).format('MM/DD/YYYY'));
        if (!b) {
            setDateError(true)
            return false
        }
        else {
            setDateError(false)
        }
        if (desc === '' || desc === null || desc === undefined) {
            setDescError(true)
            return false
        }
        else {
            setDescError(false)
        }
        return true
    }

    async function put() {
        if (validate() && id !== -1) {
            const obj = {
                description: desc,
                id: id,
                targetDate: date,
                user: user
            }
            await TodoService.editTodo(user, id, obj).then(() => navigate(`/home/${user}`))

        }
        if (validate() && id === -1) {
            const obj = {
                description: desc,
                targetDate: date,
                user: user
            }
            await TodoService.addTodo(user, obj).then(() => navigate(`/home/${user}`))
        }
    }



    return <div className='edit-form'>
        <h1>Todo</h1>
        {dateError && <Alert variant='warning' className='text-center'>Please provide a valid target date</Alert>}
        {descError && <Alert variant='warning' className='text-center'>Please provide a valid description</Alert>}
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Todo description" value={desc}
                    onChange={(e) => setdesc(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Target Date</Form.Label>
                <Form.Control type="date" value={date}
                    onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={put}>
                Submit
            </Button>
        </Form>
    </div>
};

export default Edit;
