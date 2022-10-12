
import React, { Component } from 'react';
import { View, Image, FlatList, TextInput, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
  getContactList,
  getContactsWithRatings,
} from '../actions';
import { 
  HeaderButton, 
  ContactItem, 
  IndicatorBottom,
} from '../common';
import {
  CONTACT_CONTACTLIST_LOADING,
  CONTACT_CONTACTSWITHRATINGS_LOADING,
  LISTTYPE_GROUPS,
  LISTTYPE_CAMPAIGNS,
  LISTTYPE_TAGS,
} from '../actions/types';

class EmailContactList extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      selected: [],
      contactsLimit: 20,
      contactsWithRatingsLimit: 20,

      datetime: '',

      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => {},
      alertListType: '',
      searchKeyword: '',

      showDatepicker: false,
    }
  }

  componentDidMount() {
    console.log('tags list');
    console.log(this.props.tagsList);
    
    this.renderNav();

    this.getContacts();
    //this.getContactsWithRatings();
  }

  renderNav() {

    this.props.navigation.setOptions({
      title: 'Select Contacts',
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_leftarrow} mode={this.props.settings.theme.mode}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>,
      headerRight: () =>
        <TouchableOpacity style={global.styles.headerButtonsContainer} onPress={() => this.addContacts()} >
          <Text style={{ 
            color: this.props.settings.theme.textPrimary, 
            fontSize: 16,
            fontWeight: '700',
            fontFamily: global.font_main,  
            marginRight: 10
          }}>Add</Text>
        </TouchableOpacity>
    });
  }

  addContacts() {
    if (this.props.route.params && this.props.route.params.onAddContacts) {
      this.props.route.params.onAddContacts(this.state.selected);
    }
    this.props.navigation.goBack();
  }

  getContacts() {
    let filter = {};
    if (this.state.alertListType === LISTTYPE_GROUPS && this.state.alertListSelected.length > 0) {
      filter = { groups: this.state.alertListSelected };
    } else if (this.state.alertListType === LISTTYPE_CAMPAIGNS && this.state.alertListSelected.length > 0) {
      filter = { campaigns: this.state.alertListSelected };
    } else if (this.state.alertListType === LISTTYPE_TAGS && this.state.alertListSelected.length > 0) {
      filter = { tags: this.state.alertListSelected };
    }

    filter = {
      ...filter,
      limit: this.state.contactsLimit,
      searchKeyword: this.state.searchKeyword,
    }
    console.log(filter);
    this.props.getContactList(filter);
  }



  toggleItem(c) {
    let selected = this.state.selected;
    if (selected.some(x => x.cid === c.cid)) {
      const indexToDelete = selected.findIndex(x => x.cid === cid);
      selected.splice(indexToDelete, 1);
    } else {
      selected.push(c);
    }
    this.setState({ selected });
  }

  onEndReached() {
    let limitDiff = 10;
    let list = [];
    list = this.props.contactsList;
    if (list.length >= this.state.contactsLimit) {
      this.setState({ contactsLimit: this.state.contactsLimit + limitDiff }, () => {
        this.getContacts();
      });
    }
  }

  render() {
    let list = this.props.contactsList;
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <View style={styles.searchContainer}>
          <View style={[styles.searchBoxContainer, { backgroundColor: this.props.settings.theme.inputBg }]} >
            <Image style={styles.searchIcon} source={global.icon_search} />
            <TextInput
              style={styles.textInput}
              placeholder={'Search'}
              placeholderTextColor={global.color_medgray}
              onChangeText={(searchKeyword) => {
                this.setState({ searchKeyword });
                if(this.searchWaiting) {
                  clearTimeout(this.searchWaiting);
                }
                this.searchWaiting = setTimeout(() => {
                  this.getContacts();
                }, 600);

              }}
              value={this.state.searchKeyword}
              returnKeyType={'search'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={() => this.getContacts()}
              clearButtonMode={'always'}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            return (
              <ContactItem
              disabled={!item.email || this.email === ''}
              textColor={this.props.settings.theme.textPrimary}
              checkColor={this.props.settings.theme.bgSecondary}
              active={this.state.selected.some(x => x.cid === item.cid)}
              title={item.first_name + ' ' + item.last_name}
              separatorColor={this.props.settings.theme.separator}
              onPress={() => this.toggleItem(item)}
              onPressCheckbox={() => {
                this.toggleItem(item);
              }}
              // showRatings={item.rating && item.rating > 0}
              // rating={item.rating}
              email={item.email}
              hideArrow
              />
            )
          }}
        />
        {
          this.props.contactsStatus === CONTACT_CONTACTLIST_LOADING
          || this.props.contactsStatus === CONTACT_CONTACTSWITHRATINGS_LOADING ?
          <IndicatorBottom dark={this.props.settings.theme.mode==='dark'} /> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBoxContainer: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: global.color_medgray,
    marginLeft: 15,
    marginRight: 10,
    position: 'absolute'
  },
  textInput: {
    fontFamily: global.font_main,
    fontSize: 18,
    color: global.color_darkgray,
    paddingLeft: 40,
    flex: 1,
  },
});


const mapStateToProps = ({ settings, contacts, }) => {
  const { contactsStatus, contactsError, contactsList, contactInfo, contactsWithRatings } = contacts;
  return {
    settings,
    contactsStatus, contactsError, contactsList, contactInfo, contactsWithRatings,
  };
};

export default connect(mapStateToProps, {
  getContactList,
  getContactsWithRatings,
})(EmailContactList);

