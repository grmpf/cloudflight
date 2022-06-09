## fav / icon

- `purpose: monochrome` `*`  
  The color information in the icon is discarded and only the alpha data is used.
- `purpose: maskable`  
  The image is designed with icon masks and safe zone in mind.
- `purpose: any` (default)  
  The user agent is free to display the icon in any context.

`*` Unclear if this means only full transparency (like a hole aka no path with fill) or also `fill-opacity`.

-----

## Icon Set

<!-- works locally

| | | |
|:---:|:---:|---|
| **1**|<img width='16' height='auto' src="https://cloudflight.vercel.app/favicon-16x16.png" />								|favicon-16x16.png<br />`*`|
| **2**|<img width='32' height='auto' src="https://cloudflight.vercel.app/favicon-32x32.png" />								|favicon-32x32.png<br />`*`|
| **3**|<img width='64' height='auto' src="https://cloudflight.vercel.app/favicon.ico" />									|favicon.ico<br />`*`|
| **4**|<img width='64' height='auto' src="https://cloudflight.vercel.app/favicon.svg" />									|favicon.svg<br />`*` `**`|
| **5**|<img width='104' height='auto' src="https://cloudflight.vercel.app/apple-touch-icon.png" />							|apple-touch-icon.png<br />`*`|
| **6**|<img width='104' height='auto' src="https://cloudflight.vercel.app/assets/icon/favicon-maskable-inverted.svg" />	|favicon-maskable-inverted.svg<br />`**`|
| **7**|<img width='192' height='auto' src="https://cloudflight.vercel.app/assets/icon/android-chrome-192x192.png" />		|192x192.png<br />`**`|
| **8**|<img width='192' height='auto' src="https://cloudflight.vercel.app/assets/icon/android-chrome-512x512.png" />		|512x512.png<br />`**`|
| **9**|<img width='192' height='auto' src="https://cloudflight.vercel.app/assets/icon/maskable-inverted-192x192.png" />	|maskable-inverted-192x192.png<br />`**`|
|**10**|<img width='192' height='auto' src="https://cloudflight.vercel.app/assets/icon/maskable-inverted-512x512.png" />	|maskable-inverted-512x512.png<br />`**`|

-->

<!-- only works on github -->

| | | |
|:---:|:---:|---|
| **1**|<img width='16' height='auto' src="/public/favicon-16x16.png?raw=true" />											|favicon-16x16.png<br />`*`|
| **2**|<img width='32' height='auto' src="/public/favicon-32x32.png?raw=true" />											|favicon-32x32.png<br />`*`|
| **3**|<img width='64' height='auto' src="/src/assets/favicon/faviconDev/favicon.ico?raw=true" /> <img width='64' height='auto' src="/src/assets/favicon/faviconPrd/favicon.ico?raw=true" />								|favicon.ico (DEV + PRD)<br />`*`|
| **4**|<img width='64' height='auto' src="/src/assets/favicon/faviconDev/favicon.svg?raw=true&sanitize=true" /> <img width='64' height='auto' src="/src/assets/favicon/faviconPrd/favicon.svg?raw=true&sanitize=true" />	|favicon.svg (DEV + PRD)<br />`*` `**`|
| **5**|<img width='104' height='auto' src="/public/apple-touch-icon.png?raw=true" />										|apple-touch-icon.png<br />`*`|
| **6**|<img width='104' height='auto' src="/public/assets/icon/favicon-maskable-inverted.svg?raw=true&sanitize=true" />	|favicon-maskable-inverted.svg<br />`**`|
| **7**|<img width='192' height='auto' src="/public/assets/icon/android-chrome-192x192.png?raw=true" />						|192x192.png<br />`**`|
| **8**|<img width='192' height='auto' src="/public/assets/icon/android-chrome-512x512.png?raw=true" />						|512x512.png<br />`**`|
| **9**|<img width='192' height='auto' src="/public/assets/icon/maskable-inverted-192x192.png?raw=true" />					|maskable-inverted-192x192.png<br />`**`|
|**10**|<img width='192' height='auto' src="/public/assets/icon/maskable-inverted-512x512.png?raw=true" />					|maskable-inverted-512x512.png<br />`**`|

`*` Used as `<link />` tag  
`**` Used in manifest.json
