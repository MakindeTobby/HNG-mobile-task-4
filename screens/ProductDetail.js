import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  addToCart,
} from "../store/Slices/CartSlice";

const { width } = Dimensions.get("window");

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductDetail = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  let item = params;
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const cartItems = useSelector((state) => state.cart.cart);
  const productInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = productInCart ? productInCart.quantity : 0;

  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (quantity > 0) {
      dispatch(increaseQuantity(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const onScroll = (event) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ position: "relative" }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {item?.photos.map((photo, index) => (
              <Image
                key={index}
                style={styles.imageDisp}
                source={{ uri: `https://api.timbu.cloud/images/${photo.url}` }}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <FontAwesome name="arrow-left" size={15} color={"#fff"} />
          </TouchableOpacity>
          <View style={styles.dotsContainer}>
            {item?.photos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeIndex ? theme.colors.primary : "#ccc",
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ paddingVertical: 1 }}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <View style={[styles.counterCont]}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: "semibold",
              }}
            >
              ₦{price}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Pressable
                style={[styles.sizeButton, { backgroundColor: "#f0f0f0" }]}
                onPress={handleDecrease}
              >
                <FontAwesome name="minus" size={13} />
              </Pressable>
              <Text style={styles.sizeText}>{quantity}</Text>
              <Pressable
                style={[styles.sizeButton, { backgroundColor: "#f0f0f0" }]}
                onPress={handleIncrease}
              >
                <FontAwesome name="plus" size={13} />
              </Pressable>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.productName}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    {
                      backgroundColor:
                        selectedSize === size
                          ? theme.colors.primary
                          : "#f0f0f0",
                    },
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        color:
                          selectedSize === size ? "#fff" : theme.colors.black,
                      },
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ paddingVertical: 5 }}>
            <Text style={styles.productName}>Description</Text>
          </View>
          <View style={{ paddingVertical: 1 }}>
            <Text>
              {item.description || "No Description Available for this product"}
            </Text>
          </View>
          <View></View>
        </View>
      </ScrollView>
      <View style={styles.tabBar}>
        <View>
          <Text>Total Price</Text>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: hp(2.5) }}>
              ₦{price * quantity}
            </Text>
          </View>
        </View>
        {quantity < 1 ? (
          <View style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>Select Quantity</Text>
          </View>
        ) : (
          <Pressable
            style={styles.startButton}
            onPress={() => {
              dispatch(addToCart(item));
              navigation.navigate("Cart");
            }}
          >
            <Text style={styles.startText}>Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  imageDisp: {
    width: width,
    height: hp(54),
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 12,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  counterCont: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 55,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    // height: hp(46),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    marginTop: -48,
    paddingTop: 30,
  },
  productName: {
    fontSize: hp(2.2),
    // Montserrat_400Regular,

    fontFamily: "Montserrat_600SemiBold",
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
  },
  sizeButton: {
    width: 43,
    height: 43,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  sizeText: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  startButton: {
    marginBottom: hp(3),
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  disabledButton: {
    marginBottom: hp(3),
    backgroundColor: "#ccc",
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  disabledButtonText: {
    color: "#777",
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
  },
});
