import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { UnreadIndicator } from '../common';

export const MessageItem = ({
  onPress,
  onPressCheckbox,
  sender,
  message,
  timestamp,
  active,
  unread,
  avatar,
  initials,
  separatorColor=global.color_separator,
  textColor=global.color_darkgray,
  checkColor=global.color_white,
}) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 20, }} onPress={onPress} >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: separatorColor,
        borderTopWidth: 1,
        height: 80,
      }}>
        <TouchableOpacity
          onPress={onPressCheckbox}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 10,
            backgroundColor: global.color_medgray,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          {
            avatar ?
            <Image style={global.styles.imgCover} source={avatar} />
            :
            <Text style={{
              fontFamily: 'Montserrat-Regular',
              fontWeight: '700',
              fontSize: 16,
              color: global.color_white,
            }}>
              {initials}
            </Text>
          }
        </TouchableOpacity>

        <View style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }} >
            <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontFamily: 'Montserrat-Regular',
              fontWeight: '700',
              color: textColor,
            }}>{sender}</Text>

            <Text
              numberOfLines={1}
              style={{
                color: textColor,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '300',
                fontSize: 10,
                marginHorizontal: 5,
              }}>
              {timestamp}
            </Text>

            <UnreadIndicator show={unread} />
            <Image style={{
              width: 14,
              height: 14,
              resizeMode: 'contain',
              marginLeft: 5,
              tintColor: global.color_arrowgray,
            }} source={global.icon_rightarrow} />

          </View>
          <Text
            numberOfLines={1}
            style={{
              color: textColor,
              fontFamily: 'Montserrat-Regular',
              fontWeight: '400',
              fontSize: 11,
            }}>
            {message}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}
