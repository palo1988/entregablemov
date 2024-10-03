import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "../theme/styles";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
//interface formLogin
interface FormLogin {
  email: string;
  password: string;
}
//interface message
interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}
const LoginScreen = () => {
  //hook useState: cambiar el estado de formuladio
  const [formLogin, setformLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });
  //hook contraseña visible o no
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
  //hooks cambiar estado del mensaje
  const [showMessage, setshowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });
  //hook navigation
  const navigation = useNavigation();
  //funcion: actualizar el estado
  const handleSetValues = (key: string, value: string) => {
    setformLogin({ ...formLogin, [key]: value });
  };
  //funcion iniciar sesion
  const handleSignIn = async () => {
    if (!formLogin.email || !formLogin.password) {
      setshowMessage({
        visible: true,
        message: "Completa todos los campos",
        color: "#7a0808",
      });
      return;
    }
    //console.log(formLogin);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      //console.log(response);
    } catch (e) {
      //console.log(e);
      setshowMessage({
        visible: true,
        message: "correo y/o contraseña incorrecto",
        color: "#7a0808",
      });
    }
  };
  return (
    <View style={styles.root}>
      <Text>Inicia Sesion</Text>
      <TextInput
        label="Correo"
        mode="outlined"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handleSetValues("email", value)}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handleSetValues("password", value)}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              sethiddenPassword(!hiddenPassword);
            }}
          />
        }
      />
      <Button mode="contained" onPress={handleSignIn}>
        INICIAR
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Register" }))
        }
      >
        No tienes una cuenta? Regístrate ahora
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setshowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.message, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};

export default LoginScreen;
