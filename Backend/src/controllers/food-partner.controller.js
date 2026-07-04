const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

async function getAnalytics(req, res) {
    const partnerId = req.foodPartner._id;
    try {
        const partner = await foodPartnerModel.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        const foodItems = await foodModel.find({ foodPartner: partnerId });

        let totalLikes = 0;
        let totalSaves = 0;
        let totalComments = 0;

        foodItems.forEach(item => {
            totalLikes += (item.likeCount || 0);
            totalSaves += (item.savesCount || 0);
            totalComments += (item.commentsCount || 0);
        });

        // Find top performing dish
        const sortedByLikes = [...foodItems].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        const topDish = sortedByLikes[0] ? { name: sortedByLikes[0].name, likes: sortedByLikes[0].likeCount || 0 } : null;

        // Prepare chart data for frontend comparison
        const dishPerformance = foodItems.map(item => ({
            _id: item._id,
            name: item.name,
            likes: item.likeCount || 0,
            saves: item.savesCount || 0,
            comments: item.commentsCount || 0
        }));

        return res.status(200).json({
            message: "Analytics fetched successfully",
            stats: {
                totalMeals: foodItems.length,
                totalLikes,
                totalSaves,
                totalComments,
                customersServed: partner.customersServed || 0,
                topDish,
                dishPerformance
            }
        });
    } catch (error) {
        console.error("Error fetching partner analytics:", error);
        return res.status(500).json({ message: "Server error fetching analytics", error: error.message });
    }
}

module.exports = {
    getFoodPartnerById,
    getAnalytics
};