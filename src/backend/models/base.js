const { Model } = require('objection');
const knex = require('./knex');

Model.knex(knex); // Give the knex object to objection.

class BaseModel extends Model {
    static get useLimitInFirst() { // check docs
        return true;
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    static async all() {
        return this.query();
    }

    static async find(id) {
        return this.query().findById(id);
    }

    // returns the first instance, for an array use where
    static async findOne(item) {
        return this.query().findOne(item);
    }

    // takes in object, not field name, and returns an array
    static async where(item) {
        return this.query().where(item);
    }

    // obj or array
    static async create(itemOrItemsToCreate) {
        return this.query().insertGraph(itemOrItemsToCreate);
    }

    // returns all properties of obj, not just sent and the created id
    static async createAndFetch(itemOrItemsToCreate) {
        return this.query().insertGraphAndFetch(itemOrItemsToCreate);
    }

    static async findOrCreate(item) {
        let dbItem = await this.query().findOne(item);
        if (!dbItem) {
            try {
                dbItem = await this.query().insertAndFetch(item);
            } catch (e) {
                if (e.message.includes('duplicate key value violates unique constraint')) {
                    dbItem = await this.query().where(item);
                }
            }
        }
        return dbItem;
    }

    /**
     * given an idea, this will either update the attirbutes or create new entry
     * @param {object} identifier - properties used to find an item, usually just an id or alternative key
     * @param {object} attributes - all the properties used to update an item
     */
    static async createOrUpdate(identifier, attributes) {
        let dbItem = await this.query().findOne(identifier);
        if (!dbItem) {
            try {
                dbItem = await this.query().insertAndFetch({ ...identifier, ...attributes });
            } catch (e) {
                if (e.message.includes('duplicate key value violates unique constraint')) {
                    dbItem = await this.query().updateAndFetchById(dbItem.id, attributes);
                }
            }
        } else {
            dbItem = await this.query().updateAndFetchById(dbItem.id, attributes);
        }
        return dbItem;
    }

    // individula item classes
    async addRelations(relationName, relationObjOrObjs) {
        return this.$relatedQuery(relationName).relate(relationObjOrObjs.id);
    }

    async listRelations(relationName) {
        return this.$relatedQuery(relationName);
    }
}

module.exports = BaseModel;
