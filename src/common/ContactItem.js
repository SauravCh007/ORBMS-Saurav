import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

export const StarButton = ({
  onPress,
  size=18,
  active,
  padding=2,
  disabled=true,
}) => {
  return (
    <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={{
      width: size,
      height: size,
      padding: padding,
    }}
    >
      <Image source={global.icon_star} style={{
        width: '100%',
        height: '100%',
        tintColor: active ? global.color_yellow : global.color_medgray,
      }} />
    </TouchableOpacity>
  )
}


export const ContactItem = ({
  onPress,
  onPressCheckbox,
  title,
  active,
  textColor=global.color_darkgray,
  separatorColor=global.color_separator,
  checkColor=global.color_white,
  rating=0,
  showRatings,
  email,
  hideArrow,
  disabled
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={{ paddingHorizontal: 20, opacity: disabled ? 0.5: 1, flexDirection: 'row', alignItems: 'center', borderColor: separatorColor, borderTopWidth: 1, height: 60 }} onPress={onPress} >
      {/* <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: separatorColor,
        borderTopWidth: 1,
        height: 60,
      }}> */}
        <TouchableOpacity
          onPress={onPressCheckbox}
          hitSlop= {{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            width: 24,
            height: 24,
            borderRadius: 14,
            marginRight: 13,
            backgroundColor: active ? global.color_theme : 'transparent',
            padding: 4,
            borderColor: active ? global.color_theme : global.color_ltmedgray,
            borderWidth: 3,
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
        <View style={{
          flex: 1,
          justifyContent: 'center',
          
        }}>
          <Text style={{
            fontFamily: 'Montserrat-Regular',
            fontWeight: '500',
            color: textColor,
          }}>{title}</Text>
          {
            email && email !== '' ?
            <Text style={{
              fontSize: 12,
              fontFamily: 'Montserrat-Regular',
              fontWeight: '400',
              color: textColor,
            }}>{email}</Text>
            : null
          }
        </View>
        {
          showRatings ?
          <View style={styles.starsContainer}>
            <StarButton active={rating >= 1} />
            <StarButton active={rating >= 2} />
            <StarButton active={rating >= 3} />
            <StarButton active={rating >= 4} />
            <StarButton active={rating >= 5} />
          </View>
          : null
        }
        {
          hideArrow ? null :
          <Image style={{
            width: 16,
            height: 16,
            resizeMode: 'contain',
            tintColor: global.color_arrowgray,
          }} source={global.icon_rightarrow} />
        }
      {/* </View> */}
    </TouchableOpacity>
  )
}

export const GroupsItem = ({
  title,
  onPress,
  onPressDelete,
  bgColor=global.color_white,
  textColor,
}) => {
  return (
    <TouchableOpacity style={[global.styles.tagItem, { backgroundColor: bgColor }]} onPress={onPress}>
      <Text style={[global.styles.tagItemText, { color: textColor }]}>{title}</Text>
      <TouchableOpacity style={global.styles.tagCloseBtn} onPress={onPressDelete}>
        <Image style={global.styles.tagCloseImg} source={global.icon_wrong} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export const GroupsItemEmpty = ({
  title,
  textColor=global.color_darkgray,
}) => {
  return (
    <Text style={{
      flex: 1,
      fontFamily: 'Montserrat-Regular',
      fontWeight: '400',
      color: textColor,
      textAlign: 'center',
      marginVertical: 15,
      fontSize: 12,
    }}>{title}</Text>
  )
}

export const EmptyList = ({
  text,
  textColor=global.color_darkgray,
  textStyle,
  containerStyle,
}) => {
  return (
    <View style={[{ padding: 30, alignItems: 'center' }, containerStyle]} >
      <Text style={[{ fontSize: 13, color: textColor }, textStyle ]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  starsContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
});

