
import prisma from '../src/libs/prisma';
import moment from 'moment';

export default async function getGraphData() {
  try {
    // Get the start and end dates for the data range (7 days ago to today)
    const startDate = moment().subtract(6, 'days').startOf('day');
    const endDate = moment().endOf('day');

    // Query the database to get order data grouped by createdAt
    const result = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: 'success', // Assuming the status is 'success' for completed orders
      },
      _sum: {
        amount: true,
      },
    });


    // Initialize an object to aggregate the data by day
    const aggregatedData = {};

    // Create a clone of the start date to iterate over each day
    let currentDate = startDate.clone();

    // Iterate over each day in the date range
    while (currentDate <= endDate) {
      // Format the day as a string
      const day = currentDate.format('dddd');

      // Initialize the aggregated data for the day
      aggregatedData[day] = {
        day,
        date: currentDate.format('YYYY-MM-DD'),
        totalAmount: 0,
      };

      // Move to the next day
      currentDate.add(1, 'day');
    }

    // Calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createdAt).format('dddd');
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    // Convert the aggregatedData object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );


    // Return the formatted data
    return formattedData;
  } catch (error) {
    console.error('Error fetching graph data:', error);
    throw new Error(error);
  }
}

