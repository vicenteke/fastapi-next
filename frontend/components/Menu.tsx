/* Defines the application menus (routing and navigation).
 * - leftMenu: the items left-aligned on navbar;
 * - rightMenu: the items right-aligned on navbar;
 */

import Link from "next/link";
import { ItemProps } from "./NavbarLinks";

export const leftMenu: Array<ItemProps> = [
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

export const rightMenu: Array<ItemProps> = [
    {
        html: <Link className='button is-light' href='/login'>Login</Link>
    }
];
