const router = require('express').Router();
const {
    getUsers,
  getUserById,
  createUser,
 updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/user-controller");


router.route('/').get(getUsers).post(createUser);


router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);


 router.route('/:id/friends').post(addFriend);


router.route('/:studentId/friends/:friendId').delete(removeFriend);

module.exports = router;