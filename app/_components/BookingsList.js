'use client';
import {useOptimistic} from 'react';
import ReservationCard from './ReservationCard';
import {deleteReservationAction} from '../_lib/actions';

function BookingsList({bookings}) {
  const [optimisticBookings, deleteOptimisticBooking] = useOptimistic(
    bookings,
    (state, bookingId) => {
      return state.filter((booking) => booking.id !== bookingId);
    }
  );

  function handleDelete(bookingId) {
    confirm('Are you sure you want to delete this reservation?');
    deleteOptimisticBooking(bookingId);
    deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default BookingsList;
