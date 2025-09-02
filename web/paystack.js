document.getElementById("payButton")?.addEventListener("click", () => {
  let handler = PaystackPop.setup({
    key: "Makhubu Technologies 1565556", // Replace with your live/public key
    email: "user@example.com",        // Replace dynamically with logged-in user email
    amount: 5000,                     // Amount in kobo/cents (R50.00 = 5000)
    currency: "ZAR",
    callback: function(response) {
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: response.reference })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Payment verified! You are now Pro.");
        } else {
          alert("Payment verification failed.");
        }
      });
    },
    onClose: function() {
      alert("Payment window closed.");
    }
  });
  handler.openIframe();
});
