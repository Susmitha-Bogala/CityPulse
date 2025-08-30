import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from '../styles';

type Performer = {
  name: string;
  images: {url: string}[];
};

const PerfomerList: React.FC<{performers: Performer[]}> = ({performers}) => {
  const {t} = useTranslation();

  const renderItem = ({item}: {item: Performer}) => {
    const {url = ''} = item?.images?.[0] || {};
    const {name = ''} = item || {};
    return (
      <View style={styles.performer}>
        <Image
          source={{uri: url}}
          style={styles.performerImg}
          resizeMode="cover"
        />
        <Text style={styles.performerName}>{name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('performing')}</Text>
      <FlatList
        data={performers}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.performingRow}
      />
    </View>
  );
};

export default PerfomerList;
