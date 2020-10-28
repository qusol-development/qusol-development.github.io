import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';


const UserSummary = (props) => {
    const [userPublicProfile, setUserPublicProfile] = useState({});
    useEffect(()=>{
        (async ()=>{
            if(props.userId)
            setUserPublicProfile((await axios.get('https://jsonplaceholder.typicode.com/users/'+props.userId)).data);
        })()
    },[props.userId])
    return(
        <span className="text-muted">
            {userPublicProfile.name ? `${userPublicProfile.name} (@${userPublicProfile.username})`: <Spinner animation="border" role="status" size="sm"/>}
        </span>
    )
}

export default UserSummary;