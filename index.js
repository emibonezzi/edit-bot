const checkDb = require("./handlers/checkDb");

module.exports.handler = async (event, context) => {
  // Parse the event body
  const body = JSON.parse(event.body);
  console.log("Parsed body:", body);

  const isAMessage = body.message || body.edited_message ? true : false;

  // If update is not a message return
  if (!isAMessage) {
    console.log("Not a message ❌");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "success",
      }),
    };
  }

  // check db to see if new or not
  await checkDb(body);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "success",
    }),
  };
};
