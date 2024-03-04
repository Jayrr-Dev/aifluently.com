<script>
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe'

    let stripe = null
    let clientSecret = null
    let error = null
    let elements
    let processing = false
    let paymentIntent = null
    let amount = null
    let description = ''
    let currency = 'usd'

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY);



        // TODO: input items to be purchased within supabase, and call createPaymentIntent
        // with an item ID. Then use the item ID to get the amount and description from the
        // database. For now, we'll just hardcode the amount and description.
        // --> this way we can use the same payment page for all purchases
        const intentData = await createPaymentIntent(1000, 'usd', '100 Fluently Tokens');
        clientSecret = intentData.clientSecret; // Extract the clientSecret
        // Assuming you have defined amount and description in your Svelte component's script
        amount = intentData.amount;
        currency = intentData.currency;
        description = intentData.description;
    });

    async function createPaymentIntent(amount=1000, currency='usd', description) {
        const response = await fetch('/payment/payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount, currency, description})
        })
        // const { clientSecret } = await response.json()
        const intentData = await response.json()
        return intentData;
    }

    async function submit() {
        if (processing) return
        processing = true
        const result = await stripe.confirmPayment({elements, redirect: 'if_required'})
        console.log({ result })
        if (result.error) {
            error = result.error
            processing = false
        } else {
            goto('/payment/thanks')
        }
    }
</script>

<div class="payment-container">

    <h1 class="text-2xl font-semibold mt-4 mb-2">{description}</h1>

    {#if error}
        <p class="text-red-500 mt-8 mb-2">{error.message} Please try again.</p>
    {/if}

    {#if clientSecret}
        <Elements
            {stripe}
            {clientSecret}
            theme="stripe"
            labels="floating"
            rules={{ '.Input': { border: 'solid 1px #0002' } }}
            bind:elements
        >
            <form on:submit|preventDefault={submit} class="flex flex-col gap-4">
                <LinkAuthenticationElement />
                <PaymentElement />


                <button
                    disabled={processing}
                    class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {#if processing}
                        Processing...
                    {:else}
                        Pay ${(amount / 100).toFixed(2)} {currency.toUpperCase()}
                    {/if}
                </button>
            </form>
        </Elements>
    {:else}
        <div class="text-center">Loading...</div>
    {/if}
</div>

<style>
.payment-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.error {
    color: tomato;
    margin: 2rem 0 0;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 1rem 0;
    background-color: #f9f9f9;
    width: 95%;
    max-width: 500px;
}

button {
    padding: 1rem;
    border-radius: 5px;
    border: solid 1px #ccc;
    font-size: 1.2rem;
    margin: 1rem 0;
}
</style>
