import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";
import { Colors } from "../constants/Color";
import React, { useRef, useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000, 
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH], 
  });

  const renderShimmer = () => (
    <Animated.View
      style={[
        styles.shimmer,
        {
          transform: [
            { translateX: translate },
            { translateY: translate },
            { rotate: "45deg" },
          ],
        },
      ]}
    />
  );

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.skeletonCard}>
          <View style={styles.skeletonImage}>{renderShimmer()}</View>
          <View style={styles.skeletonTextContainer}>
            {[70, 40, 60, 90].map((width, idx) => (
              <View key={idx} style={[styles.skeletonLine, { width: `${width}%` }]}>
                {renderShimmer()}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    paddingBottom: 20,
  },
  skeletonCard: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  skeletonImage: {
    height: 180,
    backgroundColor: Colors.skeleton,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  skeletonTextContainer: {
    gap: 6,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: Colors.skeleton,
    borderRadius: 4,
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    top: -SCREEN_WIDTH, // start off top-left
    left: -SCREEN_WIDTH, // start off top-left
    height: SCREEN_WIDTH * 2, // enough to cover diagonally
    width: SCREEN_WIDTH * 2,
    backgroundColor: "rgba(255,255,255,0.15)", // subtle shine
  },
});
