import React, { Component } from 'react';
import {
    View,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    FlatList,
    // Button,
} from 'react-native';
// import IntakeDropDown from "./intakeDropdown";
import ImagePicker from 'react-native-image-crop-picker';

const dataArray = [
    { title: "Part Conditions" },
    { title: "Shop Category" },
    { title: "Company" },
    { title: "Jeeps Model" },
    { title: "Making Year" },
    { title: "Initial Vehicle Intake" }

];
const checkBox = [
    { title: "Daily Stand Up", content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet" },
    { title: "New (4)", content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet" },
    { title: "Remanufactured (3)", content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet" },
    { title: "Used (34)", content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet" },
];
const intitialIntakeInput = ['Name', 'Description', 'Short Description', 'Price', 'Regular Price', 'Sale Price', 'SKU', 'Date on Sale From', 'Date on Sale To', 'Weight']

import Swiper from 'react-native-swiper'
import { ScrollView } from 'react-native-gesture-handler';
import CustomInput from '../dashboard/CustomInput';
import { Accordion, Icon , Button, Container, Header, Content, Spinner } from 'native-base';
const { width, height } = Dimensions.get('window')

var data
let images = []
export default class IntakeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            shortd: '',
            price: '',
            rprice: '',
            sprice: '',
            sku: '',
            date_from: '',
            date_to: '',
            weight: '',
            length: '',
            width: '',
            height: '',
            images: null,
            baseImg: [],
            loader:false
        }
        data = [{ title: 'Dimensions' }]
    }
    static navigationOptions = {
        // headerTitle instead of title
        headerTitle: 'FAQ',
        title: 'FAQ'
    };
    _renderHeader = (item, expanded) => {
        return (
            <View
                style={{
                    flexDirection: "row", padding: 10,
                    justifyContent: "space-between", alignItems: "center", marginVertical: 5,
                    backgroundColor: "#000", borderColor: 'green', borderWidth: 2, borderTopLeftRadius: 6, borderTopRightRadius: 6, marginHorizontal: 8
                }}
            >
                <Text style={{ fontSize: 16, color: 'grey' }}>
                    {" "}{item.title}
                </Text>

                {expanded
                    ? <Icon style={{ fontSize: 18 }} color="white" name="arrow-up" type="Feather" />
                    : <Icon style={{ fontSize: 18 }} name="arrow-down" color="#eee" type="Feather" />}
            </View>
        );
    }
    _renderContent = (item) => {
        return (
            <View style={{ backgroundColor: "#5d5b5b", alignItems: "center" }}>
                <CustomInput label={'Length'} changeFunc={(length) => this.setState({ length })} value={this.state.length} />
                <CustomInput label={'Height'} changeFunc={(height) => this.setState({ height })} value={this.state.height} />
                <CustomInput label={'Width'} changeFunc={(width) => this.setState({ width })} value={this.state.width} />
            </View>
        );
    }
    imagesPicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: "photo"
        }).then(images => {
            images.map((img) => {
                this.setState({path:img.path},()=>{ this.urlToBlob(this.state.path)})
                   
            //   console.log('*********check***********',img)
          })
            // this.setState({ baseImg: [...this.state.baseImg, images.path] })
            this.state.baseImg.push(images)
        });

    }
    urlToBlob = async (url) => {

      console.log('******************uri********',url)
      
        const blob = await new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"))
            }
            xhr.responseType = 'blob'; // convert type
            xhr.open('GET', url, true);
            xhr.send(null);
        })

        var uriImg = blob.data.name
        console.log(uriImg, 'uurrriii')
        this.setState({uri:uriImg})
        // this.setState({ images: [...this.state.images, uriImg] },()=>{console.log(this.state.images, 'bloooob')})
       
    }

submit=()=>{
    this.setState({loader:true})
    const {path,name,description,shortd,price,rprice,sku,sprice,date_from,date_to,weight, uri } = this.state;
  console.log('*************uri and path****************',uri,path);
  const Main = new FormData()
  var file = {
    uri: path,
    name: uri,
    type: 'image/png'
  }
   Main.append('image',file)
    Main.append('upload','upload')
    console.log("======main data=====>", Main)

fetch("https://mobileappstore.co.uk/khalid/rest_api.php", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      
    },
    body: Main
}).then(res => res.json())
    .then(resp => { this.setState({responce:resp.source_url},()=>{
        console.log('img link***********',this.state.responce)
        console.log('*****************PLEASE WAIT***********************')

  const Data = {
        name: name,
        type: "simple",
        regular_price: "21.99",
        description:description ,
        // short_description: shortd,
        categories: [
          {
            id: 19
          },
          {
            id: 20
          },
        ],
        images: [
          {
            src: resp.source_url
          },
        ]
      };
    //   console.log('obj **********Data', JSON.stringify(Data))
      console.log('obj ****image******Data', Data)

           fetch('http://hnhtechsolutions.com/khalid/offroute/wp-json/wc/v3/products',{
            method:'POST',
             dataType: "json",
            headers: {
            //   'Accept': 'application/json',
            "content-type" :"application/json"
            },
            body: JSON.stringify(Data),
          }).then(response => response.json())
          .then(result => { this.setState({loader:false},()=>{this.props.navigation.navigate('Dashboard')}) })
          .catch(error => console.error('ERROR',error))

    } 
    // 8888888
    
    
    )})
  
        }

    render() {
        const {loader} =this.state;
        console.log("Images from States: ", this.state.baseImg)
        return (
            <ScrollView style={{
                backgroundColor: "#5d5b5b", height: "100%",
            }}>
                <CustomInput label={'Name'} changeFunc={(name) => this.setState({ name })} value={this.state.name} />
                <CustomInput label={'Description'} changeFunc={(description) => this.setState({ description })} value={this.state.description} />
                <CustomInput label={'Short Description'} changeFunc={(shortd) => this.setState({ shortd })} value={this.state.shortd} />
                <CustomInput label={'Price'} changeFunc={(price) => this.setState({ price })} value={this.state.price} />
                <CustomInput label={'Regular Price'} changeFunc={(rprice) => this.setState({ rprice })} value={this.state.rprice} />
                <CustomInput label={'Sale Price'} changeFunc={(sku) => this.setState({ sku })} value={this.state.sku} />
                <CustomInput label={'SKU'} changeFunc={(sprice) => this.setState({ sprice })} value={this.state.sprice} />
                <CustomInput label={'Date On Sale From'} changeFunc={(date_from) => this.setState({ date_from })} value={this.state.date_from} />
                <CustomInput label={'Date On Sale To'} changeFunc={(date_to) => this.setState({ date_to })} value={this.state.date_to} />
                <CustomInput label={'Weight'} changeFunc={(weight) => this.setState({ weight })} value={this.state.weight} />
                <Accordion
                    style={{ borderColor: null, width: '100%' }}
                    // contentStyle={{backgroundColor: 'black'}}
                    dataArray={data}
                    animation={true}
                    // expanded={handleValue}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
                    <Text style={{ color: "lightgrey", fontWeight: 'bold', fontSize: 14 }}>SELECT IMAGES:</Text>
                    <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 4, borderColor: 'white', borderWidth: .5 }} onPress={() => this.imagesPicker()}>
                        <Text style={{ color: 'lightgrey', fontWeight: 'bold', fontSize: 12 }}>UPLOAD</Text>
                    </TouchableOpacity>

                </View>
                {this.state.baseImg ?
                    <FlatList
                        horizontal={true}
                        data={this.state.baseImg}
                        extraData={this.state.baseImg}
                        renderItem={({ item }) =>
                            <Image style={{ width: 90, height: 90,margin:10,borderRadius:6 }} source={{ uri: item.path }} />
                        }
                        keyExtractor={item => item.id}
                    /> : null
                }
          <View>
         {loader == true&& <Spinner/>} 
      <Button style={styles.bt} onPress={this.submit}>
            <Text style={{color:'white',padding:'40%'}}>SUBMIT</Text>
          </Button>
    
      </View>
               

            </ScrollView>
        )
    }
}

/* <DropDown data={dataArray} /> */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 5
    },
    wrapper: {
        height: 220,
        borderRadius: 20
    },
    bt:{
      width:'90%',
    //   height:'100%',
      marginTop:6,
      marginBottom:20,
      backgroundColor:'green',
      alignSelf:'center',
      
    }
      
    
})