// export const getUserSystemDetails = (userAgent) => {
//   // Improved regex for mobile detection
//   const isMobile = /Mobile|Android|iP(hone|od|ad)|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

//   // Regular expressions to match common browsers
//   const browserRegexes = [
//     { name: 'edge', regex: /edg/i }, // Microsoft Edge
//     { name: 'chrome', regex: /chrome|chromium/i }, // Chrome and Chromium
//     { name: 'safari', regex: /safari/i }, // Safari
//     { name: 'firefox', regex: /firefox/i }, // Firefox
//     { name: 'opera', regex: /opera|opr/i }, // Opera
//     { name: 'internet explorer', regex: /trident|msie/i } // Internet Explorer
//   ];

//   // Determine the browser
//   let browser = 'unknown';
//   for (const { name, regex } of browserRegexes) {
//     if (regex.test(userAgent) && (name !== 'safari' || !/chrome/i.test(userAgent))) {
//       browser = name;
//       break;
//     }
//   }

//   // Regular expressions to match common operating systems
//   const osRegexes = [
//     { name: 'windows', regex: /windows/i },
//     { name: 'macos', regex: /macintosh|mac os/i },
//     { name: 'linux', regex: /linux/i },
//     { name: 'android', regex: /android/i },
//     { name: 'ios', regex: /iphone|ipad/i }
//   ];

//   // Determine the operating system
//   let os = 'unknown';
//   for (const { name, regex } of osRegexes) {
//     if (regex.test(userAgent)) {
//       os = name;
//       break;
//     }
//   }

//   return { browser, os, isMobile };
// };

export const getUserSystemDetails = (userAgent) => {
  // Improved regex for mobile detection
  const isMobile = /Mobile|Android|iP(hone|od|ad)|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Regular expressions to match common browsers, including Brave
  const browserRegexes = [
    { name: 'edge', regex: /edg/i }, // Microsoft Edge
    { name: 'brave', regex: /brave/i }, // Brave
    { name: 'chrome', regex: /chrome|chromium/i }, // Chrome and Chromium
    { name: 'safari', regex: /safari/i }, // Safari
    { name: 'firefox', regex: /firefox/i }, // Firefox
    { name: 'opera', regex: /opera|opr/i }, // Opera
    { name: 'internet explorer', regex: /trident|msie/i } // Internet Explorer
  ];

  // Determine the browser
  let browser = 'unknown';
  for (const { name, regex } of browserRegexes) {
    if (regex.test(userAgent) && (name !== 'safari' || !/chrome|chromium|brave/i.test(userAgent))) {
      browser = name;
      break;
    }
  }

  // Regular expressions to match common operating systems
  const osRegexes = [
    { name: 'windows', regex: /windows/i },
    { name: 'macos', regex: /macintosh|mac os/i },
    { name: 'linux', regex: /linux/i },
    { name: 'android', regex: /android/i },
    { name: 'ios', regex: /iphone|ipad/i }
  ];

  // Determine the operating system
  let os = 'unknown';
  for (const { name, regex } of osRegexes) {
    if (regex.test(userAgent)) {
      os = name;
      break;
    }
  }

  return { browser, os, isMobile };
};

