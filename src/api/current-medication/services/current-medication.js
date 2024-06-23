'use strict';

/**
 * current-medication service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::current-medication.current-medication');
