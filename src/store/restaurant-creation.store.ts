import { Store } from "@/models";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: Omit<
  Store.RestaurantFormState,
  | "setStep"
  | "setBasicInfo"
  | "setLocationContact"
  | "setDiningDetails"
  | "setPhotosMenu"
  | "setInclusivityDetails"
  | "setConfirmation"
  | "getProgress"
  | "resetForm"
  | "resetStore"
> = {
  step: 1,
  basicInfo: {
    restaurantName: "",
    cuisine: [],
    description: "",
    logo: null,
  },
  locationContact: {
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    website: "",
  },
  diningDetails: {
    openingHours: {},
    priceRange: "",
    vibe: "",
    guestCapacity: 0,
    outdoorSeating: false,
  },
  photosMenu: {
    photos: [],
    menu: null,
    signatureDishes: [],
  },
  inclusivityDetails: {
    features: [],
    training: "",
    communityInitiatives: "",
  },
  confirmation: false,
};

// Create the store
const useRestaurantFormStore = create<Store.RestaurantFormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Setters for each step
      setStep: (step) => set({ step }),
      setBasicInfo: (data) =>
        set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),
      setLocationContact: (data) =>
        set((state) => ({
          locationContact: { ...state.locationContact, ...data },
        })),
      setDiningDetails: (data) =>
        set((state) => ({
          diningDetails: { ...state.diningDetails, ...data },
        })),
      setPhotosMenu: (data) =>
        set((state) => ({ photosMenu: { ...state.photosMenu, ...data } })),
      setInclusivityDetails: (data) =>
        set((state) => ({
          inclusivityDetails: { ...state.inclusivityDetails, ...data },
        })),
      setConfirmation: (confirmation) => set({ confirmation }),

      // Getter for progress calculation (returns percentage completed)
      getProgress: () => {
        const totalSteps = 6;
        const currentStep = get().step;
        return Math.round((currentStep / totalSteps) * 100);
      },

      // Reset the form state
      resetForm: () => set({ ...initialState }),

      // Reset only the store (includes step)
      resetStore: () => set((state) => ({ ...initialState, step: state.step })),
    }),
    {
      name: "inudining-lean/restaurant-form-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useRestaurantFormStore };
