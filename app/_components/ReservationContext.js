'use client';
import {createContext, useContext, useState} from 'react';

const ReservationContext = createContext();
const initialReservationRange = {from: null, to: null};

export default function ReservationProvider({children}) {
  const [range, setRange] = useState(initialReservationRange);
  const clearRange = () => setRange(initialReservationRange);

  return (
    <ReservationContext.Provider value={{range, setRange, clearRange}}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error(
      'useReservation must be used within a ReservationsProvider'
    );
  }

  return context;
};
