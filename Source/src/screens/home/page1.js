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
import styles from "./styles1";

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navIndex: 1,
      title: 'home:title',
      currentDate: moment().locale('en').utc('+07:00'),
      numberOfAccesses: 0,
      datasBooking: [],
      message: "",
      show1: true,
      show2: true,
      show3: true,
      list_new: [
        {
            'tournaments_icon':require("./../../../assets/Icon/IconFootball/copa-america-icon.png"),
            'tournaments_name':'Copa America',
            'match': [
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
            ],
            
        },
      ],
      list_now: [
        {
            'tournaments_icon':require("./../../../assets/Icon/IconFootball/copa-america-icon.png"),
            'tournaments_name':'Copa America',
            'match': [
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
            ],
            
        },
        {
            'tournaments_icon':require("./../../../assets/Icon/IconFootball/woman-wc-icon.png"),
            'tournaments_name':"Woment's World Cup",
            'match': [
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
                {
                    'icon_game_status':require("./../../../assets/Icon/notify-icon.png"),
                    'team_1': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/brasil.png"),
                        'football_team_name':'Brasil',
                        'football_team_result': 1,
                    },
                    'team_2': {
                        'football_team_icon':require("./../../../assets/Icon/IconFootball/peru.png"),
                        'football_team_name':'Peru',
                        'football_team_result': 0,
                    },
                    'time':"07:00"
                },
            ],
            
        },
        ],
      list_old: []
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
  goToDetailScreen(data) {
    var self = this;
    //console.log(data.linkURL);
    
  }

  decodeHTMLEntities(text) {
      var nontText = (text + '').replace(/<[^>]*>/g, "").replace(/\n/, '');
      return entities.decode(nontText)
  };
  showHideGroup = (index) => {
    switch (index) {
        case 1:
            this.setState({ show1: !this.state.show1 });
            break;
        case 2:
            this.setState({ show2: !this.state.show2 });
            break;
        case 3:
            this.setState({ show3: !this.state.show3 });
            break;
    }
  };

  render() {
    const { t, i18n } = this.props;
    return (
        <ScrollView style={{backgroundColor:'#FFF'}}>
            {this.state.list_now.length > 0 &&
                <View style={styles.headerGroup}>
                    <Left>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>Đang diễn ra</Text>
                    </Left>
                    <Right style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginLeft: 2 }} success onPress={() => { this.showHideGroup(1)}}>
                            {this.state.show1 && <IconFE name={"chevron-up"} style={{ marginRight: 10, color: '#fff' }} size={25} />}
                            {!this.state.show1 && <IconFE name={"chevron-down"} style={{ marginRight: 10, color: '#fff' }} size={25} />}
                        </TouchableOpacity>
                    </Right>
                </View>}
            {this.state.list_now.length > 0 && this.state.show1 && <List
                dataArray={this.state.list_now}
                renderRow={record =>
                    <View>
                        <ListItem avatar style={styles.subHeaderGroup}>
                            <Left style={styles.subHeaderGroupLeft}>
                                <Image source={record.tournaments_icon}
                                    style={styles.subHeaderGroupLeftImage}
                                ></Image>
                            </Left>
                            <Body style={styles.subHeaderGroupBody}>
                                <Text style={{ color:'#FFF' }}>{record.tournaments_name}</Text>
                            </Body>
                        </ListItem>
                        <List
                            dataArray={record.match}
                            renderRow={match =>
                            <ListItem avatar style={[styles.match, styles.underlineBottom]}>
                                <Left style={styles.matchLeft}>
                                    <Image source={match.icon_game_status}
                                        style={{width:25, height:25}}
                                    ></Image>
                                </Left>
                                <Body style={styles.matchView}>
                                    <ListItem avatar style={styles.match_content}>
                                        <Left style={styles.match_content_left}>
                                            <Image source={match.team_1.football_team_icon}
                                                style={{width:25, height:25}}
                                            ></Image>
                                        </Left>
                                        <Body style={styles.match_content_body}>
                                            <Text style={{color:'#FFF' }}>{match.team_1.football_team_name}</Text>
                                        </Body>
                                        <Right style={styles.match_content_right}>
                                            <Text style={{ marginRight: 5 }} note>{match.team_1.football_team_result}</Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem avatar style={styles.match_content}>
                                        <Left style={styles.match_content_left}>
                                            <Image source={match.team_2.football_team_icon}
                                                style={{width:25, height:25}}
                                            ></Image>
                                        </Left>
                                        <Body style={styles.match_content_body}>
                                            <Text style={{color:'#FFF' }}>{match.team_2.football_team_name}</Text>
                                        </Body>
                                        <Right style={styles.match_content_right}>
                                            <Text style={{ marginRight: 5 }} note>{match.team_2.football_team_result}</Text>
                                        </Right>
                                    </ListItem>
                                </Body>
                                <Right style={styles.matchRight}>
                                    <Text style={{ marginRight: 5 }} note>{match.time}</Text>
                                </Right>
                            </ListItem>
                        }/>
                    </View>
                }
            />}
            {this.state.list_new.length > 0 &&
                <View style={styles.headerGroup}>
                    <Left>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>Sắp diễn ra</Text>
                    </Left>
                    <Right style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginLeft: 2 }} success onPress={() => { this.showHideGroup(2)}}>
                            {this.state.show2 && <IconFE name={"chevron-up"} style={{ marginRight: 10, color: '#fff' }} size={25} />}
                            {!this.state.show2 && <IconFE name={"chevron-down"} style={{ marginRight: 10, color: '#fff' }} size={25} />}
                        </TouchableOpacity>
                    </Right>
                </View>}
            {this.state.list_new.length > 0 && this.state.show2 && <List
                dataArray={this.state.list_new}
                renderRow={record =>
                    <View>
                        <ListItem avatar style={styles.subHeaderGroup}>
                            <Left style={styles.subHeaderGroupLeft}>
                                <Image source={record.tournaments_icon}
                                    style={styles.subHeaderGroupLeftImage}
                                ></Image>
                            </Left>
                            <Body style={styles.subHeaderGroupBody}>
                                <Text style={{ color:'#FFF' }}>{record.tournaments_name}</Text>
                            </Body>
                        </ListItem>
                        <List
                            dataArray={record.match}
                            renderRow={match =>
                            <ListItem avatar style={[styles.match, styles.underlineBottom]}>
                                <Left style={styles.matchLeft}>
                                    <Image source={match.icon_game_status}
                                        style={{width:25, height:25}}
                                    ></Image>
                                </Left>
                                <Body style={styles.matchView}>
                                    <ListItem avatar style={styles.match_content}>
                                        <Left style={styles.match_content_left}>
                                            <Image source={match.team_1.football_team_icon}
                                                style={{width:25, height:25}}
                                            ></Image>
                                        </Left>
                                        <Body style={styles.match_content_body}>
                                            <Text style={{color:'#FFF' }}>{match.team_1.football_team_name}</Text>
                                        </Body>
                                        <Right style={styles.match_content_right}>
                                            <Text style={{ marginRight: 5 }} note>{match.team_1.football_team_result}</Text>
                                        </Right>
                                    </ListItem>
                                    <ListItem avatar style={styles.match_content}>
                                        <Left style={styles.match_content_left}>
                                            <Image source={match.team_2.football_team_icon}
                                                style={{width:25, height:25}}
                                            ></Image>
                                        </Left>
                                        <Body style={styles.match_content_body}>
                                            <Text style={{color:'#FFF' }}>{match.team_2.football_team_name}</Text>
                                        </Body>
                                        <Right style={styles.match_content_right}>
                                            <Text style={{ marginRight: 5 }} note>{match.team_2.football_team_result}</Text>
                                        </Right>
                                    </ListItem>
                                </Body>
                                <Right style={styles.matchRight}>
                                    <Text style={{ marginRight: 5 }} note>{match.time}</Text>
                                </Right>
                            </ListItem>
                        }/>
                    </View>
                }
            />}
        </ScrollView>
    );
  }
}

export default translate(['Page1'], { wait: true })(Page1);