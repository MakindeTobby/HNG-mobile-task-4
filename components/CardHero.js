import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { wp } from "../helpers/common";
import { theme } from "../constants/theme";

const CardHero = ({ cardNumber, expiryDate, cvv }) => {
  return (
    <View
      style={{
        marginHorizontal: wp(2),
        marginVertical: wp(2),
        borderRadius: theme.radius.sm,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={require("../assets/images/Card.png")}
        style={styles.heroContainer}
        resizeMode="contain"
      >
        <View style={styles.overlay}>
          <Text style={styles.cardNumber}>
            {cardNumber || "**** **** **** ****"}
          </Text>
          <View style={styles.row}>
            <Text style={styles.expiryDate}>{expiryDate || "MM/YY"}</Text>
            <Text style={styles.cvv}>{cvv || "CVV"}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardHero;

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: 232,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: theme.radius.sm,
  },
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: theme.radius.sm,
    paddingLeft: wp(5),
    gap: 4,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Montserrat_600SemiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  expiryDate: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 14.63,
    fontFamily: "Montserrat_600SemiBold",
  },
  cvv: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 14.63,
    fontFamily: "Montserrat_600SemiBold",
  },
});
