const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('./src/models/user.model');
const foodPartnerModel = require('./src/models/foodpartner.model');
const foodModel = require('./src/models/food.model');
const Like = require('./src/models/likes.model');
const saveModel = require('./src/models/save.model');
const Comment = require('./src/models/comments.model');

// Load environment variables (fallback to localhost if undefined)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cravely';

async function seed() {
  try {
    console.log('Connecting to database:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('Database connected successfully.');

    // Clear existing data (optional, but good for clean seeding)
    console.log('Clearing old collections...');
    await userModel.deleteMany({});
    await foodPartnerModel.deleteMany({});
    await foodModel.deleteMany({});
    await Like.deleteMany({});
    await saveModel.deleteMany({});
    await Comment.deleteMany({});

    console.log('Creating test user...');
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = await userModel.create({
      fullName: 'John Doe',
      email: 'user@cravely.com',
      password: hashedPassword
    });
    console.log('Created User:', user.email);

    console.log('Creating test food partner...');
    const partner = await foodPartnerModel.create({
      name: 'Spicy Hut',
      contactName: 'Jane Smith',
      phone: '+1 555 019 2834',
      address: '456 Gourmet Boulevard, Foodville',
      email: 'partner@cravely.com',
      password: hashedPassword
    });
    console.log('Created Partner:', partner.email);

    console.log('Creating food items/videos...');
    const items = [
      {
        name: 'Spicy Paneer Wrap',
        video: 'https://ik.imagekit.io/iwwlgc22b/259ee4c4-98cf-46d2-bf0d-446479f3dced_badpltuDQr?updatedAt=1766672805866',
        description: 'Fresh paneer sautéed in secret hot sauces, wrapped in a whole-wheat tortilla with crunchy veggies.',
        foodPartner: partner._id,
        likeCount: 15,
        savesCount: 8
      },
      {
        name: 'Avocado Green Salad',
        video: 'https://ik.imagekit.io/iwwlgc22b/a5141f5a-5100-4d9f-8174-34e023c9659f_2sXiJ52b4?updatedAt=1766771604688',
        description: 'Freshly sliced avocado mixed with baby spinach, tomatoes, cucumbers, and a zesty olive oil vinaigrette dressing.',
        foodPartner: partner._id,
        likeCount: 22,
        savesCount: 14
      },
      {
        name: 'Woodfired Pepperoni Pizza',
        video: 'https://ik.imagekit.io/iwwlgc22b/9d2c2981-2810-4a45-b8b2-beabd9ea5511_ya1xiuWM1?updatedAt=1766754607629',
        description: 'A classic Italian thin crust pizza topped with spicy pepperoni, melted mozzarella cheese, and fresh basil leaves.',
        foodPartner: partner._id,
        likeCount: 47,
        savesCount: 29
      }
    ];

    const seededFoods = await foodModel.insertMany(items);
    console.log(`Successfully seeded ${seededFoods.length} food items.`);

    // Add sample likes/saves for our test user
    console.log('Adding sample user likes and bookmarks...');
    await Like.create({ user: user._id, food: seededFoods[0]._id });
    await Like.create({ user: user._id, food: seededFoods[2]._id });
    await saveModel.create({ user: user._id, food: seededFoods[1]._id });

    // Update counts
    await foodModel.findByIdAndUpdate(seededFoods[0]._id, { $inc: { likeCount: 1 } });
    await foodModel.findByIdAndUpdate(seededFoods[2]._id, { $inc: { likeCount: 1 } });
    await foodModel.findByIdAndUpdate(seededFoods[1]._id, { $inc: { savesCount: 1 } });

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seed();
