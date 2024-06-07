import { buffer } from "micro";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10'
});

export const config = {
    api: {
        bodyParser: false
    }
};


export default async function POST(req, res) {
   
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    if (!sig) {
        return res.status(400).send("Missing the stripe signature");
    }


    let event;

    try {
        event = stripe.webhooks.constructEvent(
            buf, sig, process.env.STRIPE_WEBHOOKS_SECRET
        );
    } catch (error) {
        return res.status(400).send("webhook error" + error);
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge = event.data.object;

            break;
        default:
            console.log('unhandled event type:' + event.type);
    }

    res.json({ received: true });
};


 


