import React, {useEffect, useState, useCallback, useReducer} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {searchEvents, getEventDetails} from '../api/ticketmaster';
import {useTranslation} from 'react-i18next';
import {TMEvent, homeScreenStateType} from '../types/event';
import styles from '../styles';
import {colors} from '../colors';
import EventCard from '../components/EventCard';
import {useSnackbar} from '../components/SnackbarProvider';
import {useDebouncedCallback} from '../hooks/useDebouncedCallback';
import {useNavigation} from '@react-navigation/native';
import screenNames from '../screenNames';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();
  // const [keyword, setKeyword] = useState('');
  // const [city, setCity] = useState('');
  // const [events, setEvents] = useState<TMEvent[]>([]);
  // const [loading, setLoading] = useState(true);
  const {showSnackbar} = useSnackbar();

  const initalState: homeScreenStateType = {
    keyword: '',
    city: '',
    events: [],
    loading: false,
  };

  const updateKeyword = 'UPDATE_KEYWORD';
  const updateCity = 'UPDATE_CITY';
  const updateEvents = 'UPDATE_EVENTS';
  const updateLoading = 'UPDATE_LOADER';

  const reducer = (state = initalState, action: any) => {
    const {type, payload} = action;
    switch (type) {
      case updateKeyword:
        return {...state, keyword: payload};
      case updateEvents:
        return {...state, events: payload};
      case updateLoading:
        return {...state, loading: payload};
      case updateCity:
        return {...state, city: payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initalState);
  const {keyword, city, loading, events} = state;

  const fetchEvents = useCallback(async () => {
    try {
      // setLoading(true);
      dispatch({type: updateLoading, payload: true});
      const res = await getEventDetails();
      // setEvents(res || []);
      dispatch({type: updateEvents, payload: res || []});
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      // setLoading(false);
      dispatch({type: updateLoading, payload: false});
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearch = useDebouncedCallback(async () => {
    if (keyword?.length >= 3 || city?.length >= 3) {
      const res = await searchEvents(keyword, city);
      if (res?.length > 0) {
        // setEvents(res);
        dispatch({type: updateEvents, payload: res});
      } else {
        showSnackbar(
          `${t('no_events_found')} "${keyword}" "${city}"`,
          'warning',
        );
      }
    }
  }, 1000);

  const renderEvent = ({item}: {item: TMEvent}) => {
    return (
      <EventCard
        event={item}
        onPress={() =>
          navigation.navigate(screenNames.EVENT_DETAIL, {event: item})
        }
      />
    );
  };

  const isSearchDisabled =
    loading || (keyword?.length === 0 && city?.length === 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder={t('search_placeholder_keyword')}
          placeholderTextColor={colors.lightGray}
          value={keyword}
          onChangeText={value => {
            dispatch({type: updateKeyword, payload: value});
          }}
          style={styles.input}
        />
        <TextInput
          placeholder={t('search_placeholder_city')}
          placeholderTextColor={colors.lightGray}
          value={city}
          onChangeText={value => dispatch({type: updateCity, payload: value})}
          style={styles.input}
        />
        <TouchableOpacity
          style={[
            styles.searchBtn,
            {
              backgroundColor: isSearchDisabled
                ? colors.lightGray
                : colors.white,
            },
          ]}
          disabled={isSearchDisabled}
          onPress={handleSearch}>
          <Text style={styles.searchBtnText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t('upcoming_events')}</Text>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>{t('loading_events')}</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => item.id}
            renderItem={renderEvent}
            numColumns={2}
            columnWrapperStyle={styles.flatListColumnWrapper}
            ListEmptyComponent={
              <Text style={styles.empty}>{t('no_events_found')}</Text>
            }
            refreshing={loading}
            onRefresh={fetchEvents}
            contentContainerStyle={styles.flatListBottom}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
