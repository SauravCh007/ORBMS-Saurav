import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import '../utils/Global';

export const NoteItem = ({
  onPress,
  onPressCheckbox,
  title,
  subtitle,
  active,
  bgColor=global.color_white,
  textColor=global.color_darkgray,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.noteItemContainer, { backgroundColor: bgColor }]} >
      <View style={styles.noteItemInner}>
        <Text style={[styles.noteItemTitle,
          active ? { textDecorationLine: 'line-through' } : {},
          { color: textColor }
        ]}>{title}</Text>
        {
          !subtitle ? null :
          <Text style={[styles.noteItemSubtitle, { color: textColor }]}>{subtitle}</Text>
        }
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  // task item
  noteItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: global.color_white,
    borderRadius: 6,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#432587',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 5,
    // marginVertical: 10,
  },
  noteItemInner: {
    flex: 1,
  },
  noteItemTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 12,
    color: global.color_darkgray,
    marginBottom: 3,
  },
  noteItemSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 11,
    color: global.color_gray,
  }

});
