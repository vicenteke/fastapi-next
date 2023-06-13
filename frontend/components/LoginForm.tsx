"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";
import { setToken } from "@/lib/token";
import fetchServer from "@/lib/fetch.js";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

interface Props {
    redirect?: boolean
}


export default function LoginForm({ redirect=false }: Props) {
    const loginRoute = '/token';
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectRoute = searchParams?.get('redirect');

    const onSuccess = (token: object) => {
        setToken(token);
        setLoading(false);
        if (redirect) {
            if (redirectRoute === null || typeof redirectRoute !== 'string')
                router.back();
            else
                router.push(redirectRoute);
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
        <div className="field">
            <p className="control has-icons-left">
                <input
                    className='input'
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Username"
                />
                <span className="icon is-small is-left">
                    {/* <FontAwesomeIcon icon={faSquareEnvelope} className='icon'/> */}
                    <i className="fas fa-coffee"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control has-icons-left">
                <input
                    className='input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                 <span className="icon is-small is-left">
                    {/* <FontAwesomeIcon icon={faLock} className='icon is-small is-left'/> */}
                    <i className="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control">
                <Button
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                    isLoading={loading}
                >
                    Login
                </Button>
            </p>
        </div>
    </div>)
}
