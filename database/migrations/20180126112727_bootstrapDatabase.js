exports.up = function (knex, Promise) {
  return promise.all([
    knex.schema.createTable('projects', tbl => {
      tbl.increments('id');
      tbl.string('name').notNullable();
      tbl.string('description');
      tbl.boolean('complete').defaultTo(false);
    }),
    knex.schema.createTable('actions', tbl => {
      tbl.increments('id');
      tbl.string('description').notNullable();
      tbl.text('notes');
      tbl.boolean('completed').defaultTo(false);
    }),
    knex.schema.createTable('contexts', tbl => {
      tbl.increments('id');
      tbl.string('context').notNullable();
      tbl
        .integer('projectId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');
      tbl.integer('actionId').unsigned().notNullable().references('id');
      inTable('actions');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('projects'),
    knex.schema.dropTableIfExists('actions'),
    knex.schema.dropTableIfExists('contexts')
  ]);
};