'use strict';

require('./User')(() =>
  require('./product')(() => require('./rating')(() => require('./comment')()))
);
