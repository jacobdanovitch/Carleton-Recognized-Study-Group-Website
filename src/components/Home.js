import React, {Component} from 'react';
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import {Button, Form, FormControl, Jumbotron} from 'react-bootstrap'

import {SessionTable} from './SessionTable'
import Questions from './FAQ'
import './Home.css';

import withAuthorization from '../auth/withAuthorization';
import {db} from '../firebase'
import * as firebase from "../firebase/firebase";

import * as _ from 'underscore'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUserName: '',
            activeUserID: '',
            sessions: {},
            numSessions: 0,
            code: '',
        };
    }

    updateSessions = (userID) => {
        db.getUserSessions(userID).then(snapshot =>
            this.setState(() => ({sessions: snapshot.val()}),
                function () {
                    this.setState({numSessions: _.size(this.state.sessions)})
                }
            )
        );
    };

    setActiveUser = () => {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState(
                    {activeUserID: user.uid},
                    function () {
                        this.updateSessions(this.state.activeUserID)
                    })
            }
        })

    };

    componentDidMount = () => {
        this.setActiveUser();
    };

    verifyAttendance = (inputCode, userID, userSessions) => {
        db.getSessions().then((snapshot) => {
                const sessions = snapshot.val();
                const currentSession = sessions[sessions.length - 1];

                let verified = db.validateSession(currentSession, inputCode, userSessions);
                if (verified) {
                    alert('All good!');
                    db.userAttendedSession(userID, currentSession.date)
                }
            }
        )
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.verifyAttendance(this.state.code, this.state.activeUserID, this.state.sessions);
        this.updateSessions(this.state.activeUserID);
    };

    render() {
        loadTheme({
            palette: {
                'themePrimary': '#a80000'
            }
        });

        return (
            <div className="App ms-Grid">
                <Jumbotron>
                    <h1 className="App-title ms-Grid-row">COMP1406 Recognized Study Group</h1>
                    <hr/>
                    <div>
                        <p>
                            Welcome to Jacob and Tim's recognized study group for COMP1406 at Carleton University.
                            Here, you'll find information about when and where the group meets, what topics we'll be
                            covering, and more. Join the facebook group in the navigation to stay up to date.
                        </p>
                    </div>
                    <h3>Number of sessions attended: {!!this.state.sessions && this.state.numSessions || 0}</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Button type="submit">Attend a session</Button>
                        <br/>
                        <FormControl
                            value={this.state.code}
                            onChange={event => this.setState({code: event.target.value})}
                            type="text"
                            placeholder="Session Code..."
                        />
                    </Form>
                </Jumbotron>
                <SessionTable/>
                <div>
                    <h1>FAQ</h1>
                    <hr/>
                    <Questions/>
                </div>
            </div>

        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);
