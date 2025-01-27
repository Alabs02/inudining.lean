import * as yup from "yup";

const hoursRule = yup
  .number()
  .required("Weekday opening hours are required")
  .min(0, "Hours must be at least 0")
  .max(23, "Hours must be at most 23");

const minsRule = yup
  .number()
  .min(0, "Minutes must be at least 0")
  .max(59, "Minutes must be at most 59")
  .nullable();

const restaurantFormSchema = yup.object({
  // Step 1: Basic Information
  basicInfo: yup.object({
    restaurantName: yup
      .string()
      .min(3, "Restaurant name must be at least 3 characters")
      .required("Restaurant name is required"),
    cuisine: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one cuisine type must be selected"),
    description: yup
      .string()
      .max(150, "Description must be at most 150 characters")
      .required("Description is required"),
    logo: yup
      .mixed()
      .required("Restaurant logo is required")
      .test("fileType", "Only images are allowed", (value) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/png",
          "image/svg",
        ].includes((value as File)?.type)
      ),
  }),

  // Step 2: Location & Contact
  locationContact: yup.object({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postalCode: yup
      .string()
      .matches(/^\d{5,6}$/, "Postal code must be 5 or 6 digits")
      .required("Postal code is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        "Please enter a valid phone number with country code"
      )
      .required("Phone number is required"),
    // website: yup
    //   .string()
    //   .url('Please enter a valid URL')
    //   .required('Website link is required'),
  }),

  // Step 3: Dining Details
  diningDetails: yup.object({
    schdule: yup.object({
      weekdays_opening_hours: hoursRule,
      weekdays_opening_mins: minsRule,
      weekdays_closing_hours: hoursRule,
      weekdays_closing_mins: minsRule,
      weekends_opening_hours: hoursRule,
      weekends_opening_mins: minsRule,
      weekends_closing_hours: hoursRule,
      weekends_closing_mins: minsRule,
    }),
    priceAverage: yup
      .number()
      .min(0, "Price average must be above 0")
      // .oneOf(['$', '$$', '$$$', '$$$$'], 'Invalid price range')
      .required("Price Average is required"),
    vibe: yup
      .string()
      .oneOf(
        ["casual", "fine dining", "café", "fast food", "bistro"],
        "Invalid restaurant vibe"
      )
      .required("Restaurant vibe is required"),
    guestCapacity: yup
      .number()
      .integer("Guest capacity must be a whole number")
      .min(10, "Guest capacity must be at least 10")
      .required("Guest capacity is required"),
    outdoorSeating: yup
      .boolean()
      .required("Outdoor seating information is required"),
  }),

  // Step 4: Photos & Menu
  photosMenu: yup.object({
    photos: yup
      .array()
      .of(yup.mixed())
      .min(2, "At least 2 photos are required")
      .test(
        "fileType",
        "Only images are allowed",
        (value) =>
          Array.isArray(value) &&
          value.every((file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/svg", "image/webp"].includes(
              (file as File)?.type
            )
          )
      ),
    menu: yup
      .mixed()
      .required("Menu file is required")
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => (value as File)?.type === "application/pdf"
      ),
    signatureDishes: yup
      .string()
      .required("Please, add your signature dishes"),
  }),

  // Step 5: Inclusivity Details
  inclusivityDetails: yup.object({
    features: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one inclusivity feature must be selected"),
    training: yup
      .string()
      .oneOf(["none", "basic", "advanced"], "Invalid training level")
      .required("Training level is required"),
    communityInitiatives: yup.string().nullable(),
  }),

  // Step 6: Review & Submit
  confirmation: yup
    .boolean()
    .oneOf(
      [true],
      "You must confirm that the information provided is accurate"
    ),
});

export { restaurantFormSchema };
