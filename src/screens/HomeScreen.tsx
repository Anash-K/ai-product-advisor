import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import {  productCatalog } from "../data/productCatalog";
import { fetchRecommendations } from "../api/aiClient";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SkeletonLoader } from "../components/SkeletomLoader";
import ProductCard from "../components/ProductCard";
import { Recommendation } from "../types";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const fadeAnim = new Animated.Value(0);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["recommendations", submittedQuery],
    queryFn: () => fetchRecommendations(submittedQuery, productCatalog),
    enabled: !!submittedQuery,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [data]);

  const onSearch = () => {
    if (query.trim()) {
      setSubmittedQuery(query.trim());
    }
  };

  return (
    <LinearGradient colors={["#f5f7fa", "#c3cfe2"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>🤖 AI Product Advisor</Text>
          <Text style={styles.subHeader}>Find the perfect product with AI</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Icon
              name="search"
              size={24}
              color="#6A11CB"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Describe what you need..."
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={onSearch}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Icon name="close" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.searchButton,
              !query.trim() && styles.searchButtonDisabled,
            ]}
            onPress={onSearch}
            disabled={!query.trim()}
          >
            <Text style={styles.searchButtonText}>Find Products</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {isLoading && <SkeletonLoader />}

        {isError && (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={50} color="#ff4757" />
            <Text style={styles.errorText}>Oops! Something went wrong.</Text>
            <Text style={styles.errorSubText}>
              Please check your connection and try again.
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => refetch()}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }: { item: Recommendation; index: number }) => (
              <ProductCard product={item} index={index} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : submittedQuery && !isLoading && !isError ? (
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#6A11CB" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubText}>Try a different search term</Text>
          </View>
        ) : !submittedQuery ? (
          <View style={styles.placeholderContainer}>
            <Icon name="auto-awesome" size={60} color="#6A11CB" />
            <Text style={styles.placeholderText}>
              Describe what you're looking for
            </Text>
            <Text style={styles.placeholderSubText}>
              Our AI will find the perfect products for you
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#636E72",
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2D3436",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6A11CB",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#6A11CB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  searchButtonDisabled: {
    backgroundColor: "#B2BEC3",
    shadowColor: "#B2BEC3",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },

  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: "#636E72",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#6A11CB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#636E72",
    textAlign: "center",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderSubText: {
    fontSize: 14,
    color: "#636E72",
    textAlign: "center",
  },
});
