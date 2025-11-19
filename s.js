

document.getElementById("nav-toggle").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("active");
});


document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // PRODUCT DATA FOR ALL ITEMS
    // ===============================
    const productData = {
        "Button Elegance Abaya": {
            seeMore: `
                <strong>Description:</strong> Premium fabric with elegant button styling.<br>
                <strong>Comfort:</strong> Soft, breathable and wrinkle-resistant.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Button Elegance Abaya:</strong><br>
                Ask about sizes, fabric type or available colors.
            `,
            report: `
                <strong>Report Button Elegance Abaya:</strong><br>
                Please indicate the issue (incorrect info, damaged item, etc.).
            `
        },

        "Chic Abaya": {
            seeMore: `
                <strong>Description:</strong> Lightweight elegant abaya perfect for summer.<br>
                <strong>Design:</strong> Flowing cut with soft touch.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Chic Abaya:</strong><br>
                Ask about fit, color options or fabric thickness.
            `,
            report: `
                <strong>Report Chic Abaya:</strong><br>
                Specify the problem (wrong price, image mismatch, etc.).
            `
        },

        "Comfort Luxe Abaya": {
            seeMore: `
                <strong>Description:</strong> Ultra-comfortable and breathable fabric.<br>
                <strong>Best Seller:</strong> Most loved comfort abaya.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Comfort Luxe Abaya:</strong><br>
                Ask about sizes or daily comfort level.
            `,
            report: `
                <strong>Report Comfort Luxe Abaya:</strong><br>
                Tell us what information is missing or incorrect.
            `
        },

        "Oversized Elegance Jacket": {
            seeMore: `
                <strong>Description:</strong> Trendy oversized jacket for layering.<br>
                <strong>Use:</strong> Perfect for fall and colder days.<br>
                <strong>Rating:</strong> ⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Oversized Elegance Jacket:</strong><br>
                Ask about sizing, thickness or color availability.
            `,
            report: `
                <strong>Report Oversized Elegance Jacket:</strong><br>
                Indicate any issue (wrong sizing info, damaged item, etc.).
            `
        },

        "Pashmina Scarf": {
            seeMore: `
                <strong>Description:</strong> Soft pashmina texture, elegant and lightweight.<br>
                <strong>Use:</strong> Suitable for daily and modest wear.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Pashmina Scarf:</strong><br>
                Ask about texture, thickness and available colors.
            `,
            report: `
                <strong>Report Pashmina Scarf:</strong><br>
                Mention any color errors or material issues.
            `
        },

        "Isdal": {
            seeMore: `
                <strong>Description:</strong> Traditional lightweight Isdal.<br>
                <strong>Design:</strong> Soft material with modest coverage.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Isdal:</strong><br>
                Ask about lengths, styles or material.
            `,
            report: `
                <strong>Report Isdal:</strong><br>
                Wrong image, missing details or incorrect size info.
            `
        },

        "Isdal Model II": {
            seeMore: `
                <strong>Description:</strong> Modern upgraded Isdal model.<br>
                <strong>Comfort:</strong> Smooth, soft and breathable.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Isdal Model II:</strong><br>
                Ask about fabric quality or durability.
            `,
            report: `
                <strong>Report Isdal Model II:</strong><br>
                Please describe the problem (fabric, details, etc.).
            `
        },

        "Beige Serenity Scarf": {
            seeMore: `
                <strong>Description:</strong> Light beige minimalist scarf.<br>
                <strong>Use:</strong> Perfect neutral accessory.<br>
                <strong>Rating:</strong> ⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Beige Serenity Scarf:</strong><br>
                Ask about tones, texture or sizing.
            `,
            report: `
                <strong>Report Beige Serenity Scarf:</strong><br>
                Report color mismatch or fabric defects.
            `
        },

        "Grey Harmony Qamiss": {
            seeMore: `
                <strong>Description:</strong> Elegant grey qamiss with fine stitching.<br>
                <strong>Use:</strong> Ideal for events and daily wear.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Grey Harmony Qamiss:</strong><br>
                Ask about sizes, measurements or fabric.
            `,
            report: `
                <strong>Report Grey Harmony Qamiss:</strong><br>
                Specify wrong details or item issues.
            `
        },

        "Pure White Qamiss": {
            seeMore: `
                <strong>Description:</strong> Premium white qamiss with clean style.<br>
                <strong>Fabric:</strong> Wrinkle-resistant high-quality material.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Pure White Qamiss:</strong><br>
                Ask about transparency, ironing or sizing.
            `,
            report: `
                <strong>Report Pure White Qamiss:</strong><br>
                Mention any color, stitching or quality problems.
            `
        },

        "Midnight Black Qamiss": {
            seeMore: `
                <strong>Description:</strong> Deep black qamiss with classy finish.<br>
                <strong>Use:</strong> Perfect for occasions.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐☆
            `,
            question: `
                <strong>Questions about Midnight Black Qamiss:</strong><br>
                Ask about durability or fabric care.
            `,
            report: `
                <strong>Report Midnight Black Qamiss:</strong><br>
                Specify any issue you encountered.
            `
        },

        "Emerald Green Qamiss": {
            seeMore: `
                <strong>Description:</strong> Unique emerald green qamiss.<br>
                <strong>Style:</strong> Luxury finish with premium feel.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Emerald Green Qamiss:</strong><br>
                Ask about washing, size or color tone.
            `,
            report: `
                <strong>Report Emerald Green Qamiss:</strong><br>
                Report incorrect details or color mismatch.
            `
        },

        "Steel Valor Collection": {
            seeMore: `
                <strong>Description:</strong> Strong masculine perfume with long-lasting scent.<br>
                <strong>Packaging:</strong> Premium design.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Steel Valor Collection:</strong><br>
                Ask about fragrance notes or recommended usage.
            `,
            report: `
                <strong>Report Steel Valor Collection:</strong><br>
                Report wrong scent, bottle issues or delivery problems.
            `
        },

        "Ibadah Collection": {
            seeMore: `
                <strong>Description:</strong> Fresh spiritual fragrance suitable for daily use.<br>
                <strong>Popularity:</strong> Customer favorite.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Ibadah Collection:</strong><br>
                Ask about longevity or scent type.
            `,
            report: `
                <strong>Report Ibadah Collection:</strong><br>
                Report incorrect description or defective bottle.
            `
        },

        "Fakhr Latafa Parfum": {
            seeMore: `
                <strong>Description:</strong> Affordable, strong warm fragrance.<br>
                <strong>Quality:</strong> Long-lasting for its price.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Fakhr Latafa Parfum:</strong><br>
                Ask about fragrance notes or intensity.
            `,
            report: `
                <strong>Report Fakhr Latafa Parfum:</strong><br>
                Report bottle issues or scent problems.
            `
        },

        "Gift Collection": {
            seeMore: `
                <strong>Description:</strong> Luxury gift set perfect for occasions.<br>
                <strong>Includes:</strong> Multiple premium accessories.<br>
                <strong>Rating:</strong> ⭐⭐⭐⭐⭐
            `,
            question: `
                <strong>Questions about Gift Collection:</strong><br>
                Ask about set contents or availability.
            `,
            report: `
                <strong>Report Gift Collection:</strong><br>
                Report missing items or packaging damage.
            `
        }
    };



    // =====================================
    // APPLY SAME ACTION TO ALL ITEMS
    // =====================================

    const detailsElements = document.querySelectorAll(".directional details");

    detailsElements.forEach(details => {
        const summary = details.querySelector("summary");
        const liItems = details.querySelectorAll("ul li");
        const infoBox = details.parentElement.querySelector(".info-box");
        const card = details.closest(".col-6");
        const productName = card.querySelector("h2").textContent.trim();

        liItems.forEach(li => {
            li.addEventListener("click", e => {
                e.preventDefault();

                const data = productData[productName];
                if (!data) return;

                let message = "";

                if (li.classList.contains("see-more")) {
                    message = data.seeMore;
                } 
                else if (li.classList.contains("question")) {
                    message = data.question;
                } 
                else if (li.classList.contains("report")) {
                    message = data.report;
                }

                summary.style.display = "none";
                details.querySelector("ul").style.display = "none";

                infoBox.innerHTML = message;
                infoBox.style.display = "block";
            });
        });
    });


    // RESET WHEN CLICK OUTSIDE
    window.addEventListener("click", e => {
        if (!e.target.closest(".col-6")) {
            document.querySelectorAll(".info-box").forEach(b => b.style.display = "none");
            document.querySelectorAll(".directional details summary").forEach(s => s.style.display = "block");
            document.querySelectorAll(".directional details ul").forEach(ul => ul.style.display = "block");
        }
    });

});



document.addEventListener("DOMContentLoaded", () => {

    // ----------- MODAL / PAYMENT POPUP -----------
    const modal = document.getElementById("modal");
    const modalFrame = document.getElementById("modalFrame");
    const closeModal = document.getElementById("closeModal");
    const buyNow = document.getElementById("buyNow");

    function openCartModal(button) {
        const card = button.closest(".col-6");
        if (!card) return;

        const name = card.querySelector("h2").textContent;
        const price = card.querySelector(".price p").textContent;

        modalFrame.src = `payment.htm?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
        modal.style.display = "flex";
    }

    // Add event listener to all Add to Cart buttons
    const addButtons = document.querySelectorAll(".directional button");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            openCartModal(button);
        });
    });

    // Buy Now button opens payment page directly
    if (buyNow) {
        buyNow.addEventListener("click", (e) => {
            e.preventDefault();
            modalFrame.src = "payment.htm";
            modal.style.display = "flex";
        });
    }

    // Close modal button
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
            modalFrame.src = ""; // reset iframe
        });
    }

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalFrame.src = "";
        }
    });

    // ----------- SMOOTH SCROLL -----------
    

    const btn = document.getElementById("scrollLink"); 
const feature = document.getElementById("features");

if (btn && feature) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        feature.scrollIntoView({ behavior: "smooth" });
    });
}

// Other links to features (class)
const featureLinks = document.querySelectorAll(".scrollFeature");

featureLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        if (feature) {
            feature.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

const sugLinks = document.querySelectorAll(".scroll");
const sug = document.getElementById("suggestedItems");

sugLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        if (sug) {
            sug.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

    // ----------- FAQ TOGGLE -----------
    const faqItems = document.querySelectorAll(".faq_item");

    function toggleFAQ(item) {
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove("active");
        });
        item.classList.toggle("active");
    }

    faqItems.forEach(item => {
        const toggleBtn = item.querySelector(".faq-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => toggleFAQ(item));
        }
    });

});

    
// ----------- PHONE BUTTON FUNCTIONALITY -----------
const phoneBtn = document.getElementById("phoneBtn");
const phoneNumber = "+213555555555";

function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

phoneBtn.onclick = (e) => {
    e.preventDefault();
    if (isMobile()) {
        // Open phone app on mobile
        window.location.href = "tel:" + phoneNumber;
    } else {
        // Copy number and alert on desktop
        navigator.clipboard.writeText(phoneNumber);
        alert("Phone number copied: " + phoneNumber);
    }
};
       // the pop up. for the pages about us and contact us
  document.addEventListener("DOMContentLoaded", () => {

  // About popup
  const aboutPopup = document.getElementById("aboutPopup");
  document.querySelectorAll(".aboutLink").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      aboutPopup.classList.remove("hidden");
    });
  });
  document.getElementById("closeAbout").addEventListener("click", () => {
    aboutPopup.classList.add("hidden");
  });

  // Contact popup
  const contactPopup = document.getElementById("contactPopup");
  document.querySelectorAll(".contactLink").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      contactPopup.classList.remove("hidden");
    });
  });
  document.getElementById("closeContact").addEventListener("click", () => {
    contactPopup.classList.add("hidden");
  });

  // Close popup if clicking outside the box
  [aboutPopup, contactPopup].forEach(popup => {
    popup.addEventListener("click", e => {
      if (e.target === popup) {
        popup.classList.add("hidden");
      }
    });
  });

});


