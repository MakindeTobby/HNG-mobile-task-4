import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { wp } from "../helpers/common";
import { theme } from "../constants/theme";

const Hero = () => {
  return (
    <View
      style={{
        marginHorizontal: wp(2),
        marginVertical: wp(4),
        borderRadius: theme.radius.sm,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={require("../assets/images/Headphones.png")}
        style={styles.heroContainer}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroText}>Premium Sound,</Text>
          <Text style={styles.heroText}>Premium Savings</Text>
          <Text style={styles.subText}>
            Limited offer, hope on and get yours now
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: 232,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: theme.radius.sm,
  },
  overlay: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // optional: add an overlay for better text visibility
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: theme.radius.sm,
    paddingLeft: wp(5),
    gap: 4,
  },
  heroText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Montserrat_600SemiBold",
  },
  subText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 14.63,
  },
});
