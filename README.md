# angular-simple-countdown
a simple countdown angular directive with multiple language. It is improvement of the [simple-inline-countdown-directive](https://github.com/globaljake/simple-inline-countdown-directive)


inclue script in html file


## Installation

### Bower

`bower install angular-autoFields-bootstrap`

```html
local
<script src="lib/countdownTimer.min.js"></script>
```

## Usage
```javascript
var myApp = angular.module('app', ['ngcountdownTimer']);

<strong ng-countdown end-date="1,9,2015" units="days|hours|minutes|seconds"></strong>
<span ng-countdown end-date="2,9,2015" units="weeks"></strong>
<strong ng-countdown end-date="01-11-2016" lang="TR" units="days|hours|minutes|seconds"></strong>
```
## Field Schema

`ng-countdown`: initializes directive

`end-date`: the end date. _takes any format js Date() allows_

`units`: which units you want the countdown to be viewed in

`lang`:lang="TR"
