type User = {
  id: String;
  name: String;
  email: String;
  profileImage: String;
  password: String;
  phoneNumber: String;
  orderedEventIDs: String[]; //event IDs
  isOwnerOfOrg: boolean;
  orgInfo?: {
    id: String;
    name: String;
    email: String;
    phoneNumber: String;
    eventIDs: String[]; //event IDs
    description: String;
  };
};

interface Event {
  id: string;
  organizerId: string; //organizer ID
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  pictures: string[];
  seatPrice: number;
  likes: [{ userId: string }];
  seatQuantity: Number;
  seats: Seat[];
}

// type Organizer = {
//   id: String;
//   name: String;
//   email: String;
//   phoneNumber: String;
//   eventIDs: String[]; //event IDs
//   description: String;
// };

interface Seat {
  seatNumber: string;
  isOccupied: boolean;
  purchaser: string; //userId
}

type Order = {
  id: string;
  eventId: string;
  seatNumber: Number;
  paidAmount: number;
  userId: string;
};
