import React, {useState, useEffect} from 'react';
import userThumb from '../userThumb.jpeg'
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import {Card, ListGroup, Image, Col, Form, InputGroup, Row, Modal, Button, Spinner} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import requests from '../../utils/requests';

const imgSize={width:"100px",marginBottom:"-32px",marginTop:"72px",position:"relative",zIndex:3}

let EditForm='';

const Username = (props) => (
    <Form>
        <Form.Group controlId="username-form">
            <Form.Label>New Username:</Form.Label>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="at-the-rate">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="at-the-rate"
                    onChange={(e)=>props.setEditingObject({...props.editingObject,username:e.target.value})}
                />
            </InputGroup>
            <Form.Text className="text-muted">
                Your username should be unique.
            </Form.Text>
        </Form.Group>
    </Form>
)

const Bio = (props) => (
    <Form>
        <Form.Group controlId="bio-form">
            <Form.Label>Bio:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Bio"
                aria-label="bio"
                onChange={(e)=>props.setEditingObject({...props.editingObject,bio:e.target.value})}
            />
            <Form.Text className="text-muted">
                Put in the best one liner you can think of.
            </Form.Text>
        </Form.Group>
    </Form>
)

const WorkAndEducation = (props) => (
    <Form>
        <Form.Group controlId="work">
            <Form.Label>Work:</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter where you work" 
                onChange={(e)=>props.setEditingObject({...props.editingObject,work:e.target.value})}
            />
        </Form.Group>
        <Form.Group controlId="college">
            <Form.Label>College:</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter your college"
                onChange={(e)=>props.setEditingObject({...props.editingObject,college:e.target.value})}
            />
        </Form.Group>
        <Form.Group controlId="school">
            <Form.Label>School:</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter your school" 
                onChange={(e)=>props.setEditingObject({...props.editingObject,school:e.target.value})}
            />
        </Form.Group>
    </Form>
)

const Item = (props) => {
    const [editable,setEditable] = useState(props.new);
    const [item,setItem] = useState(props.interest);
    const [itemId,setItemId] = useState(props.id||uuidv4());
    return(
        <InputGroup className="my-1">
            <Form.Control
                id={props.id}
                disabled={!editable}
                placeholder="Add new item"
                value={item}
                aria-label="Interest"
                onChange={(e)=>setItem(e.target.value)}
            />
            <InputGroup.Append>
                {editable?
                    <Button 
                        variant="success"
                        onClick={
                            ()=>{
                                let newEditingObject={interests:props.interests,...props.editingObject}
                                newEditingObject.interests[itemId]=item;
                                props.setInterests(newEditingObject.interests)
                                props.setEditingObject(newEditingObject);
                                if(props.new){
                                    setItem("");
                                    setItemId(uuidv4());
                                }else setEditable(false);
                            }
                        }
                    >
                    <FaCheck size="1em"/>
                </Button>
                :
                <Button variant="primary" onClick={()=>setEditable(true)}>
                    <FaPen size="1em"/>
                </Button>
                }
            </InputGroup.Append>
            {props.new?null:<InputGroup.Append>
                <Button variant="danger" onClick={()=>{
                    let newInterests={...props.interests}
                    delete newInterests[itemId];
                    props.setInterests(newInterests);
                    props.setEditingObject({...props.editingObject,interest:newInterests});
                    console.log(props.editingObject)
                }} ><FaTrash size="1em"/></Button>
            </InputGroup.Append>}
        </InputGroup>
    )
}

const InterestAndKnowledge = (props) => {
    const [interests,setInterests]=useState(props.userInfo.interests);
    const [knowlede,setKnowldege]=useState();
    return(
        <Form>
            <Form.Group>
                <Form.Label>Interests:</Form.Label>
                {Object.keys(interests).map(val=><Item interests={interests} setInterests={setInterests} key={val} interest={interests[val]} id={val} setEditingObject={props.setEditingObject} editingObject={props.editingObject}/>)}
                <Item interests={interests} setInterests={setInterests} new id={"79899o0i0909u9i9"} setEditingObject={props.setEditingObject} editingObject={props.editingObject}/>
            </Form.Group>
            <Form.Group controlId="college">
                <Form.Label>College:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your college"
                    onChange={(e)=>props.setEditingObject({...props.editingObject,college:e.target.value})}
                />
            </Form.Group>
            <Form.Group controlId="school">
                <Form.Label>School:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your school" 
                    onChange={(e)=>props.setEditingObject({...props.editingObject,school:e.target.value})}
                />
            </Form.Group>
        </Form>
    )
}

const ContactDetails = (props) => (
    <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email" 
                onChange={(e)=>props.setEditingObject({...props.editingObject,email:e.target.value})}
            />
            <Form.Text className="text-muted">
                Your username should be unique.
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter phone number" 
                onChange={(e)=>props.setEditingObject({...props.editingObject,phoneNumber:e.target.value})}
            />
        </Form.Group>
        <Form.Group controlId="instagram">
            <Form.Label>Instagram:</Form.Label>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="insta">https://www.instagram.com/</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="intagram-username"
                    aria-label="Username"
                    aria-describedby="insta"
                    onChange={(e)=>props.setEditingObject({...props.editingObject,instagram:e.target.value})}
                />
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="twitter">
            <Form.Label>Twitter:</Form.Label>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="twitter">https://twitter.com/</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="twitter-handle"
                    aria-label="TwitterHandle"
                    aria-describedby="twitter"
                    onChange={(e)=>props.setEditingObject({...props.editingObject,twitter:e.target.value})}
                />
            </InputGroup>
        </Form.Group>
    </Form>
)

const Achievements = (props) =>{
    const [achievements,setAchievments] = useState(props.userAchievements);

}

export default function UserInfo(props){
    const [userInfo,setUserInfo]=useState({});
    const [following,setFollowing]=useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [editingObject,setEditingObject]=useState({});
    const [loading,setLoading] = useState(false);
    const handleShow = (type) => {
        EditForm=type;
        setShowDialog(true);
    }
    const handleClose = () => {
        setEditingObject({});
        setShowDialog(false);
    }
    useEffect(()=>{
        (async ()=>{
            const UserData=(await requests.get(`/user/${props.uid}`)).data;
            setUserInfo(UserData);
            setFollowing(UserData.followers.includes(props.uid));
            console.log(UserData)
        })()
    },[props.uid]);
    return (
        <>
            <Card style={{width:"100vw",maxWidth:"400px"}}>
                <Card.Body className="p-0">
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <Image src={userInfo?userInfo.photoURL?userInfo.photoURL:userThumb:userThumb} roundedCircle style={imgSize}/>
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h5 className="pt-2 mb-0">{userInfo?userInfo.displayName:"Abhishek Parashar Maheshwari"}</h5>
                            <h6 className="text-muted pt-0">
                                (@{userInfo.username})
                                <FaPen style={{cursor:"pointer", marginLeft:"8px"}} 
                                    title="edit username" 
                                    onClick={()=>{handleShow(Username)}} 
                                    size="0.8em"
                                />
                            </h6>
                            <div>
                                {userInfo.bio}
                                <FaPen style={{cursor:"pointer", marginLeft:"8px"}} 
                                    title="edit bio" 
                                    onClick={()=>{handleShow(Bio)}} 
                                    size="0.8em"
                                />
                            </div>
                            <Row>
                                <Col><strong>{userInfo.followers?userInfo.followers.length:""}</strong> followers</Col>
                                <Col><strong>{userInfo.following?userInfo.following.length:""}</strong> following</Col>
                            </Row>
                            <div>
                                <Button size="sm" className="my-2" variant={following?"secondary":"primary"}
                                    onClick={()=>{
                                        requests.post(`/user/${props.uid}/${following?"unfollow":"follow"}`)
                                        .then((response)=>{
                                            setUserInfo(response.data);
                                            console.log(response.data._id,userInfo);
                                            setFollowing(!following);
                                        })
                                        .catch((error)=>{
                                            alert('Network error!');
                                            console.log(error)
                                            setLoading(false);
                                        })
                                    }}
                                >{following?"Unfollow":"Follow"}</Button>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Intro</h5>
                                </Col>
                            </Row>
                            <div>Works at <strong>{userInfo.work}</strong></div>
                            <div>Studied at <strong>{userInfo.school}</strong></div>
                            <div>Lives in <strong>Kanpur</strong></div>
                            <div><strong>Male</strong></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Additional Information</h5>
                                </Col>
                                <Col className="mx-2" xs={1}>
                                    <FaPen title="edit" style={{cursor:"pointer"}} onClick={()=>{handleShow()}} size="0.9em"/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Interest and Knowledge</h5>
                                </Col>
                                <Col className="mx-2" xs={1}>
                                    <FaPen title="edit" style={{cursor:"pointer"}} onClick={()=>{handleShow(InterestAndKnowledge)}} size="0.9em"/>
                                </Col>
                            </Row>
                            <div>
                                Interests in:<br/>
                                {Object.keys(userInfo.interests||{}).map((val)=><><span key={val}>{userInfo.interests[val]}</span><br/></>)}
                            </div>

                            <div>knows about</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Work and Education</h5>
                                </Col>
                                <Col className="mx-2" xs={1}>
                                    <FaPen title="edit" style={{cursor:"pointer"}} onClick={()=>{handleShow(WorkAndEducation)}} size="0.9em"/>
                                </Col>
                            </Row>
                            <div>Work: {userInfo.work}</div>
                            <div>University: {userInfo.college}</div>
                            <div>School: {userInfo.school}</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Contact Details</h5>
                                </Col>
                                <Col className="mx-2" xs={1}>
                                    <FaPen title="edit" style={{cursor:"pointer"}} onClick={()=>{handleShow(ContactDetails)}} size="0.9em"/>
                                </Col>
                            </Row>
                            <div>Email: <strong>{userInfo.email}</strong></div>
                            <div>Phone: <strong>{userInfo.phoneNumber}</strong></div>
                            <div>Instagram: <strong>@{userInfo.instagram}</strong></div>
                            <div>Twitter: <strong>@{userInfo.twitter}</strong></div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h5>Achievements</h5>
                                </Col>
                                <Col className="mx-2" xs={1}>
                                    <FaPen title="edit" style={{cursor:"pointer"}} onClick={()=>{handleShow()}} size="0.9em"/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Modal
                centered
                show={showDialog}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <EditForm userInfo={userInfo} editingObject={editingObject} setEditingObject={setEditingObject}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={()=>{
                            setLoading(true);
                            requests.patch(`/user`,editingObject)
                            .then((response)=>{
                                setUserInfo({...userInfo,...editingObject});
                                console.log(response.data._id,userInfo);
                                setLoading(false);
                                handleClose();
                            })
                            .catch((error)=>{
                                alert('Network error!');
                                console.log(error)
                                setLoading(false);
                            })
                        }}
                    >
                        Update
                        {loading?<Spinner animation="border" role="status" size="sm"/>:null}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}