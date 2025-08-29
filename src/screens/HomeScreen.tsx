import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

import { fetchRecommendations } from "../api/aiClient";
import { productCatalog } from "../data/productCatalog";
import { SkeletonLoader } from "../components/SkeletomLoader";
import ProductCard from "../components/ProductCard";
import { Recommendation } from "../types";
import { Colors } from "../constants/Color";
import ErrorCard from "../components/ErrorCard";
import { ScreenProps } from "../navigation/navigation.type";
import CustomHeader from "../components/CustomHeader";
import AnimatedButton from "../components/AnimatedButton";
import PlaceholderCard from "../components/PlaceholderCard";
import NoDataCard from "../components/NoDataCard";

export const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["recommendations", submittedQuery],
    queryFn: () => fetchRecommendations(submittedQuery, productCatalog),
    enabled: !!submittedQuery,
  });

  // Animate product list when new data arrives
  useEffect(() => {
    if (data) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [data]);

  const onSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) setSubmittedQuery(trimmedQuery);
  };

  const handleDetails = useCallback(
    (product: Recommendation) => {
      navigation.navigate("Details", { product });
    },
    [navigation]
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: Recommendation;
    index: number;
  }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <ProductCard product={item} index={index} onShowDetails={handleDetails} />
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={[Colors.background, Colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <CustomHeader />

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Icon
              name="search"
              size={24}
              color={Colors.primary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Describe what you need..."
              placeholderTextColor={Colors.placeholder}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={onSearch}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Icon name="close" size={20} color={Colors.placeholder} />
              </TouchableOpacity>
            )}
          </View>

          <AnimatedButton
            title="Find Products"
            icon="arrow-forward"
            onPress={onSearch}
            disabled={!query.trim()}
          />
        </View>

        {/* Loading */}
        {isLoading && <SkeletonLoader />}
        {/* Error */}
        {isError && <ErrorCard onTryAgain={refetch} />}
        {/* Product List */}
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : submittedQuery && !isLoading && !isError ? (
          <NoDataCard />
        ) : !submittedQuery ? (
          <PlaceholderCard />
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },

  searchContainer: { marginBottom: 24 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },

  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.disabled,
    shadowColor: Colors.disabled,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },

  listContainer: { paddingBottom: 20 },
});
