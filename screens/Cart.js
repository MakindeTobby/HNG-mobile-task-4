import React from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { totalCartPriceSelector } from "../store/selectors/CartSelector";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const totalCartPrice = useSelector(totalCartPriceSelector);
  const deliveryFee = 1500;
  const discountFee = 500;

  const handleSubmitOrder = () => {
    navigation.navigate("Checkout");
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Item in Cart</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.detailsContainer}>
      <Text style={styles.itemTitle}>Shopping Summary</Text>
      <View style={styles.formContainer}>
        <Text style={styles.itemTitle}>Discount Code</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            // value={cardNumber}
            // onChangeText={setCardNumber}
          />
          <TouchableOpacity style={styles.buttonStyle}>
            <Text> Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Sub-Total</Text>
        <Text style={styles.itemTitle}>
          N {totalCartPrice.toLocaleString()}
        </Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Delivery Fee</Text>
        <Text style={styles.itemTitle}>N {deliveryFee.toLocaleString()}</Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Discount Amount</Text>
        <Text style={styles.itemTitle}>N {discountFee.toLocaleString()}</Text>
      </View>
      <View style={styles.dashedLineContainer}>
        {Array.from({ length: 35 }).map((_, index) => (
          <View key={index} style={styles.dash} />
        ))}
      </View>
      <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Total Amount</Text>
        <Text style={styles.itemTitle}>
          N{" "}
          {Number(totalCartPrice + deliveryFee - discountFee).toLocaleString()}
        </Text>
      </View>
      <Pressable style={styles.startButton} onPress={handleSubmitOrder}>
        <Text style={styles.startText}>Checkout</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <Header name={"My Cart"} />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartCard item={item} />}
        ListEmptyComponent={renderEmptyCart}
        ListFooterComponent={cartItems.length > 0 ? renderFooter : null}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
    backgroundColor: "#fff",
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
    marginHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    color: "#4B5563",
    fontFamily: "Montserrat_400Regular",
  },
  contentBox: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
  dashedLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10, // Adjust as needed
  },
  dash: {
    width: 4,
    height: 1,
    backgroundColor: theme.colors.neutral(0.9),
  },

  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginVertical: 5,
  },
  quantityButton: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 5,
    backgroundColor: theme.colors.dark,
    marginHorizontal: 1,
  },
  header: {
    paddingVertical: hp(0.8),
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 15,
  },
  itemQuantity: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: "600",
    fontSize: 16,
  },
  removeButton: {
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    bottom: 0,
    right: 0,
  },
  removeButtonText: {
    color: "white",
  },
  startButton: {
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.dark,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
  },
  cartCont: {
    width: 100,
    height: 100,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#EDEDED",
    paddingVertical: 14,
    marginBottom: 50,
    marginHorizontal: wp(2),
    borderRadius: 3,
    gap: 20,
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    gap: 4,
  },
  input: {
    height: 40,
    borderColor: theme.colors.neutral(0.4),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "70%",
  },
  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
    marginBottom: 5,
  },
  buttonStyle: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderCurve: "continuous",
    backgroundColor: theme.colors.primary,
  },
});
