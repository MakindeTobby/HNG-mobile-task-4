import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HistoryCard = ({ item, deleteOrder }) => {
  const navigation = useNavigation();
  const handleDelete = () => {
    Alert.alert(
      "Attention!",
      "Are you sure you want to delete this order ?",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        { text: "Yes", onPress: () => deleteOrder(item.id) },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleDelete} style={styles.removeButton}>
        <FontAwesome name="trash-o" size={18} />
      </TouchableOpacity>

      <View style={styles.contentBox}>
        <View style={[styles.counterCont]}>
          <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
            Order ID: {item.id}
          </Text>
          <Text
            style={{
              fontSize: hp(1.6),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            <Text style={{ color: theme.colors.neutral(0.5), fontSize: 12 }}>
              Date:
            </Text>{" "}
            {new Date(item.orderData.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={[styles.counterCont]}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            <Text style={{ color: theme.colors.neutral(0.5), fontSize: 14 }}>
              Reference:
            </Text>{" "}
            {item?.orderData?.ref_code}
          </Text>
        </View>
        <View style={[styles.counterCont]}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            <Text style={{ color: theme.colors.neutral(0.5), fontSize: 14 }}>
              Quantity:
            </Text>{" "}
            {item.orderData?.items?.length}
          </Text>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            <Text style={{ color: theme.colors.neutral(0.5), fontSize: 14 }}>
              Total Amount:
            </Text>{" "}
            ₦ {item.orderData.total.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.counterCont]}>
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate("HistoryDetails", { order: item })
              }
            >
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "green", fontSize: 15 }}>Completed</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryCard;

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
    backgroundColor: "#fff",
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
    marginHorizontal: 5,
    // marginLeft: 10,
  },
  itemImage: {
    height: 70,
    width: 58,
  },
  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
    fontSize: 18,
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
    marginVertical: 4,
  },

  buttonStyle: {
    width: 93,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderCurve: "continuous",
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.dark,
    fontSize: 12,
  },
});
