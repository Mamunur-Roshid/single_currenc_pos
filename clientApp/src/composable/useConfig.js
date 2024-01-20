import { get } from 'lodash';

const host = process.env.NODE_ENV === 'production' ? 'https://pos.skmachineriesbd.com/api' : 'http://127.0.0.1:8000/api';
const hostName = process.env.NODE_ENV === 'production' ? 'https://pos.skmachineriesbd.com' : 'http://127.0.0.1:8000';

export default function useConfig() {
    return {
        host,
        hostName,
        get
    }
}

