// export const getUserSystemDetails = async(userAgent) => {
//     const platform = await navigator.userAgent ;
//     console.log('platform', platform)
//     const isMobile = /Mobi|Android/i.test(userAgent);

//     console.log('isMobile' , isMobile);

//     let browser;
//     if (userAgent.indexOf("Chrome") > -1) {
//         browser = "Chrome";
//     } else if (userAgent.indexOf("Firefox") > -1) {
//         browser = "Firefox";
//     } else if (userAgent.indexOf("Safari") > -1) {
//         browser = "Safari";
//     } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
//         browser = "Internet Explorer";
//     } else if (userAgent.indexOf("Edge") > -1) {
//         browser = "Edge";
//     } else {
//         browser = "Unknown";
//     }

//     let os;
//     if (platform.indexOf("Win") > -1) {
//         os = "Windows";
//     } else if (platform.indexOf("Mac") > -1) {
//         os = "MacOS";
//     } else if (platform.indexOf("Linux") > -1) {
//         os = "Linux";
//     } else if (platform.indexOf("iPhone") > -1 || platform.indexOf("iPad") > -1) {
//         os = "iOS";
//     } else if (platform.indexOf("Android") > -1) {
//         os = "Android";
//     } else {
//         os = "Unknown";
//     }

//     return { browser, os, isMobile };
// }
export const getUserSystemDetails = (userAgent) => {
    const platform = userAgent;
  
    const isMobile = /Mobi|Android/i.test(userAgent);
  
    const browserRegex = /(chrome|safari|firefox|edge|trident|msie|opera)/i;
    const browserMatch = platform.match(browserRegex);
    let browser = browserMatch ? browserMatch[1].toLowerCase() : 'unknown';
  
    if (browser === 'trident') {
      browser = 'Internet Explorer';
    } else if (browser === 'safari' && /chrome/i.test(platform)) {
      browser = 'chrome'; // If Chrome is embedded in Safari
    }
  
    const osRegex = /(windows|macos|linux|android|iphone|ipad)/i;
    const osMatch = platform.match(osRegex);
    let os = osMatch ? osMatch[1].toLowerCase() : 'unknown';
  
    return { browser, os, isMobile };
  };
  