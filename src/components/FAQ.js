import React, {Component} from 'react'
import {Panel, PanelGroup} from 'react-bootstrap'

class Questions extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeKey: 1
        }
    }

    handleSelect = (activeKey) => {
        this.setState({ activeKey });
    };

    render() {
        return (
            <PanelGroup
                accordion
                id="accordion-controlled-example"
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect}
                defaultActiveKey="1"
            >
                <Panel header="1. When is the study group?" eventKey="1">
                    The study group takes place Monday at 5:30pm to 6:30pm.
                </Panel>
                <Panel header="2. Where is the study group?" eventKey="2">
                    The group meets in Room 3190 at Mackenzie Building.
                </Panel>
                <Panel header="3. How does the group work?" eventKey="3">
                    Each week, we prepare some notes or exercises on the current in-class topic. We review these, or go
                    over any other questions anyone might have.
                    When you attend 4 sessions and at least one midterm / exam review session, you receive co-curricular
                    credit.
                </Panel>
                <Panel header="4. I have class. Can you reschedule?" eventKey="4">
                    No. We're students as well, and we chose the time because it fits our schedules. We also have class.
                </Panel>
                <Panel header="5. Does the group happen every week?" eventKey="5">
                    Yes, the group takes place every week. You can find cancellation notices in the Facebook group or on
                    here (though Facebook will be more reliable).
                </Panel>
                <Panel header="6. Are you TAs?" eventKey="6">
                    No. We are not TAs. We are first year students in a volunteer capacity only. We get lots of things
                    wrong. Treat our advice with a
                    healthy amount of skepticism.
                </Panel>
                <Panel header="7. Can you help me with my assignment?" eventKey="7">
                    No. That would be an academic infraction.
                </Panel>
                <Panel header="8. This site is ugly." eventKey="8">
                    Yes
                </Panel>
            </PanelGroup>
        )
    }
}

export default Questions;