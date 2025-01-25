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

export type DiningDetails = {
  openingHours: Record<string, string>;
  priceRange: string;
  vibe: string;
  guestCapacity: number;
  outdoorSeating: boolean;
}

export type PhotosMenu = {
  photos: File[];
  menu: File | null;
  signatureDishes: string[];
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