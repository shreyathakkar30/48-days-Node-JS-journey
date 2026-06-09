const express = require("express");
const {handleGetAllUsers, 
     handlegetUserByID,
     handleUpdateUserById,
     handleDeleteUserById,
     handleCreateNewUser} = require('../controllers/user')
const router = express.Router();

router.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser)

router.route('/:id')
.get(handlegetUserByID)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)



module.exports = router;

