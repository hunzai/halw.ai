import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Grid = ({ buttons }) => {

  const screenWidth = Dimensions.get('window').width;
  const numButtonsPerRow = Math.floor(screenWidth / 200);
  const numRows = Math.ceil(buttons.length / numButtonsPerRow);

  const rows = [];
  let startIndex = 0;


  const showRows = () => {
    for (let i = 0; i < numRows; i++) {
      const endIndex = Math.min(startIndex + numButtonsPerRow, buttons.length);
      const rowButtons = buttons.slice(startIndex, endIndex);

      rows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowButtons}
        </View>,
      );
      startIndex = endIndex;
    }

    return <View style={styles.container}>{rows}</View>;
  };

  return  showRows() ;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
});


export default Grid;
