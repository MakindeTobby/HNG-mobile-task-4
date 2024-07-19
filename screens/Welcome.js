import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  StatusBar,
} from "react-native";
import React from "react";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Welcomescreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <ImageBackground
        source={require("../assets/images/model.jpeg")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Semi-transparent overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Timbu </Text>
          <Text style={styles.punchline}>Discover your unique style</Text>
          <Pressable
            style={styles.startButton}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.startText}>Explore</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.neutral(0.6), // Adjust the color and opacity as needed
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
    paddingBottom: 50,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.grayBg,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    padding: 9,
    paddingHorizontal: 90,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2.5),
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
  },
});

export default Welcomescreen;
