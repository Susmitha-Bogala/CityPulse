export interface Event {
  id: string;
  name: string;
  images?: { url: string }[];
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name?: string;
      city?: { name?: string };
      state?: { stateCode?: string };
      location?: {
        latitude?: string;
        longitude?: string;
      };
    }>;
  };
}

export interface TMEvent {
  id: string;
  name: string;
  images?: { url: string }[];
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name?: string;
      city?: { name?: string };
    }>;
  };
}

export type LocationProps = {
  event: {
    _embedded?: {
      venues?: Array<{
        name?: string;
        city?: { name?: string };
        state?: { stateCode?: string };
        location?: {
          latitude?: string;
          longitude?: string;
        };
      }>;
    };
  };
};

export interface EventCardProps {
  event: TMEvent;
  onPress: () => void;
}

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
