import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import '../utils/Global';

export const TaskItem = ({
  onPress,
  onPressCheckbox,
  title,
  subtitle,
  active,
  bgColor = global.color_white,
  textColor = global.color_darkgray,
}) => {
  console.log("onpress",onPress)
  return (
    <TouchableOpacity onPress={onPress} style={[styles.taskItemContainer,
    { backgroundColor: bgColor }
    ]} >
      <View style={styles.taskItemInner}>
        <Text style={[styles.taskItemTitle,
        active ? { textDecorationLine: 'line-through' } : {},
        { color: textColor }
        ]}>{title}</Text>
        {
          !subtitle ? null :
            <Text style={[styles.taskItemSubtitle, { color: textColor }]}>{subtitle}</Text>
        }
      </View>
      <TaskCheckBox
        onPress={onPressCheckbox}
        icon={global.icon_check}
        active={active}
        noDimmedCheckmark
      />
    </TouchableOpacity>
  )
}

export const ImageTaskItem = ({
  onPress,
  icon,
  iconColor,
  onPressCheckbox,
  title,
  subtitle,
  active,
  bgColor = global.color_white,
  textColor = global.color_darkgray,
  

}) => {
 
  return (
    <TouchableOpacity onPress={onPress} style={[styles.taskItemContainer,
    { backgroundColor: bgColor }
    ]} >
      <Image style={{height: 40,width:40,tintColor:iconColor}}
        source={icon}
        resizeMode='contain'
      />
      <View style={styles.taskImageItemInner}>
        <Text style={[styles.taskItemTitle,
        active ? { textDecorationLine: 'line-through' } : {},
        { color: textColor }
        ]}>{title}</Text>
        {
          !subtitle ? null :
            <Text style={[styles.taskItemSubtitle, { color: textColor }]}>{subtitle}</Text>
        }
      </View>
      <TaskCheckBox
        onPress={onPressCheckbox}
        icon={global.icon_check}
        active={active}
        noDimmedCheckmark
      />
    </TouchableOpacity>
  )
}



export const CalendarTaskItem = ({
  onPress,
  onPressCheckbox,
  title,
  subtitle,
  time,
  type,
  active,
  bgColor = global.color_white,
  textColor = global.color_darkgray,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.taskItemContainerCalendar,
    { backgroundColor: bgColor, marginHorizontal: 15 }
    ]} >
      <View style={{ width: 100, height: '100%', }}>
        <Text style={[styles.taskItemTitle,
        { color: textColor, fontSize: 12, marginTop: 5, opacity: 0.8 }
        ]}>{time}</Text>
        <Text style={[styles.taskItemSubtitle, { color: textColor }]}>{type}</Text>


      </View>
      <View style={styles.taskItemInner}>
        <Text style={[styles.taskItemTitle,
        active ? { textDecorationLine: 'line-through' } : {},
        { color: textColor }
        ]}>{title}</Text>
        {
          !subtitle ? null :
            <Text style={[styles.taskItemSubtitle, { color: textColor }]}>{subtitle}</Text>
        }
      </View>
      <TaskCheckBox
        onPress={onPressCheckbox}
        icon={global.icon_check}
        active={active}
        noDimmedCheckmark
      />
    </TouchableOpacity>
  )
}

export const TaskCheckBox = ({
  onPress,
  active,
  icon,
  style,
  size,
  noDimmedCheckmark
}) => {
  console.log("TaskCheckBox",TaskCheckBox)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.taskCheckboxContainer, style,
      size ? { width: size, height: size, borderRadius: size / 2, padding: Math.round(size / 8) } : {},
      {
        backgroundColor: active ? global.color_green : 'transparent',
        borderColor: active ? global.color_green : global.color_ltmedgray,
      }]}>
      <Image style={[styles.taskCheckboxImg,
      { tintColor: active ? global.color_white : (noDimmedCheckmark ? 'transparent' : global.color_ltmedgray), }
      ]}
        source={icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // task item
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  taskItemContainerCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: global.color_white,
    borderRadius: 6,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#432587',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 5,
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: global.color_white,
    borderRadius: 6,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#432587',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 5,
  },
  taskItemInner: {
    flex: 1,
  },taskImageItemInner: {
    flex: 1,
    marginLeft:10
  },
  taskCheckboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    padding: 3,
    borderWidth: 2,
  },
  taskCheckboxImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  taskItemTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: global.color_darkgray,
    marginBottom: 3,
  },
  taskItemSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 11,
    color: global.color_gray,
  }
});
