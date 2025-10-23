/** @param {import('knex').Knex} knex */
export async function seed(knex) {
  await knex('vacation_requests').del();
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'Alice Requester', role: 'Requester' },
    { id: 2, name: 'Bob Validator', role: 'Validator' }
  ]);
}

