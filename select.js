import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, TextInput, Modal, ListView, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const options = ["PopCorn","CornFlakes","Chocolate","Strawberries"];

class Select extends Component {

  constructor(props){
    super(props);
    const opt = new ListView.DataSource({rowHasChanged: (r1,r2)=> r1 !== r2});
    this.state = {
      options: opt.cloneWithRows(options),
      selected: null,
      isModalOpen: false
    }
  }

  selectOptions(data){
    this.setState({
      selected: data,
      isModalOpen: !this.state.isModalOpen
    })
  }

  renderRow(data){
    return(
      <TouchableHighlight onPress={()=>{this.selectOptions(data)}}>
        <Text style={styles.options}>{data}</Text>
      </TouchableHighlight>
    )
  }

  toggleModal(bool = !this.state.isModalOpen){
    this.setState({isModalOpen: bool})
  }

  render(){
    return(
      <View style={styles.container}>
        <Modal onRequestClose={this.toggleModal} visible={this.state.isModalOpen} transparent={true}>
          <TouchableWithoutFeedback onPress={()=>{this.toggleModal(false)}}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
              <View style={styles.listContainer}>
                <ListView dataSource={this.state.options} renderRow={(data)=> (this.renderRow(data))}/>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.textInput}>
          <TextInput placeholder="FavFood" value={this.state.selected} style={styles.selected} editable={false}/>
        </View>
        <TouchableHighlight style={styles.icon} onPress={()=>{
          this.toggleModal();
        }}>
          <Icon name="chevron-circle-down" size={20} color="#000" />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Select;

const{width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textInput: {
    flex: 2
  },
  icon: {
    flex: 0,
    backgroundColor: '#cccccc',
    borderRadius: 5,
    padding: 11,
    height: 40,
    justifyContent: 'center',
    marginRight: 2
  },
  options: {
    backgroundColor: "white",
    elevation: 2,
    height: 30,
    alignContent: "center",
    color: "black",
    margin: 0.5,
    textAlign: 'center',
    marginRight: 2
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  selected: {
    color: "black"
  }
})
