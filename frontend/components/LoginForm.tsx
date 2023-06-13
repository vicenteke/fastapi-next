"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { setToken } from "@/lib/token";
import fetchServer from "@/lib/fetch.js"


interface Props {
    redirect?: boolean
}


export default function LoginForm({ redirect=false }: Props) {
    const loginRoute = '/token';
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSuccess = (token: object) => {
        setToken(token);
        setLoading(false);
        if (redirect) {
            router.back();
        }
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
                onError: (error) => {
                    setLoading(false);
                    console.log('error:', error);
                },
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
