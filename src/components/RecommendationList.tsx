import React from "react";
import { FlatList, Text } from "react-native";
import ProductCard from "./ProductCard";
import { useAppStore } from "../store/useAppStore";
import { Recommendation } from "../api/aiClient";

const RecommendationList: React.FC = () => {
  const { recommendations, loading, error } = useAppStore();

  if (loading) return <Text style={{ textAlign: "center" }}>⏳ Fetching recommendations...</Text>;
  if (error) return <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>;

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }: { item: Recommendation }) => <ProductCard product={item} />}
    />
  );
};

export default RecommendationList;
