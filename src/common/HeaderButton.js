import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

export const HeaderButton = ({
  icon,
  onPress,
  style,
  imgStyle,
  mode,
  disabled,
}) => {
  console.log(mode, 'disabledmode');
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[{ width: 36, height: 36, padding: 8 },
        style]}
      onPress={onPress} >
      <Image source={icon} style={[global.styles.imgContain, 
        { opacity: disabled ? 0.3 : 1 },
        { tintColor: '#696969' }, imgStyle]} />
    </TouchableOpacity>
  )
}

export const HeaderToggleButton = ({
  icon,
  onPress,
  style,
  imgStyle,
  mode,
  active
}) => {
  return (
    <TouchableOpacity
      style={[{ width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }, 
        { backgroundColor: active ? global.color_theme : 'transparent'},
      style]}
      onPress={onPress} >
        <View style={{ width: 36, height: 36, padding: 8 }}>
          <Image source={icon} style={[global.styles.imgContain, { tintColor: mode && mode === 'dark' ? global.color_ltgray : global.color_darkgray, }, imgStyle]} />
        </View>
    </TouchableOpacity>
  )
}