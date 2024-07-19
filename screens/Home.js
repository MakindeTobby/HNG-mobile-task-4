import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { apiCall } from "../api";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import { hp, wp } from "../helpers/common";
import Loader from "../components/Loader";
import { theme } from "../constants/theme";
import Toast from "../components/Toast";

const Home = () => {
  const isWish = true;
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const groupProductsByCategories = (products) => {
    const categories = {};

    products.forEach((product) => {
      product.categories.forEach((category) => {
        if (!categories[category.name]) {
          categories[category.name] = [];
        }
        categories[category.name].push(product);
      });
    });

    return categories;
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  };

  const fetchProducts = async () => {
    let res = await apiCall();
    if (res?.data) {
      const groupedProducts = groupProductsByCategories(res?.data?.items);
      setCategories(groupedProducts);
      setIsLoading(false);
    }
  };

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} name={"Loading Products"} />
      <StatusBar barStyle={"default"} />
      <Header name={"Product List"} isWish={isWish} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }} // Add padding to the bottom
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressBackgroundColor={"#fff"}
            colors={[theme.colors.primary]}
          />
        }
      >
        <Hero />
        {Object.keys(categories).map((categoryName) => (
          <CategorySection
            key={categoryName}
            categoryName={categoryName}
            products={categories[categoryName]}
            setToastMessage={setToastMessage}
            setToastVisible={setToastVisible}
          />
        ))}
      </ScrollView>
      <Toast visible={toastVisible} message={toastMessage} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});
