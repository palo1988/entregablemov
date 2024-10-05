import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "./HomeScreen";
import { ref, remove, update } from "firebase/database";
import { auth, dbRealTime } from "../../../config/firebaseConfig";

const DetailProductScreen = () => {
  // Hook useRoute: acceder a toda la info de navegación
  const route = useRoute();
  // Hook useNavigation: para manejar la navegación después de eliminar o actualizar un producto
  const navigation = useNavigation();

  // @ts-ignore
  const { product } = route.params;

  // Hook useState: cambiar estado del formulario de editar y eliminar
  const [formEdit, setFormEdit] = useState<Product>({
    id: "",
    banda: "", // Cambiado de code a banda
    album: "", // Cambiado de nameProduct a album
    price: 0,
    stock: 0,
    description: "",
  });

  // Hook useEffect: cargar y mostrar la data en el formulario de detalle
  useEffect(() => {
    // Actualizar datos en el formulario
    if (product) {
      setFormEdit(product);
    }
  }, [product]);

  // Función para capturar los cambios en el formulario
  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  // Función para actualizar los datos obtenidos
  const handleUpdateProducts = async () => {
    const dbRef = ref(
      dbRealTime,
      "discos/" + auth.currentUser?.uid + "/" + formEdit.id
    );

    try {
      // Actualizar el producto en Firebase
      await update(dbRef, {
        banda: formEdit.banda,
        album: formEdit.album,
        price: formEdit.price,
        stock: formEdit.stock,
        description: formEdit.description,
      });
      // Después de actualizar, puedes navegar a la pantalla anterior o mostrar un mensaje de éxito
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Función para eliminar el producto
  const handleDeleteProduct = async () => {
    const dbRef = ref(
      dbRealTime,
      "discos/" + auth.currentUser?.uid + "/" + formEdit.id
    );
    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <View style={styles.rootDetail}>
      <View>
        <Text variant="headlineSmall">Banda: {formEdit.banda} </Text>
        <TextInput
          label="Banda"
          value={formEdit.banda}
          onChangeText={(value) => handleSetValues("banda", value)} // Cambiado de code a banda
        />
        <Divider />
      </View>
      <View>
        <Text variant="bodyLarge">Álbum: {formEdit.album} </Text>
        <TextInput
          label="Álbum"
          value={formEdit.album}
          onChangeText={(value) => handleSetValues("album", value)} // Cambiado de nameProduct a album
        />
        <Divider />
      </View>
      <View style={styles.rootInputsProduct}>
        <Text variant="labelLarge">Precio:</Text>
        <TextInput
          label="Precio"
          value={formEdit.price.toString()}
          keyboardType="numeric"
          style={{ width: "25%" }}
          onChangeText={(value) => handleSetValues("price", value)}
        />
        <Text variant="labelLarge">Stock:</Text>
        <TextInput
          label="Stock"
          value={formEdit.stock.toString()}
          keyboardType="numeric"
          style={{ width: "25%" }}
          onChangeText={(value) => handleSetValues("stock", value)}
        />
        <Divider />
      </View>
      <View>
        <Text variant="labelLarge">Descripción:</Text>
        <TextInput
          label="Descripción"
          value={formEdit.description}
          multiline
          numberOfLines={3}
          onChangeText={(value) => handleSetValues("description", value)}
        />
      </View>

      <Button mode="contained" icon="update" onPress={handleUpdateProducts}>
        Actualizar
      </Button>
      <Button mode="contained" icon="delete" onPress={handleDeleteProduct}>
        Eliminar
      </Button>
    </View>
  );
};

export default DetailProductScreen;
