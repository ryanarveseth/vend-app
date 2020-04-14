import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {PriorityFlex, VFlex, Light} from '../../../style/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Spacing from '../../Spacing';
import {ArrowUp, ArrowDown} from 'react-bootstrap-icons';
import Strings from '../../../Strings';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 0 ${grid}px 0`,
    width: `290px`,
    
    // change background colour if dragging
    background: isDragging ? 'rgb(230, 230, 230)' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    transition: '.5s',
    background: isDraggingOver ? 'rgb(125,125,125)' : 'lightgrey',
    padding: grid,
    color: 'black'
});


const reorder = (list, startIndex, endIndex) => {
    if (list.combos) {
        list = list.combos;
    }

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};




const GroupingModal = (props) => {


    const onDragEnd = result => {
        let { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const items = reorder(
            props.groups,
            source.index,
            destination.index
        );

        props.setGroups(items);
        props.setChangesMade(true);
    };

    return (
        <Light>
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className={'light'}>
                {Strings.sortByPriority}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PriorityFlex>
                    <VFlex>
                        <div>
                            <ArrowUp size={32}/>
                            {Strings.highestPriority}
                        </div>
                        <div>
                            <ArrowDown size={32}/>
                            {Strings.lowestPriority}
                        </div>
                    </VFlex>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="priorities">
                        {(provided, snapshot) => (
                            <div
                            // {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {props.groups.map((item, index) => (
                                <Draggable key={index} draggableId={item.name + index} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                        {index}<Spacing/>{item.name}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </PriorityFlex>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      </Light>
    );
}

export default GroupingModal;