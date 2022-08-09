import './menu.css'
import React from 'react'

function Menu(props, padding = "5px"){

    const styles={
        navbar:{padding:"10px 30px"}
    }

    function toggleSubmenu(e,item){
        // if the triangle is clicked
        let triangle = e.target
        // if the text is clicked select next sibling, the triangle
        if (e.target.id === `${item}-text`){
            triangle = e.target.nextElementSibling;
        }
        const submenuId = `${item}-submenu`
        const submenu = document.getElementById(submenuId)
        const parentItem = document.getElementById(item)
        if (submenu.style.transform === 'scaleY(1)'){
            submenu.style.transform = 'scaleY(0)'
            triangle.classList.remove('rotate-triangle')
        }
        else{
            submenu.style.transform = 'scaleY(1)'
            triangle.classList.add('rotate-triangle')
        }
        parentItem.addEventListener('mouseleave', e => {
            submenu.style.transform = 'scaleY(0)'
            triangle.classList.remove('rotate-triangle')
        } )
    }

    return(
        <nav className={`navbar ${props.right ? "align-right" : ""}`} style={styles.navbar}>
            <header className="navBrand">Nav Brand</header>
            <ul className="menu-container">
                {props.menuItems.map(menuItem => (
                    <li className={`menu-item ${menuItem.dropdown ? "dropdown" : ""}`} key={menuItem.id } id={menuItem.name}>
                        {menuItem.dropdown ? <span id={`${menuItem.name}-text`} onClick={(e) => toggleSubmenu(e,menuItem.name)}>{menuItem.name}</span> : <a href={menuItem.href}>{menuItem.name}</a>}
                        {menuItem.dropdown && <>
                            <i className="dropdown-triangle" onClick={(e) => toggleSubmenu(e,menuItem.name)}></i>
                            <ul className="sub-menu" id={`${menuItem.name}-submenu`}>
                                {menuItem.submenu.map(subItem => (
                                    <li className="sub-menu-item" key={subItem.id}>
                                        <a href={subItem.href}>{subItem.name}</a>
                                    </li>))
                                }
                            </ul>
                        </>}
                    </li>
                ))}
            </ul>

        </nav>
    )
}
export default Menu