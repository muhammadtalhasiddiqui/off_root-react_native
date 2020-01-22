import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Spinner, Item , Icon, Button } from 'native-base';
import {connect} from 'react-redux';
import {getProducts} from '../redux/actions/userAction'
import VehicleIntake from './vehicle_intake'
// import { TouchableOpacity } from 'react-native-gesture-handler';
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [],
            loader: true
        }
    }

    componentDidMount () {
       this.props.getProducts()
    }


  render() {
         
        const { data, loader } = this.state
        return (
<View style={{flex: 1,height: "100%", width: "100%", backgroundColor: "#231F20"}}>
<ScrollView style={{backgroundColor:"#231F20"}}>

<View >

    {!this.props.fetching ? 

            <View style={{ width: "95%", backgroundColor: '#413f40', alignItems: 'center', borderRadius: 10,alignSelf:'center', padding: 10,marginTop: 30}}>

                {this.props.products.length > 0  ? 
                
                    <View >

            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center'}} >
                <View>

             </View>
             
                {/* content start_________________________          */}
                     <View style={styles.content}>

                     <View style={{flexDirection:"row",justifyContent:'center'}}>
                    <Text style={{fontWeight: "bold",fontSize:30,color:"#fff",textDecorationLine:'underline'}}>Select </Text>
                    <Text style={{fontWeight: "bold",fontSize:30,color:"#678a01",textDecorationLine:'underline'}}>Vehicles</Text>
                    </View>

        <View style={styles.content2}>
              <Icon style={{color:'green'}} name="search"/><Text style={{marginTop:5,marginLeft:4,color:'white'}}>SEARCH</Text>
        </View>
                <View style={styles.content2}>
                      <Icon style={{color:'green'}} name="close-circle"/><Text style={{marginTop:5,color:'white',marginLeft:4}}>2015-jeep-company</Text>
                </View>
                        <View style={styles.content2}>
                              <Icon style={{color:'green'}} name="close-circle"/><Text style={{marginTop:5,color:'white',marginLeft:4}}>High Demand Use</Text>
                        </View>

                        <View style={styles.btn}>
                            <Button onPress={()=>{this.props.navigation.navigate('IntakeForm')}} style={{backgroundColor:"green",
                            width:200,
                            borderRadius:10,
                             borderWidth:1
                             ,alignItems:"center",
                             paddingLeft:'10%'}}>
                                <Text style={{color:'white'}}>ADD NEW PRODUCT</Text>
                            </Button>
                        </View>
                      
                         </View>

                         {/* content end______________ */}


                            {this.props.products.map((value, index) => {
                                console.log(value.images[0].src)
                                return(
                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ProductDetail')}} key={index} style={{marginTop: 25, borderColor:'black', borderWidth : 1, borderRadius: 10}}>
                                        
                                        <View  style={{ width: "100%", marginLeft: 0, marginRight: 0, borderRadius: 10 }}>
                                        <Image source={{uri:value.images[0].src}} style={{height:200, width:370, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
                                        </View>

                                        <Text style={{color:"#fff", paddingVertical: 15, paddingHorizontal: 10}}>
                                           <Text style={{fontWeight:"bold"}}> Name : </Text> {value.name}
                                        </Text>

                                        <Text style={{color:"#fff", paddingVertical: 15, paddingHorizontal: 10}}>
                                <Text style={{fontWeight:"bold"}}> Price : </Text> $ {value.price === "" ? <Text>0</Text> : <Text>{value.price}</Text>}
                                        </Text>

                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                {/* <VehicleIntake /> */}

                    </View>
                    
                : 
                
                <View style={{flex: 1 ,alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        Item Not Found
                    </Text>
                </View>
                }

            </View>

            : 
        
            <View style={{ justifyContent:'center', alignItems: 'center', marginTop: '60%' }}>
                <Spinner style={{alignSelf:"center"}} />
            </View>
    }

</View>
</ScrollView>
</View>
        );
        }
        };

        const mapStateToProps = state => {
            return {
                products: state.user.products,
                fetching: state.user.fetching,
            };
          };
          
          const mapDispatchToProps = {
            getProducts
          };
        
        
        export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

        const styles= StyleSheet.create({

            content:{
                 alignSelf:"center",
                 backgroundColor:'#58595B', 
                 borderWidth:1,
                 width:'95%',
                  borderColor:"green", 
                  borderRadius: 10,
                  height:230,
                  opacity:0.7
                
            },

            content2:{
                 flexDirection:'row',
                 marginLeft:20,
                 marginTop:10
                

                
            },

        btn:{
            alignSelf:"center",
            alignContent:"center"
        }

        }) 




         //     ,()=>{   
    // console.log('img arha hay',this.state.img)
    //   const Data = {
    //     name: name,
    //     type: "simple",
    //     regular_price: "21.99",
    //     description:description ,
    //     short_description: shortd,
    //     categories: [
    //       {
    //         id: 19
    //       },
    //       {
    //         id: 20
    //       },
    //     ],
    //     images: [
    //       {
    //         src: this.state.img
    //       },
    //     ]
    //   };

    // console.log('obj **********Data', JSON.stringify(Data))

    // fetch('http://hnhtechsolutions.com/khalid/offroute/wp-json/wc/v3/products',{
    //   method:'POST',
    //    dataType: "json",
    //   headers: {
    //     // 'Accept': 'application/json',
    //     "content-type" :"application/json"
    //   },
    //   body: JSON.stringify(Data),
    // }).then(response => response.json())
    // .then(result => console.warn("*****finalresult******",result))
    // .catch(error => console.error('ERROR',error))
  
//   })
     

   
     
        //     fetch('http://hnhtechsolutions.com/khalid/offroute/wp-json/wc/v3/products',{
        //     method:'POST',
        //      dataType: "json",
        //     headers: {
        //       'Accept': 'application/json',
        //       "content-type" :"multipart/form-data"
        //     },
        //     body: JSON.stringify(Data),
        //   }).then(response => response.json())
        //   .then(result => console.warn("*****finalresult******",result))
        //   .catch(error => console.error('ERROR',error))