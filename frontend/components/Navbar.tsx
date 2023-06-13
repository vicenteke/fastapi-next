import NavbarLinks from "./NavbarLinks";
import { NavbarProps } from "@/constants/types";
import { leftMenu, rightMenu } from "./Menu";


/* Description: creates a navbar based on BulmaJS.
 *
 * Props:
 * - color: Bulma navbar variant;
 * - isFixedTop: whether it's fixed on top or not;
 * - isFixedBottom: whether it's fixed on bottom or not;
 * - isSpaced: Bulma class that adds some padding;
 * - hasShadow: Bulma class that adds a shadow to the navbar;
 */
function Navbar({
  className,
  color="primary",
  isFixedTop=true,
  isFixedBottom=false,
  isSpaced=false,
  hasShadow=false,
  ...props
}: NavbarProps) {
  let classNames = [className, "navbar"];
  if (typeof color === 'string') classNames.push("is-" + color)
  if (isFixedTop) classNames.push("is-fixed-top")
  else if (isFixedBottom) classNames.push("is-fixed-bottom")
  if (isSpaced) classNames.push("is-spaced")
  if (hasShadow) classNames.push("has-shadow")

  return (
    <nav className={classNames.join(" ")} role="navigation" aria-label="main navigation" {...props}>
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
          <NavbarLinks items={leftMenu} isTransparent={color === 'transparent'}/>
        </div>
    
        <div className="navbar-end">
          <NavbarLinks items={rightMenu} isTransparent={color === 'transparent'}/>
        </div>
      </div>
    </nav>)
}

export default Navbar;
