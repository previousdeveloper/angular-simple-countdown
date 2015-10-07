(function () {
    'use strict';

    angular.module('countdownTimer', [])
        .directive('countdown', countDownTimer);

    countDownTimer.$inject = ['$interval'];

    function countDownTimer($interval) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                lang: '@'
            },
            link: function (scope, element, attrs) {
                var countDownInterval;

                function displayString() {
                    var months = ["", "January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];

                    var namedMonth;
                    var splitedMonth = null;
                    var month = attrs.endDate.split('-')[0];


                    if (month.charAt(0) === '0') {

                        splitedMonth = month.slice(1);
                        namedMonth = months[splitedMonth];

                    } else {
                        namedMonth = months[month];
                    }

                    var convertedData = namedMonth
                        + " "
                        + "," + attrs.endDate.split('-')[1]
                        + ","
                        + attrs.endDate.split('-')[2];


                    attrs.units = angular.isArray(attrs.units) ? attrs.units : attrs.units.split('|');
                    var lastUnit = attrs.units[attrs.units.length - 1],
                        unitConstantForMillisecs = {
                            weeks: (1000 * 60 * 60 * 24 * 7),
                            days: (1000 * 60 * 60 * 24),
                            hours: (1000 * 60 * 60),
                            minutes: (1000 * 60),
                            seconds: 1000,
                            milisaniye: 1
                        },
                        unitsLeft = {},
                        returnString = '',
                        totalMillisecsLeft = new Date(convertedData) - new Date(),
                        i,
                        unit;
                    for (i in attrs.units) {
                        if (attrs.units.hasOwnProperty(i)) {
                            //validation
                            unit = attrs.units[i].trim();
                            if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                                $interval.cancel(countDownInterval);
                                throw new Error('Cannot repeat unit: ' + unit);

                            }
                            if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                                $interval.cancel(countDownInterval);
                                throw new Error('Unit: ' + unit + ' is not supported. Please use following units: hafta, gün, saat, dakika, saniye, milisaniye');
                            }

                            unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];


                            if (lastUnit === unit) {
                                unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                            } else {
                                unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                            }

                            totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];

                            unitConstantForMillisecs[unit.toLowerCase()] = false;


                            returnString += ' ' + unitsLeft[unit] + ' ' + unit;
                        }
                    }

                    return returnString;
                }


                element.on('$destroy', function () {
                    $interval.cancel(countDownInterval);
                });

                countDownInterval = $interval(function () {

                    if (scope.lang !== undefined) {
                        switch (scope.lang) {
                        case 'TR':
                            element.text(displayString()
                                .replace('days', 'gün')
                                .replace('hours', 'saat')
                                .replace('minutes', 'saat')
                                .replace('seconds', 'saniye'));
                            break;

                        default:
                            break;

                        }
                    } else {
                        element.text(displayString());
                    }


                });
            }
        };
    };

})();