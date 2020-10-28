import React from 'react';
import {ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Category = (props) => {
    return(
        <ListGroup.Item
            className="d-flex justify-content-between align-items-center"
        >
            <Link to={"/question/"+props.id}>
                {props.name}
            </Link>
        </ListGroup.Item>
    )
}

export default Category;