# VRosArt Website - Clean Semantic Implementation

A modern, responsive website for artist Rosagrata Vanessa, built with clean semantic HTML5, CSS3, and vanilla JavaScript.

## 🎨 Project Overview

This is a complete reimplementation of vrosart.com using modern web standards, featuring:
- Clean, semantic HTML5 markup
- Modern CSS3 with CSS Grid and Flexbox
- Vanilla JavaScript (ES6+) for all interactions
- Fully responsive design
- Optimized performance
- Accessibility-focused

## 📁 Project Structure

```
vrosart-website/
│
├── index.html              # Home page with hero, products, and contact
├── product-detail-site/    # Details about each product
│   └── product-1.html      # Present the product 1
├── commissions.html        # Commission request page
├── prints.html             # Prints page (under construction)
├── about.html              # About/Bio page
│
├── css/
│   └── style.css          # Main stylesheet with all styling
│
├── js/
│   └── script.js          # Main JavaScript for interactivity
│
├── images/                # Image assets directory
│   └── product/           # save product figure
│     └── product-1.jpeg        # paintining 1
│   └── favicon.png        # Site favicon (placeholder)
│
└── README.md              # This file
```




## 💻 Setup & Usage

### Local Development

1. **Clone or download the website folder**
   ```bash
   cd vrosart-website
   ```

2. **Open with a local server**
   
   Option A - Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```
   
   Option B - Using Node.js:
   ```bash
   npx http-server -p 8000
   
   # Then visit: http://localhost:8000
   ```
   
   Option C - Using VS Code:
   - Install "Live Server" extension
   - Right-click on index.html
   - Select "Open with Live Server"

3. **Or simply open the HTML files directly in your browser**
   - Navigate to the folder
   - Double-click index.html

### Deployment

Add to Cart → Checkout (Stripe) → Payment confirmed → You get an email → You create a label on Easyship → Customer gets tracking link. 

Your site → tells Stripe → "today's cart is: product A x1 + product B x2"
Stripe → creates a fresh checkout URL just for this order → sends it back
Your site → redirects customer to that unique URL

Customer clicks Checkout
        ↓
Your JS sends cart to a small server function (Vercel)
        ↓
Vercel function calls Stripe: "make a checkout for these items"
        ↓
Stripe returns: { url: "https://checkout.stripe.com/pay/cs_abc123" }
        ↓
Customer is redirected to that unique URL → pays → comes back to your success page

1. 给commissions 和 prints 添加背景和长方形
2. 补齐所有绘画
3. 法语页面
4. 制作好配适手机版本
5. 参考document


## 📄 License

All content and artwork © Vanessa Rosagrata. All rights reserved.
Code implementation provided as-is for portfolio website purposes.

## 🤝 Support

For questions or issues with the implementation, please refer to standard web development documentation:
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

## 🎯 Future Enhancements

Potential improvements for the website:
- Add e-commerce functionality
- Implement product detail pages
- Add image lightbox/gallery viewer
- Integrate blog functionality
- Add multilingual support (English/French/Italian)
- Implement shopping cart
- Add payment processing
- Create admin dashboard
- Add analytics tracking
- Implement SEO optimizations

---

**Built with ❤️ using modern web standards**
