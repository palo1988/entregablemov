import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Text, Button } from "react-native-paper"; // Importa el botón de react-native-paper
import { styles } from "../../theme/styles";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Importa el método signOut de Firebase
import { auth } from "../../../config/firebaseConfig";

//interface form user
interface UserAuth {
  name: string;
}

const HomeScreen = () => {
  //hook useState:cambiar el estado del formulario
  const [userAuth, setuserAuth] = useState<UserAuth>({ name: "" });

  //useEffect para verificar el estado de autenticación
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserAuth({ name: user.displayName ?? "NA" });
      }
    });
  }, []);

  // Función para cerrar sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada");
        // Aquí puedes redirigir al usuario a la pantalla de login si es necesario
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <View style={styles.rootHome}>
      <View style={styles.headerHome}>
        <Avatar.Text size={80} label="XD" />
        <View>
          <Text variant="bodyMedium">Bienvenid@</Text>
          <Text variant="labelLarge">{userAuth.name}</Text>
        </View>
      </View>
      {/* Botón para cerrar sesión */}
      <Button mode="contained" onPress={handleSignOut}>
        Cerrar sesión
      </Button>
    </View>
  );
};

export default HomeScreen;
