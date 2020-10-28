import React,{useState} from 'react';
import {FaShareAlt} from 'react-icons/fa';
import {Button,Modal,Container,Row,Col} from 'react-bootstrap';

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
  } from "react-share";

export default function Share(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button title="Share" variant="secondary" onClick={handleShow} size="sm" className="mr-1 pt-0">
                <FaShareAlt size="1em"/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Share</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Share via:
                    <Container className="p-3">
                        <Row className="my-3">
                            <Col>
                                <EmailShareButton url={props.url} subject={props.title} body={"Qusol"}><EmailIcon round/></EmailShareButton>
                            </Col>
                            <Col>
                                <FacebookShareButton url={props.url} quote={props.title}><FacebookIcon round/></FacebookShareButton>
                            </Col>
                            <Col>
                                <LinkedinShareButton url={props.url}><LinkedinIcon round/></LinkedinShareButton>
                            </Col>
                            <Col>
                                <WhatsappShareButton  url={props.url} title={props.title}><WhatsappIcon round/></WhatsappShareButton>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col>
                                <PinterestShareButton url={props.url} title={props.title}><PinterestIcon round/></PinterestShareButton>
                            </Col>
                            <Col>
                                <RedditShareButton url={props.url} title={props.title}><RedditIcon round/></RedditShareButton>
                            </Col>
                            <Col>
                                <TumblrShareButton  url={props.url} title={props.title}><TumblrIcon round/></TumblrShareButton>
                            </Col>
                            <Col>
                                <TwitterShareButton url={props.url} title={props.title}><TwitterIcon round/></TwitterShareButton>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}