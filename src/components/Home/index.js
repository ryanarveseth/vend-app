import React, {useState} from 'react';
import {FlexCenter, Mg20LR, FlexOnYou, Mg6, Centered} from '../../style/styles';
import styled from 'styled-components';
import Strings from '../../Strings';
import {Button} from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';



const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const Table25 = styled.table`
    margin: 0 20px !important;
    border: 3px solid rgb(50, 50, 50);
    font-size: 11px;
    width: auto;
`;

const TH = styled.th`
    padding-left: 8px !important;
    padding-right: 8px !important;
`;

const TD = styled.td`
    padding-left: 8px !important;
    padding-right: 8px !important;
    border: 1px solid gray;
`;

const LTD = styled.td`
    padding-left: 8px;
    padding-right: 8px;
    padding: 0;
    text-align: left;
    border: 1px solid gray;
`;

const TR = styled.tr`
    text-align: center;
    border: 1px solid rgb(75, 75, 75);

`;

const ITD = styled.input`
    width: 50px;
    height: 100%;
`;

const NPTD = styled.td`
    padding: 0;
`;


const arrow_keys_handler = (e) => {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};

window.addEventListener("keydown", arrow_keys_handler, false);

const getNum = (n = 0) => (n).toFixed(2);


const Home = () => {

    const [gotGroups, setGotGroups] = useState(false);
    const [groups, setGroups] = useState([{ 
        'combos': []
    }]);

    const [gotCombos, setGotCombos] = useState(false);

    const [comboPrice, setComboPrice] = useState([]);

    const [loadData, setLoadData] = useState([]);
    const [customers, setCustomers] = useState([
        [

        ],
        [
          {value: Strings.customerNumbers, readOnly: true}
        ],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}],[{value: ''}],[{value: ''}],
        [{value: ''}]
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
            combosAndPrices.push({'combo': c, 'price': getNum(), 'isInHoveredGroup': false});
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


    const onlyNumbersForYou = (e) => {

        var allowCharCodes = [9, 110, 190, 8, 40, 38, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

        var charCode = (e.which) ? e.which : e.keyCode;

        console.log(e.which, e.keyCode);

        if (allowCharCodes.indexOf(charCode) >= 0) {
            return true;
        }

        e.preventDefault();
        return false;
    }

    const updateGroupPricing = (group, price) => {
        price = price * 1;
        let groupCopy = Array.from(groups);
        let comboPriceCopy = Array.from(comboPrice);
        let comboMap = [];

        groupCopy.forEach((g) =>  {
            if (g.id === group.id) {
                if (isNaN(price)) {
                    g.price = getNum();
                } else {
                    g.price = getNum(price) || getNum();
                }
            }
        });

        groupCopy.forEach((g) => {
            g.combos.forEach((c) => {
                if (g.price || g.id === group.id) {
                    comboMap[c.description + c.packSize + c.packType + c.bevcat + c.brand] = g.price;
                }
            });
        });

        comboPriceCopy.forEach((c) =>{
                c.price = comboMap[c.combo.description + c.combo.packSize + c.combo.packType + c.combo.bevcat + c.combo.brand] || getNum();
        });

        setComboPrice(comboPriceCopy);
        setGroups(groupCopy);
    };


    return (
        <FlexCenter>
            <Mg20LR>
                <FlexOnYou>
                    <Mg6>
                        <Button variant="outline-primary">Clear All</Button>
                    </Mg6>
                    <Mg6>
                        <Button variant="outline-primary">{Strings.clearCustomers}</Button>
                    </Mg6>
                    <Mg6>
                        <Button variant="outline-primary">Add Stuff</Button>
                    </Mg6>
                </FlexOnYou>
                <br/>
                <ReactDataSheet
                    data={customers}
                    valueRenderer={(cell) => cell.value}
                    onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                    onCellsChanged={(changes, addRows) => {
                        
                    const grid = customers.map(row => [...row])
                    changes.forEach(({cell, row, col, value}) => {
                        grid[row][col] = {...grid[row][col], value}
                    })

                    if (addRows) {
                        addRows.forEach(r => {
                            if (r.col === 0) {
                                grid[r.row] = [{value: r.value}]
                            }
                        });
                    }

                    if (grid[grid.length - 1][0].value) {
                        grid[grid.length] = [{value: ''}];

                    }
                    setCustomers(grid)
                    }}
                />
            </Mg20LR>
            

            <Table25 className={'table-striped table table-dark pricing-table hover'}>
                <tbody>
                    <TR>
                        <TH>{Strings.groupName}</TH>
                        <TH>{Strings.price}</TH>
                    </TR>
                    {
                        groups.map(g => 
                            (
                                <TR onMouseEnter={() => mouseEntered(g)} onMouseLeave={() => mouseLeft()}>
                                    <LTD className={'padded'}>
                                        {g.name}
                                    </LTD>
                                    <NPTD>
                                        <ITD type='text' onChange={(e) => updateGroupPricing(g, e.target.value)} onKeyDown={onlyNumbersForYou}/>
                                    </NPTD>
                                </TR>
                            )
                        )   
                    }

                </tbody>
            </Table25>


            <Table25 className={'table-striped table table-dark pricing-table hover'}>
                <tbody>
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
                                <TR className={ cp.isInHoveredGroup ? 'group-is-hovered' : cp.price > 0 ? 'price-entered' : 'pricing-table'}>
                                    <LTD className={'padded'}>
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
                                        {cp.price}
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