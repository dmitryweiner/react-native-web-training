import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';
import { ListView } from 'realm/react-native';
import {
  DataTable,
  Row,
  Cell,
  Header,
  HeaderCell,
} from 'react-native-data-table';
import Modal from 'modal-react-native-web';

import countries from './countries';

class App extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    console.log(ds);

    this.state = {
      dataSource: ds.cloneWithRows(countries),
      spinValue: new Animated.Value(0),
      modalVisible: false,
    };
  }

  setModalVisible(isVisible) {
    this.setState({
      modalVisible: isVisible,
    });
  }

  renderRow(record) {
    return <Row>
      <Cell>{record.code}</Cell>
      <Cell>{record.name}</Cell>
    </Row>;
  }

  renderHeader() {
    return <Header>
      <HeaderCell text={'code'} />
      <HeaderCell text={'name'} />
    </Header>;
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>DataTable</Text>
        </View>
        <View style={styles.container}>
          <DataTable
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderHeader={this.renderHeader}
          />
        </View>
        <View>
          <Modal
            appElement={this}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onDismiss={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableHighlight
            onPress={() => this.setModalVisible(true)}
            style={styles.button}
            underlayColor={'#0A84D0'}
          >
            <Text style={styles.buttonText}>Add new record</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
