import firebase from "firebase";
import { createContext, useEffect, useState } from "react";
import Routes from "./routes";
import { auth } from "./services";
import './styles/global.css'

type User = {
  id: string;
  name: string;
};

type AuthContextTypes = {
  nameUser: User | undefined;
  signWithGoogle: () => Promise<void>;
  SignOut: () => void;
};


export const AuthContext = createContext({} as AuthContextTypes);

function App() {
  const [nameUser, setNameUser] = useState<User>();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userAuth') as string);

    if (user) {
      setNameUser(user);
    }
  }, []);

  const signWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, uid } = response.user;

      if (!displayName) {
        throw new Error('Missing information from google');
      }

      setNameUser({
        id: uid,
        name: displayName,
      });

      localStorage.setItem(
        'userAuth',
        JSON.stringify({ id: uid, nameUser: displayName }),
      );
    }
  };

  const SignOut = () => {
    setNameUser(undefined);
    localStorage.clear();
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ nameUser, signWithGoogle, SignOut }}>
      <Routes />
      </AuthContext.Provider>

    </div>
  );
}

export default App;
