
NgX Component for CSShake
==========================

### Objective

This project is used to create CSShake Component in Angular >=2.

### Running Locally

1. `git clone https://github.com/andy2046/ngshake.git`
2. `cd ngshake`
3. `npm install`
4. `npm start`
5. Open browser and go to: `http://localhost:4200/`
6. Run `npm build` to build the project

#### Full customizable way

```html
<Shake [horizontal]="15">Loading</Shake>

<p [shake]="shakeStyle">Shaking Directive</p>
```

Available configs:

| Prop  | Desc          | Type  | Default | Unit |
| ----- | ------------- | ----- | ------- | ------ |
| `horizontal` | max horizontal | `Number` | 5 | `px` |
| `vertical`   | max vertical | `Number` | 5 | `px` |
| `rotation`   | max rotation | `Number` | 5 | `deg` |
| `duration`   | complete animation cycle duration | `Number` | 300 | `ms` |
| `quantity`   | iterations quantity | `Number` `String` | 'infinite' |  |
| `timingFunc` | `CSS animation-timing-function` | `String` | 'ease-in-out' |  |
| `interval`   | interval between each `@keyframe`, a kind of fine tuning for the animation | `Number` | 10 | `%` |
| `max`        | max `@keyframe` value, in case other than `100%` creates a _pause_ in the animation | `Number` | 100 | `%` |
| `transformOrigin` | `CSS transform-origin` | `String` | 'center center' |  |
| `fixed`      | fixed animation | `Boolean` | `false` |  |
| `freez`      | _pause_ in the animation when interacting | `Boolean` | `false` |  |
| `active`     | active the animations | `Boolean` | `true` |  |
| `trigger`    | _CSS pseudo-class_ which interacts with animation | `String` | `:hover` |  |
| `fixedStop`  | Allows to stop the animation with `trigger` when animation is `fixed` | `Boolean` | `false` |  |
| `elem`       | HTML element to create | `String` | `div` |  |

#### Easy way with defaults:

```html
<Shake>Loading</Shake>

<p shake>Default Shaking Directive</p>
```

