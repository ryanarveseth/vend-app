import React from 'react';
import {Nav, Navbar, Image} from 'react-bootstrap';
import Strings from '../../Strings';
import {Pad25L} from '../../style/styles';
import styled from 'styled-components';

const Logo = styled(Image)`
  margin-left: 25px;
  width: 310px;
`;

const AppNav = ({handleNavChange}) => (

  <Pad25L>
    
    <Logo src="./images/SwireLogo.png"/>
    <Navbar variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#" name="showMainPage" onClick={() => handleNavChange('showMainPage')} className="sliding-box"><div className="white underline">{Strings.Home}</div></Nav.Link>
        <Nav.Link href="#" name="showCombination" onClick={() => handleNavChange('showCombination')} className="sliding-box"><div className="white underline">{Strings.PackageCombos}</div></Nav.Link>
        <Nav.Link href="#" name="showGroupings" onClick={() => handleNavChange('showGroupings')} className="sliding-box"><div className="white underline">{Strings.Groupings}</div></Nav.Link>
        <Nav.Link href="#" name="showRvcPage" onClick={() => handleNavChange('showRvcPage')} className="sliding-box"><div className="white underline">{Strings.rvcCodes}</div></Nav.Link>
        {/* <Nav.Link href="#" name="createLoadTemplatePage" onClick={() => handleNavChange('createLoadTemplatePage')} className="sliding-box"><div className="white underline">Create Load Template</div></Nav.Link> */}
      </Nav>
    </Navbar>
  </Pad25L>
);


export default AppNav;