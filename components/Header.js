import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = ({ name, isWish }) => {
  const wishlistItems = useSelector((state) => state.wishlist.wishArr);
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.section}>
        <Image
          style={styles.imageUrl}
          source={require("../assets/Malltiverse-Logo.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.section2}>
        {isWish && (
          <TouchableOpacity
            style={{ alignItems: "flex-end", flex: 1 }}
            onPress={() => navigation.navigate("Wishlist")}
          >
            {wishlistItems?.length > 0 && (
              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 8,
                  borderRadius: 99,
                }}
              >
                <AntDesign
                  name={"heart"}
                  size={25}
                  color={theme.colors.primary}
                />

                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{wishlistItems?.length}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{ alignItems: "flex-end", flex: 1 }}
          onPress={() => navigation.navigate("History")}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 8,
              borderRadius: 99,
            }}
          >
            <AntDesign name={"profile"} size={25} color={theme.colors.dark} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  section: {
    flex: 1,
    alignItems: "flex-start",
  },
  section2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageUrl: {
    width: 100,
    // height: 50,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  badgeContainer: {
    position: "absolute",
    left: -6,
    top: -3,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
