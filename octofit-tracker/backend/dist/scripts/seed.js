"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({})
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Ava Patel', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Improve endurance' },
            { name: 'Liam Chen', email: 'liam@example.com', role: 'member', fitnessGoal: 'Build strength' },
            { name: 'Mina Alvarez', email: 'mina@example.com', role: 'member', fitnessGoal: 'Lose weight' }
        ]);
        const teams = await team_1.Team.insertMany([
            { name: 'North Stars', sport: 'Running', members: ['ava@example.com', 'liam@example.com'], captain: 'ava@example.com' },
            { name: 'Peak Performers', sport: 'Cycling', members: ['mina@example.com'], captain: 'mina@example.com' }
        ]);
        const activities = await activity_1.Activity.insertMany([
            { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 35, distanceKm: 5.2, caloriesBurned: 320, date: new Date('2026-07-10') },
            { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 45, caloriesBurned: 280, date: new Date('2026-07-11') },
            { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: new Date('2026-07-12') }
        ]);
        const leaderboard = await leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id.toString(), name: 'Ava Patel', points: 980, streak: 8 },
            { userId: users[1]._id.toString(), name: 'Liam Chen', points: 845, streak: 5 },
            { userId: users[2]._id.toString(), name: 'Mina Alvarez', points: 760, streak: 4 }
        ]);
        const workouts = await workout_1.Workout.insertMany([
            { name: 'Tempo Run', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40, focus: 'Endurance' },
            { name: 'Upper Body Blast', category: 'Strength', difficulty: 'Beginner', durationMinutes: 30, focus: 'Upper body' },
            { name: 'Core Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 25, focus: 'Core stability' }
        ]);
        console.log('Seeded users:', users.length);
        console.log('Seeded teams:', teams.length);
        console.log('Seeded activities:', activities.length);
        console.log('Seeded leaderboard entries:', leaderboard.length);
        console.log('Seeded workouts:', workouts.length);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
