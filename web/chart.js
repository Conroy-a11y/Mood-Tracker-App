let chart;

async function loadChart() {
  const res = await fetch("/api/moods");
  const data = await res.json();

  const labels = data.map(item => new Date(item.created_at).toLocaleDateString("en-ZA"));
  const moods = data.map(item => item.sentiment);
  const scores = data.map(item => item.score);

  const sentimentValues = moods.map(m => {
    if (m === "POSITIVE") return 1;
    if (m === "NEGATIVE") return -1;
    return 0;
  });

  const ctx = document.getElementById("moodChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Mood (Sentiment Index)",
          data: sentimentValues,
          borderColor: "blue",
          fill: false
        },
        {
          label: "Confidence Score",
          data: scores,
          borderColor: "green",
          fill: false
        }
      ]
    }
  });
}

// Load chart on dashboard page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("moodChart")) {
    loadChart();
  }
});
