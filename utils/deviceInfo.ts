// Utility to collect device and browser information
// This is collected transparently when user submits a form

export interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  device: string;
  screenSize: string;
  language: string;
  timezone: string;
  referrer: string;
  pageUrl: string;
}

export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent;
  
  // Detect browser
  const getBrowser = (): { name: string; version: string } => {
    if (userAgent.includes('Firefox/')) {
      const version = userAgent.split('Firefox/')[1]?.split(' ')[0] || '';
      return { name: 'Firefox', version };
    }
    if (userAgent.includes('Edg/')) {
      const version = userAgent.split('Edg/')[1]?.split(' ')[0] || '';
      return { name: 'Edge', version };
    }
    if (userAgent.includes('Chrome/')) {
      const version = userAgent.split('Chrome/')[1]?.split(' ')[0] || '';
      return { name: 'Chrome', version };
    }
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
      const version = userAgent.split('Version/')[1]?.split(' ')[0] || '';
      return { name: 'Safari', version };
    }
    if (userAgent.includes('Opera') || userAgent.includes('OPR/')) {
      const version = userAgent.split('OPR/')[1]?.split(' ')[0] || '';
      return { name: 'Opera', version };
    }
    return { name: 'Unknown', version: '' };
  };

  // Detect OS
  const getOS = (): string => {
    if (userAgent.includes('Windows NT 10')) return 'Windows 10/11';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown';
  };

  // Detect device type
  const getDevice = (): string => {
    if (/Mobi|Android/i.test(userAgent)) {
      if (/iPad|Tablet/i.test(userAgent)) return 'Tablet';
      return 'Mobile';
    }
    return 'Desktop';
  };

  const browser = getBrowser();

  return {
    browser: browser.name,
    browserVersion: browser.version,
    os: getOS(),
    device: getDevice(),
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'Unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
    referrer: document.referrer || 'Direct',
    pageUrl: window.location.href
  };
}
