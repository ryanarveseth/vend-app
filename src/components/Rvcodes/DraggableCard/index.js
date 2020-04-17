import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {FlexApart} from '../../../style/styles';


const DraggableCard = ({index, getItemStyle, item, parentId, showTable}) => (
    <Draggable
        key={`${index}${item.id}${item.name}`}
        draggableId={`${parentId}_${item.id}`}
        index={index}>
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}>
                <FlexApart className={'ht-20'}>
                    <u><b>{item.name}</b></u>
                </FlexApart>
            </div>
        )}
    </Draggable>
);


export default DraggableCard;