/* Defines the application menus (routing and navigation).
 * - leftMenu: the items left-aligned on navbar;
 * - rightMenu: the items right-aligned on navbar;
 */

import Link from "next/link";
import { ItemProps } from "./NavbarLinks";
import Button from "./Button";
import LogoutButton from "./LogoutButton";

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
                href: '/'
            },
            {
                html: 'Contact',
                href: '/'
            },
            null,
            {
                html: 'Report an issue',
                href: '/'
            }
        ]
    },
];

export const rightMenu: Array<ItemProps> = [
    {
        html: 'Admin',
        href: '/admin',
        auth: {
            permissions: ['IS_ADMIN'],
        }
    },
    {
        html: <LogoutButton />,
        auth: {
            permissions: [],
        }
    },
    {
        html: <Button variant="inverted" href='/login'>Login</Button>,
        auth: {
            permissions: ['IS_ADMIN'],
            reverse: true,
        }
    }
];
