import { useContext, useState } from "react";
import axios from "axios";
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
import { AuthContext } from "../../context/AuthProvider";

export default function LoginScreen({ navigation }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  async function handleLogin() {
    try {
      setIsLoading(true);
      // console.log(email, pin, process.env.DEV_API_URL);
      const response = await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/login`,
        data: {
          email: email,
          pin: pin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!response) throw new Error("response not found");
      // console.log(response?.data);

      setAuth({
        userToken: response?.data?.userToken,
        refreshToken: response?.data?.refreshToken,
        user: response?.data?.data?.user,
      });

      navigation.navigate("Dashboard");
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: "#0a100d" }}>
        <View>
          <Image
            source={require("./../../../assets/welcome-img-2.png")}
            style={styles.welcomeImage}
          />

          <Text style={styles.primaryText}>Welcome back!</Text>
          <Text style={styles.secondaryText}>
            Lets login for explore continues
          </Text>

          <View>
            <TextInput
              name="email"
              style={styles.input}
              placeholder="enter your email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <TextInput
              name="pin"
              style={styles.input}
              onChangeText={(text) => setPin(text)}
              value={pin}
              placeholder="pin"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPin")}>
            <Text
              style={{
                color: "#ffffff",
                textAlign: "right",
                paddingRight: 10,
              }}
            >
              Forgot pin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.4}
          >
            {isLoading ? (
              <View style={styles.horizontal}>
                <ActivityIndicator />
              </View>
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 25,
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Don't have an account?
          <Text
            style={{ color: "#F8B930" }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Register here
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyCotent: "center",
    backgroundColor: "#000000",
  },

  welcomeImage: {
    marginTop: 100,
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  skipText: {
    fontSize: 16,
    margin: 20,
    textAlign: "right",
    color: "#ffffff",
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
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
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
