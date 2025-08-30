import React, {useEffect, useState, useCallback} from 'react';
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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useTranslation} from 'react-i18next';
import {TMEvent} from '../types/event';
import styles from '../styles';
import {colors} from '../colors';
import EventCard from '../components/EventCard';
import {useSnackbar} from '../components/SnackbarProvider';
import {useDebouncedCallback} from '../hooks/useDebouncedCallback';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {navigation: HomeScreenNavigationProp};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<TMEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const {showSnackbar} = useSnackbar();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEventDetails();
      setEvents(res || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearch = useDebouncedCallback(async () => {
    if (keyword?.length >= 3 || city?.length >= 3) {
      const res = await searchEvents(keyword, city);
      if (res?.length > 0) {
        setEvents(res);
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
        onPress={() => navigation.navigate('EventDetail', {event: item})}
      />
    );
  };

  const isSearchDisabled =
    loading || (keyword.length === 0 && city.length === 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder={t('search_placeholder_keyword')}
          placeholderTextColor={colors.lightGray}
          value={keyword}
          onChangeText={setKeyword}
          style={styles.input}
        />
        <TextInput
          placeholder={t('search_placeholder_city')}
          placeholderTextColor={colors.lightGray}
          value={city}
          onChangeText={setCity}
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
