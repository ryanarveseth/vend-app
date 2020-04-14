import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {ComboTable} from '../../style/styles';
import Strings from '../../Strings';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


const Centered = styled.div`
    text-align: centered;
`;

const ComboView = () => {

    const [combos, setCombos] = useState([]);
    const [alreadyTried, setAlreadyTried] = useState(false);

    if (!combos.length && !alreadyTried) {
        ipcRenderer.send('get-combos');
        setAlreadyTried(true);
    }

    ipcRenderer.on('combos', (event, {combos}) => {
        setCombos(combos);
    });
     
    return (
        <Centered>
            <br/>
            <br/>
            <br/>
            <br/>
            <ComboTable variant="dark" size="sm" striped bordered hover>
                <tbody>
                    <tr>
                        <th>
                            {Strings.row}
                        </th>
                        <th>
                            {Strings.comboDescription}
                        </th>
                        <th>
                            {Strings.packSize}
                        </th>
                        <th>
                            {Strings.packType}
                        </th>
                        <th>
                            {Strings.bevcat}
                        </th>
                        <th>
                            {Strings.brand}
                        </th>
                        <th>
                            {Strings.action}
                        </th>
                    </tr>
                    {
                        combos.map(
                            (combo, $index) => (
                                <tr key={$index}>
                                    <td>
                                        {$index + 1}
                                    </td>
                                    <td>
                                        {combo.description}
                                    </td>
                                    <td>
                                        {combo.packSize}
                                    </td>
                                    <td>
                                        {combo.packType}
                                    </td>
                                    <td>
                                        {combo.bevcat}
                                    </td>
                                    <td>
                                        {combo.brand}
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => {ipcRenderer.send('delete-combo', combo)}}>
                                            {Strings.delete}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </ComboTable>
            <br/>
            <br/>
            <br/>
            <br/>
        </Centered>
    );
};



export default ComboView;


