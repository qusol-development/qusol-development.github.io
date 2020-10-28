import React,{useState, useEffect} from 'react';
import { IconContext } from "react-icons";
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProfileForm from './components/Profile/ProfileForm';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import QuestionPage from './components/QuestionPage';
import { ProvideAuth } from "./hooks/useAuth";
import request from './utils/requests';
import User from './components/Profile/User';
import Poll from './components/Polls/Poll';

function App() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
      (async ()=>{
        console.log('Fetching Posts');
        // setPosts((await request.get('https://jsonplaceholder.typicode.com/posts?_limit=5')).data);
        setPosts((await request.get(`feed`)).data)
      })()
  },[]);
  return (
    <ProvideAuth>
      <Router>
      <IconContext.Provider value={{ size:"1.5em"}}>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/" exact>
              <Home posts={posts}/>
            </Route>
            <Route path="/question/:id" exact>
              <QuestionPage/>
            </Route>
            <Route path="/poll" exact>
              <Poll poll={{title:"What happened to napolean:",options:{
                option1:{text:"He died in a battle",votes:0},
                option2:{text:"He died in a jail",votes:2},
                option3:{text:"He is still alive",votes:322},
                option4:{text:"Lucifer took him under custody",votes:232},
                }}}/>
            </Route>
            <Route path="/user/:uid" exact>
              <User/>
            </Route>
            <Route path="/user/:uid/settings" exact>
              <ProfileForm/>
            </Route>
          </Switch>
        </div>
      </IconContext.Provider>
      </Router>
    </ProvideAuth>
  );
}

export default App;