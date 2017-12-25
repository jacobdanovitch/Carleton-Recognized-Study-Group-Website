import React, {Component} from 'react'
import {Panel, Accordion} from 'react-bootstrap'

class Questions extends Component{
        render(){
        return(
            <Accordion>
                <Panel header="1. When is the study group?" eventKey="1">
                    The study group takes place Thursday mornings at 10 AM.
                </Panel>
                <Panel header="2. Where is the study group?" eventKey="2">
                    The group meets in Room 3201 at Richcraft Hall, alternatively known as River Building. The room is near the elevators.
                </Panel>
                <Panel header="3. How does the group work?" eventKey="3">
                    Each week, we prepare some notes or exercises on the current in-class topic. We review these, or go over any other questions anyone might have.
                    When you attend 4 sessions and at least one midterm / exam review session, you receive co-curricular credit.
                </Panel>
                <Panel header="4. I have class. Can you reschedule?" eventKey="4">
                    No. We're students as well, and we chose the time because it fits our schedules. We are not paid for this, and we have class as well.
                </Panel>
                <Panel header="5. Does the group happen every week?" eventKey="5">
                    Yes, the group takes place every week.
                </Panel>
                <Panel header="6. Are you TAs?" eventKey="6">
                    No. We are not TAs. We are first year students in a volunteer capacity only. We get lots of things wrong. Treat our advice with a
                    healthy amount of skepticism.
                </Panel>
                <Panel header="7. Can you help me with my assignment?" eventKey="7">
                    No. That would be an academic infraction.
                </Panel>
            </Accordion>
        )
    }
}

export default Questions;