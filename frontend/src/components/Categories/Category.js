import React, { useState } from 'react';
import {ListGroup, Button,Fade} from 'react-bootstrap';
// import axios from 'axios';

const Category = (props) => {
    const [open, setOpen] = useState(false);
    const [follow, setFollow] = useState(props.following);
    const toggleFollow=()=>{
        setFollow(!follow); 
    }
    return(
        <ListGroup.Item
            aria-controls="follow-button"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="d-flex justify-content-between align-items-center"
        >
            <span>
                {props.name}
            </span>
            <Fade in={open}>
                <Button
                    id="follow-button"
                    aria-expanded={open}
                    onClick={toggleFollow}
                    size="sm"
                    variant={follow?"secondary":"primary"}
                >
                    {follow?"Unfollow":"Follow"}
                </Button>
            </Fade>
        </ListGroup.Item>
    )
}

export default Category;