import { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

console.log(process.env.DEV_API_URL);
export default function LandingPage({ navigation }) {
  // const [active, setActive] = useState("onboarding1");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./../../assets/alex-starnes-PK_t0Lrh7MM-unsplash.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.welcomeText}>
          Welcome to the premium banking App. Exclusively for you.
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
          activeOpacity={0.4}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate("Register");
          }}
          activeOpacity={0.4}
        >
          <Text style={styles.buttonText}>Open Account</Text>
        </TouchableOpacity>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
          <View style={styles.progressBar2}></View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
  },

  skipText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 50,
    padding: 20,
    textAlign: "right",
    color: "#000000",
  },

  welcomeText: {
    fontWeight: 700,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
    color: "#222",
    marginTop: 100,
    padding: 20,
  },

  progressBarContainer: {
    flex: 0.01,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 80,
    // marginBottom: 80
  },

  progressBar: {
    width: 50,
    height: 5,
    backgroundColor: "#F8B930",
    borderRadius: "16px",
    border: "1px solid",
  },

  progressBar2: {
    width: 50,
    height: 5,
    backgroundColor: "#e5e5e5",
    borderRadius: "16px",
    border: "1px solid",
  },

  loginButton: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#F8B930",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
    marginTop: 80,
  },

  registerButton: {
    width: "90%",
    alignItems: "center",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});
