'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var _ = require('lodash');
var nj = require('../../src');

describe('transpose', function(){
    it('should work on vectors', function(){
        var x = nj.arange(12),
            y = x.transpose();
        expect(y.shape).to.eql([12]);
        expect(y.tolist()).to.eql(x.tolist());
    });
    it('should work on matrix', function(){
        var x = nj.arange(12).reshape([4,3]),
            y = x.transpose();
        expect(x.shape).to.eql([4,3]);
        expect(y.shape).to.eql([3,4]);
        expect(y.tolist())
            .to.eql([
                [ 0,  3,  6,  9],
                [ 1,  4,  7, 10],
                [ 2,  5,  8, 11]]);
    });
    it('should work on multdimensional array with custom axes', function(){
        var x = nj.arange(5*4*3*2).reshape([5,4,3,2]),
            y = x.transpose([0,2,1,3]);
        expect(x.shape).to.eql([5,4,3,2]);
        expect(y.shape).to.eql([5,3,4,2]);
    });
    it('should work after slicing', function () {
        var x = nj.arange(16).reshape([4,4]),
            subX = x.lo(1,1).hi(2,2);
        expect(subX.tolist())
            .to.eql([[5, 6],
                [9, 10]]);
        expect(subX.transpose().tolist())
            .to.eql([[5, 9],
                [6, 10]]);
    });
    it('should be used with T shortcut', function () {
        var x = nj.arange(12).reshape([4,3]);
        expect(x.T.tolist()).to.eql(x.transpose().tolist());
    });
});