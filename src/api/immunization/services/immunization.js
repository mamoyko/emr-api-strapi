'use strict';

/**
 * immunization service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::immunization.immunization');
