import { createContext , useEffect, useState } from "react";
import { getLoggedUserData } from "../Services/login";

export const AuthContext = createContext();

export default function AuthContextProvider( { children } ) {

  const [ isLogged , setisLogged ] = useState( localStorage.getItem('userToken') != null );

  const [userData, setUserData] = useState(null);

  async function getUserData() {
    const response = await getLoggedUserData();
    if ( response.message == 'success' ) {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLogged) {
      getUserData();
    }
  } , [isLogged])

  return <AuthContext.Provider value={ { isLogged , setisLogged , userData, setUserData } }>
      { children }
    </AuthContext.Provider>
  ;
}