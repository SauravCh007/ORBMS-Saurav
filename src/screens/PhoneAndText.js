
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { HeaderButton, QuickButton, MessageItem } from '../common';
import { connect } from 'react-redux';

class PhoneAndText extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { index: 0, key: 'messages', title: 'Messages' },
        { index: 1, key: 'calls', title: 'Calls' },
      ],
      dummyData: [
        1,0,1,0,0,0,0,1,1,1,
      ]
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Phone & Text',
      headerLeft: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_snooze} mode={this.props.settings.theme.mode} />
        </View>,
      headerRight: () =>
        <View style={global.styles.headerButtonsContainer}>
          <HeaderButton icon={global.icon_dots} mode={this.props.settings.theme.mode} />
        </View>
    });
  }

  renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      // scrollEnabled
      onTabLongPress={(scene) => {
        const { route } = scene
        props.jumpTo(route.key)
      }}
      indicatorStyle={{ backgroundColor: global.color_theme, height: 40, borderRadius: 20, }}
      style={{ marginHorizontal: 20, backgroundColor: 'transparent', height: 44, marginBottom: 10 }}
      // tabStyle={{ paddingHorizontal: 24, width: 'auto' }}
      labelStyle={{ fontSize: 14, fontWeight: '600', fontFamily: 'Montserrat-Regular', textTransform: 'capitalize', margin: 0 }}
      activeColor={this.props.settings.theme.bgPrimary}
      inactiveColor={this.props.settings.theme.textSecondary}
    />
  );


  renderScene = ({ route }) => {
    return (
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={this.state.dummyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `list-item-${index}`}
          removeClippedSubviews={false}
          renderItem={({ item }) => {
            const active = item && item === 1;
            return (
              <MessageItem
              active={active}
              sender={'Sender Name here'}
              message={'The content fo the email shows preview of the content, the example'}
              timestamp={'7:18 PM'}
              initials={'SN'}
              separatorColor={this.props.settings.theme.separator}
              textColor={this.props.settings.theme.textPrimary}
              unread
               />
            )
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          style={{ marginTop: 10 }}
          onIndexChange={index => this.setState({ index })}//this.changeIndex(index)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { })(PhoneAndText);
