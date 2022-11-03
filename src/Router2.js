
import React, { Component } from 'react';
import { View, Text, Image, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { getSettings, setAppMode } from './actions';
import {
  HomeScreen,
  Contacts,
  ContactDetails,
  ContactAdd,
  PhoneAndText,
  Emails,
  CalendarTask,
  Menu,
  EditContact,
  SignIn,
  SignUp,
  StartScreen,
  EmailCompose,
  EmailDetails,
  CreateScreen,
  NewTask,
  TaskList,
  NewTaskContacts,
  NewNote,
  EditAccountInfo,
  EditSignature,
  EmailContactList,
  PasswordReset,
  PasswordChange,
  SplashScreen,
  TutorialScreen,
} from './screens';
import './utils/Global';
import Login from './screens/Login';


class Router2 extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getSettings();

    if (Platform.OS !== 'ios' && this.props.settings.theme.mode !== 'light') {
      setTimeout(() => this.props.setAppMode({ mode: 'light' }), 500)
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          //screenOptions={{ ...transparentNavbar, headerLeft: null }}
          //screenOptions={transparentNavbar}
          mode={'modal'} >
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="MainStack"  options={{headerShown: false}} component={MainStack} initialParams={{ theme: this.props.settings.theme }} />
          <Stack.Screen name="PasswordResetStack"  options={{headerShown: false}} component={PasswordResetStack} initialParams={{ theme: this.props.settings.theme }} />
          <Stack.Screen name="EmailComposeStack"  options={{headerShown: false}} component={EmailComposeStack} initialParams={{ theme: this.props.settings.theme }} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbar}  >
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ ...transparentNavbar, headerLeft: null }} initialParams={{ theme: route.params.theme }}  />

      <Stack.Screen name="ContactAdd" component={ContactAdd} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="EditContact" component={EditContact} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} 
        //options={transparentNavbar}
         />
      <Stack.Screen name="EmailDetails" component={EmailDetails} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="NewNote" component={NewNote} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="NewTask" component={NewTask} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="TaskList" component={TaskList} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="EditAccountInfo" component={EditAccountInfo} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="EditSignature" component={EditSignature} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} options={commonNavbarDynamic(route.params.theme)} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} options={transparentNavbar} />

      <Stack.Screen name="NewTaskContacts" component={NewTaskContacts} />
    </Stack.Navigator>
  )
}


function MainTabs({ navigation, route }) {           // - 5 SCREENS
  return (
    <Tab.Navigator
      tabBarOptions={commonTabBarOptionsDynamic(route.params.theme)}
    >
      <Tab.Screen name={'ContactsStack'}
        component={ContactsStack}
        initialParams={{ theme: route.params.theme }}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} theme={route.params.theme} icon={global.icon_contacts} title={'Contacts'} />
        })} />
      <Tab.Screen name={'EmailStack'} component={EmailStack}
        initialParams={{ theme: route.params.theme }}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} theme={route.params.theme} icon={global.icon_email} title={'Emails'} />
        })} />
      <Tab.Screen name={'CalendarStack'} component={CalendarStack}
        initialParams={{ theme: route.params.theme }}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} theme={route.params.theme} icon={global.icon_calendar} title={'Calendar'} />
        })} />
      <Tab.Screen name={'MenuStack'} component={MenuStack}
        initialParams={{ theme: route.params.theme }}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} theme={route.params.theme} icon={global.icon_menu} title={'Menu'} />
        })} />
    </Tab.Navigator>
  )
}


function EmailComposeStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="EmailCompose" component={EmailCompose} />
      <Stack.Screen name="EmailContactList" component={EmailContactList} />
    </Stack.Navigator>
  );
}

function PasswordResetStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
}

function ContactsStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="Contacts" component={Contacts} />
    </Stack.Navigator>
  );
}

function PhoneTextStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="PhoneAndText" component={PhoneAndText} />
    </Stack.Navigator>
  );
}

function EmailStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="Emails" component={Emails} />
    </Stack.Navigator>
  );
}

function CalendarStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="CalendarTask" component={CalendarTask} />
    </Stack.Navigator>
  );
}

function MenuStack({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={commonNavbarDynamic(route.params.theme)} >
      <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
    </Stack.Navigator>
  );
}

// ============================================


const TabBarIcon = ({
  focused,
  icon,
  title='',
  theme,
  showNotif,
}) => {
  return (
    focused ?
    <View style={styles.tabIconActiveContainer}>
      <Image source={theme && theme.mode === 'dark' ? global.img_navbg2 :global.img_navbg} style={styles.tabIconActiveBg} />
      <View style={styles.tabIconActive}>
        <Image source={icon} style={[global.styles.imgContain, {tintColor: theme ? theme.bgPrimary : global.color_white}]} />
        {
          showNotif ? <Notif borderColor={global.color_theme} active  /> : null
        }
      </View>
    </View>
    :
    <View style={styles.tabIconInactiveContainer}>
      <View style={styles.tabIconInactive} >
        <Image source={icon} style={[global.styles.imgContain, {tintColor: global.color_gray}]} />
        
        {
          showNotif ? <Notif borderColor={theme.bgPrimary} /> : null
        }
      </View>
    </View>
  )
}

const Notif = ({ borderColor, active }) => {
  return (
    <View style={{
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: active ? global.color_white : global.color_red,
      position: 'absolute',
      right: active ? 8 : -6,
      top: active ? 10 : -3,
      borderColor: borderColor,
      borderWidth: 2,
    }} />
  )
}


const commonTabBarOptions = {
  inactiveTintColor: global.color_gray,
  showLabel: false,
  style: {
    borderTopColor: 'transparent',
    borderTopWidth: 0,
    backgroundColor: 'white',
  }
}

const commonTabBarOptionsDynamic = (theme) => {
  return {
    inactiveTintColor: global.color_gray,
    showLabel: false,
    style: {
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      backgroundColor: theme ? theme.bgPrimary : 'white',
    }
  }
}

const commonNavbarDynamic = (theme) => {
  let newNavbar = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme ? theme.bgSecondary : global.color_ltgray,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
      // elevation: 0,       //remove shadow on Android
      // shadowOpacity: 0,   //remove shadow on iOS
    },
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat-Regular',
      fontWeight: '700',
      fontSize: 24,
      bottom: 0,
      color: theme ? theme.textPrimary : global.color_darkgray,
    },
    headerBackTitle: ' ',
  }
  return newNavbar;
}

const commonNavbar = {
  headerShown: true,
  headerStyle: {
    backgroundColor: global.color_ltgray,
    shadowRadius: 0,
    shadowOffset: {
        height: 0,
    },
    // elevation: 0,       //remove shadow on Android
    // shadowOpacity: 0,   //remove shadow on iOS
  },
  headerTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: 24,
    bottom: 0,
    color: global.color_darkgray,
  },
  headerBackTitle: ' ',
};

const transparentNavbar = {
  title: ' ',
  headerTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  }
};

const styles = {
  tabiconStyle: {
    width: 20,
    height: 20 ,
    resizeMode: 'contain',
  },
  tabIconInactiveContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  tabIconInactive: {
    width: 20,
    height: 20,
  },
  tabIconActiveContainer: {
    alignItems: 'center',
  },
  tabIconActiveBg: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 50,
    resizeMode: 'stretch',
  },
  tabIconActive: {
    width: 50,
    height: 50,
    borderRadius: 30,
    padding: 14,
    backgroundColor: global.color_theme,
    shadowColor: '#432587',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    top: -15,
  },
  notifStyle: {
    
  }
}


const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { getSettings, setAppMode })(Router2);
9002610316