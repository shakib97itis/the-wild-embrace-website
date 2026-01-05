'use server';

import {revalidatePath} from 'next/cache';
import {deleteBooking, getBookings} from './data-service';

const {signIn, signOut, auth} = require('./auth');

export async function signInAction() {
  await signIn('google', {redirectTo: '/account'});
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}

// RESERVATION ACTIONS
export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const bookings = await getBookings(session.user.id);
  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error('Unauthorized');

  await deleteBooking(bookingId);
  revalidatePath('/account/reservations');
}
