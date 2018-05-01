"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("crummm-emitter-system/dist");
var MmmHtmlParser = (function () {
    function MmmHtmlParser() {
        //
        // INSTANCE
        //
        this._emitter = new dist_1.CrummmEmitterSystemInstance();
    }
    Object.defineProperty(MmmHtmlParser, "instance", {
        get: function () {
            return this._instance || new MmmHtmlParser();
        },
        enumerable: true,
        configurable: true
    });
    MmmHtmlParser.prototype.onStart = function (listener) {
        this._emitter.on('start', listener);
    };
    MmmHtmlParser.prototype.start = function () {
        this._emitter.emit('start');
        return true;
    };
    return MmmHtmlParser;
}());
exports.MmmHtmlParser = MmmHtmlParser;
