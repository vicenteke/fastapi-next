// Methods used to manage the token

export function getToken() {
    const tokenString = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME);
    let token = null;

    if (tokenString !== "undefined") {
        token = JSON.parse(tokenString);
    }
    return token;
}

export function setToken(token) {
    if (typeof token !== 'string') {
        token = JSON.stringify(token);
    }
    localStorage.setItem(token);
}
