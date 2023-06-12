"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token.js";


type Props = React.PropsWithChildren<{
    permissions: Array<string>,
    atLeastOne?: boolean,
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
 * - atLeastOne: if used, will grant access if at least one permission is met
 * - redirect: whether to redirect to another page or not. If it has no
 * children, it is forced to be true
 * - to: the page to redirect if permissions are not met
 */
function PermissionChecker({
    children,
    permissions,
    atLeastOne=false,
    redirect=false,
    to="/login"
}: Props) {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [tokenFlag, setTokenFlag] = useState(false);
    const [token, setToken] = useState({access_token: '', scopes: Array()});
    const router = useRouter();

    useEffect(() => {
        setToken(getToken());
        setTokenFlag(true);
        if (!children) {
            redirect = true;
        }
        if (tokenFlag && token) {
            if (atLeastOne)
                setAuthorized(permissions.some(p => token.scopes.includes(p)));
            else
                setAuthorized(permissions.every(p => token.scopes.includes(p)));
        } else if (token === null) {
            setAuthorized(false);
        }
        if (tokenFlag && authorized === false && redirect) {
            router.push(to);
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
