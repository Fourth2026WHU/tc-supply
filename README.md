# TC Supply website (ไทชิ ซับพลาย)

The public website for the family factory: who we are, what we make, and how to ask for a quote. It is plain HTML, CSS and JavaScript, with nothing to install or build, the same as the inventory app.

## Pages

- Home
- Products, with categories and search
- Product details
- Quote list: customers pick products, enter their details, and send the request by LINE or email
- About us
- Contact us

There is no checkout and there are no prices on the site. Thai is the default, with a button to switch to English.

## Change the content

Everything about the factory is in `site-data.js`: the contact details, the story, the categories and the products. Each piece of text has a Thai and an English version.

When the real details are in, set `sample: false` at the top of that file. That removes the sample bar, the "To be added" cards and any story paragraph still marked `draft: true`.

Lists left empty stay hidden: `facts`, `certificates`, `customers`, `ordering` and `faq`. Examples of each are in the comments in `site-data.js`.

### Add product photos

1. Make a folder called `images` next to `index.html` and put the photos in it.
2. In `site-data.js`, list them for the product: `images: ["images/product-1.jpg", "images/product-1-side.jpg"]`.

Square photos look best, about 1000 × 1000 pixels. A product with no photo shows a drawing.

## How quote requests work

The site has no database, so a request is not saved anywhere. It writes a message for the customer, who sends it to the factory by LINE or email, or calls. The LINE and email buttons appear once `line` and `email` are filled in under `contact`. LINE's pre-filled message only works in the phone apps, so add `lineQr` for people on a computer.

A customer with nothing on the list can still ask for something by typing it in the form.

The quote list is kept in each customer's browser.

## Online

The site is hosted free on GitHub Pages, from the `main` branch of this repository.

For now it has a password screen and asks Google not to list it. This only keeps casual visitors out. The files, including the password, can be read by anyone on GitHub, so do not put anything private in them, such as prices or customer names.

### Launch to the public

1. In `site-data.js`, replace the sample products and categories with real ones (delete `sampleProduct`).
2. Write the real story and remove `draft: true` from each paragraph.
3. Read every line in `hero`, `promises`, `text` and `steps`, and remove anything that is not true for the factory.
4. Have a Thai lawyer check the privacy notice for quote requests, and add it.
5. In `site-data.js`, set `password: ""` and `sample: false`.
6. In `index.html`, remove the `robots` line.
7. Search the site for "ตัวอย่าง", "Sample" and "To be added". None should appear.
