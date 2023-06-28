const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const FEATURE_FLAG_TABLE = process.env.FEATURE_FLAG_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/feature-flag/:featureKey", async function (req, res) {
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Key: {
      userId: req.params.userId,
      featureKey: req.params.featureKey
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { featureKey, value } = Item;
      res.json({ featureKey, value });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "featureKey"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/feature-flag", async function (req, res) {
  const { userId, featureKey, value } = req.body;

  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Item: {
      userId,
      featureKey,
      value,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
