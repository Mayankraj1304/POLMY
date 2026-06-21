const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const calls = {
  1: {
    id: 1,
    title: "Sales Follow-up",
    transcript:
      "Customer is interested in the premium plan and requested pricing details.",
  },
  2: {
    id: 2,
    title: "Support Call",
    transcript:
      "Customer reported login issues and password reset was performed.",
  },
  3: {
    id: 3,
    title: "Demo Call",
    transcript:
      "Product demonstration completed successfully.",
  },
};

app.get("/api/calls", async (req, res) => {
  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  res.status(200).json(Object.values(calls));
});

app.get("/api/calls/:id", async (req, res) => {
  const id = req.params.id;

  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const call = calls[id];

  if (!call) {
    return res.status(404).json({
      message: "Call not found",
    });
  }

  res.status(200).json(call);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});