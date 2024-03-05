import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from "$env/static/private";
import type { RequestHandler } from '@sveltejs/kit'; // Import the type
import { supabase } from '$lib/supabaseClient';

// Define the expected structure of a product
interface Product {
    id: number;
    amount: number; // Assuming amount is in the smallest currency unit (e.g., cents for USD)
    description: string;
}

interface PaymentIntentBody {
    id: number;
}

// Initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY);

async function fetchProductFromSupabase(id: number): Promise<Product | null> {
    const { data, error } = await supabase
        .from('payed_items')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error.message);
        return null;
    }
    return data;
}

// Handles POST / create-payment-intent
export const POST: RequestHandler = async ({ request }) => {
    const { id }: PaymentIntentBody = await request.json();

    // Fetch the product from the database
    const product = await fetchProductFromSupabase(id);
    if (!product) {
        return json({ error: 'Product not found or error fetching product' }, { status: 404 });
    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.amount,
        currency: 'usd', // Set your currency here
        description: product.description,
        automatic_payment_methods: { enabled: true },
    });

    return json({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        description: paymentIntent.description,
        currency: paymentIntent.currency,
    });
};
