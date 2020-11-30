'use strict';

require('./user')(() =>
  require('./product')(() => require('./rating')(() => require('./comment')()))
);
