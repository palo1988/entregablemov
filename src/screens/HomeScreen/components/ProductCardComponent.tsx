import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";

const ProductCardComponent = () => {
  return (
    <View style={styles.rootListProduct}>
      <View>
        <Text variant="labelLarge">Nombre:</Text>
        <Text variant="labelSmall">Descripcion:</Text>
        <Text variant="bodyMedium">Precio:</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="music-circle"
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
};

export default ProductCardComponent;
