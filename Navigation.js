import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import { theme } from "./constants/theme";
import ProductDetail from "./screens/ProductDetail";
import OrderSuccessScreen from "./screens/OrderComplete";
import { Platform, StyleSheet } from "react-native";
import TabBarIcon from "./components/TabBarIcon";
import Payment from "./screens/Payment";
import Wishlist from "./screens/Wishlist";
import Checkout from "./screens/Checkout";
import OrderHistoryScreen from "./screens/OrderHistory";
import OrderDetail from "./screens/OrderDetail";

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const isCart = true;

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: styles.label,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarStyle: [
        styles.tabContainer,
        // Platform.OS === "ios" && {
        //   shadowOffset: { height: 2, width: 2 },
        //   shadowOpacity: 0.1,
        //   shadowRadius: 14,
        // },
      ],
      tabBarItemStyle: {
        marginBottom: 7,
      },
      tabBarInactiveTintColor: "white",
    }}
    safeAreaInsets={{
      bottom: 0,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"home"} />
        ),
      }}
    />

    <Tab.Screen
      name="Wishlist"
      component={Wishlist}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"heart"} />
        ),
      }}
    />

    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"shoppingcart"} isCart={isCart} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Create Stack Navigator
const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Details" component={ProductDetail} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Complete" component={OrderSuccessScreen} />
      <Stack.Screen name="History" component={OrderHistoryScreen} />
      <Stack.Screen name="HistoryDetails" component={OrderDetail} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: theme.radius.xl,
    left: "5%",
    bottom: 10,
    backgroundColor: theme.colors.dark,
    height: 65,
  },
  label: {
    textTransform: "capitalize",
    // ...regular,
    fontSize: 12,
  },
});
