const express = require('express');
const router = express.Router({mergeParams: true});//allows to get ids of router

const { createMessage, getMessage, deleteMessage }  = require("../handlers/messages");

// prefix - /api/user/:id/messages
router.route("/").post(createMessage);//make sure that prefix starts with slash

router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;