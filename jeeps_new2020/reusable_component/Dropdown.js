
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Container, Header, Content, Form, Item, Picker,Icon } from 'native-base';

class Dropdown extends React.Component {
    constructor(props){
    super(props);
this.state={

}
    }

    onValueChange2=(value)=> {
        this.setState({
          selected2: value
        });
      }
    
  render() {
    const {name} = this.props;
  return (
      <View>
    <Item picker style={{
      backgroundColor:'white'
    ,width:'90%',
    alignSelf:"center",
    height:40,
    marginTop:20,
    }} >
              <Picker style={{backgroundColor:'white'}}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "white" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label= {name} value={name} />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            </View>
  );
}
};


export default Dropdown;
