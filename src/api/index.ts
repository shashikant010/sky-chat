import axios from "axios";
import { LocalStorage } from "../utils";

const apiClient = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URI,
    withCredentials:true,
  timeout: 120000,
    });

apiClient.interceptors.request.use(
    function(config){
        const token = LocalStorage.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);


// funcitions for work...
export const loginUser =(data:{username:string,password:string})=>{
    return apiClient.post("/users/login",data);
};


export const logoutUser = ()=>{
    return apiClient.post("/users/logout");
};

export const registerUser = (data:{username:string,password:string,email:string})=>{
    return apiClient.post("/users/register",data);
};

export const getAvailableUsers =()=>{
    return apiClient.get("/chat-app/chats/users");
};

export const getUserChats =()=>{
    return apiClient.get("/chat-app/chats");
};

export const createUserChat=(recieverId:string)=>{
    return apiClient.post(`/chat-app/chats/c/${recieverId}`);
};

export const createGroupChat = (data:{name:string,participants:string[]})=>{
    return apiClient.post(`/chat-app/chats/group`,data)
}

export const getGroupInfo = (chatId:string)=>{
    return apiClient.post(`/chat-app/chats/group/${chatId}`)
}

export const updateGroupName =(chatId:string,name:string)=>{
    return apiClient.post(`/chat-app/chats/group/${chatId}`,{name})
}


export const deleteGroup =(chatId:string)=>{
    return apiClient.delete(`/chat-app/chats/group/${chatId}`)
}

export const deleteOneOnOneChat = (chatId:string)=>{
    return apiClient.delete(`/chat-app/chats/remove/${chatId}`)
}

export const addParticipantsToGroup = (chatId:string,participantId:string)=>{
    return apiClient.post(`/chat-app/chats/group/${chatId}/${participantId}`)
}

export const removeParticipantsFromGroup=(chatId:string,participantId:string)=>{
    return apiClient.delete(`/chat-app/chats/group/${chatId}/${participantId}`)
}

export const getChatMessages=(chatId:string)=>{
    return apiClient.get(`/chat-app/messages/${chatId}`)
}

export const sendMessage=(chatId:string,content:string,attachments:File[])=>{
    const formData= new FormData();
    if(content){
        formData.append("content",content);
    }
    attachments?.map((file)=>{
        formData.append("attachments",file);
    })

    return apiClient.post(`/chat-app/messages/${chatId}`, formData);
}

export const deleteMessage=(chatId:string,messageId:string)=>{
    return apiClient.delete(`/chat-app/messages/${chatId}/${messageId}`);
}