import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../theme/styles";
import DetailProductScreen from "../screens/HomeScreen/DetailProductScreen";

//interface- routes(stackScreen)
interface Routes {
  name: string;
  screen: () => JSX.Element; //componente React
  headerShow?: boolean;
  title?: string;
}

//arreglo routes cuando el user no este autenticado
const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
];

//arreglo routes cuando el user este autenticado
const routesAuth: Routes[] = [
  { name: "Home", screen: HomeScreen },
  {
    name: "Detail",
    screen: DetailProductScreen,
    headerShow: true,
    title: "DetalleDISCOS",
  },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  //hook usestate verificar si esta autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false);
  //hook useState: controlar carga inicial
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //hook useEffect: validar el estado de autenticacion
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      // ocultar el activity indicator después de validar la autenticación
      setIsLoading(false);
    });

    // cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator
            animating={true}
            size={30}
            color={MD2Colors.red800}
          />
        </View>
      ) : (
        <Stack.Navigator>
          {!isAuth
            ? routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
            : routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{
                    headerShown: item.headerShow ?? false,
                    title: item.headerShow ? item.title : "",
                  }}
                  component={item.screen}
                />
              ))}
        </Stack.Navigator>
      )}
    </>
  );
};
