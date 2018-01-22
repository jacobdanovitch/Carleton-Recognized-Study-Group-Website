import React, {Component} from 'react'
import {Link, withRouter,} from 'react-router-dom';
import {ControlLabel, Form, FormControl, FormGroup, PageHeader, Button} from 'react-bootstrap'

import {auth, db} from '../firebase';
import * as routes from '../components/Routes.js'

import './SignUp.css'

const SignUpPage = ({history}) =>
    <div className="sign-up">
        <PageHeader>Sign Up</PageHeader>
        <SignUpForm history={history}/>
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    studentID: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
            studentID
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({...INITIAL_STATE}));
                        history.push(routes.HOME);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });

            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            studentID,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            !(email.includes('carleton.ca')) ||
            username === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup
                    controlId="formBasicText"
                    //validationState={this.getValidationState()}
                >
                    <ControlLabel>Full Name</ControlLabel>
                    <FormControl
                        value={username}
                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                        type="text"
                        placeholder="ex. Cowboy Collier"

                    />
                    <ControlLabel>Carleton Email</ControlLabel>
                    <FormControl
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="ex. first.last@carleton.ca"
                    />
                    <ControlLabel>Student Number</ControlLabel>
                    <FormControl
                        value={studentID}
                        onChange={event => this.setState(byPropKey('studentID', event.target.value))}
                        type="text"
                        placeholder="ex. 101265351"
                    />
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder="not 1234"
                    />
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="not 1234"
                    />
                </FormGroup>
                <Button block disabled={isInvalid} type="submit">
                    Sign Up
                </Button>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};