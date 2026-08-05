import { app } from "./app.js";

// Start application and listen for incoming requests
app.listen(process.env.PORT, () => {
  console.log(`API listening on http://localhost:${process.env.PORT}`);
});
