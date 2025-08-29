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
      colors={[Colors.background, Colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

        <View style={styles.card}>
          <Text style={styles.title}>{product.product_name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              ₹{product.price.toLocaleString()}
            </Text>
          </View>

          <View style={styles.brandContainer}>
            <Icon name="business" size={16} color={Colors.primary} />
            <Text style={styles.brand}>{product.brand}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="lightbulb-outline" size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Why This Product</Text>
            </View>
            <Text style={styles.sectionContent}>{product.why}</Text>
          </View>

          {product.description && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="description" size={20} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Description</Text>
              </View>
              <Text style={styles.sectionContent}>{product.description}</Text>
            </View>
          )}

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
  rupeeIcon: {
    marginTop: 2,
  },
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
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.textPrimary,
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
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  brand: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: Colors.textSecondary,
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
    backgroundColor: Colors.background,
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
  buyButtonText: {
    marginRight: 8,
  },
});
