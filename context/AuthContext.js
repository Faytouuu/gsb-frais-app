import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
// 1. Création du contexte
const AuthContext = createContext();
 
// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();
        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Erreur lors de la restauration de session : ", error);
      } finally {
        setSessionLoading(false);
      }
    };

    restoreSession();
  }, []);

  // 3. Fonction de connexion
  async function loginUser(login, password) {
    const data = await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.token);
    return data;
  }
 
  // 4. Fonction de déconnexion
  const logoutUser = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };
 
  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider value={{ user, token, sessionLoading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
 
// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}

export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token || null;
};
