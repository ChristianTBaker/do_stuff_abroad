import React from 'react';
import { Jumbotron, Container } from 'reactstrap'
import './NavBar.css'

function NavBar(props) {
    return (
        <div >
            <Jumbotron fluid className='jumbotron'>
                <Container fluid >
                    <h1 className="display-3">Do Stuff Abroad</h1>
                    <p className="lead">A place for travelers..... to do stuff.</p>
                </Container>
            </Jumbotron>
        </div>
    );
};

export default NavBar;