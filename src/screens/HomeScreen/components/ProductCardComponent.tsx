import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { Product } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";
//interface Props
interface Props {
  product: Product;
}
const ProductCardComponent = ({ product }: Props) => {
  //hook useNavigation: permitir navegar de un screen a otro
  const navigation = useNavigation();
  return (
    <View style={styles.rootListProduct}>
      <View>
        <Text variant="labelLarge">Nombre: {product.banda}</Text>
        <Text variant="labelSmall">Descripcion:{product.description}</Text>
        <Text variant="bodyMedium">Precio:${product.price}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="music-circle"
          size={30}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({ name: "Detail", params: { product } })
            )
          }
        />
      </View>
    </View>
  );
};

export default ProductCardComponent;
