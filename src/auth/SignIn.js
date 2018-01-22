import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, FormGroup, FormControl, ControlLabel, PageHeader, Button} from 'react-bootstrap'

import {PasswordForgetLink} from './PasswordForget';
import {SignUpLink} from './SignUp';
import {auth} from '../firebase';
import * as routes from '../components/Routes';

import './SignIn.css'

const SignInPage = ({history}) =>
    <div className="sign-in">
        <PageHeader>Sign In</PageHeader>
        <SignInForm history={history}/>
        <SignUpLink/>
        <PasswordForgetLink/>
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="first.last@carleton.ca"
                    />
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="ex. ******"
                    />
                    <Button disabled={isInvalid} type="submit">
                        Sign In
                    </Button>

                    {error && <p>{error.message}</p>}
                </FormGroup>
            </Form>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};