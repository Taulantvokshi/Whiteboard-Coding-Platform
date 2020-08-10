;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    /***/ './node_modules/dotenv/lib/main.js':
      /*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ ;(function(process) {
          /* @flow */
          /*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

          const fs = __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error("Cannot find module 'fs'")
              e.code = 'MODULE_NOT_FOUND'
              throw e
            })()
          )
          const path = __webpack_require__(
            /*! path */ './node_modules/path-browserify/index.js'
          )

          function log(message /*: string */) {
            console.log(`[dotenv][DEBUG] ${message}`)
          }

          const NEWLINE = '\n'
          const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
          const RE_NEWLINES = /\\n/g
          const NEWLINES_MATCH = /\n|\r|\r\n/

          // Parses src into an Object
          function parse(
            src /*: string | Buffer */,
            options /*: ?DotenvParseOptions */
          ) /*: DotenvParseOutput */ {
            const debug = Boolean(options && options.debug)
            const obj = {}

            // convert Buffers before splitting into lines and processing
            src
              .toString()
              .split(NEWLINES_MATCH)
              .forEach(function(line, idx) {
                // matching "KEY' and 'VAL' in 'KEY=VAL'
                const keyValueArr = line.match(RE_INI_KEY_VAL)
                // matched?
                if (keyValueArr != null) {
                  const key = keyValueArr[1]
                  // default undefined or missing values to empty string
                  let val = keyValueArr[2] || ''
                  const end = val.length - 1
                  const isDoubleQuoted = val[0] === '"' && val[end] === '"'
                  const isSingleQuoted = val[0] === "'" && val[end] === "'"

                  // if single or double quoted, remove quotes
                  if (isSingleQuoted || isDoubleQuoted) {
                    val = val.substring(1, end)

                    // if double quoted, expand newlines
                    if (isDoubleQuoted) {
                      val = val.replace(RE_NEWLINES, NEWLINE)
                    }
                  } else {
                    // remove surrounding whitespace
                    val = val.trim()
                  }

                  obj[key] = val
                } else if (debug) {
                  log(
                    `did not match key and value when parsing line ${idx +
                      1}: ${line}`
                  )
                }
              })

            return obj
          }

          // Populates process.env from .env file
          function config(
            options /*: ?DotenvConfigOptions */
          ) /*: DotenvConfigOutput */ {
            let dotenvPath = path.resolve(process.cwd(), '.env')
            let encoding /*: string */ = 'utf8'
            let debug = false

            if (options) {
              if (options.path != null) {
                dotenvPath = options.path
              }
              if (options.encoding != null) {
                encoding = options.encoding
              }
              if (options.debug != null) {
                debug = true
              }
            }

            try {
              // specifying an encoding returns a string instead of a buffer
              const parsed = parse(fs.readFileSync(dotenvPath, {encoding}), {
                debug
              })

              Object.keys(parsed).forEach(function(key) {
                if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
                  process.env[key] = parsed[key]
                } else if (debug) {
                  log(
                    `"${key}" is already defined in \`process.env\` and will not be overwritten`
                  )
                }
              })

              return {parsed}
            } catch (e) {
              return {error: e}
            }
          }

          module.exports.config = config
          module.exports.parse = parse

          /* WEBPACK VAR INJECTION */
        }.call(
          this,
          __webpack_require__(
            /*! ./../../process/browser.js */ './node_modules/process/browser.js'
          )
        ))

        /***/
      },

    /***/ './node_modules/path-browserify/index.js':
      /*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */ ;(function(process) {
          // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
          // backported and transplited with Babel, with backwards-compat fixes

          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          // resolves . and .. elements in a path array with directory names there
          // must be no slashes, empty elements, or device names (c:\) in the array
          // (so also no leading and trailing slashes - it does not distinguish
          // relative and absolute paths)
          function normalizeArray(parts, allowAboveRoot) {
            // if the path tries to go above the root, `up` ends up > 0
            var up = 0
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i]
              if (last === '.') {
                parts.splice(i, 1)
              } else if (last === '..') {
                parts.splice(i, 1)
                up++
              } else if (up) {
                parts.splice(i, 1)
                up--
              }
            }

            // if the path is allowed to go above the root, restore leading ..s
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift('..')
              }
            }

            return parts
          }

          // path.resolve([from ...], to)
          // posix version
          exports.resolve = function() {
            var resolvedPath = '',
              resolvedAbsolute = false

            for (
              var i = arguments.length - 1;
              i >= -1 && !resolvedAbsolute;
              i--
            ) {
              var path = i >= 0 ? arguments[i] : process.cwd()

              // Skip empty and invalid entries
              if (typeof path !== 'string') {
                throw new TypeError('Arguments to path.resolve must be strings')
              } else if (!path) {
                continue
              }

              resolvedPath = path + '/' + resolvedPath
              resolvedAbsolute = path.charAt(0) === '/'
            }

            // At this point the path should be resolved to a full absolute path, but
            // handle relative paths to be safe (might happen when process.cwd() fails)

            // Normalize the path
            resolvedPath = normalizeArray(
              filter(resolvedPath.split('/'), function(p) {
                return !!p
              }),
              !resolvedAbsolute
            ).join('/')

            return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
          }

          // path.normalize(path)
          // posix version
          exports.normalize = function(path) {
            var isAbsolute = exports.isAbsolute(path),
              trailingSlash = substr(path, -1) === '/'

            // Normalize the path
            path = normalizeArray(
              filter(path.split('/'), function(p) {
                return !!p
              }),
              !isAbsolute
            ).join('/')

            if (!path && !isAbsolute) {
              path = '.'
            }
            if (path && trailingSlash) {
              path += '/'
            }

            return (isAbsolute ? '/' : '') + path
          }

          // posix version
          exports.isAbsolute = function(path) {
            return path.charAt(0) === '/'
          }

          // posix version
          exports.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0)
            return exports.normalize(
              filter(paths, function(p, index) {
                if (typeof p !== 'string') {
                  throw new TypeError('Arguments to path.join must be strings')
                }
                return p
              }).join('/')
            )
          }

          // path.relative(from, to)
          // posix version
          exports.relative = function(from, to) {
            from = exports.resolve(from).substr(1)
            to = exports.resolve(to).substr(1)

            function trim(arr) {
              var start = 0
              for (; start < arr.length; start++) {
                if (arr[start] !== '') break
              }

              var end = arr.length - 1
              for (; end >= 0; end--) {
                if (arr[end] !== '') break
              }

              if (start > end) return []
              return arr.slice(start, end - start + 1)
            }

            var fromParts = trim(from.split('/'))
            var toParts = trim(to.split('/'))

            var length = Math.min(fromParts.length, toParts.length)
            var samePartsLength = length
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i
                break
              }
            }

            var outputParts = []
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push('..')
            }

            outputParts = outputParts.concat(toParts.slice(samePartsLength))

            return outputParts.join('/')
          }

          exports.sep = '/'
          exports.delimiter = ':'

          exports.dirname = function(path) {
            if (typeof path !== 'string') path = path + ''
            if (path.length === 0) return '.'
            var code = path.charCodeAt(0)
            var hasRoot = code === 47 /*/*/
            var end = -1
            var matchedSlash = true
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i)
              if (code === 47 /*/*/) {
                if (!matchedSlash) {
                  end = i
                  break
                }
              } else {
                // We saw the first non-path separator
                matchedSlash = false
              }
            }

            if (end === -1) return hasRoot ? '/' : '.'
            if (hasRoot && end === 1) {
              // return '//';
              // Backwards-compat fix:
              return '/'
            }
            return path.slice(0, end)
          }

          function basename(path) {
            if (typeof path !== 'string') path = path + ''

            var start = 0
            var end = -1
            var matchedSlash = true
            var i

            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47 /*/*/) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                  start = i + 1
                  break
                }
              } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false
                end = i + 1
              }
            }

            if (end === -1) return ''
            return path.slice(start, end)
          }

          // Uses a mixed approach for backwards-compatibility, as ext behavior changed
          // in new Node.js versions, so only basename() above is backported here
          exports.basename = function(path, ext) {
            var f = basename(path)
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length)
            }
            return f
          }

          exports.extname = function(path) {
            if (typeof path !== 'string') path = path + ''
            var startDot = -1
            var startPart = 0
            var end = -1
            var matchedSlash = true
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            var preDotState = 0
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i)
              if (code === 47 /*/*/) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                  startPart = i + 1
                  break
                }
                continue
              }
              if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false
                end = i + 1
              }
              if (code === 46 /*.*/) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i
                else if (preDotState !== 1) preDotState = 1
              } else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1
              }
            }

            if (
              startDot === -1 ||
              end === -1 ||
              // We saw a non-dot character immediately before the dot
              preDotState === 0 ||
              // The (right-most) trimmed path component is exactly '..'
              (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)
            ) {
              return ''
            }
            return path.slice(startDot, end)
          }

          function filter(xs, f) {
            if (xs.filter) return xs.filter(f)
            var res = []
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs)) res.push(xs[i])
            }
            return res
          }

          // String.prototype.substr - negative index don't work in IE8
          var substr =
            'ab'.substr(-1) === 'b'
              ? function(str, start, len) {
                  return str.substr(start, len)
                }
              : function(str, start, len) {
                  if (start < 0) start = str.length + start
                  return str.substr(start, len)
                }

          /* WEBPACK VAR INJECTION */
        }.call(
          this,
          __webpack_require__(
            /*! ./../process/browser.js */ './node_modules/process/browser.js'
          )
        ))

        /***/
      }
  }
])
//# sourceMappingURL=0.bundle.js.map
