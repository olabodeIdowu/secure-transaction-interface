import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SettingScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    try {
      setIsLoading(true);
      await axios({
        method: "post",
        url: `${process.env.DEV_API_URL}/users/logout`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Setting Screen</Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "grey",
            borderTopWidth: 0.2,
            padding: 15,
            backgroundColor: "#0a100d",
          }}
          onPress={() => navigation.navigate("UpdatePin")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons name="zodiac-leo" size={20} color="#888" />
            <Text style={styles.basicsInnerText}>Update pin</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#888"
            />
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "grey",
            borderTopWidth: 0.2,
            padding: 15,
            backgroundColor: "#0a100d",
          }}
          onPress={handleLogout}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {isLoading ? (
              <View style={styles.horizontal}>
                <ActivityIndicator />
              </View>
            ) : (
              <MaterialCommunityIcons name="logout" size={20} color="#888" />
            )}
            <Text style={styles.basicsInnerText}>Logout</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#888"
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  basicsInnerText: {
    fontSize: 18,
    color: "#ffffff",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
