export const getEnvAwareUrl = (pathname?: string): string => {
    const origin = window.location.origin.includes('localhost')
        ? 'https://ke.wallet/'
        : window.location.origin;

    if (!pathname) return origin;

    if (!pathname.startsWith('/'))
        throw new Error('Pathname should start with /');

    return `${origin}${pathname}`;
};
