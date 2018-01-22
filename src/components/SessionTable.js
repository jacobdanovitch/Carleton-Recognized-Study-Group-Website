import React, {Component} from 'react';
import 'office-ui-fabric-react/lib/components/List/examples/List.Scrolling.Example.scss'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

export class SessionTable extends Component {

    render() {
        return (
            <div>
                <h2>Schedule</h2>
                <ListGroup style={{color:"black"}}>
                    <ListGroupItem
                        header="Week 1: January 22"
                        href="/"
                    >
                        (Ch1:3) Preparation for test #1.
                    </ListGroupItem>
                    <ListGroupItem
                        header="Week 2: January 29"
                    >
                        TBD
                    </ListGroupItem>
                    <ListGroupItem
                        header="Week 3: February 5"
                    >
                        TBD
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}