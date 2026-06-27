export const site = {
  name: 'BAZ Marketing Agency',
  shortName: 'BAZ',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://baz.agency',
  tagline: 'The growth partner for ambitious businesses.',
  description:
    'BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels — strategy, execution, and reporting in one tightly integrated system.',
  email: 'zerboutbrahimamir@gmail.com',
  // Phone is optional. Leave blank if you don't want one shown.
  // The contact page will hide the row entirely when this is empty.
  phone: '',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  // Stats for the trust strip. Read from env when available, otherwise
  // null. The homepage hides a stat entirely when its value is null —
  // we'd rather show nothing than a fabricated number.
  stats: {
    brandsScaled: process.env.NEXT_PUBLIC_BRANDS_SCALED || null,
    countriesServed: process.env.NEXT_PUBLIC_COUNTRIES_SERVED || null,
    seniorOnly: process.env.NEXT_PUBLIC_SENIOR_ONLY || null,
    teamSize: process.env.NEXT_PUBLIC_TEAM_SIZE || null,
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/baz-agency',
    twitter: 'https://twitter.com/bazagency',
    github: 'https://github.com/baz-agency',
  },

  /**
   * What "Book a growth call" buttons should link to.
   * - If `bookingUrl` is set (Cal.com, TidyCal, etc.), use it.
   * - Otherwise fall back to a prefilled email so the button is never broken.
   *   The subject is "Growth call" so you can filter it in your inbox.
   */
  get bookOrMailto(): string {
    if (this.bookingUrl) return this.bookingUrl;
    const subject = encodeURIComponent('Growth call — BAZ website');
    const body = encodeURIComponent(
      "Hi BAZ,\n\nI'd like to book a 20-minute growth call. A few windows that work for me:\n- \n- \n- \n\nThanks,\n",
    );
    return `mailto:${this.email}?subject=${subject}&body=${body}`;
  },
};

export type Site = typeof site;
