const axios = require("axios");

module.exports = async (chatID, messageID, originalText, newText) => {
  const newMessage = `🚨👮‍♀️ EDIT POLICE 👮‍♀️🚨\n\nThis message was changed from:\n\n_"${originalText}"_\n\n⬇️\n\n*"${newText}"*`;

  await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: chatID,
      reply_to_message_id: messageID,
      text: newMessage,
      parse_mode: "Markdown",
    }
  );
};
