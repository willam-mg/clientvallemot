import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  links:Array<any>;

  constructor(@Inject(DOCUMENT) private doc) {
  }

  addLInksApple(){
    this.links = [
      {
        "rel": "shortcut icon",
        "type": "image/x-icon",
        "sizes": null,
        "href": "assets/icons/apple/apple-icon-180x180.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "57x57",
        "href": "assets/icons/apple/apple-icon-57x57.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "60x60",
        "href": "assets/icons/apple/apple-icon-60x60.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "72x72",
        "href": "assets/icons/apple/apple-icon-72x72.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "76x76",
        "href": "assets/icons/apple/apple-icon-76x76.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "114x114",
        "href": "assets/icons/apple/apple-icon-114x114.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "120x120",
        "href": "assets/icons/apple/apple-icon-120x120.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "144x144",
        "href": "assets/icons/apple/apple-icon-144x144.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "152x152",
        "href": "assets/icons/apple/apple-icon-152x152.png",
      },
      {
        "rel": "apple-touch-icon",
        "type": "image/png",
        "sizes": "180x180",
        "href": "assets/icons/apple/apple-icon-180x180.png",
      },

      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "72x72",
        "href": "assets/icons/icon-72x72.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "96x96",
        "href": "assets/icons/icon-96x96.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "128x128",
        "href": "assets/icons/icon-128x128.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "144x144",
        "href": "assets/icons/icon-144x144.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "152x152",
        "href": "assets/icons/icon-152x152.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "192x192",
        "href": "assets/icons/icon-192x192.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "384x384",
        "href": "assets/icons/icon-384x384.png",
      },
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "512x512",
        "href": "assets/icons/icon-512x512.png",
      },

      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphone5_splash.png",
        "media": "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphone6_splash.png",
        "media": "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphoneplus_splash.png",
        "media": "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphonex_splash.png",
        "media": "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphonexr_splash.png",
        "media": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/iphonexsmax_splash.png",
        "media": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/ipad_splash.png",
        "media": "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/ipadpro1_splash.png",
        "media": "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/ipadpro3_splash.png",
        "media": "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        "rel": "apple-touch-startup-image",
        "href": "assets/splashscreens/ipadpro2_splash.png",
        "media": "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
    ];

    this.links.forEach(element => {
      let link: HTMLLinkElement = this.doc.createElement('link');
      
      link.setAttribute('rel', element.rel);
      
      if (element.type) {
        link.setAttribute('type', element.type);
      }
      
      if (element.sizes) {
        link.setAttribute('sizes', element.sizes);
      }
      
      link.setAttribute('href', element.href);

      if (element.media) {
        link.setAttribute('media', element.media);
      }
      
      this.doc.head.appendChild(link);
    });
    // link.setAttribute('href', doc.URL);
  }
}
