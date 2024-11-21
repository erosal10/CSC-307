import express from "express";

const app = express();
const port = 8000;

app.use(express.json());


// Define the list of users
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspiring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

  const removeUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
      users["users_list"].splice(index, 1); // Remove the user if found
      return true;
    }
    return false;
  };

  const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  };


  app.get("/users", (req, res) => {
    const { name, job } = req.query;
  
    if (name && job) {
      const result = findUsersByNameAndJob(name, job);
      res.send({ users_list: result });
    } else if (name) {
      const result = findUserByName(name);
      res.send({ users_list: result });
    } else {
      res.send(users); // Return the full list if no query params are specified
    }
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const wasDeleted = removeUserById(id);
    if (wasDeleted) {
      res.status(200).send(); // Send an empty 200 response if deletion was successful
    } else {
      res.status(404).send("User not found."); // Send a 404 if the user was not found
    }
  });

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });
  
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
  

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});