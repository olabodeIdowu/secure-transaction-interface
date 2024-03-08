import { useState } from "react";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function VerifyOTPScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [codeOne, setCodeOne] = useState("");
  const [codeTwo, setCodeTwo] = useState("");
  const [codeThree, setCodeThree] = useState("");
  const [codeFour, setCodeFour] = useState("");
  const [codeFive, setCodeFive] = useState("");
  const [codeSix, setCodeSix] = useState("");

  async function handleVerifyOTP() {
    try {
      setIsLoading(true);
      // console.log(email, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/verify-email-OTP`,
        data: {
          emailOtp:
            codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
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

  async function resendEmailVerificationOTP() {
    try {
      // setLoading(true)
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/resend-otp`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setLoading(false)
      if (!response) throw new Error("response not found");
      console.log(response?.message);
    } catch (error) {
      // setLoading(false)
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          navigation.navigate("ForgotPin");
        }}
        style={styles.backText}
      >
        &larr;
      </Text>
      <Text style={styles.headerText}>Enter Code</Text>
      <Text style={styles.secondaryHeaderText}>
        Enter the code that was sent to +234 0000000000
      </Text>

      <View style={styles.numberContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeOne(text)}
          value={codeOne}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeTwo(text)}
          value={codeTwo}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeThree(text)}
          value={codeThree}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeFour(text)}
          value={codeFour}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeFive(text)}
          value={codeFive}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCodeSix(text)}
          value={codeSix}
          maxLength={1}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOTP}
        activeOpacity={0.4}
      >
        {isLoading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator />
          </View>
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <Text style={{ color: "#ffffff", padding: 30, textAlign: "center" }}>
        We send you code to your email john*****@gmail.com. You can check your
        inbox.
      </Text>
      <Text
        style={{
          color: "#ffffff",
          padding: 20,
          textAlign: "center",
        }}
      >
        I didn't received the code?
        <Text onPress={resendEmailVerificationOTP} style={{ color: "#F8B930" }}>
          Send again
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  backText: {
    color: "#ffffff",
    fontSize: 36,
    marginBottom: 80,
    marginTop: 30,
    padding: 20,
  },

  headerText: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    margin: 10,
  },

  secondaryHeaderText: {
    color: "#777",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    margin: 15,
  },

  numberContainer: {
    flex: 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },

  input: {
    width: 48,
    height: 44,
    borderWidth: 0.2,
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 6,
    textAlign: "center",
  },

  button: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#222",
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    color: "#222",
    fontSize: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
