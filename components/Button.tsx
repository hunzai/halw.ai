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

const HalwaiButton = ({onPress: onPress, name: name}) => {
  return(
    <TouchableOpacity
    style={styles.playAllButton}
    onPress={onPress}
  >
    <Ionicons
      name="play-circle-outline"
      size={iconSize * 1}
      color="white"
      style={styles.playAllButtonIcon}
    />
    <Text style={styles.playAllButtonText}>{name}</Text>
  </TouchableOpacity>
  )
}

export default HalwaiButton;

const styles = StyleSheet.create({

  playAllButton: {
    backgroundColor: '#4f5250',
    paddingVertical: 10,
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
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

