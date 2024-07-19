import React, { useRef, useState } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Paystack, paystackProps } from "react-native-paystack-webview";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { clearCart } from "../store/Slices/CartSlice";
import { totalCartPriceSelector } from "../store/selectors/CartSelector";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useSQLiteContext } from "expo-sqlite";
import HeaderTwo from "../components/HeaderTwo";
import Loader from "../components/Loader";

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const route = useRoute();
  const { contact, delivery, contact1, contact2 } = route.params;

  const navigation = useNavigation();
  const totalCartPrice = useSelector(totalCartPriceSelector);
  const deliveryFee = 1500;
  const discountFee = 500;
  const totalMoney = totalCartPrice + deliveryFee - discountFee;

  const db = useSQLiteContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitOrder = async (reference) => {
    setIsLoading(true);
    try {
      const statement = await db.prepareAsync(
        "INSERT INTO orders (orderData) VALUES (?)"
      );
      await statement.executeAsync([
        JSON.stringify({
          items: cartItems,
          total: totalMoney,
          date: new Date().toISOString(),
          address: delivery,
          email: contact1,
          phone: contact2,
          fullName: contact,
          deliveryFee: deliveryFee,
          discountFee: discountFee,
          ref_code: reference,
        }),
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log("Error while saving order:", error);
      Alert.alert("Error", "Error while saving order");
      setIsLoading(false);
    }

    // await saveOrder(orderData);
    dispatch(clearCart());
    navigation.navigate("Complete");
  };
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} name={"Confirming Payment"} />
      <StatusBar barStyle={"default"} />
      <HeaderTwo name={"Payment"} />
      <Paystack
        paystackKey="pk_test_63450edff7c9728f9dfeee917786e54690c6c89e"
        paystackSecretKey="sk_test_bacce54a1421242fa61535d53c7a10f0dc24625c"
        billingEmail={contact1}
        amount={totalMoney}
        billingName={contact}
        billingMobile={contact2}
        currency="NGN"
        onCancel={(e) => {
          console.log(e);
          Alert.alert("Error", e);
        }}
        onSuccess={(res) => {
          handleSubmitOrder(res?.data?.transactionRef?.reference);
        }}
        ref={paystackWebViewRef}
      />
      {/* <CardHero cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} /> */}
      {/* <View style={styles.formContainer}>
        <Text style={styles.itemTitle}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.itemTitle}>Expiry Date</Text>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="MM/YY"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.itemTitle}>CVV</Text>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="CVV"
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={handleSubmitOrder}>
          <Text style={styles.buttonText}>Make Payment</Text>
        </Pressable>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }} // Add padding to the bottom
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.itemTitle}>Payment Summary</Text>
          <View style={styles.dashedLineContainer}>
            {Array.from({ length: 35 }).map((_, index) => (
              <View key={index} style={styles.dash} />
            ))}
          </View>
          <Text style={styles.itemTitle}>Name: {contact}</Text>
          <Text style={styles.itemTitle}>Email: {contact1}</Text>
          <Text style={styles.itemTitle}>Address: {delivery}</Text>

          <Text style={styles.itemTitle}>Phone No: {contact2}</Text>

          <View style={styles.dashedLineContainer}>
            {Array.from({ length: 35 }).map((_, index) => (
              <View key={index} style={styles.dash} />
            ))}
          </View>

          <View style={styles.textCont}>
            <Text style={styles.itemTitle}>Sub-Total</Text>
            <Text style={styles.itemTitle}>
              N {totalCartPrice.toLocaleString()}
            </Text>
          </View>
          <View style={styles.textCont}>
            <Text style={styles.itemTitle}>Delivery Fee</Text>
            <Text style={styles.itemTitle}>
              N {deliveryFee.toLocaleString()}
            </Text>
          </View>
          <View style={styles.textCont}>
            <Text style={styles.itemTitle}>Discount Amount</Text>
            <Text style={styles.itemTitle}>
              N {discountFee.toLocaleString()}
            </Text>
          </View>
          {/*
           */}
          <View style={styles.dashedLineContainer}>
            {Array.from({ length: 35 }).map((_, index) => (
              <View key={index} style={styles.dash} />
            ))}
          </View>
          <View style={styles.textCont}>
            <Text style={styles.itemTitle}>Total Amount: ₦ </Text>
            <Text style={styles.itemTitle}>
              N{" "}
              {Number(
                totalCartPrice + deliveryFee - discountFee
              ).toLocaleString()}
            </Text>
          </View>
          <View style={styles.dashedLineContainer}>
            {Array.from({ length: 35 }).map((_, index) => (
              <View key={index} style={styles.dash} />
            ))}
          </View>

          <Pressable
            style={styles.startButton}
            // onPress={() => setPay(true)}
            onPress={() => paystackWebViewRef.current.startTransaction()}
          >
            <Text style={styles.startText}>Make Payment</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    marginVertical: hp(2),
    marginHorizontal: wp(2),
    gap: 4,
  },
  inputWrapper: {
    width: "48%",
  },
  input: {
    height: 50,
    borderColor: theme.colors.neutral(0.5),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputHalf: {
    width: "100%",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.dark,
    fontSize: hp(2),
    fontFamily: "Montserrat_400Regular",
  },
  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
    marginBottom: 5,
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
  dashedLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 10, // Adjust as needed
  },
  dash: {
    width: 4,
    height: 1,
    backgroundColor: theme.colors.neutral(0.9),
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
