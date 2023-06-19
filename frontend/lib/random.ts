import {v4 as uuidv4} from 'uuid';

export function generateId(): string {
    return 'id-' + uuidv4();
}

