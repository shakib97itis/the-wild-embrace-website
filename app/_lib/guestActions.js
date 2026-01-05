'use server';

import {revalidatePath} from 'next/cache';
import {auth} from './auth';
import {updateGuest} from './data-service';

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const nationalId = formData.get('nationalId');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  //   validate nationalId abAB09 16char)
  if (!/^(?:\d{10}|\d{13}|\d{17})$/.test(nationalId))
    throw new Error('Invalid national ID');

  //   validate nationality
  if (!/^[A-Za-z]+$/.test(nationality)) throw new Error('Invalid nationality');

  if (!countryFlag) throw new Error('Invalid country flag');

  //   update guest in database
  await updateGuest(session.user.id, {
    nationalId,
    nationality,
    countryFlag,
  });

  revalidatePath('/account/profile');
}
