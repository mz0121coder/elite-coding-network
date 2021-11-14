const mainUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "";

module.exports = mainUrl;
