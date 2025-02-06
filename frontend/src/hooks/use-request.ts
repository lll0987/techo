const base = 'http://localhost:3000';

export const useRequest = () => {
    const GET = (url: string, params?: unknown) => {
        const init: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // if (params) init.body = JSON.stringify(params);
        return fetch(base + url, init).then(res => res.json());
    };
    const POST = (url: string, params?: unknown) => {
        const init: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (params) init.body = JSON.stringify(params);
        return fetch(base + url, init).then(res => res.json());
    };
    const PUT = (url: string, params: unknown) => {
        const init: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (params) init.body = JSON.stringify(params);
        return fetch(base + url, init).then(res => res.json());
    };
    const DELETE = (url: string, params?: unknown) => {
        const init: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (params) init.body = JSON.stringify(params);
        return fetch(base + url, init).then(res => res.json());
    };
    return { GET, POST, PUT, DELETE };
};
