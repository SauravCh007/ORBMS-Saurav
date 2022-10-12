
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { connect } from 'react-redux';

import {
  TaskItem,
} from '../common';

class CalendarTask extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      listGroups: [
        'Task sample 1', 'Task sample 2', 'Task sample 3', 'Task sample 4',
      ],
    }
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Calendar & Tasks',
    })
  }

  render() {
    return (
      <View style={[global.styles.screenContainer, { backgroundColor: this.props.settings.theme.bgSecondary }]} >
        <CalendarList
          theme={{
            calendarBackground: 'transparent',
               textSectionTitleColor: '#b6c1cd',
               textSectionTitleDisabledColor: '#d9e1e8',
               todayTextColor: global.color_theme,
                arrowColor: global.color_theme,
          }}
          current={'2020-08-04'}
          selected={'2020-08-04'}
          calendarWidth={global.deviceWidth}
          hideArrows={false}
          //scrollEnabled={true}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
          '2020-08-04': {marked: true, dotColor: 'red', activeOpacity: 0 },
            '2020-08-16': {selected: true, marked: true, selectedColor: global.color_theme},
            '2020-08-17': {marked: true},
          }}
          />
        <View style={{ flex: 1, backgroundColor: global.color_ltgray }} >
          <FlatList
            style={{ marginHorizontal: 0 }}
            contentContainerStyle={[{  }]}
            data={this.state.listGroups}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({ item, index }) => {
              const active = false;
              return (
                <TaskItem
                  title={item}
                  //subtitle={'January 1, 2020'}
                  active={index%2===0}
                />
              )
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings
  };
};

export default connect(mapStateToProps, { })(CalendarTask);
