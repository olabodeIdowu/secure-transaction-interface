import { useState } from "react";
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
import { formatCur } from "../utils/helpers";

export default function HistoriesScreen({ route, navigation }) {
  /* 1. Get the param */
  const { movements, history } = route.params;
  // console.log(movements, history);

  const [filterWith, setFilterWith] = useState("date");
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.nav}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
          <Text style={styles.skipText}>Transaction History</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.primaryText}>Last 20 transactions Only</Text>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 20,
            padding: 10,
          }}
        >
          <Pressable onPress={() => setFilterWith("date")}>
            <Text
              style={[
                filterWith === "date" ? styles.active : styles.inactive,
                { color: "#ffffff", fontSize: 16 },
              ]}
            >
              Date
            </Text>
          </Pressable>
          <Pressable onPress={() => setFilterWith("amount")}>
            <Text
              style={[
                filterWith === "amount" ? styles.active : styles.inactive,
                { color: "#ffffff", fontSize: 16 },
              ]}
            >
              Amount
            </Text>
          </Pressable>
          <Pressable onPress={() => setFilterWith("type")}>
            <Text
              style={[
                filterWith === "type" ? styles.active : styles.inactive,
                { color: "#ffffff", fontSize: 16 },
              ]}
            >
              Transaction Type
            </Text>
          </Pressable>
        </View>
      </View>
      {history &&
        history.map((h, i) => {
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
                {h?.amount > 0 ? (
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
                    {h?.amount > 0 ? "Deposit" : "Withdrawal"}
                  </Text>
                  <Text style={{ color: "#999", fontSize: 14, marginTop: 4 }}>
                    {new Date(h?.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: h?.amount > 0 ? "green" : "red",
                  fontSize: 18,
                }}
              >
                {formatCur(h?.amount, "en-US", "NGN")}
              </Text>
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

  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    marginTop: 50,
    marginLeft: 15,
  },

  backText: {
    fontSize: 36,
    color: "#ffffff",
  },

  skipText: {
    fontSize: 16,
    color: "#ffffff",
  },

  primaryText: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
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
