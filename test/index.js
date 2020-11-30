'use strict';

require('./user')(() => require('./product')(() => require('./rating')()));
