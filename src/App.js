import React, {useState} from 'react';
import './App.css';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import NewCombination from './components/NewCombination';
import ComboView from './components/ComboView';
import AppNav from './components/AppNav';
import Groupings from './components/Groupings';
import Home from './components/Home';
import Rvcodes from './components/Rvcodes';

const App = () => {
  
  const [navigation, setNavigation] = useState(
    {
      showMainPage: true, 
      showCombination: false, 
      showGroupings: false, 
      createLoadTemplatePage: false,
      showRvcPage: false
    }
  );

  const handleNavChange = (name) => {
      setNavigation({showMainPage: false});
      setNavigation({showCombination: false});
      setNavigation({showGroupings: false});
      setNavigation({createLoadTemplatePage: false});
      setNavigation({showRvcPage: false});
      setNavigation({[name]: true });
  };

  return (
    <div className="App">

      <AppNav handleNavChange={handleNavChange}/>
      <AppHeader/>
      
      { navigation && navigation.showMainPage && <Home/> }
      
      { navigation && navigation.showCombination && (<><NewCombination/><ComboView/></>) }

      { navigation && navigation.showGroupings && <Groupings/> }

      { navigation && navigation.showRvcPage && <Rvcodes/> }

      {/* { navigation && navigation.createLoadTemplatePage && (<><NewCombination/>Load Templates<ComboView/></>) } */}

      <AppFooter/>
    </div>
  );
};

export default App;
