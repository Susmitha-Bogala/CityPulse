import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from '../styles';

const AboutSection = ({info}: {info: string}) => {
  const [showMore, setShowMore] = useState(false);
  const {t} = useTranslation();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('about')}</Text>
      <Text style={styles.sectionText} numberOfLines={showMore ? 0 : 3}>
        {info}
      </Text>
      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <Text style={styles.linkText}>
          {showMore ? t('see_less') : t('see_more')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutSection;
