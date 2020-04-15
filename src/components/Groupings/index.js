import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {Button, Alert} from 'react-bootstrap';
import {FlexOnYou, Pad25, FlexApart, Flex, Mg25, Pad25W} from '../../style/styles';
import DraggableCard from './DraggableCard';
import {Pencil, Trash, Check, CircleFill} from 'react-bootstrap-icons';
import Spacing from '../Spacing';
import HAccordion from '../HAccorion';
import Strings from '../../Strings';
import GroupingModal from './GroupingModal';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const reorder = (list, startIndex, endIndex) => {
    if (list.combos) {
        list = list.combos;
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
        source = source.combos;
    }
    if (droppableDestination.droppableId !== 'droppable') {
        destination = destination.combos;
    }

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    if (droppableSource.droppableId === 'droppable') {
        sourceClone.push(removed);
    }

    if (destClone.filter((combo) => (
            removed.bevcat === combo.bevcat && 
            removed.brand === combo.brand && 
            removed.packSize === combo.packSize && 
            removed.packType === combo.packType
        )).length === 0 && 
        droppableSource.droppableId !== droppableDestination.droppableId) { 
        destClone.splice(droppableDestination.index, 0, removed);
    } else if (destClone.filter((combo) => (
        removed.bevcat === combo.bevcat && 
        removed.brand === combo.brand && 
        removed.packSize === combo.packSize && 
        removed.packType === combo.packType
    )).length > 0 && 
    droppableSource.droppableId !== droppableDestination.droppableId) {
        let oldIndex = destClone.findIndex(combo => (
            removed.bevcat === combo.bevcat && 
            removed.brand === combo.brand && 
            removed.packSize === combo.packSize && 
            removed.packType === combo.packType));
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


const Grouping = () => {

    const [combos, setCombos] = useState([]);
    const [fullCombosCopy, setFullCombosCopy] = useState([]);
    const [gotCombos, setGotCombos] = useState(false);
    const [gotGroups, setGotGroups] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [priorityModalShow, setPriorityModalShow] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const [groups, setGroups] = useState(
        [
            {
                'name': 'New-Group',
                'combos': [],
                'rename': false
            }
        ]
    );

    const saveGroupChanges = (groups) => {

        if (groups.filter((group) => group.name === '' || group.name === ' ' || group.rename).length > 0) {
            setSaveError(true);
            return;
        }
        ipcRenderer.send('set-groupings', groups);
        setSaveError(false);
        setChangesMade(false);
    };

    const createNewGroup = () => {
        let groupCopy = Array.from(groups);
        
        groupCopy.unshift({
            'name': 'New-Group',
            'combos': [],
            'rename': false
        });

        setGroups(groupCopy);
        setChangesMade(true);
    };


    const deleteGroup = (i) => {
        let groupCopy = Array.from(groups);
        groupCopy.splice(i, 1);

        setGroups(groupCopy);
        setChangesMade(true);
    } 

    const renameGroup = (newName, groupIndex) => {
        if (newName === '') {
            return;
        }
        let groupCopy = Array.from(groups);
        groupCopy[groupIndex].name = newName;
        groupCopy[groupIndex].rename = false;
        setGroups(groupCopy);
        setChangesMade(true);
    }

    const startEditGroupName = (groupIndex) => {
        let groupCopy = Array.from(groups);

        groupCopy[groupIndex].name = '';
        groupCopy[groupIndex].rename = true;

        setGroups(groupCopy); 
        setChangesMade(true);   
    }

    if (!gotCombos) {
        ipcRenderer.send('get-combos');
        setGotCombos(true);
    }

    if (!gotGroups) {
        ipcRenderer.send('get-groupings');
        setGotGroups(true);
    }


    // Now listen for the combos
    ipcRenderer.on('combos', (event, {combos}) => {
        setCombos(combos);
    });

    // Now listen for group changes
    ipcRenderer.on('groups', (event, {groupings}) => {
        setGroups(groupings);
    });


    const filterComboList = (event) => {

        const criteria = event.target.value.toLowerCase();

        if (criteria === '' || criteria === ' ') {
            ipcRenderer.send('get-combos');
            return;
        }

        let combosCopy = combos.length >= fullCombosCopy.length ? Array.from(combos) : Array.from(fullCombosCopy);
        let fullComboCopy = combos.length >= fullCombosCopy.length ? Array.from(combos) : Array.from(fullCombosCopy);

        combosCopy = combosCopy.filter(combo => combo.description.toLowerCase().includes(criteria) || 
            combo.packSize.toLowerCase().includes(criteria) || 
            combo.packType.toLowerCase().includes(criteria) || 
            combo.bevcat.toLowerCase().includes(criteria) || 
            combo.brand.toLowerCase().includes(criteria));

            setCombos(combosCopy);
            setFullCombosCopy(fullComboCopy);
    }


    const getList = id => id === 'droppable' ? combos : groups[parseInt(id.match(/\d+/g)[0])] || [];

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
                setCombos(items);
            } else {
                let dropperIndex = parseInt(destination.droppableId.match(/\d+/g)[0]);
                groups[dropperIndex].combos = items || [];
                setGroups(groups);
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
                groups[dropperIndex].combos = result[destination.droppableId] || [];
                setCombos(result[source.droppableId]);

            } else if (destination.droppableId === 'droppable') {

                let dropperIndex = parseInt(source.droppableId.match(/\d+/g)[0]);
                groups[dropperIndex].combos = result[source.droppableId] || [];
                setCombos(result[destination.droppableId]);

            } else {

                let dropper1Index = parseInt(source.droppableId.match(/\d+/g)[0]);
                groups[dropper1Index].combos = result[source.droppableId] || [];

                let dropper2Index = parseInt(destination.droppableId.match(/\d+/g)[0]);
                groups[dropper2Index].combos = result[destination.droppableId] || [];

            }
            setGroups(groups);
            setChangesMade(true);
        }
    };

    return (
        <>
            <GroupingModal show={priorityModalShow} 
                           onHide={() => setPriorityModalShow(false)}
                           groups={groups}
                           setGroups={setGroups}
                           setChangesMade={setChangesMade}/>
            <Pad25>
                <Button variant="outline-success" onClick={createNewGroup}>{Strings.createNewGroup}</Button>
                <Spacing/>
                <Button variant="outline-light" onClick={() => setPriorityModalShow(true)}>{Strings.showPriorityModal}</Button>
                <Spacing/>
                <Button variant="outline-primary" onClick={() => saveGroupChanges(groups)}>{Strings.saveChanges} {changesMade && <CircleFill size={8}/>}</Button>
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
                        <h4>{Strings.allPackageCombos} ({combos.length})</h4>
                        <Mg25 className="input-group">
                            <input id="filteredInput" type="text" className="form-control" placeholder="Filter" onChange={filterComboList}/>
                        </Mg25>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {combos.map((item, index) => (
                                        <DraggableCard parentId={`droppable`} item={item} index={index} getItemStyle={getItemStyle} showTable/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <Flex>
                        {groups.map((group, i) => {
                            return (
                                <div>
                                    <FlexApart className={'group-header'}>
                                        <input type={groups[i].rename ? 'text' : 'hidden'} className={'title-input'} defaultValue='' placeholder={'Edit Group Name'} id={`droppable-title-${i}`}/>
                                        { !groups[i].rename &&
                                            <h4>
                                                {group.name}
                                            </h4>
                                        }  
                                        <FlexApart className={'icon-group-header'}>
                                            { groups[i].rename ?
                                                <div className={'icon-group-items-no-spin'} onClick={() => renameGroup(document.getElementById(`droppable-title-${i}`).value, i)}>
                                                    <Check  size={32}/>
                                                </div>
                                            :
                                                <div className={'icon-group-items'} onClick={() => { startEditGroupName(i); document.getElementById(`droppable-title-${i}`).focus();}}>
                                                    <Pencil  size={24}/>
                                                </div>
                                            }

                                            { groups.length !== 1 && 
                                                (<div className={'icon-group-items-no-spin-regular'} onClick={() => deleteGroup(i)}>
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
                                                {group.combos.map((item, index) => (
                                                    <DraggableCard item={item} parentId={`droppable${i}`} index={index} getItemStyle={getItemStyle}/>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )
                        })}
                    </Flex>
                </FlexOnYou>
            </DragDropContext>
        </>
    );
}
// Put the thing into the DOM!

export default Grouping;

