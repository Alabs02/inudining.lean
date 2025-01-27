export type BasicInfo = {
  restaurantName: string;
  cuisine: string[];
  description: string;
  logo: File | null;
}

export type LocationContact = {
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  website: string;
}

export type Schedule = {
  weekdays_opening_hours: number;
  weekdays_opening_mins: number;
  weekdays_closing_hours: number;
  weekdays_closing_mins: number;
  weekends_opening_hours: number;
  weekends_opening_mins: number;
  weekends_closing_hours: number;
  weekends_closing_mins: number;
}

export type DiningDetails = {
  schedule: Schedule;
  priceAverage: number;
  vibe: string;
  guestCapacity: number;
  outdoorSeating: boolean;
}

export type PhotosMenu = {
  photos: File[];
  menu: File | null;
  signatureDishes: string;
}

export type  InclusivityDetails = {
  features: string[];
  training: string;
  communityInitiatives: string;
}

export type RestaurantFormState = {
  step: number;
  basicInfo: BasicInfo;
  locationContact: LocationContact;
  diningDetails: DiningDetails;
  photosMenu: PhotosMenu;
  inclusivityDetails: InclusivityDetails;
  confirmation: boolean;
  setStep: (step: number) => void;
  setBasicInfo: (data: Partial<BasicInfo>) => void;
  setLocationContact: (data: Partial<LocationContact>) => void;
  setDiningDetails: (data: Partial<DiningDetails>) => void;
  setPhotosMenu: (data: Partial<PhotosMenu>) => void;
  setInclusivityDetails: (data: Partial<InclusivityDetails>) => void;
  setConfirmation: (confirmation: boolean) => void;
  getProgress: () => number;
  resetForm: () => void;
  resetStore: () => void;
}