import './menu.css'
import React from 'react'

function Menu(props, padding = "5px"){


    const styles={
        navbar:{padding:"10px 30px"}
    }
    return(
        <nav className={`navbar ${props.right ? "align-right" : ""}`} style={styles.navbar}>
            <header className="navBrand">Nav Brand</header>
            <ul>
                {props.menuItems.map((menuItem, index) => (
                    <li className={`menu-item ${menuItem.dropdown ? "dropdown" : ""}`} key={menuItem.id } id={menuItem.id}>
                        <a href={menuItem.href}>{menuItem.name}</a>
                        {menuItem.dropdown && <i className="dropdown-triangle"></i>}
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}
export default Menu