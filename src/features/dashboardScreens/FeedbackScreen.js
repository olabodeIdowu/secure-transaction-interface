import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FeedbackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Feedback Screen</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});
