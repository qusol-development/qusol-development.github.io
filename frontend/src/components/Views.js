import React from 'react';
import {FaRegEye} from 'react-icons/fa';
import {Button,InputGroup,FormControl,Col} from 'react-bootstrap';

export default function Views(props){
    return (
        <InputGroup className="mr-1" as={Col} size="sm">
            <InputGroup.Prepend>
                <Button 
                    title="Views"
                    className="pt-0" id="basic-addon1" 
                    disabled
                    variant="secondary"
                >
                    <FaRegEye size="1em"/>
                </Button>
            </InputGroup.Prepend>
            <FormControl
                title="Views"
                readOnly
                disabled
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={props.count}
            />
        </InputGroup>
    );
}