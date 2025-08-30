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

const EventDetailScreen = ({route}: any) => {
  const {event} = route.params;

  const imageUrl = event.images?.[0]?.url;
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const venue = event._embedded?.venues?.[0];
  const performers = event._embedded?.attractions || [];
  const ticketUrl = event.url;

  const {favorites, toggleFavorite} = useFavorites();
  const {t} = useTranslation();
  const isFav = favorites?.some(e => e.id === event.id);

  return (
    <ScrollView style={styles.eventDetailsContainer}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        {imageUrl && (
          <Image source={{uri: imageUrl}} style={styles.heroImage} />
        )}
        <LinearGradient
          colors={[colors.gradient1, colors.transparent]}
          style={styles.imageOverlay}
        />
        <TouchableOpacity
          onPress={() => toggleFavorite(event)}
          style={styles.toggleFavorite}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={28}
            color={isFav ? colors.favorite : colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.eventDetailsCard}>
        <Text style={styles.eventDetailsTitle}>{event.name}</Text>
        <View style={styles.row}>
          <Icon name="time-outline" size={18} color={colors.text} />
          <Text style={[styles.metaText]}>
            {date} {time && `• ${time}`}
          </Text>
        </View>

        {venue && <Location event={event} />}

        {/* About */}
        {event.info && <AboutSection info={event.info} />}

        {/* Please Note */}
        {event.pleaseNote && (
          <View style={styles.section}>
            <Text style={[styles.eventDetailsSectionTitle]}>
              {t('please_note')}
            </Text>
            <Text style={[styles.sectionText]}>{event.pleaseNote}</Text>
          </View>
        )}

        {/* Entry / Ticket Info */}
        <View style={styles.section}>
          <Text style={[styles.eventDetailsSectionTitle]}>{t('entry')}</Text>
          <Text style={[styles.sectionText]}>
            Standard ticket limit: {event.ticketLimit?.info || 'N/A'}
          </Text>
        </View>

        {/* Performing */}
        {performers?.length > 0 && <PerfomerList performers={performers} />}

        {/* Seatmap */}
        {event.seatmap?.staticUrl && (
          <View style={styles.section}>
            <Text style={[styles.eventDetailsSectionTitle]}>
              {t('seat_map')}
            </Text>
            <TouchableOpacity onPress={() => openUrl(event.seatmap.staticUrl)}>
              <Image
                source={{uri: event.seatmap.staticUrl}}
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
