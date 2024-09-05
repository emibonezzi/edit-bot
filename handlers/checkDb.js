const mongoose = require("mongoose");
const sendText = require("./sendText");

const messageSchema = new mongoose.Schema({
  messageID: String,
  chatID: String,
  originalText: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = async (update) => {
  try {
    // connect to DB
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.1enyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    // if update is a new message AND HAS text save it to DB
    if (update.message && update.message.text) {
      const message = new Message({
        messageID: update.message.message_id,
        chatID: update.message.chat.id,
        originalText: update.message.text,
      });
      // save it to DB
      await message.save();
    }

    // if update is an edited message AND HAS text, checkDB retrieve original and send message
    if (update.edited_message && update.edited_message.text) {
      const message = await Message.findOne({
        messageID: update.edited_message.message_id,
        chatID: update.edited_message.chat.id,
      });

      // if there's no edit just return
      if (update.edited_message.text === message.originalText) return;
      // reply to message with original text
      await sendText(
        message.chatID,
        message.messageID,
        message.originalText,
        update.edited_message.text
      );
    }

    mongoose.connection.close();
  } catch (err) {
    console.log("Error in dealing with db...", err.message);
    throw err;
  }
};
