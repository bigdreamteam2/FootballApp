import React, { Component } from "react";
import { Content, ScrollView, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage, Platform, Animated  } from "react-native";
import { Container, List, ListItem, Left, Body, Thumbnail, Text, Right, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import { Toolbar } from 'react-native-material-ui';
import FooterCustom from '../../screens/common/footer_new';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/fr';
import { translate } from 'react-i18next';
import i18n from 'i18next';
import DienBienAPI from '../../api/index';
import IconFE from 'react-native-vector-icons/Feather';
import styles from "./styles";
import MatchPage1 from "./page1";
import MatchPage2 from "./page2";
import MatchPage3 from "./page3";

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Matches extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navIndex: 1,
      title: 'home:title',
      currentDate: moment().locale('en').utc('+07:00'),
      numberOfAccesses: 0,
      datasBooking: [],
      message: ""
    };
  }

  componentDidMount() {
    const { t, i18n } = this.props;
    this.setState({
      currentDate: moment().locale(t('home:language')).utc('+07:00'),
    });
  }

  async getDatasBooking() {
    var url = DienBienAPI.getServerURL() + '/wp-json/v2/upcoming-events'
    try {
        let response = await fetch(
            url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        )
        let responseJson = await response.json();
        if (responseJson && responseJson.length > 0) {
            this.setDataToList(responseJson);
            this.setState({
                datasBooking: responseJson,
                message: ""
            });
        } else {
            this.setState({
                datasBooking: [],
                message: "Bạn chưa booking dịch vụ nào."
            });
        }
    } catch (error) {
        this.setState({
            datasBooking: [],
            message: "Bạn chưa booking dịch vụ nào."
        });
    }
  }
  setDataToList(listData) {
    var current_date = this.state.current_date, list_new = [], list_now = [], list_old = [];
    for (var i = 0; i < listData.length; i++) {
        let dateStart = this.convertDate(listData[i].events_start_date);
        let dateEnd = this.convertDate(listData[i].events_end_date);
        dateStart = moment(dateStart).utc('+07:00');
        dateEnd = moment(dateEnd).utc('+07:00');
        if (dateStart > current_date) {
            list_new.push(listData[i]);
        } else if (dateEnd < current_date && dateEnd.format('YYYY-MM-DD') != current_date.format('YYYY-MM-DD')) {
            list_old.push(listData[i]);
        } else {
            list_now.push(listData[i]);
        }
    }
    this.setState({
        list_new: list_new,
        list_now: list_now,
        list_old: list_old
    })
  };

  onPressTab = (index) => {
    switch (index) {
      case 1:
        this.props.navigation.navigate('matches');
        break;
      case 2:
        // this.props.navigation.navigate('SR100');
        break;
      case 3:
        this.props.navigation.navigate('home');
        break;
      case 4:
        // this.props.navigation.navigate('HomeBooking');
        break;
      case 5:
        // this.props.navigation.navigate('HomeInformation');
        break;
    }

  }

  render() {
    const { t, i18n } = this.props;
    return (
      <Container style={styles.container}>
        <ScrollableTabView
            style={[{width: '100%', flex: 1, width: '100%', paddingTop: 20}]}
            renderTabBar={() => <TabBar
            inactiveTextColor="#FFF"
            activeTextColor="#FFF"
            style={[{borderBottomColor:'#000000', borderBottomWidth:0}]}
            underlineColor="#FFF" 
            activeTabTextStyle={[{fontWeight: 'bold'}]}
            tabStyles={{tab:{marginLeft: 10, marginRight: 10, paddingBottom: 10, width:(SCREEN_WIDTH-60) / 3}}}
            />
            }>
            <MatchPage1 tabLabel={{label: "04/07, Thứ 5"}}/>
            <MatchPage2 tabLabel={{label: "05/07, Hôm nay"}}/>
            <MatchPage3 tabLabel={{label: "06/07, Thứ 7"}}/>
        </ScrollableTabView>
        <FooterCustom ref="footerCustom" onPressTab={this.onPressTab.bind(this)} tabIndex={1}></FooterCustom>
      </Container>
    );
  }
}

export default translate(['Matches'], { wait: true })(Matches);