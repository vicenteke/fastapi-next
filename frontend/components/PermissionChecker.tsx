"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token.js";


export type Props = React.PropsWithChildren<{
    permissions: Array<string>;
    atLeastOne?: boolean;
    reverse?: boolean;
    redirect?: boolean;
    to?: string | null;
    loginRoute?: string;
}>;


/* Description: component that implements authorization (check permissions).
 * The component can be used in two different ways: one for hidding certain
 * children components if permissions are not met, and another one that
 * redirects the user to another page (defaults to /login).
 *
 * Props:
 * - permissions: array of permissions (must match the values in token.scopes)
 * - atLeastOne: if used, will grant access if at least one permission is met
 * - reverse: whether to avoid those permissions or to look for them;
 * - redirect: whether to redirect to another page or not. If it has no
 * children, it is forced to be true
 * - to: the page to redirect if permissions are not met
 */
function PermissionChecker({
    children,
    permissions,
    atLeastOne=false,
    reverse=false,
    redirect=false,
    loginRoute="/login",
    to=null
}: Props) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [tokenFlag, setTokenFlag] = useState(false);
    const [token, setToken] = useState({access_token: '', scopes: Array()});
    const router = useRouter();

    if (!children) {
        redirect = true;
    }

    const redirectRoute = to === null ? loginRoute : `${loginRoute}?redirect=${to}`;

    useEffect(() => {
        if (token && !token.access_token) {
            setToken(getToken());
            setTokenFlag(true);
        }
        if (tokenFlag && token) {
            let permissionsMatch = false;
            if (atLeastOne)
                permissionsMatch = permissions.some(p => token.scopes.includes(p));
            else
                permissionsMatch = permissions.every(p => token.scopes.includes(p));

            if (reverse)
                permissionsMatch = !permissionsMatch

            setAuthorized(permissionsMatch);
        } else if (token === null) {
            setAuthorized(false);
        }
        if (tokenFlag && authorized === false && redirect) {
            router.push(redirectRoute);
        }
    }, [tokenFlag, authorized]);

    if (authorized && children) {
        return <>
            {children}
        </>
    }
    return <></>
}

export default PermissionChecker;
