import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

const HeaderTwo = ({ name }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{ flex: 0.4 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <FontAwesome name="arrow-left" size={15} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default HeaderTwo;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // gap: 10,
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  section: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 19,
    fontFamily: "Montserrat_600SemiBold",
  },
  backBtn: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
