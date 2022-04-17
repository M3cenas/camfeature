import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../../../constants';
import {styles} from './styles';

const HeaderButton = ({navigation}) => {
  const handleOnPress = () => {
    navigation.push('NewPlace');
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress()}>
      <Text style={styles.textButton}>Create</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
