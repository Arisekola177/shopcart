
'use client'

import { useEffect, useState } from "react";
import FormattedPrice from "../components/FormattedPrice";

const Summary = ({ products, orders, users }) => {
  const [summaryData, setSummaryData] = useState({
    sale: {
      label: 'Total Sale',
      digit: 0
    },
    products: {
      label: 'Total Product',
      digit: 0
    },
    orders: {
      label: 'Total Orders',
      digit: 0
    },
    paidOrders: {
      label: 'Paid Orders',
      digit: 0
    },
    unpaidOrders: {
      label: 'Unpaid Orders',
      digit: 0
    },
    users: {
      label: 'Total Users',
      digit: 0
    },
  });

  useEffect(() => {

    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'completed' || item.status === 'success') {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === 'completed' || order.status === 'success';
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === 'pending';
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] mx-auto pt-5 pb-10">
      <div>
        <h2 className="text-center text-xl font-bold py-6">Summary</h2>
        <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
          {
            summaryKeys && summaryKeys.map((key) => {
              return <div className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition" key={key}>
                <div className="text-xl md:text-4xl font-bold">
                  {
                    summaryData[key].label === 'Total Sale' ? <>{<FormattedPrice amount={summaryData[key].digit} /> }</> : <>{summaryData[key].digit}</>
                  }                                      
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Summary;
