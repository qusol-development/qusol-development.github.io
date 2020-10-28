import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import PollOption from './PollOption';

export default function Poll({poll}){
    const [voted,setVoted]=useState(false);
    const auth=useAuth();
    useEffect(()=>{

    });
    return(
        <>
            <div>
                {poll.title}
            </div>
            <div>
                {Object.keys(poll.options).map(optionId=>
                    <PollOption key={optionId} voted={voted} setVoted={setVoted} votes={poll.options[optionId].votes} optionId={optionId}>{poll.options[optionId].text}</PollOption>)}
            </div>
        </>
    )
}