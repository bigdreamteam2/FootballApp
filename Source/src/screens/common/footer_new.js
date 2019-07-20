import React, { Component } from "react";
import { Image, Platform } from "react-native";
import {
  Container, Header, Title, Content,
  Button, Footer, FooterTab, Text,
  Body, Left, Right, Icon
} from "native-base";

import { translate } from 'react-i18next';
import i18n from 'i18next';

import styles from "./styles";

class FooterCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      source1: require("../../../assets/Icon/Footer/Football_Icon/match-icon.png"),
      source2: require("../../../assets/Icon/Footer/Football_Icon/rank-icon.png"),
      source3: require("../../../assets/Icon/Footer/Football_Icon/home-inactive.png"),
      source4: require("../../../assets/Icon/Footer/Football_Icon/video-icon.png"),
      source5: require("../../../assets/Icon/Footer/Football_Icon/setting-icon.png"),
    };
  }
  toggleTab(index) {
    this.props.onPressTab(index);
  }
  componentDidMount() {
    if (this.props.tabIndex) {
      switch (this.props.tabIndex) {
        case 1:
          this.setState({
            tab1: true,
            source1: require("../../../assets/Icon/Footer/Football_Icon/match-selected.png")
          });
          break;
        case 2:
          this.setState({
            tab2: true,
            source2: require("../../../assets/Icon/Footer/Football_Icon/table-match-selected.png")
          });
          break;
        case 3:
          this.setState({
            tab3: true,
            source3: require("../../../assets/Icon/Footer/Football_Icon/home-active.png")
          });
          break;
        case 4:
          this.setState({
            tab4: true,
            source4: require("../../../assets/Icon/Footer/Football_Icon/video-icon-selected.png")
          });
          break;
        case 5:
          this.setState({
            tab5: true,
            source5: require("../../../assets/Icon/Footer/Football_Icon/Setting-icon-selected.png")
          });
          break;
      }
      this.toggleTab(this.props.tabIndex);
    }
  }
  render() {
    const { t, i18n } = this.props;
    return (
      <Footer style={styles.footer}>
        <FooterTab style={styles.footerContainer}>
          <Button active={this.state.tab1} onPress={() => this.toggleTab(1)}>
            <Image source={this.state.source1} style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain' }}></Image>
            <Text numberOfLines={1} uppercase={false} style={styles.textButton}>Trận đấu</Text>
          </Button>
          <Button active={this.state.tab2} onPress={() => this.toggleTab(2)}>
            <Image source={this.state.source2} style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain' }}></Image>
            <Text numberOfLines={1} uppercase={false} style={styles.textButton}>Bảng đấu</Text>
          </Button>
          <Button active={this.state.tab3} onPress={() => this.toggleTab(3)} style={{paddingBottom:0, paddingTop:0}}>
            <Image source={this.state.source3} style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain'}}></Image>
          </Button>
          <Button active={this.state.tab4} onPress={() => this.toggleTab(4)}>
            <Image source={this.state.source4} style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain' }}></Image>
            <Text numberOfLines={1} uppercase={false} style={styles.textButton}>Video</Text>
          </Button>
          <Button active={this.state.tab5} onPress={() => this.toggleTab(5)}>
            <Image source={this.state.source5} style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain' }}></Image>
            <Text numberOfLines={1} uppercase={false} style={styles.textButton}>Thiết lập</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default translate(['FooterCustom'], { wait: true })(FooterCustom);
