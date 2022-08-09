import Menu from './Menu/Menu'
import {nanoid} from 'nanoid'
import './App.css';


function App() {
  // Submenu for portfolio, should be an array, submenu items should be objects
  const portfolioSubmenu = [
    {name: "Submenu 1", 
    href: "submenu-1", 
    id: nanoid()},

    {name: "Submenu 2", 
    href: "submenu-2", 
    id: nanoid()},

    {name: "Submenu 3", 
    href: "submenu-3", 
    id: nanoid()},
  ]

  const projectsSubmenu = [
    {name: "Project 1",
    href: "project-1",
    id: nanoid()
    },
    
    {name: "Project 2",
    href: "project-2",
    id: nanoid()
    }
  ]

  // provide the menu items info as an array of objects, as follows
  const menuItems = [
    {name:"Home", href: "home", id: nanoid() }, // You can ignore dropdown if not needed, or pass it as false
    {name:"Portfolio", href: "portfolio", dropdown: true , id: nanoid(), submenu:portfolioSubmenu },
    {name:"Projects", href: "projects", dropdown: true , id: nanoid(), submenu:projectsSubmenu },
    {name:"About", href:"about", dropdown:false , id: nanoid() }
  ]
  
  const breakpoints = {
      small: 320,
      medium: 1024,
      large: 1440
  }

  return (
    <div className="App">
      {/* right property aligns the menu to the right side */}
      <Menu menuItems={menuItems} breakpoints={breakpoints} right />
      <img src='./logo512.png' width = '400' />
    </div>
  );
}

export default App;
