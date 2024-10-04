import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Text,
  Button,
  IconButton,
  Portal,
  Modal,
  Divider,
  TextInput,
  FAB,
} from "react-native-paper"; // Importa el botón de react-native-paper
import { styles } from "../../theme/styles";
import { signOut } from "firebase/auth"; // Importa el método signOut de Firebase
import { auth } from "../../../config/firebaseConfig";
import firebase from "@firebase/auth";
import { updateProfile } from "firebase/auth";
import ProductCardComponent from "./components/ProductCardComponent";
import NewProductComponent from "./components/NewProductComponent";

//interface form user
interface FormUser {
  name: string;
}
//interface
interface Product {
  id: string;
  code: string;
  nameProduct: string;
  description: string;
  price: number;
  stock: number;
}
const HomeScreen = () => {
  //hook useState:cambiar el estado del formulario
  const [formUser, setformUser] = useState<FormUser>({ name: "" });
  //hook useState: capturar y modificar la data del usuario autenticado
  const [userData, setuserData] = useState<firebase.User | null>(null);
  //hook useState: permitir que el modal usuario se  visualice o no
  const [showModalProfile, setshowModalProfile] = useState<boolean>(false);
  //hook useState: permitir que el modal producto se  visualice o no
  const [showModalProduct, setshowModalProduct] = useState<boolean>(false);
  //hook useState: gestionar lista de productos
  const [products, setproducts] = useState<Product[]>([
    {
      id: "1",
      code: "ADSV1233",
      nameProduct: "Dark side of the moon",
      price: 35,
      stock: 10,
      description: "mejor disco PinkFloyd",
    },
    {
      id: "2",
      code: "ADSV0666",
      nameProduct: "Animals",
      price: 35,
      stock: 10,
      description: "disco  de la banda PinkFloyd",
    },
  ]);

  //useEffect toma informacion del usuario autenticado de firebase
  useEffect(() => {
    setuserData(auth.currentUser);
    setformUser({ name: auth.currentUser?.displayName ?? "" });
  }, []);
  //funcion : actualizar info user autenticado
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
    } catch (e) {
      console.log(e);
    }
    //ocultar modal
    setshowModalProfile(false);
  };
  //funcion:actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformUser({ ...formUser, [key]: value });
  };

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
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={80} label="XD" />
          <View>
            <Text variant="bodyMedium">Bienvenid@</Text>
            <Text variant="labelLarge">{userData?.displayName}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="account-edit-outline"
              mode="contained"
              size={30}
              onPress={() => setshowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent />}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Botón para cerrar sesión */}
        <Button mode="contained" onPress={handleSignOut}>
          Cerrar sesión
        </Button>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.Modal}>
          <View style={styles.header}>
            <Text variant="bodyMedium">Mi Perfil</Text>
            <View style={styles.icon}>
              <IconButton
                icon="close-circle-outline"
                size={40}
                onPress={() => setshowModalProfile(false)}
              />
            </View>
          </View>

          <Divider></Divider>
          <TextInput
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            value={userData?.email!}
            disabled
          />
          <Button mode="contained" onPress={handleUpdateUser}>
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setshowModalProduct(true)}
      />
      <NewProductComponent
        showModalProduct={showModalProduct}
        setshowModalProduct={setshowModalProduct}
      />
    </>
  );
};

export default HomeScreen;
