import { useFetchData } from "../Hooks/useFetchData";

const port = process.env.REACT_APP_PORT;

export function FetchData(url, method = "GET", data = null){
    return useFetchData(`${port}${url}`, method, data);
}

export async function getTowns(){
    const { result: towns, loading, error } = FetchData("towns");
    const result = {
        towns,
        loading,
        error,
    };
    return result;
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

export async function getTrips(){
    const { result: trips, loading, error } = FetchData("trips?populate=*");
    const result = {
        trips,
        loading,
        error,
    };
    return result;
}

export async function getTrip(id){
    const { result: trip, loading, error } = FetchData(`trips/${id}?populate=*`);
    const result = {
        trip,
        loading,
        error,
    };
    return result;
}

export async function postTrip(data){
    const { result, loading, error } = FetchData("trips", "POST", data);
    const res = {
        result,
        loading,
        error,
    };
    return res;
}

export async function deleteTrip(id){
    const { result, loading, error } = FetchData(`trips/${id}`, "DELETE");
    const res = {
        result,
        loading,
        error,
    };
    return res;
}