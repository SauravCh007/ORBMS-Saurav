
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Alert,
  BackHandler,
  RefreshControl
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import { 
  HeaderButton, 
  ContactItem, 
  QuickButton, 
  IndicatorBottom, 
  ModalBottom, 
  ModalChecklist, 
  ModalAlert,
  FilterButton 
} from '../common';
import { ContactDetails } from './ContactDetails';
import '../utils/Global';
import {
  setContactInfo,
  getContactList,
  getContactsWithRatings,
  getGroups,
  getCampaigns,
  getTags,
  setSearchKey,
  deleteContact,
} from '../actions';
import {
  CONTACT_CONTACTLIST_LOADING,
  CONTACT_CONTACTSWITHRATINGS_LOADING,
  CONTACT_DELETECONTACT_SUCCESS,
  CONTACT_DELETECONTACT_LOADING,
  LISTTYPE_GROUPS,
  LISTTYPE_CAMPAIGNS,
  LISTTYPE_TAGS,
} from '../actions/types';

class Contacts extends Component {
  _isMounted = false;
  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      console.log("params",params)
      return params;
      
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { index: 0, key: 'all', title: 'All' },
        { index: 1, key: 'favorites', title: 'Favorites' },
        // { index: 2, key: 'recent', title: 'Recent' },
      ],
      selected: [],
      contactsLimit: 20,
      contactsWithRatingsLimit: 20,

      showFilter: false,

      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => {},
      alertListType: '',
      searchKeyword: '',

      // MODAL ALERT
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      alertButtons: [{ text: 'OK', onPress: () => this.setState({ alertVisible: false })}],
      alertIcon: null,

      multiActionsCount: 0,

    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      // console.log(this.props,'******************');
      console.log(this.props,'contactData');
      // if(typeof this.props.route.params != 'undefined' || this.props.route.params.selectInfo.length > 0) {
      //   this.setState({
      //     selected: this.props.route.params.selectInfo
      //   })
      // }
      console.log('tags list');
      console.log(this.props.tagsList);
      const {navigation} = this.props;
      navigation.setOptions({
        /*
        headerLeft: () =>
          <View style={global.styles.headerButtonsContainer}>
            <HeaderButton icon={global.icon_numpad} mode={this.props.settings.theme.mode} />
            <HeaderButton icon={global.icon_newsms} mode={this.props.settings.theme.mode}  />
          </View>,
          */
        headerLeft: () => <View />,
        headerRight: () =>
          <View style={global.styles.headerButtonsContainer}>
            <HeaderButton
              icon={global.icon_plus}
              style={{ padding: 10 , color:'#696969'}}
              mode={this.props.settings.theme.mode}
              onPress={() => this.addContact()}
            />
          </View>
      });
      //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      this.refresh();
    }
  }

  refresh(flag=0) {
    console.log(flag, 'flag===>>>>');
    if(flag == 0) {
      this.getContacts();
      this.getContactsWithRatings();
    } else {
      this.getContacts(1);
      this.getContactsWithRatings(1);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

//  useEffect(() => {
//     let isMounted = true;               // note mutable flag
//     someAsyncOperation().then(data => {
//       if (isMounted) setState(data);    // add conditional check
//     })
//     return () => { isMounted = false }; // cleanup toggles value, if unmounted
//   }, []); 


  handleBackButton() {
      return true;
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.contactsStatus === CONTACT_DELETECONTACT_SUCCESS) {
      if (this.state.multiActionsCount <= 1) {
        this.setState({ multiActionsCount: 0 });
        this.refresh(1);
      } else {
        this.setState({ multiActionsCount: this.state.multiActionsCount - 1 });
      }
    }
    
  }

  getContacts(flag=0) {
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
      searchKeyword: this.props.contacts.contactsSearchKey, // this.state.searchKeyword,
    }
    console.log("filter",filter);
    this.props.getContactList(filter, flag);
  }

  getContactsWithRatings(flag=0) {
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
      limit: this.state.contactsWithRatingsLimit,
      searchKeyword: this.state.searchKeyword,
      searchKeyword: this.props.contacts.contactsSearchKey,
    }
    console.log("props",this.props)
    this.props.getContactsWithRatings(filter, flag);
  }

  addContact() {
    this.props.navigation.navigate('ContactAdd', {
      title: 'Add New Contact',
      user: null,
    })
  }

  renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      onTabLongPress={(scene) => {
        const { route } = scene
        props.jumpTo(route.key)
      }}
      indicatorStyle={{ backgroundColor: global.color_theme, height: 40, borderRadius: 20, }}
      style={{ marginHorizontal: 20, backgroundColor: 'transparent', height: 44, marginBottom: 15 }}
      tabStyle={{ paddingHorizontal: 20, width: 'auto' }}
      labelStyle={{ fontSize: 14, fontWeight: '600', fontFamily: 'Montserrat-Regular', textTransform: 'capitalize', margin: 0 }}
      activeColor={this.props.settings.theme.bgPrimary}
      inactiveColor={this.props.settings.theme.textSecondary}
    />
  );

  toggleItem(item) {
    let selected = this.state.selected;
    //if (selected.includes(cid)) {
    if (selected.some(x => x.cid === item.cid)) {
      const indexToDelete = selected.findIndex(x => x.cid === item.cid);
      selected.splice(indexToDelete, 1);
    } else {
      selected.push(item);
    }
    this.setState({ selected });
  }

  onEndReached() {
    let limitDiff = 10;
    let list = [];
    switch (this.state.index) {
      case 0:
        list = this.props.contactsList;
        if (list.length >= this.state.contactsLimit) {
          this.setState({ contactsLimit: this.state.contactsLimit + limitDiff }, () => {
            this.getContacts();
          });
        }
        break;
      case 1:
        list = this.props.contactsWithRatings;
        if (list.length >= this.state.contactsWithRatingsLimit) {
          this.setState({ contactsWithRatingsLimit: this.state.contactsWithRatingsLimit + limitDiff }, () => {
            this.getContactsWithRatings();
          });
        }

        break;
      default:

    }
  }

  pageRefresh() {
    this.getContacts(1);
    this.getContactsWithRatings(1);
  }

  renderScene = ({ route }) => {
    let contactFilter = {};
    let contactRatingFilter = {};
    if (this.state.alertListType === LISTTYPE_GROUPS && this.state.alertListSelected.length > 0) {
      contactFilter = { groups: this.state.alertListSelected };
      contactRatingFilter = { groups: this.state.alertListSelected };
    } else if (this.state.alertListType === LISTTYPE_CAMPAIGNS && this.state.alertListSelected.length > 0) {
      contactFilter = { campaigns: this.state.alertListSelected };
      contactRatingFilter = { campaigns: this.state.alertListSelected };
    } else if (this.state.alertListType === LISTTYPE_TAGS && this.state.alertListSelected.length > 0) {
      contactFilter = { tags: this.state.alertListSelected };
      contactRatingFilter = { tags: this.state.alertListSelected };
    }

    contactRatingFilter = {
      ...contactRatingFilter,
      limit: this.state.contactsWithRatingsLimit,
      searchKeyword: this.state.searchKeyword,
    };

    contactFilter = {
      ...contactFilter,
      limit: this.state.contactsLimit,
      searchKeyword: this.props.contacts.contactsSearchKey, // this.state.searchKeyword,
    };

    let list = [];
    switch (route.key) {
      case 'all':
        list = this.props.contactsList;
        break;
      case 'favorites':
        list = this.props.contactsWithRatings;
        break;
      default:

    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
        nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              tintColor={global.color_theme2}
              onRefresh={() => this.pageRefresh()}
              refreshing={false}
              progressViewOffset = {1}
            />}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            // console.log(item, '1',this.state.selected, '2', contactFilter, '3', contactRatingFilter, 'contactRatingFilter');
            return (
              <ContactItem
              textColor={this.props.settings.theme.textPrimary}
              checkColor={this.props.settings.theme.bgSecondary}
              active={this.state.selected.some(x => x.cid === item.cid)}
              title={item.first_name + ' ' + item.last_name}
              separatorColor={this.props.settings.theme.separator}
              onPress={() => {
                this.props.setContactInfo({ contactInfo: item});
                this.props.navigation.navigate('ContactDetails', {
                  contactInfo: item,
                  selectInfo: this.state.selected,
                  contact: contactFilter,
                  contactWithRating: contactRatingFilter
                })
              }}
              onPressCheckbox={() => {
                this.toggleItem(item);
              }}
              showRatings={item.rating && item.rating > 0}
              rating={item.rating}
              />
            )
          }}
        />
      </View>
    )
  }

  toggleAlertList(id) {
    let selected = this.state.alertListSelected;
    if (selected.includes(id)) {
      const index = selected.indexOf(id);
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({ alertListSelected: selected });
  }

  renderAlertList() {
    let list = [];
    // ssAlert.alert(this.state.alertListType);
    switch (this.state.alertListType) {
      case LISTTYPE_GROUPS:
        this.props.groupsList.map(item => {
          list.push({
            text: item.name,
            checked: this.state.alertListSelected.includes(item.gid),
            onPress: () => this.toggleAlertList(item.gid)
          })
        });
        break;
      case LISTTYPE_CAMPAIGNS:
        this.props.campaignsList.map(item => {
          list.push({
            text: item.name,
            checked: this.state.alertListSelected.includes(item.cp_gid),
            onPress: () => this.toggleAlertList(item.cp_gid)
          })
        });
        break;
      case LISTTYPE_TAGS:
        this.props.tagsList.map(item => {
          list.push({
            text: item.tag,
            checked: this.state.alertListSelected.includes(item.tag),
            onPress: () => this.toggleAlertList(item.tag)
          })
        });
        break;
      default:

    }
    // Alert.alert(JSON.stringify(list));
    return list;
  }

  setFilter(type) {
    let title = '';
    switch (type) {
      case LISTTYPE_GROUPS:
        title = 'Filter by Groups';
        this.props.getGroups();
        break;
      case LISTTYPE_CAMPAIGNS:
        title = 'Filter by Campaigns';
        this.props.getCampaigns();
        break;
      case LISTTYPE_TAGS:
        title = 'Filter by Tags';
        this.props.getTags();
        break;
      default:

    }
    this.setState({
      showFilter: false,
      alertListData: type !== this.state.alertListType ? [] : this.state.alertListData,
    });
    setTimeout(() => {
      this.setState({
        alertListVisible: true,
        alertListTitle: title,
        alertListData: [],
        alertListSelected: this.state.alertListType === type ? this.state.alertListSelected : [],
        alertListType: type,
        alertListSave: () => {}
      });

    }, 500);
  }

  applyFilter() {
    this.getContacts(1);
    // Alert.alert(`${this.state.alertListType}`);
    this.setState({ alertListVisible: false });
  }

  clearFilter() {
    this.setState({
      showFilter: false,
      alertListVisible: false,
      alertListTitle: '',
      alertListData: [],
      alertListSelected: [],
      alertListSave: () => {},
      alertListType: '',
      searchKeyword: '',
    }, () => this.getContacts(1));
  }

  applySearch() {
    console.log('apply search');
    this.getContacts(1);
    this.getContactsWithRatings(1);
  }

  hasFilter() {
    const { alertListSelected, alertListType } = this.state;
    if (alertListType && alertListType !== '' && alertListSelected.length > 0) {
      return true;
    }
    return false;
  }

  deleteSelected() {
    this.setState({ multiActionsCount: this.state.selected.length });
    this.state.selected.forEach(item => {
      this.props.deleteContact({ cid: item.cid });
    });
    this.setState({ selected: [] });
  }

  emailSelected() {
    let contactsWithEmails = [];
    this.state.selected.forEach(item => {
      if (item.email && item.email !== '') {
        contactsWithEmails.push(item);
      }
    });
    if (contactsWithEmails.length > 0) {
      this.props.navigation.navigate('EmailComposeStack', {
        screen: 'EmailCompose',
        params: { contacts: contactsWithEmails }
      })
    }
  }

  render() {
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
                // this.setState({ searchKeyword });
                this.props.setSearchKey(searchKeyword);
                if(this.searchWaiting) {
                  clearTimeout(this.searchWaiting);
                }
                this.searchWaiting = setTimeout(() => {
                  this.applySearch();
                }, 600);

              }}
              value={this.props.contacts.contactsSearchKey}
              returnKeyType={'search'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={() => this.applySearch()}
              clearButtonMode={'always'}
            />
          </View>
          <FilterButton
            bgColor={this.hasFilter() ? global.color_theme : 'rgba(0,0,0,0.05)' }
            tintColor={this.hasFilter() ? this.props.settings.theme.bgPrimary : this.props.settings.theme.textSecondary } 
            onPress={() =>{
              this.setState({ showFilter: true })
            }}
            icon={global.icon_filter}
            />
        </View>
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={index => this.setState({ index })}//this.changeIndex(index)}
        />
        {
          this.state.selected.length > 0 ?
          <View style={global.styles.quickButtonsContainer}>
            <QuickButton 
              icon={global.icon_email} 
              color={global.color_blue} 
              tintColor={this.props.settings.theme.bgPrimary} 
              onPress={() => this.emailSelected()}
              />
            <QuickButton 
              icon={global.icon_delete} 
              color={global.color_red} 
              tintColor={this.props.settings.theme.bgPrimary} 
              onPress={() => {
                this.setState({
                  alertVisible: true,
                  alertTitle: `Delete contact${this.state.selected.length === 1 ? '' : 's'}`,
                  alertMessage: `Are you sure you want to delete ${this.state.selected.length === 1 ? 'this contact' : 'these contacts'}?`,
                  alertButtons: [
                    { text: 'YES', onPress: () => { 
                      this.setState({ alertVisible: false });
                      this.deleteSelected();
                    }},
                    { text: 'Cancel', onPress: () => this.setState({ alertVisible: false, }), type: 'cancel' }
                  ],
                  alertIcon: null,
                })
              }}
              />
          </View>
          : null
        }
        {
          this.props.contactsStatus === CONTACT_CONTACTLIST_LOADING
          || this.props.contactsStatus === CONTACT_DELETECONTACT_LOADING
          || this.props.contactsStatus === CONTACT_CONTACTSWITHRATINGS_LOADING ?
          <IndicatorBottom dark={this.props.settings.theme.mode==='dark'} /> : null
        }
        <ModalBottom
          isVisible={this.state.showFilter}
          dark={this.props.settings.theme.mode === 'dark'}
          list={[
            { text: 'By Groups', onPress: () => this.setFilter(LISTTYPE_GROUPS), checked: this.state.alertListType===LISTTYPE_GROUPS },
            { text: 'By Campaigns', onPress: () => this.setFilter(LISTTYPE_CAMPAIGNS), checked: this.state.alertListType===LISTTYPE_CAMPAIGNS },
            { text: 'By Tags', onPress: () => this.setFilter(LISTTYPE_TAGS), checked: this.state.alertListType===LISTTYPE_TAGS },
          ]}
          title={'Filter Options'}
          buttons={[
            { text: 'Clear Filter', color: global.color_theme, onPress: () => this.clearFilter() },
            { text: 'Cancel', type: 'cancel', onPress: () => this.setState({ showFilter: false }) },
          ]}
          bgColor={this.props.settings.theme.mode === 'light' ? this.props.settings.theme.bgPrimary : this.props.settings.theme.bgTertiary}
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalChecklist
          isVisible={this.state.alertListVisible && this.state.alertListType !== ''}
          title={this.state.alertListTitle}
          onBackdropPress={() => this.setState({ alertListVisible: false })}
          list={this.renderAlertList()}
          onPressSave={() => this.applyFilter()}
          saveText={'Apply Filter'}
          bgColor={this.props.settings.theme.mode === 'light' ? this.props.settings.theme.bgPrimary : this.props.settings.theme.bgTertiary}
          textColor={this.props.settings.theme.textPrimary}
        />

        <ModalAlert
          onBackdropPress={() => this.setState({ alertVisible: false })}
          isVisible={this.state.alertVisible}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          alertIcon={this.state.alertIcon}
          buttons={this.state.alertButtons}
          dark={this.props.settings.theme.mode==='dark'}
          bgColor={this.props.settings.theme.bgPrimary}
          textColor={this.props.settings.theme.textPrimary}
          />


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
  filterButton: {
    width: 50,
    height: 50,
    padding: 13,
    borderRadius: 13,
    backgroundColor: global.color_theme,
    marginLeft: 10,
  },
  filterIcon: {
    tintColor: global.color_white,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

const mapStateToProps = ({ settings, contacts, groups, campaigns, tags }) => {
  const { contactsStatus, contactsError, contactsList, contactInfo, contactsWithRatings } = contacts;
  const { groupsStatus, groupsError, groupsList } = groups;
  const { campaignsStatus, campaignsError, campaignsList } = campaigns;
  const { tagsStatus, tagsError, tagsList } = tags;
  return {
    settings,
    contacts,
    contactsStatus, contactsError, contactsList, contactInfo, contactsWithRatings,
    groupsStatus, groupsError, groupsList,
    campaignsStatus, campaignsError, campaignsList,
    tagsStatus, tagsError, tagsList,
  };
};

export default connect(mapStateToProps, {
  setContactInfo,
  getContactList,
  getContactsWithRatings,
  getGroups,
  getCampaigns,
  getTags,
  setSearchKey,
  deleteContact,
})(Contacts);
