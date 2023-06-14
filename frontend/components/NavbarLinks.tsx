"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import PermissionChecker, { Props as AuthProps } from '@/components/PermissionChecker';

export interface ItemProps {
    html?: string | React.ReactNode,
    href?: string,
    auth?: AuthProps,
    children?: Array<
    null | {
        html: string | React.ReactNode,
        href: string,
        auth?: AuthProps
    }>
}

type Props = React.PropsWithChildren<{
    items: Array<ItemProps>,
    isTransparent?: boolean,
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
 *       null, // divider
 *       {
 *         html: 'Admin',
 *         href: '/admin',
 *         auth: {
 *              permissions: ['A', 'B'],
 *         }
 *       },
 *       {
 *         html: 'Login',
 *         href: '/login',
 *         auth: {
 *              permissions: ['A', 'B'],
 *              reverse: true,
 *         }
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

    function addPermissions(
        auth: AuthProps | undefined | null,
        key: string | number | null,
        children: React.ReactNode
    ) {
        if (!auth)
            return <React.Fragment key={key}>{children}</React.Fragment>
        return (
            <PermissionChecker key={key} {...auth}>
                {children}
            </PermissionChecker>
        )
    }

    return (<>
        {items.map((item, index) => {
            let classes = item.href && pathname === item.href ?
                "navbar-item is-active" : "navbar-item";
            return addPermissions(item.auth, index, <>
                {item.children &&
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">{item.html || <></>}</div>
                        <div className={dropdownClasses}>
                        {item.children.map((child, childIndex) => {
                            if (child === null)
                                return <hr key={childIndex} className="navbar-divider" />
                            return addPermissions(child.auth, childIndex,
                                <Link href={child.href} className="navbar-item">
                                    {child.html}
                                </Link>
                            )
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
            </>)
        })}
    </>)
}

export default NavbarLinks;
