/**
 * @author Adam Paszke
 * @email adam.paszke@gmail.com
 * @license MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Adam Paszke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Codes = {};

Codes.init = function(stream, override) {
    if (arguments.length < 2) {
        override = stream;
        stream = process.stdout;
    }
    if(stream.isTTY && !override) {
        var topMargin = 0,
            bottomMargin = stream.rows,
            bold = false,
            lowIntensity = false,
            underline = false,
            blinking = false,
            invisible = false;

        this.autoClean = function() {
            var _this = this;
            process.on('exit', function() {
                _this.resetTextStyle();
            });
            return this;
        }

        //Text style
        this.refreshTextStyle = function() {
            this.resetTextStyle();
            if (bold) stream.write("\033[1m");
            if (lowIntensity) stream.write("\033[2m");
            if (underline) stream.write("\033[4m");
            if (blinking) stream.write("\033[5m");
            if (invisible) stream.write("\033[8m");
        }
        this.resetTextStyle = function () {
            stream.write("\033[m");
        }
        this.setBold = function (set) {
            bold = set ? set : !bold;
            this.refreshTextStyle();
        }
        this.setLowIntensity = function (set) {
            lowIntensity = set ? set : !lowIntensity;
            this.refreshTextStyle();
        }
        this.setUnderline = function (set) {
            underline = set ? set : !underline;
            this.refreshTextStyle();
        }
        this.setBlinking = function (set) {
            blinking = set ? set : !blinking;
            this.refreshTextStyle();
        }
        this.setInvisible = function (set) {
            invisible = set ? set : !invisible;
            this.refreshTextStyle();
        }

        //Window
        this.setWindowSize = function (top, bottom) {
            topMargin = top;
            bottomMargin = bottom;
            stream.write("\033["+top+";"+bottom+"r");
            this.moveCursorTo(0, top);
        }

        //Movement
        this.moveCursorUp = function (lines) {
            lines = lines || 1;
            stream.write("\033["+lines+"A");
        }
        this.moveCursorDown = function (lines) {
            lines = lines || 1;
            stream.write("\033["+lines+"B");
        }
        this.moveCursorRight = function (lines) {
            lines = lines || 1;
            stream.write("\033["+lines+"C");
        }
        this.moveCursorLeft = function (lines) {
            lines = lines || 1;
            stream.write("\033["+lines+"D");
        }
        this.moveCursorToUpperLeft = function () {
            stream.write("\033[H");
        }
        this.moveCursorTo = function (x, y) {
            stream.write("\033["+y+";"+x+"H");
        }
        this.scrollUp = function (lines) {
            lines = lines || 1;
            for (var i = 0; i < lines; i++) {
                stream.write("\033M");
            }
        }
        this.scrollDown = function (lines) {
            lines = lines || 1;
            for (var i = 0; i < lines; i++) {
                stream.write("\033D");
            }
        }
        this.nextLine = function () {
            stream.write("\033E");
        }
        this.saveCursor = function () {
            stream.write("\0337");
        }
        this.restoreCursor = function () {
            stream.write("\0338");
        }

        //Clear line
        this.clearLineCursorRight = function () {
            stream.write("\033[0K");
        }
        this.clearLineCursorLeft = function () {
            stream.write("\033[1K");
        }
        this.clearLine = function () {
            stream.write("\033[2K");
        }

        //Clear screen
        this.clearScreenCursorDown = function () {
            stream.write("\033[0J");
        }
        this.clearScreenCursorUp = function () {
            stream.write("\033[1J");
        }
        this.clearScreen = function () {
            stream.write("\033[2J");
        }

        //Others
        this.ringBell = function() {
            stream.write("\7");
        }
    } else {
        this.autoClean = function() {}
        //Text style
        this.refreshTextStyle = function() {}
        this.resetTextStyle = function () {}
        this.setBold = function (set) {}
        this.setLowIntensity = function (set) {}
        this.setUnderline = function (set) {}
        this.setBlinking = function (set) {}
        this.setInvisible = function (set) {}
        
        //Window
        this.setWindowSize = function (top, bottom) {}
        
        //Movement
        this.moveCursorUp = function (lines) {}
        this.moveCursorDown = function (lines) {}
        this.moveCursorRight = function (lines) {}
        this.moveCursorLeft = function (lines) {}
        this.moveCursorToUpperLeft = function () {}
        this.moveCursorTo = function (x, y) {}
        this.scrollUp = function (lines) {}
        this.scrollDown = function (lines) {}
        this.nextLine = function () { }
        this.saveCursor = function () {}
        this.restoreCursor = function () {}
        
        //Clear line
        this.clearLineCursorRight = function () {}
        this.clearLineCursorLeft = function () {}
        this.clearLine = function () {}
        
        //Clear screen
        this.clearScreenCursorDown = function () {}
        this.clearScreenCursorUp = function () {}
        this.clearScreen = function () {}
        
        this.ringBell = function() {}
    }
    return this;
}



module.exports = Codes;