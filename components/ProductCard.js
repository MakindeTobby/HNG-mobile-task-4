import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/Slices/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/Slices/WishlistSlice";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ProductCard = ({ item, setToastMessage, setToastVisible }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const wishlistItems = useSelector((state) => state.wishlist.wishArr);
  const productInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  const productInWishlist = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === item.id
  );
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
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleWishlistToggle = () => {
    if (productInWishlist) {
      setToastMessage("Product removed from wishlist");
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
      setToastMessage("Product added to wishlist");
    }
    setToastVisible(true);
  };

  const navigation = useNavigation();
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";
  const totalStars = 4; // Number of stars you want to display

  // Array to generate stars
  const starsArray = Array.from({ length: totalStars }, (_, index) => index);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Details", { ...item })}
    >
      <View style={styles.product}>
        <View style={styles.imgCont}>
          <Image
            resizeMode="cover"
            style={styles.imageUrl}
            source={{
              uri: `https://api.timbu.cloud/images/${item?.photos[1]?.url}`,
            }}
          />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={handleWishlistToggle}
          >
            <AntDesign
              name={productInWishlist ? "heart" : "hearto"}
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text
            style={styles.productName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
        <View style={{ paddingVertical: 4, flexDirection: "row", gap: 2 }}>
          {starsArray.map((star, index) => (
            <AntDesign key={index} name="star" size={13} color="#FFC657" />
          ))}
          <AntDesign name="staro" size={13} color="#FFC657" />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: theme.colors.primary,
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            N {price}
          </Text>
        </View>
        {quantity <= 0 ? (
          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleIncrease}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              style={[styles.sizeButton, { backgroundColor: "#ddd" }]}
              onPress={handleDecrease}
            >
              <FontAwesome
                name="minus"
                size={13}
                color={theme.colors.primary}
              />
            </Pressable>
            <Text style={styles.sizeText}>{quantity}</Text>
            <Pressable
              style={[styles.sizeButton, { backgroundColor: "#ddd" }]}
              onPress={handleIncrease}
            >
              <FontAwesome name="plus" size={13} color={theme.colors.primary} />
            </Pressable>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  header: {
    paddingVertical: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 12,
    color: theme.colors.neutral(0.8),
    fontFamily: "Montserrat_600SemiBold",
  },
  imgCont: {
    backgroundColor: theme.colors.neutral(0.1),
    width: "100%",
    height: hp(25),
    borderRadius: theme.radius.xs,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    overflow: "hidden",
  },
  wishlistIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 5,
  },
  product: {
    flex: 1,
    marginBottom: wp(1),
    color: "#fff",
    gap: 2,
  },
  imageUrl: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonStyle: {
    width: 93,
    height: 38,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.dark,
    fontSize: 12,
    fontFamily: "Montserrat_600SemiBold",
  },
  sizeButton: {
    width: 25,
    height: 25,
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  sizeText: {
    color: theme.colors.dark,
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
});
