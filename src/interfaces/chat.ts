import { UserInterface } from "./user";

export interface ChatListItemInterface {
    _id:string;
    name:string;
    admin:string;
    isGroupChat:true;
    lastMessage?:ChatMessageInterface;
    participants:UserInterface[];
    createdAt:string;
    updatedAt:string;

    
}   


export interface ChatMessageInterface{
    _id:string;
    sender:Pick<UserInterface,"_id"|"avatar"|"email"|"username">;
    content:string;
    chat:string;
    attachments:{
        url:string;
        localPath:string;
        _id:string;
    }[];
    createdAt:string;
    updatedAt:string;

}