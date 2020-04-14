import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {FlexApart, ComboTable} from '../../../style/styles';
import Strings from '../../../Strings';


const DraggableCard = ({index, getItemStyle, item, parentId}) => (
    <Draggable
        key={`${index}${item.description}_${item.packSize}_${item.packType}_${item.bevcat}`}
        draggableId={`${parentId}_${item.description}_${item.packSize}_${item.packType}_${item.bevcat}`}
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
                    <u><b>{item.description}</b></u>
                    <b>{item.brand.length > 0 ? 913 : 508}</b>
                </FlexApart>
                <FlexApart>
                    <ComboTable variant="dark" striped bordered hover size="sm" className={'xtra-sm'}>
                        <tbody>
                            <tr>
                                <th>{Strings.packSize}</th>
                                <th>{Strings.packType}</th>
                                <th>{Strings.bevcat}</th>
                                <th>{Strings.brand}</th>
                            </tr>
                            <tr>
                                <td>{item.packSize}</td>
                                <td>{item.packType}</td>
                                <td>{item.bevcat}</td>
                                <td>{item.brand}</td>
                            </tr>
                        </tbody>
                    </ComboTable>
                </FlexApart>
            </div>
        )}
    </Draggable>
);


export default DraggableCard;