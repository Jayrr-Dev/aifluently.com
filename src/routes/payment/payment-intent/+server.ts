
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from "$env/static/private";
import type { RequestHandler } from '@sveltejs/kit'; // Import the type

interface PaymentIntentBody {
    amount: number;
    currency: string;
    description: string;
}

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY);

// handles POST / create-payment-intent
export const POST: RequestHandler = async (request) => {
    const { amount, currency, description }: PaymentIntentBody = await request.request.json();
    // create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        description: description,
        automatic_payment_methods: {
            enabled: true,
        },
    })
    return json({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        description: paymentIntent.description,
        currency: paymentIntent.currency,
    })
}
