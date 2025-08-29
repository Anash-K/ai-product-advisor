import { Animated, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors } from "../constants/Color";
import { CustomImages } from "../constants/CustomImages";

const CustomHeader = () => {
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          opacity: headerAnim,
          transform: [
            {
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-40, 0],
              }),
            },
            {
              scale: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.logoRow}>
        {/* <View style={styles.logoWrapper}>
          <Image source={CustomImages.logo} style={styles.logo} />
        </View> */}
        <Text style={styles.header}>AI Product Advisor</Text>
      </View>
      <Text style={styles.subHeader}>
        Discover products smarter, faster & easier
      </Text>
    </Animated.View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 28,
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  subHeader: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
});
