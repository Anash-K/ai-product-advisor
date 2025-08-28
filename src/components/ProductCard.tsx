import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Recommendation } from "../api/aiClient";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
interface ProductCardProps {
  product: Recommendation;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const fadeAnim = new Animated.Value(0);
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
        colors={["#6A11CB", "#2575FC"]}
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
            <Icon name="business" size={16} color="#6A11CB" />
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
          <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
        </View>

        <View style={styles.whyContainer}>
          <Icon name="lightbulb-outline" size={18} color="#FFA500" />
          <Text style={styles.why}>{product.why}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>View Details</Text>
        <Icon name="arrow-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  category: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 12,
  },
  brandPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brand: {
    fontSize: 14,
    color: "#6A11CB",
    fontWeight: "600",
    marginLeft: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A11CB",
  },
  whyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  why: {
    flex: 1,
    fontSize: 14,
    color: "#636E72",
    marginLeft: 8,
    fontStyle: "italic",
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6A11CB",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default ProductCard;
