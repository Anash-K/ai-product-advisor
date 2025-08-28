import { StyleSheet, View } from "react-native";

export const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    {[1, 2, 3].map((item) => (
      <View key={item} style={styles.skeletonCard}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonTextContainer}>
          <View style={[styles.skeletonLine, { width: "70%" }]} />
          <View style={[styles.skeletonLine, { width: "40%" }]} />
          <View style={[styles.skeletonLine, { width: "60%" }]} />
          <View
            style={[
              styles.skeletonLine,
              { width: "90%", height: 16, marginTop: 8 },
            ]}
          />
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    paddingBottom: 20,
  },

  skeletonCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
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
  skeletonImage: {
    height: 200,
    backgroundColor: "#DFE6E9",
    borderRadius: 12,
    marginBottom: 16,
  },
  skeletonTextContainer: {
    paddingHorizontal: 8,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: "#DFE6E9",
    borderRadius: 4,
    marginBottom: 8,
  },
});
