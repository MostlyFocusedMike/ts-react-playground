
exports.up = (knex) => {
    return knex.schema.createTable('articles', (table) => {
        table.increments().primary();
        table.string('medium_id').notNullable(); // save the id assigned by medium
        table.string('title'); // title of the article
        table.string('link'); // url of the medium link
        table.string('image'); // url of the cover photo of the article
        table.string('subtitle'); // optional subtitle given to the article
        table.timestamp('first_published_at'); // ISO timestring for frontend sorting
        table.timestamp('created_at').defaultTo(knex.fn.now()); // ISO string for database records
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // ISO string for database records
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('articles');
};