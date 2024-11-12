import axios, {AxiosResponse} from "axios";
import {Playground} from "../../types.ts";

export function fetchPlayground(city: string | null): Promise<Playground[]> {
    const endpoint = city ? `/api/playground?${city}` : '/api/playground';

    console.log(`Fetching data from: ${endpoint}`);

    return axios.get<Playground[]>(endpoint)
        .then((response: AxiosResponse<Playground[]>) => {
            console.log('API Response:', response.data);
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                throw new Error('Unexpected response format: expected an array of playgrounds');
            }
        })
        .catch((error) => {
            console.error('Error fetching playground data:', error);
            throw error;
        });
}

// This function sends a request to create a new Playground
export function addPlayground(newItem: Playground): Promise<Playground> {
    // Logging the item for debugging
    console.log('Adding new playground:', newItem);

    return axios
        .post<Playground>('/api/playground', newItem, {
            headers: {
                'Content-Type': 'application/json',  // Ensure we are sending JSON
            },
        })
        .then((response: AxiosResponse<Playground>) => {
            console.log('Playground added successfully:', response.data);
            return response.data;  // Return the newly added playground
        })
        .catch((error) => {
            console.error('Error adding playground:', error.response || error.message);
            throw error;
        });
}

// Update Playground (modified to avoid modifying data)
export function updatePlayground(
   id: number,
    updatedItem: Playground  // Accept the entire updated item (like addPlayground)
): Promise<Playground> {

    // Logging the item for debugging
    console.log('Updating playground with ID:', id);
    console.log('Updated item:', updatedItem);

    return axios
        .put<Playground>(`/api/playground/${id}`, updatedItem, {
            headers: {
                'Content-Type': 'application/json',  // Ensure we are sending JSON
            },
        })
        .then((response: AxiosResponse<Playground>) => {
            console.log('Playground updated successfully:', response.data);
            return response.data;  // Return the updated playground
        })
        .catch((error) => {
            console.error('Error updating playground:', error.response || error.message);
            throw error;  // Rethrow the error to handle it in the calling function
        });
}

export function deletePlayground(id: number): Promise<void> {
    return axios.delete(`/api/playground/${id}`).then(() => {
    });
}
