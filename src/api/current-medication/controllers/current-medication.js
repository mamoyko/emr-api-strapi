'use strict';

/**
 * current-medication controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::current-medication.current-medication');
