import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import PlaceItem from '../../components/molecules/place-item';
import placesAction from '../../store/actions/places.action';

const PlaceList = ({navigation}) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);
  useEffect(() => {
    dispatch(placesAction.loadPlace());
  }, []);
  console.warn('placelist', places);
  const onSelectDetail = () => {
    navigation.navigate('PlaceDetail');
  };

  const renderItem = ({item}) => (
    <PlaceItem
      name={item.name}
      address={item.address}
      onSelect={() => onSelectDetail()}
      image={item.image}
      latitude={item.latitude}
      longitude={item.longitude}
    />
  );
  return (
    <FlatList
      data={places}
      keyExtractor={item => item.Id}
      renderItem={renderItem}
    />
  );
};

export default PlaceList;
