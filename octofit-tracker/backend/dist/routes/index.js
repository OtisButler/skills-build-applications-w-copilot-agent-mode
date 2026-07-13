"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../config/api");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
async function getData(query) {
    try {
        return await query;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
router.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await getData(user_1.User.find({}).lean());
    res.json({
        message: 'Users endpoint',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        users
    });
});
router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await getData(team_1.Team.find({}).lean());
    res.json({
        message: 'Teams endpoint',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        teams
    });
});
router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await getData(activity_1.Activity.find({}).lean());
    res.json({
        message: 'Activities endpoint',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        activities
    });
});
router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await getData(leaderboard_1.Leaderboard.find({}).lean());
    res.json({
        message: 'Leaderboard endpoint',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        leaderboard
    });
});
router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await getData(workout_1.Workout.find({}).lean());
    res.json({
        message: 'Workouts endpoint',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        workouts
    });
});
exports.default = router;
