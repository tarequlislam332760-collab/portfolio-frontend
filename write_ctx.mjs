import { writeFileSync } from 'fs';

writeFileSync('src/context/ThemeContext.jsx', `import{createContext,useContext,useState,useEffect}from'react';
const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
const[dark,setDark]=useState(true);
useEffect(()=>{document.documentElement.classList.toggle('dark',dark);},[dark]);
return(<ThemeContext.Provider value={{dark,toggleTheme:()=>setDark(d=>!d)}}>{children}</ThemeContext.Provider>);
};
export const useTheme=()=>useContext(ThemeContext);`);

writeFileSync('src/context/AuthContext.jsx', `import{createContext,useContext,useState}from'react';
const AuthContext=createContext();
export const AuthProvider=({children})=>{
const[admin,setAdmin]=useState(localStorage.getItem('token'));
const login=(token)=>{localStorage.setItem('token',token);setAdmin(token);};
const logout=()=>{localStorage.removeItem('token');setAdmin(null);};
return(<AuthContext.Provider value={{admin,login,logout}}>{children}</AuthContext.Provider>);
};
export const useAuth=()=>useContext(AuthContext);`);

console.log('Contexts done');
