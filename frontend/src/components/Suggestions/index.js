import React, { useState, useEffect } from 'react';
import Category from './Category';
import {ListGroup, Card} from 'react-bootstrap';
import axios from 'axios';

const CategoriesPanel = () => {
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
        (async ()=>{
          console.log('Fetching Suggestions');
          setCategories((await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')).data);
        })()
    },[]);
    return (
        <Card style={{width:"100%",minWidth:"271px"}}>
            <Card.Title className="pt-2 px-3">Related Questions</Card.Title>
            <Card.Body className="p-0">
                <ListGroup variant="flush" className="border-top">
                    {categories.map((obj,key)=><Category key={key} id={obj.id} name={obj.title} following={true}/>)}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default CategoriesPanel;