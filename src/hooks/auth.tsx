import React, { createContext, ReactNode, useContext, useState } from "react";
import * as authSession from "expo-auth-session";

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

  async function signInWithGoogle() {
    try {
      const clientId =
        "153754986695-i77d7ubit6vm304a9540fgcm4kv4dg0g.apps.googleusercontent.com";
      const redirect_uri =
        "https://auth.expo.io/@gabriel_cardoso_lima/go-finance";
      const response_type = "token";
      const scope = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
      const { type, params } = (await authSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        console.log(response);
        console.log(params.access_token)

        const userInfo = await response.json();
        console.log(userInfo);
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        });
      }
      // console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
