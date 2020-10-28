import React, { useState, createContext, useRef, useEffect } from 'react';
import {Card} from 'react-bootstrap';
import AuthorInfo from './AuthorInfo';
import {CommentSection,CommentInput} from './Comments';
import ActionBar from './ActionBar';
import EntityHeader from './EntityHeader';
import requests from '../utils/requests';
import { useAuth } from '../hooks/useAuth';

const VoteContext=createContext({
    voted:null,
    setVoted:()=>{}
});

const Entity = (props) => {
    const auth = useAuth();
    const [openComments, setOpenComments] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const bodyContent = useRef(null);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(props.commentCount);
    const [voted,setVoted]=useState(null);//use props false(dislike)  null(not-voted)  true(like)
    useEffect(()=>{
        (async ()=>{
            if(auth.user){
                const vote = (await requests.get(`/${props.type}/${props.id}/vote`)).data;
                setVoted(vote.value);
            }
        })()
    },[props.type,props.id,auth])
    const voteValue={voted,setVoted};
    return  (
        <Card bg={props.bg} className={props.className||"mb-3"} style={{width:"100%"}}>
            <Card.Body className="p-2 p-sm-3">
                {props.type!=="comment"?<EntityHeader min type={props.type==="answer"?"question":props.type} eid={props.id} title={props.title}/>:null}
                {props.author?<AuthorInfo author={props.author} min={props.type==='comment'}/>:null}
                {expanded?null:(props.firstImg)}
                <div ref={bodyContent} style={{maxHeight:expanded?"none":"11ch",overflow:"hidden"}}>
                    {props.body}
                </div>
                <p style={{textAlign:"right", color:"blue",cursor:"pointer"}} onClick={(e)=>{
                    setExpanded(true);
                    e.target.style.visibility="hidden"
                    console.log("Show more clicked",bodyContent)
                    }}
                >
                    Show more
                </p>
                <VoteContext.Provider value={voteValue}>
                    <ActionBar parentType={props.type} pid={props.id} views={props.type!=='comment'} vote upvoteCount={props.upvoteCount} downvoteCount={props.downvoteCount} comment commentCount={commentCount} share={props.type!=='comment'} report setOpenComments={setOpenComments} openComments={openComments} />
                </VoteContext.Provider>
                {openComments?<CommentInput commentCount={commentCount} setCommentCount={setCommentCount} parentType={props.type} pid={props.id} setOpenCommentInput={setOpenComments} comments={comments} 
                setComments={setComments}/>:null}
            </Card.Body>
            {openComments?<CommentSection comments={comments} setComments={setComments} parentType={props.type} pid={props.id} commentCount={commentCount}/>:null}
        </Card>
    )
}
export {VoteContext};
export default Entity;