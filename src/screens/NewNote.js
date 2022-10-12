
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InputAccessoryView,
  Button,
  Keyboard,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { saveNote, editNote, deleteNote } from '../actions';
import {
  FormInput,
  FormButton,
  HeaderButton,
  ModalAlert,
} from '../common';
import {
  NOTES_ADDNOTE_LOADING,
  NOTES_ADDNOTE_SUCCESS,
  NOTES_ADDNOTE_FAIL,
  NOTES_EDITNOTE_LOADING,
  NOTES_EDITNOTE_SUCCESS,
  NOTES_EDITNOTE_FAIL,
  NOTES_DELETENOTE_LOADING,
  NOTES_DELETENOTE_SUCCESS,
  NOTES_DELETENOTE_FAIL,
} from '../actions/types';

class NewNote extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isButtonCliked: false,
      showModalDelete: false,
    }
    this.inputAccessoryViewID = 'uniqueID';
  }

  componentDidMount() {
    let title = 'New Note';
    if (this.props.route.params && this.props.route.params.note) {
      title = 'Edit Note';
      setTimeout(() => {
        this.setState({ content: this.props.route.params.note.content });
      }, 200);
    }

    this.props.navigation.setOptions({
      title: title,
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_leftarrow} mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>,
    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactsStatus === NOTES_ADDNOTE_SUCCESS ||
    nextProps.contactsStatus === NOTES_EDITNOTE_SUCCESS ||
    nextProps.contactsStatus === NOTES_DELETENOTE_SUCCESS) {
      this.props.route.params.onNavigateBack();
      this.props.navigation.goBack();
    }

  }

  saveNote() {
    console.log(this.state.content, 'this.state.content');
    this.setState({ isButtonCliked: true });
    if (this.props.route.params && this.props.route.params.cid) {
      if (this.props.route.params.note) {
        // EDIT NOTE
        this.props.editNote({
          cid: this.props.route.params.cid,
          nid: this.props.route.params.note.nid,
          content: this.state.content,
        });
      } else {
        // ADD NEW NOTE
        this.props.saveNote({
          cid: this.props.route.params.cid,
          content: this.state.content,
        });
      }
    }
  }

  deleteNote() {
    if (this.props.route.params && this.props.route.params.cid && this.props.route.params.note) {
      this.props.deleteNote({
        cid: this.props.route.params.cid,
        nid: this.props.route.params.note.nid,
      });
    }
  }


  render() {
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 150 }}
        >
          <FormInput
            hideLabel
            multiline
            placeholder={'Type your notes'}
            value={this.state.content}
            onChangeText={(content) => this.setState({ content })}
            autoCapitalize={'sentences'}
            textColor={this.props.settings.theme.textPrimary}
            bgColor={this.props.settings.theme.inputBg}
            inputContainerStyle={{ height: null, minHeight: 200 }}
            textStyle={{ fontSize: 18 }}
            inputAccessoryViewID={this.inputAccessoryViewID}
          />
        </KeyboardAwareScrollView>
        <View style={[global.styles.quickButtonsContainer, { flexDirection: 'column', width: '100%'  }]} >
          <FormButton
            text={'Save'}
            style={{ }}
            disabled={this.state.isButtonCliked ? true : false}
            textColor={this.props.settings.theme.bgPrimary}
            onPress={() => this.saveNote()}/>
            {
              this.props.route.params && this.props.route.params.cid && this.props.route.params.note ?
              <FormButton
                text={'Delete'}
                style={[{ backgroundColor: global.color_red, marginTop: 0 }]}
                textColor={this.props.settings.theme.bgPrimary}
                onPress={() => this.setState({ showModalDelete: true })}
              />
                : null
            }
        </View>

        <ModalAlert
        onBackdropPress={() => this.setState({ showModalDelete: false })}
        isVisible={this.state.showModalDelete}
        title={'Delete Note'}
        message={'Are you sure you want to delete this note?'}
        alertIcon={this.state.alertIcon}
        buttons={[
          { text: 'Cancel', onPress: () => this.setState({ showModalDelete: false }), type: 'cancel' },
          { text: 'Delete', onPress: () => {
            this.setState({ showModalDelete: false });
            this.deleteNote();
          }},
        ]}
        dark={this.props.settings.theme.mode==='dark'}
        bgColor={this.props.settings.theme.bgPrimary}
        textColor={this.props.settings.theme.textPrimary}
        />
        {
          Platform.OS === 'android' ? null :
        <InputAccessoryView nativeID={this.inputAccessoryViewID}>
          <View style={{
            backgroundColor: this.props.settings.theme.bgSecondary,
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
            flexDirection: 'row'
          }}>
            <Button
              onPress={() => Keyboard.dismiss()}
              title="Done"
              color={global.color_theme}
            />
          </View>
        </InputAccessoryView>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ settings, contacts }) => {
  const { contactInfo, contactsStatus, contactsError } = contacts;
  return {
    settings,
    contactInfo, contactsStatus, contactsError,
  };
};

export default connect(mapStateToProps, { saveNote, editNote, deleteNote })(NewNote);
