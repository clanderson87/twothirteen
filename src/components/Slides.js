import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { slideStyle, slideTextStyle, buttonStyle } from '../styles';
import { Button } from 'react-native-elements';

class Slides extends Component {
  renderLastSlide(index){
    if(index === this.props.data.length - 1){
      return (
        <Button
          title = {this.props.buttonText}
          raised
          buttonStyle = {buttonStyle}
          onPress = {this.props.onComplete}
        />
      )
    }
  };
  
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
      <View 
        key = {slide.text} 
        style = {[slideStyle, { backgroundColor: slide.color}]}>
        <Text style = {slideTextStyle}>
          {slide.text}
        </Text>
        {this.renderLastSlide(index)}
      </View>
      )
    });
  };

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    )
  }
};

export default Slides;