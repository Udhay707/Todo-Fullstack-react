import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthenticationService from '../login/AuthenticationService';
import Authentication from '../login/AuthenticationService'
import { AUTHENTICATEDUSER } from '../login/constant/constants.js'

export default function Navbarr() {
    const islogged = Authentication.isLogged();
    //const userName = sessionStorage.getItem(AUTHENTICATEDUSER);
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Link to={`/home/${sessionStorage.getItem(AUTHENTICATEDUSER)}`} >
                    <Navbar.Brand>To-Do App </Navbar.Brand>
                </Link>
                <a href="https://github.com/Udhay707?tab=repositories" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-github git"></i>
                </a>
                
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/">
                        <Navbar.Text onClick={Authentication.logout}>
                            {!islogged ? <></> : <>Logout</>}
                        </Navbar.Text>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}