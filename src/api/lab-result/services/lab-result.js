'use strict';

/**
 * lab-result service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lab-result.lab-result');
