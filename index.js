module.exports.handler = async (event, context) => {
  // Parse the event body
  const body = JSON.parse(event.body);
  console.log("Parsed body:", body);
};
