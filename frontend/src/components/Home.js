import React from 'react';
import Entity from './Entity';
import CategoriesPanel from './Categories';
import AskQuestion from './AskQuestion';
import ReactHtmlParser from 'react-html-parser';
import {Container,Col,Row,Card} from 'react-bootstrap';
import WriteArticle from './WriteArticle';
import CreatPoll from './Polls/CreatePoll';

export default function Home(props) {
    // const [posts,setPosts]=useState([]);
    // useEffect(()=>{
    //     (async ()=>{
    //       console.log('Fetching Posts');
    //       setPosts((await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')).data);
    //     })()
    // },[]);
    return (
        <Container fluid className="mx-4 mt-2 w-auto">
          <Row>
            <Col xs={"auto"} className="d-none d-lg-block p-0">
              <CategoriesPanel/>
            </Col>
            <Col className="p-0 px-sm-2 px-md-3">
              <Row>
                <AskQuestion/>
                <WriteArticle/>
                <CreatPoll/>
              </Row>
              <Row>
                {props.posts.map((obj)=>
                <Entity key={obj._id} id={obj.bestAnswer?obj.bestAnswer._id:obj._id} 
                  type={obj.bestAnswer?"answer":"question"}
                  author={obj.bestAnswer?obj.bestAnswer.author:null} 
                  title={obj.title} 
                  body={obj.bestAnswer?ReactHtmlParser(obj.bestAnswer.body):null}
                  commentCount={obj.bestAnswer?obj.bestAnswer.commentCount:0}     
                  upvoteCount={obj.bestAnswer?obj.bestAnswer.upvoteCount:0}     
                  downvoteCount={obj.bestAnswer?obj.bestAnswer.downvoteCount:0}     
                />)}
              </Row>
            </Col>
            <Col xs={"auto"} className="d-none d-xl-block p-0">
              <CategoriesPanel/>
              <Card>
              <Card.Body>
              <div className="d-flex flex-column align-items-center">
                <a target="_blank" rel="noopener noreferrer" href='http://play.google.com/store/?pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="100"/></a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.apple.com/ios/app-store/'><img alt='Get it on App Store' src='https://linkmaker.itunes.apple.com/images/badges/en-us/badge_appstore-lrg.svg' height="70"/></a>
              </div>
              </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }