const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

// router.get('/categories', (req,res) => {
//     const data=[
//         {
//             id:1,
//             name:'seminar',
//         },

//         {
//             id:2,
//             name:'mern',
//         }
// ];

//     res.status(200).json({
//         data,
//     });
// });
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get(
  "/categories/:Categoryid",
  authenticateUser,
  authorizeRoles("organizer"),
  find
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  create
);
router.put(
  "/categories/:Categoryid",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:Categoryid",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
