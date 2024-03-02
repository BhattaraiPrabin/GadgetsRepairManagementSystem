const app = require("./app");
const PORT = process.env.PORT || 4000; // Provides Port For Server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
