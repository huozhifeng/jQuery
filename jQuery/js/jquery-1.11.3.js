/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

(function( global, factory ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					console.log( ( options.hasContent && options.data ) || null);
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}
return jQuery;

}));



//jQuery UI 1.9m2
(function (a) {
	a.ui = a.ui || {};
	if (a.ui.version) {
		return
	}
	a.extend(a.ui, {
		version: "1.9m2",
		plugin: {
			add: function (c, d, f) {
				var e = a.ui[c].prototype;
				for (var b in f) {
					e.plugins[b] = e.plugins[b] || [];
					e.plugins[b].push([d, f[b]])
				}
			}, call: function (b, d, c) {
				var f = b.plugins[d];
				if (!f || !b.element[0].parentNode) {
					return
				}
				for (var e = 0; e < f.length; e++) {
					if (b.options[f[e][0]]) {
						f[e][1].apply(b.element, c)
					}
				}
			}
		},
		contains: function (d, c) {
			return document.compareDocumentPosition ? d.compareDocumentPosition(c) & 16 : d !== c && d.contains(c)
		},
		hasScroll: function (e, c) {
			if (a(e).css("overflow") == "hidden") {
				return false
			}
			var b = (c && c == "left") ? "scrollLeft" : "scrollTop", d = false;
			if (e[b] > 0) {
				return true
			}
			e[b] = 1;
			d = (e[b] > 0);
			e[b] = 0;
			return d
		},
		isOverAxis: function (c, b, d) {
			return (c > b) && (c < (b + d))
		},
		isOver: function (g, c, f, e, b, d) {
			return a.ui.isOverAxis(g, f, b) && a.ui.isOverAxis(c, e, d)
		},
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		}
	});
	a.fn.extend({
		_focus: a.fn.focus, focus: function (b, c) {
			return typeof b === "number" ? this.each(function () {
				var d = this;
				setTimeout(function () {
					a(d).focus();
					(c && c.call(d))
				}, b)
			}) : this._focus.apply(this, arguments)
		}, enableSelection: function () {
			return this.attr("unselectable", "off").css("MozUserSelect", "")
		}, disableSelection: function () {
			return this.attr("unselectable", "on").css("MozUserSelect", "none")
		}, scrollParent: function () {
			var b;
			if ((a.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
				b = this.parents().filter(function () {
					return (/(relative|absolute|fixed)/).test(a.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
				}).eq(0)
			} else {
				b = this.parents().filter(function () {
					return (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
				}).eq(0)
			}
			return (/fixed/).test(this.css("position")) || !b.length ? a(document) : b
		}, zIndex: function (e) {
			if (e !== undefined) {
				return this.css("zIndex", e)
			}
			if (this.length) {
				var c = a(this[0]), b, d;
				while (c.length && c[0] !== document) {
					b = c.css("position");
					if (b == "absolute" || b == "relative" || b == "fixed") {
						d = parseInt(c.css("zIndex"));
						if (!isNaN(d) && d != 0) {
							return d
						}
					}
					c = c.parent()
				}
			}
			return 0
		}
	});
	a.extend(a.expr[":"], {
		data: function (d, c, b) {
			return !!a.data(d, b[3])
		}, focusable: function (c) {
			var d = c.nodeName.toLowerCase(), b = a.attr(c, "tabindex");
			return (/input|select|textarea|button|object/.test(d) ? !c.disabled : "a" == d || "area" == d ? c.href || !isNaN(b) : !isNaN(b)) && !a(c)["area" == d ? "parents" : "closest"](":hidden").length
		}, tabbable: function (c) {
			var b = a.attr(c, "tabindex");
			return (isNaN(b) || b >= 0) && a(c).is(":focusable")
		}
	})
})(jQuery);
//jQuery UI Widget 1.9m2
(function (b) {
	var a = b.fn.remove;
	b.fn.remove = function (c, d) {
		return this.each(function () {
			if (!d) {
				if (!c || b.filter(c, [this]).length) {
					b("*", this).add(this).each(function () {
						b(this).triggerHandler("remove")
					})
				}
			}
			return a.call(b(this), c, d)
		})
	};
	b.widget = function (d, f, c) {
		var e = d.split(".")[0], h;
		d = d.split(".")[1];
		h = e + "-" + d;
		if (!c) {
			c = f;
			f = b.Widget
		}
		b.expr[":"][h] = function (i) {
			return !!b.data(i, d)
		};
		b[e] = b[e] || {};
		b[e][d] = function (i, j) {
			if (arguments.length) {
				this._createWidget(i, j)
			}
		};
		var g = new f();
		g.options = b.extend({}, g.options);
		b[e][d].prototype = b.extend(true, g, {
			namespace: e,
			widgetName: d,
			widgetEventPrefix: b[e][d].prototype.widgetEventPrefix || d,
			widgetBaseClass: h,
			base: f.prototype
		}, c);
		b.widget.bridge(d, b[e][d])
	};
	b.widget.bridge = function (d, c) {
		b.fn[d] = function (g) {
			var e = typeof g === "string", f = Array.prototype.slice.call(arguments, 1), h = this;
			g = !e && f.length ? b.extend.apply(null, [true, g].concat(f)) : g;
			if (e && g.substring(0, 1) === "_") {
				return h
			}
			if (e) {
				this.each(function () {
					var i = b.data(this, d), j = i && b.isFunction(i[g]) ? i[g].apply(i, f) : i;
					if (j !== i && j !== undefined) {
						h = j;
						return false
					}
				})
			} else {
				this.each(function () {
					var i = b.data(this, d);
					if (i) {
						if (g) {
							i.option(g)
						}
						i._init()
					} else {
						b.data(this, d, new c(g, this))
					}
				})
			}
			return h
		}
	};
	b.Widget = function (c, d) {
		if (arguments.length) {
			this._createWidget(c, d)
		}
	};
	b.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		options: {disabled: false},
		_createWidget: function (d, e) {
			this.element = b(e).data(this.widgetName, this);
			this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(e)[this.widgetName], d);
			var c = this;
			this.element.bind("remove." + this.widgetName, function () {
				c.destroy()
			});
			this._create();
			this._init()
		},
		_create: function () {
		},
		_init: function () {
		},
		_super: function (c) {
			return this.base[c].apply(this, Array.prototype.slice.call(arguments, 1))
		},
		_superApply: function (d, c) {
			return this.base[d].apply(this, c)
		},
		destroy: function () {
			this.element.unbind("." + this.widgetName).removeData(this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
		},
		widget: function () {
			return this.element
		},
		option: function (e, f) {
			var d = e, c = this;
			if (arguments.length === 0) {
				return b.extend({}, c.options)
			}
			if (typeof e === "string") {
				if (f === undefined) {
					return this.options[e]
				}
				d = {};
				d[e] = f
			}
			b.each(d, function (g, h) {
				c._setOption(g, h)
			});
			return c
		},
		_setOption: function (c, d) {
			this.options[c] = d;
			if (c === "disabled") {
				this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d)
			}
			return this
		},
		enable: function () {
			return this._setOption("disabled", false)
		},
		disable: function () {
			return this._setOption("disabled", true)
		},
		_trigger: function (d, e, f) {
			var h = this.options[d];
			e = b.Event(e);
			e.type = (d === this.widgetEventPrefix ? d : this.widgetEventPrefix + d).toLowerCase();
			f = f || {};
			if (e.originalEvent) {
				for (var c = b.event.props.length, g; c;) {
					g = b.event.props[--c];
					e[g] = e.originalEvent[g]
				}
			}
			this.element.trigger(e, f);
			return !(b.isFunction(h) && h.call(this.element[0], e, f) === false || e.isDefaultPrevented())
		}
	}
})(jQuery);
//jQuery UI Mouse 1.9m2
(function (a) {
	a.widget("ui.mouse", {
		options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
			var b = this;
			this.element.bind("mousedown." + this.widgetName, function (c) {
				return b._mouseDown(c)
			}).bind("click." + this.widgetName, function (c) {
				if (b._preventClickEvent) {
					b._preventClickEvent = false;
					c.stopImmediatePropagation();
					return false
				}
			});
			this.started = false
		}, _mouseDestroy: function () {
			this.element.unbind("." + this.widgetName)
		}, _mouseDown: function (d) {
			d.originalEvent = d.originalEvent || {};
			if (d.originalEvent.mouseHandled) {
				return
			}
			(this._mouseStarted && this._mouseUp(d));
			this._mouseDownEvent = d;
			var c = this, e = (d.which == 1), b = (typeof this.options.cancel == "string" ? a(d.target).parents().add(d.target).filter(this.options.cancel).length : false);
			if (!e || b || !this._mouseCapture(d)) {
				return true
			}
			this.mouseDelayMet = !this.options.delay;
			if (!this.mouseDelayMet) {
				this._mouseDelayTimer = setTimeout(function () {
					c.mouseDelayMet = true
				}, this.options.delay)
			}
			if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
				this._mouseStarted = (this._mouseStart(d) !== false);
				if (!this._mouseStarted) {
					d.preventDefault();
					return true
				}
			}
			this._mouseMoveDelegate = function (f) {
				return c._mouseMove(f)
			};
			this._mouseUpDelegate = function (f) {
				return c._mouseUp(f)
			};
			a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
			(a.browser.safari || d.preventDefault());
			d.originalEvent.mouseHandled = true;
			return true
		}, _mouseMove: function (b) {
			if (a.browser.msie && !b.button) {
				return this._mouseUp(b)
			}
			if (this._mouseStarted) {
				this._mouseDrag(b);
				return b.preventDefault()
			}
			if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
				this._mouseStarted = (this._mouseStart(this._mouseDownEvent, b) !== false);
				(this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b))
			}
			return !this._mouseStarted
		}, _mouseUp: function (b) {
			a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			if (this._mouseStarted) {
				this._mouseStarted = false;
				this._preventClickEvent = (b.target == this._mouseDownEvent.target);
				this._mouseStop(b)
			}
			return false
		}, _mouseDistanceMet: function (b) {
			return (Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance)
		}, _mouseDelayMet: function (b) {
			return this.mouseDelayMet
		}, _mouseStart: function (b) {
		}, _mouseDrag: function (b) {
		}, _mouseStop: function (b) {
		}, _mouseCapture: function (b) {
			return true
		}
	})
})(jQuery);
(function (a) {
	a.widget("ui.draggable", a.ui.mouse, {
		widgetEventPrefix: "drag",
		options: {
			addClasses: true,
			appendTo: "parent",
			axis: false,
			connectToSortable: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			grid: false,
			handle: false,
			helper: "original",
			iframeFix: false,
			opacity: false,
			refreshPositions: false,
			revert: false,
			revertDuration: 500,
			scope: "default",
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: false,
			snapMode: "both",
			snapTolerance: 20,
			stack: false,
			zIndex: false
		},
		_create: function () {
			if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
				this.element[0].style.position = "relative"
			}
			(this.options.addClasses && this.element.addClass("ui-draggable"));
			(this.options.disabled && this.element.addClass("ui-draggable-disabled"));
			this._mouseInit()
		},
		destroy: function () {
			if (!this.element.data("draggable")) {
				return
			}
			this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
			this._mouseDestroy();
			return this
		},
		_mouseCapture: function (b) {
			var c = this.options;
			if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) {
				return false
			}
			this.handle = this._getHandle(b);
			if (!this.handle) {
				return false
			}
			return true
		},
		_mouseStart: function (b) {
			var c = this.options;
			this.helper = this._createHelper(b);
			this._cacheHelperProportions();
			if (a.ui.ddmanager) {
				a.ui.ddmanager.current = this
			}
			this._cacheMargins();
			this.cssPosition = this.helper.css("position");
			this.scrollParent = this.helper.scrollParent();
			this.offset = this.positionAbs = this.element.offset();
			this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
			a.extend(this.offset, {
				click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this.position = this._generatePosition(b);
			this.originalPageX = b.pageX;
			this.originalPageY = b.pageY;
			(c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt));
			if (c.containment) {
				this._setContainment()
			}
			if (this._trigger("start", b) === false) {
				this._clear();
				return false
			}
			this._cacheHelperProportions();
			if (a.ui.ddmanager && !c.dropBehaviour) {
				a.ui.ddmanager.prepareOffsets(this, b)
			}
			this.helper.addClass("ui-draggable-dragging");
			this._mouseDrag(b, true);
			return true
		},
		_mouseDrag: function (b, d) {
			this.position = this._generatePosition(b);
			this.positionAbs = this._convertPositionTo("absolute");
			if (!d) {
				var c = this._uiHash();
				if (this._trigger("drag", b, c) === false) {
					this._mouseUp({});
					return false
				}
				this.position = c.position
			}
			if (!this.options.axis || this.options.axis != "y") {
				this.helper[0].style.left = this.position.left + "px"
			}
			if (!this.options.axis || this.options.axis != "x") {
				this.helper[0].style.top = this.position.top + "px"
			}
			if (a.ui.ddmanager) {
				a.ui.ddmanager.drag(this, b)
			}
			return false
		},
		_mouseStop: function (c) {
			var d = false;
			if (a.ui.ddmanager && !this.options.dropBehaviour) {
				d = a.ui.ddmanager.drop(this, c)
			}
			if (this.dropped) {
				d = this.dropped;
				this.dropped = false
			}
			if (!this.element[0] || !this.element[0].parentNode) {
				return false
			}
			if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
				var b = this;
				a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
					if (b._trigger("stop", c) !== false) {
						b._clear()
					}
				})
			} else {
				if (this._trigger("stop", c) !== false) {
					this._clear()
				}
			}
			return false
		},
		cancel: function () {
			if (this.helper.is(".ui-draggable-dragging")) {
				this._mouseUp({})
			} else {
				this._clear()
			}
			return this
		},
		_getHandle: function (b) {
			var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
			a(this.options.handle, this.element).find("*").andSelf().each(function () {
				if (this == b.target) {
					c = true
				}
			});
			return c
		},
		_createHelper: function (c) {
			var d = this.options;
			var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
			if (!b.parents("body").length) {
				b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
			}
			if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
				b.css("position", "absolute")
			}
			return b
		},
		_adjustOffsetFromHelper: function (b) {
			if (typeof b == "string") {
				b = b.split(" ")
			}
			if (a.isArray(b)) {
				b = {left: +b[0], top: +b[1] || 0}
			}
			if ("left" in b) {
				this.offset.click.left = b.left + this.margins.left
			}
			if ("right" in b) {
				this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
			}
			if ("top" in b) {
				this.offset.click.top = b.top + this.margins.top
			}
			if ("bottom" in b) {
				this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
			}
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
				b.left += this.scrollParent.scrollLeft();
				b.top += this.scrollParent.scrollTop()
			}
			if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
				b = {top: 0, left: 0}
			}
			return {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if (this.cssPosition == "relative") {
				var b = this.element.position();
				return {
					top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			} else {
				return {top: 0, left: 0}
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: (parseInt(this.element.css("marginLeft"), 10) || 0),
				top: (parseInt(this.element.css("marginTop"), 10) || 0)
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
		},
		_setContainment: function () {
			var e = this.options;
			if (e.containment == "parent") {
				e.containment = this.helper[0].parentNode
			}
			if (e.containment == "document" || e.containment == "window") {
				this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
			}
			if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
				var c = a(e.containment)[0];
				if (!c) {
					return
				}
				var d = a(e.containment).offset();
				var b = (a(c).css("overflow") != "hidden");
				this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
			} else {
				if (e.containment.constructor == Array) {
					this.containment = e.containment
				}
			}
		},
		_convertPositionTo: function (f, h) {
			if (!h) {
				h = this.position
			}
			var c = f == "absolute" ? 1 : -1;
			var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
			return {
				top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
				left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
			}
		},
		_generatePosition: function (e) {
			var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
			var d = e.pageX;
			var c = e.pageY;
			if (this.originalPosition) {
				if (this.containment) {
					if (e.pageX - this.offset.click.left < this.containment[0]) {
						d = this.containment[0] + this.offset.click.left
					}
					if (e.pageY - this.offset.click.top < this.containment[1]) {
						c = this.containment[1] + this.offset.click.top
					}
					if (e.pageX - this.offset.click.left > this.containment[2]) {
						d = this.containment[2] + this.offset.click.left
					}
					if (e.pageY - this.offset.click.top > this.containment[3]) {
						c = this.containment[3] + this.offset.click.top
					}
				}
				if (h.grid) {
					var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
					c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
					var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
					d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
				}
			}
			return {
				top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
				left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
			}
		},
		_clear: function () {
			this.helper.removeClass("ui-draggable-dragging");
			if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
				this.helper.remove()
			}
			this.helper = null;
			this.cancelHelperRemoval = false
		},
		_trigger: function (b, c, d) {
			d = d || this._uiHash();
			a.ui.plugin.call(this, b, [c, d]);
			if (b == "drag") {
				this.positionAbs = this._convertPositionTo("absolute")
			}
			return a.Widget.prototype._trigger.call(this, b, c, d)
		},
		plugins: {},
		_uiHash: function (b) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	});
	a.extend(a.ui.draggable, {version: "1.9m2"});
	a.ui.plugin.add("draggable", "connectToSortable", {
		start: function (c, e) {
			var d = a(this).data("draggable"), f = d.options, b = a.extend({}, e, {item: d.element});
			d.sortables = [];
			a(f.connectToSortable).each(function () {
				var g = a.data(this, "sortable");
				if (g && !g.options.disabled) {
					d.sortables.push({instance: g, shouldRevert: g.options.revert});
					g._refreshItems();
					g._trigger("activate", c, b)
				}
			})
		}, stop: function (c, e) {
			var d = a(this).data("draggable"), b = a.extend({}, e, {item: d.element});
			a.each(d.sortables, function () {
				if (this.instance.isOver) {
					this.instance.isOver = 0;
					d.cancelHelperRemoval = true;
					this.instance.cancelHelperRemoval = false;
					if (this.shouldRevert) {
						this.instance.options.revert = true
					}
					this.instance._mouseStop(c);
					this.instance.options.helper = this.instance.options._helper;
					if (d.options.helper == "original") {
						this.instance.currentItem.css({top: "auto", left: "auto"})
					}
				} else {
					this.instance.cancelHelperRemoval = false;
					this.instance._trigger("deactivate", c, b)
				}
			})
		}, drag: function (c, f) {
			var e = a(this).data("draggable"), b = this;
			var d = function (i) {
				var n = this.offset.click.top, m = this.offset.click.left;
				var g = this.positionAbs.top, k = this.positionAbs.left;
				var j = i.height, l = i.width;
				var p = i.top, h = i.left;
				return a.ui.isOver(g + n, k + m, p, h, j, l)
			};
			a.each(e.sortables, function (g) {
				this.instance.positionAbs = e.positionAbs;
				this.instance.helperProportions = e.helperProportions;
				this.instance.offset.click = e.offset.click;
				if (this.instance._intersectsWith(this.instance.containerCache)) {
					if (!this.instance.isOver) {
						this.instance.isOver = 1;
						this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
						this.instance.options._helper = this.instance.options.helper;
						this.instance.options.helper = function () {
							return f.helper[0]
						};
						c.target = this.instance.currentItem[0];
						this.instance._mouseCapture(c, true);
						this.instance._mouseStart(c, true, true);
						this.instance.offset.click.top = e.offset.click.top;
						this.instance.offset.click.left = e.offset.click.left;
						this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
						this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
						e._trigger("toSortable", c);
						e.dropped = this.instance.element;
						e.currentItem = e.element;
						this.instance.fromOutside = e
					}
					if (this.instance.currentItem) {
						this.instance._mouseDrag(c)
					}
				} else {
					if (this.instance.isOver) {
						this.instance.isOver = 0;
						this.instance.cancelHelperRemoval = true;
						this.instance.options.revert = false;
						this.instance._trigger("out", c, this.instance._uiHash(this.instance));
						this.instance._mouseStop(c, true);
						this.instance.options.helper = this.instance.options._helper;
						this.instance.currentItem.remove();
						if (this.instance.placeholder) {
							this.instance.placeholder.remove()
						}
						e._trigger("fromSortable", c);
						e.dropped = false
					}
				}
			})
		}
	});
	a.ui.plugin.add("draggable", "cursor", {
		start: function (c, d) {
			var b = a("body"), e = a(this).data("draggable").options;
			if (b.css("cursor")) {
				e._cursor = b.css("cursor")
			}
			b.css("cursor", e.cursor)
		}, stop: function (b, c) {
			var d = a(this).data("draggable").options;
			if (d._cursor) {
				a("body").css("cursor", d._cursor)
			}
		}
	});
	a.ui.plugin.add("draggable", "iframeFix", {
		start: function (b, c) {
			var d = a(this).data("draggable").options;
			a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function () {
				a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1000
				}).css(a(this).offset()).appendTo("body")
			})
		}, stop: function (b, c) {
			a("div.ui-draggable-iframeFix").each(function () {
				this.parentNode.removeChild(this)
			})
		}
	});
	a.ui.plugin.add("draggable", "opacity", {
		start: function (c, d) {
			var b = a(d.helper), e = a(this).data("draggable").options;
			if (b.css("opacity")) {
				e._opacity = b.css("opacity")
			}
			b.css("opacity", e.opacity)
		}, stop: function (b, c) {
			var d = a(this).data("draggable").options;
			if (d._opacity) {
				a(c.helper).css("opacity", d._opacity)
			}
		}
	});
	a.ui.plugin.add("draggable", "scroll", {
		start: function (c, d) {
			var b = a(this).data("draggable");
			if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
				b.overflowOffset = b.scrollParent.offset()
			}
		}, drag: function (d, e) {
			var c = a(this).data("draggable"), f = c.options, b = false;
			if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
				if (!f.axis || f.axis != "x") {
					if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
						c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
					} else {
						if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
							c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
						}
					}
				}
				if (!f.axis || f.axis != "y") {
					if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
						c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
					} else {
						if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
							c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
						}
					}
				}
			} else {
				if (!f.axis || f.axis != "x") {
					if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
						b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
					} else {
						if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
							b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
						}
					}
				}
				if (!f.axis || f.axis != "y") {
					if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
						b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
					} else {
						if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
							b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
						}
					}
				}
			}
			if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
				a.ui.ddmanager.prepareOffsets(c, d)
			}
		}
	});
	a.ui.plugin.add("draggable", "snap", {
		start: function (c, d) {
			var b = a(this).data("draggable"), e = b.options;
			b.snapElements = [];
			a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function () {
				var g = a(this);
				var f = g.offset();
				if (this != b.element[0]) {
					b.snapElements.push({
						item: this,
						width: g.outerWidth(),
						height: g.outerHeight(),
						top: f.top,
						left: f.left
					})
				}
			})
		}, drag: function (u, p) {
			var g = a(this).data("draggable"), q = g.options;
			var y = q.snapTolerance;
			var x = p.offset.left, w = x + g.helperProportions.width, f = p.offset.top, e = f + g.helperProportions.height;
			for (var v = g.snapElements.length - 1; v >= 0; v--) {
				var s = g.snapElements[v].left, n = s + g.snapElements[v].width, m = g.snapElements[v].top, A = m + g.snapElements[v].height;
				if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
					if (g.snapElements[v].snapping) {
						(g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
					}
					g.snapElements[v].snapping = false;
					continue
				}
				if (q.snapMode != "inner") {
					var c = Math.abs(m - e) <= y;
					var z = Math.abs(A - f) <= y;
					var j = Math.abs(s - w) <= y;
					var k = Math.abs(n - x) <= y;
					if (c) {
						p.position.top = g._convertPositionTo("relative", {
								top: m - g.helperProportions.height,
								left: 0
							}).top - g.margins.top
					}
					if (z) {
						p.position.top = g._convertPositionTo("relative", {top: A, left: 0}).top - g.margins.top
					}
					if (j) {
						p.position.left = g._convertPositionTo("relative", {
								top: 0,
								left: s - g.helperProportions.width
							}).left - g.margins.left
					}
					if (k) {
						p.position.left = g._convertPositionTo("relative", {top: 0, left: n}).left - g.margins.left
					}
				}
				var h = (c || z || j || k);
				if (q.snapMode != "outer") {
					var c = Math.abs(m - f) <= y;
					var z = Math.abs(A - e) <= y;
					var j = Math.abs(s - x) <= y;
					var k = Math.abs(n - w) <= y;
					if (c) {
						p.position.top = g._convertPositionTo("relative", {top: m, left: 0}).top - g.margins.top
					}
					if (z) {
						p.position.top = g._convertPositionTo("relative", {
								top: A - g.helperProportions.height,
								left: 0
							}).top - g.margins.top
					}
					if (j) {
						p.position.left = g._convertPositionTo("relative", {top: 0, left: s}).left - g.margins.left
					}
					if (k) {
						p.position.left = g._convertPositionTo("relative", {
								top: 0,
								left: n - g.helperProportions.width
							}).left - g.margins.left
					}
				}
				if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
					(g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
				}
				g.snapElements[v].snapping = (c || z || j || k || h)
			}
		}
	});
	a.ui.plugin.add("draggable", "stack", {
		start: function (c, d) {
			var f = a(this).data("draggable").options;
			var e = a.makeArray(a(f.stack)).sort(function (h, g) {
				return (parseInt(a(h).css("zIndex"), 10) || 0) - (parseInt(a(g).css("zIndex"), 10) || 0)
			});
			if (!e.length) {
				return
			}
			var b = parseInt(e[0].style.zIndex) || 0;
			a(e).each(function (g) {
				this.style.zIndex = b + g
			});
			this[0].style.zIndex = b + e.length
		}
	});
	a.ui.plugin.add("draggable", "zIndex", {
		start: function (c, d) {
			var b = a(d.helper), e = a(this).data("draggable").options;
			if (b.css("zIndex")) {
				e._zIndex = b.css("zIndex")
			}
			b.css("zIndex", e.zIndex)
		}, stop: function (b, c) {
			var d = a(this).data("draggable").options;
			if (d._zIndex) {
				a(c.helper).css("zIndex", d._zIndex)
			}
		}
	})
})(jQuery);
(function (a) {
	a.widget("ui.droppable", {
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: false,
			addClasses: true,
			greedy: false,
			hoverClass: false,
			scope: "default",
			tolerance: "intersect"
		},
		_create: function () {
			var c = this.options, b = c.accept;
			this.isover = 0;
			this.isout = 1;
			this.accept = a.isFunction(b) ? b : function (e) {
				return e.is(b)
			};
			this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight};
			a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [];
			a.ui.ddmanager.droppables[c.scope].push(this);
			(c.addClasses && this.element.addClass("ui-droppable"))
		},
		destroy: function () {
			var b = a.ui.ddmanager.droppables[this.options.scope];
			for (var c = 0; c < b.length; c++) {
				if (b[c] == this) {
					b.splice(c, 1)
				}
			}
			this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
			return this
		},
		_setOption: function (b, c) {
			if (b == "accept") {
				this.accept = a.isFunction(c) ? c : function (e) {
					return e.is(c)
				}
			}
			a.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function (c) {
			var b = a.ui.ddmanager.current;
			if (this.options.activeClass) {
				this.element.addClass(this.options.activeClass)
			}
			(b && this._trigger("activate", c, this.ui(b)))
		},
		_deactivate: function (c) {
			var b = a.ui.ddmanager.current;
			if (this.options.activeClass) {
				this.element.removeClass(this.options.activeClass)
			}
			(b && this._trigger("deactivate", c, this.ui(b)))
		},
		_over: function (c) {
			var b = a.ui.ddmanager.current;
			if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
				return
			}
			if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
				if (this.options.hoverClass) {
					this.element.addClass(this.options.hoverClass)
				}
				this._trigger("over", c, this.ui(b))
			}
		},
		_out: function (c) {
			var b = a.ui.ddmanager.current;
			if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
				return
			}
			if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
				if (this.options.hoverClass) {
					this.element.removeClass(this.options.hoverClass)
				}
				this._trigger("out", c, this.ui(b))
			}
		},
		_drop: function (c, d) {
			var b = d || a.ui.ddmanager.current;
			if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
				return false
			}
			var e = false;
			this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
				var f = a.data(this, "droppable");
				if (f.options.greedy && !f.options.disabled && f.options.scope == b.options.scope && f.accept.call(f.element[0], (b.currentItem || b.element)) && a.ui.intersect(b, a.extend(f, {offset: f.element.offset()}), f.options.tolerance)) {
					e = true;
					return false
				}
			});
			if (e) {
				return false
			}
			if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
				if (this.options.activeClass) {
					this.element.removeClass(this.options.activeClass)
				}
				if (this.options.hoverClass) {
					this.element.removeClass(this.options.hoverClass)
				}
				this._trigger("drop", c, this.ui(b));
				return this.element
			}
			return false
		},
		ui: function (b) {
			return {
				draggable: (b.currentItem || b.element),
				helper: b.helper,
				position: b.position,
				offset: b.positionAbs
			}
		}
	});
	a.extend(a.ui.droppable, {version: "1.9m2"});
	a.ui.intersect = function (s, j, p) {
		if (!j.offset) {
			return false
		}
		var e = (s.positionAbs || s.position.absolute).left, d = e + s.helperProportions.width, n = (s.positionAbs || s.position.absolute).top, m = n + s.helperProportions.height;
		var g = j.offset.left, c = g + j.proportions.width, q = j.offset.top, k = q + j.proportions.height;
		switch (p) {
			case"fit":
				return (g < e && d < c && q < n && m < k);
				break;
			case"intersect":
				return (g < e + (s.helperProportions.width / 2) && d - (s.helperProportions.width / 2) < c && q < n + (s.helperProportions.height / 2) && m - (s.helperProportions.height / 2) < k);
				break;
			case"pointer":
				var h = ((s.positionAbs || s.position.absolute).left + (s.clickOffset || s.offset.click).left), i = ((s.positionAbs || s.position.absolute).top + (s.clickOffset || s.offset.click).top), f = a.ui.isOver(i, h, q, g, j.proportions.height, j.proportions.width);
				return f;
				break;
			case"touch":
				return ((n >= q && n <= k) || (m >= q && m <= k) || (n < q && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
				break;
			default:
				return false;
				break
		}
	};
	a.ui.ddmanager = {
		current: null, droppables: {"default": []}, prepareOffsets: function (e, g) {
			var b = a.ui.ddmanager.droppables[e.options.scope] || [];
			var f = g ? g.type : null;
			var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
			droppablesLoop:for (var d = 0; d < b.length; d++) {
				if (b[d].options.disabled || (e && !b[d].accept.call(b[d].element[0], (e.currentItem || e.element)))) {
					continue
				}
				for (var c = 0; c < h.length; c++) {
					if (h[c] == b[d].element[0]) {
						b[d].proportions.height = 0;
						continue droppablesLoop
					}
				}
				b[d].visible = b[d].element.css("display") != "none";
				if (!b[d].visible) {
					continue
				}
				b[d].offset = b[d].element.offset();
				b[d].proportions = {width: b[d].element[0].offsetWidth, height: b[d].element[0].offsetHeight};
				if (f == "mousedown") {
					b[d]._activate.call(b[d], g)
				}
			}
		}, drop: function (b, c) {
			var d = false;
			a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
				if (!this.options) {
					return
				}
				if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
					d = d || this._drop.call(this, c)
				}
				if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (b.currentItem || b.element))) {
					this.isout = 1;
					this.isover = 0;
					this._deactivate.call(this, c)
				}
			});
			return d
		}, drag: function (b, c) {
			if (b.options.refreshPositions) {
				a.ui.ddmanager.prepareOffsets(b, c)
			}
			a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
				if (this.options.disabled || this.greedyChild || !this.visible) {
					return
				}
				var e = a.ui.intersect(b, this, this.options.tolerance);
				var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
				if (!g) {
					return
				}
				var f;
				if (this.options.greedy) {
					var d = this.element.parents(":data(droppable):eq(0)");
					if (d.length) {
						f = a.data(d[0], "droppable");
						f.greedyChild = (g == "isover" ? 1 : 0)
					}
				}
				if (f && g == "isover") {
					f.isover = 0;
					f.isout = 1;
					f._out.call(f, c)
				}
				this[g] = 1;
				this[g == "isout" ? "isover" : "isout"] = 0;
				this[g == "isover" ? "_over" : "_out"].call(this, c);
				if (f && g == "isout") {
					f.isout = 0;
					f.isover = 1;
					f._over.call(f, c)
				}
			})
		}
	}
})(jQuery);
(function (c) {
	c.widget("ui.resizable", c.ui.mouse, {
		widgetEventPrefix: "resize",
		options: {
			alsoResize: false,
			animate: false,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: false,
			autoHide: false,
			containment: false,
			ghost: false,
			grid: false,
			handles: "e,s,se",
			helper: false,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 1000
		},
		_create: function () {
			var e = this, j = this.options;
			this.element.addClass("ui-resizable");
			c.extend(this, {
				_aspectRatio: !!(j.aspectRatio),
				aspectRatio: j.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: j.helper || j.ghost || j.animate ? j.helper || "ui-resizable-helper" : null
			});
			if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
				if (/relative/.test(this.element.css("position")) && c.browser.opera) {
					this.element.css({position: "relative", top: "auto", left: "auto"})
				}
				this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				}));
				this.element = this.element.parent().data("resizable", this.element.data("resizable"));
				this.elementIsWrapper = true;
				this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				});
				this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
				this.originalResizeStyle = this.originalElement.css("resize");
				this.originalElement.css("resize", "none");
				this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				}));
				this.originalElement.css({margin: this.originalElement.css("margin")});
				this._proportionallyResize()
			}
			this.handles = j.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				});
			if (this.handles.constructor == String) {
				if (this.handles == "all") {
					this.handles = "n,e,s,w,se,sw,ne,nw"
				}
				var k = this.handles.split(",");
				this.handles = {};
				for (var f = 0; f < k.length; f++) {
					var h = c.trim(k[f]), d = "ui-resizable-" + h;
					var g = c('<div class="ui-resizable-handle ' + d + '"></div>');
					if (/sw|se|ne|nw/.test(h)) {
						g.css({zIndex: ++j.zIndex})
					}
					if ("se" == h) {
						g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
					}
					this.handles[h] = ".ui-resizable-" + h;
					this.element.append(g)
				}
			}
			this._renderAxis = function (q) {
				q = q || this.element;
				for (var m in this.handles) {
					if (this.handles[m].constructor == String) {
						this.handles[m] = c(this.handles[m], this.element).show()
					}
					if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						var n = c(this.handles[m], this.element), p = 0;
						p = /sw|ne|nw|se|n|s/.test(m) ? n.outerHeight() : n.outerWidth();
						var l = ["padding", /ne|nw|n/.test(m) ? "Top" : /se|sw|s/.test(m) ? "Bottom" : /^e$/.test(m) ? "Right" : "Left"].join("");
						q.css(l, p);
						this._proportionallyResize()
					}
					if (!c(this.handles[m]).length) {
						continue
					}
				}
			};
			this._renderAxis(this.element);
			this._handles = c(".ui-resizable-handle", this.element).disableSelection();
			this._handles.mouseover(function () {
				if (!e.resizing) {
					if (this.className) {
						var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
					}
					e.axis = i && i[1] ? i[1] : "se"
				}
			});
			if (j.autoHide) {
				this._handles.hide();
				c(this.element).addClass("ui-resizable-autohide").hover(function () {
					c(this).removeClass("ui-resizable-autohide");
					e._handles.show()
				}, function () {
					if (!e.resizing) {
						c(this).addClass("ui-resizable-autohide");
						e._handles.hide()
					}
				})
			}
			this._mouseInit()
		},
		destroy: function () {
			this._mouseDestroy();
			var d = function (f) {
				c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			if (this.elementIsWrapper) {
				d(this.element);
				var e = this.element;
				e.after(this.originalElement.css({
					position: e.css("position"),
					width: e.outerWidth(),
					height: e.outerHeight(),
					top: e.css("top"),
					left: e.css("left")
				})).remove()
			}
			this.originalElement.css("resize", this.originalResizeStyle);
			d(this.originalElement);
			return this
		},
		_mouseCapture: function (e) {
			var f = false;
			for (var d in this.handles) {
				if (c(this.handles[d])[0] == e.target) {
					f = true
				}
			}
			return !this.options.disabled && f
		},
		_mouseStart: function (f) {
			var i = this.options, e = this.element.position(), d = this.element;
			this.resizing = true;
			this.documentScroll = {top: c(document).scrollTop(), left: c(document).scrollLeft()};
			if (d.is(".ui-draggable") || (/absolute/).test(d.css("position"))) {
				d.css({position: "absolute", top: e.top, left: e.left})
			}
			if (c.browser.opera && (/relative/).test(d.css("position"))) {
				d.css({position: "relative", top: "auto", left: "auto"})
			}
			this._renderProxy();
			var j = b(this.helper.css("left")), g = b(this.helper.css("top"));
			if (i.containment) {
				j += c(i.containment).scrollLeft() || 0;
				g += c(i.containment).scrollTop() || 0
			}
			this.offset = this.helper.offset();
			this.position = {left: j, top: g};
			this.size = this._helper ? {width: d.outerWidth(), height: d.outerHeight()} : {
				width: d.width(),
				height: d.height()
			};
			this.originalSize = this._helper ? {width: d.outerWidth(), height: d.outerHeight()} : {
				width: d.width(),
				height: d.height()
			};
			this.originalPosition = {left: j, top: g};
			this.sizeDiff = {width: d.outerWidth() - d.width(), height: d.outerHeight() - d.height()};
			this.originalMousePosition = {left: f.pageX, top: f.pageY};
			this.aspectRatio = (typeof i.aspectRatio == "number") ? i.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
			var h = c(".ui-resizable-" + this.axis).css("cursor");
			c("body").css("cursor", h == "auto" ? this.axis + "-resize" : h);
			d.addClass("ui-resizable-resizing");
			this._propagate("start", f);
			return true
		},
		_mouseDrag: function (d) {
			var g = this.helper, f = this.options, l = {}, p = this, i = this.originalMousePosition, m = this.axis;
			var q = (d.pageX - i.left) || 0, n = (d.pageY - i.top) || 0;
			var h = this._change[m];
			if (!h) {
				return false
			}
			var k = h.apply(this, [d, q, n]), j = c.browser.msie && c.browser.version < 7, e = this.sizeDiff;
			if (this._aspectRatio || d.shiftKey) {
				k = this._updateRatio(k, d)
			}
			k = this._respectSize(k, d);
			this._propagate("resize", d);
			g.css({
				top: this.position.top + "px",
				left: this.position.left + "px",
				width: this.size.width + "px",
				height: this.size.height + "px"
			});
			if (!this._helper && this._proportionallyResizeElements.length) {
				this._proportionallyResize()
			}
			this._updateCache(k);
			this._trigger("resize", d, this.ui());
			return false
		},
		_mouseStop: function (g) {
			this.resizing = false;
			var h = this.options, l = this;
			if (this._helper) {
				var f = this._proportionallyResizeElements, d = f.length && (/textarea/i).test(f[0].nodeName), e = d && c.ui.hasScroll(f[0], "left") ? 0 : l.sizeDiff.height, j = d ? 0 : l.sizeDiff.width;
				var m = {
					width: (l.size.width - j),
					height: (l.size.height - e)
				}, i = (parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left)) || null, k = (parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top)) || null;
				if (!h.animate) {
					this.element.css(c.extend(m, {top: k, left: i}))
				}
				l.helper.height(l.size.height);
				l.helper.width(l.size.width);
				if (this._helper && !h.animate) {
					this._proportionallyResize()
				}
			}
			c("body").css("cursor", "auto");
			this.element.removeClass("ui-resizable-resizing");
			this._propagate("stop", g);
			if (this._helper) {
				this.helper.remove()
			}
			return false
		},
		_updateCache: function (d) {
			var e = this.options;
			this.offset = this.helper.offset();
			if (a(d.left)) {
				this.position.left = d.left
			}
			if (a(d.top)) {
				this.position.top = d.top
			}
			if (a(d.height)) {
				this.size.height = d.height
			}
			if (a(d.width)) {
				this.size.width = d.width
			}
		},
		_updateRatio: function (g, f) {
			var h = this.options, i = this.position, e = this.size, d = this.axis;
			if (g.height) {
				g.width = (e.height * this.aspectRatio)
			} else {
				if (g.width) {
					g.height = (e.width / this.aspectRatio)
				}
			}
			if (d == "sw") {
				g.left = i.left + (e.width - g.width);
				g.top = null
			}
			if (d == "nw") {
				g.top = i.top + (e.height - g.height);
				g.left = i.left + (e.width - g.width)
			}
			return g
		},
		_respectSize: function (k, f) {
			var i = this.helper, h = this.options, q = this._aspectRatio || f.shiftKey, p = this.axis, s = a(k.width) && h.maxWidth && (h.maxWidth < k.width), l = a(k.height) && h.maxHeight && (h.maxHeight < k.height), g = a(k.width) && h.minWidth && (h.minWidth > k.width), r = a(k.height) && h.minHeight && (h.minHeight > k.height);
			if (g) {
				k.width = h.minWidth
			}
			if (r) {
				k.height = h.minHeight
			}
			if (s) {
				k.width = h.maxWidth
			}
			if (l) {
				k.height = h.maxHeight
			}
			var e = this.originalPosition.left + this.originalSize.width, n = this.position.top + this.size.height;
			var j = /sw|nw|w/.test(p), d = /nw|ne|n/.test(p);
			if (g && j) {
				k.left = e - h.minWidth
			}
			if (s && j) {
				k.left = e - h.maxWidth
			}
			if (r && d) {
				k.top = n - h.minHeight
			}
			if (l && d) {
				k.top = n - h.maxHeight
			}
			var m = !k.width && !k.height;
			if (m && !k.left && k.top) {
				k.top = null
			} else {
				if (m && !k.top && k.left) {
					k.left = null
				}
			}
			return k
		},
		_proportionallyResize: function () {
			var j = this.options;
			if (!this._proportionallyResizeElements.length) {
				return
			}
			var f = this.helper || this.element;
			for (var e = 0; e < this._proportionallyResizeElements.length; e++) {
				var g = this._proportionallyResizeElements[e];
				if (!this.borderDif) {
					var d = [g.css("borderTopWidth"), g.css("borderRightWidth"), g.css("borderBottomWidth"), g.css("borderLeftWidth")], h = [g.css("paddingTop"), g.css("paddingRight"), g.css("paddingBottom"), g.css("paddingLeft")];
					this.borderDif = c.map(d, function (k, m) {
						var l = parseInt(k, 10) || 0, n = parseInt(h[m], 10) || 0;
						return l + n
					})
				}
				if (c.browser.msie && !(!(c(f).is(":hidden") || c(f).parents(":hidden").length))) {
					continue
				}
				g.css({
					height: (f.height() - this.borderDif[0] - this.borderDif[2]) || 0,
					width: (f.width() - this.borderDif[1] - this.borderDif[3]) || 0
				})
			}
		},
		_renderProxy: function () {
			var e = this.element, h = this.options;
			this.elementOffset = e.offset();
			if (this._helper) {
				this.helper = this.helper || c('<div style="overflow:hidden;"></div>');
				var d = c.browser.msie && c.browser.version < 7, f = (d ? 1 : 0), g = (d ? 2 : -1);
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() + g,
					height: this.element.outerHeight() + g,
					position: "absolute",
					left: this.elementOffset.left - f + "px",
					top: this.elementOffset.top - f + "px",
					zIndex: ++h.zIndex
				});
				this.helper.appendTo("body").disableSelection()
			} else {
				this.helper = this.element
			}
		},
		_change: {
			e: function (f, e, d) {
				return {width: this.originalSize.width + e}
			}, w: function (g, e, d) {
				var i = this.options, f = this.originalSize, h = this.originalPosition;
				return {left: h.left + e, width: f.width - e}
			}, n: function (g, e, d) {
				var i = this.options, f = this.originalSize, h = this.originalPosition;
				return {top: h.top + d, height: f.height - d}
			}, s: function (f, e, d) {
				return {height: this.originalSize.height + d}
			}, se: function (f, e, d) {
				return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [f, e, d]))
			}, sw: function (f, e, d) {
				return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [f, e, d]))
			}, ne: function (f, e, d) {
				return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [f, e, d]))
			}, nw: function (f, e, d) {
				return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [f, e, d]))
			}
		},
		_propagate: function (e, d) {
			c.ui.plugin.call(this, e, [d, this.ui()]);
			(e != "resize" && this._trigger(e, d, this.ui()))
		},
		plugins: {},
		ui: function () {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	});
	c.extend(c.ui.resizable, {version: "1.9m2"});
	c.ui.plugin.add("resizable", "alsoResize", {
		start: function (e, f) {
			var d = c(this).data("resizable"), h = d.options;
			var g = function (i) {
				c(i).each(function () {
					var j = c(this);
					j.data("resizable-alsoresize", {
						width: parseInt(j.width(), 10),
						height: parseInt(j.height(), 10),
						left: parseInt(j.css("left"), 10),
						top: parseInt(j.css("top"), 10),
						position: j.css("position")
					})
				})
			};
			if (typeof(h.alsoResize) == "object" && !h.alsoResize.parentNode) {
				if (h.alsoResize.length) {
					h.alsoResize = h.alsoResize[0];
					g(h.alsoResize)
				} else {
					c.each(h.alsoResize, function (i) {
						g(i)
					})
				}
			} else {
				g(h.alsoResize)
			}
		}, resize: function (f, h) {
			var e = c(this).data("resizable"), i = e.options, g = e.originalSize, k = e.originalPosition;
			var j = {
				height: (e.size.height - g.height) || 0,
				width: (e.size.width - g.width) || 0,
				top: (e.position.top - k.top) || 0,
				left: (e.position.left - k.left) || 0
			}, d = function (l, m) {
				c(l).each(function () {
					var q = c(this), r = c(this).data("resizable-alsoresize"), p = {}, n = m && m.length ? m : q.parents(h.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
					c.each(n, function (s, v) {
						var u = (r[v] || 0) + (j[v] || 0);
						if (u && u >= 0) {
							p[v] = u || null
						}
					});
					if (c.browser.opera && /relative/.test(q.css("position"))) {
						e._revertToRelativePosition = true;
						q.css({position: "absolute", top: "auto", left: "auto"})
					}
					q.css(p)
				})
			};
			if (typeof(i.alsoResize) == "object" && !i.alsoResize.nodeType) {
				c.each(i.alsoResize, function (l, m) {
					d(l, m)
				})
			} else {
				d(i.alsoResize)
			}
		}, stop: function (f, g) {
			var e = c(this).data("resizable");
			var d = function (h) {
				c(h).each(function () {
					var i = c(this);
					i.css({position: i.data("resizable-alsoresize").position})
				})
			};
			if (e._revertToRelativePosition) {
				e._revertToRelativePosition = false;
				if (typeof(o.alsoResize) == "object" && !o.alsoResize.nodeType) {
					c.each(o.alsoResize, function (h) {
						d(h)
					})
				} else {
					d(o.alsoResize)
				}
			}
			c(this).removeData("resizable-alsoresize")
		}
	});
	c.ui.plugin.add("resizable", "animate", {
		stop: function (h, m) {
			var n = c(this).data("resizable"), i = n.options;
			var g = n._proportionallyResizeElements, d = g.length && (/textarea/i).test(g[0].nodeName), e = d && c.ui.hasScroll(g[0], "left") ? 0 : n.sizeDiff.height, k = d ? 0 : n.sizeDiff.width;
			var f = {
				width: (n.size.width - k),
				height: (n.size.height - e)
			}, j = (parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left)) || null, l = (parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top)) || null;
			n.element.animate(c.extend(f, l && j ? {top: l, left: j} : {}), {
				duration: i.animateDuration,
				easing: i.animateEasing,
				step: function () {
					var p = {
						width: parseInt(n.element.css("width"), 10),
						height: parseInt(n.element.css("height"), 10),
						top: parseInt(n.element.css("top"), 10),
						left: parseInt(n.element.css("left"), 10)
					};
					if (g && g.length) {
						c(g[0]).css({width: p.width, height: p.height})
					}
					n._updateCache(p);
					n._propagate("resize", h)
				}
			})
		}
	});
	c.ui.plugin.add("resizable", "containment", {
		start: function (e, q) {
			var s = c(this).data("resizable"), i = s.options, k = s.element;
			var f = i.containment, j = (f instanceof c) ? f.get(0) : (/parent/.test(f)) ? k.parent().get(0) : f;
			if (!j) {
				return
			}
			s.containerElement = c(j);
			if (/document/.test(f) || f == document) {
				s.containerOffset = {left: 0, top: 0};
				s.containerPosition = {left: 0, top: 0};
				s.parentData = {
					element: c(document),
					left: 0,
					top: 0,
					width: c(document).width(),
					height: c(document).height() || document.body.parentNode.scrollHeight
				}
			} else {
				var m = c(j), h = [];
				c(["Top", "Right", "Left", "Bottom"]).each(function (u, p) {
					h[u] = b(m.css("padding" + p))
				});
				s.containerOffset = m.offset();
				s.containerPosition = m.position();
				s.containerSize = {height: (m.innerHeight() - h[3]), width: (m.innerWidth() - h[1])};
				var n = s.containerOffset, d = s.containerSize.height, l = s.containerSize.width, g = (c.ui.hasScroll(j, "left") ? j.scrollWidth : l), r = (c.ui.hasScroll(j) ? j.scrollHeight : d);
				s.parentData = {element: j, left: n.left, top: n.top, width: g, height: r}
			}
		}, resize: function (f, p) {
			var s = c(this).data("resizable"), h = s.options, e = s.containerSize, n = s.containerOffset, l = s.size, m = s.position, q = s._aspectRatio || f.shiftKey, d = {
				top: 0,
				left: 0
			}, g = s.containerElement;
			if (g[0] != document && (/static/).test(g.css("position"))) {
				d = n
			}
			if (m.left < (s._helper ? n.left : 0)) {
				s.size.width = s.size.width + (s._helper ? (s.position.left - n.left) : (s.position.left - d.left));
				if (q) {
					s.size.height = s.size.width / h.aspectRatio
				}
				s.position.left = h.helper ? n.left : 0
			}
			if (m.top < (s._helper ? n.top : 0)) {
				s.size.height = s.size.height + (s._helper ? (s.position.top - n.top) : s.position.top);
				if (q) {
					s.size.width = s.size.height * h.aspectRatio
				}
				s.position.top = s._helper ? n.top : 0
			}
			s.offset.left = s.parentData.left + s.position.left;
			s.offset.top = s.parentData.top + s.position.top;
			var k = Math.abs((s._helper ? s.offset.left - d.left : (s.offset.left - d.left)) + s.sizeDiff.width), r = Math.abs((s._helper ? s.offset.top - d.top : (s.offset.top - n.top)) + s.sizeDiff.height);
			var j = s.containerElement.get(0) == s.element.parent().get(0), i = /relative|absolute/.test(s.containerElement.css("position"));
			if (j && i) {
				k -= s.parentData.left
			}
			if (k + s.size.width >= s.parentData.width) {
				s.size.width = s.parentData.width - k;
				if (q) {
					s.size.height = s.size.width / s.aspectRatio
				}
			}
			if (r + s.size.height >= s.parentData.height) {
				s.size.height = s.parentData.height - r;
				if (q) {
					s.size.width = s.size.height * s.aspectRatio
				}
			}
		}, stop: function (e, m) {
			var p = c(this).data("resizable"), f = p.options, k = p.position, l = p.containerOffset, d = p.containerPosition, g = p.containerElement;
			var i = c(p.helper), q = i.offset(), n = i.outerWidth() - p.sizeDiff.width, j = i.outerHeight() - p.sizeDiff.height;
			if (p._helper && !f.animate && (/relative/).test(g.css("position"))) {
				c(this).css({left: q.left - d.left - l.left, width: n, height: j})
			}
			if (p._helper && !f.animate && (/static/).test(g.css("position"))) {
				c(this).css({left: q.left - d.left - l.left, width: n, height: j})
			}
		}
	});
	c.ui.plugin.add("resizable", "ghost", {
		start: function (f, g) {
			var d = c(this).data("resizable"), h = d.options, e = d.size;
			d.ghost = d.originalElement.clone();
			d.ghost.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: e.height,
				width: e.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass(typeof h.ghost == "string" ? h.ghost : "");
			d.ghost.appendTo(d.helper)
		}, resize: function (e, f) {
			var d = c(this).data("resizable"), g = d.options;
			if (d.ghost) {
				d.ghost.css({position: "relative", height: d.size.height, width: d.size.width})
			}
		}, stop: function (e, f) {
			var d = c(this).data("resizable"), g = d.options;
			if (d.ghost && d.helper) {
				d.helper.get(0).removeChild(d.ghost.get(0))
			}
		}
	});
	c.ui.plugin.add("resizable", "grid", {
		resize: function (d, l) {
			var n = c(this).data("resizable"), g = n.options, j = n.size, h = n.originalSize, i = n.originalPosition, m = n.axis, k = g._aspectRatio || d.shiftKey;
			g.grid = typeof g.grid == "number" ? [g.grid, g.grid] : g.grid;
			var f = Math.round((j.width - h.width) / (g.grid[0] || 1)) * (g.grid[0] || 1), e = Math.round((j.height - h.height) / (g.grid[1] || 1)) * (g.grid[1] || 1);
			if (/^(se|s|e)$/.test(m)) {
				n.size.width = h.width + f;
				n.size.height = h.height + e
			} else {
				if (/^(ne)$/.test(m)) {
					n.size.width = h.width + f;
					n.size.height = h.height + e;
					n.position.top = i.top - e
				} else {
					if (/^(sw)$/.test(m)) {
						n.size.width = h.width + f;
						n.size.height = h.height + e;
						n.position.left = i.left - f
					} else {
						n.size.width = h.width + f;
						n.size.height = h.height + e;
						n.position.top = i.top - e;
						n.position.left = i.left - f
					}
				}
			}
		}
	});
	var b = function (d) {
		return parseInt(d, 10) || 0
	};
	var a = function (d) {
		return !isNaN(parseInt(d, 10))
	}
})(jQuery);
(function (a) {
	a.widget("ui.selectable", a.ui.mouse, {
		options: {
			appendTo: "body",
			autoRefresh: true,
			distance: 0,
			filter: "*",
			tolerance: "touch"
		}, _create: function () {
			var b = this;
			this.element.addClass("ui-selectable");
			this.dragged = false;
			var c;
			this.refresh = function () {
				c = a(b.options.filter, b.element[0]);
				c.each(function () {
					var d = a(this);
					var e = d.offset();
					a.data(this, "selectable-item", {
						element: this,
						$element: d,
						left: e.left,
						top: e.top,
						right: e.left + d.outerWidth(),
						bottom: e.top + d.outerHeight(),
						startselected: false,
						selected: d.hasClass("ui-selected"),
						selecting: d.hasClass("ui-selecting"),
						unselecting: d.hasClass("ui-unselecting")
					})
				})
			};
			this.refresh();
			this.selectees = c.addClass("ui-selectee");
			this._mouseInit();
			this.helper = a("<div class='ui-selectable-helper'></div>")
		}, destroy: function () {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item");
			this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
			this._mouseDestroy();
			return this
		}, _mouseStart: function (d) {
			var b = this;
			this.opos = [d.pageX, d.pageY];
			if (this.options.disabled) {
				return
			}
			var c = this.options;
			this.selectees = a(c.filter, this.element[0]);
			this._trigger("start", d);
			a(c.appendTo).append(this.helper);
			this.helper.css({left: d.clientX, top: d.clientY, width: 0, height: 0});
			if (c.autoRefresh) {
				this.refresh()
			}
			this.selectees.filter(".ui-selected").each(function () {
				var e = a.data(this, "selectable-item");
				e.startselected = true;
				if (!d.metaKey) {
					e.$element.removeClass("ui-selected");
					e.selected = false;
					e.$element.addClass("ui-unselecting");
					e.unselecting = true;
					b._trigger("unselecting", d, {unselecting: e.element})
				}
			});
			a(d.target).parents().andSelf().each(function () {
				var f = a.data(this, "selectable-item");
				if (f) {
					var e = !d.metaKey || !f.$element.hasClass("ui-selected");
					f.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting");
					f.unselecting = !e;
					f.selecting = e;
					f.selected = e;
					if (e) {
						b._trigger("selecting", d, {selecting: f.element})
					} else {
						b._trigger("unselecting", d, {unselecting: f.element})
					}
					return false
				}
			})
		}, _mouseDrag: function (i) {
			var c = this;
			this.dragged = true;
			if (this.options.disabled) {
				return
			}
			var e = this.options;
			var d = this.opos[0], h = this.opos[1], b = i.pageX, g = i.pageY;
			if (d > b) {
				var f = b;
				b = d;
				d = f
			}
			if (h > g) {
				var f = g;
				g = h;
				h = f
			}
			this.helper.css({left: d, top: h, width: b - d, height: g - h});
			this.selectees.each(function () {
				var j = a.data(this, "selectable-item");
				if (!j || j.element == c.element[0]) {
					return
				}
				var k = false;
				if (e.tolerance == "touch") {
					k = (!(j.left > b || j.right < d || j.top > g || j.bottom < h))
				} else {
					if (e.tolerance == "fit") {
						k = (j.left > d && j.right < b && j.top > h && j.bottom < g)
					}
				}
				if (k) {
					if (j.selected) {
						j.$element.removeClass("ui-selected");
						j.selected = false
					}
					if (j.unselecting) {
						j.$element.removeClass("ui-unselecting");
						j.unselecting = false
					}
					if (!j.selecting) {
						j.$element.addClass("ui-selecting");
						j.selecting = true;
						c._trigger("selecting", i, {selecting: j.element})
					}
				} else {
					if (j.selecting) {
						if (i.metaKey && j.startselected) {
							j.$element.removeClass("ui-selecting");
							j.selecting = false;
							j.$element.addClass("ui-selected");
							j.selected = true
						} else {
							j.$element.removeClass("ui-selecting");
							j.selecting = false;
							if (j.startselected) {
								j.$element.addClass("ui-unselecting");
								j.unselecting = true
							}
							c._trigger("unselecting", i, {unselecting: j.element})
						}
					}
					if (j.selected) {
						if (!i.metaKey && !j.startselected) {
							j.$element.removeClass("ui-selected");
							j.selected = false;
							j.$element.addClass("ui-unselecting");
							j.unselecting = true;
							c._trigger("unselecting", i, {unselecting: j.element})
						}
					}
				}
			});
			return false
		}, _mouseStop: function (d) {
			var b = this;
			this.dragged = false;
			var c = this.options;
			a(".ui-unselecting", this.element[0]).each(function () {
				var e = a.data(this, "selectable-item");
				e.$element.removeClass("ui-unselecting");
				e.unselecting = false;
				e.startselected = false;
				b._trigger("unselected", d, {unselected: e.element})
			});
			a(".ui-selecting", this.element[0]).each(function () {
				var e = a.data(this, "selectable-item");
				e.$element.removeClass("ui-selecting").addClass("ui-selected");
				e.selecting = false;
				e.selected = true;
				e.startselected = true;
				b._trigger("selected", d, {selected: e.element})
			});
			this._trigger("stop", d);
			this.helper.remove();
			return false
		}
	});
	a.extend(a.ui.selectable, {version: "1.9m2"})
})(jQuery);
(function (a) {
	a.widget("ui.sortable", a.ui.mouse, {
		widgetEventPrefix: "sort",
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000
		},
		_create: function () {
			var b = this.options;
			this.containerCache = {};
			this.element.addClass("ui-sortable");
			this.refresh();
			this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
			this.offset = this.element.offset();
			this._mouseInit()
		},
		destroy: function () {
			this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
			this._mouseDestroy();
			for (var b = this.items.length - 1; b >= 0; b--) {
				this.items[b].item.removeData("sortable-item")
			}
			return this
		},
		_setOption: function (b, c) {
			if (b === "disabled") {
				this.options[b] = c;
				this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")
			} else {
				this._superApply("_setOption", arguments)
			}
		},
		_mouseCapture: function (e, f) {
			if (this.reverting) {
				return false
			}
			if (this.options.disabled || this.options.type == "static") {
				return false
			}
			this._refreshItems(e);
			var d = null, c = this, b = a(e.target).parents().each(function () {
				if (a.data(this, "sortable-item") == c) {
					d = a(this);
					return false
				}
			});
			if (a.data(e.target, "sortable-item") == c) {
				d = a(e.target)
			}
			if (!d) {
				return false
			}
			if (this.options.handle && !f) {
				var g = false;
				a(this.options.handle, d).find("*").andSelf().each(function () {
					if (this == e.target) {
						g = true
					}
				});
				if (!g) {
					return false
				}
			}
			this.currentItem = d;
			this._removeCurrentsFromItems();
			return true
		},
		_mouseStart: function (e, f, b) {
			var g = this.options, c = this;
			this.currentContainer = this;
			this.refreshPositions();
			this.helper = this._createHelper(e);
			this._cacheHelperProportions();
			this._cacheMargins();
			this.scrollParent = this.helper.scrollParent();
			this.offset = this.currentItem.offset();
			this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");
			a.extend(this.offset, {
				click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this._generatePosition(e);
			this.originalPageX = e.pageX;
			this.originalPageY = e.pageY;
			(g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt));
			this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};
			if (this.helper[0] != this.currentItem[0]) {
				this.currentItem.hide()
			}
			this._createPlaceholder();
			if (g.containment) {
				this._setContainment()
			}
			if (g.cursor) {
				if (a("body").css("cursor")) {
					this._storedCursor = a("body").css("cursor")
				}
				a("body").css("cursor", g.cursor)
			}
			if (g.opacity) {
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity")
				}
				this.helper.css("opacity", g.opacity)
			}
			if (g.zIndex) {
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex")
				}
				this.helper.css("zIndex", g.zIndex)
			}
			if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
				this.overflowOffset = this.scrollParent.offset()
			}
			this._trigger("start", e, this._uiHash());
			if (!this._preserveHelperProportions) {
				this._cacheHelperProportions()
			}
			if (!b) {
				for (var d = this.containers.length - 1; d >= 0; d--) {
					this.containers[d]._trigger("activate", e, c._uiHash(this))
				}
			}
			if (a.ui.ddmanager) {
				a.ui.ddmanager.current = this
			}
			if (a.ui.ddmanager && !g.dropBehaviour) {
				a.ui.ddmanager.prepareOffsets(this, e)
			}
			this.dragging = true;
			this.helper.addClass("ui-sortable-helper");
			this._mouseDrag(e);
			return true
		},
		_mouseDrag: function (f) {
			this.position = this._generatePosition(f);
			this.positionAbs = this._convertPositionTo("absolute");
			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs
			}
			if (this.options.scroll) {
				var g = this.options, b = false;
				if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
					if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
						this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
					} else {
						if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
							this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
						}
					}
					if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
					} else {
						if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
							this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
						}
					}
				} else {
					if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
						b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
					} else {
						if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
							b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
						}
					}
					if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
						b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
					} else {
						if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
							b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
						}
					}
				}
				if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
					a.ui.ddmanager.prepareOffsets(this, f)
				}
			}
			this.positionAbs = this._convertPositionTo("absolute");
			if (!this.options.axis || this.options.axis != "y") {
				this.helper[0].style.left = this.position.left + "px"
			}
			if (!this.options.axis || this.options.axis != "x") {
				this.helper[0].style.top = this.position.top + "px"
			}
			for (var d = this.items.length - 1; d >= 0; d--) {
				var e = this.items[d], c = e.item[0], h = this._intersectsWithPointer(e);
				if (!h) {
					continue
				}
				if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
					this.direction = h == 1 ? "down" : "up";
					if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
						this._rearrange(f, e)
					} else {
						break
					}
					this._trigger("change", f, this._uiHash());
					break
				}
			}
			this._contactContainers(f);
			if (a.ui.ddmanager) {
				a.ui.ddmanager.drag(this, f)
			}
			this._trigger("sort", f, this._uiHash());
			this.lastPositionAbs = this.positionAbs;
			return false
		},
		_mouseStop: function (c, d) {
			if (!c) {
				return
			}
			if (a.ui.ddmanager && !this.options.dropBehaviour) {
				a.ui.ddmanager.drop(this, c)
			}
			if (this.options.revert) {
				var b = this;
				var e = b.placeholder.offset();
				b.reverting = true;
				a(this.helper).animate({
					left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
					top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
				}, parseInt(this.options.revert, 10) || 500, function () {
					b._clear(c)
				})
			} else {
				this._clear(c, d)
			}
			return false
		},
		cancel: function () {
			var b = this;
			if (this.dragging) {
				this._mouseUp();
				if (this.options.helper == "original") {
					this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
				} else {
					this.currentItem.show()
				}
				for (var c = this.containers.length - 1; c >= 0; c--) {
					this.containers[c]._trigger("deactivate", null, b._uiHash(this));
					if (this.containers[c].containerCache.over) {
						this.containers[c]._trigger("out", null, b._uiHash(this));
						this.containers[c].containerCache.over = 0
					}
				}
			}
			if (this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0])
			}
			if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove()
			}
			a.extend(this, {helper: null, dragging: false, reverting: false, _noFinalSort: null});
			if (this.domPosition.prev) {
				a(this.domPosition.prev).after(this.currentItem)
			} else {
				a(this.domPosition.parent).prepend(this.currentItem)
			}
			return this
		},
		serialize: function (d) {
			var b = this._getItemsAsjQuery(d && d.connected);
			var c = [];
			d = d || {};
			a(b).each(function () {
				var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
				if (e) {
					c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
				}
			});
			return c.join("&")
		},
		toArray: function (d) {
			var b = this._getItemsAsjQuery(d && d.connected);
			var c = [];
			d = d || {};
			b.each(function () {
				c.push(a(d.item || this).attr(d.attribute || "id") || "")
			});
			return c
		},
		_intersectsWith: function (m) {
			var e = this.positionAbs.left, d = e + this.helperProportions.width, k = this.positionAbs.top, j = k + this.helperProportions.height;
			var f = m.left, c = f + m.width, n = m.top, i = n + m.height;
			var p = this.offset.click.top, h = this.offset.click.left;
			var g = (k + p) > n && (k + p) < i && (e + h) > f && (e + h) < c;
			if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
				return g
			} else {
				return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
			}
		},
		_intersectsWithPointer: function (d) {
			var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height), c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width), g = e && c, b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
			if (!g) {
				return false
			}
			return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
		},
		_intersectsWithSides: function (e) {
			var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width), b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
			if (this.floating && f) {
				return ((f == "right" && d) || (f == "left" && !d))
			} else {
				return b && ((b == "down" && c) || (b == "up" && !c))
			}
		},
		_getDragVerticalDirection: function () {
			var b = this.positionAbs.top - this.lastPositionAbs.top;
			return b != 0 && (b > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function () {
			var b = this.positionAbs.left - this.lastPositionAbs.left;
			return b != 0 && (b > 0 ? "right" : "left")
		},
		refresh: function (b) {
			this._refreshItems(b);
			this.refreshPositions();
			return this
		},
		_connectWith: function () {
			var b = this.options;
			return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
		},
		_getItemsAsjQuery: function (b) {
			var l = this;
			var g = [];
			var e = [];
			var h = this._connectWith();
			if (h && b) {
				for (var d = h.length - 1; d >= 0; d--) {
					var k = a(h[d]);
					for (var c = k.length - 1; c >= 0; c--) {
						var f = a.data(k[c], "sortable");
						if (f && f != this && !f.options.disabled) {
							e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f])
						}
					}
				}
			}
			e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
			for (var d = e.length - 1; d >= 0; d--) {
				e[d][0].each(function () {
					g.push(this)
				})
			}
			return a(g)
		},
		_removeCurrentsFromItems: function () {
			var d = this.currentItem.find(":data(sortable-item)");
			for (var c = 0; c < this.items.length; c++) {
				for (var b = 0; b < d.length; b++) {
					if (d[b] == this.items[c].item[0]) {
						this.items.splice(c, 1)
					}
				}
			}
		},
		_refreshItems: function (b) {
			this.items = [];
			this.containers = [this];
			var h = this.items;
			var q = this;
			var f = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]];
			var l = this._connectWith();
			if (l) {
				for (var e = l.length - 1; e >= 0; e--) {
					var m = a(l[e]);
					for (var d = m.length - 1; d >= 0; d--) {
						var g = a.data(m[d], "sortable");
						if (g && g != this && !g.options.disabled) {
							f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {item: this.currentItem}) : a(g.options.items, g.element), g]);
							this.containers.push(g)
						}
					}
				}
			}
			for (var e = f.length - 1; e >= 0; e--) {
				var k = f[e][1];
				var c = f[e][0];
				for (var d = 0, n = c.length; d < n; d++) {
					var p = a(c[d]);
					p.data("sortable-item", k);
					h.push({item: p, instance: k, width: 0, height: 0, left: 0, top: 0})
				}
			}
		},
		refreshPositions: function (b) {
			if (this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset()
			}
			for (var d = this.items.length - 1; d >= 0; d--) {
				var e = this.items[d];
				var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
				if (!b) {
					e.width = c.outerWidth();
					e.height = c.outerHeight()
				}
				var f = c.offset();
				e.left = f.left;
				e.top = f.top
			}
			if (this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this)
			} else {
				for (var d = this.containers.length - 1; d >= 0; d--) {
					var f = this.containers[d].element.offset();
					this.containers[d].containerCache.left = f.left;
					this.containers[d].containerCache.top = f.top;
					this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
					this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
				}
			}
			return this
		},
		_createPlaceholder: function (d) {
			var b = d || this, e = b.options;
			if (!e.placeholder || e.placeholder.constructor == String) {
				var c = e.placeholder;
				e.placeholder = {
					element: function () {
						var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
						if (!c) {
							f.style.visibility = "hidden"
						}
						return f
					}, update: function (f, g) {
						if (c && !e.forcePlaceholderSize) {
							return
						}
						if (!g.height()) {
							g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
						}
						if (!g.width()) {
							g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
						}
					}
				}
			}
			b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
			b.currentItem.after(b.placeholder);
			e.placeholder.update(b, b.placeholder)
		},
		_contactContainers: function (b) {
			var d = null, k = null;
			for (var f = this.containers.length - 1; f >= 0; f--) {
				if (a.ui.contains(this.currentItem[0], this.containers[f].element[0])) {
					continue
				}
				if (this._intersectsWith(this.containers[f].containerCache)) {
					if (d && a.ui.contains(this.containers[f].element[0], d.element[0])) {
						continue
					}
					d = this.containers[f];
					k = f
				} else {
					if (this.containers[f].containerCache.over) {
						this.containers[f]._trigger("out", b, this._uiHash(this));
						this.containers[f].containerCache.over = 0
					}
				}
			}
			if (!d) {
				return
			}
			if (this.containers.length === 1) {
				this.containers[k]._trigger("over", b, this._uiHash(this));
				this.containers[k].containerCache.over = 1
			} else {
				if (this.currentContainer != this.containers[k]) {
					var h = 10000;
					var g = null;
					var c = this.positionAbs[this.containers[k].floating ? "left" : "top"];
					for (var e = this.items.length - 1; e >= 0; e--) {
						if (!a.ui.contains(this.containers[k].element[0], this.items[e].item[0])) {
							continue
						}
						var l = this.items[e][this.containers[k].floating ? "left" : "top"];
						if (Math.abs(l - c) < h) {
							h = Math.abs(l - c);
							g = this.items[e]
						}
					}
					if (!g && !this.options.dropOnEmpty) {
						return
					}
					this.currentContainer = this.containers[k];
					g ? this._rearrange(b, g, null, true) : this._rearrange(b, null, this.containers[k].element, true);
					this._trigger("change", b, this._uiHash());
					this.containers[k]._trigger("change", b, this._uiHash(this));
					this.options.placeholder.update(this.currentContainer, this.placeholder);
					this.containers[k]._trigger("over", b, this._uiHash(this));
					this.containers[k].containerCache.over = 1
				}
			}
		},
		_createHelper: function (c) {
			var d = this.options;
			var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
			if (!b.parents("body").length) {
				a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
			}
			if (b[0] == this.currentItem[0]) {
				this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				}
			}
			if (b[0].style.width == "" || d.forceHelperSize) {
				b.width(this.currentItem.width())
			}
			if (b[0].style.height == "" || d.forceHelperSize) {
				b.height(this.currentItem.height())
			}
			return b
		},
		_adjustOffsetFromHelper: function (b) {
			if (typeof b == "string") {
				b = b.split(" ")
			}
			if (a.isArray(b)) {
				b = {left: +b[0], top: +b[1] || 0}
			}
			if ("left" in b) {
				this.offset.click.left = b.left + this.margins.left
			}
			if ("right" in b) {
				this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
			}
			if ("top" in b) {
				this.offset.click.top = b.top + this.margins.top
			}
			if ("bottom" in b) {
				this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
			}
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
				b.left += this.scrollParent.scrollLeft();
				b.top += this.scrollParent.scrollTop()
			}
			if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
				b = {top: 0, left: 0}
			}
			return {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if (this.cssPosition == "relative") {
				var b = this.currentItem.position();
				return {
					top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			} else {
				return {top: 0, left: 0}
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
				top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
		},
		_setContainment: function () {
			var e = this.options;
			if (e.containment == "parent") {
				e.containment = this.helper[0].parentNode
			}
			if (e.containment == "document" || e.containment == "window") {
				this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
			}
			if (!(/^(document|window|parent)$/).test(e.containment)) {
				var c = a(e.containment)[0];
				var d = a(e.containment).offset();
				var b = (a(c).css("overflow") != "hidden");
				this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
			}
		},
		_convertPositionTo: function (f, h) {
			if (!h) {
				h = this.position
			}
			var c = f == "absolute" ? 1 : -1;
			var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
			return {
				top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
				left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
			}
		},
		_generatePosition: function (e) {
			var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
			if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset()
			}
			var d = e.pageX;
			var c = e.pageY;
			if (this.originalPosition) {
				if (this.containment) {
					if (e.pageX - this.offset.click.left < this.containment[0]) {
						d = this.containment[0] + this.offset.click.left
					}
					if (e.pageY - this.offset.click.top < this.containment[1]) {
						c = this.containment[1] + this.offset.click.top
					}
					if (e.pageX - this.offset.click.left > this.containment[2]) {
						d = this.containment[2] + this.offset.click.left
					}
					if (e.pageY - this.offset.click.top > this.containment[3]) {
						c = this.containment[3] + this.offset.click.top
					}
				}
				if (h.grid) {
					var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
					c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
					var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
					d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
				}
			}
			return {
				top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
				left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
			}
		},
		_rearrange: function (g, f, c, e) {
			c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
			this.counter = this.counter ? ++this.counter : 1;
			var d = this, b = this.counter;
			window.setTimeout(function () {
				if (b == d.counter) {
					d.refreshPositions(!e)
				}
			}, 0)
		},
		_clear: function (d, e) {
			this.reverting = false;
			var f = [], b = this;
			if (!this._noFinalSort && this.currentItem[0].parentNode) {
				this.placeholder.before(this.currentItem)
			}
			this._noFinalSort = null;
			if (this.helper[0] == this.currentItem[0]) {
				for (var c in this._storedCSS) {
					if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
						this._storedCSS[c] = ""
					}
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else {
				this.currentItem.show()
			}
			if (this.fromOutside && !e) {
				f.push(function (g) {
					this._trigger("receive", g, this._uiHash(this.fromOutside))
				})
			}
			if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
				f.push(function (g) {
					this._trigger("update", g, this._uiHash())
				})
			}
			if (!a.ui.contains(this.element[0], this.currentItem[0])) {
				if (!e) {
					f.push(function (g) {
						this._trigger("remove", g, this._uiHash())
					})
				}
				for (var c = this.containers.length - 1; c >= 0; c--) {
					if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
						f.push((function (g) {
							return function (h) {
								g._trigger("receive", h, this._uiHash(this))
							}
						}).call(this, this.containers[c]));
						f.push((function (g) {
							return function (h) {
								g._trigger("update", h, this._uiHash(this))
							}
						}).call(this, this.containers[c]))
					}
				}
			}
			for (var c = this.containers.length - 1; c >= 0; c--) {
				if (!e) {
					f.push((function (g) {
						return function (h) {
							g._trigger("deactivate", h, this._uiHash(this))
						}
					}).call(this, this.containers[c]))
				}
				if (this.containers[c].containerCache.over) {
					f.push((function (g) {
						return function (h) {
							g._trigger("out", h, this._uiHash(this))
						}
					}).call(this, this.containers[c]));
					this.containers[c].containerCache.over = 0
				}
			}
			if (this._storedCursor) {
				a("body").css("cursor", this._storedCursor)
			}
			if (this._storedOpacity) {
				this.helper.css("opacity", this._storedOpacity)
			}
			if (this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
			}
			this.dragging = false;
			if (this.cancelHelperRemoval) {
				if (!e) {
					this._trigger("beforeStop", d, this._uiHash());
					for (var c = 0; c < f.length; c++) {
						f[c].call(this, d)
					}
					this._trigger("stop", d, this._uiHash())
				}
				return false
			}
			if (!e) {
				this._trigger("beforeStop", d, this._uiHash())
			}
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			if (this.helper[0] != this.currentItem[0]) {
				this.helper.remove()
			}
			this.helper = null;
			if (!e) {
				for (var c = 0; c < f.length; c++) {
					f[c].call(this, d)
				}
				this._trigger("stop", d, this._uiHash())
			}
			this.fromOutside = false;
			return true
		},
		_trigger: function () {
			if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
				this.cancel()
			}
		},
		_uiHash: function (c) {
			var b = c || this;
			return {
				helper: b.helper,
				placeholder: b.placeholder || a([]),
				position: b.position,
				originalPosition: b.originalPosition,
				offset: b.positionAbs,
				item: b.currentItem,
				sender: c ? c.element : null
			}
		}
	});
	a.extend(a.ui.sortable, {version: "1.9m2"})
})(jQuery);
jQuery.effects || (function (g) {
	g.effects = {};
	g.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (l, k) {
		g.fx.step[k] = function (m) {
			if (!m.colorInit) {
				m.start = j(m.elem, k);
				m.end = i(m.end);
				m.colorInit = true
			}
			m.elem.style[k] = "rgb(" + Math.max(Math.min(parseInt((m.pos * (m.end[0] - m.start[0])) + m.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[1] - m.start[1])) + m.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[2] - m.start[2])) + m.start[2], 10), 255), 0) + ")"
		}
	});
	function i(l) {
		var k;
		if (l && l.constructor == Array && l.length == 3) {
			return l
		}
		if (k = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)) {
			return [parseInt(k[1], 10), parseInt(k[2], 10), parseInt(k[3], 10)]
		}
		if (k = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)) {
			return [parseFloat(k[1]) * 2.55, parseFloat(k[2]) * 2.55, parseFloat(k[3]) * 2.55]
		}
		if (k = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)) {
			return [parseInt(k[1], 16), parseInt(k[2], 16), parseInt(k[3], 16)]
		}
		if (k = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)) {
			return [parseInt(k[1] + k[1], 16), parseInt(k[2] + k[2], 16), parseInt(k[3] + k[3], 16)]
		}
		if (k = /rgba\(0, 0, 0, 0\)/.exec(l)) {
			return a.transparent
		}
		return a[g.trim(l).toLowerCase()]
	}

	function j(m, k) {
		var l;
		do {
			l = g.curCSS(m, k);
			if (l != "" && l != "transparent" || g.nodeName(m, "body")) {
				break
			}
			k = "backgroundColor"
		} while (m = m.parentNode);
		return i(l)
	}

	var a = {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 0, 255],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgrey: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [255, 165, 0],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0],
		transparent: [255, 255, 255]
	};
	var e = ["add", "remove", "toggle"], c = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	};

	function f() {
		var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, p = {}, l, m;
		if (n && n.length && n[0] && n[n[0]]) {
			var k = n.length;
			while (k--) {
				l = n[k];
				if (typeof n[l] == "string") {
					m = l.replace(/\-(\w)/g, function (q, r) {
						return r.toUpperCase()
					});
					p[m] = n[l]
				}
			}
		} else {
			for (l in n) {
				if (typeof n[l] === "string") {
					p[l] = n[l]
				}
			}
		}
		return p
	}

	function b(l) {
		var k, m;
		for (k in l) {
			m = l[k];
			if (m == null || g.isFunction(m) || k in c || (/scrollbar/).test(k) || (!(/color/i).test(k) && isNaN(parseFloat(m)))) {
				delete l[k]
			}
		}
		return l
	}

	function h(k, m) {
		var n = {_: 0}, l;
		for (l in m) {
			if (k[l] != m[l]) {
				n[l] = m[l]
			}
		}
		return n
	}

	g.effects.animateClass = function (k, l, n, m) {
		if (g.isFunction(n)) {
			m = n;
			n = null
		}
		return this.each(function () {
			var s = g(this), p = s.attr("style") || " ", u = b(f.call(this)), r, q = s.attr("className");
			g.each(e, function (v, w) {
				if (k[w]) {
					s[w + "Class"](k[w])
				}
			});
			r = b(f.call(this));
			s.attr("className", q);
			s.animate(h(u, r), l, n, function () {
				g.each(e, function (v, w) {
					if (k[w]) {
						s[w + "Class"](k[w])
					}
				});
				if (typeof s.attr("style") == "object") {
					s.attr("style").cssText = "";
					s.attr("style").cssText = p
				} else {
					s.attr("style", p)
				}
				if (m) {
					m.apply(this, arguments)
				}
			})
		})
	};
	g.fn.extend({
		_addClass: g.fn.addClass, addClass: function (l, k, n, m) {
			return k ? g.effects.animateClass.apply(this, [{add: l}, k, n, m]) : this._addClass(l)
		}, _removeClass: g.fn.removeClass, removeClass: function (l, k, n, m) {
			return k ? g.effects.animateClass.apply(this, [{remove: l}, k, n, m]) : this._removeClass(l)
		}, _toggleClass: g.fn.toggleClass, toggleClass: function (m, l, k, p, n) {
			if (typeof l == "boolean" || l === undefined) {
				if (!k) {
					return this._toggleClass(m, l)
				} else {
					return g.effects.animateClass.apply(this, [(l ? {add: m} : {remove: m}), k, p, n])
				}
			} else {
				return g.effects.animateClass.apply(this, [{toggle: m}, l, k, p])
			}
		}, switchClass: function (k, m, l, p, n) {
			return g.effects.animateClass.apply(this, [{add: m, remove: k}, l, p, n])
		}
	});
	g.extend(g.effects, {
		version: "1.9m2", save: function (l, m) {
			for (var k = 0; k < m.length; k++) {
				if (m[k] !== null) {
					l.data("ec.storage." + m[k], l[0].style[m[k]])
				}
			}
		}, restore: function (l, m) {
			for (var k = 0; k < m.length; k++) {
				if (m[k] !== null) {
					l.css(m[k], l.data("ec.storage." + m[k]))
				}
			}
		}, setMode: function (k, l) {
			if (l == "toggle") {
				l = k.is(":hidden") ? "show" : "hide"
			}
			return l
		}, getBaseline: function (l, m) {
			var n, k;
			switch (l[0]) {
				case"top":
					n = 0;
					break;
				case"middle":
					n = 0.5;
					break;
				case"bottom":
					n = 1;
					break;
				default:
					n = l[0] / m.height
			}
			switch (l[1]) {
				case"left":
					k = 0;
					break;
				case"center":
					k = 0.5;
					break;
				case"right":
					k = 1;
					break;
				default:
					k = l[1] / m.width
			}
			return {x: k, y: n}
		}, createWrapper: function (k) {
			if (k.parent().is(".ui-effects-wrapper")) {
				return k.parent()
			}
			var l = {
				width: k.outerWidth(true),
				height: k.outerHeight(true),
				"float": k.css("float")
			}, m = g("<div></div>").addClass("ui-effects-wrapper").css({
				fontSize: "100%",
				background: "transparent",
				border: "none",
				margin: 0,
				padding: 0
			});
			k.wrap(m);
			m = k.parent();
			if (k.css("position") == "static") {
				m.css({position: "relative"});
				k.css({position: "relative"})
			} else {
				g.extend(l, {position: k.css("position"), zIndex: k.css("z-index")});
				g.each(["top", "left", "bottom", "right"], function (n, p) {
					l[p] = k.css(p);
					if (isNaN(parseInt(l[p], 10))) {
						l[p] = "auto"
					}
				});
				k.css({position: "relative", top: 0, left: 0})
			}
			return m.css(l).show()
		}, removeWrapper: function (k) {
			if (k.parent().is(".ui-effects-wrapper")) {
				return k.parent().replaceWith(k)
			}
			return k
		}, setTransition: function (l, n, k, m) {
			m = m || {};
			g.each(n, function (q, p) {
				unit = l.cssUnit(p);
				if (unit[0] > 0) {
					m[p] = unit[0] * k + unit[1]
				}
			});
			return m
		}
	});
	function d(l, k, m, n) {
		if (typeof l == "object") {
			n = k;
			m = null;
			k = l;
			l = k.effect
		}
		if (g.isFunction(k)) {
			n = k;
			m = null;
			k = {}
		}
		if (g.isFunction(m)) {
			n = m;
			m = null
		}
		if (typeof k == "number" || g.fx.speeds[k]) {
			n = m;
			m = k;
			k = {}
		}
		k = k || {};
		m = m || k.duration;
		m = g.fx.off ? 0 : typeof m == "number" ? m : g.fx.speeds[m] || g.fx.speeds._default;
		n = n || k.complete;
		return [l, k, m, n]
	}

	g.fn.extend({
		effect: function (n, m, q, r) {
			var l = d.apply(this, arguments), p = {options: l[1], duration: l[2], callback: l[3]}, k = g.effects[n];
			return k && !g.fx.off ? k.call(this, p) : this
		}, _show: g.fn.show, show: function (l) {
			if (!l || typeof l == "number" || g.fx.speeds[l]) {
				return this._show.apply(this, arguments)
			} else {
				var k = d.apply(this, arguments);
				k[1].mode = "show";
				return this.effect.apply(this, k)
			}
		}, _hide: g.fn.hide, hide: function (l) {
			if (!l || typeof l == "number" || g.fx.speeds[l]) {
				return this._hide.apply(this, arguments)
			} else {
				var k = d.apply(this, arguments);
				k[1].mode = "hide";
				return this.effect.apply(this, k)
			}
		}, __toggle: g.fn.toggle, toggle: function (l) {
			if (!l || typeof l == "number" || g.fx.speeds[l] || typeof l == "boolean" || g.isFunction(l)) {
				return this.__toggle.apply(this, arguments)
			} else {
				var k = d.apply(this, arguments);
				k[1].mode = "toggle";
				return this.effect.apply(this, k)
			}
		}, cssUnit: function (k) {
			var l = this.css(k), m = [];
			g.each(["em", "px", "%", "pt"], function (n, p) {
				if (l.indexOf(p) > 0) {
					m = [parseFloat(l), p]
				}
			});
			return m
		}
	});
	g.easing.jswing = g.easing.swing;
	g.extend(g.easing, {
		def: "easeOutQuad", swing: function (l, m, k, p, n) {
			return g.easing[g.easing.def](l, m, k, p, n)
		}, easeInQuad: function (l, m, k, p, n) {
			return p * (m /= n) * m + k
		}, easeOutQuad: function (l, m, k, p, n) {
			return -p * (m /= n) * (m - 2) + k
		}, easeInOutQuad: function (l, m, k, p, n) {
			if ((m /= n / 2) < 1) {
				return p / 2 * m * m + k
			}
			return -p / 2 * ((--m) * (m - 2) - 1) + k
		}, easeInCubic: function (l, m, k, p, n) {
			return p * (m /= n) * m * m + k
		}, easeOutCubic: function (l, m, k, p, n) {
			return p * ((m = m / n - 1) * m * m + 1) + k
		}, easeInOutCubic: function (l, m, k, p, n) {
			if ((m /= n / 2) < 1) {
				return p / 2 * m * m * m + k
			}
			return p / 2 * ((m -= 2) * m * m + 2) + k
		}, easeInQuart: function (l, m, k, p, n) {
			return p * (m /= n) * m * m * m + k
		}, easeOutQuart: function (l, m, k, p, n) {
			return -p * ((m = m / n - 1) * m * m * m - 1) + k
		}, easeInOutQuart: function (l, m, k, p, n) {
			if ((m /= n / 2) < 1) {
				return p / 2 * m * m * m * m + k
			}
			return -p / 2 * ((m -= 2) * m * m * m - 2) + k
		}, easeInQuint: function (l, m, k, p, n) {
			return p * (m /= n) * m * m * m * m + k
		}, easeOutQuint: function (l, m, k, p, n) {
			return p * ((m = m / n - 1) * m * m * m * m + 1) + k
		}, easeInOutQuint: function (l, m, k, p, n) {
			if ((m /= n / 2) < 1) {
				return p / 2 * m * m * m * m * m + k
			}
			return p / 2 * ((m -= 2) * m * m * m * m + 2) + k
		}, easeInSine: function (l, m, k, p, n) {
			return -p * Math.cos(m / n * (Math.PI / 2)) + p + k
		}, easeOutSine: function (l, m, k, p, n) {
			return p * Math.sin(m / n * (Math.PI / 2)) + k
		}, easeInOutSine: function (l, m, k, p, n) {
			return -p / 2 * (Math.cos(Math.PI * m / n) - 1) + k
		}, easeInExpo: function (l, m, k, p, n) {
			return (m == 0) ? k : p * Math.pow(2, 10 * (m / n - 1)) + k
		}, easeOutExpo: function (l, m, k, p, n) {
			return (m == n) ? k + p : p * (-Math.pow(2, -10 * m / n) + 1) + k
		}, easeInOutExpo: function (l, m, k, p, n) {
			if (m == 0) {
				return k
			}
			if (m == n) {
				return k + p
			}
			if ((m /= n / 2) < 1) {
				return p / 2 * Math.pow(2, 10 * (m - 1)) + k
			}
			return p / 2 * (-Math.pow(2, -10 * --m) + 2) + k
		}, easeInCirc: function (l, m, k, p, n) {
			return -p * (Math.sqrt(1 - (m /= n) * m) - 1) + k
		}, easeOutCirc: function (l, m, k, p, n) {
			return p * Math.sqrt(1 - (m = m / n - 1) * m) + k
		}, easeInOutCirc: function (l, m, k, p, n) {
			if ((m /= n / 2) < 1) {
				return -p / 2 * (Math.sqrt(1 - m * m) - 1) + k
			}
			return p / 2 * (Math.sqrt(1 - (m -= 2) * m) + 1) + k
		}, easeInElastic: function (l, n, k, v, u) {
			var q = 1.70158;
			var r = 0;
			var m = v;
			if (n == 0) {
				return k
			}
			if ((n /= u) == 1) {
				return k + v
			}
			if (!r) {
				r = u * 0.3
			}
			if (m < Math.abs(v)) {
				m = v;
				var q = r / 4
			} else {
				var q = r / (2 * Math.PI) * Math.asin(v / m)
			}
			return -(m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r)) + k
		}, easeOutElastic: function (l, n, k, v, u) {
			var q = 1.70158;
			var r = 0;
			var m = v;
			if (n == 0) {
				return k
			}
			if ((n /= u) == 1) {
				return k + v
			}
			if (!r) {
				r = u * 0.3
			}
			if (m < Math.abs(v)) {
				m = v;
				var q = r / 4
			} else {
				var q = r / (2 * Math.PI) * Math.asin(v / m)
			}
			return m * Math.pow(2, -10 * n) * Math.sin((n * u - q) * (2 * Math.PI) / r) + v + k
		}, easeInOutElastic: function (l, n, k, v, u) {
			var q = 1.70158;
			var r = 0;
			var m = v;
			if (n == 0) {
				return k
			}
			if ((n /= u / 2) == 2) {
				return k + v
			}
			if (!r) {
				r = u * (0.3 * 1.5)
			}
			if (m < Math.abs(v)) {
				m = v;
				var q = r / 4
			} else {
				var q = r / (2 * Math.PI) * Math.asin(v / m)
			}
			if (n < 1) {
				return -0.5 * (m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r)) + k
			}
			return m * Math.pow(2, -10 * (n -= 1)) * Math.sin((n * u - q) * (2 * Math.PI) / r) * 0.5 + v + k
		}, easeInBack: function (l, m, k, q, p, n) {
			if (n == undefined) {
				n = 1.70158
			}
			return q * (m /= p) * m * ((n + 1) * m - n) + k
		}, easeOutBack: function (l, m, k, q, p, n) {
			if (n == undefined) {
				n = 1.70158
			}
			return q * ((m = m / p - 1) * m * ((n + 1) * m + n) + 1) + k
		}, easeInOutBack: function (l, m, k, q, p, n) {
			if (n == undefined) {
				n = 1.70158
			}
			if ((m /= p / 2) < 1) {
				return q / 2 * (m * m * (((n *= (1.525)) + 1) * m - n)) + k
			}
			return q / 2 * ((m -= 2) * m * (((n *= (1.525)) + 1) * m + n) + 2) + k
		}, easeInBounce: function (l, m, k, p, n) {
			return p - g.easing.easeOutBounce(l, n - m, 0, p, n) + k
		}, easeOutBounce: function (l, m, k, p, n) {
			if ((m /= n) < (1 / 2.75)) {
				return p * (7.5625 * m * m) + k
			} else {
				if (m < (2 / 2.75)) {
					return p * (7.5625 * (m -= (1.5 / 2.75)) * m + 0.75) + k
				} else {
					if (m < (2.5 / 2.75)) {
						return p * (7.5625 * (m -= (2.25 / 2.75)) * m + 0.9375) + k
					} else {
						return p * (7.5625 * (m -= (2.625 / 2.75)) * m + 0.984375) + k
					}
				}
			}
		}, easeInOutBounce: function (l, m, k, p, n) {
			if (m < n / 2) {
				return g.easing.easeInBounce(l, m * 2, 0, p, n) * 0.5 + k
			}
			return g.easing.easeOutBounce(l, m * 2 - n, 0, p, n) * 0.5 + p * 0.5 + k
		}
	})
})(jQuery);
(function (a) {
	a.effects.blind = function (b) {
		return this.queue(function () {
			var d = a(this), c = ["position", "top", "left"];
			var h = a.effects.setMode(d, b.options.mode || "hide");
			var g = b.options.direction || "vertical";
			a.effects.save(d, c);
			d.show();
			var j = a.effects.createWrapper(d).css({overflow: "hidden"});
			var e = (g == "vertical") ? "height" : "width";
			var i = (g == "vertical") ? j.height() : j.width();
			if (h == "show") {
				j.css(e, 0)
			}
			var f = {};
			f[e] = h == "show" ? i : 0;
			j.animate(f, b.duration, b.options.easing, function () {
				if (h == "hide") {
					d.hide()
				}
				a.effects.restore(d, c);
				a.effects.removeWrapper(d);
				if (b.callback) {
					b.callback.apply(d[0], arguments)
				}
				d.dequeue()
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.bounce = function (b) {
		return this.queue(function () {
			var e = a(this), l = ["position", "top", "left"];
			var k = a.effects.setMode(e, b.options.mode || "effect");
			var n = b.options.direction || "up";
			var c = b.options.distance || 20;
			var d = b.options.times || 5;
			var g = b.duration || 250;
			if (/show|hide/.test(k)) {
				l.push("opacity")
			}
			a.effects.save(e, l);
			e.show();
			a.effects.createWrapper(e);
			var f = (n == "up" || n == "down") ? "top" : "left";
			var q = (n == "up" || n == "left") ? "pos" : "neg";
			var c = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 3 : e.outerWidth({margin: true}) / 3);
			if (k == "show") {
				e.css("opacity", 0).css(f, q == "pos" ? -c : c)
			}
			if (k == "hide") {
				c = c / (d * 2)
			}
			if (k != "hide") {
				d--
			}
			if (k == "show") {
				var h = {opacity: 1};
				h[f] = (q == "pos" ? "+=" : "-=") + c;
				e.animate(h, g / 2, b.options.easing);
				c = c / 2;
				d--
			}
			for (var j = 0; j < d; j++) {
				var p = {}, m = {};
				p[f] = (q == "pos" ? "-=" : "+=") + c;
				m[f] = (q == "pos" ? "+=" : "-=") + c;
				e.animate(p, g / 2, b.options.easing).animate(m, g / 2, b.options.easing);
				c = (k == "hide") ? c * 2 : c / 2
			}
			if (k == "hide") {
				var h = {opacity: 0};
				h[f] = (q == "pos" ? "-=" : "+=") + c;
				e.animate(h, g / 2, b.options.easing, function () {
					e.hide();
					a.effects.restore(e, l);
					a.effects.removeWrapper(e);
					if (b.callback) {
						b.callback.apply(this, arguments)
					}
				})
			} else {
				var p = {}, m = {};
				p[f] = (q == "pos" ? "-=" : "+=") + c;
				m[f] = (q == "pos" ? "+=" : "-=") + c;
				e.animate(p, g / 2, b.options.easing).animate(m, g / 2, b.options.easing, function () {
					a.effects.restore(e, l);
					a.effects.removeWrapper(e);
					if (b.callback) {
						b.callback.apply(this, arguments)
					}
				})
			}
			e.queue("fx", function () {
				e.dequeue()
			});
			e.dequeue()
		})
	}
})(jQuery);
(function (a) {
	a.effects.clip = function (b) {
		return this.queue(function () {
			var f = a(this), j = ["position", "top", "left", "height", "width"];
			var i = a.effects.setMode(f, b.options.mode || "hide");
			var k = b.options.direction || "vertical";
			a.effects.save(f, j);
			f.show();
			var c = a.effects.createWrapper(f).css({overflow: "hidden"});
			var e = f[0].tagName == "IMG" ? c : f;
			var g = {size: (k == "vertical") ? "height" : "width", position: (k == "vertical") ? "top" : "left"};
			var d = (k == "vertical") ? e.height() : e.width();
			if (i == "show") {
				e.css(g.size, 0);
				e.css(g.position, d / 2)
			}
			var h = {};
			h[g.size] = i == "show" ? d : 0;
			h[g.position] = i == "show" ? 0 : d / 2;
			e.animate(h, {
				queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
					if (i == "hide") {
						f.hide()
					}
					a.effects.restore(f, j);
					a.effects.removeWrapper(f);
					if (b.callback) {
						b.callback.apply(f[0], arguments)
					}
					f.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.drop = function (b) {
		return this.queue(function () {
			var e = a(this), d = ["position", "top", "left", "opacity"];
			var i = a.effects.setMode(e, b.options.mode || "hide");
			var h = b.options.direction || "left";
			a.effects.save(e, d);
			e.show();
			a.effects.createWrapper(e);
			var f = (h == "up" || h == "down") ? "top" : "left";
			var c = (h == "up" || h == "left") ? "pos" : "neg";
			var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) / 2 : e.outerWidth({margin: true}) / 2);
			if (i == "show") {
				e.css("opacity", 0).css(f, c == "pos" ? -j : j)
			}
			var g = {opacity: i == "show" ? 1 : 0};
			g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
			e.animate(g, {
				queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
					if (i == "hide") {
						e.hide()
					}
					a.effects.restore(e, d);
					a.effects.removeWrapper(e);
					if (b.callback) {
						b.callback.apply(this, arguments)
					}
					e.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.explode = function (b) {
		return this.queue(function () {
			var k = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
			var e = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
			b.options.mode = b.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : b.options.mode;
			var h = a(this).show().css("visibility", "hidden");
			var l = h.offset();
			l.top -= parseInt(h.css("marginTop"), 10) || 0;
			l.left -= parseInt(h.css("marginLeft"), 10) || 0;
			var g = h.outerWidth(true);
			var c = h.outerHeight(true);
			for (var f = 0; f < k; f++) {
				for (var d = 0; d < e; d++) {
					h.clone().appendTo("body").wrap("<div></div>").css({
						position: "absolute",
						visibility: "visible",
						left: -d * (g / e),
						top: -f * (c / k)
					}).parent().addClass("ui-effects-explode").css({
						position: "absolute",
						overflow: "hidden",
						width: g / e,
						height: c / k,
						left: l.left + d * (g / e) + (b.options.mode == "show" ? (d - Math.floor(e / 2)) * (g / e) : 0),
						top: l.top + f * (c / k) + (b.options.mode == "show" ? (f - Math.floor(k / 2)) * (c / k) : 0),
						opacity: b.options.mode == "show" ? 0 : 1
					}).animate({
						left: l.left + d * (g / e) + (b.options.mode == "show" ? 0 : (d - Math.floor(e / 2)) * (g / e)),
						top: l.top + f * (c / k) + (b.options.mode == "show" ? 0 : (f - Math.floor(k / 2)) * (c / k)),
						opacity: b.options.mode == "show" ? 1 : 0
					}, b.duration || 500)
				}
			}
			setTimeout(function () {
				b.options.mode == "show" ? h.css({visibility: "visible"}) : h.css({visibility: "visible"}).hide();
				if (b.callback) {
					b.callback.apply(h[0])
				}
				h.dequeue();
				a("div.ui-effects-explode").remove()
			}, b.duration || 500)
		})
	}
})(jQuery);
(function (a) {
	a.effects.fade = function (b) {
		return this.queue(function () {
			var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide");
			c.animate({opacity: d}, {
				queue: false,
				duration: b.duration,
				easing: b.options.easing,
				complete: function () {
					(b.callback && b.callback.apply(this, arguments));
					c.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.fold = function (b) {
		return this.queue(function () {
			var e = a(this), k = ["position", "top", "left"];
			var h = a.effects.setMode(e, b.options.mode || "hide");
			var p = b.options.size || 15;
			var n = !(!b.options.horizFirst);
			var g = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
			a.effects.save(e, k);
			e.show();
			var d = a.effects.createWrapper(e).css({overflow: "hidden"});
			var i = ((h == "show") != n);
			var f = i ? ["width", "height"] : ["height", "width"];
			var c = i ? [d.width(), d.height()] : [d.height(), d.width()];
			var j = /([0-9]+)%/.exec(p);
			if (j) {
				p = parseInt(j[1], 10) / 100 * c[h == "hide" ? 0 : 1]
			}
			if (h == "show") {
				d.css(n ? {height: 0, width: p} : {height: p, width: 0})
			}
			var m = {}, l = {};
			m[f[0]] = h == "show" ? c[0] : p;
			l[f[1]] = h == "show" ? c[1] : 0;
			d.animate(m, g, b.options.easing).animate(l, g, b.options.easing, function () {
				if (h == "hide") {
					e.hide()
				}
				a.effects.restore(e, k);
				a.effects.removeWrapper(e);
				if (b.callback) {
					b.callback.apply(e[0], arguments)
				}
				e.dequeue()
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.highlight = function (b) {
		return this.queue(function () {
			var d = a(this), c = ["backgroundImage", "backgroundColor", "opacity"], f = a.effects.setMode(d, b.options.mode || "show"), e = {backgroundColor: d.css("backgroundColor")};
			if (f == "hide") {
				e.opacity = 0
			}
			a.effects.save(d, c);
			d.show().css({
				backgroundImage: "none",
				backgroundColor: b.options.color || "#ffff99"
			}).animate(e, {
				queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
					(f == "hide" && d.hide());
					a.effects.restore(d, c);
					(f == "show" && !a.support.opacity && this.style.removeAttribute("filter"));
					(b.callback && b.callback.apply(this, arguments));
					d.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.pulsate = function (b) {
		return this.queue(function () {
			var d = a(this), e = a.effects.setMode(d, b.options.mode || "show");
			times = ((b.options.times || 5) * 2) - 1;
			duration = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, isVisible = d.is(":visible"), animateTo = 0;
			if (!isVisible) {
				d.css("opacity", 0).show();
				animateTo = 1
			}
			if ((e == "hide" && isVisible) || (e == "show" && !isVisible)) {
				times--
			}
			for (var c = 0; c < times; c++) {
				d.animate({opacity: animateTo}, duration, b.options.easing);
				animateTo = (animateTo + 1) % 2
			}
			d.animate({opacity: animateTo}, duration, b.options.easing, function () {
				if (animateTo == 0) {
					d.hide()
				}
				(b.callback && b.callback.apply(this, arguments))
			});
			d.queue("fx", function () {
				d.dequeue()
			}).dequeue()
		})
	}
})(jQuery);
(function (a) {
	a.effects.puff = function (b) {
		return this.queue(function () {
			var f = a(this), g = a.effects.setMode(f, b.options.mode || "hide"), e = parseInt(b.options.percent, 10) || 150, d = e / 100, c = {
				height: f.height(),
				width: f.width()
			};
			a.extend(b.options, {
				fade: true,
				mode: g,
				percent: g == "hide" ? e : 100,
				from: g == "hide" ? c : {height: c.height * d, width: c.width * d}
			});
			f.effect("scale", b.options, b.duration, b.callback);
			f.dequeue()
		})
	};
	a.effects.scale = function (b) {
		return this.queue(function () {
			var g = a(this);
			var d = a.extend(true, {}, b.options);
			var j = a.effects.setMode(g, b.options.mode || "effect");
			var h = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : (j == "hide" ? 0 : 100));
			var i = b.options.direction || "both";
			var c = b.options.origin;
			if (j != "effect") {
				d.origin = c || ["middle", "center"];
				d.restore = true
			}
			var f = {height: g.height(), width: g.width()};
			g.from = b.options.from || (j == "show" ? {height: 0, width: 0} : f);
			var e = {y: i != "horizontal" ? (h / 100) : 1, x: i != "vertical" ? (h / 100) : 1};
			g.to = {height: f.height * e.y, width: f.width * e.x};
			if (b.options.fade) {
				if (j == "show") {
					g.from.opacity = 0;
					g.to.opacity = 1
				}
				if (j == "hide") {
					g.from.opacity = 1;
					g.to.opacity = 0
				}
			}
			d.from = g.from;
			d.to = g.to;
			d.mode = j;
			g.effect("size", d, b.duration, b.callback);
			g.dequeue()
		})
	};
	a.effects.size = function (b) {
		return this.queue(function () {
			var c = a(this), n = ["position", "top", "left", "width", "height", "overflow", "opacity"];
			var m = ["position", "top", "left", "overflow", "opacity"];
			var j = ["width", "height", "overflow"];
			var q = ["fontSize"];
			var k = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
			var f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
			var g = a.effects.setMode(c, b.options.mode || "effect");
			var i = b.options.restore || false;
			var e = b.options.scale || "both";
			var p = b.options.origin;
			var d = {height: c.height(), width: c.width()};
			c.from = b.options.from || d;
			c.to = b.options.to || d;
			if (p) {
				var h = a.effects.getBaseline(p, d);
				c.from.top = (d.height - c.from.height) * h.y;
				c.from.left = (d.width - c.from.width) * h.x;
				c.to.top = (d.height - c.to.height) * h.y;
				c.to.left = (d.width - c.to.width) * h.x
			}
			var l = {
				from: {y: c.from.height / d.height, x: c.from.width / d.width},
				to: {y: c.to.height / d.height, x: c.to.width / d.width}
			};
			if (e == "box" || e == "both") {
				if (l.from.y != l.to.y) {
					n = n.concat(k);
					c.from = a.effects.setTransition(c, k, l.from.y, c.from);
					c.to = a.effects.setTransition(c, k, l.to.y, c.to)
				}
				if (l.from.x != l.to.x) {
					n = n.concat(f);
					c.from = a.effects.setTransition(c, f, l.from.x, c.from);
					c.to = a.effects.setTransition(c, f, l.to.x, c.to)
				}
			}
			if (e == "content" || e == "both") {
				if (l.from.y != l.to.y) {
					n = n.concat(q);
					c.from = a.effects.setTransition(c, q, l.from.y, c.from);
					c.to = a.effects.setTransition(c, q, l.to.y, c.to)
				}
			}
			a.effects.save(c, i ? n : m);
			c.show();
			a.effects.createWrapper(c);
			c.css("overflow", "hidden").css(c.from);
			if (e == "content" || e == "both") {
				k = k.concat(["marginTop", "marginBottom"]).concat(q);
				f = f.concat(["marginLeft", "marginRight"]);
				j = n.concat(k).concat(f);
				c.find("*[width]").each(function () {
					child = a(this);
					if (i) {
						a.effects.save(child, j)
					}
					var r = {height: child.height(), width: child.width()};
					child.from = {height: r.height * l.from.y, width: r.width * l.from.x};
					child.to = {height: r.height * l.to.y, width: r.width * l.to.x};
					if (l.from.y != l.to.y) {
						child.from = a.effects.setTransition(child, k, l.from.y, child.from);
						child.to = a.effects.setTransition(child, k, l.to.y, child.to)
					}
					if (l.from.x != l.to.x) {
						child.from = a.effects.setTransition(child, f, l.from.x, child.from);
						child.to = a.effects.setTransition(child, f, l.to.x, child.to)
					}
					child.css(child.from);
					child.animate(child.to, b.duration, b.options.easing, function () {
						if (i) {
							a.effects.restore(child, j)
						}
					})
				})
			}
			c.animate(c.to, {
				queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
					if (c.to.opacity === 0) {
						c.css("opacity", c.from.opacity)
					}
					if (g == "hide") {
						c.hide()
					}
					a.effects.restore(c, i ? n : m);
					a.effects.removeWrapper(c);
					if (b.callback) {
						b.callback.apply(this, arguments)
					}
					c.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.shake = function (b) {
		return this.queue(function () {
			var e = a(this), l = ["position", "top", "left"];
			var k = a.effects.setMode(e, b.options.mode || "effect");
			var n = b.options.direction || "left";
			var c = b.options.distance || 20;
			var d = b.options.times || 3;
			var g = b.duration || b.options.duration || 140;
			a.effects.save(e, l);
			e.show();
			a.effects.createWrapper(e);
			var f = (n == "up" || n == "down") ? "top" : "left";
			var q = (n == "up" || n == "left") ? "pos" : "neg";
			var h = {}, p = {}, m = {};
			h[f] = (q == "pos" ? "-=" : "+=") + c;
			p[f] = (q == "pos" ? "+=" : "-=") + c * 2;
			m[f] = (q == "pos" ? "-=" : "+=") + c * 2;
			e.animate(h, g, b.options.easing);
			for (var j = 1; j < d; j++) {
				e.animate(p, g, b.options.easing).animate(m, g, b.options.easing)
			}
			e.animate(p, g, b.options.easing).animate(h, g / 2, b.options.easing, function () {
				a.effects.restore(e, l);
				a.effects.removeWrapper(e);
				if (b.callback) {
					b.callback.apply(this, arguments)
				}
			});
			e.queue("fx", function () {
				e.dequeue()
			});
			e.dequeue()
		})
	}
})(jQuery);
(function (a) {
	a.effects.slide = function (b) {
		return this.queue(function () {
			var e = a(this), d = ["position", "top", "left"];
			var i = a.effects.setMode(e, b.options.mode || "show");
			var h = b.options.direction || "left";
			a.effects.save(e, d);
			e.show();
			a.effects.createWrapper(e).css({overflow: "hidden"});
			var f = (h == "up" || h == "down") ? "top" : "left";
			var c = (h == "up" || h == "left") ? "pos" : "neg";
			var j = b.options.distance || (f == "top" ? e.outerHeight({margin: true}) : e.outerWidth({margin: true}));
			if (i == "show") {
				e.css(f, c == "pos" ? -j : j)
			}
			var g = {};
			g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
			e.animate(g, {
				queue: false, duration: b.duration, easing: b.options.easing, complete: function () {
					if (i == "hide") {
						e.hide()
					}
					a.effects.restore(e, d);
					a.effects.removeWrapper(e);
					if (b.callback) {
						b.callback.apply(this, arguments)
					}
					e.dequeue()
				}
			})
		})
	}
})(jQuery);
(function (a) {
	a.effects.transfer = function (b) {
		return this.queue(function () {
			var f = a(this), h = a(b.options.to), e = h.offset(), g = {
				top: e.top,
				left: e.left,
				height: h.innerHeight(),
				width: h.innerWidth()
			}, d = f.offset(), c = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({
				top: d.top,
				left: d.left,
				height: f.innerHeight(),
				width: f.innerWidth(),
				position: "absolute"
			}).animate(g, b.duration, b.options.easing, function () {
				c.remove();
				(b.callback && b.callback.apply(f[0], arguments));
				f.dequeue()
			})
		})
	}
})(jQuery);
(function (a) {
	a.widget("ui.accordion", {
		options: {
			active: 0,
			animated: "slide",
			autoHeight: true,
			clearStyle: false,
			collapsible: false,
			event: "click",
			fillSpace: false,
			header: "> li > :first-child,> :not(li):even",
			icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
			navigation: false,
			navigationFilter: function () {
				return this.href.toLowerCase() == location.href.toLowerCase()
			}
		}, _create: function () {
			var d = this.options, b = this;
			this.running = 0;
			this.element.addClass("ui-accordion ui-widget ui-helper-reset");
			this.element.children("li").addClass("ui-accordion-li-fix");
			this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
				a(this).addClass("ui-state-hover")
			}).bind("mouseleave.accordion", function () {
				a(this).removeClass("ui-state-hover")
			}).bind("focus.accordion", function () {
				a(this).addClass("ui-state-focus")
			}).bind("blur.accordion", function () {
				a(this).removeClass("ui-state-focus")
			});
			this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
			if (d.navigation) {
				var c = this.element.find("a").filter(d.navigationFilter);
				if (c.length) {
					var e = c.closest(".ui-accordion-header");
					if (e.length) {
						this.active = e
					} else {
						this.active = c.closest(".ui-accordion-content").prev()
					}
				}
			}
			this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
			this.active.next().addClass("ui-accordion-content-active");
			this._createIcons();
			this.resize();
			this.element.attr("role", "tablist");
			this.headers.attr("role", "tab").bind("keydown", function (f) {
				return b._keydown(f)
			}).next().attr("role", "tabpanel");
			this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
			if (!this.active.length) {
				this.headers.eq(0).attr("tabIndex", "0")
			} else {
				this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
			}
			if (!a.browser.safari) {
				this.headers.find("a").attr("tabIndex", "-1")
			}
			if (d.event) {
				this.headers.bind((d.event) + ".accordion", function (f) {
					b._clickHandler.call(b, f, this);
					f.preventDefault()
				})
			}
		}, _createIcons: function () {
			var b = this.options;
			if (b.icons) {
				a("<span/>").addClass("ui-icon " + b.icons.header).prependTo(this.headers);
				this.active.find(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);
				this.element.addClass("ui-accordion-icons")
			}
		}, _destroyIcons: function () {
			this.headers.children(".ui-icon").remove();
			this.element.removeClass("ui-accordion-icons")
		}, destroy: function () {
			var c = this.options;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
			this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
			this.headers.find("a").removeAttr("tabIndex");
			this._destroyIcons();
			var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
			if (c.autoHeight || c.fillHeight) {
				b.css("height", "")
			}
			return this
		}, _setOption: function (b, c) {
			this._superApply("_setOption", arguments);
			if (b == "active") {
				this.activate(c)
			}
			if (b == "icons") {
				this._destroyIcons();
				if (c) {
					this._createIcons()
				}
			}
		}, _keydown: function (e) {
			var g = this.options, f = a.ui.keyCode;
			if (g.disabled || e.altKey || e.ctrlKey) {
				return
			}
			var d = this.headers.length;
			var b = this.headers.index(e.target);
			var c = false;
			switch (e.keyCode) {
				case f.RIGHT:
				case f.DOWN:
					c = this.headers[(b + 1) % d];
					break;
				case f.LEFT:
				case f.UP:
					c = this.headers[(b - 1 + d) % d];
					break;
				case f.SPACE:
				case f.ENTER:
					this._clickHandler({target: e.target}, e.target);
					e.preventDefault()
			}
			if (c) {
				a(e.target).attr("tabIndex", "-1");
				a(c).attr("tabIndex", "0");
				c.focus();
				return false
			}
			return true
		}, resize: function () {
			var d = this.options, c;
			if (d.fillSpace) {
				if (a.browser.msie) {
					var b = this.element.parent().css("overflow");
					this.element.parent().css("overflow", "hidden")
				}
				c = this.element.parent().height();
				if (a.browser.msie) {
					this.element.parent().css("overflow", b)
				}
				this.headers.each(function () {
					c -= a(this).outerHeight(true)
				});
				this.headers.next().each(function () {
					a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
				}).css("overflow", "auto")
			} else {
				if (d.autoHeight) {
					c = 0;
					this.headers.next().each(function () {
						c = Math.max(c, a(this).height())
					}).height(c)
				}
			}
			return this
		}, activate: function (b) {
			this.options.active = b;
			var c = this._findActive(b)[0];
			this._clickHandler({target: c}, c);
			return this
		}, _findActive: function (b) {
			return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
		}, _clickHandler: function (b, f) {
			var d = this.options;
			if (d.disabled) {
				return
			}
			if (!b.target) {
				if (!d.collapsible) {
					return
				}
				this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
				this.active.next().addClass("ui-accordion-content-active");
				var h = this.active.next(), e = {
					options: d,
					newHeader: a([]),
					oldHeader: d.active,
					newContent: a([]),
					oldContent: h
				}, c = (this.active = a([]));
				this._toggle(c, h, e);
				return
			}
			var g = a(b.currentTarget || f);
			var i = g[0] == this.active[0];
			d.active = d.collapsible && i ? false : a(".ui-accordion-header", this.element).index(g);
			if (this.running || (!d.collapsible && i)) {
				return
			}
			this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
			if (!i) {
				g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
				g.next().addClass("ui-accordion-content-active")
			}
			var c = g.next(), h = this.active.next(), e = {
				options: d,
				newHeader: i && d.collapsible ? a([]) : g,
				oldHeader: this.active,
				newContent: i && d.collapsible ? a([]) : c,
				oldContent: h
			}, j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
			this.active = i ? a([]) : g;
			this._toggle(c, h, e, i, j);
			return
		}, _toggle: function (b, i, g, j, k) {
			var d = this.options, m = this;
			this.toShow = b;
			this.toHide = i;
			this.data = g;
			var c = function () {
				if (!m) {
					return
				}
				return m._completed.apply(m, arguments)
			};
			this._trigger("changestart", null, this.data);
			this.running = i.size() === 0 ? b.size() : i.size();
			if (d.animated) {
				var f = {};
				if (d.collapsible && j) {
					f = {toShow: a([]), toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
				} else {
					f = {toShow: b, toHide: i, complete: c, down: k, autoHeight: d.autoHeight || d.fillSpace}
				}
				if (!d.proxied) {
					d.proxied = d.animated
				}
				if (!d.proxiedDuration) {
					d.proxiedDuration = d.duration
				}
				d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
				d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
				var l = a.ui.accordion.animations, e = d.duration, h = d.animated;
				if (h && !l[h] && !a.easing[h]) {
					h = "slide"
				}
				if (!l[h]) {
					l[h] = function (n) {
						this.slide(n, {easing: h, duration: e || 700})
					}
				}
				l[h](f)
			} else {
				if (d.collapsible && j) {
					b.toggle()
				} else {
					i.hide();
					b.show()
				}
				c(true)
			}
			i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
			b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
		}, _completed: function (b) {
			var c = this.options;
			this.running = b ? 0 : --this.running;
			if (this.running) {
				return
			}
			if (c.clearStyle) {
				this.toShow.add(this.toHide).css({height: "", overflow: ""})
			}
			this.toHide.removeClass("ui-accordion-content-active");
			this._trigger("change", null, this.data)
		}
	});
	a.extend(a.ui.accordion, {
		version: "1.9m2", animations: {
			slide: function (j, h) {
				j = a.extend({easing: "swing", duration: 300}, j, h);
				if (!j.toHide.size()) {
					j.toShow.animate({height: "show"}, j);
					return
				}
				if (!j.toShow.size()) {
					j.toHide.animate({height: "hide"}, j);
					return
				}
				var c = j.toShow.css("overflow"), g = 0, d = {}, f = {}, e = ["height", "paddingTop", "paddingBottom"], b;
				var i = j.toShow;
				b = i[0].style.width;
				i.width(parseInt(i.parent().width(), 10) - parseInt(i.css("paddingLeft"), 10) - parseInt(i.css("paddingRight"), 10) - (parseInt(i.css("borderLeftWidth"), 10) || 0) - (parseInt(i.css("borderRightWidth"), 10) || 0));
				a.each(e, function (k, m) {
					f[m] = "hide";
					var l = ("" + a.css(j.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
					d[m] = {value: l[1], unit: l[2] || "px"}
				});
				j.toShow.css({height: 0, overflow: "hidden"}).show();
				j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f, {
					step: function (k, l) {
						if (l.prop == "height") {
							g = (l.end - l.start === 0) ? 0 : (l.now - l.start) / (l.end - l.start)
						}
						j.toShow[0].style[l.prop] = (g * d[l.prop].value) + d[l.prop].unit
					}, duration: j.duration, easing: j.easing, complete: function () {
						if (!j.autoHeight) {
							j.toShow.css("height", "")
						}
						j.toShow.css("width", b);
						j.toShow.css({overflow: c});
						j.complete()
					}
				})
			}, bounceslide: function (b) {
				this.slide(b, {easing: b.down ? "easeOutBounce" : "swing", duration: b.down ? 1000 : 200})
			}
		}
	})
})(jQuery);
(function (a) {
	a.widget("ui.autocomplete", {
		options: {minLength: 1, delay: 300}, _create: function () {
			var b = this, c = this.element[0].ownerDocument;
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			}).bind("keydown.autocomplete", function (d) {
				var e = a.ui.keyCode;
				switch (d.keyCode) {
					case e.PAGE_UP:
						b._move("previousPage", d);
						break;
					case e.PAGE_DOWN:
						b._move("nextPage", d);
						break;
					case e.UP:
						b._move("previous", d);
						d.preventDefault();
						break;
					case e.DOWN:
						b._move("next", d);
						d.preventDefault();
						break;
					case e.ENTER:
					case e.NUMPAD_ENTER:
						if (b.menu.active) {
							d.preventDefault()
						}
					case e.TAB:
						if (!b.menu.active) {
							return
						}
						b.menu.select(d);
						break;
					case e.ESCAPE:
						b.element.val(b.term);
						b.close(d);
						break;
					case e.LEFT:
					case e.RIGHT:
					case e.SHIFT:
					case e.CONTROL:
					case e.ALT:
					case e.COMMAND:
					case e.COMMAND_RIGHT:
					case e.INSERT:
					case e.CAPS_LOCK:
					case e.END:
					case e.HOME:
						break;
					default:
						clearTimeout(b.searching);
						b.searching = setTimeout(function () {
							b.search(null, d)
						}, b.options.delay);
						break
				}
			}).bind("focus.autocomplete", function () {
				b.selectedItem = null;
				b.previous = b.element.val()
			}).bind("blur.autocomplete", function (d) {
				clearTimeout(b.searching);
				b.closing = setTimeout(function () {
					b.close(d);
					b._change(d)
				}, 150)
			});
			this._initSource();
			this.response = function () {
				return b._response.apply(b, arguments)
			};
			this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo("body", c).mousedown(function () {
				setTimeout(function () {
					clearTimeout(b.closing)
				}, 13)
			}).menu({
				input: a(), focus: function (e, f) {
					var d = f.item.data("item.autocomplete");
					if (false !== b._trigger("focus", null, {item: d})) {
						if (/^key/.test(e.originalEvent.type)) {
							b.element.val(d.value)
						}
					}
				}, select: function (f, g) {
					var e = g.item.data("item.autocomplete");
					if (false !== b._trigger("select", f, {item: e})) {
						b.element.val(e.value)
					}
					b.close(f);
					var d = b.previous;
					if (b.element[0] !== c.activeElement) {
						b.element.focus();
						b.previous = d
					}
					b.selectedItem = e
				}, blur: function (d, e) {
					if (b.menu.element.is(":visible")) {
						b.element.val(b.term)
					}
				}
			}).zIndex(this.element.zIndex() + 1).css({top: 0, left: 0}).hide().data("menu");
			if (a.fn.bgiframe) {
				this.menu.element.bgiframe()
			}
		}, destroy: function () {
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
			this.menu.element.remove();
			this._super("destroy")
		}, _setOption: function (b) {
			this._superApply("_setOption", arguments);
			if (b === "source") {
				this._initSource()
			}
		}, _initSource: function () {
			var c, b;
			if (a.isArray(this.options.source)) {
				c = this.options.source;
				this.source = function (e, d) {
					d(a.ui.autocomplete.filter(c, e.term))
				}
			} else {
				if (typeof this.options.source === "string") {
					b = this.options.source;
					this.source = function (e, d) {
						a.getJSON(b, e, d)
					}
				} else {
					this.source = this.options.source
				}
			}
		}, search: function (c, b) {
			c = c != null ? c : this.element.val();
			if (c.length < this.options.minLength) {
				return this.close(b)
			}
			clearTimeout(this.closing);
			if (this._trigger("search") === false) {
				return
			}
			return this._search(c)
		}, _search: function (b) {
			this.term = this.element.addClass("ui-autocomplete-loading").val();
			this.source({term: b}, this.response)
		}, _response: function (b) {
			if (b.length) {
				b = this._normalize(b);
				this._suggest(b);
				this._trigger("open")
			} else {
				this.close()
			}
			this.element.removeClass("ui-autocomplete-loading")
		}, close: function (b) {
			clearTimeout(this.closing);
			if (this.menu.element.is(":visible")) {
				this._trigger("close", b);
				this.menu.element.hide();
				this.menu.deactivate()
			}
		}, _change: function (b) {
			if (this.previous !== this.element.val()) {
				this._trigger("change", b, {item: this.selectedItem})
			}
		}, _normalize: function (b) {
			if (b.length && b[0].label && b[0].value) {
				return b
			}
			return a.map(b, function (c) {
				if (typeof c === "string") {
					return {label: c, value: c}
				}
				return a.extend({label: c.label || c.value, value: c.value || c.label}, c)
			})
		}, _suggest: function (b) {
			var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1), d, e;
			this._renderMenu(c, b);
			this.menu.deactivate();
			this.menu.refresh();
			this.menu.element.show().position({my: "left top", at: "left bottom", of: this.element, collision: "none"});
			d = c.width("").width();
			e = this.element.width();
			c.width(Math.max(d, e))
		}, _renderMenu: function (d, c) {
			var b = this;
			a.each(c, function (e, f) {
				b._renderItem(d, f)
			})
		}, _renderItem: function (b, c) {
			return a("<li></li>").data("item.autocomplete", c).append("<a>" + c.label + "</a>").appendTo(b)
		}, _move: function (c, b) {
			if (!this.menu.element.is(":visible")) {
				this.search(null, b);
				return
			}
			if (this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
				this.element.val(this.term);
				this.menu.deactivate();
				return
			}
			this.menu[c](b)
		}, widget: function () {
			return this.menu.element
		}
	});
	a.extend(a.ui.autocomplete, {
		escapeRegex: function (b) {
			return b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1")
		}, filter: function (d, b) {
			var c = new RegExp(a.ui.autocomplete.escapeRegex(b), "i");
			return a.grep(d, function (e) {
				return c.test(e.label || e.value || e)
			})
		}
	})
}(jQuery));
(function (e) {
	var c, b = "ui-button ui-widget ui-state-default ui-corner-all", g = "ui-state-hover ui-state-active ", f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", d = function (h) {
		e(":ui-button", h.target.form).each(function () {
			var i = e(this).data("button");
			setTimeout(function () {
				i.refresh()
			}, 1)
		})
	}, a = function (i) {
		var h = i.name, j = i.form, k = e([]);
		if (h) {
			if (j) {
				k = e(j).find("[name='" + h + "']")
			} else {
				k = e("[name='" + h + "']", i.ownerDocument).filter(function () {
					return !this.form
				})
			}
		}
		return k
	};
	e.widget("ui.button", {
		options: {text: true, label: null, icons: {primary: null, secondary: null}},
		_create: function () {
			this.element.closest("form").unbind("reset.button").bind("reset.button", d);
			this._determineButtonType();
			this.hasTitle = !!this.buttonElement.attr("title");
			var h = this, j = this.options, k = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (!k ? " ui-state-active" : ""), i = "ui-state-focus";
			if (j.label === null) {
				j.label = this.buttonElement.html()
			}
			if (this.element.is(":disabled")) {
				j.disabled = true
			}
			this.buttonElement.addClass(b).attr("role", "button").bind("mouseenter.button", function () {
				if (j.disabled) {
					return
				}
				e(this).addClass("ui-state-hover");
				if (this === c) {
					e(this).addClass("ui-state-active")
				}
			}).bind("mouseleave.button", function () {
				if (j.disabled) {
					return
				}
				e(this).removeClass(l)
			}).bind("focus.button", function () {
				e(this).addClass(i)
			}).bind("blur.button", function () {
				e(this).removeClass(i)
			});
			if (k) {
				this.element.bind("change.button", function () {
					h.refresh()
				})
			}
			if (this.type === "checkbox") {
				this.buttonElement.bind("click.button", function () {
					if (j.disabled) {
						return false
					}
					e(this).toggleClass("ui-state-active");
					h.buttonElement.attr("aria-pressed", h.element[0].checked)
				})
			} else {
				if (this.type === "radio") {
					this.buttonElement.bind("click.button", function () {
						if (j.disabled) {
							return false
						}
						e(this).addClass("ui-state-active");
						h.buttonElement.attr("aria-pressed", true);
						var m = h.element[0];
						a(m).not(m).map(function () {
							return e(this).button("widget")[0]
						}).removeClass("ui-state-active").attr("aria-pressed", false)
					})
				} else {
					this.buttonElement.bind("mousedown.button", function () {
						if (j.disabled) {
							return false
						}
						e(this).addClass("ui-state-active");
						c = this;
						e(document).one("mouseup", function () {
							c = null
						})
					}).bind("mouseup.button", function () {
						if (j.disabled) {
							return false
						}
						e(this).removeClass("ui-state-active")
					}).bind("keydown.button", function (m) {
						if (j.disabled) {
							return false
						}
						if (m.keyCode == e.ui.keyCode.SPACE || m.keyCode == e.ui.keyCode.ENTER) {
							e(this).addClass("ui-state-active")
						}
					}).bind("keyup.button", function () {
						e(this).removeClass("ui-state-active")
					});
					if (this.buttonElement.is("a")) {
						this.buttonElement.keyup(function (m) {
							if (m.keyCode === e.ui.keyCode.SPACE) {
								e(this).click()
							}
						})
					}
				}
			}
			this._setOption("disabled", j.disabled)
		},
		_determineButtonType: function () {
			if (this.element.is(":checkbox")) {
				this.type = "checkbox"
			} else {
				if (this.element.is(":radio")) {
					this.type = "radio"
				} else {
					if (this.element.is("input")) {
						this.type = "input"
					} else {
						this.type = "button"
					}
				}
			}
			if (this.type === "checkbox" || this.type === "radio") {
				this.buttonElement = this.element.parents().last().find("[for=" + this.element.attr("id") + "]");
				this.element.addClass("ui-helper-hidden-accessible");
				var h = this.element.is(":checked");
				if (h) {
					this.buttonElement.addClass("ui-state-active")
				}
				this.buttonElement.attr("aria-pressed", h)
			} else {
				this.buttonElement = this.element
			}
		},
		widget: function () {
			return this.buttonElement
		},
		destroy: function () {
			this.element.removeClass("ui-helper-hidden-accessible");
			this.buttonElement.removeClass(b + " " + g + " " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
			if (!this.hasTitle) {
				this.buttonElement.removeAttr("title")
			}
			this._super("destroy")
		},
		_setOption: function (h, i) {
			this._superApply("_setOption", arguments);
			if (h === "disabled") {
				if (i) {
					this.element.attr("disabled", true)
				} else {
					this.element.removeAttr("disabled")
				}
			}
			this._resetButton()
		},
		refresh: function () {
			var h = this.element.is(":disabled");
			if (h !== this.options.disabled) {
				this._setOption("disabled", h)
			}
			if (this.type === "radio") {
				a(this.element[0]).each(function () {
					if (e(this).is(":checked")) {
						e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true)
					} else {
						e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
					}
				})
			} else {
				if (this.type === "checkbox") {
					if (this.element.is(":checked")) {
						this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true)
					} else {
						this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
					}
				}
			}
		},
		_resetButton: function () {
			if (this.type === "input") {
				if (this.options.label) {
					this.element.val(this.options.label)
				}
				return
			}
			var k = this.buttonElement.removeClass(f), j = e("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(k.empty()).text(), i = this.options.icons, h = i.primary && i.secondary;
			if (i.primary || i.secondary) {
				k.addClass("ui-button-text-icon" + (h ? "s" : (i.primary ? "-primary" : "-secondary")));
				if (i.primary) {
					k.prepend("<span class='ui-button-icon-primary ui-icon " + i.primary + "'></span>")
				}
				if (i.secondary) {
					k.append("<span class='ui-button-icon-secondary ui-icon " + i.secondary + "'></span>")
				}
				if (!this.options.text) {
					k.addClass(h ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
					if (!this.hasTitle) {
						k.attr("title", j)
					}
				}
			} else {
				k.addClass("ui-button-text-only")
			}
		}
	});
	e.widget("ui.buttonset", {
		_create: function () {
			this.element.addClass("ui-buttonset");
			this._init()
		}, _init: function () {
			this.refresh()
		}, _setOption: function (h, i) {
			if (h === "disabled") {
				this.buttons.button("option", h, i)
			}
			this._superApply("_setOption", arguments)
		}, refresh: function () {
			this.buttons = this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
		}, destroy: function () {
			this.element.removeClass("ui-buttonset");
			this.buttons.map(function () {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
			this._super("destroy")
		}
	})
}(jQuery));
(function ($) {
	$.extend($.ui, {datepicker: {version: "1.9m2"}});
	var PROP_NAME = "datepicker";
	var dpuuid = new Date().getTime();

	function Datepicker() {
		this.debug = false;
		this._curInst = null;
		this._keyEvent = false;
		this._disabledInputs = [];
		this._datepickerShowing = false;
		this._inDialog = false;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ""
		};
		this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: false,
			hideIfNoPrevNext: false,
			navigationAsDateFormat: false,
			gotoCurrent: false,
			changeMonth: false,
			changeYear: false,
			yearRange: "c-10:c+10",
			showOtherMonths: false,
			selectOtherMonths: false,
			showWeek: false,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: true,
			showButtonPanel: false,
			autoSize: false
		};
		$.extend(this._defaults, this.regional[""]);
		this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
	}

	$.extend(Datepicker.prototype, {
		markerClassName: "hasDatepicker",
		log: function () {
			if (this.debug) {
				console.log.apply("", arguments)
			}
		},
		_widgetDatepicker: function () {
			return this.dpDiv
		},
		setDefaults: function (settings) {
			extendRemove(this._defaults, settings || {});
			return this
		},
		_attachDatepicker: function (target, settings) {
			var inlineSettings = null;
			for (var attrName in this._defaults) {
				var attrValue = target.getAttribute("date:" + attrName);
				if (attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue)
					} catch (err) {
						inlineSettings[attrName] = attrValue
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == "div" || nodeName == "span");
			if (!target.id) {
				this.uuid += 1;
				target.id = "dp" + this.uuid
			}
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if (nodeName == "input") {
				this._connectDatepicker(target, inst)
			} else {
				if (inline) {
					this._inlineDatepicker(target, inst)
				}
			}
		},
		_newInst: function (target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1");
			return {
				id: id,
				input: target,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: inline,
				dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
			}
		},
		_connectDatepicker: function (target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName)) {
				return
			}
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (event, key, value) {
				inst.settings[key] = value
			}).bind("getData.datepicker", function (event, key) {
				return this._get(inst, key)
			});
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst)
		},
		_attachments: function (input, inst) {
			var appendText = this._get(inst, "appendText");
			var isRTL = this._get(inst, "isRTL");
			if (inst.append) {
				inst.append.remove()
			}
			if (appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
				input[isRTL ? "before" : "after"](inst.append)
			}
			input.unbind("focus", this._showDatepicker);
			if (inst.trigger) {
				inst.trigger.remove()
			}
			var showOn = this._get(inst, "showOn");
			if (showOn == "focus" || showOn == "both") {
				input.focus(this._showDatepicker)
			}
			if (showOn == "button" || showOn == "both") {
				var buttonText = this._get(inst, "buttonText");
				var buttonImage = this._get(inst, "buttonImage");
				inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
					src: buttonImage,
					alt: buttonText,
					title: buttonText
				}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
					src: buttonImage,
					alt: buttonText,
					title: buttonText
				})));
				input[isRTL ? "before" : "after"](inst.trigger);
				inst.trigger.click(function () {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
						$.datepicker._hideDatepicker()
					} else {
						$.datepicker._showDatepicker(input[0])
					}
					return false
				})
			}
		},
		_autoSize: function (inst) {
			if (this._get(inst, "autoSize") && !inst.inline) {
				var date = new Date(2009, 12 - 1, 20);
				var dateFormat = this._get(inst, "dateFormat");
				if (dateFormat.match(/[DM]/)) {
					var findMax = function (names) {
						var max = 0;
						var maxI = 0;
						for (var i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i
							}
						}
						return maxI
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
				}
				inst.input.attr("size", this._formatDate(inst, date).length)
			}
		},
		_inlineDatepicker: function (target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName)) {
				return
			}
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
				inst.settings[key] = value
			}).bind("getData.datepicker", function (event, key) {
				return this._get(inst, key)
			});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst)
		},
		_dialogDatepicker: function (input, date, onSelect, settings, pos) {
			var inst = this._dialogInst;
			if (!inst) {
				this.uuid += 1;
				var id = "dp" + this.uuid;
				this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$("body").append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst)
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);
			this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if (!this._pos) {
				var browserWidth = document.documentElement.clientWidth;
				var browserHeight = document.documentElement.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
			}
			this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI) {
				$.blockUI(this.dpDiv)
			}
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this
		},
		_destroyDatepicker: function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if (nodeName == "input") {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
			} else {
				if (nodeName == "div" || nodeName == "span") {
					$target.removeClass(this.markerClassName).empty()
				}
			}
		},
		_enableDatepicker: function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == "input") {
				target.disabled = false;
				inst.trigger.filter("button").each(function () {
					this.disabled = false
				}).end().filter("img").css({opacity: "1.0", cursor: ""})
			} else {
				if (nodeName == "div" || nodeName == "span") {
					var inline = $target.children("." + this._inlineClass);
					inline.children().removeClass("ui-state-disabled")
				}
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
				return (value == target ? null : value)
			})
		},
		_disableDatepicker: function (target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == "input") {
				target.disabled = true;
				inst.trigger.filter("button").each(function () {
					this.disabled = true
				}).end().filter("img").css({opacity: "0.5", cursor: "default"})
			} else {
				if (nodeName == "div" || nodeName == "span") {
					var inline = $target.children("." + this._inlineClass);
					inline.children().addClass("ui-state-disabled")
				}
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
				return (value == target ? null : value)
			});
			this._disabledInputs[this._disabledInputs.length] = target
		},
		_isDisabledDatepicker: function (target) {
			if (!target) {
				return false
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] == target) {
					return true
				}
			}
			return false
		},
		_getInst: function (target) {
			try {
				return $.data(target, PROP_NAME)
			} catch (err) {
				throw"Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function (target, name, value) {
			var inst = this._getInst(target);
			if (arguments.length == 2 && typeof name == "string") {
				return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
			}
			var settings = name || {};
			if (typeof name == "string") {
				settings = {};
				settings[name] = value
			}
			if (inst) {
				if (this._curInst == inst) {
					this._hideDatepicker()
				}
				var date = this._getDateDatepicker(target, true);
				extendRemove(inst.settings, settings);
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDateDatepicker(target, date);
				this._updateDatepicker(inst)
			}
		},
		_changeDatepicker: function (target, name, value) {
			this._optionDatepicker(target, name, value)
		},
		_refreshDatepicker: function (target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst)
			}
		},
		_setDateDatepicker: function (target, date) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst)
			}
		},
		_getDateDatepicker: function (target, noDefault) {
			var inst = this._getInst(target);
			if (inst && !inst.inline) {
				this._setDateFromField(inst, noDefault)
			}
			return (inst ? this._getDate(inst) : null)
		},
		_doKeyDown: function (event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
					case 9:
						$.datepicker._hideDatepicker();
						handled = false;
						break;
					case 13:
						var sel = $("td." + $.datepicker._dayOverClass, inst.dpDiv).add($("td." + $.datepicker._currentClass, inst.dpDiv));
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
						} else {
							$.datepicker._hideDatepicker()
						}
						return false;
						break;
					case 27:
						$.datepicker._hideDatepicker();
						break;
					case 33:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
						break;
					case 34:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
						break;
					case 35:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target)
						}
						handled = event.ctrlKey || event.metaKey;
						break;
					case 36:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target)
						}
						handled = event.ctrlKey || event.metaKey;
						break;
					case 37:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
						}
						handled = event.ctrlKey || event.metaKey;
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
						}
						break;
					case 38:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D")
						}
						handled = event.ctrlKey || event.metaKey;
						break;
					case 39:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
						}
						handled = event.ctrlKey || event.metaKey;
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
						}
						break;
					case 40:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D")
						}
						handled = event.ctrlKey || event.metaKey;
						break;
					default:
						handled = false
				}
			} else {
				if (event.keyCode == 36 && event.ctrlKey) {
					$.datepicker._showDatepicker(this)
				} else {
					handled = false
				}
			}
			if (handled) {
				event.preventDefault();
				event.stopPropagation()
			}
		},
		_doKeyPress: function (event) {
			var inst = $.datepicker._getInst(event.target);
			if ($.datepicker._get(inst, "constrainInput")) {
				var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
			}
		},
		_doKeyUp: function (event) {
			var inst = $.datepicker._getInst(event.target);
			if (inst.input.val() != inst.lastVal) {
				try {
					var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
					if (date) {
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst)
					}
				} catch (event) {
					$.datepicker.log(event)
				}
			}
			return true
		},
		_showDatepicker: function (input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() != "input") {
				input = $("input", input.parentNode)[0]
			}
			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
				return
			}
			var inst = $.datepicker._getInst(input);
			if ($.datepicker._curInst && $.datepicker._curInst != inst) {
				$.datepicker._curInst.dpDiv.stop(true, true)
			}
			var beforeShow = $.datepicker._get(inst, "beforeShow");
			extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
			if ($.datepicker._inDialog) {
				input.value = ""
			}
			if (!$.datepicker._pos) {
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight
			}
			var isFixed = false;
			$(input).parents().each(function () {
				isFixed |= $(this).css("position") == "fixed";
				return !isFixed
			});
			if (isFixed && $.browser.opera) {
				$.datepicker._pos[0] -= document.documentElement.scrollLeft;
				$.datepicker._pos[1] -= document.documentElement.scrollTop
			}
			var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
			$.datepicker._pos = null;
			inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
			$.datepicker._updateDatepicker(inst);
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({
				position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
				display: "none",
				left: offset.left + "px",
				top: offset.top + "px"
			});
			if (!inst.inline) {
				var showAnim = $.datepicker._get(inst, "showAnim");
				var duration = $.datepicker._get(inst, "duration");
				var postProcess = function () {
					$.datepicker._datepickerShowing = true;
					var borders = $.datepicker._getBorders(inst.dpDiv);
					inst.dpDiv.find("iframe.ui-datepicker-cover").css({
						left: -borders[0],
						top: -borders[1],
						width: inst.dpDiv.outerWidth(),
						height: inst.dpDiv.outerHeight()
					})
				};
				inst.dpDiv.zIndex($(input).zIndex() + 1);
				if ($.effects && $.effects[showAnim]) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
				} else {
					inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
				}
				if (!showAnim || !duration) {
					postProcess()
				}
				if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
					inst.input.focus()
				}
				$.datepicker._curInst = inst
			}
		},
		_updateDatepicker: function (inst) {
			var self = this;
			var borders = $.datepicker._getBorders(inst.dpDiv);
			inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
				left: -borders[0],
				top: -borders[1],
				width: inst.dpDiv.outerWidth(),
				height: inst.dpDiv.outerHeight()
			}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
				$(this).removeClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") != -1) {
					$(this).removeClass("ui-datepicker-prev-hover")
				}
				if (this.className.indexOf("ui-datepicker-next") != -1) {
					$(this).removeClass("ui-datepicker-next-hover")
				}
			}).bind("mouseover", function () {
				if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
					$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
					$(this).addClass("ui-state-hover");
					if (this.className.indexOf("ui-datepicker-prev") != -1) {
						$(this).addClass("ui-datepicker-prev-hover")
					}
					if (this.className.indexOf("ui-datepicker-next") != -1) {
						$(this).addClass("ui-datepicker-next-hover")
					}
				}
			}).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 17;
			if (cols > 1) {
				inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
			} else {
				inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
			}
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled")) {
				inst.input.focus()
			}
		},
		_getBorders: function (elem) {
			var convert = function (value) {
				return {thin: 1, medium: 2, thick: 3}[value] || value
			};
			return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
		},
		_checkOffset: function (inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
			var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
			offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
			return offset
		},
		_findPos: function (obj) {
			var inst = this._getInst(obj);
			var isRTL = this._get(inst, "isRTL");
			while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
				obj = obj[isRTL ? "previousSibling" : "nextSibling"]
			}
			var position = $(obj).offset();
			return [position.left, position.top]
		},
		_hideDatepicker: function (input) {
			var inst = this._curInst;
			if (!inst || (input && inst != $.data(input, PROP_NAME))) {
				return
			}
			if (this._datepickerShowing) {
				var showAnim = this._get(inst, "showAnim");
				var duration = this._get(inst, "duration");
				var postProcess = function () {
					$.datepicker._tidyDialog(inst);
					this._curInst = null
				};
				if ($.effects && $.effects[showAnim]) {
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
				} else {
					inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
				}
				if (!showAnim) {
					postProcess()
				}
				var onClose = this._get(inst, "onClose");
				if (onClose) {
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
				}
				this._datepickerShowing = false;
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({position: "absolute", left: "0", top: "-100px"});
					if ($.blockUI) {
						$.unblockUI();
						$("body").append(this.dpDiv)
					}
				}
				this._inDialog = false
			}
		},
		_tidyDialog: function (inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function (event) {
			if (!$.datepicker._curInst) {
				return
			}
			var $target = $(event.target);
			if ($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
				$.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function (id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._isDisabledDatepicker(target[0])) {
				return
			}
			this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
			this._updateDatepicker(inst)
		},
		_gotoToday: function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._get(inst, "gotoCurrent") && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear
			} else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear()
			}
			this._notifyChange(inst);
			this._adjustDate(target)
		},
		_selectMonthYear: function (id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst._selectingMonthYear = false;
			inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
			this._notifyChange(inst);
			this._adjustDate(target)
		},
		_clickMonthYear: function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
				inst.input.focus()
			}
			inst._selectingMonthYear = !inst._selectingMonthYear
		},
		_selectDay: function (id, month, year, td) {
			var target = $(id);
			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return
			}
			var inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $("a", td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
		},
		_clearDate: function (id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._selectDate(target, "")
		},
		_selectDate: function (id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if (inst.input) {
				inst.input.val(dateStr)
			}
			this._updateAlternate(inst);
			var onSelect = this._get(inst, "onSelect");
			if (onSelect) {
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
			} else {
				if (inst.input) {
					inst.input.trigger("change")
				}
			}
			if (inst.inline) {
				this._updateDatepicker(inst)
			} else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (typeof(inst.input[0]) != "object") {
					inst.input.focus()
				}
				this._lastInput = null
			}
		},
		_updateAlternate: function (inst) {
			var altField = this._get(inst, "altField");
			if (altField) {
				var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
				var date = this._getDate(inst);
				var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function () {
					$(this).val(dateStr)
				})
			}
		},
		noWeekends: function (date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ""]
		},
		iso8601Week: function (date) {
			var checkDate = new Date(date.getTime());
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0);
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
		},
		parseDate: function (format, value, settings) {
			if (format == null || value == null) {
				throw"Invalid arguments"
			}
			value = (typeof value == "object" ? value.toString() : value + "");
			if (value == "") {
				return null
			}
			var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			var lookAhead = function (match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches) {
					iFormat++
				}
				return matches
			};
			var getNumber = function (match) {
				lookAhead(match);
				var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" ? 4 : (match == "o" ? 3 : 2))));
				var digits = new RegExp("^\\d{1," + size + "}");
				var num = value.substring(iValue).match(digits);
				if (!num) {
					throw"Missing number at position " + iValue
				}
				iValue += num[0].length;
				return parseInt(num[0], 10)
			};
			var getName = function (match, shortNames, longNames) {
				var names = (lookAhead(match) ? longNames : shortNames);
				for (var i = 0; i < names.length; i++) {
					if (value.substr(iValue, names[i].length) == names[i]) {
						iValue += names[i].length;
						return i + 1
					}
				}
				throw"Unknown name at position " + iValue
			};
			var checkLiteral = function () {
				if (value.charAt(iValue) != format.charAt(iFormat)) {
					throw"Unexpected literal at position " + iValue
				}
				iValue++
			};
			var iValue = 0;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
						literal = false
					} else {
						checkLiteral()
					}
				} else {
					switch (format.charAt(iFormat)) {
						case"d":
							day = getNumber("d");
							break;
						case"D":
							getName("D", dayNamesShort, dayNames);
							break;
						case"o":
							doy = getNumber("o");
							break;
						case"m":
							month = getNumber("m");
							break;
						case"M":
							month = getName("M", monthNamesShort, monthNames);
							break;
						case"y":
							year = getNumber("y");
							break;
						case"@":
							var date = new Date(getNumber("@"));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case"!":
							var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case"'":
							if (lookAhead("'")) {
								checkLiteral()
							} else {
								literal = true
							}
							break;
						default:
							checkLiteral()
					}
				}
			}
			if (year == -1) {
				year = new Date().getFullYear()
			} else {
				if (year < 100) {
					year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
				}
			}
			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim) {
						break
					}
					month++;
					day -= dim
				} while (true)
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
				throw"Invalid date"
			}
			return date
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
		formatDate: function (format, date, settings) {
			if (!date) {
				return ""
			}
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			var lookAhead = function (match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches) {
					iFormat++
				}
				return matches
			};
			var formatNumber = function (match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num
					}
				}
				return num
			};
			var formatName = function (match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value])
			};
			var output = "";
			var literal = false;
			if (date) {
				for (var iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal) {
						if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
							literal = false
						} else {
							output += format.charAt(iFormat)
						}
					} else {
						switch (format.charAt(iFormat)) {
							case"d":
								output += formatNumber("d", date.getDate(), 2);
								break;
							case"D":
								output += formatName("D", date.getDay(), dayNamesShort, dayNames);
								break;
							case"o":
								output += formatNumber("o", (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
								break;
							case"m":
								output += formatNumber("m", date.getMonth() + 1, 2);
								break;
							case"M":
								output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
								break;
							case"y":
								output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
								break;
							case"@":
								output += date.getTime();
								break;
							case"!":
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case"'":
								if (lookAhead("'")) {
									output += "'"
								} else {
									literal = true
								}
								break;
							default:
								output += format.charAt(iFormat)
						}
					}
				}
			}
			return output
		},
		_possibleChars: function (format) {
			var chars = "";
			var literal = false;
			var lookAhead = function (match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches) {
					iFormat++
				}
				return matches
			};
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
						literal = false
					} else {
						chars += format.charAt(iFormat)
					}
				} else {
					switch (format.charAt(iFormat)) {
						case"d":
						case"m":
						case"y":
						case"@":
							chars += "0123456789";
							break;
						case"D":
						case"M":
							return null;
						case"'":
							if (lookAhead("'")) {
								chars += "'"
							} else {
								literal = true
							}
							break;
						default:
							chars += format.charAt(iFormat)
					}
				}
			}
			return chars
		},
		_get: function (inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
		},
		_setDateFromField: function (inst, noDefault) {
			if (inst.input.val() == inst.lastVal) {
				return
			}
			var dateFormat = this._get(inst, "dateFormat");
			var dates = inst.lastVal = inst.input ? inst.input.val() : null;
			var date, defaultDate;
			date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate
			} catch (event) {
				this.log(event);
				dates = (noDefault ? "" : dates)
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = (dates ? date.getDate() : 0);
			inst.currentMonth = (dates ? date.getMonth() : 0);
			inst.currentYear = (dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst)
		},
		_getDefaultDate: function (inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
		},
		_determineDate: function (inst, date, defaultDate) {
			var offsetNumeric = function (offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date
			};
			var offsetString = function (offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
				} catch (e) {
				}
				var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || "d") {
						case"d":
						case"D":
							day += parseInt(matches[1], 10);
							break;
						case"w":
						case"W":
							day += parseInt(matches[1], 10) * 7;
							break;
						case"m":
						case"M":
							month += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case"y":
						case"Y":
							year += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break
					}
					matches = pattern.exec(offset)
				}
				return new Date(year, month, day)
			};
			date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
			date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
			if (date) {
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0)
			}
			return this._daylightSavingAdjust(date)
		},
		_daylightSavingAdjust: function (date) {
			if (!date) {
				return null
			}
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date
		},
		_setDate: function (inst, date, noChange) {
			var clear = !(date);
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			date = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
			inst.selectedDay = inst.currentDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
			if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
				this._notifyChange(inst)
			}
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? "" : this._formatDate(inst))
			}
		},
		_getDate: function (inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate
		},
		_generateHTML: function (inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
			var isRTL = this._get(inst, "isRTL");
			var showButtonPanel = this._get(inst, "showButtonPanel");
			var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
			var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
			var stepMonths = this._get(inst, "stepMonths");
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, "min");
			var maxDate = this._getMinMaxDate(inst, "max");
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--
			}
			if (maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, "prevText");
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
			var nextText = this._get(inst, "nextText");
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
			var currentText = this._get(inst, "currentText");
			var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
			var firstDay = parseInt(this._get(inst, "firstDay"), 10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var showWeek = this._get(inst, "showWeek");
			var dayNames = this._get(inst, "dayNames");
			var dayNamesShort = this._get(inst, "dayNamesShort");
			var dayNamesMin = this._get(inst, "dayNamesMin");
			var monthNames = this._get(inst, "monthNames");
			var monthNamesShort = this._get(inst, "monthNamesShort");
			var beforeShowDay = this._get(inst, "beforeShowDay");
			var showOtherMonths = this._get(inst, "showOtherMonths");
			var selectOtherMonths = this._get(inst, "selectOtherMonths");
			var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
			var defaultDate = this._getDefaultDate(inst);
			var html = "";
			for (var row = 0; row < numMonths[0]; row++) {
				var group = "";
				for (var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = " ui-corner-all";
					var calender = "";
					if (isMultiMonth) {
						calender += '<div class="ui-datepicker-group';
						if (numMonths[1] > 1) {
							switch (col) {
								case 0:
									calender += " ui-datepicker-group-first";
									cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
									break;
								case numMonths[1] - 1:
									calender += " ui-datepicker-group-last";
									cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
									break;
								default:
									calender += " ui-datepicker-group-middle";
									cornerClass = "";
									break
							}
						}
						calender += '">'
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
					var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
					for (var dow = 0; dow < 7; dow++) {
						var day = (dow + firstDay) % 7;
						thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
					}
					calender += thead + "</tr></thead><tbody>";
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
					}
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (var dRow = 0; dRow < numRows; dRow++) {
						calender += "<tr>";
						var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
						for (var dow = 0; dow < 7; dow++) {
							var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == selectedDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate)
						}
						calender += tbody + "</tr>"
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++
					}
					calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
					group += calender
				}
				html += group
			}
			html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
			inst._keyEvent = false;
			return html
		},
		_generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var changeMonth = this._get(inst, "changeMonth");
			var changeYear = this._get(inst, "changeYear");
			var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = "";
			if (secondary || !changeMonth) {
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
			} else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
				for (var month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
					}
				}
				monthHtml += "</select>"
			}
			if (!showMonthAfterYear) {
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
			}
			if (secondary || !changeYear) {
				html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
			} else {
				var years = this._get(inst, "yearRange").split(":");
				var thisYear = new Date().getFullYear();
				var determineYear = function (value) {
					var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year)
				};
				var year = determineYear(years[0]);
				var endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				html += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
				for (; year <= endYear; year++) {
					html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
				}
				html += "</select>"
			}
			html += this._get(inst, "yearSuffix");
			if (showMonthAfterYear) {
				html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
			}
			html += "</div>";
			return html
		},
		_adjustInstDate: function (inst, offset, period) {
			var year = inst.drawYear + (period == "Y" ? offset : 0);
			var month = inst.drawMonth + (period == "M" ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
			var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period == "M" || period == "Y") {
				this._notifyChange(inst)
			}
		},
		_restrictMinMax: function (inst, date) {
			var minDate = this._getMinMaxDate(inst, "min");
			var maxDate = this._getMinMaxDate(inst, "max");
			date = (minDate && date < minDate ? minDate : date);
			date = (maxDate && date > maxDate ? maxDate : date);
			return date
		},
		_notifyChange: function (inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			if (onChange) {
				onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
			}
		},
		_getNumberOfMonths: function (inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
		},
		_getMinMaxDate: function (inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
		},
		_getDaysInMonth: function (year, month) {
			return 32 - new Date(year, month, 32).getDate()
		},
		_getFirstDayOfMonth: function (year, month) {
			return new Date(year, month, 1).getDay()
		},
		_canAdjustMonth: function (inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			if (offset < 0) {
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
			}
			return this._isInRange(inst, date)
		},
		_isInRange: function (inst, date) {
			var minDate = this._getMinMaxDate(inst, "min");
			var maxDate = this._getMinMaxDate(inst, "max");
			return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
		},
		_getFormatConfig: function (inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {
				shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, "dayNamesShort"),
				dayNames: this._get(inst, "dayNames"),
				monthNamesShort: this._get(inst, "monthNamesShort"),
				monthNames: this._get(inst, "monthNames")
			}
		},
		_formatDate: function (inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear
			}
			var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
		}
	});
	function extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) {
			if (props[name] == null || props[name] == undefined) {
				target[name] = props[name]
			}
		}
		return target
	}

	function isArray(a) {
		return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
	}

	$.fn.datepicker = function (options) {
		if (!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
			$.datepicker.initialized = true
		}
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
		}
		if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
		}
		return this.each(function () {
			typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
		})
	};
	$.datepicker = new Datepicker();
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.9m2";
	window["DP_jQuery_" + dpuuid] = $
})(jQuery);
(function (b) {
	var a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
	b.widget("ui.dialog", {
		options: {
			autoOpen: true,
			buttons: {},
			closeOnEscape: true,
			closeText: "close",
			dialogClass: "",
			draggable: true,
			hide: null,
			height: "auto",
			maxHeight: false,
			maxWidth: false,
			minHeight: 150,
			minWidth: 150,
			modal: false,
			position: "center",
			resizable: true,
			show: null,
			stack: true,
			title: "",
			width: 300,
			zIndex: 1000
		}, _create: function () {
			this.originalTitle = this.element.attr("title");
			var k = this, l = k.options, i = l.title || k.originalTitle || "&#160;", d = b.ui.dialog.getTitleId(k.element), j = (k.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass(a + l.dialogClass).css({zIndex: l.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (m) {
				if (l.closeOnEscape && m.keyCode && m.keyCode === b.ui.keyCode.ESCAPE) {
					k.close(m);
					m.preventDefault()
				}
			}).attr({role: "dialog", "aria-labelledby": d}).mousedown(function (m) {
				k.moveToTop(false, m)
			}), f = k.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j), e = (k.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j), h = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
				h.addClass("ui-state-hover")
			}, function () {
				h.removeClass("ui-state-hover")
			}).focus(function () {
				h.addClass("ui-state-focus")
			}).blur(function () {
				h.removeClass("ui-state-focus")
			}).click(function (m) {
				k.close(m);
				return false
			}).appendTo(e), g = (k.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(h), c = b("<span></span>").addClass("ui-dialog-title").attr("id", d).html(i).prependTo(e);
			if (b.isFunction(l.beforeclose) && !b.isFunction(l.beforeClose)) {
				l.beforeClose = l.beforeclose
			}
			e.find("*").add(e).disableSelection();
			if (l.draggable && b.fn.draggable) {
				k._makeDraggable()
			}
			if (l.resizable && b.fn.resizable) {
				k._makeResizable()
			}
			k._createButtons(l.buttons);
			k._isOpen = false;
			if (b.fn.bgiframe) {
				j.bgiframe()
			}
		}, _init: function () {
			if (this.options.autoOpen) {
				this.open()
			}
		}, destroy: function () {
			var c = this;
			if (c.overlay) {
				c.overlay.destroy()
			}
			c.uiDialog.hide();
			c.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
			c.uiDialog.remove();
			if (c.originalTitle) {
				c.element.attr("title", c.originalTitle)
			}
			return c
		}, widget: function () {
			return this.uiDialog
		}, close: function (e) {
			var c = this, d;
			if (false === c._trigger("beforeClose", e)) {
				return
			}
			if (c.overlay) {
				c.overlay.destroy()
			}
			c.uiDialog.unbind("keypress.ui-dialog");
			c._isOpen = false;
			if (c.options.hide) {
				c.uiDialog.hide(c.options.hide, function () {
					c._trigger("close", e)
				})
			} else {
				c.uiDialog.hide();
				c._trigger("close", e)
			}
			b.ui.dialog.overlay.resize();
			if (c.options.modal) {
				d = 0;
				b(".ui-dialog").each(function () {
					if (this !== c.uiDialog[0]) {
						d = Math.max(d, b(this).css("z-index"))
					}
				});
				b.ui.dialog.maxZ = d
			}
			return c
		}, isOpen: function () {
			return this._isOpen
		}, moveToTop: function (g, f) {
			var c = this, e = c.options, d;
			if ((e.modal && !g) || (!e.stack && !e.modal)) {
				return c._trigger("focus", f)
			}
			if (e.zIndex > b.ui.dialog.maxZ) {
				b.ui.dialog.maxZ = e.zIndex
			}
			if (c.overlay) {
				b.ui.dialog.maxZ += 1;
				c.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
			}
			d = {scrollTop: c.element.attr("scrollTop"), scrollLeft: c.element.attr("scrollLeft")};
			b.ui.dialog.maxZ += 1;
			c.uiDialog.css("z-index", b.ui.dialog.maxZ);
			c.element.attr(d);
			c._trigger("focus", f);
			return c
		}, open: function () {
			if (this._isOpen) {
				return
			}
			var d = this, e = d.options, c = d.uiDialog;
			d.overlay = e.modal ? new b.ui.dialog.overlay(d) : null;
			if (c.next().length) {
				c.appendTo("body")
			}
			d._size();
			d._position(e.position);
			c.show(e.show);
			d.moveToTop(true);
			if (e.modal) {
				c.bind("keypress.ui-dialog", function (h) {
					if (h.keyCode !== b.ui.keyCode.TAB) {
						return
					}
					var g = b(":tabbable", this), i = g.filter(":first"), f = g.filter(":last");
					if (h.target === f[0] && !h.shiftKey) {
						i.focus(1);
						return false
					} else {
						if (h.target === i[0] && h.shiftKey) {
							f.focus(1);
							return false
						}
					}
				})
			}
			b([]).add(c.find(".ui-dialog-content :tabbable:first")).add(c.find(".ui-dialog-buttonpane :tabbable:first")).add(c).filter(":first").focus();
			d._trigger("open");
			d._isOpen = true;
			return d
		}, _createButtons: function (f) {
			var e = this, c = false, d = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
			e.uiDialog.find(".ui-dialog-buttonpane").remove();
			if (typeof f === "object" && f !== null) {
				b.each(f, function () {
					return !(c = true)
				})
			}
			if (c) {
				b.each(f, function (g, i) {
					var h = b('<button type="button"></button>').text(g).click(function () {
						i.apply(e.element[0], arguments)
					}).appendTo(d);
					if (b.fn.button) {
						h.button()
					}
				});
				d.appendTo(e.uiDialog)
			}
		}, _makeDraggable: function () {
			var c = this, f = c.options, g = b(document), e;

			function d(h) {
				return {position: h.position, offset: h.offset}
			}

			c.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function (h, i) {
					e = f.height === "auto" ? "auto" : b(this).height();
					b(this).height(b(this).height()).addClass("ui-dialog-dragging");
					c._trigger("dragStart", h, d(i))
				},
				drag: function (h, i) {
					c._trigger("drag", h, d(i))
				},
				stop: function (h, i) {
					f.position = [i.position.left - g.scrollLeft(), i.position.top - g.scrollTop()];
					b(this).removeClass("ui-dialog-dragging").height(e);
					c._trigger("dragStop", h, d(i));
					b.ui.dialog.overlay.resize()
				}
			})
		}, _makeResizable: function (h) {
			h = (h === undefined ? this.options.resizable : h);
			var d = this, g = d.options, c = d.uiDialog.css("position"), f = (typeof h === "string" ? h : "n,e,s,w,se,sw,ne,nw");

			function e(i) {
				return {
					originalPosition: i.originalPosition,
					originalSize: i.originalSize,
					position: i.position,
					size: i.size
				}
			}

			d.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: d.element,
				maxWidth: g.maxWidth,
				maxHeight: g.maxHeight,
				minWidth: g.minWidth,
				minHeight: d._minHeight(),
				handles: f,
				start: function (i, j) {
					b(this).addClass("ui-dialog-resizing");
					d._trigger("resizeStart", i, e(j))
				},
				resize: function (i, j) {
					d._trigger("resize", i, e(j))
				},
				stop: function (i, j) {
					b(this).removeClass("ui-dialog-resizing");
					g.height = b(this).height();
					g.width = b(this).width();
					d._trigger("resizeStop", i, e(j));
					b.ui.dialog.overlay.resize()
				}
			}).css("position", c).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
		}, _minHeight: function () {
			var c = this.options;
			if (c.height === "auto") {
				return c.minHeight
			} else {
				return Math.min(c.minHeight, c.height)
			}
		}, _position: function (d) {
			var e = [], f = [0, 0], c;
			d = d || b.ui.dialog.prototype.options.position;
			if (typeof d === "string" || (typeof d === "object" && "0" in d)) {
				e = d.split ? d.split(" ") : [d[0], d[1]];
				if (e.length === 1) {
					e[1] = e[0]
				}
				b.each(["left", "top"], function (h, g) {
					if (+e[h] === e[h]) {
						f[h] = e[h];
						e[h] = g
					}
				})
			} else {
				if (typeof d === "object") {
					if ("left" in d) {
						e[0] = "left";
						f[0] = d.left
					} else {
						if ("right" in d) {
							e[0] = "right";
							f[0] = -d.right
						}
					}
					if ("top" in d) {
						e[1] = "top";
						f[1] = d.top
					} else {
						if ("bottom" in d) {
							e[1] = "bottom";
							f[1] = -d.bottom
						}
					}
				}
			}
			c = this.uiDialog.is(":visible");
			if (!c) {
				this.uiDialog.show()
			}
			this.uiDialog.css({top: 0, left: 0}).position({
				my: e.join(" "),
				at: e.join(" "),
				offset: f.join(" "),
				of: window,
				collision: "fit",
				using: function (h) {
					var g = b(this).css(h).offset().top;
					if (g < 0) {
						b(this).css("top", h.top - g)
					}
				}
			});
			if (!c) {
				this.uiDialog.hide()
			}
		}, _setOption: function (f, g) {
			var d = this, c = d.uiDialog, h = c.is(":data(resizable)"), e = false;
			switch (f) {
				case"beforeclose":
					f = "beforeClose";
					break;
				case"buttons":
					d._createButtons(g);
					break;
				case"closeText":
					d.uiDialogTitlebarCloseText.text("" + g);
					break;
				case"dialogClass":
					c.removeClass(d.options.dialogClass).addClass(a + g);
					break;
				case"disabled":
					if (g) {
						c.addClass("ui-dialog-disabled")
					} else {
						c.removeClass("ui-dialog-disabled")
					}
					break;
				case"draggable":
					if (g) {
						d._makeDraggable()
					} else {
						c.draggable("destroy")
					}
					break;
				case"height":
					e = true;
					break;
				case"maxHeight":
					if (h) {
						c.resizable("option", "maxHeight", g)
					}
					e = true;
					break;
				case"maxWidth":
					if (h) {
						c.resizable("option", "maxWidth", g)
					}
					e = true;
					break;
				case"minHeight":
					if (h) {
						c.resizable("option", "minHeight", g)
					}
					e = true;
					break;
				case"minWidth":
					if (h) {
						c.resizable("option", "minWidth", g)
					}
					e = true;
					break;
				case"position":
					d._position(g);
					break;
				case"resizable":
					if (h && !g) {
						c.resizable("destroy")
					}
					if (h && typeof g === "string") {
						c.resizable("option", "handles", g)
					}
					if (!h && g !== false) {
						d._makeResizable(g)
					}
					break;
				case"title":
					b(".ui-dialog-title", d.uiDialogTitlebar).html("" + (g || "&#160;"));
					break;
				case"width":
					e = true;
					break
			}
			b.Widget.prototype._setOption.apply(d, arguments);
			if (e) {
				d._size()
			}
		}, _size: function () {
			var d = this.options, c;
			this.element.css({width: "auto", minHeight: 0, height: 0});
			c = this.uiDialog.css({height: "auto", width: d.width}).height();
			this.element.css(d.height === "auto" ? {
				minHeight: Math.max(d.minHeight - c, 0),
				height: "auto"
			} : {minHeight: 0, height: Math.max(d.height - c, 0)}).show();
			if (this.uiDialog.is(":data(resizable)")) {
				this.uiDialog.resizable("option", "minHeight", this._minHeight())
			}
		}
	});
	b.extend(b.ui.dialog, {
		version: "1.9m2", uuid: 0, maxZ: 0, getTitleId: function (c) {
			var d = c.attr("id");
			if (!d) {
				this.uuid += 1;
				d = this.uuid
			}
			return "ui-dialog-title-" + d
		}, overlay: function (c) {
			this.$el = b.ui.dialog.overlay.create(c)
		}
	});
	b.extend(b.ui.dialog.overlay, {
		instances: [],
		oldInstances: [],
		maxZ: 0,
		events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (c) {
			return c + ".dialog-overlay"
		}).join(" "),
		create: function (d) {
			if (this.instances.length === 0) {
				setTimeout(function () {
					if (b.ui.dialog.overlay.instances.length) {
						b(document).bind(b.ui.dialog.overlay.events, function (e) {
							return (b(e.target).zIndex() >= b.ui.dialog.overlay.maxZ)
						})
					}
				}, 1);
				b(document).bind("keydown.dialog-overlay", function (e) {
					if (d.options.closeOnEscape && e.keyCode && e.keyCode === b.ui.keyCode.ESCAPE) {
						d.close(e);
						e.preventDefault()
					}
				});
				b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
			}
			var c = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
				width: this.width(),
				height: this.height()
			});
			if (b.fn.bgiframe) {
				c.bgiframe()
			}
			this.instances.push(c);
			return c
		},
		destroy: function (c) {
			this.oldInstances.push(this.instances.splice(b.inArray(c, this.instances), 1)[0]);
			if (this.instances.length === 0) {
				b([document, window]).unbind(".dialog-overlay")
			}
			c.remove();
			var d = 0;
			b.each(this.instances, function () {
				d = Math.max(d, this.css("z-index"))
			});
			this.maxZ = d
		},
		height: function () {
			var d, c;
			if (/MSIE 6/.test(navigator.userAgent)) {
				d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
				c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
				if (d < c) {
					return b(window).height() + "px"
				} else {
					return d + "px"
				}
			} else {
				return b(document).height() + "px"
			}
		},
		width: function () {
			var c, d;
			if (/MSIE 6/.test(navigator.userAgent)) {
				c = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
				d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
				if (c < d) {
					return b(window).width() + "px"
				} else {
					return c + "px"
				}
			} else {
				return b(document).width() + "px"
			}
		},
		resize: function () {
			var c = b([]);
			b.each(b.ui.dialog.overlay.instances, function () {
				c = c.add(this)
			});
			c.css({width: 0, height: 0}).css({width: b.ui.dialog.overlay.width(), height: b.ui.dialog.overlay.height()})
		}
	});
	b.extend(b.ui.dialog.overlay.prototype, {
		destroy: function () {
			b.ui.dialog.overlay.destroy(this.$el)
		}
	})
}(jQuery));
(function (a) {
	a.widget("ui.menu", {
		_create: function () {
			var b = this;
			this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			}).bind("click.menu", function (c) {
				if (b.options.disabled) {
					return false
				}
				if (!a(c.target).closest(".ui-menu-item a").length) {
					return
				}
				c.preventDefault();
				b.select(c)
			});
			this.refresh();
			if (!this.options.input) {
				this.options.input = this.element.attr("tabIndex", 0)
			}
			this.options.input.bind("keydown.menu", function (c) {
				if (b.options.disabled) {
					return
				}
				switch (c.keyCode) {
					case a.ui.keyCode.PAGE_UP:
						b.previousPage();
						c.preventDefault();
						c.stopImmediatePropagation();
						break;
					case a.ui.keyCode.PAGE_DOWN:
						b.nextPage();
						c.preventDefault();
						c.stopImmediatePropagation();
						break;
					case a.ui.keyCode.UP:
						b.previous();
						c.preventDefault();
						c.stopImmediatePropagation();
						break;
					case a.ui.keyCode.DOWN:
						b.next();
						c.preventDefault();
						c.stopImmediatePropagation();
						break;
					case a.ui.keyCode.ENTER:
						b.select();
						c.preventDefault();
						c.stopImmediatePropagation();
						break
				}
			})
		}, destroy: function () {
			a.Widget.prototype.destroy.apply(this, arguments);
			this.element.removeClass("ui-menu ui-widget ui-widget-content ui-corner-all").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-activedescendant");
			this.element.children(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").children("a").removeClass("ui-corner-all").removeAttr("tabIndex").unbind(".menu")
		}, refresh: function () {
			var c = this;
			var b = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
			b.children("a").addClass("ui-corner-all").attr("tabIndex", -1).bind("mouseenter.menu", function (d) {
				if (c.options.disabled) {
					return
				}
				c.activate(d, a(this).parent())
			}).bind("mouseleave.menu", function () {
				if (c.options.disabled) {
					return
				}
				c.deactivate()
			})
		}, activate: function (e, d) {
			this.deactivate();
			if (this._hasScroll()) {
				var f = d.offset().top - this.element.offset().top, b = this.element.attr("scrollTop"), c = this.element.height();
				if (f < 0) {
					this.element.attr("scrollTop", b + f)
				} else {
					if (f > c) {
						this.element.attr("scrollTop", b + f - c + d.height())
					}
				}
			}
			this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
			this._trigger("focus", e, {item: d})
		}, deactivate: function () {
			if (!this.active) {
				return
			}
			this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
			this._trigger("blur");
			this.active = null
		}, next: function (b) {
			this._move("next", ".ui-menu-item:first", b)
		}, previous: function (b) {
			this._move("prev", ".ui-menu-item:last", b)
		}, first: function () {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		}, last: function () {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		}, _move: function (e, d, c) {
			if (!this.active) {
				this.activate(c, this.element.children(d));
				return
			}
			var b = this.active[e + "All"](".ui-menu-item").eq(0);
			if (b.length) {
				this.activate(c, b)
			} else {
				this.activate(c, this.element.children(d))
			}
		}, nextPage: function (d) {
			if (this._hasScroll()) {
				if (!this.active || this.last()) {
					this.activate(d, this.element.children(":first"));
					return
				}
				var e = this.active.offset().top, c = this.element.height(), b = this.element.children("li").filter(function () {
					var f = a(this).offset().top - e - c + a(this).height();
					return f < 10 && f > -10
				});
				if (!b.length) {
					b = this.element.children(":last")
				}
				this.activate(d, b)
			} else {
				this.activate(d, this.element.children(!this.active || this.last() ? ":first" : ":last"))
			}
		}, previousPage: function (c) {
			if (this._hasScroll()) {
				if (!this.active || this.first()) {
					this.activate(c, this.element.children(":last"));
					return
				}
				var d = this.active.offset().top, b = this.element.height();
				result = this.element.children("li").filter(function () {
					var e = a(this).offset().top - d + b - a(this).height();
					return e < 10 && e > -10
				});
				if (!result.length) {
					result = this.element.children(":first")
				}
				this.activate(c, result)
			} else {
				this.activate(c, this.element.children(!this.active || this.first() ? ":last" : ":first"))
			}
		}, _hasScroll: function () {
			return this.element.height() < this.element.attr("scrollHeight")
		}, select: function (b) {
			this._trigger("select", b, {item: this.active})
		}
	})
}(jQuery));
(function (f) {
	f.ui = f.ui || {};
	var c = /left|center|right/, e = "center", d = /top|center|bottom/, g = "center", a = f.fn.position, b = f.fn.offset;
	f.fn.position = function (i) {
		if (!i || !i.of) {
			return a.apply(this, arguments)
		}
		i = f.extend({}, i);
		var l = f(i.of), n = (i.collision || "flip").split(" "), m = i.offset ? i.offset.split(" ") : [0, 0], k, h, j;
		if (i.of.nodeType === 9) {
			k = l.width();
			h = l.height();
			j = {top: 0, left: 0}
		} else {
			if (i.of.scrollTo && i.of.document) {
				k = l.width();
				h = l.height();
				j = {top: l.scrollTop(), left: l.scrollLeft()}
			} else {
				if (i.of.preventDefault) {
					i.at = "left top";
					k = h = 0;
					j = {top: i.of.pageY, left: i.of.pageX}
				} else {
					k = l.outerWidth();
					h = l.outerHeight();
					j = l.offset()
				}
			}
		}
		f.each(["my", "at"], function () {
			var p = (i[this] || "").split(" ");
			if (p.length === 1) {
				p = c.test(p[0]) ? p.concat([g]) : d.test(p[0]) ? [e].concat(p) : [e, g]
			}
			p[0] = c.test(p[0]) ? p[0] : e;
			p[1] = d.test(p[1]) ? p[1] : g;
			i[this] = p
		});
		if (n.length === 1) {
			n[1] = n[0]
		}
		m[0] = parseInt(m[0], 10) || 0;
		if (m.length === 1) {
			m[1] = m[0]
		}
		m[1] = parseInt(m[1], 10) || 0;
		if (i.at[0] === "right") {
			j.left += k
		} else {
			if (i.at[0] === e) {
				j.left += k / 2
			}
		}
		if (i.at[1] === "bottom") {
			j.top += h
		} else {
			if (i.at[1] === g) {
				j.top += h / 2
			}
		}
		j.left += m[0];
		j.top += m[1];
		return this.each(function () {
			var s = f(this), r = s.outerWidth(), q = s.outerHeight(), p = f.extend({}, j);
			if (i.my[0] === "right") {
				p.left -= r
			} else {
				if (i.my[0] === e) {
					p.left -= r / 2
				}
			}
			if (i.my[1] === "bottom") {
				p.top -= q
			} else {
				if (i.my[1] === g) {
					p.top -= q / 2
				}
			}
			p.left = parseInt(p.left);
			p.top = parseInt(p.top);
			f.each(["left", "top"], function (v, u) {
				if (f.ui.position[n[v]]) {
					f.ui.position[n[v]][u](p, {
						targetWidth: k,
						targetHeight: h,
						elemWidth: r,
						elemHeight: q,
						offset: m,
						my: i.my,
						at: i.at
					})
				}
			});
			if (f.fn.bgiframe) {
				s.bgiframe()
			}
			s.offset(f.extend(p, {using: i.using}))
		})
	};
	f.ui.position = {
		fit: {
			left: function (h, i) {
				var k = f(window), j = h.left + i.elemWidth - k.width() - k.scrollLeft();
				h.left = j > 0 ? h.left - j : Math.max(0, h.left)
			}, top: function (h, i) {
				var k = f(window), j = h.top + i.elemHeight - k.height() - k.scrollTop();
				h.top = j > 0 ? h.top - j : Math.max(0, h.top)
			}
		}, flip: {
			left: function (i, j) {
				if (j.at[0] === "center") {
					return
				}
				var l = f(window), k = i.left + j.elemWidth - l.width() - l.scrollLeft(), h = j.my[0] === "left" ? -j.elemWidth : j.my[0] === "right" ? j.elemWidth : 0, m = -2 * j.offset[0];
				i.left += i.left < 0 ? h + j.targetWidth + m : k > 0 ? h - j.targetWidth + m : 0
			}, top: function (i, k) {
				if (k.at[1] === "center") {
					return
				}
				var m = f(window), l = i.top + k.elemHeight - m.height() - m.scrollTop(), h = k.my[1] === "top" ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0, j = k.at[1] === "top" ? k.targetHeight : -k.targetHeight, n = -2 * k.offset[1];
				i.top += i.top < 0 ? h + k.targetHeight + n : l > 0 ? h + j + n : 0
			}
		}
	};
	if (!f.offset.setOffset) {
		f.offset.setOffset = function (l, i) {
			if (/static/.test(f.curCSS(l, "position"))) {
				l.style.position = "relative"
			}
			var k = f(l), n = k.offset(), h = parseInt(f.curCSS(l, "top", true), 10) || 0, m = parseInt(f.curCSS(l, "left", true), 10) || 0, j = {
				top: (i.top - n.top) + h,
				left: (i.left - n.left) + m
			};
			if ("using" in i) {
				i.using.call(l, j)
			} else {
				k.css(j)
			}
		};
		f.fn.offset = function (h) {
			var i = this[0];
			if (!i || !i.ownerDocument) {
				return null
			}
			if (h) {
				return this.each(function () {
					f.offset.setOffset(this, h)
				})
			}
			return b.call(this)
		}
	}
}(jQuery));
(function (a) {
	a.widget("ui.progressbar", {
		options: {value: 0}, _create: function () {
			this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
				role: "progressbar",
				"aria-valuemin": this._valueMin(),
				"aria-valuemax": this._valueMax(),
				"aria-valuenow": this._value()
			});
			this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
			this._refreshValue()
		}, destroy: function () {
			this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
			this.valueDiv.remove();
			this._superApply("destroy", arguments)
		}, value: function (b) {
			if (b === undefined) {
				return this._value()
			}
			this._setOption("value", b);
			return this
		}, _setOption: function (b, c) {
			switch (b) {
				case"value":
					this.options.value = c;
					this._refreshValue();
					this._trigger("change");
					break
			}
			this._superApply("_setOption", arguments)
		}, _value: function () {
			var b = this.options.value;
			if (typeof b !== "number") {
				b = 0
			}
			if (b < this._valueMin()) {
				b = this._valueMin()
			}
			if (b > this._valueMax()) {
				b = this._valueMax()
			}
			return b
		}, _valueMin: function () {
			return 0
		}, _valueMax: function () {
			return 100
		}, _refreshValue: function () {
			var b = this.value();
			this.valueDiv[b === this._valueMax() ? "addClass" : "removeClass"]("ui-corner-right").width(b + "%");
			this.element.attr("aria-valuenow", b)
		}
	});
	a.extend(a.ui.progressbar, {version: "1.9m2"})
})(jQuery);
(function (b) {
	var a = 5;
	b.widget("ui.slider", b.ui.mouse, {
		widgetEventPrefix: "slide",
		options: {
			animate: false,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: false,
			step: 1,
			value: 0,
			values: null
		},
		_create: function () {
			var c = this, d = this.options;
			this._keySliding = false;
			this._mouseSliding = false;
			this._animateOff = true;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
			this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
			if (d.disabled) {
				this.element.addClass("ui-slider-disabled ui-disabled")
			}
			this.range = b([]);
			if (d.range) {
				if (d.range === true) {
					this.range = b("<div></div>");
					if (!d.values) {
						d.values = [this._valueMin(), this._valueMin()]
					}
					if (d.values.length && d.values.length !== 2) {
						d.values = [d.values[0], d.values[0]]
					}
				} else {
					this.range = b("<div></div>")
				}
				this.range.appendTo(this.element).addClass("ui-slider-range");
				if (d.range === "min" || d.range === "max") {
					this.range.addClass("ui-slider-range-" + d.range)
				}
				this.range.addClass("ui-widget-header")
			}
			if (b(".ui-slider-handle", this.element).length === 0) {
				b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
			}
			if (d.values && d.values.length) {
				while (b(".ui-slider-handle", this.element).length < d.values.length) {
					b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
				}
			}
			this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
			this.handle = this.handles.eq(0);
			this.handles.add(this.range).filter("a").click(function (e) {
				e.preventDefault()
			}).hover(function () {
				if (!d.disabled) {
					b(this).addClass("ui-state-hover")
				}
			}, function () {
				b(this).removeClass("ui-state-hover")
			}).focus(function () {
				if (!d.disabled) {
					b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
					b(this).addClass("ui-state-focus")
				} else {
					b(this).blur()
				}
			}).blur(function () {
				b(this).removeClass("ui-state-focus")
			});
			this.handles.each(function (e) {
				b(this).data("index.ui-slider-handle", e)
			});
			this.handles.keydown(function (j) {
				var g = true, f = b(this).data("index.ui-slider-handle"), k, h, e, i;
				if (c.options.disabled) {
					return
				}
				switch (j.keyCode) {
					case b.ui.keyCode.HOME:
					case b.ui.keyCode.END:
					case b.ui.keyCode.PAGE_UP:
					case b.ui.keyCode.PAGE_DOWN:
					case b.ui.keyCode.UP:
					case b.ui.keyCode.RIGHT:
					case b.ui.keyCode.DOWN:
					case b.ui.keyCode.LEFT:
						g = false;
						if (!c._keySliding) {
							c._keySliding = true;
							b(this).addClass("ui-state-active");
							k = c._start(j, f);
							if (k === false) {
								return
							}
						}
						break
				}
				i = c.options.step;
				if (c.options.values && c.options.values.length) {
					h = e = c.values(f)
				} else {
					h = e = c.value()
				}
				switch (j.keyCode) {
					case b.ui.keyCode.HOME:
						e = c._valueMin();
						break;
					case b.ui.keyCode.END:
						e = c._valueMax();
						break;
					case b.ui.keyCode.PAGE_UP:
						e = c._trimAlignValue(h + ((c._valueMax() - c._valueMin()) / a));
						break;
					case b.ui.keyCode.PAGE_DOWN:
						e = c._trimAlignValue(h - ((c._valueMax() - c._valueMin()) / a));
						break;
					case b.ui.keyCode.UP:
					case b.ui.keyCode.RIGHT:
						if (h === c._valueMax()) {
							return
						}
						e = c._trimAlignValue(h + i);
						break;
					case b.ui.keyCode.DOWN:
					case b.ui.keyCode.LEFT:
						if (h === c._valueMin()) {
							return
						}
						e = c._trimAlignValue(h - i);
						break
				}
				c._slide(j, f, e);
				return g
			}).keyup(function (f) {
				var e = b(this).data("index.ui-slider-handle");
				if (c._keySliding) {
					c._keySliding = false;
					c._stop(f, e);
					c._change(f, e);
					b(this).removeClass("ui-state-active")
				}
			});
			this._refreshValue();
			this._animateOff = false
		},
		destroy: function () {
			this.handles.remove();
			this.range.remove();
			this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
			this._mouseDestroy();
			return this
		},
		_mouseCapture: function (e) {
			var f = this.options, i, k, d, g, m, j, l, h, c;
			if (f.disabled) {
				return false
			}
			this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
			this.elementOffset = this.element.offset();
			i = {x: e.pageX, y: e.pageY};
			k = this._normValueFromMouse(i);
			d = this._valueMax() - this._valueMin() + 1;
			m = this;
			this.handles.each(function (n) {
				var p = Math.abs(k - m.values(n));
				if (d > p) {
					d = p;
					g = b(this);
					j = n
				}
			});
			if (f.range === true && this.values(1) === f.min) {
				j += 1;
				g = b(this.handles[j])
			}
			l = this._start(e, j);
			if (l === false) {
				return false
			}
			this._mouseSliding = true;
			m._handleIndex = j;
			g.addClass("ui-state-active").focus();
			h = g.offset();
			c = !b(e.target).parents().andSelf().is(".ui-slider-handle");
			this._clickOffset = c ? {left: 0, top: 0} : {
				left: e.pageX - h.left - (g.width() / 2),
				top: e.pageY - h.top - (g.height() / 2) - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
			};
			k = this._normValueFromMouse(i);
			this._slide(e, j, k);
			this._animateOff = true;
			return true
		},
		_mouseStart: function (c) {
			return true
		},
		_mouseDrag: function (e) {
			var c = {x: e.pageX, y: e.pageY}, d = this._normValueFromMouse(c);
			this._slide(e, this._handleIndex, d);
			return false
		},
		_mouseStop: function (c) {
			this.handles.removeClass("ui-state-active");
			this._mouseSliding = false;
			this._stop(c, this._handleIndex);
			this._change(c, this._handleIndex);
			this._handleIndex = null;
			this._clickOffset = null;
			this._animateOff = false;
			return false
		},
		_detectOrientation: function () {
			this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function (d) {
			var c, g, f, e, h;
			if (this.orientation === "horizontal") {
				c = this.elementSize.width;
				g = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
			} else {
				c = this.elementSize.height;
				g = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
			}
			f = (g / c);
			if (f > 1) {
				f = 1
			}
			if (f < 0) {
				f = 0
			}
			if (this.orientation === "vertical") {
				f = 1 - f
			}
			e = this._valueMax() - this._valueMin();
			h = this._valueMin() + f * e;
			return this._trimAlignValue(h)
		},
		_start: function (e, d) {
			var c = {handle: this.handles[d], value: this.value()};
			if (this.options.values && this.options.values.length) {
				c.value = this.values(d);
				c.values = this.values()
			}
			return this._trigger("start", e, c)
		},
		_slide: function (g, f, e) {
			var c, d, h;
			if (this.options.values && this.options.values.length) {
				c = this.values(f ? 0 : 1);
				if ((this.options.values.length === 2 && this.options.range === true) && ((f === 0 && e > c) || (f === 1 && e < c))) {
					e = c
				}
				if (e !== this.values(f)) {
					d = this.values();
					d[f] = e;
					h = this._trigger("slide", g, {handle: this.handles[f], value: e, values: d});
					c = this.values(f ? 0 : 1);
					if (h !== false) {
						this.values(f, e, true)
					}
				}
			} else {
				if (e !== this.value()) {
					h = this._trigger("slide", g, {handle: this.handles[f], value: e});
					if (h !== false) {
						this.value(e)
					}
				}
			}
		},
		_stop: function (e, d) {
			var c = {handle: this.handles[d], value: this.value()};
			if (this.options.values && this.options.values.length) {
				c.value = this.values(d);
				c.values = this.values()
			}
			this._trigger("stop", e, c)
		},
		_change: function (e, d) {
			if (!this._keySliding && !this._mouseSliding) {
				var c = {handle: this.handles[d], value: this.value()};
				if (this.options.values && this.options.values.length) {
					c.value = this.values(d);
					c.values = this.values()
				}
				this._trigger("change", e, c)
			}
		},
		value: function (c) {
			if (arguments.length) {
				this.options.value = this._trimAlignValue(c);
				this._refreshValue();
				this._change(null, 0)
			}
			return this._value()
		},
		values: function (d, g) {
			var f, c, e;
			if (arguments.length > 1) {
				this.options.values[d] = this._trimAlignValue(g);
				this._refreshValue();
				this._change(null, d)
			}
			if (arguments.length) {
				if (b.isArray(arguments[0])) {
					f = this.options.values;
					c = arguments[0];
					for (e = 0; e < f.length; e += 1) {
						f[e] = this._trimAlignValue(c[e]);
						this._change(null, e)
					}
					this._refreshValue()
				} else {
					if (this.options.values && this.options.values.length) {
						return this._values(d)
					} else {
						return this.value()
					}
				}
			} else {
				return this._values()
			}
		},
		_setOption: function (d, e) {
			var c, f = 0;
			if (b.isArray(this.options.values)) {
				f = this.options.values.length
			}
			this._superApply("_setOption", arguments);
			switch (d) {
				case"disabled":
					if (e) {
						this.handles.filter(".ui-state-focus").blur();
						this.handles.removeClass("ui-state-hover");
						this.handles.attr("disabled", "disabled");
						this.element.addClass("ui-disabled")
					} else {
						this.handles.removeAttr("disabled");
						this.element.removeClass("ui-disabled")
					}
					break;
				case"orientation":
					this._detectOrientation();
					this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
					this._refreshValue();
					break;
				case"value":
					this._animateOff = true;
					this._refreshValue();
					this._change(null, 0);
					this._animateOff = false;
					break;
				case"values":
					this._animateOff = true;
					this._refreshValue();
					for (c = 0; c < f; c += 1) {
						this._change(null, c)
					}
					this._animateOff = false;
					break
			}
		},
		_value: function () {
			var c = this.options.value;
			c = this._trimAlignValue(c);
			return c
		},
		_values: function (c) {
			var f, e, d;
			if (arguments.length) {
				f = this.options.values[c];
				f = this._trimAlignValue(f);
				return f
			} else {
				e = this.options.values.slice();
				for (d = 0; d < e.length; d += 1) {
					e[d] = this._trimAlignValue(e[d])
				}
				return e
			}
		},
		_trimAlignValue: function (f) {
			if (f < this._valueMin()) {
				return this._valueMin()
			}
			if (f > this._valueMax()) {
				return this._valueMax()
			}
			var c = (this.options.step > 0) ? this.options.step : 1, e = f % c, d = f - e;
			if (Math.abs(e) * 2 >= c) {
				d += (e > 0) ? c : (-c)
			}
			return parseFloat(d.toFixed(5))
		},
		_valueMin: function () {
			return this.options.min
		},
		_valueMax: function () {
			return this.options.max
		},
		_refreshValue: function () {
			var f = this.options.range, e = this.options, l = this, d = (!this._animateOff) ? e.animate : false, g, c = {}, h, j, i, k;
			if (this.options.values && this.options.values.length) {
				this.handles.each(function (n, m) {
					g = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100;
					c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
					b(this).stop(1, 1)[d ? "animate" : "css"](c, e.animate);
					if (l.options.range === true) {
						if (l.orientation === "horizontal") {
							if (n === 0) {
								l.range.stop(1, 1)[d ? "animate" : "css"]({left: g + "%"}, e.animate)
							}
							if (n === 1) {
								l.range[d ? "animate" : "css"]({width: (g - h) + "%"}, {
									queue: false,
									duration: e.animate
								})
							}
						} else {
							if (n === 0) {
								l.range.stop(1, 1)[d ? "animate" : "css"]({bottom: (g) + "%"}, e.animate)
							}
							if (n === 1) {
								l.range[d ? "animate" : "css"]({height: (g - h) + "%"}, {
									queue: false,
									duration: e.animate
								})
							}
						}
					}
					h = g
				})
			} else {
				j = this.value();
				i = this._valueMin();
				k = this._valueMax();
				g = (k !== i) ? (j - i) / (k - i) * 100 : 0;
				c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
				this.handle.stop(1, 1)[d ? "animate" : "css"](c, e.animate);
				if (f === "min" && this.orientation === "horizontal") {
					this.range.stop(1, 1)[d ? "animate" : "css"]({width: g + "%"}, e.animate)
				}
				if (f === "max" && this.orientation === "horizontal") {
					this.range[d ? "animate" : "css"]({width: (100 - g) + "%"}, {queue: false, duration: e.animate})
				}
				if (f === "min" && this.orientation === "vertical") {
					this.range.stop(1, 1)[d ? "animate" : "css"]({height: g + "%"}, e.animate)
				}
				if (f === "max" && this.orientation === "vertical") {
					this.range[d ? "animate" : "css"]({height: (100 - g) + "%"}, {queue: false, duration: e.animate})
				}
			}
		}
	});
	b.extend(b.ui.slider, {version: "1.9m2"})
}(jQuery));
(function (d) {
	var c = 0, b = 0;

	function e() {
		return ++c
	}

	function a() {
		return ++b
	}

	d.widget("ui.tabs", {
		options: {
			add: null,
			ajaxOptions: null,
			cache: false,
			cookie: null,
			collapsible: false,
			disable: null,
			disabled: [],
			enable: null,
			event: "click",
			fx: null,
			idPrefix: "ui-tabs-",
			load: null,
			panelTemplate: "<div></div>",
			remove: null,
			select: null,
			show: null,
			spinner: "<em>Loading&#8230;</em>",
			tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
		}, _create: function () {
			this._tabify(true)
		}, _setOption: function (f, g) {
			if (f == "selected") {
				if (this.options.collapsible && g == this.options.selected) {
					return
				}
				this.select(g)
			} else {
				this.options[f] = g;
				this._tabify()
			}
		}, _tabId: function (f) {
			return f.title && f.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + e()
		}, _sanitizeSelector: function (f) {
			return f.replace(/:/g, "\\:")
		}, _cookie: function () {
			var f = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + a());
			return d.cookie.apply(null, [f].concat(d.makeArray(arguments)))
		}, _ui: function (g, f) {
			return {tab: g, panel: f, index: this.anchors.index(g)}
		}, _cleanup: function () {
			this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
				var f = d(this);
				f.html(f.data("label.tabs")).removeData("label.tabs")
			})
		}, _tabify: function (s) {
			this.list = this.element.find("ol,ul").eq(0);
			this.lis = d("li:has(a[href])", this.list);
			this.anchors = this.lis.map(function () {
				return d("a", this)[0]
			});
			this.panels = d([]);
			var u = this, h = this.options;
			var g = /^#.+/;
			this.anchors.each(function (x, v) {
				var w = d(v).attr("href");
				var y = w.split("#")[0], z;
				if (y && (y === location.toString().split("#")[0] || (z = d("base")[0]) && y === z.href)) {
					w = v.hash;
					v.href = w
				}
				if (g.test(w)) {
					u.panels = u.panels.add(u._sanitizeSelector(w))
				} else {
					if (w != "#") {
						d.data(v, "href.tabs", w);
						d.data(v, "load.tabs", w.replace(/#.*$/, ""));
						var B = u._tabId(v);
						v.href = "#" + B;
						var A = d("#" + B);
						if (!A.length) {
							A = d(h.panelTemplate).attr("id", B).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(u.panels[x - 1] || u.list);
							A.data("destroy.tabs", true)
						}
						u.panels = u.panels.add(A)
					} else {
						h.disabled.push(x)
					}
				}
			});
			if (s) {
				this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
				this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
				this.lis.addClass("ui-state-default ui-corner-top");
				this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
				if (h.selected === undefined) {
					if (location.hash) {
						this.anchors.each(function (w, v) {
							if (v.hash == location.hash) {
								h.selected = w;
								return false
							}
						})
					}
					if (typeof h.selected != "number" && h.cookie) {
						h.selected = parseInt(u._cookie(), 10)
					}
					if (typeof h.selected != "number" && this.lis.filter(".ui-tabs-selected").length) {
						h.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
					}
					h.selected = h.selected || (this.lis.length ? 0 : -1)
				} else {
					if (h.selected === null) {
						h.selected = -1
					}
				}
				h.selected = ((h.selected >= 0 && this.anchors[h.selected]) || h.selected < 0) ? h.selected : 0;
				h.disabled = d.unique(h.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function (w, v) {
					return u.lis.index(w)
				}))).sort();
				if (d.inArray(h.selected, h.disabled) != -1) {
					h.disabled.splice(d.inArray(h.selected, h.disabled), 1)
				}
				this.panels.addClass("ui-tabs-hide");
				this.lis.removeClass("ui-tabs-selected ui-state-active");
				if (h.selected >= 0 && this.anchors.length) {
					this.panels.eq(h.selected).removeClass("ui-tabs-hide");
					this.lis.eq(h.selected).addClass("ui-tabs-selected ui-state-active");
					u.element.queue("tabs", function () {
						u._trigger("show", null, u._ui(u.anchors[h.selected], u.panels[h.selected]))
					});
					this.load(h.selected)
				}
				d(window).bind("unload", function () {
					u.lis.add(u.anchors).unbind(".tabs");
					u.lis = u.anchors = u.panels = null
				})
			} else {
				h.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
			}
			this.element[h.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
			if (h.cookie) {
				this._cookie(h.selected, h.cookie)
			}
			for (var l = 0, r; (r = this.lis[l]); l++) {
				d(r)[d.inArray(l, h.disabled) != -1 && !d(r).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
			}
			if (h.cache === false) {
				this.anchors.removeData("cache.tabs")
			}
			this.lis.add(this.anchors).unbind(".tabs");
			if (h.event != "mouseover") {
				var k = function (v, i) {
					if (i.is(":not(.ui-state-disabled)")) {
						i.addClass("ui-state-" + v)
					}
				};
				var n = function (v, i) {
					i.removeClass("ui-state-" + v)
				};
				this.lis.bind("mouseover.tabs", function () {
					k("hover", d(this))
				});
				this.lis.bind("mouseout.tabs", function () {
					n("hover", d(this))
				});
				this.anchors.bind("focus.tabs", function () {
					k("focus", d(this).closest("li"))
				});
				this.anchors.bind("blur.tabs", function () {
					n("focus", d(this).closest("li"))
				})
			}
			var f, m;
			if (h.fx) {
				if (d.isArray(h.fx)) {
					f = h.fx[0];
					m = h.fx[1]
				} else {
					f = m = h.fx
				}
			}
			function j(i, v) {
				i.css({display: ""});
				if (!d.support.opacity && v.opacity) {
					i[0].style.removeAttribute("filter")
				}
			}

			var p = m ? function (i, v) {
				d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
				v.hide().removeClass("ui-tabs-hide").animate(m, m.duration || "normal", function () {
					j(v, m);
					u._trigger("show", null, u._ui(i, v[0]))
				})
			} : function (i, v) {
				d(i).closest("li").addClass("ui-tabs-selected ui-state-active");
				v.removeClass("ui-tabs-hide");
				u._trigger("show", null, u._ui(i, v[0]))
			};
			var q = f ? function (v, i) {
				i.animate(f, f.duration || "normal", function () {
					u.lis.removeClass("ui-tabs-selected ui-state-active");
					i.addClass("ui-tabs-hide");
					j(i, f);
					u.element.dequeue("tabs")
				})
			} : function (v, i, w) {
				u.lis.removeClass("ui-tabs-selected ui-state-active");
				i.addClass("ui-tabs-hide");
				u.element.dequeue("tabs")
			};
			this.anchors.bind(h.event + ".tabs", function () {
				var v = this, x = d(this).closest("li"), i = u.panels.filter(":not(.ui-tabs-hide)"), w = d(u._sanitizeSelector(this.hash));
				if ((x.hasClass("ui-tabs-selected") && !h.collapsible) || x.hasClass("ui-state-disabled") || x.hasClass("ui-state-processing") || u._trigger("select", null, u._ui(this, w[0])) === false) {
					this.blur();
					return false
				}
				h.selected = u.anchors.index(this);
				u.abort();
				if (h.collapsible) {
					if (x.hasClass("ui-tabs-selected")) {
						h.selected = -1;
						if (h.cookie) {
							u._cookie(h.selected, h.cookie)
						}
						u.element.queue("tabs", function () {
							q(v, i)
						}).dequeue("tabs");
						this.blur();
						return false
					} else {
						if (!i.length) {
							if (h.cookie) {
								u._cookie(h.selected, h.cookie)
							}
							u.element.queue("tabs", function () {
								p(v, w)
							});
							u.load(u.anchors.index(this));
							this.blur();
							return false
						}
					}
				}
				if (h.cookie) {
					u._cookie(h.selected, h.cookie)
				}
				if (w.length) {
					if (i.length) {
						u.element.queue("tabs", function () {
							q(v, i)
						})
					}
					u.element.queue("tabs", function () {
						p(v, w)
					});
					u.load(u.anchors.index(this))
				} else {
					throw"jQuery UI Tabs: Mismatching fragment identifier."
				}
				if (d.browser.msie) {
					this.blur()
				}
			});
			this.anchors.bind("click.tabs", function () {
				return false
			})
		}, destroy: function () {
			var f = this.options;
			this.abort();
			this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
			this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
			this.anchors.each(function () {
				var g = d.data(this, "href.tabs");
				if (g) {
					this.href = g
				}
				var h = d(this).unbind(".tabs");
				d.each(["href", "load", "cache"], function (j, k) {
					h.removeData(k + ".tabs")
				})
			});
			this.lis.unbind(".tabs").add(this.panels).each(function () {
				if (d.data(this, "destroy.tabs")) {
					d(this).remove()
				} else {
					d(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
				}
			});
			if (f.cookie) {
				this._cookie(null, f.cookie)
			}
			return this
		}, add: function (i, h, g) {
			if (g === undefined) {
				g = this.anchors.length
			}
			var f = this, k = this.options, m = d(k.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, h)), l = !i.indexOf("#") ? i.replace("#", "") : this._tabId(d("a", m)[0]);
			m.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
			var j = d("#" + l);
			if (!j.length) {
				j = d(k.panelTemplate).attr("id", l).data("destroy.tabs", true)
			}
			j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
			if (g >= this.lis.length) {
				m.appendTo(this.list);
				j.appendTo(this.list[0].parentNode)
			} else {
				m.insertBefore(this.lis[g]);
				j.insertBefore(this.panels[g])
			}
			k.disabled = d.map(k.disabled, function (q, p) {
				return q >= g ? ++q : q
			});
			this._tabify();
			if (this.anchors.length == 1) {
				k.selected = 0;
				m.addClass("ui-tabs-selected ui-state-active");
				j.removeClass("ui-tabs-hide");
				this.element.queue("tabs", function () {
					f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
				});
				this.load(0)
			}
			this._trigger("add", null, this._ui(this.anchors[g], this.panels[g]));
			return this
		}, remove: function (f) {
			var h = this.options, i = this.lis.eq(f).remove(), g = this.panels.eq(f).remove();
			if (i.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
				this.select(f + (f + 1 < this.anchors.length ? 1 : -1))
			}
			h.disabled = d.map(d.grep(h.disabled, function (k, j) {
				return k != f
			}), function (k, j) {
				return k >= f ? --k : k
			});
			this._tabify();
			this._trigger("remove", null, this._ui(i.find("a")[0], g[0]));
			return this
		}, enable: function (f) {
			var g = this.options;
			if (d.inArray(f, g.disabled) == -1) {
				return
			}
			this.lis.eq(f).removeClass("ui-state-disabled");
			g.disabled = d.grep(g.disabled, function (j, h) {
				return j != f
			});
			this._trigger("enable", null, this._ui(this.anchors[f], this.panels[f]));
			return this
		}, disable: function (g) {
			var f = this, h = this.options;
			if (g != h.selected) {
				this.lis.eq(g).addClass("ui-state-disabled");
				h.disabled.push(g);
				h.disabled.sort();
				this._trigger("disable", null, this._ui(this.anchors[g], this.panels[g]))
			}
			return this
		}, select: function (f) {
			if (typeof f == "string") {
				f = this.anchors.index(this.anchors.filter("[href$=" + f + "]"))
			} else {
				if (f === null) {
					f = -1
				}
			}
			if (f == -1 && this.options.collapsible) {
				f = this.options.selected
			}
			this.anchors.eq(f).trigger(this.options.event + ".tabs");
			return this
		}, load: function (i) {
			var g = this, k = this.options, f = this.anchors.eq(i)[0], h = d.data(f, "load.tabs");
			this.abort();
			if (!h || this.element.queue("tabs").length !== 0 && d.data(f, "cache.tabs")) {
				this.element.dequeue("tabs");
				return
			}
			this.lis.eq(i).addClass("ui-state-processing");
			if (k.spinner) {
				var j = d("span", f);
				j.data("label.tabs", j.html()).html(k.spinner)
			}
			this.xhr = d.ajax(d.extend({}, k.ajaxOptions, {
				url: h, success: function (m, l) {
					d(g._sanitizeSelector(f.hash)).html(m);
					g._cleanup();
					if (k.cache) {
						d.data(f, "cache.tabs", true)
					}
					g._trigger("load", null, g._ui(g.anchors[i], g.panels[i]));
					try {
						k.ajaxOptions.success(m, l)
					} catch (n) {
					}
				}, error: function (n, l, m) {
					g._cleanup();
					g._trigger("load", null, g._ui(g.anchors[i], g.panels[i]));
					try {
						k.ajaxOptions.error(n, l, i, f)
					} catch (m) {
					}
				}
			}));
			g.element.dequeue("tabs");
			return this
		}, abort: function () {
			this.element.queue([]);
			this.panels.stop(false, true);
			this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
			if (this.xhr) {
				this.xhr.abort();
				delete this.xhr
			}
			this._cleanup();
			return this
		}, url: function (g, f) {
			this.anchors.eq(g).removeData("cache.tabs").data("load.tabs", f);
			return this
		}, length: function () {
			return this.anchors.length
		}
	});
	d.extend(d.ui.tabs, {version: "1.9m2"});
	d.extend(d.ui.tabs.prototype, {
		rotation: null, rotate: function (h, j) {
			var f = this, k = this.options;
			var g = f._rotate || (f._rotate = function (l) {
					clearTimeout(f.rotation);
					f.rotation = setTimeout(function () {
						var m = k.selected;
						f.select(++m < f.anchors.length ? m : 0)
					}, h);
					if (l) {
						l.stopPropagation()
					}
				});
			var i = f._unrotate || (f._unrotate = !j ? function (l) {
					if (l.clientX) {
						f.rotate(null)
					}
				} : function (l) {
					t = k.selected;
					g()
				});
			if (h) {
				this.element.bind("tabsshow", g);
				this.anchors.bind(k.event + ".tabs", i);
				g()
			} else {
				clearTimeout(f.rotation);
				this.element.unbind("tabsshow", g);
				this.anchors.unbind(k.event + ".tabs", i);
				delete this._rotate;
				delete this._unrotate
			}
			return this
		}
	})
})(jQuery);
(function (b) {
	if (!b(document.body).is("[role]")) {
		b(document.body).attr("role", "application")
	}
	var a = 0;
	b.widget("ui.tooltip", {
		options: {
			tooltipClass: "ui-widget-content", content: function () {
				return b(this).attr("title")
			}, position: {my: "left center", at: "right center", offset: "15 0"}
		}, _init: function () {
			var c = this;
			this.tooltip = b("<div></div>").attr("id", "ui-tooltip-" + a++).attr("role", "tooltip").attr("aria-hidden", "true").addClass("ui-tooltip ui-widget ui-corner-all").addClass(this.options.tooltipClass).appendTo(document.body).hide();
			this.tooltipContent = b("<div></div>").addClass("ui-tooltip-content").appendTo(this.tooltip);
			this.opacity = this.tooltip.css("opacity");
			this.element.bind("focus.tooltip mouseenter.tooltip", function (d) {
				c.open(d)
			}).bind("blur.tooltip mouseleave.tooltip", function (d) {
				c.close(d)
			})
		}, enable: function () {
			this.options.disabled = false
		}, disable: function () {
			this.options.disabled = true
		}, destroy: function () {
			this.tooltip.remove();
			b.Widget.prototype.destroy.apply(this, arguments)
		}, widget: function () {
			return this.tooltip
		}, open: function (e) {
			var f = this.element;
			if (this.current && this.current[0] == f[0]) {
				return
			}
			var c = this;
			this.current = f;
			this.currentTitle = f.attr("title");
			var d = this.options.content.call(f[0], function (g) {
				if (c.current == f) {
					c._show(e, f, g)
				}
			});
			if (d) {
				c._show(e, f, d)
			}
		}, _show: function (d, e, c) {
			if (!c) {
				return
			}
			e.attr("title", "");
			if (this.options.disabled) {
				return
			}
			this.tooltipContent.html(c);
			this.tooltip.css({top: 0, left: 0}).show().position(b.extend(this.options.position, {of: e})).hide();
			this.tooltip.attr("aria-hidden", "false");
			e.attr("aria-describedby", this.tooltip.attr("id"));
			if (this.tooltip.is(":animated")) {
				this.tooltip.stop().show().fadeTo("normal", this.opacity)
			} else {
				this.tooltip.is(":visible") ? this.tooltip.fadeTo("normal", this.opacity) : this.tooltip.fadeIn()
			}
			this._trigger("open", d)
		}, close: function (c) {
			if (!this.current) {
				return
			}
			var d = this.current.attr("title", this.currentTitle);
			this.current = null;
			if (this.options.disabled) {
				return
			}
			d.removeAttr("aria-describedby");
			this.tooltip.attr("aria-hidden", "true");
			if (this.tooltip.is(":animated")) {
				this.tooltip.stop().fadeTo("normal", 0, function () {
					b(this).hide().css("opacity", "")
				})
			} else {
				this.tooltip.stop().fadeOut()
			}
			this._trigger("close", c)
		}
	})
})(jQuery);

//jquery.keypad.min.js
(function (c) {
	function q() {
		this._curInst = null;
		this._disabledFields = [];
		this._keypadShowing = !1;
		this._keyCode = 0;
		this._specialKeys = [];
		this.addKeyDef("CLOSE", "close", function (a) {
			c.keypad._curInst = a._inline ? a : c.keypad._curInst;
			c.keypad._hideKeypad()
		});
		this.addKeyDef("CLEAR", "clear", function (a) {
			c.keypad._clearValue(a)
		});
		this.addKeyDef("BACK", "back", function (a) {
			c.keypad._backValue(a)
		});
		this.addKeyDef("SHIFT", "shift", function (a) {
			c.keypad._shiftKeypad(a)
		});
		this.addKeyDef("SPACE_BAR", "spacebar", function (a) {
			c.keypad._selectValue(a,
				" ")
		}, !0);
		this.addKeyDef("SPACE", "space");
		this.addKeyDef("HALF_SPACE", "half-space");
		this.addKeyDef("ENTER", "enter", function (a) {
			c.keypad._selectValue(a, "\r")
		}, !0);
		this.addKeyDef("TAB", "tab", function (a) {
			c.keypad._selectValue(a, "\t")
		}, !0);
		this.qwertyAlphabetic = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
		this.qwertyLayout = ["!@#$%^&*()_=" + this.HALF_SPACE + this.SPACE + this.CLOSE, this.HALF_SPACE + "`~[]{}<>\\|/" + this.SPACE + "789", "qwertyuiop'\"" + this.HALF_SPACE + "456", this.HALF_SPACE + "asdfghjkl;:" + this.SPACE + "123", this.SPACE +
		"zxcvbnm,.?" + this.SPACE + this.HALF_SPACE + "-0+", "" + this.TAB + this.ENTER + this.SPACE_BAR + this.SHIFT + this.HALF_SPACE + this.BACK + this.CLEAR];
		this.regional = [];
		this.regional[""] = {
			buttonText: "...",
			buttonStatus: "Open the keypad",
			closeText: "Close",
			closeStatus: "Close the keypad",
			clearText: "Clear",
			clearStatus: "Erase all the text",
			backText: "Back",
			backStatus: "Erase the previous character",
			spacebarText: "&nbsp;",
			spacebarStatus: "Space",
			enterText: "Enter",
			enterStatus: "Carriage return",
			tabText: "\ufffd\ufffd",
			tabStatus: "Horizontal tab",
			shiftText: "Shift",
			shiftStatus: "Toggle upper/lower case characters",
			alphabeticLayout: this.qwertyAlphabetic,
			fullLayout: this.qwertyLayout,
			isAlphabetic: this.isAlphabetic,
			isNumeric: this.isNumeric,
			isRTL: !1
		};
		this._defaults = {
			showOn: "focus",
			buttonImage: "",
			buttonImageOnly: !1,
			showAnim: "show",
			showOptions: {},
			duration: "normal",
			appendText: "",
			useThemeRoller: !1,
			keypadClass: "",
			prompt: "",
			layout: ["123" + this.CLOSE, "456" + this.CLEAR, "789" + this.BACK, this.SPACE + "0"],
			separator: "",
			target: null,
			keypadOnly: !0,
			randomiseAlphabetic: !1,
			randomiseNumeric: !1,
			randomiseOther: !1,
			randomiseAll: !1,
			beforeShow: null,
			onKeypress: null,
			onClose: null
		};
		c.extend(this._defaults, this.regional[""]);
		this.mainDiv = c('<div class="' + this._mainDivClass + '" style="display: none;"></div>')
	}

	function r(a, b) {
		c.extend(a, b);
		for (var d in b)if (b[d] == null || b[d] == void 0)a[d] = b[d];
		return a
	}

	c.extend(q.prototype, {
		markerClassName: "hasKeypad",
		_mainDivClass: "keypad-popup",
		_inlineClass: "keypad-inline",
		_appendClass: "keypad-append",
		_triggerClass: "keypad-trigger",
		_disableClass: "keypad-disabled",
		_inlineEntryClass: "keypad-keyentry",
		_coverClass: "keypad-cover",
		setDefaults: function (a) {
			r(this._defaults, a || {});
			return this
		},
		addKeyDef: function (a, b, c, e) {
			if (this._keyCode == 32)throw"Only 32 special keys allowed";
			this[a] = String.fromCharCode(this._keyCode++);
			this._specialKeys.push({code: this[a], id: a, name: b, action: c, noHighlight: e});
			return this
		},
		_attachKeypad: function (a, b) {
			var d = a.nodeName.toLowerCase() != "input" && a.nodeName.toLowerCase() != "textarea", e = {
				_inline: d, _mainDiv: d ? c('<div class="' + this._inlineClass +
					'"></div>') : c.keypad.mainDiv, ucase: !1
			};
			e.settings = c.extend({}, b || {});
			this._setInput(a, e);
			this._connectKeypad(a, e);
			d ? (c(a).append(e._mainDiv).bind("click.keypad", function () {
				e._input.focus()
			}), this._updateKeypad(e)) : c(a).is(":disabled") && this._disableKeypad(a)
		},
		_setInput: function (a, b) {
			b._input = c(!b._inline ? a : this._get(b, "target") || '<input type="text" class="' + this._inlineEntryClass + '" disabled="disabled"/>');
			b._inline && (a = c(a), a.find("input").remove(), this._get(b, "target") || a.append(b._input))
		},
		_connectKeypad: function (a,
								  b) {
			var d = c(a);
			if (!d.hasClass(this.markerClassName)) {
				var e = this._get(b, "appendText"), f = this._get(b, "isRTL");
				if (e)d[f ? "before" : "after"]('<span class="' + this._appendClass + '">' + e + "</span>");
				if (!b._inline && (e = this._get(b, "showOn"), (e == "focus" || e == "both") && d.focus(this._showKeypad).keydown(this._doKeyDown), e == "button" || e == "both")) {
					var e = this._get(b, "buttonText"), h = this._get(b, "buttonStatus"), g = this._get(b, "buttonImage"), e = c(this._get(b, "buttonImageOnly") ? c('<img src="' + g + '" alt="' + h + '" title="' + h + '"/>') :
						c('<button type="button" title="' + h + '"></button>').html(g == "" ? e : c('<img src="' + g + '" alt="' + h + '" title="' + h + '"/>')));
					d[f ? "before" : "after"](e);
					e.addClass(this._triggerClass).click(function () {
						c.keypad._keypadShowing && c.keypad._lastField == a ? c.keypad._hideKeypad() : c.keypad._showKeypad(a);
						return !1
					})
				}
				b.saveReadonly = d.attr("readonly");
				d.addClass(this.markerClassName).attr("readonly", this._get(b, "keypadOnly") ? "readonly" : "").bind("setData.keypad", function (a, c, d) {
					b.settings[c] = d
				}).bind("getData.keypad", function (a,
													c) {
					return this._get(b, c)
				});
				c.data(a, "keypad", b)
			}
		},
		_destroyKeypad: function (a) {
			var b = c(a);
			if (b.hasClass(this.markerClassName)) {
				var d = c.data(a, "keypad");
				this._curInst == d && this._hideKeypad();
				b.siblings("." + this._appendClass).remove().end().siblings("." + this._triggerClass).remove().end().prev("." + this._inlineEntryClass).remove();
				b.empty().unbind("focus", this._showKeypad).removeClass(this.markerClassName).attr("readonly", d.saveReadonly);
				c.removeData(d._input[0], "keypad");
				c.removeData(a, "keypad")
			}
		},
		_enableKeypad: function (a) {
			var b =
				c(a);
			if (b.hasClass(this.markerClassName)) {
				var d = a.nodeName.toLowerCase();
				if (d == "input" || d == "textarea")a.disabled = !1, b.siblings("button." + this._triggerClass).each(function () {
					this.disabled = !1
				}).end().siblings("img." + this._triggerClass).css({
					opacity: "1.0",
					cursor: ""
				}); else if (d == "div" || d == "span")b.children("." + this._disableClass).remove(), c.data(a, "keypad")._mainDiv.find("button").attr("disabled", "");
				this._disabledFields = c.map(this._disabledFields, function (b) {
					return b == a ? null : b
				})
			}
		},
		_disableKeypad: function (a) {
			var b =
				c(a);
			if (b.hasClass(this.markerClassName)) {
				var d = a.nodeName.toLowerCase();
				if (d == "input" || d == "textarea")a.disabled = !0, b.siblings("button." + this._triggerClass).each(function () {
					this.disabled = !0
				}).end().siblings("img." + this._triggerClass).css({
					opacity: "0.5",
					cursor: "default"
				}); else if (d == "div" || d == "span") {
					var d = b.children("." + this._inlineClass), e = d.offset(), f = {left: 0, top: 0};
					d.parents().each(function () {
						if (c(this).css("position") == "relative")return f = c(this).offset(), !1
					});
					b.prepend('<div class="' + this._disableClass +
						'" style="width: ' + d.outerWidth() + "px; height: " + d.outerHeight() + "px; left: " + (e.left - f.left) + "px; top: " + (e.top - f.top) + 'px;"></div>');
					c.data(a, "keypad")._mainDiv.find("button").attr("disabled", "disabled")
				}
				this._disabledFields = c.map(this._disabledFields, function (b) {
					return b == a ? null : b
				});
				this._disabledFields[this._disabledFields.length] = a
			}
		},
		_isDisabledKeypad: function (a) {
			return a && c.inArray(a, this._disabledFields) > -1
		},
		_changeKeypad: function (a, b, d) {
			var e = b || {};
			typeof b == "string" && (e = {}, e[b] = d);
			if (b = c.data(a,
					"keypad"))this._curInst == b && this._hideKeypad(), r(b.settings, e), this._setInput(c(a), b), this._updateKeypad(b)
		},
		_showKeypad: function (a) {
			a = a.target || a;
			if (!(c.keypad._isDisabledKeypad(a) || c.keypad._lastField == a)) {
				var b = c.data(a, "keypad");
				c.keypad._hideKeypad(null, "");
				c.keypad._lastField = a;
				c.keypad._pos = c.keypad._findPos(a);
				c.keypad._pos[1] += a.offsetHeight;
				var d = !1;
				c(a).parents().each(function () {
					d |= c(this).css("position") == "fixed";
					return !d
				});
				d && c.browser.opera && (c.keypad._pos[0] -= document.documentElement.scrollLeft,
					c.keypad._pos[1] -= document.documentElement.scrollTop);
				a = {left: c.keypad._pos[0], top: c.keypad._pos[1]};
				c.keypad._pos = null;
				b._mainDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px",
					width: c.browser.opera ? "1000px" : "auto"
				});
				c.keypad._updateKeypad(b);
				a = c.keypad._checkOffset(b, a, d);
				b._mainDiv.css({
					position: d ? "fixed" : "absolute",
					display: "none",
					left: a.left + "px",
					top: a.top + "px"
				});
				var a = c.keypad._get(b, "showAnim"), e = c.keypad._get(b, "duration"), e = e == "normal" && c.ui && c.ui.version >= "1.8" ? "_default" : e, f = function () {
					c.keypad._keypadShowing = !0;
					var a = c.keypad._getBorders(b._mainDiv);
					b._mainDiv.find("iframe." + c.keypad._coverClass).css({
						left: -a[0],
						top: -a[1],
						width: b._mainDiv.outerWidth(),
						height: b._mainDiv.outerHeight()
					})
				};
				if (c.effects && c.effects[a]) {
					var h = b._mainDiv.data(), g;
					for (g in h)g.match(/^ec\.storage\./) && (h[g] = b._mainDiv.css(g.replace(/ec\.storage\./, "")));
					b._mainDiv.data(h).show(a, c.keypad._get(b, "showOptions"), e, f)
				} else b._mainDiv[a || "show"](a ? e : "", f);
				a || f();
				b._input[0].type != "hidden" && b._input[0].focus();
				c.keypad._curInst = b
			}
		},
		_updateKeypad: function (a) {
			var b = this._getBorders(a._mainDiv);
			a._mainDiv.empty().append(this._generateHTML(a)).find("iframe." + this._coverClass).css({
				left: -b[0],
				top: -b[1],
				width: a._mainDiv.outerWidth(),
				height: a._mainDiv.outerHeight()
			});
			a._mainDiv.removeClass().addClass(this._get(a, "keypadClass") + (this._get(a, "useThemeRoller") ? " ui-widget ui-widget-content" : "") + (this._get(a, "isRTL") ? " keypad-rtl" : "") + " " + (a._inline ? this._inlineClass : this._mainDivClass));
			(b = this._get(a, "beforeShow")) && b.apply(a._input ?
				a._input[0] : null, [a._mainDiv, a])
		},
		_getBorders: function (a) {
			var b = function (a) {
				var b = c.browser.msie ? 1 : 0;
				return {thin: 1 + b, medium: 3 + b, thick: 5 + b}[a] || a
			};
			return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
		},
		_checkOffset: function (a, b, d) {
			var e = a._input ? this._findPos(a._input[0]) : null, f = window.innerWidth || document.documentElement.clientWidth || document.documentElement.scrollWidth, h = window.innerHeight || document.documentElement.clientHeight || document.documentElement.scrollHeight,
				g = document.documentElement.scrollLeft || document.body.scrollLeft, j = document.documentElement.scrollTop || document.body.scrollTop;
			if (c.browser.msie && parseInt(c.browser.version, 10) < 7 || c.browser.opera) {
				var k = 0;
				a._mainDiv.find(":not(div,iframe)").each(function () {
					k = Math.max(k, this.offsetLeft + c(this).outerWidth() + parseInt(c(this).css("margin-right"), 10))
				});
				a._mainDiv.css("width", k)
			}
			this._get(a, "isRTL") || b.left + a._mainDiv.outerWidth() - g > f ? b.left = Math.max(d ? 0 : g, e[0] + (a._input ? a._input.outerWidth() : 0) - (d ? g : 0) -
				a._mainDiv.outerWidth() - (d && c.browser.opera ? document.documentElement.scrollLeft : 0)) : b.left -= d ? g : 0;
			b.top + a._mainDiv.outerHeight() - j > h ? b.top = Math.max(d ? 0 : j, e[1] - (d ? j : 0) - a._mainDiv.outerHeight() - (d && c.browser.opera ? document.documentElement.scrollTop : 0)) : b.top -= d ? j : 0;
			return b
		},
		_findPos: function (a) {
			for (; a && (a.type == "hidden" || a.nodeType != 1);)a = a.nextSibling;
			a = c(a).offset();
			return [a.left, a.top]
		},
		_hideKeypad: function (a, b) {
			var d = this._curInst;
			if (d && !(a && d != c.data(a, "keypad"))) {
				if (this._keypadShowing) {
					var b =
						b != null ? b : this._get(d, "duration"), b = b == "normal" && c.ui && c.ui.version >= "1.8" ? "_default" : b, e = this._get(d, "showAnim");
					if (c.effects && c.effects[e])d._mainDiv.hide(e, this._get(d, "showOptions"), b); else d._mainDiv[e == "slideDown" ? "slideUp" : e == "fadeIn" ? "fadeOut" : "hide"](e ? b : "")
				}
				(e = this._get(d, "onClose")) && e.apply(d._input ? d._input[0] : null, [d._input.val(), d]);
				if (this._keypadShowing)this._keypadShowing = !1, this._lastField = null;
				d._inline && d._input.val("");
				this._curInst = null
			}
		},
		_doKeyDown: function (a) {
			a.keyCode == 9 &&
			(c.keypad.mainDiv.stop(!0, !0), c.keypad._hideKeypad())
		},
		_checkExternalClick: function (a) {
			c.keypad._curInst && (a = c(a.target), !a.parents().andSelf().is("." + c.keypad._mainDivClass) && !a.hasClass(c.keypad.markerClassName) && !a.parents().andSelf().hasClass(c.keypad._triggerClass) && c.keypad._keypadShowing && c.keypad._hideKeypad())
		},
		_shiftKeypad: function (a) {
			a.ucase = !a.ucase;
			this._updateKeypad(a);
			a._input.focus()
		},
		_clearValue: function (a) {
			this._setValue(a, "", 0);
			this._notifyKeypress(a, c.keypad.DEL)
		},
		_backValue: function (a) {
			var b =
				a._input[0], d = a._input.val(), e = [d.length, d.length];
			b.setSelectionRange ? e = a._input.attr("readonly") || a._input.attr("disabled") ? e : [b.selectionStart, b.selectionEnd] : b.createTextRange && (e = a._input.attr("readonly") || a._input.attr("disabled") ? e : this._getIERange(b));
			this._setValue(a, d.length == 0 ? "" : d.substr(0, e[0] - 1) + d.substr(e[1]), e[0] - 1);
			this._notifyKeypress(a, c.keypad.BS)
		},
		_selectValue: function (a, b) {
			this.insertValue(a._input[0], b);
			this._setValue(a, a._input.val());
			this._notifyKeypress(a, b)
		},
		insertValue: function (a,
							   b) {
			var a = a.jquery ? a : c(a), d = a[0], e = a.val(), f = [e.length, e.length];
			d.setSelectionRange ? f = a.attr("readonly") || a.attr("disabled") ? f : [d.selectionStart, d.selectionEnd] : d.createTextRange && (f = a.attr("readonly") || a.attr("disabled") ? f : this._getIERange(d));
			a.val(e.substr(0, f[0]) + b + e.substr(f[1]));
			pos = f[0] + b.length;
			a.is(":visible") && a.focus();
			d.setSelectionRange ? a.is(":visible") && d.setSelectionRange(pos, pos) : d.createTextRange && (f = d.createTextRange(), f.move("character", pos), f.select())
		},
		_getIERange: function (a) {
			a.focus();
			var b = document.selection.createRange().duplicate(), c = this._getIETextRange(a);
			c.setEndPoint("EndToStart", b);
			a = function (a) {
				for (var b = a.text, c = b; ;)if (a.compareEndPoints("StartToEnd", a) == 0)break; else if (a.moveEnd("character", -1), a.text == b)c += "\r\n"; else break;
				return c
			};
			c = a(c);
			b = a(b);
			return [c.length, c.length + b.length]
		},
		_getIETextRange: function (a) {
			var b = a.nodeName.toLowerCase() == "input", c = b ? a.createTextRange() : document.body.createTextRange();
			b || c.moveToElementText(a);
			return c
		},
		_setValue: function (a, b) {
			var c =
				a._input.attr("maxlength");
			c > -1 && (b = b.substr(0, c));
			a._input.val(b);
			this._get(a, "onKeypress") || a._input.trigger("change")
		},
		_notifyKeypress: function (a, b) {
			var c = this._get(a, "onKeypress");
			c && c.apply(a._input ? a._input[0] : null, [b, a._input.val(), a])
		},
		_get: function (a, b) {
			return a.settings[b] !== void 0 ? a.settings[b] : this._defaults[b]
		},
		_generateHTML: function (a) {
			var b = this._get(a, "useThemeRoller");
			this._get(a, "isRTL");
			for (var d = this._get(a, "prompt"), e = this._get(a, "separator"), f = !d ? "" : '<div class="keypad-prompt' +
			(b ? " ui-widget-header ui-corner-all" : "") + '">' + d + "</div>", d = this._randomiseLayout(a), h = 0; h < d.length; h++) {
				f += '<div class="keypad-row">';
				for (var g = d[h].split(e), j = 0; j < g.length; j++) {
					a.ucase && (g[j] = g[j].toUpperCase());
					var k = this._specialKeys[g[j].charCodeAt(0)];
					f += k ? k.action ? '<button type="button" class="keypad-special keypad-' + k.name + (b ? " ui-corner-all ui-state-default" + (k.noHighlight ? "" : " ui-state-highlight") : "") + '" title="' + this._get(a, k.name + "Status") + '">' + (this._get(a, k.name + "Text") || "&nbsp;") + "</button>" :
					'<div class="keypad-' + k.name + '"></div>' : '<button type="button" class="keypad-key' + (b ? " ui-corner-all ui-state-default" : "") + '">' + (g[j] == " " ? "&nbsp;" : g[j]) + "</button>"
				}
				f += "</div>"
			}
			f += '<div style="clear: both;"></div>' + (!a._inline && c.browser.msie && parseInt(c.browser.version, 10) < 7 ? '<iframe src="javascript:false;" class="' + c.keypad._coverClass + '"></iframe>' : "");
			var f = c(f), n = "keypad-key-down" + (b ? " ui-state-active" : "");
			f.find("button").mousedown(function () {
				c(this).addClass(n)
			}).mouseup(function () {
				c(this).removeClass(n)
			}).mouseout(function () {
				c(this).removeClass(n)
			}).filter(".keypad-key").click(function () {
				c.keypad._selectValue(a,
					c(this).text())
			});
			c.each(this._specialKeys, function (b, c) {
				f.find(".keypad-" + c.name).click(function () {
					c.action.apply(a._input, [a])
				})
			});
			return f
		},
		_randomiseLayout: function (a) {
			var b = this._get(a, "randomiseNumeric"), c = this._get(a, "randomiseAlphabetic"), e = this._get(a, "randomiseOther"), f = this._get(a, "randomiseAll"), h = this._get(a, "layout");
			if (!b && !c && !e && !f)return h;
			for (var g = this._get(a, "isNumeric"), j = this._get(a, "isAlphabetic"), a = this._get(a, "separator"), k = [], n = [], o = [], p = [], m = 0; m < h.length; m++) {
				p[m] = "";
				for (var l =
					h[m].split(a), i = 0; i < l.length; i++)this._isControl(l[i]) || (f ? o.push(l[i]) : g(l[i]) ? k.push(l[i]) : j(l[i]) ? n.push(l[i]) : o.push(l[i]))
			}
			b && this._shuffle(k);
			c && this._shuffle(n);
			(e || f) && this._shuffle(o);
			for (m = e = c = b = 0; m < h.length; m++) {
				l = h[m].split(a);
				for (i = 0; i < l.length; i++)p[m] += (this._isControl(l[i]) ? l[i] : f ? o[e++] : g(l[i]) ? k[b++] : j(l[i]) ? n[c++] : o[e++]) + a
			}
			return p
		},
		_isControl: function (a) {
			return a < " "
		},
		isAlphabetic: function (a) {
			return a >= "A" && a <= "Z" || a >= "a" && a <= "z"
		},
		isNumeric: function (a) {
			return a >= "0" && a <= "9"
		},
		_shuffle: function (a) {
			for (var b = a.length - 1; b > 0; b--) {
				var c = Math.floor(Math.random() * a.length), e = a[b];
				a[b] = a[c];
				a[c] = e
			}
		}
	});
	c.fn.keypad = function (a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return a == "isDisabled" ? c.keypad["_" + a + "Keypad"].apply(c.keypad, [this[0]].concat(b)) : this.each(function () {
			typeof a == "string" ? c.keypad["_" + a + "Keypad"].apply(c.keypad, [this].concat(b)) : c.keypad._attachKeypad(this, a)
		})
	};
	c.keypad = new q;
	c(function () {
		c(document.body).append(c.keypad.mainDiv).mousedown(c.keypad._checkExternalClick)
	})
})(jQuery);

/**
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 **/
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (b) {
		for (var d = "", c, a, f, g, h, e, i = 0, b = Base64._utf8_encode(b); i < b.length;)c = b.charCodeAt(i++), a = b.charCodeAt(i++), f = b.charCodeAt(i++), g = c >> 2, c = (c & 3) << 4 | a >> 4, h = (a & 15) << 2 | f >> 6, e = f & 63, isNaN(a) ? h = e = 64 : isNaN(f) && (e = 64), d = d + this._keyStr.charAt(g) + this._keyStr.charAt(c) + this._keyStr.charAt(h) + this._keyStr.charAt(e);
		return d
	}, decode: function (b) {
		for (var d = "", c, a, f, g, h, e = 0, b = b.replace(/[^A-Za-z0-9\+\/\=]/g, ""); e <
		b.length;)c = this._keyStr.indexOf(b.charAt(e++)), a = this._keyStr.indexOf(b.charAt(e++)), g = this._keyStr.indexOf(b.charAt(e++)), h = this._keyStr.indexOf(b.charAt(e++)), c = c << 2 | a >> 4, a = (a & 15) << 4 | g >> 2, f = (g & 3) << 6 | h, d += String.fromCharCode(c), g != 64 && (d += String.fromCharCode(a)), h != 64 && (d += String.fromCharCode(f));
		return d = Base64._utf8_decode(d)
	}, _utf8_encode: function (b) {
		for (var b = b.replace(/\r\n/g, "\n"), d = "", c = 0; c < b.length; c++) {
			var a = b.charCodeAt(c);
			a < 128 ? d += String.fromCharCode(a) : (a > 127 && a < 2048 ? d += String.fromCharCode(a >>
				6 | 192) : (d += String.fromCharCode(a >> 12 | 224), d += String.fromCharCode(a >> 6 & 63 | 128)), d += String.fromCharCode(a & 63 | 128))
		}
		return d
	}, _utf8_decode: function (b) {
		for (var d = "", c = 0, a = c1 = c2 = 0; c < b.length;)a = b.charCodeAt(c), a < 128 ? (d += String.fromCharCode(a), c++) : a > 191 && a < 224 ? (c2 = b.charCodeAt(c + 1), d += String.fromCharCode((a & 31) << 6 | c2 & 63), c += 2) : (c2 = b.charCodeAt(c + 1), c3 = b.charCodeAt(c + 2), d += String.fromCharCode((a & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
		return d
	}
};

//jquery.maskedinput-1.2.2.min.js
(function (c) {
	var a = (/msie/.test(navigator.userAgent.toLowerCase())? "paste" : "input") + ".mask";
	var b = (window.orientation != undefined);
	c.mask = {definitions: {"9": "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"}};
	c.fn.extend({
		caret: function (f, d) {
			if (this.length == 0) {
				return
			}
			if (typeof f == "number") {
				d = (typeof d == "number") ? d : f;
				return this.each(function () {
					if (this.setSelectionRange) {
						this.focus();
						this.setSelectionRange(f, d)
					} else {
						if (this.createTextRange) {
							var g = this.createTextRange();
							g.collapse(true);
							g.moveEnd("character", d);
							g.moveStart("character", f);
							g.select()
						}
					}
				})
			} else {
				if (this[0].setSelectionRange) {
					f = this[0].selectionStart;
					d = this[0].selectionEnd
				} else {
					if (document.selection && document.selection.createRange) {
						var e = document.selection.createRange();
						f = 0 - e.duplicate().moveStart("character", -100000);
						d = f + e.text.length
					}
				}
				return {begin: f, end: d}
			}
		}, unmask: function () {
			return this.trigger("unmask")
		}, mask: function (f, j) {
			if (!f && this.length > 0) {
				var g = c(this[0]);
				var i = g.data("tests");
				return c.map(g.data("buffer"), function (m, l) {
					return i[l] ? m : null
				}).join("")
			}
			j = c.extend({placeholder: "_", completed: null}, j);
			var e = c.mask.definitions;
			var i = [];
			var k = f.length;
			var h = null;
			var d = f.length;
			c.each(f.split(""), function (l, m) {
				if (m == "?") {
					d--;
					k = l
				} else {
					if (e[m]) {
						i.push(new RegExp(e[m]));
						if (h == null) {
							h = i.length - 1
						}
					} else {
						i.push(null)
					}
				}
			});
			return this.each(function () {
				var u = c(this);
				var p = c.map(f.split(""), function (y, x) {
					if (y != "?") {
						return e[y] ? j.placeholder : y
					}
				});
				var s = false;
				var w = u.val();
				u.data("buffer", p).data("tests", i);
				function t(x) {
					while (++x <= d && !i[x]) {
					}
					return x
				}

				function o(z) {
					while (!i[z] && --z >= 0) {
					}
					for (var y = z; y < d; y++) {
						if (i[y]) {
							p[y] = j.placeholder;
							var x = t(y);
							if (x < d && i[y].test(p[x])) {
								p[y] = p[x]
							} else {
								break
							}
						}
					}
					r();
					u.caret(Math.max(h, z))
				}

				function l(B) {
					for (var z = B, A = j.placeholder; z < d; z++) {
						if (i[z]) {
							var x = t(z);
							var y = p[z];
							p[z] = A;
							if (x < d && i[x].test(y)) {
								A = y
							} else {
								break
							}
						}
					}
				}

				function q(y) {
					var z = c(this).caret();
					var x = y.keyCode;
					s = (x < 16 || (x > 16 && x < 32) || (x > 32 && x < 41));
					if ((z.begin - z.end) != 0 && (!s || x == 8 || x == 46)) {
						m(z.begin, z.end)
					}
					if (x == 8 || x == 46 || (b && x == 127)) {
						o(z.begin + (x == 46 ? 0 : -1));
						return false
					} else {
						if (x == 27) {
							u.val(w);
							u.caret(0, n());
							return false
						}
					}
				}

				function v(A) {
					if (s) {
						s = false;
						return (A.keyCode == 8) ? false : null
					}
					A = A || window.event;
					var x = A.charCode || A.keyCode || A.which;
					var C = c(this).caret();
					if (A.ctrlKey || A.altKey || A.metaKey) {
						return true
					} else {
						if ((x >= 32 && x <= 125) || x > 186) {
							var z = t(C.begin - 1);
							if (z < d) {
								var B = String.fromCharCode(x);
								if (i[z].test(B)) {
									l(z);
									p[z] = B;
									r();
									var y = t(z);
									c(this).caret(y);
									if (j.completed && y == d) {
										j.completed.call(u)
									}
								}
							}
						}
					}
					return false
				}

				function m(z, x) {
					for (var y = z; y < x && y < d; y++) {
						if (i[y]) {
							p[y] = j.placeholder
						}
					}
				}

				function r() {
					return u.val(p.join("")).val()
				}

				function n(y) {
					var C = u.val();
					var B = -1;
					for (var x = 0, A = 0; x < d; x++) {
						if (i[x]) {
							p[x] = j.placeholder;
							while (A++ < C.length) {
								var z = C.charAt(A - 1);
								if (i[x].test(z)) {
									p[x] = z;
									B = x;
									break
								}
							}
							if (A > C.length) {
								break
							}
						} else {
							if (p[x] == C[A] && x != k) {
								A++;
								B = x
							}
						}
					}
					if (!y && B + 1 < k) {
						u.val("");
						m(0, d)
					} else {
						if (y || B + 1 >= k) {
							r();
							if (!y) {
								u.val(u.val().substring(0, B + 1))
							}
						}
					}
					return (k ? x : h)
				}

				if (!u.attr("readonly")) {
					u.one("unmask", function () {
						u.unbind(".mask").removeData("buffer").removeData("tests")
					}).bind("focus.mask", function () {
						w = u.val();
						var x = n();
						r();
						setTimeout(function () {
							if (x == f.length) {
								u.caret(0, x)
							} else {
								u.caret(x)
							}
						}, 0)
					}).bind("blur.mask", function () {
						n();
						if (u.val() != w) {
							u.change()
						}
					}).bind("keydown.mask", q).bind("keypress.mask", v).bind(a, function () {
						setTimeout(function () {
							u.caret(n(true))
						}, 0)
					})
				}
				n()
			})
		}
	})
})(jQuery);


//jquery.bgiframe.min.js
var bgiframeController = function (a, b) {
	var d = $(a), c = a.parentNode;
	this.resize = function () {
		var a = {};
		a.top = parseInt(b.top == "auto" ? (parseInt(c.currentStyle.borderTopWidth) || 0) * -1 : b.top);
		a.left = parseInt(b.left == "auto" ? (parseInt(c.currentStyle.borderLeftWidth) || 0) * -1 : b.left);
		a.width = parseInt(b.width == "auto" ? c.offsetWidth : b.width);
		a.height = parseInt(b.height == "auto" ? c.offsetHeight : b.height);
		d.offset(a);
		d.width(a.width);
		d.height(a.height)
	};
	a.parentNode.onresize = this.resize;
	this.resize()
};
(function (a) {
	a.fn.bgiframe = /msie/.test(navigator.userAgent.toLowerCase()) && /msie 6\.0/i.test(navigator.userAgent) ? function (b) {
		var b = a.extend({
			top: "auto",
			left: "auto",
			width: "auto",
			height: "auto",
			opacity: !0,
			src: "javascript:document.write('');"
		}, b), d = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + b.src + '"style="display:block;position:absolute;z-index:-1;' + (b.opacity !== !1 ? "filter:Alpha(Opacity='0');" : "") + '" />';
		return this.each(function () {
			if (a(this).children("iframe.bgiframe").length === 0) {
				var c = document.createElement(d);
				this.insertBefore(c,
					this.firstChild);
				new bgiframeController(c, b)
			}
		})
	} : function () {
		return this
	};
	a.fn.bgIframe = a.fn.bgiframe
})(jQuery);

//json2.min.js
this.JSON || (JSON = {});
(function () {
	function k(b) {
		return b < 10 ? "0" + b : b
	}

	function o(b) {
		p.lastIndex = 0;
		return p.test(b) ? '"' + b.replace(p, function (b) {
			var c = r[b];
			return typeof c === "string" ? c : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + b + '"'
	}

	function l(b, i) {
		var c, d, h, m, g = e, f, a = i[b];
		a && typeof a === "object" && typeof a.toJSON === "function" && (a = a.toJSON(b));
		typeof j === "function" && (a = j.call(i, b, a));
		switch (typeof a) {
			case "string":
				return o(a);
			case "number":
				return isFinite(a) ? String(a) : "null";
			case "boolean":
			case "null":
				return String(a);
			case "object":
				if (!a)return "null";
				e += n;
				f = [];
				if (Object.prototype.toString.apply(a) === "[object Array]") {
					m = a.length;
					for (c = 0; c < m; c += 1)f[c] = l(c, a) || "null";
					h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
					e = g;
					return h
				}
				if (j && typeof j === "object") {
					m = j.length;
					for (c = 0; c < m; c += 1)d = j[c], typeof d === "string" && (h = l(d, a)) && f.push(o(d) + (e ? ": " : ":") + h)
				} else for (d in a)Object.hasOwnProperty.call(a, d) && (h = l(d, a)) && f.push(o(d) + (e ? ": " : ":") + h);
				h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}";
				e = g;
				return h
		}
	}

	if (typeof Date.prototype.toJSON !== "function")Date.prototype.toJSON = function () {
		return this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z"
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
		return this.valueOf()
	};
	var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		e, n, r = {
			"\u0008": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\u000c": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		}, j;
	if (typeof JSON.stringify !== "function")JSON.stringify = function (b, i, c) {
		var d;
		n = e = "";
		if (typeof c === "number")for (d = 0; d < c; d += 1)n += " "; else typeof c === "string" && (n = c);
		if ((j = i) && typeof i !== "function" && (typeof i !== "object" || typeof i.length !== "number"))throw Error("JSON.stringify");
		return l("", {"": b})
	};
	if (typeof JSON.parse !== "function")JSON.parse = function (b, e) {
		function c(b, d) {
			var g, f, a = b[d];
			if (a && typeof a === "object")for (g in a)Object.hasOwnProperty.call(a,
				g) && (f = c(a, g), f !== void 0 ? a[g] = f : delete a[g]);
			return e.call(b, d, a)
		}

		var d;
		q.lastIndex = 0;
		q.test(b) && (b = b.replace(q, function (b) {
			return "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return d = eval("(" + b + ")"), typeof e === "function" ? c({"": d}, "") : d;
		throw new SyntaxError("JSON.parse");
	}
})();



