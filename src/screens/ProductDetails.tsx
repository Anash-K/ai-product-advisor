import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Color";
import { ScreenProps } from "../navigation/navigation.type";
import AnimatedButton from "../components/AnimatedButton";

export const ProductDetailScreen: React.FC<ScreenProps<"Details">> = ({
  route,
  navigation,
}) => {
  const { product } = route.params;

  return (
    <LinearGradient
      colors={[Colors.background, Colors.background]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{product.product_name}</Text>

          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              ₹{product.price.toLocaleString()}
            </Text>
          </View>

          {/* Brand */}
          <View style={styles.brandContainer}>
            <Icon name="business" size={16} color={Colors.textSecondary} />
            <Text style={styles.brand}>{product.brand}</Text>
          </View>

          {/* Why This Product */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="lightbulb-outline" size={20} color="#FACC15" />
              <Text style={styles.sectionTitle}>Why This Product</Text>
            </View>
            <Text style={styles.sectionContent}>{product.why}</Text>
          </View>

          {/* Description */}
          {product.description && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon
                  name="description"
                  size={20}
                  color={Colors.textSecondary}
                />
                <Text style={styles.sectionTitle}>Description</Text>
              </View>
              <Text style={styles.sectionContent}>{product.description}</Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionContainer}>
            <AnimatedButton
              title="Wishlist"
              icon="favorite-border"
              buttonStyle={styles.wishlistButton}
              textStyle={styles.wishlistText}
              iconColor={Colors.primary}
              onPress={() => {}}
            />
            <AnimatedButton
              title="Buy Now"
              icon="arrow-forward"
              buttonStyle={styles.buyButton}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },

  card: {
    backgroundColor: "#121212", // dark base
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 12,
  },

  priceBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  priceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  brand: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "600",
    marginLeft: 6,
  },

  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: "#D1D5DB",
    lineHeight: 20,
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    columnGap: 10,
  },
  wishlistButton: {
    flexDirection: "row-reverse",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  wishlistText: {
    color: Colors.primary,
    marginLeft: 8,
  },
  buyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
});
