import React, {useState} from 'react';

import {Card, Accordion} from 'react-bootstrap';
import {CaretRightFill} from 'react-bootstrap-icons';
import {Pad25W, DarkCard} from '../../style/styles';

import Spacing from '../Spacing';

const HAccordion = ({title, body, eventKey, callBack}) => {

    const [toggled, setToggled] = useState(false);

    const toggleAccordion = () => {
        setToggled(!toggled);
    };

    return (
        
        <Pad25W>
            <Accordion>
                <DarkCard>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" onClick={toggleAccordion}>
                        {title}
                        <Spacing/>
                        <CaretRightFill className={toggled ? 'spin90' : 'spinR90'}/>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <DarkCard.Body>{body}</DarkCard.Body>
                    </Accordion.Collapse>
                </DarkCard>
            </Accordion>
        </Pad25W>
    );
};

export default HAccordion;