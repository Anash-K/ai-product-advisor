import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Color";
import Icon from "react-native-vector-icons/MaterialIcons";

const NoDataCard = () => {
  return (
    <View style={styles.emptyContainer}>
      <Icon name="search-off" size={60} color={Colors.primary} />
      <Text style={styles.emptyText}>No products found</Text>
      <Text style={styles.emptySubText}>Try a different search term</Text>
    </View>
  );
};

export default NoDataCard;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
