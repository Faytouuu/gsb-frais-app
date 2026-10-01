import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import navbarStyles from "../styles/navbarStyles";

function Navbar() {
  // Navbar n'est pas un écran : elle ne reçoit pas la prop navigation
  // automatiquement, d'où l'usage du hook useNavigation().
  const navigation = useNavigation();
  const { user, logoutUser } = useAuth();

  return (
    <View style={navbarStyles.container}>
      <View style={navbarStyles.group}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={navbarStyles.link}>Accueil</Text>
        </Pressable>

        {/* Le bouton Tableau de bord n'apparaît que si l'utilisateur est connecté */}
        {user && (
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Text style={navbarStyles.link}>Tableau de bord</Text>
          </Pressable>
        )}
      </View>

      <View style={navbarStyles.group}>
        {/* Un seul des deux boutons Connexion / Déconnexion s'affiche */}
        {user ? (
          <Pressable onPress={logoutUser}>
            <Text style={navbarStyles.link}>Déconnexion</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={navbarStyles.link}>Connexion</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Navbar;
