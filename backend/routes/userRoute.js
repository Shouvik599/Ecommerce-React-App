const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSpecificUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorisedRoles("admin"), getAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorisedRoles("admin"), getSpecificUser)
    .put(isAuthenticatedUser, authorisedRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteUser);




module.exports = router; 