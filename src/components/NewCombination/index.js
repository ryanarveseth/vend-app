import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { FormCol, FormRow, FormButton } from '../../style/styles';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const NewCombination = (props) => {


    const [data, setData] = useState({
        description: '',
        packSize: '', 
        packType: '',
        bevcat: '',
        brand: ''
    });

    const handlePaste = (e) => {

        let splitData = e.clipboardData.getData('text/plain').split('\t');

        splitData = splitData.map((group) => group.replace(/\r?\n|\r/g, ''));

        e.preventDefault();

        console.log('splitData', splitData);

        if (splitData.size <= 1) {
            return;
        }

        if (splitData[0].length === 3 && splitData[0] !== 'NOS') {
            setData({
                description: '', 
                packSize: splitData[0] || '', 
                packType: splitData[1] || '', 
                bevcat: splitData[2] || '', 
                brand: splitData[3] || ''
            });
        } else {
            setData({
                description: splitData[0] || '', 
                packSize: splitData[1] || '', 
                packType: splitData[2] || '', 
                bevcat: splitData[3] || '', 
                brand: splitData[4] || ''
            });
        }
    }


    function addCombo() {

        if (!data.description || !data.packSize || !data.packType || !data.bevcat) {
            return;
        }

        ipcRenderer.send('add-combo', data);

        setData({
            bevcat: '', 
            description: '', 
            packSize: '', 
            packType: '', 
            brand: ''
        });
    };


    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    
    return ( 
        <Form onSubmit={(e) => { e.preventDefault(); }}>
            <h1>Add New Combination</h1>
            <FormRow className={'ComboInputs'}>
                <FormCol>
                    <Form.Label className={'label'}>Combo Description</Form.Label>
                    <Form.Control required 
                                  maxLength="20" 
                                  placeholder="20z Coke"
                                  name="description"
                                  type="text"
                                  value={data.description}
                                  onChange={handleChange} 
                                  onPaste={handlePaste}/>
                </FormCol>
                <FormCol className={'smaller'}>
                    <Form.Label className={'label'}>Pack Size</Form.Label>
                    <Form.Control required 
                                  maxLength="3" 
                                  minLength="3" 
                                  placeholder="xxx" 
                                  name="packSize"
                                  type="text"
                                  value={data.packSize}
                                  onChange={handleChange} 
                                  onPaste={handlePaste}/>
                </FormCol>
                <FormCol className={'smaller'}>
                    <Form.Label className={'label'}>Pack Type</Form.Label>
                    <Form.Control required 
                                  maxLength="3" 
                                  minLength="3" 
                                  placeholder="xxx" 
                                  name="packType"
                                  type="text"
                                  value={data.packType}
                                  onChange={handleChange}/>
                </FormCol>
                <FormCol className={'smaller'}>
                    <Form.Label className={'label'}>Bevcat</Form.Label>
                    <Form.Control required 
                                  maxLength="1" 
                                  minLength="1" 
                                  placeholder="x"
                                  name="bevcat"
                                  type="text"
                                  value={data.bevcat}
                                  onChange={handleChange}/>
                </FormCol>
                <FormCol>
                    <Form.Label className={'label'}>Brand (optional)</Form.Label>
                    <Form.Control maxLength="3" 
                                  minLength="3" 
                                  placeholder="xxx"
                                  name="brand"
                                  type="text"
                                  value={data.brand}
                                  onChange={handleChange}/>
                </FormCol>
                <FormCol>
                    <Form.Label className={'label'}>Add</Form.Label>
                    <FormButton variant="outline-success"
                                onClick={addCombo}>
                                Add
                    </FormButton>
                </FormCol>
            </FormRow>
        </Form>
    );
}



export default NewCombination;