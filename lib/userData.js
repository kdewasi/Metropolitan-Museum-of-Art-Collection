import { getToken } from './authenticate';

async function fetchUserData(endpoint, method = 'GET', data = null) {
    const token = getToken();
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, requestOptions);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
}

export async function addToFavourites(id) {
    return await fetchUserData(`favourites/${id}`, 'PUT');
}

export async function removeFromFavourites(id) {
    return await fetchUserData(`favourites/${id}`, 'DELETE');
}

export async function getFavourites() {
    return await fetchUserData('favourites');
}

export async function addToHistory(id) {
    return await fetchUserData(`history/${id}`, 'PUT');
}

export async function removeFromHistory(id) {
    return await fetchUserData(`history/${id}`, 'DELETE');
}

export async function getHistory() {
    return await fetchUserData('history');
}