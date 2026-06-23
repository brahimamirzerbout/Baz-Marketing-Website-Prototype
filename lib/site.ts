export const site = {
  name: 'BAZ Marketing Agency',
  shortName: 'BAZ',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://baz.agency',
  tagline: 'The growth partner for ambitious businesses.',
  description:
    'BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels — strategy, execution, and reporting in one tightly integrated system.',
  email: 'hello@baz.agency',
  phone: '+1 (555) 010-2247',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/baz/growth-call',
  // Stats for the trust strip. Marked as TBD where real data is required.
  stats: {
    brandsScaled: '240+',
    countriesServed: '14',
    seniorOnly: '100%',
    teamSize: '12',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/baz-agency',
    twitter: 'https://twitter.com/bazagency',
    github: 'https://github.com/baz-agency',
  },
};

export type Site = typeof site;
