///<reference path="../../typings/promise/promise.d.ts" />
///<reference path="./array.ts" />
///<reference path="./math.ts" />

declare var global:any;
if (typeof self == 'undefined') window = self = global;
if (typeof navigator == 'undefined') navigator = <any>{};

function sprintf(...args:any[]) {
	//  discuss at: http://phpjs.org/functions/sprintf/
	// original by: Ash Searle (http://hexmen.com/blog/)
	// improved by: Michael White (http://getsprink.com)
	// improved by: Jack
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Dj
	// improved by: Allidylls
	//    input by: Paulo Freitas
	//    input by: Brett Zamir (http://brett-zamir.me)
	//   example 1: sprintf("%01.2f", 123.1);
	//   returns 1: 123.10
	//   example 2: sprintf("[%10s]", 'monkey');
	//   returns 2: '[    monkey]'
	//   example 3: sprintf("[%'#10s]", 'monkey');
	//   returns 3: '[####monkey]'
	//   example 4: sprintf("%d", 123456789012345);
	//   returns 4: '123456789012345'
	//   example 5: sprintf('%-03s', 'E');
	//   returns 5: 'E00'

	var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
	var a = arguments;
	var i = 0;
	var format = a[i++];

	// pad()
	var pad = function (str:string, len:number, chr:string, leftJustify:boolean) {
		if (!chr) {
			chr = ' ';
		}
		var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)
			.join(chr);
		return leftJustify ? str + padding : padding + str;
	};

	// justify()
	var justify = function (value:string, prefix:string, leftJustify:boolean, minWidth:number, zeroPad:boolean, customPadChar:string = undefined) {
		var diff = minWidth - value.length;
		if (diff > 0) {
			if (leftJustify || !zeroPad) {
				value = pad(value, minWidth, customPadChar, leftJustify);
			} else {
				value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
			}
		}
		return value;
	};

	// formatBaseX()
	var formatBaseX = function (value:number, base:number, prefix:any, leftJustify:boolean, minWidth:number, precision:number, zeroPad:boolean) {
		// Note: casts negative numbers to positive ones
		var number = value >>> 0;
		prefix = prefix && number && (<any>{
			'2': '0b',
			'8': '0',
			'16': '0x'
		})[base] || '';
		var valueStr = prefix + pad(number.toString(base), precision || 0, '0', false);
		return justify(valueStr, prefix, leftJustify, minWidth, zeroPad);
	};

	// formatString()
	var formatString = function (value:any, leftJustify:any, minWidth:any, precision:any, zeroPad:any, customPadChar:any = undefined) {
		if (precision != null) {
			value = value.slice(0, precision);
		}
		return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
	};

	// doFormat()
	var doFormat = function (substring:any, valueIndex:any, flags:any, minWidth:any, _:any, precision:any, type:any) {
		var number:any, prefix:any, method:any, textTransform:any, value:any;

		if (substring === '%%') {
			return '%';
		}

		// parse flags
		var leftJustify = false;
		var positivePrefix = '';
		var zeroPad = false;
		var prefixBaseX = false;
		var customPadChar = ' ';
		var flagsl = flags.length;
		for (var j = 0; flags && j < flagsl; j++) {
			switch (flags.charAt(j)) {
				case ' ':
					positivePrefix = ' ';
					break;
				case '+':
					positivePrefix = '+';
					break;
				case '-':
					leftJustify = true;
					break;
				case "'":
					customPadChar = flags.charAt(j + 1);
					break;
				case '0':
					zeroPad = true;
					customPadChar = '0';
					break;
				case '#':
					prefixBaseX = true;
					break;
			}
		}

		// parameters may be null, undefined, empty-string or real valued
		// we want to ignore null, undefined and empty-string values
		if (!minWidth) {
			minWidth = 0;
		} else if (minWidth === '*') {
			minWidth = +a[i++];
		} else if (minWidth.charAt(0) == '*') {
			minWidth = +a[minWidth.slice(1, -1)];
		} else {
			minWidth = +minWidth;
		}

		// Note: undocumented perl feature:
		if (minWidth < 0) {
			minWidth = -minWidth;
			leftJustify = true;
		}

		if (!isFinite(minWidth)) {
			throw new Error('sprintf: (minimum-)width must be finite');
		}

		if (!precision) {
			precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
		} else if (precision === '*') {
			precision = +a[i++];
		} else if (precision.charAt(0) == '*') {
			precision = +a[precision.slice(1, -1)];
		} else {
			precision = +precision;
		}

		// grab value using valueIndex if required?
		value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

		switch (type) {
			case 's':
				return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
			case 'c':
				return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
			case 'b':
				return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			case 'o':
				return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			case 'x':
				return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			case 'X':
				return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
					.toUpperCase();
			case 'u':
				return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			case 'i':
			case 'd':
				number = +value || 0;
				number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
				prefix = number < 0 ? '-' : positivePrefix;
				value = prefix + pad(String(Math.abs(number)), precision, '0', false);
				return justify(value, prefix, leftJustify, minWidth, zeroPad);
			case 'e':
			case 'E':
			case 'f': // Should handle locales (as per setlocale)
			case 'F':
			case 'g':
			case 'G':
				number = +value;
				prefix = number < 0 ? '-' : positivePrefix;
				method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
				textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
				value = prefix + (<any>Math.abs(number))[method](precision);
				return (<any>justify(value, prefix, leftJustify, minWidth, zeroPad))[textTransform]();
			default:
				return substring;
		}
	};

	return format.replace(regex, doFormat);
}

function printf(...args:any[]) {
	console.log(sprintf.apply(sprintf, arguments));
}

interface NumberDictionary<V> {
    [key: number]: V;
}

interface StringDictionary<V> {
    [key: string]: V;
}

function String_repeat(str: string, num: number) {
    return new Array(num + 1).join(str);
}

enum Endian {
    LITTLE = 0,
    BIG = 1,
}

class AsyncEntry<T> {
	constructor(public id:string, public size: number, public usageCount: number, public value: T, public lastUsedTime:number) {
	}
}

class AsyncCache<T> {
	itemsMap: StringDictionary<AsyncEntry<T>> = {};

	constructor(private maxSize: number = 16, private measure?: (value: T) => number) {
		if (!measure) measure = ((item) => 1);
	}

	private get items() {
		var items = <AsyncEntry<T>[]>[];
		for (var key in this.itemsMap) {
			var item = this.itemsMap[key];
			if (item instanceof AsyncEntry) items.push(item);
		}
		return items;
	}

	private get usedSize() {
		return this.items.sum(item => item.size);
	}

	private get availableSize() {
		return this.maxSize - this.usedSize;
	}

	private freeUntilAvailable(size: number) {
		if (size > this.maxSize) throw (new Error("Element too big"));
		//console.log('count => ', size, this.availableSize, this.usedSize, this.maxSize, this.items.length);

		while (this.availableSize < size) {
			var itemToDelete = this.items.min(item => item.lastUsedTime);
			delete this.itemsMap[itemToDelete.id];
		}
	}

	getOrGenerateAsync(id: string, generator: () => Promise<T>): Promise<T> {
		var item = this.itemsMap[id];
		if (item) {
			item.lastUsedTime = Date.now();
			return Promise.resolve(item.value);
		} else {
			return generator().then(value => {
				var size = this.measure(value);
				this.freeUntilAvailable(size);
				this.itemsMap[id] = new AsyncEntry(id, size, 1, value, Date.now());
				return value;
			});
		}
	}
}

class SortedSet<T> {
    public elements: T[] = [];

    has(element: T) {
        return this.elements.indexOf(element) >= 0;
    }

    add(element: T) {
        if (!this.has(element)) this.elements.push(element);
		return element;
	}

	get length() { return this.elements.length; }

    delete(element: T) {
        this.elements.remove(element);
    }

    filter(callback: (value: T, index: number, array: T[]) => boolean) {
        return this.elements.filter(callback);
    }

    forEach(callback: (element: T) => void) {
        this.elements.forEach(callback);
    }
}

class DSet<T> extends SortedSet<T> {
}

class Pool<T> {

}

class UidCollection<T>
{
    private items: NumberDictionary<T> = {};

    constructor(private lastId: number = 1) {
    }

    allocate(item: T) {
        var id = this.lastId++;
        this.items[id] = item;
        return id;
    }

	has(id: number) {
		return (this.items[id] !== undefined);
	}

    get(id: number) {
        return this.items[id];
	}

	list() {
		var out = <T[]>[];
		for (var key in this.items) out.push(this.items[key]);
		return out;
	}

    remove(id: number) {
        delete this.items[id];
    }
}

interface NumericRange {
	start: number;
	end: number;
}

interface String {
	(value: any): string;
	rstrip(): string;
	contains(value: string): boolean;
	startsWith(value: string): boolean;
	endsWith(value: string): boolean;
}

String.prototype.startsWith = function (value: string) {
	var string = <string>this;
	return string.substr(0, value.length) == value;
};

String.prototype.endsWith = function (value: string) {
	var string = <string>this;
	return string.substr(-value.length) == value;
};

String.prototype.rstrip = function () {
    var string = <string>this;
    return string.replace(/\s+$/, '');
};

String.prototype.contains = function (value: string) {
	var string = <string>this;
	return string.indexOf(value) >= 0;
};

declare function setImmediate(callback: () => void): number;

interface MicrotaskCallback {
	(): void;
}

class Microtask {
	private static queued: boolean = false;
	private static callbacks: MicrotaskCallback[] = [];
	private static initialized: boolean = false;
	private static __messageType = '__Microtask_execute';
	private static __location:string = null;

	private static initOnce() {
		if (Microtask.initialized) return;
		window.addEventListener("message", Microtask.window_message, false);
		Microtask.__location = document.location.href;
		Microtask.initialized = true;
	}

	private static window_message(e:any) {
		if (e.data == Microtask.__messageType) Microtask.execute();
	}

	static queue(callback: MicrotaskCallback) {
		Microtask.initOnce();
		Microtask.callbacks.push(callback);
		if (!Microtask.queued) {
			Microtask.queued = true;
			//window.postMessage(Microtask.__messageType, Microtask.__location);
			setTimeout(Microtask.execute, 0);
			//Microtask.execute(); // @TODO
		}
	}

	private static execute() {
		while (Microtask.callbacks.length > 0) {
			var callback = Microtask.callbacks.shift();
			callback();
		}
		Microtask.queued = false;
	}
}

var _self:any = self;
_self['polyfills'] =  _self['polyfills'] || {};
_self['polyfills']['ArrayBuffer_slice'] = !ArrayBuffer.prototype.slice;
_self['polyfills']['setImmediate'] = !self.setImmediate;
_self['polyfills']['performance'] = !self.performance;

if (!self['performance']) {
	self['performance'] = <any>{};
	self['performance']['now'] = function () {
		return Date.now();
	};
}

if (!window['setImmediate']) {
	window['setImmediate'] = function (callback: () => void) {
		Microtask.queue(callback);
		//return setTimeout(callback, 0);
		return -1;
	};
	window['clearImmediate'] = function (timer: number) {
		throw(new Error("Not implemented!"));
		//clearTimeout(timer);
	};
}

declare function escape(input: string): string;
declare function unescape(input: string): string;

class Utf8 {
	static decode(input: string): string {
		try {
			return decodeURIComponent(escape(input));
		} catch (e) {
			console.error(e);
			return input;
		}
	}

	static encode(input: string): string {
		return unescape(encodeURIComponent(input));
	}
}

interface ArrayBuffer {
    slice(begin: number, end?: number):ArrayBuffer;
	//new(count:number):ArrayBuffer;
}

if (!ArrayBuffer.prototype.slice) {
    ArrayBuffer.prototype.slice = function (begin: number, end?: number): ArrayBuffer {
        var that = new Uint8Array(this);
        if (end == undefined) end = that.length;
        var result = new ArrayBuffer(end - begin);
        var resultArray = new Uint8Array(result);
        for (var i = 0; i < resultArray.length; i++) resultArray[i] = that[i + begin];
        return result;
    };
}

interface AudioBuffer {
	getChannelData(channel:number): Float32Array;
}
interface AudioContext {
	createScriptProcessor(bufferSize: number, numInputChannels: number, numOutputChannels: number): ScriptProcessorNode;
}

var _window:any = window;
_window['AudioContext'] = _window['AudioContext'] || _window['webkitAudioContext'];

window.navigator['getGamepads'] = window.navigator['getGamepads'] || _window.navigator['webkitGetGamepads'];

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function (callback: FrameRequestCallback) {
		var start = Date.now();
		return setTimeout(function () {
			callback(Date.now());
		}, 20);
	};
	window.cancelAnimationFrame = function (id: number) {
		clearTimeout(id);
	};
}

class ArrayBufferUtils {
	static fromUInt8Array(input: Uint8Array) {
		return input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength);
	}

	static uint8ToUint32(input: Uint8Array, offset: number = 0, length?: number) {
		if (length === undefined) length = ((input.length >>> 2) - (offset >>> 2));
		return new Uint32Array(input.buffer, input.byteOffset + offset, length);
	}

	static uint8ToUint8(input: Uint8Array, offset: number = 0, length?: number) {
		if (length === undefined) length = (input.length - offset);
		return new Uint8Array(input.buffer, input.byteOffset + offset, length);
	}

	static copy(input: Uint8Array, inputPosition: number, output: Uint8Array, outputPosition: number, length: number) {
		output.subarray(outputPosition, outputPosition + length).set(input.subarray(inputPosition, inputPosition + length));
		//for (var n = 0; n < length; n++) output[outputPosition + n] = input[inputPosition + n];
	}

	static cloneBytes(input: Uint8Array) {
		var out = new Uint8Array(input.length);
		out.set(input);
		return out;
	}

	static concat(chunks: ArrayBuffer[]) {
		var tmp = new Uint8Array(chunks.sum(chunk => chunk.byteLength));
		var offset = 0;
		chunks.forEach(chunk => {
			tmp.set(new Uint8Array(chunk), offset);
			offset += chunk.byteLength;
		});
		return tmp.buffer;
	}
}

interface PromiseGenerator<T> {
	(): Promise<T>;
}

class PromiseUtils {
	static sequence<T>(generators: PromiseGenerator<T>[]) {
		return new Promise((resolve, reject) => {
			generators = generators.slice(0);
			function step() {
				if (generators.length > 0) {
					var generator = generators.shift();
					var promise = generator();
					promise.then(step);
				} else {
					resolve();
				}
			}
			step();
		});
	}

	static delayAsync(ms: number) {
		if (ms <= 0) return Promise.resolve<any>(null);
		return new Promise<any>((resolve, reject) => setTimeout(resolve, ms));
	}

	static delaySecondsAsync(seconds: number) {
		return PromiseUtils.delayAsync(seconds * 1000);
	}
}

_window['requestFileSystem'] = _window['requestFileSystem'] || _window['webkitRequestFileSystem'];

function setToString(Enum: any, value: number) {
	var items:string[] = [];
	for (var key in Enum) {
		if (Enum[key] & value && (Enum[key] & value) == Enum[key]) {
			items.push(key);
		}
	}
	return items.join(' | ');
}

enum AcceptCallbacks { NO = 0, YES = 1 }
enum Compensate { NO = 0, YES = 1 }

class WaitingThreadInfo<T> {
	public constructor(public name: string, public object: any, public promise: Promise<T>, public callbacks: AcceptCallbacks, public compensate: Compensate = Compensate.YES) {
	}
}

class CpuBreakException implements Error {
	constructor(public name: string = 'CpuBreakException', public message: string = 'CpuBreakException') {
	}
}

class SceKernelException implements Error {
	constructor(public id: number, public name: string = 'SceKernelException', public message: string = 'SceKernelException') {
	}
}

(<any>window).WaitingThreadInfo = WaitingThreadInfo;
(<any>window).CpuBreakException = CpuBreakException;
(<any>window).SceKernelException = SceKernelException;

var DebugOnceArray:{ [key:string]:number; } = {};
function DebugOnce(name: string, times: number = 1) {
	if (DebugOnceArray[name] >= times) return false;
	if (DebugOnceArray[name]) {
		DebugOnceArray[name]++;
	} else {
		DebugOnceArray[name] = 1;
	}
	return true;
}

function isTouchDevice() {
	return 'ontouchstart' in window;
}

class HalfFloat {
	static fromFloat(Float:number) {
		var i = MathFloat.reinterpretFloatAsInt(Float);
		var s = ((i >> 16) & 0x00008000);              // sign
		var e = ((i >> 23) & 0x000000ff) - (127 - 15); // exponent
		var f = ((i >> 0) & 0x007fffff);              // fraction

		// need to handle NaNs and Inf?
		if (e <= 0) {
			if (e < -10) {
				if (s != 0) {
					// handle -0.0
					return 0x8000;
				}
				return 0;
			}
			f = (f | 0x00800000) >> (1 - e);
			return s | (f >> 13);
		}
		else if (e == 0xff - (127 - 15)) {
			if (f == 0) {
				// Inf
				return s | 0x7c00;
			}
			// NAN
			f >>= 13;
			return s | 0x7c00 | f | ((f == 0) ? 1 : 0);
		}
		if (e > 30) {
			// Overflow
			return s | 0x7c00;
		}
		return s | (e << 10) | (f >> 13);
	}

	static toFloat(imm16:number) {
		var s = (imm16 >> 15) & 0x00000001; // Sign
		var e = (imm16 >> 10) & 0x0000001f; // Exponent
		var f = (imm16 >> 0) & 0x000003ff;  // Fraction

		// Need to handle 0x7C00 INF and 0xFC00 -INF?
		if (e == 0) {
			// Need to handle +-0 case f==0 or f=0x8000?
			if (f == 0) {
				// Plus or minus zero
				return MathFloat.reinterpretIntAsFloat(s << 31);
			}
			// Denormalized number -- renormalize it
			while ((f & 0x00000400) == 0) {
				f <<= 1;
				e -= 1;
			}
			e += 1;
			f &= ~0x00000400;
		}
		else if (e == 31) {
			if (f == 0) {
				// Inf
				return MathFloat.reinterpretIntAsFloat((s << 31) | 0x7f800000);
			}
			// NaN
			return MathFloat.reinterpretIntAsFloat((s << 31) | 0x7f800000 | (f << 13));
		}

		e = e + (127 - 15);
		f = f << 13;

		return MathFloat.reinterpretIntAsFloat((s << 31) | (e << 23) | f);
	}
}


function htmlspecialchars(str:string) {
	return str.replace(/[&<>]/g, (tag:string) => {
		switch (tag) {
			case '&': return '&amp;';
			case '<': return '&lt;';
			case '>': return '&gt;';
		}
		return tag;
	});
}

function mac2string(mac: Uint8Array) {
	return sprintf("%02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
}

function string2mac(string: string) {
	var array = String(string).split(':').map(item => parseInt(item, 16));
	while (array.length < 6) array.push(0);
	return new Uint8Array(array);
}

interface Cancelable {
	cancel():void;
}

class SignalCancelable<T> implements Cancelable {
	constructor(private signal: Signal<T>, private callback: (value?: T) => void) {
	}

	cancel() {
		this.signal.remove(this.callback);
	}
}

class Signal<T> {
	callbacks: ((value?: T) => void)[] = [];

	get length() {
		return this.callbacks.length;
	}

	add(callback: (value?: T) => void) {
		this.callbacks.push(callback);
		return new SignalCancelable(this, callback);
	}

	remove(callback: (value?: T) => void) {
		var index = this.callbacks.indexOf(callback);
		if (index >= 0) {
			this.callbacks.splice(index, 1);
		}
	}

	once(callback: (value?: T) => void) {
		var once = () => {
			this.remove(once);
			callback();
		};
		this.add(once);
		return new SignalCancelable(this, once);
	}

	dispatch(value?: T) {
		this.callbacks.forEach((callback) => {
			callback(value);
		});
	}
}

class Logger {
	constructor(private policy:LoggerPolicies, private console:any, private name:string) {
	}

	named(name: string) {
		return new Logger(this.policy, this.console, (this.name + '.' + name).replace(/^\.+/, ''));
	}

	_log(type: string, level: number, args: any[]) {
		if (this.policy.canLog(this.name, level)) {
			args.unshift(this.name + ':');
			this.console[type].apply(this.console, args);
		}
	}

	debug(...args:any[]) { this._log('debug', 0, args); }
	log(...args:any[]) { this._log('log', 1, args); }
	info(...args:any[]) { this._log('info', 2, args); }
	warn(...args:any[]) { this._log('warn', 3, args); }
	error(...args:any[]) { this._log('error', 4, args); }

	groupCollapsed(...args:any[]) { this._log('groupCollapsed', 5, args); }
	groupEnd(...args:any[]) { this._log('groupEnd', 5, args); }
}

class LoggerPolicies {
	public disableAll = false;
	public minLogLevel = 1;

	canLog(name: string, level: number) {
		if (this.disableAll) return false;
		if (level < this.minLogLevel) return false;
		return true;
	}


}

var loggerPolicies = new LoggerPolicies();
var logger = new Logger(loggerPolicies, console, '');
