import { ReactComponentElement, useEffect } from 'react';

type AlertTypes = 'info' | 'danger';

interface Props {
    type: AlertTypes,
    title: string,
    body: string,
    confirm: string,
    cancel: string
}


function Alert({ type, title, body, confirm, cancel }: Props) {

    return <>
    </>
}

export default Alert;
