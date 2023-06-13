import Link from "next/link";
import MenuLinks from "./MenuLinks";


function Navbar() {
  const leftMenu = [
    {
      html: 'Home',
      href: '/'
    },
    {
      html: 'More',
      children: [
        {
          html: 'About',
          href: '/about'
        },
        {
          html: 'Contact',
          href: '/contact'
        },
        {},
        {
          html: 'Report an issue',
          href: '/issue'
        }
      ]
    },
  ];

  const rightMenu = [{
    html: <Link className='button is-light' href='/login'>Login</Link>
  }];

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
    
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      {/* Desktop menu */}
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <MenuLinks items={leftMenu}/>
        </div>
    
        <div className="navbar-end">
          <MenuLinks items={rightMenu}/>
        </div>
      </div>
    </nav>)
}

export default Navbar;
