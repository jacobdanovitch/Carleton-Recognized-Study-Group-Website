import React, {Component} from 'react';
import 'office-ui-fabric-react/lib/components/List/examples/List.Scrolling.Example.scss'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

export class SessionTable extends Component {

    render() {
        return (
            <div>
                <h2>Schedule</h2>
                <ListGroup style={{color:"black"}}>
                    <ListGroupItem header="Week 1"
                                   href="http://people.scs.carleton.ca/~lanthier/teaching/COMP1406/Notes/COMP1406_Ch1_ProgrammingInJava.pdf">(Ch1)
                        Introduction to Java</ListGroupItem>
                    <ListGroupItem header="Week 2"
                                   href="http://people.scs.carleton.ca/~lanthier/teaching/COMP1406/Notes/COMP1406_Ch2_CreationAndStorageOfJavaObjects.pdf">(Ch2)
                        Introduction to OOP</ListGroupItem>
                    <ListGroupItem header="Week 3"
                                   href="http://people.scs.carleton.ca/~lanthier/teaching/COMP1406/Notes/COMP1406_Ch4_ClassHierarchiesAndInheritance.pdf">(Ch4)
                        Class Hierarchies and Inheritance</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}