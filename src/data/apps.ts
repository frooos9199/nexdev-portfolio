export type AppRegistryEntry = {
  slug: string;
  name: string;
  arabicName: string;
  description: string;
  developer: string;
  websitePath?: string;
  privacyPath?: string;
  termsPath?: string;
  supportPath?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  features?: string[];
  status?: string;
};

export const apps: AppRegistryEntry[] = [
  {
    slug: 'daleel-q8',
    name: 'Daleel Q8 Go',
    arabicName: 'دليل الكويت',
    description: 'Discover places, restaurants, hotels, and offers across Kuwait from one app.',
    developer: 'Q8 NexDev',
    websitePath: '/apps/daleel-q8',
    privacyPath: '/apps/daleel-q8/privacy',
    termsPath: '/apps/daleel-q8/terms',
    supportPath: '/apps/daleel-q8/support',
    appStoreUrl: 'https://apps.apple.com/us/app/daleel-q8-go/id6759099784',
    googlePlayUrl: '',
    status: 'New',
    features: [
      'Browse restaurants, hotels, and local destinations in Kuwait.',
      'Discover offers and highlights in one organized experience.',
      'Open dedicated privacy, terms, and support pages directly from store listings.',
    ],
  },
  {
    slug: 'q8shift',
    name: 'Q8SHIFT',
    arabicName: 'Q8SHIFT',
    description: 'Published application with an existing standalone privacy policy page.',
    developer: 'FERAS ALOTAIBI',
    privacyPath: '/privacy-policy',
    status: 'Live',
  },
];

export const daleelQ8App = apps.find((app) => app.slug === 'daleel-q8')!;