const router = require('express').Router();
const {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/user-controller");


router.route('/').get(getUser).post(createUser);


  router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);


 router.route('/:id/friends').post(addFriend);


router.route('/:studentId/friends/:friendId').delete(removeFriend);

module.exports = router;