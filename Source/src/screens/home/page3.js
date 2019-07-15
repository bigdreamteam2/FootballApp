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
const SCREEN_WIDTH = Dimensions.get("window").width;

const rec_bg = require("./../../../assets/images/rec-background-white.png");
const rec_bg_time = require("./../../../assets/images/Rectangle 6.png");
const icon_share = require("./../../../assets/Icon/share-icon.png");
const icon_views = require("./../../../assets/Icon/view-icon.png");

class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        datas: [
            {
                'news_featured_image_src':require("./../../../assets/images/image_hightlights.png"),
                'news_title':'Highlights: Atalanta 2 - 2 Juventus ( Vòng 18 Serie A)',
                'news_creator':'By John Wick',
                'news_date':'05/07/2019',
                'news_view_number':2358964,
                'news_video_time':'15:02',
            },
            {
                'news_featured_image_src':require("./../../../assets/images/image_hightlights.png"),
                'news_title':'Highlights: Atalanta 2 - 2 Juventus ( Vòng 18 Serie A)',
                'news_creator':'By John Wick',
                'news_date':'05/07/2019',
                'news_view_number':2358964,
                'news_video_time':'15:02',
            },
        ],
    };
  }

  componentDidMount() {
    const { t, i18n } = this.props;
    this.setState({
      currentDate: moment().locale(t('home:language')).utc('+07:00'),
    });
  }

  decodeHTMLEntities(text) {
      return text;
    //   var nontText = (text + '').replace(/<[^>]*>/g, "").replace(/\n/, '');
    //   return entities.decode(nontText)
  };

  render() {
    const { t, i18n } = this.props;
    let dataList = this.state.datas;
    return (
        <ScrollView style={{backgroundColor:'#9c716b'}}>
            <List
                dataArray={dataList}
                renderRow={data =>
                <ListItem thumbnail button style={styles.itemList}>
                    <Image source={rec_bg} style={{marginLeft: 7.5, width: SCREEN_WIDTH - 15, height:325}}></Image>
                    <View style={{ flex: 1, position:'absolute'}}>
                        <View style={styles.itemContainer}>
                            <View style={[styles.imageView]}>
                                <Image square source={data.news_featured_image_src} style={styles.imageItem} />
                                <View style={styles.timeVideoStyle}>
                                    <Text note style={{ fontSize: 12, color:'#FFF' }} numberOfLines={1}>{data.news_video_time}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemDescription}>
                            <View style={styles.titleContent}>
                                <View style={{flex:1}}>
                                    <Text style={{fontWeight:'bold'}} numberOfLines={2}>{data.news_title}</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row', marginTop:10}}>
                                    <View style={{flex:6, flexDirection:'row', alignItems:'center'}}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Text note style={{textAlign: 'left', fontSize: 12, color:'#FFF' }} numberOfLines={1}>{this.decodeHTMLEntities(data.news_date)}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:4,flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                        <Image source={icon_share} style={{width:20, height:20, marginRight:20, resizeMode: 'contain'}}></Image>
                                        <Image source={icon_views} style={{width:30, height:30, marginRight:5, resizeMode: 'contain'}}></Image>
                                        <Text note style={{ fontSize: 12, color:'#FFF' }} numberOfLines={1}>{this.decodeHTMLEntities(data.news_view_number)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ListItem>}>
            </List>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    itemList: {
        marginLeft: 0,
        marginTop:7.5,
        marginBottom:7.5,
    },
    itemContainer: {
        flex: 1,
        marginLeft: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor:'#FFF000', borderWidth:1
    },
    imageView: {
        width: SCREEN_WIDTH - 15,
        height: 230,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageItem: {
        width: SCREEN_WIDTH - 15,
        height: 230,
        resizeMode: 'cover',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    itemDescription: {
        padding: 10,
        // paddingTop: 5,
        marginLeft: 7.5,
        flexDirection: "row",
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH - 15,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10
    },
    titleContent: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 7
    },
    costStyle: {
        color: '#e94b12',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
        // marginRight: 8,
    },
    timeVideoStyle: {
        position:'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom:0, 
        right:0, 
        paddingVertical:5,
        paddingHorizontal:10,
        // borderColor:'#FFF000', borderWidth:1
    },
});

export default translate(['Page3'], { wait: true })(Page3);