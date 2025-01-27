import config from '../../appconfig';

const getAvatarURL = (avatarName) => {
  if (process.env.STORAGE_S3_DEV_MODE === 'local') {
    if (avatarName.includes('.glb')) return '/models/avatars/' + avatarName;
    else return '/static/' + avatarName;
  } else {
    return 'https://s3.amazonaws.com/' + config.aws.s3.staticResourceBucket + '/' + process.env.STORAGE_S3_AVATAR_DIRECTORY + '/' + avatarName;
  }
};

export const staticResourceSeed = {
  disabled: !config.db.forceRefresh,
  delete: config.db.forceRefresh,
  randomize: false,
  path: 'static-resource',
  templates:
  [
    {
      id : "d0828450-24e4-11eb-8630-81b209daf73a",
      sid : "j9o2NLiD",
      name : null,
      description : null,
      url : "https://resources.theoverlay.io/19176bb0-24e8-11eb-8630-81b209daf73a.jpeg",
      key : "d0828450-24e4-11eb-8630-81b209daf73a.jpeg",
      mimeType : "image/jpeg",
      metadata : null,
      createdAt : "2020-11-12 12:44:37",
      updatedAt : "2020-11-12 13:08:04",
      staticResourceType : null,
      subscriptionLevel : null,
      componentId : null,
      parentResourceId : null
    },
    {
      name: 'Allison',
      url: getAvatarURL('Allison.glb'),
      key: 'avatars/Allison.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Allison',
      url: getAvatarURL('Allison.png'),
      key: 'avatars/Allison.png',
      staticResourceType: 'user-thumbnail',
    },
    {
      name: 'Andy',
      url: getAvatarURL('Andy.glb'),
      key: 'avatars/Andy.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Andy',
      url: getAvatarURL('Andy.png'),
      key: 'avatars/Andy.png',
      staticResourceType: 'user-thumbnail',
    },
    {
      name: 'Erik',
      url: getAvatarURL('Erik.glb'),
      key: 'avatars/Erik.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Erik',
      url: getAvatarURL('Erik.png'),
      key: 'avatars/Erik.png',
      staticResourceType: 'user-thumbnail',
    },
    {
      name: 'Geoff',
      url: getAvatarURL('Geoff.glb'),
      key: 'avatars/Geoff.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Geoff',
      url: getAvatarURL('Geoff.png'),
      key: 'avatars/Geoff.png',
      staticResourceType: 'user-thumbnail',
    },
    {
      name: 'Jace',
      url: getAvatarURL('Jace.glb'),
      key: 'avatars/Jace.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Jace',
      url: getAvatarURL('Jace.png'),
      key: 'avatars/Jace.png',
      staticResourceType: 'user-thumbnail',
    },
    {
      name: 'Rose',
      url: getAvatarURL('Rose.glb'),
      key: 'avatars/Rose.glb',
      staticResourceType: 'avatar',
    },
    {
      name: 'Rose',
      url: getAvatarURL('Rose.png'),
      key: 'avatars/Rose.png',
      staticResourceType: 'user-thumbnail',
    },
  ]
};
