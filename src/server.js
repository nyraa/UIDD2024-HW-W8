import express from "express";
import fs from "fs";

const app = express();
const port = 48763;

const studentsData = fs.readFileSync("students.json", "utf8");
let students = JSON.parse(studentsData);

app.use(express.json());
app.use(express.static("dist"));

app.post("/api/list", (req, res) => {
    res.json(students);
});

app.post("/api/search", (req, res) => {
    const { query } = req.body;
    const name = students[query];
    if(name)
    {
        res.json({
            success: true,
            ID: query,
            Name: name
        });
    }
    else
    {
        res.json({
            success: false,
            message: "Student not found"
        });
    }
});

app.post("/api/add", (req, res) => {
    const { id, name } = req.body;
    if(id === "" || name === "")
    {
        res.json({
            success: false,
            message: "ID and Name cannot be empty"
        });
    }
    else if(students[id])
    {
        res.json({
            success: false,
            message: "Student already exists"
        });
    }
    else
    {
        students[id] = name;
        fs.writeFileSync("students.json", JSON.stringify(students));
        res.json({
            success: true,
            message: "Student added successfully"
        });
    }
});

app.post("/api/delete", (req, res) => {
    const { id } = req.body;
    if(students[id])
    {
        delete students[id];
        fs.writeFileSync("students.json", JSON.stringify(students));
        res.json({
            success: true,
            message: "Student deleted successfully"
        });
    }
    else
    {
        res.json({
            success: false,
            message: "Student not found"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});