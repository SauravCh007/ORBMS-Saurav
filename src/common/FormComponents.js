import React, {Component, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import '../utils/Global';
import DatePicker from 'react-native-datepicker';
import InputScrollView from 'react-native-input-scroll-view';
export const FormInput = ({
  label,
  maxLength,
  textContentType,
  dataDetectorTypes,
 formate,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize = 'none',
  autoCorrect,
  returnKeyType,
  onSubmitEditing,
  onFocus,
  blurOnSubmit,
  keyboardType,
  clearButtonMode = 'while-editing',
  textStyle,
  editable = true,
  multiline,

  hideLabel,
  labelStyle,
  inputContainerStyle,
  onPress,
  style,
  textColor = global.color_darkgray,
  bgColor = global.color_ltmedgray,

  inputRef,
  scrollEnabled,
  inputAccessoryViewID,
  keyboardAppearance = 'light',
  setHeight = 0,
  isComment = false,
}) => {
  const scrollRef = useRef();
  return (
    <View style={[styles.inputContainer, style]}>
      {hideLabel ? null : (
        <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputBoxContainer,
          {paddingVertical: multiline ? 15 : 0},
          {backgroundColor: bgColor},
          inputContainerStyle,
        ]}>
        <TextInput
          ref={inputRef}
          multiline={multiline}
          style={[
            styles.inputField,
            textStyle,
            {color: editable ? textColor : '#C0C0C0', fontSize: 15},
          ]}
          placeholder={placeholder}
          placeholderTextColor={global.color_medgray}
          onChangeText={onChangeText}
          onContentSizeChange={event =>
            (setHeight = event.nativeEvent.contentSize.height)
          }
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
          scrollEnabled={scrollEnabled}
          inputAccessoryViewID={inputAccessoryViewID}
          keyboardAppearance={keyboardAppearance}
          maxLength={maxLength}
          textAlignVertical={'top'}
          textContentType={textContentType}
          dataDetectorTypes={dataDetectorTypes}
        />
      </View>
    </View>
  );
};

export const FormDropdown = ({
  label,
  labelSize,
  labelStyle,
  value,
  onPress,
  icon,
  bgColor = global.color_ltmedgray,
  disabled,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, labelStyle, {fontSize: labelSize}]}>
        {label}
      </Text>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.inputBoxContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgColor,
          },
        ]}>
        <Text style={[styles.inputField, {flex: 1}]}>{value}</Text>
        <Image source={icon} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export const FormTypeDropdown = ({
  label,
  labelSize,
  labelStyle,
  value,
  onPress,
  icon,
  bgColor = global.color_ltmedgray,
  disabled,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, labelStyle, {fontSize: labelSize}]}>
        {label}
      </Text>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.inputBoxContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgColor,
          },
        ]}>
        <Text style={[styles.inputField, {flex: 1}]}>{value}</Text>
        <Image source={icon} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export const FormDatePicker = ({
  label,
  labelSize,
  labelStyle,
  value,
  onPress,
  icon,
  bgColor = global.color_ltmedgray,
  mode = 'datetime',
  placeholder = 'Date & Time',
  format = 'YYYY-MM-DD',
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
  onDateChange,
  datePickerRef,
  datePickerStyle,
  textStyle,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, labelStyle, {fontSize: labelSize}]}>
        {label}
      </Text>
      <TouchableOpacity
        style={[
          styles.inputBoxContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgColor,
          },
        ]}>
        {Platform.OS === 'ios' ? (
          <DatePicker
            ref={ref => (datePickerRef = ref)}
            style={[styles.inputText, {flex: 1, marginVertical: -7}]}
            date={value}
            mode={mode}
            placeholder={placeholder}
            format={format}
            showTime={{use12Hours: true, format: 'hh:mm A'}}
            // format={format}
            confirmBtnText={confirmBtnText}
            cancelBtnText={cancelBtnText}
            customStyles={{...styles.datePickerStyle, ...datePickerStyle}}
            onDateChange={onDateChange}
          />
        ) : (
          <TextInput
            style={[styles.inputField]}
            placeholder={placeholder}
            value={`${value}`}
            onFocus={onDateChange}
          />
        )}

        {Platform.OS === 'ios' ? (
          <TouchableHighlight onPress={() => datePickerRef.onPressDate()}>
            <Image source={icon} style={styles.iconStyle} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            // onPress={() => datePickerRef.onPressDate()}
            onPress={() => console.log(datePickerRef, 'DADADADA')}>
            <Image source={icon} style={styles.iconStyle} />
          </TouchableHighlight>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const FormButton = ({
  style,
  text,
  onPress,
  textColor = global.color_white,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonContainer, {opacity: disabled ? 0.6 : 1}, style]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonContainer: {
    backgroundColor: global.color_theme,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#432587',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginVertical: 20,
    maxWidth: 300,
    width: '100%',
  },
  buttonText: {
    color: global.color_white,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 18,
  },
  inputContainer: {
    marginVertical: 15,
    flex: 1,
  },
  inputLabel: {
    color: global.color_darkgray,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    width: '100%',
    marginBottom: 10,
  },
  inputBoxContainer: {
    backgroundColor: global.color_ltmedgray,
    borderRadius: 10,
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  inputField: {
    width: '100%',
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    color: global.color_darkgray,
    fontSize: 15,
    fontWeight: '500',
    textAlignVertical: 'top',
    marginTop: 7,
    alignItems: 'center',
    marginBottom: 7,
  },
  iconStyle: {
    width: 16,
    height: 16,
    tintColor: global.color_darkgray,
    resizeMode: 'contain',
  },
  datePickerStyle: {
    datePicker: {
      // paddingLeft: (global.deviceWidth - 200) / 2,
    },
    placeholderText: {fontSize: 16, color: global.color_white_3, margin: 0},
    dateIcon: {width: 0, height: 0, margin: 0},
    dateInput: {
      marginRight: -10,
      padding: 0,
      borderWidth: 0,
      flex: 1,
      alignItems: 'flex-start',
      width: '100%',
    },

    btnTextConfirm: {color: global.color_theme, fontWeight: '700'},
    dateText: {textAlign: 'center', fontSize: 16, color: global.color_white},
  },
};
