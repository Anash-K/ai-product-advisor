import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors } from "../constants/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

const PlaceholderCard = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <LinearGradient
      colors={[Colors.white, Colors.secondary]}
      style={styles.gradientCard}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Icon name="auto-awesome" size={70} color={Colors.primary} />
      </Animated.View>
      <Text style={styles.placeholderText}>
        Describe what you're looking for
      </Text>
      <Text style={styles.placeholderSubText}>
        Our AI will find the perfect products for you
      </Text>
    </LinearGradient>
  );
};

export default PlaceholderCard;

const styles = StyleSheet.create({
  gradientCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 24,
    marginTop: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  placeholderSubText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
