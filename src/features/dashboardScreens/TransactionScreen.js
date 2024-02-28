import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../context/AuthProvider";
import { formatCur } from "../../utils/helpers";
import axios from "axios";

export default function TransactionScreen({ navigation }) {
  const { auth } = useContext(AuthContext);
  const { user } = auth;
  const { id: userId, transfer } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [filterWith, setFilterWith] = useState("date");

  // console.log(user, userId, transfer);
  async function cancelTransaction(transferId) {
    try {
      setIsLoading(true);
      // console.log(transferId, process.env.DEV_API_URL);
      const response = await axios({
        method: "patch",
        url: `${process.env.DEV_API_URL}/users/${userId}/transfers/${transferId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response) throw new Error("response not found");

      navigation.navigate("Home");
    } catch (error) {
      // setLoading(false)
      console.log(error);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.primaryText}>Frequent transfers</Text>
      </View>
      {transfer &&
        transfer.map((t, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: "grey",
                borderTopWidth: 0.2,
                padding: 20,
                backgroundColor: "#0a100d",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderColor: "grey",
                }}
              >
                {t?.amount > 0 ? (
                  <MaterialCommunityIcons
                    name="arrow-up"
                    size={20}
                    color="green"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up"
                    size={20}
                    color="red"
                  />
                )}

                <View style={{ paddingTop: 5 }}>
                  <Text style={{ color: "#ffffff", fontSize: 16 }}>
                    {t?.amount > 0 ? "Transfer" : "Withdrawal"}
                  </Text>
                  <Text style={{ color: "#999", fontSize: 14, marginTop: 4 }}>
                    {new Date(t?.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: t?.amount > 0 ? "green" : "red",
                  fontSize: 18,
                }}
              >
                {formatCur(t?.amount, "en-US", "NGN")}
              </Text>

              <Pressable onPress={() => cancelTransaction(t?._id)}>
                <Text
                  style={[styles.active, { color: "#ffffff", fontSize: 16 }]}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  primaryText: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 15,
    padding: 15,
    marginTop: 40,
  },
  active: {
    padding: 6,
    backgroundColor: "#F8B930",
    color: "#222",
    textAlign: "center",
  },
  inactive: {
    padding: 6,
    color: "#222",
    textAlign: "center",
  },
});
