import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const HistoryDetailCard = ({ item }) => {
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";

  return (
    <View style={styles.itemContainer}>
      <View style={styles.removeButton}>
        <Text>Quantity: {item.quantity}</Text>
      </View>
      <Image
        style={styles.itemImage}
        source={{
          uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
        }}
      />

      <View style={styles.contentBox}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={[styles.counterCont]}>
          <Text
            style={{
              fontSize: hp(1.6),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            ₦{price.toLocaleString()} x {item.quantity}= ₦
            {(price * item.quantity).toLocaleString()}
          </Text>
          <View></View>
        </View>
      </View>
    </View>
  );
};

export default HistoryDetailCard;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: wp(2),
    marginVertical: wp(2),
    marginBottom: 12,
    position: "relative",
  },
  contentBox: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    height: 70,
    width: 58,
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
    marginVertical: hp(2),
  },

  removeButton: {
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderTopEndRadius: theme.radius.sm,
    // backgroundColor: theme.colors.primary,
    zIndex: 99,
    top: 5,
    right: 0,
  },
  removeButtonText: {
    color: "white",
  },

  counterCont: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButton: {
    width: 25,
    height: 25,
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  sizeText: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  buttonStyle: {
    width: 93,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderCurve: "continuous",
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.dark,
    fontSize: 12,
  },
});
