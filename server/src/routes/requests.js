import { Router } from 'express';
import { db } from '../db/knex.js';

const router = Router();

const VALID_STATUSES = ['Pending', 'Approved', 'Rejected'];

function validateDate(val) {
  return !isNaN(Date.parse(val));
}

// POST /api/requests - create vacation request
router.post('/', async (req, res, next) => {
  try {
    const { user_id, start_date, end_date, reason } = req.body || {};
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    if (!start_date || !validateDate(start_date)) {
      return res.status(400).json({ error: 'start_date is required (YYYY-MM-DD)' });
    }
    if (!end_date || !validateDate(end_date)) {
      return res.status(400).json({ error: 'end_date is required (YYYY-MM-DD)' });
    }
    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({ error: 'end_date must be on/after start_date' });
    }

    const inserted = await db('vacation_requests')
      .insert({ user_id, start_date, end_date, reason: reason || null, status: 'Pending' });
    const insertedId = Array.isArray(inserted) ? inserted[0] : inserted;
    const created = await db('vacation_requests').where('id', insertedId).first();
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// GET /api/requests - list requests
// Optional query: user_id, status
router.get('/', async (req, res, next) => {
  try {
    const { user_id, status } = req.query || {};
    let q = db('vacation_requests').select('*').orderBy('created_at', 'desc');
    if (user_id) q = q.where('user_id', user_id);
    if (status && VALID_STATUSES.includes(status)) q = q.where('status', status);
    const rows = await q;
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

// POST /api/requests/:id/approve
router.post('/:id/approve', async (req, res, next) => {
  try {
    const { id } = req.params;
    const count = await db('vacation_requests')
      .where('id', id)
      .update({ status: 'Approved', comments: null });
    if (!count) return res.status(404).json({ error: 'Request not found' });
    const updated = await db('vacation_requests').where('id', id).first();
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// POST /api/requests/:id/reject
router.post('/:id/reject', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comments } = req.body || {};
    const count = await db('vacation_requests')
      .where('id', id)
      .update({ status: 'Rejected', comments: comments || null });
    if (!count) return res.status(404).json({ error: 'Request not found' });
    const updated = await db('vacation_requests').where('id', id).first();
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
