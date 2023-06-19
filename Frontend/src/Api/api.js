import { useFetchData } from "../Hooks/useFetchData";

const port = process.env.REACT_APP_PORT;

export function FetchData(url, method = "GET", data = null){
    return useFetchData(`${port}${url}`, method, data);
}

export async function getTowns(){
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: null,
        };
        const res = await fetch(`${port}towns`, options);
        const towns = await res.json();
        return towns;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTown(id){
    const { result: town, loading, error } = FetchData(`towns/${id}`);
    const result = {
        town,
        loading,
        error,
    };
    return result;
}

// Town that contains the name
export async function getTownByName(name){
    const { result: town, loading, error } = FetchData(`towns?filters[route][$contains]=${name}`);
    const result = {
        town,
        loading,
        error,
    };
    return result;
}

export async function postTown(data){
    const { result, loading, error } = FetchData("towns", "POST", data);
    const res = {
        result,
        loading,
        error,
    };
    return res;
}

export async function deleteTown(id){
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: null,
        };
        const res = await fetch(`${port}towns/${id}`, options);
        const townResponse = await res.json();
        return townResponse;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTrips(){
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: null,
        };
        const res = await fetch(`${port}trips?populate=*`, options);
        const trips = await res.json();
        return trips;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTrip(id){
    try {
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: null,
        };
        const res = await fetch(`${port}trips/${id}?populate=*`, options);
        const trip = await res.json();
        return trip;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function postTrip(data){
    try {
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const res = await fetch(`${port}trips`, options);
        const tripsResponse = await res.json();
        return tripsResponse;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function putTrip(id, data){
    try {
        const options = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const res = await fetch(`${port}trips/${id}`, options);
        const tripsResponse = await res.json();
        return tripsResponse;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteTrip(id){
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: null,
        };
        const res = await fetch(`${port}trips/${id}`, options);
        const tripsResponse = await res.json();
        return tripsResponse;
    } catch (error) {
        console.log(error);
        return null;
    }
}