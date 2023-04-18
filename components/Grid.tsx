import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PauseButton from './PlayerButton';
import * as Speech from 'expo-speech';

const Grid = ({ steps, index, onPress }) => {
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const numButtonsPerRow = Math.floor(screenWidth / 200);

  useEffect(() => {
    console.log(`${index} !== ${animatedIndex}`)
  }, [index, animatedIndex]);

  const playStepAtIndex = async index => {
    await Speech.stop();
    setAnimatedIndex(index)
    await Speech.speak(steps[index]);
  };

  const renderButtons = () => {
    const buttons = steps.map((_, i) => (
      <PauseButton
        key={`button-${i}`}
        onPress={() => playStepAtIndex(i)}
        text={i}
        animating={animatedIndex === i}
      />
    ));

    const rows = [];

    for (let i = 0; i < buttons.length; i += numButtonsPerRow) {
      const rowButtons = buttons.slice(i, i + numButtonsPerRow);

      rows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowButtons}
        </View>
      );
    }

    return rows;
  };

  return <View style={styles.container}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Grid;
