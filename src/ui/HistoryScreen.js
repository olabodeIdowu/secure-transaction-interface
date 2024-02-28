import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatCur } from "../utils/helpers";

export default function HistoryScreen({ route, navigation }) {
  /* 2. Get the param */
  const { transfer } = route.params;
  // console.log(transfer);

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.backText}>&larr;</Text>
        </TouchableOpacity>

        <Text style={styles.skipText}>Transaction History</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            Transaction Date
          </Text>
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            {new Date(transfer?.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>Account Number</Text>
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            {transfer?.fromAccount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>Amount</Text>
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            {formatCur(transfer?.amount, "en-US", "NGN")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 16 }}>Narration</Text>
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            {transfer?.narration}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#ffffff",
            marginTop: 20,
          }}
        >
          Back
        </Text>
      </Pressable>
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
    marginTop: 30,
    marginBottom: 30,
    flex: 0.1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 3.2,
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

  welcomeText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#ffffff",
  },
});
