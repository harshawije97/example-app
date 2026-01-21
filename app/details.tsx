import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Details() {
  const queryParams = useLocalSearchParams();
  console.log(queryParams);

  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
