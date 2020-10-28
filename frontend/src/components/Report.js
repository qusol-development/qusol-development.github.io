import React from 'react';
import {FaExclamation} from 'react-icons/fa';
import {Button} from 'react-bootstrap';

export default function Report() {
    return (
        <Button title="Report" variant="secondary" onClick={()=>{alert("Report Clicked!!")}} size="sm" className="pt-0">
            <FaExclamation size="1em"/>
        </Button>
    );
}