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
import { auth, dbRealTime } from "../../../config/firebaseConfig";
import firebase from "@firebase/auth";
import { updateProfile } from "firebase/auth";
import ProductCardComponent from "./components/ProductCardComponent";
import NewProductComponent from "./components/NewProductComponent";
import { onValue, ref } from "firebase/database";
import { CommonActions, useNavigation } from "@react-navigation/native";

// Interface form user
interface FormUser {
  name: string;
}

// Interface
export interface Product {
  id: string;
  banda: string;
  album: string;
  description: string;
  price: number;
  stock: number;
}

const HomeScreen = () => {
  // Hook useNavigation: para manejar la navegación después de eliminar o actualizar un producto
  const navigation = useNavigation();
  // Hook useState: cambiar el estado del formulario
  const [formUser, setformUser] = useState<FormUser>({ name: "" });
  // Hook useState: capturar y modificar la data del usuario autenticado
  const [userData, setuserData] = useState<firebase.User | null>(null);
  // Hook useState: permitir que el modal usuario se visualice o no
  const [showModalProfile, setshowModalProfile] = useState<boolean>(false);
  // Hook useState: permitir que el modal producto se visualice o no
  const [showModalProduct, setshowModalProduct] = useState<boolean>(false);
  // Hook useState: gestionar lista de productos
  const [products, setproducts] = useState<Product[]>([]);

  // useEffect toma información del usuario autenticado de firebase
  useEffect(() => {
    setuserData(auth.currentUser);
    setformUser({ name: auth.currentUser?.displayName ?? "" });
    // Llamar función para listar productos
    getAllProducts();
  }, []);

  // Función: actualizar info usuario autenticado
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
    } catch (e) {
      console.log(e);
    }
    // Ocultar modal
    setshowModalProfile(false);
  };

  // Función: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformUser({ ...formUser, [key]: value });
  };

  // Función para cerrar sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada");
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
        );
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  const getAllProducts = () => {
    const dbRef = ref(
      dbRealTime,
      "discos/" + auth.currentUser?.uid + "/" + products
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos obtenidos:", data);
      if (!data) {
        return;
      }
      const getKeys = Object.keys(data);
      const listProduct: Product[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listProduct.push(value);
      });
      setproducts(listProduct);
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
            renderItem={({ item }) => <ProductCardComponent product={item} />}
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

          <Divider />
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
