// src/components/ProductCard.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Recommendation } from "../api/aiClient";

interface ProductCardProps {
  product: Recommendation;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{product.product_name}</Text>
    <Text style={styles.subtitle}>{product.brand} - ₹{product.price}</Text>
    <Text>{product.category}</Text>
    <Text style={styles.why}>💡 {product.why}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 12, margin: 8, borderRadius: 10, elevation: 3 },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { color: "#666", marginVertical: 4 },
  why: { marginTop: 6, fontStyle: "italic", color: "#333" },
});

export default ProductCard;
