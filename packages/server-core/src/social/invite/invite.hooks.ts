import collectAnalytics from '@xr3ngine/server-core/src/hooks/collect-analytics';
import * as authentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
import generateInvitePasscode from '@xr3ngine/server-core/src/hooks/generate-invite-passcode';
import sendInvite from '@xr3ngine/server-core/src/hooks/send-invite';
import attachOwnerIdInBody from '@xr3ngine/server-core/src/hooks/set-loggedin-user-in-body';
import attachOwnerIdInQuery from '@xr3ngine/server-core/src/hooks/set-loggedin-user-in-query';
import { HookContext } from '@feathersjs/feathers';
import inviteRemoveAuthenticate from '@xr3ngine/server-core/src/hooks/invite-remove-authenticate';
import * as commonHooks from 'feathers-hooks-common';
import logger from '../../logger';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [collectAnalytics()],
    find: [
      authenticate('jwt'),
      attachOwnerIdInQuery('userId')
    ],
    get: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        authenticate('jwt'),
        attachOwnerIdInQuery('userId')
      )
    ],
    create: [
      authenticate('jwt'),
      attachOwnerIdInBody('userId'),
      generateInvitePasscode()
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [
      authenticate('jwt'),
      inviteRemoveAuthenticate()
    ]
  },

  after: {
    all: [],
    find: [
      async (context: HookContext): Promise<HookContext> => {
        try {
          const { app, result } = context;
          await Promise.all(result.data.map(async (item) => {
            return await new Promise(async (resolve) => {
              if (item.inviteeId != null) {
                item.invitee = await app.service('user').get(item.inviteeId);
              } else if (item.token) {
                const identityProvider = await app.service('identity-provider').find({
                  query: {
                    token: item.token
                  }
                });
                if (identityProvider.data.length > 0) {
                  item.invitee = await app.service('user').get(identityProvider.data[0].userId);
                }
              }
              item.user = await app.service('user').get(item.userId);

              resolve(true);
            });
          }));
          return context;
        } catch (err) {
          logger.error('INVITE AFTER HOOK ERROR');
          logger.error(err);
        }
      }
    ],
    get: [],
    create: [
      sendInvite()
    ],
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
