import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

export default function LoginScreen() {
  // 1. États locaux pour les champs du formulaire
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
 
  //2.
  const {loginUser} = useAuth();

  // 3. Hook pour la redirection après connexion
  const navigation = useNavigation();
  
  // 4. Déclaration de la fonction handleSubmit
  const handleSubmit = () => {
    // Appel de la fonction loginUser avec login et password
    if (loginUser(login, password)) {
      navigation.navigate("Dashboard"); // Redirige vers Dashboard si succès
    } else {
      Alert.alert("Identifiants incorrects"); // Affiche une erreur si échec
    }
  };

  // 5. Rend le formulaire
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <View>
        <Text>Login :</Text>
        <TextInput style={styles.input} value={login} onChangeText={setLogin} />

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

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>
    </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
