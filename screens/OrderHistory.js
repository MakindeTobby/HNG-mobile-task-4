import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../helpers/common";
import HeaderTwo from "../components/HeaderTwo";
import { useSQLiteContext } from "expo-sqlite";
import HistoryCard from "../components/HistoryCard";
import { theme } from "../constants/theme";

const OrderHistoryScreen = () => {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const allRows = await db.getAllAsync(
        "SELECT * FROM orders ORDER BY id DESC"
      );
      const formattedData = allRows.map((row) => ({
        id: row.id,
        orderData: JSON.parse(row.orderData),
      }));
      setOrders(formattedData);
    } catch (error) {
      console.log("Error while getting orders: ", error);
    }
  };

  //function to delete a student
  const deleteOrder = async (id) => {
    try {
      await db.runAsync("DELETE FROM orders WHERE id = ?", [id]);
      await getOrders();
    } catch (error) {
      console.log("Error while deleting the order : ", error);
    }
  };

  //function to delete all students
  const deleteAllOrders = async () => {
    try {
      await db.runAsync("DELETE FROM orders");
      await getOrders();
    } catch (error) {
      console.log("Error while deleting all orders : ", error);
    }
  };

  //function to confirm deleting all orders
  const confirmDeleteAll = () => {
    Alert.alert(
      "Attention!",
      "Are you sure you want to delete all Orders ?",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        { text: "Yes", onPress: deleteAllOrders },
      ],
      { cancelable: true }
    );
  };
  const renderEmptyHistory = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Item in History</Text>
    </View>
  );
  const renderFooter = () => (
    <View>
      <Pressable style={styles.startButton} onPress={confirmDeleteAll}>
        <Text style={styles.startText}>Clear All</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <HeaderTwo name={"Order History"} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard item={item} deleteOrder={deleteOrder} />
        )}
        ListEmptyComponent={renderEmptyHistory}
        ListFooterComponent={orders.length > 0 ? renderFooter : null}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }}
      />
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Add some padding at the bottom
  },
  orderContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  startButton: {
    marginBottom: 5,
    marginHorizontal: 50,
    borderColor: theme.colors.dark,
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
  },
  startText: {
    color: theme.colors.dark,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
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
