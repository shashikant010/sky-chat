export interface UserInterface{
    _id:string;
    username:string;
    email:string;
    createdAt:string;
    updatedAt:string;
    avatar:{
        _id:string;
        url:string;
        localPath:string;
    }
}