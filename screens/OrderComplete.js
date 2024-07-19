import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { wp, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const confettiRef = useRef(null);

  useEffect(() => {
    confettiRef.current.start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/checkmark.png")} // Replace with your checkmark image path
          style={styles.image}
        />
        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.subtitle}>Thanks for your purchase</Text>

        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.startText}>Continue Shopping</Text>
        </Pressable>
      </View>

      <ConfettiCannon
        count={300}
        origin={{ x: wp(50), y: -10 }}
        fadeOut
        fallSpeed={3000}
        autoStart={false}
        ref={confettiRef}
        explosionSpeed={500}
        colors={["#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"]}
      />
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: hp(2.5),
    fontFamily: "Montserrat_600SemiBold",
    marginVertical: hp(2),
  },
  image: {
    width: wp(30),
    height: wp(30),
    marginVertical: hp(2),
  },
  subtitle: {
    fontSize: hp(2),
    color: "#4B5563",
    textAlign: "center",
  },
  startButton: {
    marginTop: 15,
    marginHorizontal: 10,
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingHorizontal: 20,
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
