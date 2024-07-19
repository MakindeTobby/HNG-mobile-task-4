import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/Slices/CartSlice";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { removeFromWishlist } from "../store/Slices/WishlistSlice";

const WishlistCard = ({ item }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const productInCart = cartItems.find((cartItem) => cartItem.id === item.id);

  const dispatch = useDispatch();
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const quantity = productInCart ? productInCart.quantity : 0;
  const handleAdd = () => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.removeButton}
      >
        <FontAwesome name="trash-o" size={18} />
      </TouchableOpacity>
      <Image
        style={styles.itemImage}
        source={{
          uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
        }}
      />

      <View style={styles.contentBox}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={[styles.counterCont]}>
          <Text
            style={{
              fontSize: hp(1.6),
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            ₦{price}
          </Text>
          <View>
            {quantity <= 0 ? (
              <TouchableOpacity style={styles.buttonStyle} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  { backgroundColor: theme.colors.grayBg },
                ]}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <Text style={styles.buttonText}>Remove from Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistCard;

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
    backgroundColor: "white",
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
    marginLeft: 10,
  },
  itemImage: {
    height: 70,
    width: 58,
  },
  itemTitle: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#4B5563",
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
  },
  sizeButton: {
    width: 25,
    height: 25,
    borderColor: theme.colors.neutral(0.2),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  sizeText: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  buttonStyle: {
    // width: 93,
    paddingHorizontal: 20,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderCurve: "continuous",
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.dark,
    fontSize: 12,
  },
});
