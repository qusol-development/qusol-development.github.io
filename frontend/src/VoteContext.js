import {createContext} from 'react';

const VoteContext=createContext({
    voted:null,
    setVoted:()=>{}
});

export default VoteContext;