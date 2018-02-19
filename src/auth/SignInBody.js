import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import '../components/FAQ'
import Questions from "../components/FAQ";

class SignInBody extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Carleton COMP1406 RSG</h1>
                    <p>Welcome! Please sign in for access to your attendance and notes.</p>
                </Jumbotron>
                <Questions/>
            </div>
        )
    }
}

export default SignInBody