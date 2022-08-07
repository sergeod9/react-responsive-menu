import Menu from './Menu/Menu'
import './App.css';


function App() {

  // provide the menu items info as an array of objects, as follows
  const menuItems = [
    {name:"Home", href: "home"}, // You can ignore dropdown if not needed, or pass it as false
    {name:"Portfolio", href: "portfolio", dropdown: true},
    {name:"About", href:"about", dropdown:false}
  ]
  return (
    <div className="App">
      {/* right property aligns the menu to the right side */}
      <Menu menuItems={menuItems} right />
    </div>
  );
}

export default App;
