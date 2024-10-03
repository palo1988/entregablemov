//rafc+TAB
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
//interface
interface FormRegister {
  email: string;
  password: string;
}
//interface message
interface showMessage {
  visible: boolean;
  message: string;
  color: string;
}
const RegisterScreen = () => {
  const [formRegister, setformRegister] = useState<FormRegister>({
    email: "",
    password: "",
  });
  //hooks cambiar estado del mensaje
  const [showMessage, setshowMessage] = useState<showMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });
  //hook contraseña visible o no
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);
  //hook navigation
  const navigation = useNavigation();
  //funcion actualizar estado de formulario
  const handleSetValues = (key: string, value: string) => {
    setformRegister({ ...formRegister, [key]: value });
  };
  //funcion registrar nuevos usuarios
  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setshowMessage({
        visible: true,
        message: "Completa todos los campos",
        color: "#7a0808",
      });
      return;
    }
    //console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setshowMessage({
        visible: true,
        message: "registro exitoso",
        color: "#095F06",
      });
    } catch (e) {
      console.log(e);
      setshowMessage({
        visible: true,
        message: "no se logro ingresar datos",
        color: "#B41919FF",
      });
    }
  };
  return (
    <View style={styles.root}>
      <Text>Registrate</Text>
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
      <Button mode="contained" onPress={handleRegister}>
        Registrar
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      >
        Ya tienes una cuenta? Inicia sesion ahora
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

export default RegisterScreen;
