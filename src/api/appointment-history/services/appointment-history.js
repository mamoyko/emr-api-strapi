'use strict';

/**
 * appointment-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::appointment-history.appointment-history');
