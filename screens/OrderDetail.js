import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { wp } from "../helpers/common";
import HeaderTwo from "../components/HeaderTwo";
import { theme } from "../constants/theme";
import HistoryDetailCard from "../components/HistoryDetailCard";

const OrderDetail = () => {
  const route = useRoute();
  const { order } = route.params;
  const renderHeader = () => {
    return (
      <View style={styles.detailsContainerCopy}>
        <View style={styles.textCont}>
          <Text style={styles.title}>Order ID: {order?.id}</Text>
          <Text style={styles.itemTitle}>
            {new Date(order.orderData.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.title}>Ref: {order?.orderData?.ref_code}</Text>
          <Text style={[styles.itemTitle, { color: "green" }]}>Delivered</Text>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.title}>
            {order.orderData?.items.length} items
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>Address: {order.orderData.address}</Text>
      {order.orderData.phone && (
        <Text style={styles.title}>Phone No: {order.orderData.phone}</Text>
      )}

      <View style={styles.dashedLineContainer}>
        {Array.from({ length: 35 }).map((_, index) => (
          <View key={index} style={styles.dash} />
        ))}
      </View>
      <Text style={styles.itemTitle}>
        Discount: ₦ {order.orderData.discountFee.toLocaleString()}
      </Text>
      <Text style={styles.itemTitle}>
        Delivery Fee: - ₦ {order.orderData.deliveryFee.toLocaleString()}
      </Text>
      <View style={styles.dashedLineContainer}>
        {Array.from({ length: 35 }).map((_, index) => (
          <View key={index} style={styles.dash} />
        ))}
      </View>
      <Text style={styles.title}>
        Total Amount: ₦ {order.orderData.total.toLocaleString()}
      </Text>

      {/* <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Sub-Total</Text>
        <Text style={styles.itemTitle}>
          N {totalCartPrice.toLocaleString()}
        </Text>
      </View> */}
      {/* <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Delivery Fee</Text>
        <Text style={styles.itemTitle}>N {deliveryFee.toLocaleString()}</Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Discount Amount</Text>
        <Text style={styles.itemTitle}>N {discountFee.toLocaleString()}</Text>
      </View> */}

      {/* <View style={styles.textCont}>
        <Text style={styles.itemTitle}>Total Amount</Text>
        <Text style={styles.itemTitle}>
          N{" "}
          {Number(totalCartPrice + deliveryFee - discountFee).toLocaleString()}
        </Text>
      </View> */}
      {/* <Pressable style={styles.startButton}>
        <Text style={styles.startText}>Checkout</Text>
      </Pressable> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <HeaderTwo name={`Order ID: ${order?.id}`} />

      <FlatList
        data={order.orderData?.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryDetailCard item={item} />}
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 5,
    paddingBottom: 100, // Add some padding at the bottom
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#EDEDED",
    paddingVertical: 14,
    marginBottom: 50,
    marginHorizontal: wp(2),
    borderRadius: 3,
    gap: 20,
  },
  detailsContainerCopy: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    marginHorizontal: wp(2),
    borderRadius: 3,
    gap: 10,
  },
  dashedLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dash: {
    width: 4,
    height: 1,
    backgroundColor: theme.colors.neutral(0.9),
  },

  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
  },
});
