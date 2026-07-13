import { Router } from 'express';
import { getApiBaseUrl } from '../config/api';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

async function getData<T>(query: Promise<T[]>): Promise<T[]> {
  try {
    return await query;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

router.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await getData(User.find({}).lean());
  res.json({
    message: 'Users endpoint',
    baseUrl: getApiBaseUrl(),
    users
  });
});

router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await getData(Team.find({}).lean());
  res.json({
    message: 'Teams endpoint',
    baseUrl: getApiBaseUrl(),
    teams
  });
});

router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await getData(Activity.find({}).lean());
  res.json({
    message: 'Activities endpoint',
    baseUrl: getApiBaseUrl(),
    activities
  });
});

router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await getData(Leaderboard.find({}).lean());
  res.json({
    message: 'Leaderboard endpoint',
    baseUrl: getApiBaseUrl(),
    leaderboard
  });
});

router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await getData(Workout.find({}).lean());
  res.json({
    message: 'Workouts endpoint',
    baseUrl: getApiBaseUrl(),
    workouts
  });
});

export default router;
