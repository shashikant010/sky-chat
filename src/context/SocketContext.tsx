import socketio from "socket.io-client"
import { LocalStorage } from "../utils"
import { createContext, useContext, useEffect, useState } from "react";

const getSocket =()=>{
    const token =LocalStorage.get("token")
    return socketio(import.meta.env.VITE_SOCKET_URI,{
        withCredentials:true,
        auth:{token}
    });
};

const socketContext = createContext<{socket:ReturnType<typeof socketio> | null}>({
        socket:null,
    });

const useSocket= ()=>useContext(socketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [socket,setSocket]=useState<ReturnType<typeof socketio> | null>(null);

    useEffect(()=>{
        setSocket(getSocket())
    },[])

    return(
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
  }

  export {SocketProvider,useSocket}