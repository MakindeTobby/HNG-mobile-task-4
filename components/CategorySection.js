// components/CategorySection.js

import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import CategoryHeader from "./CategoryHeader";
import { theme } from "../constants/theme";
import { wp } from "../helpers/common";

const { width } = Dimensions.get("window");

const CategorySection = ({
  categoryName,
  products,
  setToastMessage,
  setToastVisible,
}) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <CategoryHeader name={categoryName} />
      <FlatList
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ gap: 5 }}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductCard
              item={item}
              setToastMessage={setToastMessage}
              setToastVisible={setToastVisible}
            />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {Array.from({ length: Math.ceil(products.length / 2) }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  i === currentIndex ? theme.colors.primary : "transparent",
                opacity: i === currentIndex ? 1 : 0.2,
                borderWidth: i === currentIndex ? 0 : 1.8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  productContainer: {
    width: width / 2, // Show two items at a time
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    // marginHorizontal: wp(2),
    // borderWidth: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});
