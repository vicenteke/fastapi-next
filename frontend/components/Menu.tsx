/* Defines the application menus (routing and navigation).
 * - leftMenu: the items left-aligned on navbar;
 * - rightMenu: the items right-aligned on navbar;
 */

import { ItemProps } from "./NavbarLinks";
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
                href: '/about'
            },
            {
                html: 'Admin',
                href: '/admin'
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
        html: 'Login',
        href: '/login',
        auth: {
            permissions: ['IS_ADMIN'],
            reverse: true,
        }
    }
];
