import Menu from './Menu/Menu'
import {nanoid} from 'nanoid'
import './App.css';


function App() {

  // provide the menu items info as an array of objects, as follows
  const menuItems = [
    {name:"Home", href: "home", id: nanoid() }, // You can ignore dropdown if not needed, or pass it as false
    {name:"Portfolio", href: "portfolio", dropdown: true , id: nanoid(), submenu:["sub-item-1", "sub-item-2", "sub-item-3"] },
    {name:"About", href:"about", dropdown:false , id: nanoid() }
  ]
  return (
    <div className="App">
      {/* right property aligns the menu to the right side */}
      <Menu menuItems={menuItems} right />
    </div>
  );
}

export default App;
