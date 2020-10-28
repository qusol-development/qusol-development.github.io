import React,{useState, useContext} from 'react';
import {FaThumbsDown,FaThumbsUp} from 'react-icons/fa';
import {Button,Col,InputGroup,FormControl,Spinner} from 'react-bootstrap';
import {VoteContext} from './Entity';
import requests from '../utils/requests';

export default function Vote(props){
    const {voted,setVoted} = useContext(VoteContext);
    const [downvoteCount,setDownvoteCount] = useState(props.downvoteCount);
    const [upvoteCount,setUpvoteCount] = useState(props.upvoteCount);
    const [clicked,setClicked] = useState(null);
    const voteHandler = async (vote) => {
        setClicked(vote);
        if(voted===vote){
            await requests.delete(`/${props.parentType}/${props.pid}/vote`);
            setVoted(null);
            vote?setUpvoteCount(upvoteCount-1):setDownvoteCount(downvoteCount-1);
            setClicked(null);
        }else{
            const voteResponse=(await requests.post(`/${props.parentType}/${props.pid}/${vote?'upvote':'downvote'}`)).data;
            if(voted!==null)
                voted?setUpvoteCount(upvoteCount-1):setDownvoteCount(downvoteCount-1);
            setVoted(voteResponse.value);
            voteResponse.value?setUpvoteCount(upvoteCount+1):setDownvoteCount(downvoteCount+1);
            setClicked(null);
        }
    }
    return (
        <>
            <InputGroup className="mr-1" size="sm" as={Col}>
                <InputGroup.Prepend>
                    <Button
                        title="Like" 
                        className="pt-0" id="basic-addon1" 
                        disabled={clicked!==null} 
                        variant={voted===true ? "primary" : "secondary" } 
                        onClick={()=>{voteHandler(true)}}
                    >
                        {clicked===true?<Spinner animation="border" role="status" size="sm"/>:<FaThumbsUp size="1em"/>}
                    </Button>
                </InputGroup.Prepend>
                <FormControl
                    title="Likes"
                    readOnly
                    disabled
                    placeholder="Likes"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={upvoteCount}
                />
            </InputGroup>
            <InputGroup className="mr-1" size="sm" as={Col}>
                <InputGroup.Prepend>
                    <Button 
                        title="Dislike"
                        className="pt-0" id="basic-addon1" 
                        disabled={clicked!==null} 
                        variant={voted===false ? "danger" : "secondary" } 
                        onClick={()=>{voteHandler(false)}}
                    >
                        {clicked===false?<Spinner animation="border" role="status" size="sm"/>:<FaThumbsDown size="1em"/>}
                    </Button>
                </InputGroup.Prepend>
                <FormControl
                    title="Dislikes"
                    readOnly
                    disabled
                    placeholder="Username"
                    aria-label="Dislikes"
                    aria-describedby="basic-addon1"
                    value={downvoteCount}
                />
            </InputGroup>
        </>
    );
}