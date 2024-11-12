// import {Address} from "@tomtom-international/web-sdk-services";

export type Playground = {
    description: string;  id: number, location:string, rating:number, feedback:string, date:Date, address:Address
};
export type Address = {
    id: number, city: string, state: string, zip: string
};