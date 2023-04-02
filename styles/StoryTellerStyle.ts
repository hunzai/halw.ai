import { StyleSheet } from "react-native";
import Theme from "./Theme";

const StoryTellerTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '80%',
    height: '80%',
  },
  waitingTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  storyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
});

export default StoryTellerTheme;
