import { nanoid } from "nanoid";

export const records = [
  {
    id: "recnINhkwR6jbqVZH",
    fields: {
      websiteURL: "https://www.42holborn.com/",
      serviceRating: "4",
      ethnicity: "",
      picture: {
        alt: "42 Holborn.png",
        src: "/images/1.png"
      },
      foodRating: "3.5",
      createdBy: "inu",
      location: "Holborn",
      name: "42 Holborn",
      inclusivityScore: 8.5,
      Keywords: ["Lunch", "Brunch", "Vegan", "Pizza"],
    },
    createdTime: "2023-12-06T09:06:59Z",
  },
  {
    id: "recnk4ufrFM91ZrNs",
    fields: {
      websiteURL: "https://45jermynst.com/",
      serviceRating: "5",
      ethnicity: "",
      picture: {
        alt: "45 Jermyn street.png",
        src: "/images/2.png"
      },
      foodRating: "4",
      createdBy: "inu",
      location: "Green Park",
      name: "45 Jermyn Street",
      inclusivityScore: 7.5,
      Keywords: ["Dinner", "Cocktails", "Seafood", "Steak"],
    },
    createdTime: "2024-01-29T10:47:29Z",
  },
  {
    id: "reclLrUiPUgHl5pBU",
    fields: {
      websiteURL: "https://www.081pizzeria.com/",
      serviceRating: "5",
      ethnicity: "",
      picture: {
        alt: "081 Pizzeria.png",
        src: "/images/3.png"
      },
      foodRating: "4",
      createdBy: "inu",
      location: "Peckham",
      name: "081 Pizzeria",
      inclusivityScore: 4.8,
      Keywords: ["Pizza", "Italian", "Casual Dining"],
    },
    createdTime: "2023-10-14T12:25:08Z",
  },
  {
    id: "recLWoft25bxWwcqf",
    fields: {
      websiteURL: "https://222vegan.com/",
      serviceRating: "5",
      ethnicity: "",
      picture: {
        alt: "West Kensington Image",
        src: "/images/4.png"
      },
      foodRating: "5",
      createdBy: "inu",
      location: "West Kensington",
      name: "222 Vegan Cuisine",
      inclusivityScore: 6.3,
      Keywords: ["Vegan", "Healthy", "Buffet"],
    },
    createdTime: "2023-10-14T12:42:15Z",
  },
  {
    id: "rec7fyaivG2AlYZFA",
    fields: {
      websiteURL: "https://www.agorabeckenham.co.uk/",
      serviceRating: "5",
      ethnicity: "",
      picture: {
        alt: "Agora.png",
        src: "/images/5.png"
      },
      foodRating: "4",
      createdBy: "inu",
      location: "Beckenham",
      name: "Agora",
      inclusivityScore: 7.8,
      Keywords: ["Mediterranean", "Turkish", "Grill"],
    },
    createdTime: "2024-03-08T20:04:09Z",
  },
  {
    id: "recWR2wwSKJVAEE1B",
    fields: {
      websiteURL: "https://www.akaralondon.co.uk/",
      serviceRating: "4.5",
      ethnicity: "",
      picture: {
        alt: "Akara.png",
        src: "/images/6.png"
      },
      foodRating: "4.5",
      createdBy: "inu",
      location: "Borough",
      name: "Akara ",
      inclusivityScore: 8,
      Keywords: ["Nigerian", "West African", "Fine Dining"],
    },
    createdTime: "2024-12-28T10:10:09Z",
  },
];

export const categories = [
  { id: nanoid(), label: "African", query: "african" },
  { id: nanoid(), label: "Breakfast & Brunch", query: "breakfast-brunch" },
  { id: nanoid(), label: "Lunch", query: "lunch" },
  { id: nanoid(), label: "Soul Food", query: "soul-food" },
  { id: nanoid(), label: "Caribbean", query: "caribbean" },
  { id: nanoid(), label: "New", query: "new" },
  { id: nanoid(), label: "Dinner", query: "dinner" },
  { id: nanoid(), label: "Vegan / Vegetarian", query: "vegan-vegetarian" },
  { id: nanoid(), label: "Wine, Bar, Lounge", query: "wine-bar-lounge" },
  { id: nanoid(), label: "Local Eats", query: "local-eats" },
  { id: nanoid(), label: "Desserts", query: "desserts" },
  { id: nanoid(), label: "Italian", query: "italian" },
  { id: nanoid(), label: "Cafe", query: "cafe" },
];
