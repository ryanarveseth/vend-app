import React, {useState} from 'react';
import {FlexCenter} from '../../style/styles';
import styled from 'styled-components';
import Strings from '../../Strings';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const Table25 = styled.table`
    margin: 25px;
    border: 4px solid rgb(75, 75, 75);
    font-size: 12px;
`;

const TH = styled.th`
    padding-left: 8px;
    padding-right: 8px;

`;

const TD = styled.td`
    padding-left: 8px;
    padding-right: 8px;
    border: 1px solid gray;
`;

const LTD = styled.td`
    padding-left: 8px;
    padding-right: 8px;
    text-align: left;
    border: 1px solid gray;
`;

const TR = styled.tr`
    text-align: center;
    border: 1px solid rgb(75, 75, 75);

`;

const ITD = styled.input`
    width: 50px;
`;


const Home = () => {

    const [gotGroups, setGotGroups] = useState(false);
    const [groups, setGroups] = useState([{ 
        'combos': []
    }]);

    const [gotCombos, setGotCombos] = useState(false);
    //const [combos, setCombos] = useState([]);

    const [comboPrice, setComboPrice] = useState([
        // {
        //     'combo': {},
        //     'price': 0
        // }
    ]);


    if (!gotCombos) {
        ipcRenderer.send('get-combos');
        setGotCombos(true);
    }

    // Now listen for group changes
    ipcRenderer.on('combos', (event, {combos}) => {

        let comboArray = Array.from(combos);
        let combosAndPrices = [];

        comboArray.forEach(c => {
            combosAndPrices.push({'combo': c, 'price': 0, 'isInHoveredGroup': false});
        });

        setComboPrice(combosAndPrices);
    });


    if (!gotGroups) {
        ipcRenderer.send('get-groupings');
        setGotGroups(true);
    }

    // Now listen for group changes
    ipcRenderer.on('groups', (event, {groupings}) => {
        setGroups(groupings.slice(0).reverse());
    });


    const mouseEntered = (group) => {
        let comboPriceCopy = Array.from(comboPrice);

        let groupCombos = group.combos.map(c => ('' + c.description + c.packSize + c.packType + c.bevcat + c.brand));

        comboPriceCopy = comboPriceCopy.map(c => (
            {
                ...c,
                isInHoveredGroup: groupCombos.indexOf('' + c.combo.description + c.combo.packSize + c.combo.packType + c.combo.bevcat + c.combo.brand) >= 0 ? true : false
            }
        ));

        setComboPrice(comboPriceCopy);
    }

    const mouseLeft = () => {
        let comboPriceCopy = Array.from(comboPrice);
        comboPriceCopy = comboPriceCopy.map(c => (
            {
                ...c,
                isInHoveredGroup: false
            }
        ));

        setComboPrice(comboPriceCopy);
    }



    return (
        <FlexCenter>
<Table25>
                <tbody>
                    <TR>
                        <th colspan='2'>{Strings.preview}</th>
                    </TR>
                    <TR>
                        <TH>{Strings.groupName}</TH>
                        <TH>{Strings.price}</TH>
                    </TR>
                    {
                        groups.map(g => 
                            (
                                <TR>
                                    <LTD onMouseEnter={() => mouseEntered(g)} onMouseLeave={() => mouseLeft()}>
                                        {g.name}
                                    </LTD>
                                    <td>
                                        <ITD type='text'/>
                                    </td>
                                </TR>
                            )
                        )   
                    }

                </tbody>
            </Table25>


            <Table25>
                <tbody>
                    <TR>
                        <th colspan='6'>{Strings.preview}</th>
                    </TR>
                    <TR>
                        <TH>{Strings.comboDescription}</TH>
                        <TH>{Strings.packSize}</TH>
                        <TH>{Strings.packType}</TH>
                        <TH>{Strings.bevcat}</TH>
                        <TH>{Strings.brand}</TH>
                        <TH>{Strings.price}</TH>
                    </TR>
                    {
                        comboPrice.map(cp => 
                            (
                                <TR className={ cp.isInHoveredGroup && 'groupIsHovered'}>
                                    <LTD>
                                        {cp.combo.description}
                                    </LTD>
                                    <TD>
                                        {cp.combo.packSize}
                                    </TD>
                                    <TD>
                                        {cp.combo.packType}
                                    </TD>
                                    <TD>
                                        {cp.combo.bevcat}
                                    </TD>
                                    <TD>
                                        {cp.combo.brand}
                                    </TD>
                                    <TD>
                                        {cp.price.toFixed(2)}
                                    </TD>
                                </TR>
                            )
                        )   
                    }

                </tbody>
            </Table25>
        </FlexCenter>
    );
};


export default Home;