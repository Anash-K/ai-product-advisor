import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useAppStore } from "../store/useAppStore";

const InputBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const fetchRecommendations = useAppStore((s) => s.fetchRecommendations);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Describe what you need..."
        style={styles.input}
      />
      <Button title="Find Products" onPress={() => fetchRecommendations(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default InputBox;
