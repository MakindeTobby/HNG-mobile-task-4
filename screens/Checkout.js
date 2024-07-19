import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import HeaderTwo from "../components/HeaderTwo";

const Checkout = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("pickup1"); // Default selected pickup option
  const [delivery, setDelivery] = useState("");
  const [contact, setContact] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "pickup1") {
      setDelivery("Old Secretariat Complex, Area 1, Garki, Abaji Abji");
    } else if (option === "pickup2") {
      setDelivery("Sokoto Street, Area 1, Garki, Area 1 AMAC");
    }
  };

  const handleProceedToPayment = () => {
    if (!delivery || !contact || !contact1 || !contact2) {
      Alert.alert("Error", "Please fill all the fields before proceeding.");
      return;
    }
    navigation.navigate("Payment", {
      delivery,
      contact,
      contact1,
      contact2,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <HeaderTwo name={"Checkout"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subtitle}>
          Select how to receive your package(s)
        </Text>

        <Text style={styles.sectionTitle}>Pickup</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioCircle}
            onPress={() => handleOptionChange("pickup1")}
          >
            {selectedOption === "pickup1" && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>
            Old Secretariat Complex, Area 1, Garki, Abaji Abji
          </Text>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioCircle}
            onPress={() => handleOptionChange("pickup2")}
          >
            {selectedOption === "pickup2" && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>
            Sokoto Street, Area 1, Garki, Area 1 AMAC
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Delivery</Text>
        <TextInput
          style={styles.input}
          placeholder="Delivery Address"
          value={delivery}
          onChangeText={setDelivery}
        />

        <Text style={styles.sectionTitle}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          keyboardType="default"
          value={contact}
          onChangeText={setContact}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={contact1}
          onChangeText={setContact1}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          keyboardType="phone-pad"
          value={contact2}
          onChangeText={setContact2}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleProceedToPayment}
        >
          <Text style={styles.buttonText}>Go to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: theme.colors.neutral(0.5),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Add some padding at the bottom
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    fontFamily: "Montserrat_600SemiBold",
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Montserrat_600SemiBold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioText: {
    fontSize: 12,
    color: theme.colors.neutral(0.7),
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: theme.colors.dark,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
    fontFamily: "Montserrat_400Regular",
  },
});
