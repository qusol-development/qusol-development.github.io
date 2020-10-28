import React from 'react';
import userThumb from './userThumb.jpeg'
import {Badge,Col,Row,Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthorInfo = (props) => {
    const imgSize={width:props.min?"36px":"72px"}
    return  (
        <Row className="my-1 pt-2 pb-0" style={{lineHeight:"1.2"}} noGutters> 
            <Col xs={"auto"} className="mr-1 text-center">
                <Image className="mt-md-0 my-2" src={props.author?props.author.photoURL?props.author.photoURL:userThumb:userThumb} roundedCircle style={imgSize}/>
            </Col>
            <Col>
                <Col>
                    <p className="pr-0 m-0">
                        <strong>
                        <Link to={`/user/${props.author?props.author.uid:'ff'}`}>
                            {props.author?props.author.displayName:"Abhishek Parashar Maheshwari"}
                        </Link>
                        </strong>
                        {props.min || props.self ?null:<span className="text-muted d-none d-md-inline ml-1" >
                            · last updated Jul 23
                        </span>}
                    </p>
                    {props.min?null:<span className="text-muted" style={{lineHeight:"1"}}>(@para-abhi) <Badge size="sm" variant="warning">Noobie</Badge></span>}
                    {props.min?null:<p className="my-1">
                        I love to draw and love. I repeat, I love to draw and love.
                    </p>}
                </Col>
                <Col className={props.min?"pl-3":"d-md-none pl-md-1"} md="auto">
                    <span className="text-muted">
                        last updated Jul 23
                    </span>
                </Col>
            </Col>
        </Row>
    )
}
export default AuthorInfo;