"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export interface ItemProps {
    html?: string | React.ReactNode,
    href?: string,
    children?: Array<{} | {html: string | React.ReactNode, href: string}>
}

type Props = React.PropsWithChildren<{
    items: Array<ItemProps>,
    isTransparent?: boolean
}>;


/* Description: creates a list of divs to be used in navbar, mixing NextJS
 * routing with BulmaJS styles.
 * Props:
 * - items: array of items to be included in the menu;
 * - isTransparent: applies Bulma's is-boxed to dropdowns;
 * 
 * Example:
 * const leftMenu = [
 *   {
 *     html: 'Home',
 *     href: '/'
 *   },
 *   {
 *     html: 'More',
 *     children: [
 *       {
 *         html: 'About',
 *         href: '/about'
 *       },
 *       {
 *         html: 'Contact',
 *         href: '/contact'
 *       },
 *       {},
 *       {
 *         html: 'Report an issue',
 *         href: '/issue'
 *       }
 *     ]
 *   },
 * ];
 *
 * const rightMenu = [{
 *   html: <Link className='button is-light' href='/login'>Login</Link>
 * }];
 */
function NavbarLinks({ items, isTransparent }: Props) {
    const pathname = usePathname();
    const dropdownClasses = isTransparent ? "navbar-dropdown is-boxed" : "navbar-dropdown";

    return (<>
        {items.map((item, index) => {
            let classes = item.href && pathname === item.href ?
                "navbar-item is-active" : "navbar-item";
            return (
                <React.Fragment key={index}>
                {item.children &&
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">{item.html || <></>}</div>
                        <div className={dropdownClasses}>
                        {item.children.map((child, childIndex) => {
                            if (!child.href)
                                return <hr key={childIndex} className="navbar-divider" />
                            return <Link key={childIndex} href={child.href} className="navbar-item">
                                {child.html}
                            </Link>
                        })}
                        </div>
                    </div>
                }
                {!item.children && item.href &&
                    <Link href={item.href} className={classes}>
                        {item.html || <></>}
                    </Link>
                }
                {!item.children && !item.href && item.html &&
                    <div className={classes}>{item.html}</div>
                }
                </React.Fragment>
            )
        })}
    </>)
}

export default NavbarLinks;
