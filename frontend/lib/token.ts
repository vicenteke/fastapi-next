// Methods used to manage the token

var _token: any = null;

export function getToken() {
    if (_token) return _token;
    const tokenString = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME!);
    let token = null;

    if (tokenString !== "undefined") {
        token = JSON.parse(tokenString!);
    }
    _token = token;
    return token;
}

export function setToken(token: any) {
    if (typeof token !== 'string') {
        token = JSON.stringify(token);
    }
    localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_NAME!, token);
}

export function deleteToken() {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME!);
    _token = null;
}
