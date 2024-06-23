'use strict';

/**
 * current-condition service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::current-condition.current-condition');
