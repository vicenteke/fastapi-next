"use client";

import React, { useState } from "react";
import Button from "./Button";
import { setToken } from "@/lib/token";
import fetchServer from "@/lib/fetch.js"


export default function LoginForm() {
    const loginRoute = '/token';
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSuccess = (token: object) => {
        setToken(token);
        setLoading(false);
    }

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        let payload = new URLSearchParams({
            "grant_type": "password",
            "username": login,
            "password": password,
        }).toString();
        fetchServer(
            loginRoute,
            {
                method: "POST",
                token: false,
                payload: payload,
                contentType: "application/x-www-form-urlencoded",
                onSuccess: onSuccess,
                onLoading: () => setLoading(true),
                onError: () => setLoading(false),
            }
        );
    }

    return (
    <div>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" onClick={(e) => onSubmit(e)} isLoading={loading}>Login</Button>
    </div>)
}
