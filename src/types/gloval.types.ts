export type TFacility = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
  photoUrl: string;
} ;

export type TFacilitySelect = {
  _id: string;
  name: string;
};
export type TFormValues = {
  date: string;
  facility: string;
};

export type TAvailabilityCheckerProps = {
  setQuery: (query: TFormValues) => void;
};
