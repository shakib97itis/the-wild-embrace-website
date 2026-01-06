'use server';

import {revalidatePath} from 'next/cache';
import {deleteBooking, getBookings, updateBooking} from './data-service';
import {redirect} from 'next/navigation';

const {signIn, signOut, auth} = require('./auth');

export async function signInAction() {
  await signIn('google', {redirectTo: '/account'});
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}

// RESERVATION ACTIONS
export async function updateReservationAction(formData) {
  // get session
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  // get form data
  const bookingId = Number(formData.get('reservationId'));
  const numGuests = Number(formData.get('numGuests'));
  const observations = formData.get('observations');
  console.log({bookingId, numGuests, observations});

  if (!bookingId) throw new Error('invalid id');

  if (!Number.isInteger(bookingId)) {
    throw new Error('Invalid reservation id');
  }

  if (!Number.isInteger(numGuests)) {
    throw new Error('Invalid number of guests');
  }

  const bookings = await getBookings(session.user.id);
  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error('Unauthorized id');

  // update the reservation
  await updateBooking(bookingId, {numGuests, observations});

  // redirect
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect('/account/reservations');
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const bookings = await getBookings(session.user.id);
  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error('Unauthorized');

  await deleteBooking(bookingId);
  revalidatePath('/account/reservations');
}
