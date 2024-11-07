import axios, { AxiosResponse } from "axios";
import { Playground } from "../../types.ts";

export function fetchPlayground(): Promise<Playground[]> {
    return axios.get<Playground[]>('/api/playground').then((response: AxiosResponse<Playground[]>) => response.data);
}

export function fetchByLocation(location: string): Promise<Playground> {
    return axios.get<Playground>(`/api/playground/${location}`).then((response: AxiosResponse<Playground>) => response.data);
}
export function addPlayground(newItem: Playground): Promise<Playground> {
    return axios.post<Playground>('/api/playground', newItem).then((response: AxiosResponse<Playground>) => response.data);
}


export function updatePlayground(id: number, updatedItem: Partial<Playground>): Promise<Playground> {
    return axios.put<Playground>(`/api/playground/${id}`, updatedItem)
        .then((response: AxiosResponse<Playground>) => response.data);
}

export function deletePlayground(id: number): Promise<void> {
    return axios.delete(`/api/playground/${id}`).then(() => {});
}
