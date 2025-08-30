import {colors} from './colors';
import i18n from './i18n';

export const actionItems = [
  {
    key: 'my_tickets',
    icon: 'ticket-outline',
    color: colors.boldViolet,
    text: i18n.t('my_tickets'),
    onPress: () => {},
  },
  {
    key: 'favorites',
    icon: 'heart-outline',
    color: colors.favorite,
    text: i18n.t('favorites'),
    onPress: () => {},
  },
  {
    key: 'settings',
    icon: 'settings-outline',
    color: colors.softGreen,
    text: i18n.t('settings'),
    onPress: () => {},
  },
  {
    key: 'change_language',
    icon: 'language-outline',
    color: colors.darkBlue,
    text:
      i18n.language === 'ar'
        ? i18n.t('change_to_english')
        : i18n.t('change_to_arabic'),
    onPress: () => {},
  },
  {
    key: 'logout',
    icon: 'log-out-outline',
    color: colors.error,
    text: i18n.t('logout'),
    onPress: () => {},
  },
];

export const LANGUAGES = {
  en: 'en',
  ar: 'ar',
};

export const LANGUAGES_NAMES = {
  en: 'English',
  ar: 'Arabic',
};

export const SNACKBAR_TYPES = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};
