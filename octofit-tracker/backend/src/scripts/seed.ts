import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Improve endurance' },
      { name: 'Liam Chen', email: 'liam@example.com', role: 'member', fitnessGoal: 'Build strength' },
      { name: 'Mina Alvarez', email: 'mina@example.com', role: 'member', fitnessGoal: 'Lose weight' }
    ]);

    const teams = await Team.insertMany([
      { name: 'North Stars', sport: 'Running', members: ['ava@example.com', 'liam@example.com'], captain: 'ava@example.com' },
      { name: 'Peak Performers', sport: 'Cycling', members: ['mina@example.com'], captain: 'mina@example.com' }
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 35, distanceKm: 5.2, caloriesBurned: 320, date: new Date('2026-07-10') },
      { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 45, caloriesBurned: 280, date: new Date('2026-07-11') },
      { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: new Date('2026-07-12') }
    ]);

    const leaderboard = await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: 'Ava Patel', points: 980, streak: 8 },
      { userId: users[1]._id.toString(), name: 'Liam Chen', points: 845, streak: 5 },
      { userId: users[2]._id.toString(), name: 'Mina Alvarez', points: 760, streak: 4 }
    ]);

    const workouts = await Workout.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
