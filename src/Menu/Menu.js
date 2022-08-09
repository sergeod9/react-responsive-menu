import './menu.css'
import React, {useState, useEffect} from 'react'

function Menu(props){

    const menuSmallWidth = 400
    const breakpointSize = props.breakpoints.medium
    const direction = props.right ? 'right' : 'left'
    const navBgColor = "#5389"
    const sideMenuBgColor = "#5389"
    const subMenuBgColor = "#85d8"
    const subMenuItemBgColor = "#8880"
    const subMenuLineColor = '#888'
    const menuTextColor = '#cc6'
    const subMenuTextColor = '#dc3'

    //const initialPageWidth = window.innerWidth
    const initialHamburgerState =  window.innerWidth < props.breakpoints.medium
    const [isHamburger, setIsHamburger] = useState(initialHamburgerState)
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const [isWindowResized, setIsWindowResized] = useState(false)

    useEffect(()=>{
        window.addEventListener('resize', e => {
            window.innerWidth < breakpointSize ? setIsHamburger(true) : setIsHamburger(false)
            setIsWindowResized(prev => !prev)
        })
    }, [])

    useEffect(()=>{
        const menuContainer = document.querySelector('.menu-container')
        if(window.innerWidth < breakpointSize){
            if (direction === 'right'){
                isSideMenuOpen ? menuContainer.style.right = `0px`: 
                                menuContainer.style.right = `${- menuSmallWidth}px`
            }else{
                isSideMenuOpen ? menuContainer.style.left = `0px`: 
                                menuContainer.style.left = `${- menuSmallWidth}px`
            }
        }
        
    },[isSideMenuOpen, isWindowResized])

    const styleSmall ={
        navbar: {},
        menuContainer: {width: menuSmallWidth,
                        position: "fixed",
                        [direction]: `(${-menuSmallWidth}px)`,
                        top: "0",
                        padding: "0",
                        margin: "0",
                        height: "100vh",
                        backgroundColor: sideMenuBgColor},
        menuItem: {display: "block",
                        padding: "0",
                        top: "50px", margin: "30px 0",
                        textAlign: "center"},
        submenu: {width: "100%",
                        position: "relative",
                        backgroundColor: subMenuBgColor,
                        height: "0"},
        submenuItem: {borderColor:subMenuLineColor,
                        backgroundColor: subMenuItemBgColor},
        hamburgerButton:{backgroundColor: menuTextColor}
    }

    const styleLarge ={
        navbar: {flexDirection: "row",
                        width: "100%",
                        backgroundColor: navBgColor},
        menuContainer: {width: "fit-content",
                        position: "relative",
                        [direction]: "0"},
        menuItem: {display: "inline-block"},
        submenu: {backgroundColor: subMenuBgColor},
        submenuItem: {borderColor: subMenuLineColor,
                        backgroundColor: subMenuItemBgColor}
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
            submenu.style.height = '0'
            triangle.classList.remove('rotate-triangle')
        }
        else{
            submenu.style.transform = 'scaleY(1)'
            submenu.style.height = "fit-content"
            triangle.classList.add('rotate-triangle')
        }
        parentItem.addEventListener('mouseleave', e => {
            submenu.style.transform = 'scaleY(0)'
            submenu.style.height = '0'
            triangle.classList.remove('rotate-triangle')
        } )
    }

    function toggleHamburger(){
        setIsSideMenuOpen(prev => !prev)
    }

    const hamburger = 
        <div className="hamburger" onClick={toggleHamburger}>
            <div className="line"  style={styleSmall.hamburgerButton}></div>
            <div className="line"  style={styleSmall.hamburgerButton}></div>
            <div className="line"  style={styleSmall.hamburgerButton}></div>
        </div>

    return(
        <>
        {(isHamburger && isSideMenuOpen) && <div className="modal-overlay" style={{opacity: '1'}} onClick={toggleHamburger}></div>}
        <nav className={`navbar ${props.right ? "align-right" : ""}`} style={isHamburger ? styleSmall.navbar : styleLarge.navbar}>
            <header className="navBrand" style={{color: menuTextColor}}>Nav Brand</header>
            <ul className="menu-container" style={isHamburger ? styleSmall.menuContainer : styleLarge.menuContainer}>
                {props.menuItems.map(menuItem => (
                    <li className={`menu-item ${menuItem.dropdown ? "dropdown" : ""}`} 
                        key={menuItem.id } 
                        id={menuItem.name}
                        style={isHamburger ? styleSmall.menuItem : styleLarge.menuItem}    
                    >
                        {menuItem.dropdown ? <span id={`${menuItem.name}-text`} style={{color: menuTextColor}}
                                                onClick={(e) => toggleSubmenu(e,menuItem.name)}>
                                                {menuItem.name}
                                            </span> :
                                            <a href={menuItem.href} style={{color: menuTextColor}}>{menuItem.name}</a>}
                        {menuItem.dropdown && <>
                            <i className="dropdown-triangle" onClick={(e) => toggleSubmenu(e,menuItem.name)} style={{borderTopColor: menuTextColor}}>
                            </i>
                            <ul className="sub-menu" id={`${menuItem.name}-submenu`} style={isHamburger ? styleSmall.submenu : styleLarge.submenu}>
                                {menuItem.submenu.map(subItem => (
                                    <li className="sub-menu-item" key={subItem.id} style={isHamburger ? styleSmall.submenuItem : styleLarge.submenuItem}>
                                        <a href={subItem.href} style={{color:subMenuTextColor}}>{subItem.name}</a>
                                    </li>))
                                }
                            </ul>
                        </>}
                    </li>
                ))}
            </ul>
            {isHamburger && hamburger}
        </nav>
        </>
    )
}
export default Menu