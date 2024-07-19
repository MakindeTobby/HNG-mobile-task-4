import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { hp, wp } from "../helpers/common";
import WishlistCard from "../components/WishListCard";
import { theme } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Wishlist = () => {
  const navigation = useNavigation();
  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Item in Wishlist</Text>
    </View>
  );
  const wishlistItems = useSelector((state) => state.wishlist.wishArr);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.header}>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <FontAwesome name="arrow-left" size={15} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{"My Wishlist"}</Text>
        </View>
        <View style={styles.section}></View>
      </View>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistCard item={item} />}
        ListEmptyComponent={renderEmptyCart}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    color: "#4B5563",
    fontFamily: "Montserrat_400Regular",
  },
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
