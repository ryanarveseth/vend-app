import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import Strings from '../../Strings';

const AppNav = ({handleNavChange}) => (

    <Navbar variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#" name="showMainPage" onClick={() => handleNavChange('showMainPage')} className="sliding-box"><div className="white underline">{Strings.Home}</div></Nav.Link>
        <Nav.Link href="#" name="showCombination" onClick={() => handleNavChange('showCombination')} className="sliding-box"><div className="white underline">{Strings.PackageCombos}</div></Nav.Link>
        <Nav.Link href="#" name="showGroupings" onClick={() => handleNavChange('showGroupings')} className="sliding-box"><div className="white underline">{Strings.Groupings}</div></Nav.Link>
        {/* <Nav.Link href="#" name="showRvcPage" onClick={() => handleNavChange('showRvcPage')} className="sliding-box"><div className="white underline">RVC Codes</div></Nav.Link>
        <Nav.Link href="#" name="createLoadTemplatePage" onClick={() => handleNavChange('createLoadTemplatePage')} className="sliding-box"><div className="white underline">Create Load Template</div></Nav.Link> */}
      </Nav>
    </Navbar>
);


export default AppNav;