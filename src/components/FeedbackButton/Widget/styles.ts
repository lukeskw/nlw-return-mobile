import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.brand,
    fontSize: 30,
    fontFamily: theme.fonts.regular
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    bottom: getBottomSpace() + 16
  },
  modal: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 16
  },
  indicator: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
    padding: 0
  }
});