"use client";

import React from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/token.js";


type Props = React.PropsWithChildren<{
    permissions: Array<string>,
    at_least_one?: boolean,
    redirect?: boolean,
    to?: string,
}>;


/* Description: component that implements authorization (check permissions).
 * The component can be used in two different ways: one for hidding certain
 * children components if permissions are not met, and another one that
 * redirects the user to another page (defaults to /login).
 *
 * Props:
 * - permissions: array of permissions (must match the values in token.scopes)
 * - at_least_one: if used, will grant access if at least one permission is met
 * - redirect: whether to redirect to another page or not. If it has no
 * children, it is forced to be true
 * - to: the page to redirect if permissions are not met
 */
function PermissionChecker({
    children,
    permissions,
    at_least_one=false,
    redirect=false,
    to="/login"
}: Props) {

    const router = useRouter();
    const token = getToken();
    let authorized = false;

    if (!children) {
        redirect = true;
    }

    if (token) {
        if (at_least_one) 
            authorized = permissions.some(p => token.scopes.includes(p));
        else
            authorized = permissions.every(p => token.scopes.includes(p));
    }

    if (authorized && children) {
        return <>
            {children}
        </>
    }

    if (redirect) {
        router.push(to);
    }
    return <></>
    
}

export default PermissionChecker;
