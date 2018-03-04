import React, {Component} from 'react';
import 'office-ui-fabric-react/lib/components/List/examples/List.Scrolling.Example.scss'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {db} from '../firebase'
//var dateFormat = require('date.format');
import dateFormat from 'dateformat'
import './SessionList.css'

class Session extends Component {
    render(){
        return(
            <ListGroupItem
                header={this.props.header}
                href={this.props.link}
            >
                {this.props.description}
            </ListGroupItem>
        )
    }
}

export class SessionTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount = () => {
        db.getSessions().then(snapshot =>
            this.setState(() => ( {data: snapshot.val()} ))
        );
    };

    render() {
        if (!this.state.data) return null;
        return (
            <div className="sessions">
                <h2>Attended Sessions</h2>
                <ListGroup style={{color: "black"}}>
                    {this.state.data.map(session => {
                        console.log(session);
                        return(
                            <Session
                                header={dateFormat(new Date(session.date), "mmmm dS")}
                                description={session.Description}
                                link={session.link}
                            />
                        )
                    })}
                </ListGroup>
            </div>
        );
    }
}