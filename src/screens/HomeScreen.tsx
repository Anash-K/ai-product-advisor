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
  Keyboard,
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
import Toast from "react-native-toast-message";

export const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

  // Api Call
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["recommendations", submittedQuery],
    queryFn: () => fetchRecommendations(submittedQuery, productCatalog),
    enabled: !!submittedQuery, // optimization for no initial call without query
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

  // Error Toast
  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please check your connection and try again.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  }, [isError]);

  //handle on Search
  const onSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) setSubmittedQuery(trimmedQuery);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  //handler for details View
  const handleDetails = useCallback(
    (product: Recommendation) => {
      navigation.navigate("Details", { product });
    },
    [navigation]
  );

  //Render Item For Products
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

  console.log(JSON.stringify(data,null,2),"response of query");
  

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <CustomHeader />

        {/* Search */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.inputContainer,
              isFocused && styles.focusInputContainer,
            ]}
          >
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
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  focusInputContainer: { borderColor: Colors.primary, borderWidth: 2 },
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },

  searchContainer: { marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },

  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.border,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 6,
  },

  listContainer: { paddingBottom: 20 },
});
