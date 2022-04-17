import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';
import {COLORS} from '../../../constants';
import {styles} from './styles';

const ImageSelector = ({onImage}) => {
  const [pickedResponse, setPickedResponse] = useState();
  const IS_IOS = Platform.OS === 'ios';

  const verifyPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'CamFeature Camera Permission',
          message: 'CamFeature App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleTakePicture = async () => {
    const isCameraOk = await verifyPermission();
    if (!isCameraOk) return;

    let options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    let granted;
    if (IS_IOS) {
      granted = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      granted = await request(PERMISSIONS.ANDROID.CAMERA);
    }

    if (granted === RESULTS.GRANTED) {
      ImagePicker.launchCamera(options, response => {
        if (!response.didCancel && !response.error) {
          console.log('aaa');
          setPickedResponse(response.assets[0]);
          onImage && onImage(response.assets[0].uri);
        }
      });
    } else {
      console.log('Permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedResponse ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image source={{uri: pickedResponse.uri}} style={styles.image} />
        )}
        <Button
          title="Pick Image"
          color={COLORS.primaryColor}
          onPress={handleTakePicture}
        />
      </View>
    </View>
  );
};

export default ImageSelector;
