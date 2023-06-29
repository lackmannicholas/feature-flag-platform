const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const AWS = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

const FEATURE_FLAG_TABLE = process.env.FEATURE_FLAG_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());
app.use(cors());

app.get("/user/:userId/feature-flag/:featureKey", async function (req, res) {
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Key: {
      userId: req?.params?.userId, // hash key
      featureKey: req?.params?.featureKey // sort key
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
    res.status(500).json({ error: "Could not retreive feature flag" });
  }
});

app.get("/user/:userId/feature-flag/", async function (req, res) {
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    KeyConditionExpression:
      "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": req?.params?.userId
      }
  }

  try {
    const { Items } = await dynamoDbClient.send(new QueryCommand(params));
    if (Items) {
      res.json(Items);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "featureKey"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive feature flag" });
  }
});

app.post("/feature-flag", async function (req, res) {
  let buff = Buffer.from(req.body, "base64");
  let eventBodyStr = buff.toString('UTF-8');
  let eventBody = JSON.parse(eventBodyStr);
  const { userId, featureKey, targeting, value } = eventBody;
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Item: {
      userId: userId,
      featureKey: featureKey,
      targeting: targeting,
      value: value,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ featureKey, value });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create feature flag: " + featureKey  });
  }
});

app.put("/feature-flag", async function (req, res) {
  let buff = Buffer.from(req.body, "base64");
  let eventBodyStr = buff.toString('UTF-8');
  let eventBody = JSON.parse(eventBodyStr);
  const { userId, featureKey, targeting, value } = eventBody;
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Item: {
      userId: userId,
      featureKey: featureKey,
      targeting: targeting,
      value: value,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ featureKey, value });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update feature flag: " + featureKey });
  }
});

app.delete("/user/:userId/feature-flag/:featureKey", async function (req, res) {
  const params = {
    TableName: FEATURE_FLAG_TABLE,
    Item: {
      userId: req?.params?.userId,
      featureKey: req?.params?.featureKey
    },
  };

  try {
    await dynamoDbClient.send(new DeleteCommand(params));
    res.json({ featureKey });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete feature flag: " + featureKey });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
