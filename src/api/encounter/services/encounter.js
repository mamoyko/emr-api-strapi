'use strict';

/**
 * encounter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::encounter.encounter');
