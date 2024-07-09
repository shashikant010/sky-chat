import { createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../interfaces/user";
import { useNavigate } from "react-router-dom";
import { LocalStorage, requestHandler } from "../utils";
import { loginUser, logoutUser, registerUser } from "../api";
import Loader from "../components/Loader";

const AuthContext = createContext<{
    user:UserInterface | null,
    token:string|null,
    login:(data:{username:string,password:string})=>Promise<void>,
    register:(data:{username:string,password:string,email:string})=>Promise<void>,
    logout:()=>Promise<void>
}>({
    user:null,
    token:null,
    login:async()=>{},
    register:async()=>{},
    logout:async()=>{}
});

const useAuth = ()=>useContext(AuthContext);

const AuthProvider:React.FC<{children:React.ReactNode}>= ({
    children
})=>{
    const [isLoading,setIsloading]= useState<Boolean>(false);
    const [user,setUser]=useState<UserInterface | null>(null);
    const [token,setToken]=useState<string | null>(null);

    const navigate = useNavigate();

    const login=async(data:{username:string,password:string})=>{
        await requestHandler(
            async ()=> await loginUser(data),
            setIsloading,
            (res)=>{
                const {data}=res;
                setUser(data.user);
                setToken(data.token);
                LocalStorage.set("user",data.user);
                LocalStorage.set("token",data.accessToken);
                navigate("/chat")
            },
            alert
        )
    };

    const register =async(data:{username:string,email:string,password:string})=>{
        await requestHandler(
            async ()=> registerUser(data),
            setIsloading,
            ()=>{
                alert("successfully registered")
                navigate("/login")
            },
            alert
            )
    };

    const logout = async()=>{
        await requestHandler(
            async ()=> logoutUser(),
            setIsloading,
            ()=>{
                setUser(null),
                setToken(null),
                LocalStorage.clear(),
                navigate("/login")
            },
            alert
        )
    };

    useEffect(()=>{
        setIsloading(true)
        const _user = LocalStorage.get("user");
        const _token = LocalStorage.get("token");
        if(_user?.id && _token){
            setUser(_user);
            setToken(_token);
        }
        setIsloading(false)
    },[])

    return(
        <AuthContext.Provider value={{user,login,register,logout,token}}>
            {isLoading?<Loader/>:children}
        </AuthContext.Provider>
    );
};


export {AuthContext,AuthProvider,useAuth }