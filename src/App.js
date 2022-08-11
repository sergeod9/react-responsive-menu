import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Menu from './Menu/Menu'
import {nanoid} from 'nanoid'
import './App.css';


function App() {

  // Submenu for portfolio, should be an array, submenu items should be objects
  const portfolioSubmenu = [
    {name: "Web Design", 
    href: "/web-design", 
    id: nanoid()},

    {name: "Front End", 
    href: "/front-end", 
    id: nanoid()},

    {name: "CG Protfolio", 
    href: "/cg", 
    id: nanoid()},
  ]

  const projectsSubmenu = [
    {name: "Project 1",
    href: "/project-1",
    id: nanoid()
    },
    
    {name: "Project 2",
    href: "/project-2",
    id: nanoid()
    }
  ]

  // provide the menu items info as an array of objects, as follows
  const menuItems = [
    {name:"Home", href: "/", id: nanoid() }, // You can ignore dropdown if not needed, or pass it as false
    {name:"Portfolio", dropdown: true , id: nanoid(), submenu:portfolioSubmenu },
    {name:"Projects", dropdown: true , id: nanoid(), submenu:projectsSubmenu },
    {name:"About", href:"/about", dropdown:false , id: nanoid() }
  ]
  
  // breakpoints object, not necessary, just for organization, and readability 
  const breakpoints = {
      small: 320,
      medium: 1024,
      large: 1440
  }

  return (
    <div className="App">
      {/* menuItems is the property that provides the menu items and hierarchy, must be an array of objects */}
      {/* breakpoint property can be provided as a number, it represents the window's width in pixels under which the 
        menu will switch to hidden hamburger menu, I'm using the breakpoints object created above to retrieve the number */}
      {/* right property aligns the menu to the right side, try to remove it and test the menu */}

      <Menu menuItems={menuItems} breakpoint={breakpoints.medium} right />

      {/* An example on using the menu with React Router library 'react-router-dom' */}

      <Routes>
        {/* Simply iterating through the menu items objects, to create routes, with a minimal welcome message dynamically changing following each menu items's name */}
        {menuItems.map( item => !item.dropdown && <Route exact path={item.href} element ={<h1>Welcome to the <strong>{item.name}</strong> Page</h1>} key={item.id} /> )}
        {portfolioSubmenu.map ( item => !item.dropdown && <Route exact path={item.href} element ={<h1>Welcome to the <strong>{item.name}</strong> Page</h1>} key={item.id} /> )}
        {projectsSubmenu.map( item => !item.dropdown && <Route exact path={item.href} element ={<h1>Welcome to the <strong>{item.name}</strong> Page</h1>} key={item.id} /> )}
      </Routes>
    </div>
  );
}

export default App;
