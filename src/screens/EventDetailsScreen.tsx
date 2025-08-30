import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFavorites} from '../hooks/useFavorites';
import Location from '../components/Location';
import AboutSection from '../components/AboutSection';
import PerfomerList from '../components/PerfomerList';
import ButtonComponent from '../components/ButtonComponet';
import {openUrl} from '../utils';
import {useTranslation} from 'react-i18next';
import styles from '../styles';
import {colors} from '../colors';
import {icons} from '../constants';
import {formatDataTime} from '../utils';

const EventDetailScreen = ({route}: any) => {
  const {event} = route.params;
  const {
    name: eventName = '',
    dates: {start: {localDate: date = '', localTime: time = ''}} = {},
    _embedded: {attractions: performers = [], venues = []},
    images: [{url: thumbnailUrl = ''}] = [],
    url: ticketUrl = '',
    info: eventInfo = '',
    pleaseNote = '',
    ticketLimit: {info: ticketLimitInfo = ''} = {},
    seatmap: {staticUrl: seatmapUrl = ''} = {},
  } = event;
  const venue = venues?.[0];
  const formattedDate = formatDataTime(date, time, {
    withDate: true,
    hour12: false,
  });

  const {favorites, toggleFavorite} = useFavorites();
  const {t} = useTranslation();
  const isFav = favorites?.some(e => e.id === event.id);

  return (
    <ScrollView style={styles.eventDetailsContainer}>
      <View style={styles.imageContainer}>
        {thumbnailUrl && (
          <Image source={{uri: thumbnailUrl}} style={styles.heroImage} />
        )}
        <LinearGradient
          colors={[colors.gradient1, colors.transparent]}
          style={styles.imageOverlay}
        />
        <TouchableOpacity
          onPress={() => toggleFavorite(event)}
          style={styles.toggleFavorite}>
          <Ionicons
            name={isFav ? icons.heart : icons.heartOutline}
            size={28}
            color={isFav ? colors.favorite : colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.eventDetailsCard}>
        <Text style={styles.eventDetailsTitle}>{eventName}</Text>
        <View style={styles.row}>
          <Icon name={icons.time} size={18} color={colors.text} />
          <Text style={[styles.metaText]}>{formattedDate}</Text>
        </View>

        {venue && <Location event={event} />}

        {eventInfo && <AboutSection info={eventInfo} />}

        {pleaseNote && (
          <View style={styles.section}>
            <Text style={[styles.eventDetailsSectionTitle]}>
              {t('please_note')}
            </Text>
            <Text style={[styles.sectionText]}>{pleaseNote}</Text>
          </View>
        )}

        {/* Entry / Ticket Info */}
        <View style={styles.section}>
          <Text style={[styles.eventDetailsSectionTitle]}>{t('entry')}</Text>
          <Text style={[styles.sectionText]}>
            Standard ticket limit: {ticketLimitInfo || 'N/A'}
          </Text>
        </View>

        {/* Performing */}
        {performers?.length > 0 && <PerfomerList performers={performers} />}

        {/* Seatmap */}
        {seatmapUrl && (
          <View style={styles.section}>
            <Text style={[styles.eventDetailsSectionTitle]}>
              {t('seat_map')}
            </Text>
            <TouchableOpacity onPress={() => openUrl(seatmapUrl)}>
              <Image
                source={{uri: seatmapUrl}}
                style={styles.seatmap}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        {ticketUrl && (
          <ButtonComponent ticketUrl={ticketUrl} title={t('get_tickets')} />
        )}
      </View>
    </ScrollView>
  );
};

export default EventDetailScreen;
