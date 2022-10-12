import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';

export const EmailItem = ({
  onPress,
  onPressCheckbox,
  sender,
  title,
  subtitle,
  timestamp,
  active,
  unread,
  box,
  separatorColor=global.color_separator,
  textColor=global.color_darkgray,
  checkColor=global.color_white,
  bgColor='transparent',
  hideCheckbox,
  flatList
}) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={onPress} >
      <View style={[{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: separatorColor,
        borderTopWidth: 1,
        height: 80,
      },
        box ?
        {
          borderTopWidth: 0,
          backgroundColor: bgColor,
          shadowColor: '#432587',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
          marginVertical: 10,
          marginHorizontal: 10,
          paddingHorizontal: 15,
          borderRadius: 6,
        } : {}
      ]}>
        {
          box || hideCheckbox ? null :
          <TouchableOpacity
            onPress={onPressCheckbox}
            style={{
              width: 20,
              height: 20,
              borderRadius: 12,
              marginRight: 10,
              backgroundColor: active ? global.color_theme : 'transparent',
              padding: 3,
              borderColor: active ? global.color_theme : global.color_ltmedgray,
              borderWidth: 2,
            }}>
            <Image style={{
              tintColor: active ? checkColor : 'transparent',
              width: '100%',
              height: '100%',
              resizeMode: 'contain',

            }}
              source={global.icon_check}
            />
          </TouchableOpacity>
        }

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
              fontSize: 12,
            }}>{sender}</Text>

            <Text
              numberOfLines={1}
              style={{
                color: textColor,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '300',
                fontSize: 11,
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
              fontWeight: '600',
              fontSize: 11,
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
          style={{
            color: textColor,
            fontFamily: 'Montserrat-Regular',
            fontWeight: '400',
            fontSize: 11,
          }}>
            {subtitle}
          </Text>
          {/* <WebView 
            ref={(ref) => { this.webview = ref; }}
            style={{color: textColor, flex: 1, resizeMode: ''}} 
            scalesPageToFit={(Platform.OS === 'ios') ? false : true}
            useWebKit={true}
            source={{html: subtitle}}
          /> */}
        </View>

      </View>
    </TouchableOpacity>
  )
}

export const UnreadIndicator = ({
  show,
}) => {
  return (
    <View
    style={{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: show ? global.color_blue : 'transparent',
    }}/>
  )
}


export const EmailChip = ({
  name,
  email,
  onPress,
  onPressDelete,
  bgColor=global.color_white,
  textColor,
  otherText
}) => {
  let prefix = name ? '<' : '';
  let suffix = name ? '>' : '';
  return (
    <TouchableOpacity style={[global.styles.tagItem, { backgroundColor: bgColor, flexWrap: 'wrap', paddingVertical: 5, height: 'auto' }]} onPress={onPress}>
      {
        name && name !== '' ? 
        <Text style={[global.styles.tagItemText, { color: textColor, fontSize: 12, fontWeight: '700' }]}>{name} </Text>
        : null
      }
      {
        email ? 
      <Text style={[global.styles.tagItemText, { color: textColor, fontSize: 11, fontWeight: '400' }]}>{prefix}{email}{suffix}</Text>
      : null
      }
      {
        otherText ? 
      <Text style={[global.styles.tagItemText, { color: textColor, fontSize: 11, fontWeight: '600' }]}>{otherText}</Text>
      : null
      }
      {
        onPressDelete ?
        <TouchableOpacity style={global.styles.tagCloseBtn} onPress={onPressDelete}>
          <Image style={global.styles.tagCloseImg} source={global.icon_wrong} />
        </TouchableOpacity>
        : null
      }
    </TouchableOpacity>
  )
}

export const EmailInputChip = ({
  label,

  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize='none',
  autoCorrect,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  keyboardType,
  clearButtonMode='while-editing',
  textStyle,
  editable=true,
  multiline,
  onFocus,
  onBlur,

  hideLabel,
  labelStyle,
  inputContainerStyle,
  onPress,
  style,
  textColor=global.color_darkgray,
  // bgColor=global.color_ltmedgray,
}) => {
  return (
    <View style={[styles.inputContainer, { width: '100%' }, style]} >
      <View
        style={[styles.inputBoxContainer,
          { paddingVertical: multiline ? 15 : 0 },
          // { backgroundColor: bgColor },
          inputContainerStyle]} >
        <TextInput
          multiline={multiline}
          style={[styles.inputField, textStyle, { color: textColor, fontSize: 13 }]}
          placeholder={placeholder}
          placeholderTextColor={global.color_medgray}
          onChangeText={onChangeText}
          value={`${value}`}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          clearButtonMode={clearButtonMode}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  )
};

const styles = {
  inputContainer: {
    // width: 'auto',
    // minWidth: 100,
    width: 'inherit',
    flex: 0
  },
  inputBoxContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
  },
  inputField: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    color: global.color_darkgray,
    fontSize: 13,
    fontWeight: '500'
  },
}