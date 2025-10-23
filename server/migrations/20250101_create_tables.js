/** @param {import('knex').Knex} knex */
export async function up(knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.enu('role', ['Requester', 'Validator']).notNullable();
  });

  await knex.schema.createTable('vacation_requests', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    t.date('start_date').notNullable();
    t.date('end_date').notNullable();
    t.text('reason');
    t.enu('status', ['Pending', 'Approved', 'Rejected']).notNullable().defaultTo('Pending');
    t.text('comments');
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  await knex.schema.dropTableIfExists('vacation_requests');
  await knex.schema.dropTableIfExists('users');
}

