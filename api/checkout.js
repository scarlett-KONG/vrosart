// ============================================================
//  api/checkout.js  —  Vercel Serverless Function
//  This runs on the SERVER (not in the browser).
//  It receives the cart from the frontend, tells Stripe what
//  to charge, and returns a unique checkout URL.
// ============================================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// ↑ NEVER put your secret key directly in code.
//   Store it as an environment variable in Vercel dashboard.

module.exports = async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // ── 1. Read the cart sent from the browser ──────────────
        // Example cart arriving from frontend:
        // [
        //   { name: "L'Enigma del Sacro Cuore", price: 250.00, qty: 1, img: "..." },
        //   { name: "La Dolce Vita",             price: 1650.00, qty: 1, img: "..." }
        // ]
        const { cartItems, lang = 'en' } = req.body;

        // Sanitise lang to prevent path traversal — only allow 'en' or 'fr'
        const safeLang = ['en', 'fr'].includes(lang) ? lang : 'en';

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // ── 2. Convert cart items into Stripe's format ───────────
        // Stripe calls them "line_items". Each needs:
        //   - name of the product
        //   - price in CENTS (not euros! €250 = 25000 cents)
        //   - quantity
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    // Optional: show the painting image on the Stripe checkout page
                    images: item.img && item.img.startsWith('http') ? [item.img] : [],
                },
                // Stripe uses the smallest currency unit (cents)
                // So €250.00 → 25000,  €1650.00 → 165000
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.qty,
        }));

        // ── 3. Create the Checkout Session with Stripe ───────────
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],   // accept credit/debit cards
            line_items: lineItems,            // ← your dynamic cart goes here
            mode: 'payment',                  // one-time payment (not subscription)

            // Where to send the customer after payment
            success_url: `${process.env.YOUR_DOMAIN}/${safeLang}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:  `${process.env.YOUR_DOMAIN}/${safeLang}/index.html#originals`,

            // Collect shipping address from the customer
            shipping_address_collection: {
                allowed_countries: [
                    'FR', 'IT', 'DE', 'GB', 'ES', 'BE', 'NL', 'CH',
                    'US', 'CA', 'AU', 'JP',   // add any countries you ship to
                ],
            },

            // Optional: collect phone number for courier contact
            phone_number_collection: { enabled: true },
        });

        // ── 4. Return the unique URL to the browser ──────────────
        // The browser will redirect the customer here.
        // This URL is unique per order — it expires after 24h.
        res.status(200).json({ url: session.url });

    } catch (error) {
        console.error('Stripe error:', error.message);
        res.status(500).json({ error: 'Payment session could not be created.' });
    }
};