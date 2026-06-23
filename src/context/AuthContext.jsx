import{createContext,useContext,useState}from'react';
const Ctx=createContext();
export const AuthProvider=({children})=>{
const[admin,setAdmin]=useState(()=>{try{return localStorage.getItem('tarek_admin_tk')}catch{return null}});
const login=(t)=>{try{localStorage.setItem('tarek_admin_tk',t)}catch{}setAdmin(t)};
const logout=()=>{try{localStorage.removeItem('tarek_admin_tk')}catch{}setAdmin(null)};
const isAdmin=()=>admin==='tarek-admin-2025';
return<Ctx.Provider value={{admin,login,logout,isAdmin}}>{children}</Ctx.Provider>;
};
export const useAuth=()=>useContext(Ctx);