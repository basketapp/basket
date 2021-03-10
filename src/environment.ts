let platform = 'darwin';

if (process.env.OS_PLATFORM) {
    platform = process.env.OS_PLATFORM;
}

export const isDevMode = (process.env.NODE_ENV || false) === 'development';

export const isMac = platform === 'darwin';
export const isWindows = platform === 'win32';
export const isLinux = platform === 'linux';
