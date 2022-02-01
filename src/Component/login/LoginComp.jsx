import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginComp.css';
import { Button, Form } from 'react-bootstrap'
import AuthenticationService from './AuthenticationService.js';


function LoginComp(props) {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [login, setLogin] = useState(null);
    function passCheck() {
        // if (name === "udhay" && pass === "udhay707") {
        //     setLogin("Login Successful");
        //     AuthenticationService.registerSuccessful(name, pass);
        //     AuthenticationService.isLogged() && navigate(`/home/${name}`);
        // }
        // else
        //     setLogin("Invalid Credetials")

        // AuthenticationService.executeBasicAuth(name, pass)
        // .then(()=>{setLogin("Login Successful");
        //     AuthenticationService.registerSuccessful(name, pass);
        //     AuthenticationService.isLogged() && navigate(`/home/${name}`);})
        // .catch(()=>{
        //         setLogin("Invalid Credetials") 
        //     })
            AuthenticationService.executeJWTAuth(name, pass)
        .then((response)=>{setLogin("Login Successful");
            AuthenticationService.registerSuccessfulforJWT(name, response.data.token);
            AuthenticationService.isLogged() && navigate(`/home/${name}`);})
        .catch(()=>{
                setLogin("Invalid Credetials") 
            })
    }
    return (
        <Form className="form-class">
            <h1 className={(login === "Login Successful" ? "login" : 'invalid')}>{login}</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" 
                            onChange={(e) => { setName(e.target.value) }} value={name}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                            onChange={(e) => { setPass(e.target.value) }} value={pass}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={passCheck}>
                Login
            </Button>
        </Form>
        
    )
}

export default LoginComp;