import React from 'react';
import {Link} from "react-router-dom";
import {Card} from 'react-bootstrap';
import AuthorInfo from './AuthorInfo';

const EntityHeader = (props) => {
    return  (
        <>
            {props.min?null:<AuthorInfo min author={props.author}/>}
            <Link style={{color:"black"}} to={`/${props.type}/${props.eid}`}><Card.Title>{props.title}</Card.Title></Link>
        </>
    )
}

export default EntityHeader;