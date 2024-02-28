import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Drawer({ navigation, openDrawer, setOpenDrawer }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDrawer}
      onRequestClose={() => setOpenDrawer(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerFlexText}>
            <TouchableOpacity onPress={() => setOpenDrawer(false)}>
              <MaterialCommunityIcons name="close" size={32} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpenDrawer(false)}
              style={styles.closeModal}
            >
              <Text style={styles.closeModalText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: "20%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: "#0a100d",
  },
  modalView: {
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headerFlexText: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#ffffff",
    padding: 10,
  },

  primaryText: {
    fontSize: 14,
    color: "grey",
    padding: 10,
  },

  previewText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },

  closeModalText: {
    fontSize: 20,
    color: "#59656f",
    fontWeight: "bold",
  },
  basicsInnerText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
