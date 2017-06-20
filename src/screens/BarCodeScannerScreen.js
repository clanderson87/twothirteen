import React, { Component } from 'react';
import { BarCodeScanner } from 'expo';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { barCodeReadAction, permissionDenied } from '../actions/barCodeActions';
import { getPermissions } from '../actions/expo_common_helpers';
import { BarCodeScannerStyle } from '../styles';

class BarCodeScannerScreen  extends Component {
  componentDidMount = async () => {
    let status = await getPermissions('camera');
    if(status !== 'granted'){
      this.props.permissionDenied();
    }
  }
  
  renderScanner = () => {
    return <BarCodeScanner
            onBarCodeRead = {this.props.barCodeReadAction}
            style={BarCodeScannerStyle}
            torchMode='on'
          />
  }

  renderError = () => {
    return (
      <Text>{this.props.error}</Text>
    );
  }

  renderData = () => {
    console.log(this.props.data);
    // testing method to display data. Update this for implementation!!
  }

  render() {
    return (
      <View>
      {this.props.error ? 
        this.renderError()
        : 
        this.renderScanner()
        }

      {this.props.data ?
        this.renderData()
        :
        <Text>No data yet.</Text>}
      </View>
    )
  }
}

const mapStateToProps = ({ barCode }) => {
  const { data, error } = barCode;
  return { data, error };
}

export default connect(mapStateToProps, { 
  barCodeReadAction,
  permissionDenied
})(BarCodeScannerScreen);