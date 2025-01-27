
import { ServicesSeedConfig } from '@xr3ngine/common/src/interfaces/ServicesSeedConfig';
import { entitySeeds } from './entities/seeder-config';
import { mediaSeeds } from './media/seeder-config';
import { networkingSeeds } from './networking/seeder-config';
import { paymentSeeds } from './payments/seeder-config';
import { socialSeeds } from './social/seeder-config';
import { socialMediaSeeds } from './socialmedia/seeder-config';
import { userSeeds } from './user/seeder-config';
import { worldSeeds } from './world/seeder-config';

export const seeds: Array<ServicesSeedConfig> = [
    ...entitySeeds,
    ...mediaSeeds,
    ...networkingSeeds,
    ...paymentSeeds,
    ...socialSeeds,
    ...socialMediaSeeds,
    ...userSeeds,
    ...worldSeeds
  ];

export default seeds;