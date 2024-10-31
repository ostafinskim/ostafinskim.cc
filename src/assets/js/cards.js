/**
 * Card enhancement to trigger the main link whenever the card area is clicked
 * @see https://css-tricks.com/block-links-the-search-for-a-perfect-solution/
 */

const cardsArray = document.querySelectorAll('[data-component="card"]');

if (cardsArray.length) {
    // Loop through cards adding a click event and identifying the main link
    cardsArray.forEach((card) => {
        const mainLink = card.querySelector('.card__link');
        const clickableElems = card.querySelectorAll('[data-click]');

        // Allow other links/buttons in the card to still be "clickable"
        if (clickableElems) {
            clickableElems.forEach((elem) => {
                return elem.addEventListener('click', (event) => {
                    return event.stopPropagation();
                });
            });
        }

        card.addEventListener('click', (event) => {
            if (event.redispatched || event.target === mainLink) {
                return;
            }

            let noTextSelected = !window.getSelection().toString();

            if (noTextSelected) {
                const event2 = new MouseEvent('click', event);
                event2.redispatched = true;
                mainLink.dispatchEvent(event2);
            }
        });
    });
}
