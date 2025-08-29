import React, { useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../constants/Color";

interface AnimatedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  disabled = false,
  icon,
  buttonStyle,
  textStyle,
  iconColor = Colors.white,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled, buttonStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {icon && <Icon name={icon} size={20} color={iconColor} />}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
