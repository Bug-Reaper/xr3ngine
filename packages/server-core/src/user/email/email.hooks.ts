import { disallow } from 'feathers-hooks-common';
import collectAnalytics from '@xr3ngine/server-core/src/hooks/collect-analytics';

export default {
  before: {
    all: [disallow('external'), collectAnalytics()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
