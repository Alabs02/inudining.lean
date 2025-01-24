import { HTMLMotionProps } from "framer-motion";

export type AnimatedLinkProps = {
  href:string;
  label: string;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export type FilterChipProps = HTMLMotionProps<"button"> & {
  label: string;
}

export type TPicture = {
  alt: string;
  src: string;
}

export type TFields = {
  websiteURL: string;
  serviceRating: string;
  ethnicity: string;
  picture: TPicture;
  foodRating: string;
  createdBy: string;
  location: string;
  name: string;
  Keywords: string[];
}

export type LocationCardProps = HTMLMotionProps<"div"> & {
  id: string;
  fields: TFields;
  createdTime: string;
};
