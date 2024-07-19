import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { useSelector } from "react-redux";

const TabBarIcon = ({ name, focused, isCart }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <View
      style={{
        backgroundColor: focused ? theme.colors.primary : "transparent",
        padding: 8,
        borderRadius: 99,
      }}
    >
      <AntDesign
        name={name}
        size={22}
        color={focused ? theme.colors.dark : "white"}
      />

      {isCart && (
        <>
          {totalItems > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default TabBarIcon;
const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
