<div align="center">

## <img valign="bottom" width="32px" height="32px" src="/src/assets/favicon/faviconPrd/favicon.svg?raw=true&sanitize=true" />&nbsp; Cloud Flight
**Interactive Background**

</div>

-----

<table>
  <tr>
    <td align="center" valignX="top">
    <a href="https://cloudflight.vercel.app/?embed=1&type=text&size=24&color=ff9b06&text=LOREM%20IPSUM">
      <!-- view locally
      <img src="https://github.com/grmpf/cloudflight/raw/master/public/assets/img/screenshots/screenshot-1.jpg" />
      -->
      <!-- view locally2
      <img src="https://cloudflight.vercel.app/assets/img/screenshots/screenshot-1.jpg" />
      <img src="https://cloudflight.vercel.app/assets/screenshots/screenshot-1.jpg" />
      -->
      <!-- for gitHub (forks etc.) -->
      <img src="/public/assets/screenshots/screenshot-1.jpg?raw=true" />
    </a>
    </td>
    <td align="center" valignX="top">
    <a href="https://cloudflight.vercel.app/?embed=1&type=clock&size=40&ls=8&color=ff9b06">
      <!--
      <img src="https://github.com/grmpf/cloudflight/raw/master/public/assets/img/screenshots/screenshot-2.jpg" />
      <img src="https://cloudflight.vercel.app/assets/screenshots/screenshot-2.jpg" />
      -->
      <img src="/public/assets/screenshots/screenshot-2.jpg?raw=true" />
    </a>
    </td>
  </tr>
  <tr>
    <td align="center" valignX="top">
    <a href="https://cloudflight.vercel.app/?embed=1&type=text&size=22&ls=-14&color=ff9b06&lh=90&text=D%20%20O%20%20N%20%20%27%20%20%20T%20%20%20%20%20%20IIIIIIIIIIIIIIIIIIIIIII~T%20%20H%20%20E%20%20%20%20%20%20I%20%20N%20%20T%20%20E%20%20R%20%20N%20%20E%20%20T">
      <!--
      <img src="https://github.com/grmpf/cloudflight/raw/master/public/assets/img/screenshots/screenshot-3.jpg" />
      <img src="https://cloudflight.vercel.app/assets/screenshots/screenshot-3.jpg" />
      -->
      <img src="/public/assets/screenshots/screenshot-3.jpg?raw=true" />
    </a>
    </td>
    <td align="center" valignX="top">
    <a href="https://cloudflight.vercel.app/?embed=1&type=text&size=35&lh=80&color=ff9b06&text=DON'T~PANIC">
      <!--
      <img src="https://github.com/grmpf/cloudflight/raw/master/public/assets/img/screenshots/screenshot-4.jpg" />
      <img src="https://cloudflight.vercel.app/assets/screenshots/screenshot-4.jpg" />
      -->
      <img src="/public/assets/screenshots/screenshot-4.jpg?raw=true" />
    </a>
    </td>
  </tr>
</table>



### URL params

| Param | Default | Options | Desc |
|---|:---:|---|---|
|`embed` | 0                 | 0, 1 | `&embed=1` hides all controls/overlays |
|`type`  | text              | text, clock | **Type** of data to display. |
|`size`  | 30                | Range: 15&nbsp;-&nbsp;120 | **Font-Size** |
|`ls`    | 2                 | Range: -32&nbsp;-&nbsp;200 | **Line-Size** |
|`color` | FF9B06            | Whole hex color range | **Font-Color** |
|`ff` *  | Raleway&nbsp;900  | Raleway&nbsp;900<br />Roboto&nbsp;900<br />Ubuntu&nbsp;700| **Font-Family** |
|`lh`    | 100               | Range: 70&nbsp;-&nbsp;130 | **Line-Height**. Only has an effect with `&type=text` and when there is a linebreak in `&text=` via `~` |
|`text`  |                   | | **Text** to display. Only has an effect with `&type=text` |

`*` TODO

-----

### Features - WIP

- [x] Animation of camera flying through clouds (with clouds fading out in distance and directly in front of camera).
- [ ] Optional extra contents to show:
  - [x] Clock
  - [x] Text
  - [ ] Image / SVG
- [ ] Clock + Text features
  - [ ] `fontFamily`
  - [x] `fontSize`
  - [x] `letterSpacing`
  - [x] `lineHeight`
  - [x] `fontColor`
- [ ] Clock only features
  - [x] `showSeconds`: Might be removed in the future
- [ ] Text only features
  - [x] Newline / linebreak with `~`
- [ ] Image only features
  - [ ] `imgSize`

### Extra Features (maybe)

- [ ] `outlineWidth`: Text outline width
- [ ] `outlineColor`: Text outline color
- [ ] `speedRange`: For fly- and boost-speed (on press/click)
- [ ] `mouseSensitivity`: For moving along mouse position
- [ ] `paused`: Version with single image every 60 sec?
- [ ] Optional whale 🐋 :'(

-----

### Planned Improvements

- [ ] Adaptive or manual quality throttling
- [ ] Improve loading overlay
- [ ] ...

### Extra Improvements (maybe)

- [ ] [Known Issue #1+2](#known-issues): Leva text-input updating only on blur AND other inputs updating too much.
- [ ] ...

-----


### Known Issues

1. Leva text-input updates only on blur.
1. Other Leva controls are "trigger-happy" (this is not a problem in most cases though).
1. Some dependency issues when upgrading to React 18 and R3F v8.

-----

### Examples

- [Only clouds](https://cloudflight.vercel.app/?embed=1)
  ([local](http://localhost:3000/?embed=1))
- [Text](https://cloudflight.vercel.app/?embed=1&type=text&size=24&color=ff9b06&text=LOREM%20IPSUM)
  ([local](http://localhost:3000/?embed=1&type=text&size=24&color=ff9b06&text=LOREM%20IPSUM))
- [Text with newline / linebreak](https://cloudflight.vercel.app/?embed=1&type=text&size=35&lh=80&color=ff9b06&text=DON'T~PANIC)
  ([local](http://localhost:3000/?embed=1&type=text&size=35&lh=80&color=ff9b06&text=DON'T~PANIC))
- [Clock](https://cloudflight.vercel.app/?embed=1&type=clock&size=40&ls=8&color=ff9b06)
  ([local](http://localhost:3000/?embed=1&type=clock&size=40&ls=8&color=ff9b06))
  <br /><br />
- [Experimental1 - HD](https://cloudflight.vercel.app/?embed=1&type=text&size=48&ls=-32&color=ff9b06&text=HD)
  ([local](http://localhost:3000/?embed=1&type=text&size=48&ls=-32&color=ff9b06&text=HD))
- [Experimental2 - DON'T ... THE INTERNET](https://cloudflight.vercel.app/?embed=1&type=text&size=22&ls=-14&color=ff9b06&lh=90&text=D%20%20O%20%20N%20%20%27%20%20%20T%20%20%20%20%20%20IIIIIIIIIIIIIIIIIIIIIII~T%20%20H%20%20E%20%20%20%20%20%20I%20%20N%20%20T%20%20E%20%20R%20%20N%20%20E%20%20T)
  ([local](http://localhost:3000/?embed=1&type=text&size=22&ls=-14&color=ff9b06&lh=90&text=D%20%20O%20%20N%20%20%27%20%20%20T%20%20%20%20%20%20IIIIIIIIIIIIIIIIIIIIIII~T%20%20H%20%20E%20%20%20%20%20%20I%20%20N%20%20T%20%20E%20%20R%20%20N%20%20E%20%20T))
- [Experimental3 - FOO BAR](https://cloudflight.vercel.app/?embed=1&type=text&size=24&ls=3&color=ff9b06&lh=50&text=....................~~%C2%A6%20FOO%20BAR%20%C2%A6~....................)
  ([local](http://localhost:3000/?embed=1&type=text&size=24&ls=3&color=ff9b06&lh=50&text=....................~~%C2%A6%20FOO%20BAR%20%C2%A6~....................))
<!--
- [ExperimentalX - JTHTFVTLD](https://cloudflight.vercel.app/?embed=1&type=text&size=28&ls=-10&color=ff9b06&text=JTHTFVTLD) 
  ([local](http://localhost:3000/?embed=1&type=text&size=28&ls=-10&color=ff9b06&text=JTHTFVTLD))
- [ExperimentalY - AWA~VAV](https://cloudflight.vercel.app/?embed=1&type=text&size=48&ls=-32&color=ff9b06&lh=708&text=AWA~VAV)
  ([local](http://localhost:3000/?embed=1&type=text&size=48&ls=-32&color=ff9b06&lh=708&text=AWA~VAV))
- [Experimental2]() 
  ([local](http://localhost:3000/))
-->


<!-- test strings
D  O  N  '   T      IIIIIIIIIIIIIIIIIIIIIII~T  H  E      I  N  T  E  R  N  E  T
D O N '  T      IIIIIIIIIIIIIIIIIIIII~T H E      I N T E R N E T
-->
  

<!--
### StackBlitz

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitzDeployLink]


### Codesandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open_in-CodeSandbox-blue?logo=codesandbox&style=for-the-badge)][codesandboxDeployLink]


[stackblitzDeployLink]: https://stackblitz.com/github/grmpf/cloudflight
[codesandboxDeployLink]: https://codesandbox.io/s/github/grmpf/cloudflight
-->
