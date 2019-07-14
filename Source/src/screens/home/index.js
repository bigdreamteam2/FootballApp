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
import Page1 from "./page1";
import Page2 from "./page2";

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const icon_tournaments = require("./../../../assets/Icon/IconFootball/copa-america-icon.png");
const icon_game_status = require("./../../../assets/Icon/notify-icon.png");

class Home extends Component {

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
        // this.props.navigation.navigate('Home');
        break;
      case 2:
        // this.props.navigation.navigate('SR100');
        break;
      case 3:
        // this.props.navigation.navigate('SR070_1');
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
            <Page1 tabLabel={{label: "Trận đấu hay"}}/>
            <Page2 tabLabel={{label: "Tin tức nổi bật"}}/>
            <Page1 tabLabel={{label: "Bàn thắng đẹp"}}/>
        </ScrollableTabView>
        <FooterCustom ref="footerCustom" onPressTab={this.onPressTab.bind(this)} tabIndex={3}></FooterCustom>
      </Container>
    );
  }
}

export default translate(['home'], { wait: true })(Home);