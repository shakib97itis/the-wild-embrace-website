import {getBookedDatesByCabinId, getCabin} from '@/app/_lib/data-service';

export async function GET(req, {params}) {
  const cabinId = params.cabinId;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({cabin, bookedDates});
  } catch (error) {
    return Response.json({error: error.message}, {status: 500});
  }
}
