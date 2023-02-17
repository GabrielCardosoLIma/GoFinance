import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const { clientId } = process.env;
const { redirect_uri } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContentData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContentData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const response_type = "token";
      const scope = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
      // const { type, params } = (await authSession.startAsync({
      //   authUrl,
      // })) as AuthorizationResponse;

      const response = await AuthSession.startAsync({ authUrl });

      console.log(response);


      // console.log(response.type);
      // console.log(response.params.access_token);

      // if (type === "success") {
      //   const response = await fetch(
      //     `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      //     );

      //   // const userInfo = await response.json();
      //   // console.log(userInfo);
      //   // setUser({
      //   //   id: userInfo.id,
      //   //   email: userInfo.email,
      //   //   name: userInfo.name,
      //   //   photo: userInfo.picture,
      //   // });
      // }

      await AsyncStorage.setItem("@gofinances:user", JSON.stringify(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem("@gofinances:user");
  }

  useEffect(() => {
    async function loadStoregeDate(): Promise<void> {
      const data = await AsyncStorage.getItem("@gofinances:user");
      if (data) {
        const userLogged = JSON.parse(data) as User;
        setUser(userLogged);
      }
      setLoading(false);
    }
    loadStoregeDate();
  }, [setUser, setLoading]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
