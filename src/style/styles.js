import styled from 'styled-components';
import {Image, Row, Col, Button, Table, Card} from 'react-bootstrap';


const RyanLogo = styled(Image)`
    height: 50px;
    width: 50px;
`;

const Pad25 = styled.div`
    padding: 25px;
    background: #282c34 !important;
    color: white;
`;


const FormRow = styled(Row)`
    justify-content: center;
`;

const FormCol = styled(Col)`
    flex-grow: initial;
    line-height: 52px;
    margin: 2px;
    padding: 0 !important;
`;


const FormButton = styled(Button)`
    display: block !important;
`;


const FlexOnYou = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const FlexApart = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Flex = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start !important;
    align-items: flex-start !important; 
    justify-content: flex-start !important;
    max-width: 1000px;
`;

const ComboTable = styled(Table)`
    margin-left: auto;
    margin-right: auto;
    min-width: 50% !important;
    width: auto;
`;

const Mg25 = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
`;

const DarkCard = styled(Card)`
    background-color: #282c34;
    border: none;
`;

const Pad25W = styled(Pad25)`
    width: 500px;
    display: inline-block;
    text-align: left;
`;

const VFlex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const PriorityFlex = styled(FlexApart)`
    color: black;
`; 

const Light = styled.div`
    color: black !important;
`;

const SubTitle = styled.div`
    font-size: 16px;
    color: rgb(75,75,75);
    font-weight: bolder;

`;

export {RyanLogo, Pad25, FormCol, FormRow, FormButton, FlexOnYou, FlexApart, ComboTable, Flex, Mg25, DarkCard, Pad25W, VFlex, PriorityFlex, Light, SubTitle};