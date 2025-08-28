import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {searchEvents} from '../api/ticketmaster';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {navigation: HomeScreenNavigationProp};

const HomeScreen = ({navigation}: Props) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const results = await searchEvents(keyword, city);
      console.log('results', results);
    };
    getEvents();
  }, []);

  const handleSearch = async () => {
    const results = await searchEvents(keyword, city);
    setEvents(results);
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <TextInput
        placeholder="Keyword"
        value={keyword}
        onChangeText={setKeyword}
        style={{marginBottom: 8, borderWidth: 1, padding: 8}}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={{marginBottom: 8, borderWidth: 1, padding: 8}}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EventDetails', {eventId: item.id})
            }>
            <Text style={{padding: 8}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
