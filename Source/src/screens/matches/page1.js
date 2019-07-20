import React, { Component } from "react";

import { Content, ScrollView, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage, Platform, Animated, ListView } from "react-native";
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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const rec_bg = require("./../../../assets/images/back-ground.png");
const rec_bg_tournaments = require("./../../../assets/images/head-line.png");
const icon_video = require("./../../../assets/Icon/video-icon.png");
const icon_notify = require("./../../../assets/Icon/notify-icon.png");
const icon_add = require("./../../../assets/Icon/add-icon-1.png");

class MatchPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navIndex: 1,
      currentLength: 0,
      title: 'home:title',
      currentDate: moment().locale('en').utc('+07:00'),
      numberOfAccesses: 0,
      datasBooking: [],
      message: "",
      show1: true,
      show2: true,
      show3: true,
      list_old: [
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
      list_new: []
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
        <ScrollView style={{backgroundColor:'#8d6f6d'}}>
            {this.state.list_old.length > 0 &&
                <View style={styles.headerGroup}>
                    <Left>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>Đã diễn ra</Text>
                    </Left>
                    <Right style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginLeft: 2, alignItems:'center', flexDirection: 'row'}} success onPress={() => { this.showHideGroup(1)}}>
                            <Text note style={{color: '#f16621', marginRight:10 }}>Thêm giải đấu</Text>
                            <Image source={icon_add}
                                style={{width:20, height:20, resizeMode: 'contain', marginRight:5}}
                            ></Image>
                        </TouchableOpacity>
                    </Right>
                </View>}
                {this.state.list_old.length > 0 && this.state.show1 && <List
                dataArray={this.state.list_old}
                renderRow={record =>
                    <View>
                        <View>
                            <View style={styles.listOne.headLine}>
                                <Image square source={rec_bg_tournaments} style={styles.listOne.imageHeadLine} />
                            </View>
                            <View style={{width: SCREEN_WIDTH, position:'absolute',justifyContent:'center', paddingTop:5}}>
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
                            </View>
                        </View>
                        <ListView
                            ref = 'listHorizontal'
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            dataSource={ds.cloneWithRows(record.match)}
                            style={{paddingVertical:10}}
                            renderRow={match =>
                                <ListItem thumbnail button style={styles.itemList}
                                    onPress={() => this.goToDetailScreen(data)}>
                                    <View style={styles.listOne.item}>
                                        <View style={[styles.listOne.itemContainer]}>
                                            <View style={styles.listOne.thumbnailContent}>
                                                <Image square source={rec_bg} style={styles.listOne.imageThumbnail} />
                                            </View>
                                            <View style={styles.listOne.contentView}>
                                                <ListItem avatar style={styles.match_content}>
                                                    <Left style={styles.match_content_left}>
                                                        <Image source={match.team_1.football_team_icon}
                                                            style={{width:25, height:25}}
                                                        ></Image>
                                                    </Left>
                                                    <Body style={styles.match_content_body}>
                                                        <Text style={{fontWeight:'bold'}}>{match.team_1.football_team_name}</Text>
                                                    </Body>
                                                    <Right style={styles.match_content_right}>
                                                        <Text style={{ marginRight: 5 }}>{match.team_1.football_team_result}</Text>
                                                    </Right>
                                                </ListItem>
                                                <ListItem avatar style={styles.match_content}>
                                                    <Left style={styles.match_content_left}>
                                                        <Image source={match.team_2.football_team_icon}
                                                            style={{width:25, height:25}}
                                                        ></Image>
                                                    </Left>
                                                    <Body style={styles.match_content_body}>
                                                        <Text style={{fontWeight:'bold'}}>{match.team_2.football_team_name}</Text>
                                                    </Body>
                                                    <Right style={styles.match_content_right}>
                                                        <Text style={{ marginRight: 5 }}>{match.team_2.football_team_result}</Text>
                                                    </Right>
                                                </ListItem>
                                                <ListItem avatar style={styles.match_content}>
                                                    <Left style={styles.match_content_left}>
                                                        <Image source={icon_notify}
                                                            style={{width:25, height:25}}
                                                        ></Image>
                                                    </Left>
                                                    <Body style={styles.match_content_body}>
                                                        <Text note style={{color:'#f16621'}}>{match.time}</Text>
                                                    </Body>
                                                    <Right style={styles.match_content_right}>
                                                        <Image source={icon_video}
                                                            style={{width:25, height:25, resizeMode: 'contain'}}
                                                        ></Image>
                                                    </Right>
                                                </ListItem>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </ListItem>}>
                        </ListView>
                    </View>
                }
            />}
        </ScrollView>
    );
  }
}

const styles = {
    itemList: {
        flex: 1,
        marginLeft: 0
    },
    listOne: {
        item: {
            flex: 1,
            width: SCREEN_WIDTH - 150,
            justifyContent: 'center',
            alignItems: 'center'
        },
        itemContainer: {
            flexDirection: "column",
            width: SCREEN_WIDTH - 170,
            height: 120,
            backgroundColor: '#fff',
            borderRadius: 10
        },
        thumbnailContent: {
            flex: 1,
            height: 120
        },
        headLine: {
            flex: 1,
            height:50,
            paddingRight:10,
            justifyContent:'center'
        },
        imageHeadLine: {
            flex: 1,
            width: null,
            height:30,
            marginTop:10,
            marginLeft:50,
            resizeMode: 'contain'
        },
        imageThumbnail: {
            flex: 1,
            width: null,
            height: 120,
            resizeMode: 'cover',
            borderRadius: 10
        },
        contentView: {
            width: SCREEN_WIDTH - 170,
            position: 'absolute',
            paddingTop:8
        },
    },
    listTwo: {
        item: {
            flex: 1,
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
            paddingTop: 0
        },
        itemContainer: {
            flexDirection: "row",
            width: SCREEN_WIDTH - 15,
            height: 130,
            backgroundColor: '#fff',
            borderRadius: 10
        },
        imageMain: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover'
        },
        thumbnailContent: {
            flex: 1,
            height: 130,
        },
        imageThumbnail: {
            flex: 1,
            width: null,
            height: 130,
            resizeMode: 'cover',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        contentView: {
            flex: 2,
            padding: 10
        },
    },
    tag: {
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5
    },
    textTag: {
        color: "#fff",
        fontSize: 13
    },
    text: {
        // color: "#000",
        fontSize: 16,
    },
    textWhite: {
        color: "#fff"
    },
    headerGroup: {
        width:'100%', 
        height:40, 
        paddingLeft:10, 
        flexDirection: 'row', 
        justifyContent:'center', 
        marginLeft:0, 
        marginRight:0,
        backgroundColor:'#444444',
        borderBottomWidth:0.2,
        borderBottomColor:'#fff',
    },
    subHeaderGroup: {
        width:'100%', 
        height:50,  
        flexDirection: 'row', 
        justifyContent:'center', 
        alignItems: 'center',
        marginLeft:30, 
        marginRight:0,
    },
    subHeaderGroupLeft: {
        width:50, 
        height:50,
        paddingTop:0,
        justifyContent:'center', 
        alignItems: 'center',
        // borderColor:'#FF0000', borderWidth:1
    },
    subHeaderGroupLeftImage: {
        width:40, 
        height:40,
        // borderColor:'#FF0000', borderWidth:1
    },
    subHeaderGroupBody: {
        borderBottomWidth:0,
        marginLeft:5
        // borderColor:'#FF0000', borderWidth:1
    },
    match:{
        backgroundColor:'#1b1b1b',
        marginLeft:0, 
        padding:0,
        // borderColor:'#FF0000', borderWidth:1
    },
    matchLeft:{
        height:'100%',
        paddingTop:0,
        paddingHorizontal:15,  
        alignItems:'center', 
        justifyContent:'center',
        // borderColor:'#FF0000', borderWidth:1
    },
    matchView:{
        flex:1, 
        marginLeft:0,
        borderBottomWidth:0,
        borderRightColor:'#373737', 
        borderRightWidth:0.5,
        borderLeftColor:'#373737', 
        borderLeftWidth:0.5,
        paddingTop:5,
        paddingBottom:5,
        // borderColor:'#FF0000', borderWidth:1
    },
    matchRight:{
        borderBottomWidth:0,
        paddingHorizontal:15,
        alignItems:'center', 
        justifyContent:'center',
        // borderColor:'#FF0000', borderWidth:1
    },
    match_content:{
        marginLeft:0, 
        height:35,
        // borderColor:'#FF0000', borderWidth:1
    },
    match_content_left:{
        height:'100%',
        marginLeft:5,
        paddingTop:0,
        paddingHorizontal:7,
        alignItems:'center', 
        justifyContent:'center',
        //  borderColor:'#FF0000', borderWidth:1
    },
    match_content_body:{
        flex:1, 
        borderBottomWidth:0,
        alignItems:'center',
        justifyContent:'center',
        // borderColor:'#FF0000', borderWidth:1
    },
    match_content_right:{
        borderBottomWidth:0, 
        alignItems:'center', 
        justifyContent:'center'
        },
        underlineBottom:{
        borderTopWidth:0.5,
        borderRightColor:'#373737',
    }
};

export default translate(['MatchPage1'], { wait: true })(MatchPage1);