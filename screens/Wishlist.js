import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { hp, wp } from "../helpers/common";
import WishlistCard from "../components/WishListCard";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

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
      <StatusBar barStyle={"dark-content"} />
      <Header name={"My Wishlist"} />
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
});
