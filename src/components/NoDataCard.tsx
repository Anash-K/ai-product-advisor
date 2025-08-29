import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors } from "../constants/Color";
import Icon from "react-native-vector-icons/MaterialIcons";

const NoDataCard = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.emptyContainer, { transform: [{ translateX: shakeAnim }] }]}>
      <Icon name="search-off" size={60} color={Colors.primary} />
      <Text style={styles.emptyText}>No products found</Text>
      <Text style={styles.emptySubText}>Try a different search term</Text>
    </Animated.View>
  );
};

export default NoDataCard;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
