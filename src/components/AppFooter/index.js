import React from 'react';
import {RyanLogo, Pad25} from '../../style/styles';
import Strings from '../../Strings';

const AppFooter = () => (
    <Pad25>
        <RyanLogo src="./images/RA_logo_310.png" className="App-logo" alt="logo" />
        <div>{Strings.RyanPhone}</div>
        <div>{Strings.RyanEmail}</div>
    </Pad25>
);


export default AppFooter;