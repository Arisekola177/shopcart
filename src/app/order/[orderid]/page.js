


import getOrderById from '../../../../actions/getOrderById';
import Nulldata from '../../components/Nulldata';
import OrderDetails from './OrderDetails'

const OrderPage = async ({ params }) => {

         const { orderid } = params; 

        const order = await getOrderById(orderid); 

        if (!order) {
            return <Nulldata title="No order found" />;
        }

        return (
             <div>
                <OrderDetails order={order} />
            </div>
        );
  
};

export default OrderPage;



