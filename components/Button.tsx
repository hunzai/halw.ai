import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const iconSize = 25;

const HalwaiButton = ({onPress: onPress, iconName: iconName}) => {
  return(
    <TouchableOpacity
    style={styles.playAllButton}
    onPress={onPress}
  >
    <Ionicons
      name={iconName}
      size={iconSize * 1}
      color="white"
      style={styles.playAllButtonIcon}
    />
    <Text style={styles.playAllButtonText}></Text>
  </TouchableOpacity>
  )
}

export default HalwaiButton;

const styles = StyleSheet.create({

  playAllButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  playAllButtonIcon: {
    marginRight: 5,
  },
  playAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pauseButtonIcon: {
    marginRight: 5,
  }
});

