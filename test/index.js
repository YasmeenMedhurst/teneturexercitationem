/* eslint-env mocha */

// module deps
var
  chai = require('chai');

// file deps
var
  expiry = require('../');

var
  expect = chai.expect;

var
  d = function duration(options) {

    var
      year = options.year || 0,
      month = options.month || 0,
      day = options.day || 0,
      hour = options.hour || 0,
      minute = options.minute || 0,
      second = options.second || 0,
      millisecond = options.millisecond || 0,

      start = new Date(),
      end = new Date(start);

    end.setFullYear(end.getFullYear() + year);
    end.setMonth(end.getMonth() + month);
    end.setDate(end.getDate() + day);
    end.setHours(end.getHours() + hour);
    end.setMinutes(end.getMinutes() + minute);
    end.setSeconds(end.getSeconds() + second);
    end.setMilliseconds(end.getMilliseconds() + millisecond);

    return end - start;
  },

  f = function forge(s, o) {

    var
      millisecond = expiry(s).valueOf();

    expect(millisecond).to.equal(d(o));
  };

describe('Expiry', function () {

  describe('.forge', function () {

    it('wo/ arguments', function () {
      expect(expiry().valueOf()).to.equal(0);
    });

    it('w/ number argument', function () {
      expect(expiry(1).valueOf()).to.equal(1);
    });

    describe('w/ string argument', function () {

      it('millisecond', function () {

        var
          o = { millisecond: 2 };

        f('2ms', o);
        f('2 ms', o);
      });

      it('second', function () {

        var
          o = { second: 2 };

        f('2s', o);
      });

      it('minute', function () {

        var
          o = { minute: 2 };

        f('2m', o);
      });

      it('hour', function () {

        var
          o = { hour: 2 };

        f('2h', o);
      });

      it('day', function () {

        var
          o = { day: 2 };

        f('2D', o);
      });

      it('week', function () {

        var
          o = { day: 7 };

        f('1W', o);
      });

      it('month', function () {

        var
          o = { month: 2 };

        f('2M', o);
      });

      it('year', function () {

        var
          o = { year: 2 };

        f('2Y', o);
      });

      it('all', function () {

        var
          o = {
          year: 1,
          month: 1,
          day: 8,
          hour: 1,
          minute: 1,
          second: 1,
          millisecond: 1
        };

        f('1Y1M1W1D1h1m1s1ms', o);
      });
    });
  });
});
