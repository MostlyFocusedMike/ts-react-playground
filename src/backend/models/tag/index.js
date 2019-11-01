const ObjectionBoiler = require('./objection-boiler');

class Tag extends ObjectionBoiler {
    /**
     * Just filtering out overly generic tags that make sense for Medium but not for the site
     * @param {tags} tags - array of json tag object with name and slug
     */
    static filterTags(tags) {
        const ignoredSlugs = [
            'coding',
            'programming',
            'software',
            'software-engineering',
            'software-development',
        ];
        return tags.filter(tag => !ignoredSlugs.includes(tag.slug));
    }
}

module.exports = Tag;
