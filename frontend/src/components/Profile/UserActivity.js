import React from 'react';
import {Container, Row, Col,Tabs,Tab} from 'react-bootstrap';
import Entity from '../Entity';

export default function UserActivity(props){
    return (
        <Tabs defaultActiveKey="activity" id="user-activity">
            <Tab eventKey="activity" title="User Activity">
                Hello
            </Tab>
            <Tab eventKey="questions" title="Questions">
                Hello 2
            </Tab>
            <Tab eventKey="answers" title="Answers">
                Hello 3
            </Tab>
            <Tab eventKey="articles" title="Articles">
                Hello 4
            </Tab>
            <Tab eventKey="polls" title="Polls">
                Hello 5
            </Tab>
            <Tab eventKey="blog" title="Blog">
                Hello 6
            </Tab>
        </Tabs>
    )
}