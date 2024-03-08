import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bank, setBank] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  async function handleSignup() {
    try {
      // console.log(bank, process.env.DEV_API_URL);
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/signup`,
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          bank: bank,
          pin: pin,
          confirmPin: confirmPin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");

      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#0a100d" }}
      >
        <View>
          <Image
            source={require("./../../../assets/welcome-img-1.png")}
            style={styles.registerImage}
          />

          <Text style={styles.primaryText}>Lets Get Started</Text>
          <Text style={styles.secondaryText}>
            Create an account to get all the features
          </Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder="enter first name"
              name="firstName"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
            <TextInput
              style={styles.input}
              placeholder="enter last name"
              name="lastName"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
            <TextInput
              style={styles.input}
              placeholder="enter your email"
              name="email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <RNPickerSelect
              placeholder={{
                label: "Select Bank Name",
                value: null,
                color: "#ffffff",
              }}
              onValueChange={(bank) => setBank(bank)}
              items={[
                { label: "FBN", value: "FBN" },
                { label: "GTB", value: "GTB" },
                { label: "OPAY", value: "OPAY" },
                { label: "UNION", value: "UNION" },
                { label: "ZENITH", value: "ZENITH" },
                { label: "WEMA", value: "WEMA" },
                { label: "UBA", value: "UBA" },
              ]}
              style={pickerSelectStyles}
            />

            <TextInput
              style={styles.input}
              placeholder="enter your phone"
              name="phone"
              onChangeText={(text) => setPhone(text)}
              value={phone}
            />
            <TextInput
              style={styles.input}
              name="pin"
              onChangeText={(text) => setPin(text)}
              value={pin}
              placeholder="pin"
            />
            <TextInput
              style={styles.input}
              name="confirmPin"
              onChangeText={(text) => setConfirmPin(text)}
              value={confirmPin}
              placeholder="confirm pin"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            activeOpacity={0.4}
          >
            {isLoading ? (
              <View style={styles.horizontal}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              marginTop: 25,
              marginBottom: 45,
              textAlign: "center",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Already have an account..?
            <Text style={{ color: "#F8B930", marginLeft: 15 }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  registerImage: {
    marginTop: 100,
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  primaryText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#ffffff",
  },

  secondaryText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: "right",
    color: "#ffffff",
  },

  welcomeText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#ffffff",
  },

  input: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    padding: 12,
  },

  button: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    margin: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    color: "#222",
    // to ensure the text is never behind the icon
  },

  inputAndroid: {
    margin: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "#222",
    // to ensure the text is never behind the icon
  },
});
