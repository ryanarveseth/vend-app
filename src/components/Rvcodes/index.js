import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {Button, Alert} from 'react-bootstrap';
import {FlexOnYou, Pad25, FlexApart, Flex, Pad25W, Mg4All} from '../../style/styles';
import DraggableCard from './DraggableCard';
import {Pencil, Trash, Check, CircleFill} from 'react-bootstrap-icons';
import Spacing from '../Spacing';
import HAccordion from '../HAccorion';
import Strings from '../../Strings';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const reorder = (list, startIndex, endIndex) => {
    if (list.groups) {
        list = list.groups;
    }

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {

    if (droppableSource.droppableId !== 'droppable') {
        source = source.groups;
    }
    if (droppableDestination.droppableId !== 'droppable') {
        destination = destination.groups;
    }

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    if (droppableSource.droppableId === 'droppable') {
        sourceClone.push(removed);
    }

    if (destClone.filter(group => (
            removed.id === group.id
        )).length === 0 && 
        droppableSource.droppableId !== droppableDestination.droppableId) { 
        destClone.splice(droppableDestination.index, 0, removed);
    } else if (destClone.filter(group => (
        removed.id === group.id
    )).length > 0 && 
    droppableSource.droppableId !== droppableDestination.droppableId) {
        let oldIndex = destClone.findIndex(group => (
            removed.id === group.id));
        destClone.splice(oldIndex, 1);
        destClone.splice(droppableDestination.index, 0, removed);
    }
    
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

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


const Rvcodes = () => {

    const [gotGroups, setGotGroups] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [groups, setGroups] = useState([]);

    const [rvcs, setRvcs] = useState([
        {
            'name': 'RVC',
            'groups': [],
            'rename': false
        }
    ]);

    const createNewRvc = () => {
        let rvcCopy = Array.from(rvcs);
        
        rvcCopy.unshift({
            'name': 'RVC',
            'groups': []
        });

        setRvcs(rvcCopy);
        setChangesMade(true);
    };


    const saveRvcChanges = (rvcs) => {

        if (rvcs.filter((rvc) => rvc.name === '' || rvc.name === ' ' || rvc.rename).length > 0) {
            setSaveError(true);
            return;
        }
        ipcRenderer.send('set-groupings', groups);
        setSaveError(false);
        setChangesMade(false);
    };


    const deleteRvc = (i) => {
        let rvcsCopy = Array.from(rvcs);
        rvcsCopy.splice(i, 1);

        setRvcs(rvcsCopy);
        setChangesMade(true);
    } 

    const renameRvc = (newName, index) => {
        if (newName === '') {
            return;
        }

        let rvcCopy = Array.from(rvcs);

        rvcCopy[index].name = newName;
        rvcCopy[index].rename = false;
        setRvcs(rvcCopy);
        setChangesMade(true);
    }

    const startEditRvcName = (i) => {
        let rvcsCopy = Array.from(rvcs);

        rvcsCopy[i].name = '';
        rvcsCopy[i].rename = true;

        setRvcs(rvcsCopy); 
        setChangesMade(true);   
    }


    if (!gotGroups) {
        ipcRenderer.send('get-groupings');
        setGotGroups(true);
    }

    // Now listen for group changes
    ipcRenderer.on('groups', (event, {groupings}) => {
        setGroups(groupings);
    });


    const getList = id => id === 'droppable' ? groups : rvcs[parseInt(id.match(/\d+/g)[0])] || [];

    const onDragEnd = result => {
        let { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable') {
                setGroups(items);
            } else {
                let dropperIndex = parseInt(destination.droppableId.match(/\d+/g)[0]);
                rvcs[dropperIndex].groups = items || [];
                setRvcs(rvcs);
                setChangesMade(true);
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );


            if (source.droppableId === 'droppable') {

                let dropperIndex = parseInt(destination.droppableId.match(/\d+/g)[0]);
                rvcs[dropperIndex].groups = result[destination.droppableId] || [];
                setGroups(result[source.droppableId]);

            } else if (destination.droppableId === 'droppable') {

                let dropperIndex = parseInt(source.droppableId.match(/\d+/g)[0]);
                rvcs[dropperIndex].groups = result[source.droppableId] || [];
                setRvcs(result[destination.droppableId]);

            } else {

                let dropper1Index = parseInt(source.droppableId.match(/\d+/g)[0]);
                rvcs[dropper1Index].groups = result[source.droppableId] || [];

                let dropper2Index = parseInt(destination.droppableId.match(/\d+/g)[0]);
                rvcs[dropper2Index].groups = result[destination.droppableId] || [];

            }
            setRvcs(rvcs);
            setChangesMade(true);
        }
    };

    return (
        <>
            <Pad25>
                <Button variant="outline-success" onClick={createNewRvc}>{Strings.createNewGroup}</Button>
                <Spacing/>
                <Button variant="outline-primary" onClick={() => saveRvcChanges(rvcs)}>{Strings.saveChanges} {changesMade && <CircleFill size={8}/>}</Button>
                <Spacing/>
                <HAccordion title={Strings.accordionTitle} body={Strings.accordionBody}/>
            </Pad25>
            { saveError && 
                <Pad25W>
                    <Alert variant="danger" onClose={() => setSaveError(false)} dismissible>
                        <Alert.Heading>{Strings.saveErrorTitle}<Spacing/>{Strings.frown}</Alert.Heading>
                        <p>
                            {Strings.saveErrorBody}
                        </p>
                    </Alert>
                </Pad25W>
            }
            <DragDropContext onDragEnd={onDragEnd}>
                <FlexOnYou>
                    {/* Here's our main list. This will hold all items in the beginning! */}
                    <div className={'main-groupings'}>
                        <h4>{Strings.allGroupings} ({groups.length})</h4>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {groups.map((item, index) => (
                                        <DraggableCard parentId={`droppable`} item={item} index={index} getItemStyle={getItemStyle} showTable/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <Flex>
                        {rvcs.map((rvc, i) => {
                            return (
                                <Mg4All>
                                    <FlexApart className={'group-header'}>
                                        <input type={rvcs[i].rename ? 'text' : 'hidden'} className={'title-input'} defaultValue='' placeholder={'Edit RVC Name'} id={`droppable-title-${i}`}/>
                                        { !rvcs[i].rename &&
                                            <h4>
                                                {rvc.name}
                                            </h4>
                                        }  
                                        <FlexApart className={'icon-group-header'}>
                                            { rvcs[i].rename ?
                                                <div className={'icon-group-items-no-spin'} onClick={() => renameRvc(document.getElementById(`droppable-title-${i}`).value, i)}>
                                                    <Check  size={32}/>
                                                </div>
                                            :
                                                <div className={'icon-group-items'} onClick={() => { startEditRvcName(i); document.getElementById(`droppable-title-${i}`).focus();}}>
                                                    <Pencil  size={24}/>
                                                </div>
                                            }

                                            { rvcs.length !== 1 && 
                                                (<div className={'icon-group-items-no-spin-regular'} onClick={() => deleteRvc(i)}>
                                                    <Trash size={24}/>
                                                </div>)
                                            }
                                        </FlexApart>
                                    </FlexApart>
                                    <Droppable droppableId={`droppable${i}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="list-sizing"
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {rvc.groups.map((item, index) => (
                                                    <DraggableCard item={item} parentId={`droppable${i}`} index={index} getItemStyle={getItemStyle}/>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Mg4All>
                            )
                        })}
                    </Flex>
                </FlexOnYou>
            </DragDropContext>
        </>
    );
}
// Put the thing into the DOM!

export default Rvcodes;

