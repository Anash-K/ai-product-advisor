import React, { useRef, useEffect, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Recommendation } from "../types";
import { Colors } from "../constants/Color";

interface ProductCardProps {
  product: Recommendation;
  index: number;
  onShowDetails: (product: Recommendation) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onShowDetails,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, index]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={[Colors.primary, "#2575FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardHeader}
      >
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
      </LinearGradient>

      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.product_name}</Text>
        <View style={styles.brandPriceContainer}>
          <View style={styles.brandContainer}>
            <Icon name="business" size={16} color={Colors.primary} />
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
          <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
        </View>

        <View style={styles.whyContainer}>
          <Icon name="lightbulb-outline" size={18} color="#FFA500" />
          <Text style={styles.why}>{product.why}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onShowDetails(product)}
      >
        <Text style={styles.actionButtonText}>View Details</Text>
        <Icon name="arrow-forward" size={16} color={Colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: { paddingVertical: 8, paddingHorizontal: 16 },
  category: { color: Colors.white, fontSize: 12, fontWeight: "600" },
  cardContent: { padding: 16 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  brandPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  brandContainer: { flexDirection: "row", alignItems: "center" },
  brand: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
  price: { fontSize: 18, fontWeight: "bold", color: Colors.primary },
  whyContainer: { flexDirection: "row", alignItems: "flex-start" },
  why: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontStyle: "italic",
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default memo(ProductCard);
