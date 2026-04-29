require('@testing-library/jest-dom');

// Global mock for react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key, opts) => (opts?.score ? `${opts.score}/10` : key) }),
}));
