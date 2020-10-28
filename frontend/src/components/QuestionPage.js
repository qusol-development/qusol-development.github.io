import React, {useState, useEffect} from 'react';
import SuggestionsPanel from './Suggestions';
import AuthorInfo from './AuthorInfo';
import Entity from './Entity';
import {Container,Col,Row} from 'react-bootstrap';
import request from '../utils/requests';
import ReactHtmlParser from 'react-html-parser';
import WriteAnswer from './WriteAnswer';
import { useParams } from 'react-router-dom';
import AddTags from './AddTags';

export default function QuestionPage(props) {
    const questionID = useParams().id;
    const [question,setQuestion]=useState();
    const [answers,setAnswers]=useState([]);
    useEffect(()=>{
      console.log(questionID);
      (async ()=>{
          console.log('Fetching Answers');
          setQuestion((await request.get(`question/${questionID}`)).data);
          setAnswers((await request.get(`question/${questionID}/answers`)).data.body.answers);
        })()
    },[questionID]);
    return (
        <Container fluid className="mx-4 mt-2 w-auto">
          <Row>
            {
              question? 
              <Col className="p-0 px-sm-2 px-md-3">
                  <AuthorInfo author={question.author} min/>
                  <h3>{question.title}</h3>
                  <p className="text-muted">{question.description}</p>
                  <AddTags viewer tags={question.tags}/>
                  <br/>
                  <WriteAnswer questionID={questionID} answers={answers} setAnswers={setAnswers}/>
                  <br/>
                  {answers.map((obj)=>
                  <Entity key={obj._id} id={obj._id} 
                    type="answer" 
                    firstImg={ReactHtmlParser(obj.firstImg?obj.firstImg.outerHTML:null)} 
                    body={ReactHtmlParser(obj.body)} 
                    author={obj.author}
                    commentCount={obj.commentCount}
                    upvoteCount={obj.upvoteCount}
                    downvoteCount={obj.downvoteCount}
                    />)}
              </Col>:null
            }
            <Col xs={4} className="d-none d-md-block p-0">
              <SuggestionsPanel/>
            </Col>
          </Row>
        </Container>
    );
}