terminal-control
================

Terminal escape codes made easy. Get in full control.

If your application runs in different environments, don't worry. The init function checks if the process runs in a tty. If it's not, no escape codes will be output even if you call the methods. You can override this behavior by calling ```init(true)```.

# Installation
Run the following commands to download and install the package:

```sh
$ npm install terminal-control
```

#Usage

```
var term = require('terminal-control').init().autoClean();

term.setBold(true);
term.moveCursorTo(5,5);
console.log('This text is displayed with an offset!');
```

#Docs

###Init

* **init([override])**                  - initialize and check if the programm runs in a tty (if override != true)
* **autoClean()**                       - automatically reset text style to default on process exit

###Text style

* **resetTextStyle()**                  - restore default text style
* **setBold([set])**                    - turn bold on or off (calling without argument toggles)
* **setLowIntensity([set])**            - turn low intensity on or off (calling without argument toggles)
* **setUnderline([set])**               - turn underline on or off (calling without argument toggles)
* **setBlinking([set])**                - turn blinking on or off (calling without argument toggles)
* **setInvisible([set])**               - turn invisible text on or off (calling without argument toggles)

###Window size

* **setWindowSize(top, bottom)**        - set top and bottom line of a window

###Cursor movement

* **moveCursorUp([lines])**             - move cursor up by a number of lines (default 1)
* **moveCursorDown([lines])**           - move cursor down by a number of lines (default 1)
* **moveCursorRight([columns])**        - move cursor right by number of columns (default 1)
* **moveCursorLeft([columns])**         - move cursor left by number of columns (default 1)
* **moveCursorToUpperLeft()**           - move cursor to the upper left corner
* **moveCursorTo(x,y)**                 - move cursor to desired position
* **scrollUp([lines])**                 - scroll up by a number of lines (default 1)
* **scrollDown([lines])**               - scroll down by a number of lines (default 1)
* **nextLine()**                        - go to new line
* **saveCursor()**                      - save cursor position and text attributes
* **restoreCursor()**                   - restore saved cursor position and text attributes

###Clear line

* **clearLineCursorRight()**            - clear text in a line on the right from the cursor
* **clearLineCursorLeft()**             - clear text in a line on the left from the cursor
* **clearLine()**                       - clear current line

###Clear screen

* **clearScreenCursorDown()**           - clear text upon cursor
* **clearScreenCursorUp()**             - clear text below cursor
* **clearScreen()**                     - clear whole screen (doesn't reset the position)

###Others

* **ringBell()**                        - ring the terminal bell

#License

See the [LICENSE](./LICENSE) file.