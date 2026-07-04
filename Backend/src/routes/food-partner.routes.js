const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/* /api/food-partner/dashboard/analytics */
router.get("/dashboard/analytics",
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.getAnalytics);

/* /api/food-partner/:id */
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

module.exports = router;