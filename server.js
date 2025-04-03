const jsonServer = require("json-server");
const cors = require("cors"); // Import CORS package

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Adjust if using jobs.json
const middlewares = jsonServer.defaults();

// ✅ Enable CORS
server.use(cors());

// ✅ Manually Set CORS Headers (For Extra Security)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle Preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Use JSON Server middlewares and routes
server.use(middlewares);
server.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
