const express = require("express");
const fs = require("fs");
const users = require("./Sample_Data.json");
const { error } = require("console");

const app = express();
const port = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//ROUTE
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API → GET all users

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// REST API → GET, PATCH, DELETE by ID
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    return res.json(user);
  })

  // UPDATE USER
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "User Not Found" });
    }

    users[index] = { ...users[index], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
      res.json({
        status: "success",
        updatedUser: users[index],
      });
    });
  })

  // DELETE USER
  .delete((req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "User Not Found" });
    }

    users.splice(index, 1);

    fs.writeFile("./Sample_Data.json", JSON.stringify(users, null, 2), () => {
      res.json({
        status: "success",
        message: "User deleted successfully",
      });
    });
  });

// CREATE USER
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All Fields are Req..." });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./Sample_Data.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(port, () => console.log(`Server Started at PORT:${port}`));
