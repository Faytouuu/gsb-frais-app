import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { View, Text, TextInput, Pressable } from "react-native";
import Navbar from "../components/Navbar";
import { loginStyles as styles } from "../styles/loginStyles.js";

export default function LoginScreen() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 2. Récupération de la fonction loginUser depuis le contexte d'authentification
  const { loginUser } = useAuth();

  // 3. Déclaration de la fonction handleSubmit pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const data = await loginUser(login, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Rendu du composant LoginScreen avec le formulaire de connexion
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>

        <View>
          <Text>Login :</Text>
          <TextInput
            style={styles.input}
            value={login}
            autoCapitalize="none"
            onChangeText={setLogin}
          />
        </View>

        <View>
          <Text>Mot de passe :</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? "Connexion..." : "Se connecter"}
          </Text>
        </Pressable>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </View>
    </View>
  );
}
