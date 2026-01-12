'use client';

import Image from 'next/image';
import {useReservation} from './ReservationContext';
import {differenceInDays} from 'date-fns';
import {createReservationAction} from '../_lib/actions';
import {useFormStatus} from 'react-dom';

function ReservationForm({cabin, user}) {
  const {id, name, maxCapacity, regularPrice, discount, image, description} =
    cabin;

  const {range, clearRange} = useReservation();

  const startDate = range.from;
  const endDate = range.to;

  console.log({startDate, endDate});
  const numNights = differenceInDays(endDate, startDate);
  const totalPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate: startDate,
    endDate: endDate,
    numNights,
    cabinPrice: regularPrice,
    extrasPrice: 0,
    totalPrice,
    status: 'unconfirmed',
    hasBreakfast: false,
    isPaid: false,
    cabinId: id,
  };

  const createReservationActionWithData = createReservationAction.bind(
    null,
    reservationData
  );

  const handleFormAction = async (formData) => {
    await createReservationActionWithData(formData);
    clearRange();
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            width={32}
            height={32}
            className="rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={handleFormAction}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({length: maxCapacity}, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            defaultValue={description}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate & !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button />
          )}
        </div>
      </form>
    </div>
  );
}

function Button() {
  const {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? 'Reserving...' : 'Reserve now'}
    </button>
  );
}

export default ReservationForm;
