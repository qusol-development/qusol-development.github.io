import React from 'react';
import {Col,Row} from 'react-bootstrap';
import Vote from './Vote';
import Share from './Share';
import Views from './Views';
import {CommentIcon} from './Comments';
import Report from './Report';

export default function ActionBar(props){
    return (
        <Row className="mt-4 justify-content-between flex-nowrap" noGutters>
            <Col md={9}>
                <Row noGutters>
                    {props.views?<Views count="2393"/>:null}
                    {props.vote?<Vote parentType={props.parentType} pid={props.pid} upvoteCount={props.upvoteCount} downvoteCount={props.downvoteCount}/>:null}
                    {props.comment?<CommentIcon commentCount={props.commentCount} onClick={()=>{props.setOpenComments(!props.openComments)}}/>:null}
                </Row>
            </Col>
            <Col xs={"auto"}>
                <Row className="justify-content-end flex-nowrap h-100" noGutters>
                    {props.share?<Share title={"Element Title"} url={"https://element.url.om/elimentId"}/>:null}
                    {props.report?<Report/>:null}
                </Row>
            </Col>
        </Row>
    );
}