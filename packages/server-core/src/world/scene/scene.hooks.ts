import getScene from '@xr3ngine/server-core/src/hooks/get-scene';
import collectAnalytics from '@xr3ngine/server-core/src/hooks/collect-analytics';
// Don't remove this comment. It's needed to format import lines nicely.

export default {
  before: {
    all: [collectAnalytics()],
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
    get: [getScene()],
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
