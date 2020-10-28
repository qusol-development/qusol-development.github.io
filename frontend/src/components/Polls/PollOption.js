import React, { useState } from 'react';
import {Button} from 'react-bootstrap'

export default function PollOption(props){
    const handleVote=()=>{
        if(!props.voted){
            
            props.setVoted(props.optionId);
            console.log(props.optionId);
        }
        console.log("voted:",props.voted)
    }
    return(
        <Button disabled={props.voted} variant={props.voted==false?"primary":props.voted!=props.optionId?"secondary":"primary"} className="my-1" onClick={handleVote} block>
            {props.children}
            {props.voted?` (${props.voted==props.optionId?props.votes+1:props.votes})`:null}
        </Button>
    )
}