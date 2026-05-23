import "dotenv/config";

const url = new URL(process.env.DATABASE_URL!);

console.log("=== Connection Details ===");
console.log("Protocol:", url.protocol);
console.log("Username:", url.username);
console.log("Password:", url.password ? "***" : "KOSONG");
console.log("Host:", url.hostname);
console.log("Port:", url.port);
console.log("Database:", url.pathname);
console.log("Full URL:", process.env.DATABASE_URL);