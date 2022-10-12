import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export const IndicatorBottom = ({
  dark,
  style,
}) => {
  return (
    <View style={[{
      backgroundColor: 'transparent',
      width: 60, height: 60, borderRadius: 30,
      overflow: 'hidden',
      position: 'absolute',
      alignSelf: 'center',
      bottom: 60,
      justifyContent: 'center',
      alignItems: 'center'
    }, style]}

      >
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)',
        opacity: 0.8
      }}/>
      <BallIndicator color={global.color_theme} size={36}/>
    </View>
  )
}
