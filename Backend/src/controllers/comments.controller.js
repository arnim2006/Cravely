const Comment = require('../models/comments.model');
const foodModel = require('../models/food.model');

// Create a new comment
async function createComment(req, res) {
    const { foodId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ message: "Comment text cannot be empty." });
    }

    try {
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found." });
        }

        // Create comment record
        let comment = await Comment.create({
            user: req.user._id,
            food: foodId,
            text: text.trim()
        });

        // Increment count inside food model (denormalization)
        await foodModel.findByIdAndUpdate(foodId, { $inc: { commentsCount: 1 } });

        // Populate user name to send back to client
        comment = await comment.populate('user', 'name');

        return res.status(201).json({
            message: "Comment added successfully",
            comment
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Server error creating comment.", error: error.message });
    }
}

// Get all comments for a food item
async function getComments(req, res) {
    const { foodId } = req.params;

    try {
        const comments = await Comment.find({ food: foodId })
            .populate('user', 'name')
            .sort({ createdAt: -1 }); // newest first

        return res.status(200).json({
            message: "Comments fetched successfully",
            comments
        });
    } catch (error) {
        console.error("Error getting comments:", error);
        return res.status(500).json({ message: "Server error fetching comments.", error: error.message });
    }
}

// Delete a comment
async function deleteComment(req, res) {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Verify ownership (only the user who created it can delete)
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment." });
        }

        await Comment.findByIdAndDelete(commentId);

        // Decrement count inside food model
        await foodModel.findByIdAndUpdate(comment.food, { $inc: { commentsCount: -1 } });

        return res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Server error deleting comment.", error: error.message });
    }
}

module.exports = {
    createComment,
    getComments,
    deleteComment
};
