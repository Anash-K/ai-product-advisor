import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors } from "../constants/Color";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlaceholderCard = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.card}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Icon name="auto-awesome" size={70} color={Colors.primary} />
      </Animated.View>
      <Text style={styles.placeholderText}>
        Describe what you're looking for
      </Text>
      <Text style={styles.placeholderSubText}>
        Our AI will find the perfect products for you
      </Text>
    </View>
  );
};

export default PlaceholderCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: Colors.backgroundSecondary, // dark gray
    borderWidth: 1,
    borderColor: Colors.border, // subtle border
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary, // white
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  placeholderSubText: {
    fontSize: 15,
    color: Colors.textSecondary, // muted gray
    textAlign: "center",
    lineHeight: 22,
  },
});
