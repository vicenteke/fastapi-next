import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
    return 'id-' + uuidv4();
}

export const decodeId = function(base32: string) {
    return base32.replaceAll(':', '');
}

