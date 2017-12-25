import React, {Component} from 'react';
import './App.css';
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import {loadTheme} from 'office-ui-fabric-react/lib/Styling';
import {SessionTable} from './SessionTable'
import Questions from './FAQ'


class App extends Component {
    render() {
        loadTheme({
            palette: {
                'themePrimary': '#a80000'
            }
        });

        return (
            <Fabric>
                <div className="App ms-Grid">
                    <header className="App-header">
                        <h1 className="App-title ms-Grid-row">COMP1406 Recognized Study Group</h1>
                        <hr/>
                        <div>
                            <p className="ms-Grid-col ms-sm12 ms-u-md4 ms-lg4" style={{marginTop: "2%"}}>
                                Welcome to Jacob and Tim's recognized study group for COMP1406 at Carleton University.
                                We're two volunteer first year students in Mark Lanthier's course.
                                Here, you'll find information about when and where the group meets, what topics we'll be
                                covering, and more.

                                Join our facebook group to stay up to date: &nbsp;
                                <a style={{color: "White", textDecoration: "Underline"}}
                                   href="https://www.facebook.com/groups/1571999506153827/">
                                    COMP 1406 Recognized Study Group
                                </a>
                            </p>
                        </div>
                        <div className="session-table ms-Grid-col ms-sm12 ms-u-md4 ms-lg8">
                            <SessionTable/>
                        </div>
                    </header>
                    <div>
                        <h1>FAQ</h1>
                        <hr/>
                        <Questions/>
                    </div>
                </div>
            </Fabric>
        );
    }
}

export default App;
