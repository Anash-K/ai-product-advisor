import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { productCatalog } from "../data/productCatalog";
import { fetchRecommendations, Recommendation } from "../api/aiClient";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["recommendations", submittedQuery],
    queryFn: () => fetchRecommendations(submittedQuery, productCatalog),
    enabled: !!submittedQuery, // only run if query is set
  });

  useEffect(() => {
    refetch();
  }, [submittedQuery]);

  const onSearch = () => {
    if (query.trim()) {
      setSubmittedQuery(query.trim());
    }
  };

  const renderItem = ({ item }: { item: Recommendation }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.product_name}</Text>
      <Text style={styles.subtitle}>
        {item.brand} - ₹{item.price}
      </Text>
      <Text>{item.category}</Text>
      <Text style={styles.why}>💡 {item.why}</Text>
    </View>
  );

  console.log(data, "data", isLoading, isError);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🤖 AI Product Advisor</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe what you need..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Find Products" onPress={onSearch} />
      </View>

      {isLoading && (
        <Text style={styles.infoText}>⏳ Fetching recommendations...</Text>
      )}
      {isError && (
        <Text style={[styles.infoText, { color: "red" }]}>
          Error fetching results.
        </Text>
      )}

      {data && (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  searchContainer: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 4,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { color: "#666", marginVertical: 4 },
  why: { fontStyle: "italic", color: "#333", marginTop: 6 },
  infoText: { textAlign: "center", marginVertical: 10 },
});
