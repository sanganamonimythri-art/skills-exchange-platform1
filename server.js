const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload API
app.post("/upload", upload.single("notes"), (req, res) => {
    res.send("File uploaded successfully");
});

// Get all files
app.get("/files", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) return res.send([]);
        res.send(files);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));