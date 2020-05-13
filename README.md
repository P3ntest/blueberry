# Blueberry

Blueberry is a free and open source file transfer application.

  - Transfer large files
  - No internet required
  - File recipients dont need the program

## Whats new?

  - Custom port


You can also:
  - Set a password for your files
  - Recieve files directly from the application

# Installation

Head to the [releases](https://github.com/P3ntest/blueberry/releases/) to download the latest installer.
Download and run the installer, it installs itself and creates a desktop shortcut.

### Tech

Blueberry uses the following frameworks:

* [node.js] - evented I/O for the backend
* [Electron](https://github.com/electron) - framwork for create desktop apps
* [Express] - fast node.js network app framework [@tjholowaychuk]

And of course Blueberry itself is open source with [this repository](https://github.com/P3ntest/blueberry)
 on GitHub.

### Development

Want to contribute? Great!

Blueberry is written in javascript and runs in node.

To modify and build blueberry, you need [Node.js] v10 or higher, and npm or yarn. Yarn is highly recommended.

Clone the github repository into a directory of your choice:
```sh
$ git clone https://github.com/P3ntest/blueberry.git
```

Now you can modify the source code. Here is a documentation about electron: [Documentation](https://www.electronjs.org/docs)

#### How to build and run blueberry

To start blueberry run
```sh
$ yarn start
```

or 

```sh
$ npm start
```

To build an installer run

```sh
$ yarn dist
```

and the installer will be found under the dist forlder.


License
----

MIT

   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [express]: <http://expressjs.com>
