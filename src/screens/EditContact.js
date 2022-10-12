
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import {
  HeaderButton,
  ModalAlert,
  ModalChecklist,
  FormInput,
  FormButton,
  FormDropdown,
  MiniButton
} from '../common';

class EditContact extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      listGroups: [
        'Team Member', 'Manufacturer', 'Retailer', 'Marketing Launch Company',
      ],
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Edit Contact',
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_leftarrow} mode={this.props.settings.theme.mode} />
        </View>,
    });
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 150 }}
        >
          <FormInput placeholder={'Form Input'} label={'Input Label'} />
          <FormInput placeholder={'Form Input'} label={'Input Label'} />
          <View style={global.styles.formRow} >
            <FormDropdown value={'Calendar'} label={'Calendar'} icon={global.icon_calendar2} />
            <View style={global.styles.rowSeparator} />
            <FormDropdown value={'Dropdown'} label={'Dropdown'} icon={global.icon_dropdown} />
          </View>
          <View style={global.styles.formRow} >
            <FormInput placeholder={'Form Input'} label={'Input Label'} />
            <View style={global.styles.rowSeparator} />
            <FormInput placeholder={'Form Input'} label={'Input Label'} />
          </View>
          <FormInput placeholder={'Form Input'} label={'Input Label'} multiline inputContainerStyle={{ height: 140 }} />

          <FormInput placeholder={'Form Input'} label={'Input Label'} />
          <FormInput placeholder={'Form Input'} label={'Input Label'} onPress={() => Alert.alert('test')} />

          <View style={styles.segmentTitleContainer} >
            <Text style={styles.segmentTitle}>Tags</Text>
            <MiniButton icon={global.icon_plus} size={20} />
          </View>
          <View style={[global.styles.tagsContainer, { marginBottom: 10 }]}>
            {
              this.state.listGroups.map(item => {
                return (
                  <View style={global.styles.tagItem}>
                    <Text style={global.styles.tagItemText}>{item}</Text>
                    <TouchableOpacity style={global.styles.tagCloseBtn} >
                      <Image style={global.styles.tagCloseImg} source={global.icon_wrong} />
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>

          <View style={styles.segmentTitleContainer} >
            <Text style={styles.segmentTitle}>Tags</Text>
            <MiniButton icon={global.icon_plus} size={20} />
          </View>
          <View style={[global.styles.tagsContainer, { marginBottom: 10 }]}>
            {
              this.state.listGroups.map(item => {
                return (
                  <View style={global.styles.tagItem}>
                    <Text style={global.styles.tagItemText}>{item}</Text>
                    <TouchableOpacity style={global.styles.tagCloseBtn} >
                      <Image style={global.styles.tagCloseImg} source={global.icon_wrong} />
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
        </KeyboardAwareScrollView>
        <FormButton text={'test'} style={global.styles.quickButtonsContainer}/>
        <ModalAlert
          isVisible={false}
          title={'Success!'}
          message={'This is an example success\nalert dialog box'}
          alertIcon={{
            icon: global.icon_wrong,
            color: global.color_red,
          }}
          buttons={[
            { text: 'OK', type: 'ok' },
          ]}
        />
        <ModalChecklist
          isVisible={false}
          title={'Select Tags'}
          list={[
            { text: 'Test', checked: true },
            { text: 'Test', checked: false },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: false },
            { text: 'Test', checked: false },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
            { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
              { text: 'Test', checked: true },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  segmentTitleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentTitle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: global.color_darkgray,
    marginRight: 5,
  },
});

const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { })(EditContact);
