
const form = document.getElementById("payment-form");

// Regex validation functions
function isCardNumber(number) {
    // remove spaces/dashes and check 16 digits only
    return /^\d{16}$/.test(number.replace(/\s|-/g, ""));
}

function isCvc(cvc) {
    return /^\d{3,4}$/.test(cvc);
}

function isExpiry(month, year) {
    return month >= 1 && month <= 12 && /^\d{2}$/.test(year);
}

function isName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
}

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById("credit-card").value.trim();
    const name = document.getElementById("card-name").value.trim();
    const cvc = document.getElementById("cvc-id").value.trim();
    const month = document.getElementById("exp-month").value.trim();
    const year = document.getElementById("exp-year").value.trim();

    // Check all fields are filled
    if (!cardNumber || !name || !cvc || !month || !year) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate card number
    if (!isCardNumber(cardNumber)) {
        alert("Card number must be exactly 16 digits, numbers only.");
        return;
    }

    // Validate cardholder name
    if (!isName(name)) {
        alert("Cardholder name must contain letters only.");
        return;
    }

    // Validate CVC
    if (!isCvc(cvc)) {
        alert("CVC must be 3 or 4 digits.");
        return;
    }

    // Validate expiry date
    if (!isExpiry(Number(month), year)) {
        alert("Invalid expiry date. Month 1-12, year 2 digits.");
        return;
    }

    alert(`Processing payment for ${name} with card ${cardNumber}`);
});

// Populate product info dynamically from URL
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const productPrice = params.get("price");

    // Update receipt and total
    const productNameSpan = document.querySelector('.receipt [data-product-name]');
      const productPriceSpan = document.querySelector(".receipt li:nth-child(3) span:last-child");
    const totalSpan = document.querySelector(".total p.price strong");

    if (productName && productNameSpan) productNameSpan.textContent = productName;
    if (productPrice && productPriceSpan) productPriceSpan.textContent = productPrice;
    if (productPrice && totalSpan) totalSpan.textContent = productPrice;
});
