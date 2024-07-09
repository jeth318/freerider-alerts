export type OpeningHours = {
  openingTime: string | null;
  closingTime: string | null;
};

export type RegularOpeningHours = {
  [key: number]: OpeningHours;
};

export type Location = {
  name: string;
  tracCode: string;
  country: string;
  emailAddress: string;
  address: string;
  city: string;
  phoneNumber: string;
  regularOpeningHours: RegularOpeningHours;
  geoLat: number;
  geoLon: number;
  kiosk: boolean;
  infoTextDropOffEnglish: string | null;
  infoTextDropOffNative: string | null;
  infoTextLocationEnglish: string | null;
  infoTextLocationNative: string | null;
  infoTextParkingEnglish: string | null;
  infoTextParkingNative: string | null;
  infoTextMiscEnglish: string | null;
  infoTextMiscNative: string | null;
  infoTextReturnEnglish: string | null;
  infoTextReturnNative: string | null;
};

export type Route = {
  id: number;
  transportOfferId: number;
  pickupLocation: Location;
  returnLocation: Location;
  priorityOrder: number;
  distance: number;
  originalDistance: number;
  travelTime: number;
  originalTravelTime: number;
  availableAt: string;
  latestReturn: string;
  expireTime: string;
  carModel: string;
  publicDescription: string;
  publicInformation: string;
};

export type TransportData = {
  pickupLocationName: string;
  returnLocationName: string;
  routes: Route[];
};

export type DbRide = {
  id: string;
  textModifiers: string;
  hertzRideId: string;
};

export type TransportDataWithSubscribers = TransportData & {
  subscribers: string[];
};

export type SubscribedRide = {
  recipients: any;
  pickupLocationName: string;
  returnLocationName: string;
  routes: Route[];
};

// User Model
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// Offer Model
export type Offer = {
  id: number;
  transportOfferId: number;
  fromCity: string;
  toCity: string;
  added: string;
};

// Subscription Model
export type Subscription = {
  id: number;
  userId: string;
  fromCity: string | null;
  toCity: string | null;
};

export type SubscriptionWithUser = Subscription & User;

// City Model
export type City = {
  id: number;
  name: string;
};
