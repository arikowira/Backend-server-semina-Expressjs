const express = require('express');
const router = express();
const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
  getParticipants,
  oneParticipants,
} = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

//router
router.post(
  '/organizers',
  authenticateUser,
  authorizeRoles('owner'),
  createCMSOrganizer
);
router.post(
  '/users',
  authenticateUser,
  authorizeRoles('organizers'),
  createCMSUser
);

router.get('/users', authenticateUser, authorizeRoles('owner'), getCMSUsers);

router.get(
  '/participants',
  authenticateUser,
  authorizeRoles('owner'),
  getParticipants
);

router.get(
  '/participants/:id',
  authenticateUser,
  authorizeRoles('owner'),
  oneParticipants
);

module.exports = router;
