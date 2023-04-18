import { StyleSheet } from "react-native";

const narratorStyles = StyleSheet.create({
  makeSpace: {
    paddingBottom: 10,
    paddingEnd: '15%',
    alignContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  playAllButton: {
    backgroundColor: '#4f5250',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playAllButtonIcon: {
    marginRight: 5,
  },
  playAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pauseButton: {
    backgroundColor: '#4f5250',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButtonIcon: {
    marginRight: 5,
  },
  pauseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconColumn: {
    paddingRight: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  audioPlayerButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  audioPlayerButtonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  textColumn: {
    paddingRight: 1,
  },
  icon: {
    position: 'relative',
    color: '#10140b',
  },
});

export default narratorStyles;
