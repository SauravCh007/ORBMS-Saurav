import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { FormButton } from '../common';

import '../utils/Global';

export const ModalAlert = ({
  isVisible,
  onBackdropPress,
  title,
  message,
  buttons,
  alertIcon,
  bgColor=global.color_white,
  textColor=global.color_darkgray,
  dark,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}>
      <View style={[styles.modalBoxContainer, {
        backgroundColor: bgColor,
        shadowColor: dark ? '#fff' : '#432587',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: dark ? 0.2 : 0,
        shadowRadius: 6,
        elevation: 6,
      }]}>
        {
          alertIcon ?
          <View style={{
            marginTop: -30,
          }}>
            <Image style={{
              width: 170,
              height: 85,
            }}
            source={dark ? global.img_modaliconbg2 : global.img_modaliconbg} />
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: alertIcon.color ? alertIcon.color : global.color_green,
              top: -50,
              shadowColor: '#432587',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 6,
              padding: 28
            }}>
              <Image source={alertIcon.icon}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  tintColor: textColor,
                }} />
            </View>
          </View>
          : null
        }

        <Text style={[styles.modalTitle, { color: textColor }]} >{title}</Text>
        <Text style={[styles.modalText, { color: textColor }]} >{message}</Text>
        {
          buttons && buttons.length > 0 ?
          buttons.map((item, index) => {
            switch (item.type) {
              case 'cancel':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={styles.modalAlertButton}>
                    <Text style={[styles.modalAlertButtonText, dark ? { color: global.color_ltmedgray } : {}]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              case 'ok':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={[styles.modalOkButton, { backgroundColor: dark ? global.color_black2 : global.color_ltmedgray }]}>
                    <Text style={[styles.modalOkButtonText, { color: textColor }]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              default:
                return (
                  <FormButton
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={{
                      marginBottom: 0,
                      backgroundColor: item.color ? item.color : global.color_red
                    }}
                    text={item.text}
                    />
                )

            }
          })
          : null
        }
      </View>
    </Modal>
  )
}

export const ModalBottom = ({
  isVisible,
  onBackdropPress,
  title,
  buttons,
  dark,
  bgColor=global.color_white,
  textColor=global.color_darkgray,
  list,
  hideArrow,
  children,
  topContent,
  reverseItem
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{ padding: 0, margin: 0 }}>
      <View style={[styles.modalBottom,
        {
          backgroundColor: bgColor,
        }]}>
          {
            title && title !== '' ?
          <Text style={[styles.modalBottomTitle, { color: textColor }]}>{title}</Text>
          : null
          }
        {
          topContent ?
          topContent : null
        }
        {
          list ? 
          <FlatList
          style={styles.modalList}
          data={list}
          contentContainerStyle={{ paddingBottom: 0 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            const active = item.checked ? item.checked : false;
            return (
              item.type && item.type === 'gap' ? 
              <View style={{ height: item.gapSize ? item.gapSize : 50, borderTopWidth: 1,
                borderColor: global.color_separator, }} /> :
              <ModalListItem item={item} textColor={textColor} hideArrow reverse={reverseItem} bgColor={bgColor} />
            )
          }}
        />
        : null
        }
        {children}
        <View style={{ paddingBottom: 40 }} >
        {
          buttons && buttons.length > 0 ?
          buttons.map((item, index) => {
            switch (item.type) {
              case 'cancel':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={styles.modalAlertButton}>
                    <Text style={[styles.modalAlertButtonText, dark ? { color: global.color_ltmedgray } : {}]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              case 'ok':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={[styles.modalOkButton, { backgroundColor: dark ? global.color_black2 : global.color_ltmedgray }]}>
                    <Text style={[styles.modalOkButtonText, { color: textColor }]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              default:
                return (
                  <FormButton
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={{
                      marginBottom: 0,
                      backgroundColor: item.color ? item.color : global.color_red
                    }}
                    text={item.text}
                    />
                )

            }
          })
          : null
        }
        </View>
      </View>
    </Modal>
  )
}

export const ModalListItem = ({
  item,
  textColor,
  hideArrow,
  iconTintcolor=global.color_darkgray,
  reverse,
  bgColor,
}) => {
  const active = item.checked ? item.checked : false;
  return (
    <TouchableOpacity
    onPress={item.onPress ? item.onPress : null}
    style={[styles.modalListItem, 
      reverse ? { flexDirection: 'row-reverse' } : {}
    ]}>
      {
        item.badge ?
        <View style={{ 
          height: 22,
          minWidth: 22,
          paddingHorizontal: 6,
          borderRadius: 11,
          paddingTop: 2,
          backgroundColor: global.color_theme,
          alignItems: 'center',
        }}>
          <Text style={[styles.modalListItemText, { color: bgColor }]}>{item.badge}</Text>
        </View>
        : null
      }
    <Text style={[styles.modalListItemText, { color: textColor }]}>{item.text}</Text>
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 12,
        backgroundColor: active ? global.color_theme : 'transparent',
        padding: 3,
        borderColor: active ? global.color_theme : global.color_ltmedgray,
        borderWidth: 2,
        opacity: active ? 1 : 0,
        marginRight: 5,
      }}>
      <Image style={{
        tintColor: active ? global.color_white : 'transparent',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

      }}
        source={global.icon_check}
      />
    </View>
    {
      hideArrow ? null :
      <View
      style={{
        width: 20,
        height: 20,
        padding: 3,
      }}>
      <Image style={{
        tintColor:  iconTintcolor,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}
        source={global.icon_rightarrow}
      />
      </View>
    }
    {
      item.icon ?
      <View
      style={{
        width: 24,
        height: 24,
        padding: 0,
      }}>
      <Image style={{
        tintColor: iconTintcolor,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}
        source={item.icon}
      />
      </View>
      : null
    }
  </TouchableOpacity>
  )
}

export const ModalChecklist = ({
  isVisible,
  onBackdropPress,
  title,
  list,
  onPressSave,
  saveText='Save',
  saveDisabled,
  bgColor=global.color_white,
  textColor=global.color_darkgray,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      //onSwipeComplete={onBackdropPress}
      //swipeDirection={['down']}
      style={{ padding: 0, margin: 0 }}>
      <View style={[styles.modalBottom, {
        backgroundColor: bgColor,
      }]}>
        <Text style={[styles.modalBottomTitle, { color: textColor }]}>{title}</Text>
          <FlatList
            style={styles.modalList}
            data={list}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `list-item-${index}`}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => {
              const active = item.checked ? item.checked : false;
              return (
                <TouchableOpacity
                  onPress={item.onPress ? item.onPress : null}
                  style={[styles.modalListItem]}>
                  <Text style={[styles.modalListItemText, { color: textColor }]}>{item.text}</Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 12,
                      backgroundColor: active ? global.color_theme : 'transparent',
                      padding: 3,
                      borderColor: active ? global.color_theme : global.color_ltmedgray,
                      borderWidth: 2,
                    }}>
                    <Image style={{
                      tintColor: active ? global.color_white : 'transparent',
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',

                    }}
                      source={global.icon_check}
                    />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
      </View>
      <FormButton
      disabled={saveDisabled}
      text={saveText} style={global.styles.quickButtonsContainer} onPress={onPressSave}/>
    </Modal>
  )
}

export const ModalFromBottom = ({
  isVisible,
  onBackdropPress,
  title,
  buttons,
  dark,
  bgColor=global.color_white,
  textColor=global.color_darkgray,
  list,
  hideArrow,
  children,
  topContent,
  reverseItem
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{ padding: 0, margin: 0 }}>
      <View style={[styles.modalBottom,
        {
          backgroundColor: bgColor,
        }]}>
          {
            title && title !== '' ?
          <Text style={[styles.modalBottomTitle, { color: textColor }]}>{title}</Text>
          : null
          }
        {
          topContent ?
          topContent : null
        }
        {
          list ? 
          <FlatList
          style={styles.modalList}
          data={list}
          contentContainerStyle={{ paddingBottom: 0 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            const active = item.checked ? item.checked : false;
            return (
              item.type && item.type === 'gap' ? 
              <View style={{ height: item.gapSize ? item.gapSize : 50, borderTopWidth: 1,
                borderColor: global.color_separator, }} /> :
              <ModalListItem item={item} textColor={textColor} hideArrow reverse={reverseItem} bgColor={bgColor} />
            )
          }}
        />
        : null
        }
        {children}
        <View style={{ paddingBottom: 40 }} >
        {
          buttons && buttons.length > 0 ?
          buttons.map((item, index) => {
            switch (item.type) {
              case 'cancel':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={styles.modalAlertButton}>
                    <Text style={[styles.modalAlertButtonText, dark ? { color: global.color_ltmedgray } : {}]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              case 'ok':
                return (
                  <TouchableOpacity
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={[styles.modalOkButton, { backgroundColor: dark ? global.color_black2 : global.color_ltmedgray }]}>
                    <Text style={[styles.modalOkButtonText, { color: textColor }]}>{item.text}</Text>
                  </TouchableOpacity>
                )
                break;
              default:
                return (
                  <FormButton
                    key={`b-${index}`}
                    onPress={item.onPress}
                    style={{
                      marginBottom: 0,
                      backgroundColor: item.color ? item.color : global.color_red
                    }}
                    text={item.text}
                    />
                )

            }
          })
          : null
        }
        </View>
      </View>
    </Modal>
  )
}






const styles = StyleSheet.create({
  modalList: {
    maxHeight: global.deviceHeight * 0.8,
  },
  modalListItem: {
    borderTopWidth: 1,
    borderColor: global.color_separator,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalListItemText: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: global.color_darkgray,
  },
  modalBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingBottom: 0,
    width: '100%',
    backgroundColor: global.color_white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalBottomTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: global.color_darkgray,
    marginTop: 10,
    marginBottom: 20,
  },
  modalBoxContainer: {
    paddingTop: 30,
    padding: 30,
    width: '100%',
    maxWidth: 340,
    backgroundColor: global.color_white,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  modal: {

  },
  modalTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: global.color_darkgray,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
    color: global.color_darkgray,
    marginBottom: 20,
  },
  modalAlertButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: -10
  },
  modalAlertButtonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
    color: global.color_darkgray,
  },
  modalOkButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: global.color_ltmedgray,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalOkButtonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    color: global.color_darkgray,
  },
});
