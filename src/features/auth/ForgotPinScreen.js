import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { DEV_API_URL } from "@env";
import axios from "axios";

export default function ForgotPinScreen({ navigation }) {
  const [email, setEmail] = useState("");

  async function handleForgotPin() {
    try {
      // setLoading(true)
      console.log(email, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/forgot-pin`,
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setLoading(false)
      if (!response) throw new Error("response not found");
      navigation.navigate("ResetPin");
    } catch (error) {
      // setLoading(false)
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.skipText}>Forgot pin</Text>
      </View>

      <View>
        <Text style={styles.createText}>Create new OTP</Text>
        <Text style={styles.welcomeText}>
          Don't worry, Enter your email and we'll send you a verification code
          to reset your pin
        </Text>
        <View>
          <TextInput
            name="email"
            style={styles.input}
            placeholder="enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleForgotPin}
          activeOpacity={0.4}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  welcomeImage: {
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  nav: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "left",
    gap: 80,
    flexDirection: "row",
    padding: 3.2,
    marginTop: 30,
    padding: 20,
  },

  backText: {
    fontSize: 36,
    color: "#ffffff",
  },

  skipText: {
    fontSize: 16,
    margin: 10,
    textAlign: "right",
    color: "#ffffff",
  },

  createText: {
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 22,
    color: "#ffffff",
  },

  welcomeText: {
    padding: 25,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "#ffffff",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    fontSize: 16,
    padding: 10,
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
});
