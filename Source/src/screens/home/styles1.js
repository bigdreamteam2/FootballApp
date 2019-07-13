const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  headerGroup: {
    width:'100%', 
    height:40, 
    paddingLeft:10, 
    flexDirection: 'row', 
    justifyContent:'center', 
    marginLeft:0, 
    marginRight:0,
    backgroundColor:'#9c716b'
  },
  subHeaderGroup: {
    width:'100%', 
    height:50,  
    flexDirection: 'row', 
    justifyContent:'center', 
    alignItems: 'center',
    marginLeft:0, 
    marginRight:0,
    backgroundColor:'#444444',
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
    width:30, 
    height:30,
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
    marginLeft:5,
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
