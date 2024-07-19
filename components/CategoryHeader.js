import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const CategoryHeader = ({ name }) => {
  return (
    <View style={[styles.header, { paddingVertical: hp(1) }]}>
      <Text style={{ ...styles.title, fontFamily: "Montserrat_600SemiBold" }}>
        {name}
      </Text>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(2),
  },
  title: {
    fontSize: 20,
    lineHeight: 24.38,
    color: theme.colors.neutral(0.9),
    textTransform: "capitalize",
  },
});
