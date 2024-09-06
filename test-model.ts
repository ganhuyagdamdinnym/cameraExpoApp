// // User Entity
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   userType: "Customer" | "Organizer";
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Event Entity
// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   startTime: Date;
//   endTime: Date;
//   organizerId: string;
//   imageUrl: string;
//   price: number;
//   availableSeats: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Seat Entity
// interface Seat {
//   id: string;
//   eventId: string;
//   seatNumber: string;
//   isReserved: boolean;
//   reservedAt?: Date; // Nullable
//   userId?: string; // Nullable, only set if reserved
//   price: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Booking Entity
// interface Booking {
//   id: string;
//   userId: string;
//   eventId: string;
//   seatId: string;
//   bookingTime: Date;
//   paymentStatus: "Pending" | "Paid" | "Cancelled";
//   totalPrice: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Payment Entity
// interface Payment {
//   id: string;
//   bookingId: string;
//   userId: string;
//   amount: number;
//   paymentMethod: "CreditCard" | "PayPal" | "Other";
//   paymentTime: Date;
//   status: "Success" | "Failed" | "Pending";
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Example of a User object
// // const exampleUser: User = {
// //   id: "user1",
// //   name: "John Doe",
// //   email: "john.doe@example.com",
// //   password: "hashedpassword",
// //   phoneNumber: "+1234567890",
// //   userType: "Customer",
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// // };

// // Example of an Event object
// // const exampleEvent: Event = {
// //   id: "event1",
// //   title: "Concert",
// //   description: "A live concert event.",
// //   location: "Venue Name, City",
// //   startTime: new Date("2024-08-15T19:00:00Z"),
// //   endTime: new Date("2024-08-15T22:00:00Z"),
// //   organizerId: "user2",
// //   imageUrl: "https://example.com/image.jpg",
// //   price: 50.0,
// //   availableSeats: 100,
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// // };

// // // Example of a Seat object
// // const exampleSeat: Seat = {
// //   id: "seat1",
// //   eventId: "event1",
// //   seatNumber: "A1",
// //   isReserved: true,
// //   reservedAt: new Date(),
// //   userId: "user1",
// //   price: 50.0,
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// // };

// // // Example of a Booking object
// // const exampleBooking: Booking = {
// //   id: "booking1",
// //   userId: "user1",
// //   eventId: "event1",
// //   seatId: "seat1",
// //   bookingTime: new Date(),
// //   paymentStatus: "Pending",
// //   totalPrice: 50.0,
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// // };

// // // Example of a Payment object
// // const examplePayment: Payment = {
// //   id: "payment1",
// //   bookingId: "booking1",
// //   userId: "user1",
// //   amount: 50.0,
// //   paymentMethod: "CreditCard",
// //   paymentTime: new Date(),
// //   status: "Success",
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// // };
