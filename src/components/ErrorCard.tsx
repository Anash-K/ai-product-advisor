import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { memo } from "react";
import { Colors } from "../constants/Color";

type ErrorCardProps = {
  onTryAgain: () => void;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ onTryAgain }) => {
  return (
    <View style={styles.errorContainer}>
      <Icon name="error-outline" size={50} color={Colors.error} />
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
      <Text style={styles.errorSubText}>
        Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onTryAgain}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ErrorCard);

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.backgroundSecondary, 
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.border, 
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubText: {
    fontSize: 14,
    color: Colors.textSecondary, 
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
