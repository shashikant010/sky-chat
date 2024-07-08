import { AxiosResponse } from "axios";
import { FreeAPISuccessResponseInterface } from "../interfaces/api";
import { ChatListItemInterface } from "../interfaces/chat";
import { UserInterface } from "../interfaces/user";


export const isBrowser= typeof window!=="undefined";

export const requestHandler=async(
    api:()=>Promise<AxiosResponse<FreeAPISuccessResponseInterface,any>>,
    setLoading:((loading:boolean)=>void)|null,
    onSuccess:(data:FreeAPISuccessResponseInterface)=>void,
    onError:(error:string)=>void
)=>{
    setLoading && setLoading(true);
    try {
        const response = await api();
        const {data}=response;
        if(data?.success){
            onSuccess(data);
        }
        
    } catch (error:any) {

        if([401,403].includes(error?.response.data?.statusCode)){
            localStorage.clear();
            if(isBrowser){
                window.location.href="/login";
            }
            onError(error?.response.data?.message || 'something went wrong')
        }

    } finally{
        setLoading && setLoading(false); 
    }


}