import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import '../utils/Global';

export const QuickButton = ({
  onPress,
  icon,
  color,
  tintColor=global.color_white,
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      marginHorizontal: 5,
      padding: 15,
      backgroundColor: color ? color : global.color_theme,
      shadowColor: '#432587',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    }}
    >
      <Image source={icon} style={{
        width: '100%',
        height: '100%',
        tintColor: tintColor,
      }} />
    </TouchableOpacity>
  )
}

export const MiniButton = ({
  onPress,
  icon,
  color,
  size=36,
  style,
  iconStyle,
  tintColor=global.color_white
}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={[{
      width: size,
      height: size,
      borderRadius: size/2,
      marginHorizontal: 6,
      padding: size/4,
      backgroundColor: color ? color : global.color_theme,
    }, style]}
    >
      <Image source={icon} style={[{
        width: '100%',
        height: '100%',
        tintColor: tintColor,
      }, iconStyle]} />
    </TouchableOpacity>
  )
}

export const FilterButton = ({
  bgColor,
  icon,
  onPress,
  tintColor,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton,
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
      onPress={onPress}
    >
      <Image style={[styles.filterIcon, 
        { tintColor: tintColor }]} 
        source={global.icon_filter} />
    </TouchableOpacity>

  )
}

const styles = {
  filterButton: {
    width: 50,
    height: 50,
    padding: 13,
    borderRadius: 13,
    backgroundColor: global.color_theme,
    marginLeft: 10,
  },
  filterIcon: {
    tintColor: global.color_white,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
};