import {Linking} from 'react-native';

const openUrl = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};

const getFormattedNameFromEmail = (email: string) => {
  const name = email?.split('@')[0] || '';
  return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase() || '';
};

const formatDataTime = (
  localDate: string,
  localTime: string,
  options?: {
    withDate?: boolean;
    hour12?: boolean;
    locale?: string;
  },
): string => {
  const {withDate = false, hour12 = true, locale = 'en-US'} = options || {};

  // Combine date and time into ISO format
  const date = new Date(`${localDate}T${localTime}`);

  if (isNaN(date.getTime())) {
    return '';
  } // Handle invalid date

  if (withDate) {
    // Format full date and time
    return date.toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12,
    });
  }

  // Format just time
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  });
};

export {openUrl, getFormattedNameFromEmail, formatDataTime};
