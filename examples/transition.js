(function () {
	'use strict';

	/**
	 * @license
	 * Copyright 2010-2023 Three.js Authors
	 * SPDX-License-Identifier: MIT
	 */
	const REVISION = '160';

	const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
	const TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
	const CullFaceNone = 0;
	const CullFaceBack = 1;
	const CullFaceFront = 2;
	const PCFShadowMap = 1;
	const PCFSoftShadowMap = 2;
	const VSMShadowMap = 3;
	const FrontSide = 0;
	const BackSide = 1;
	const DoubleSide = 2;
	const NoBlending = 0;
	const NormalBlending = 1;
	const AdditiveBlending = 2;
	const SubtractiveBlending = 3;
	const MultiplyBlending = 4;
	const CustomBlending = 5;
	const AddEquation = 100;
	const SubtractEquation = 101;
	const ReverseSubtractEquation = 102;
	const MinEquation = 103;
	const MaxEquation = 104;
	const ZeroFactor = 200;
	const OneFactor = 201;
	const SrcColorFactor = 202;
	const OneMinusSrcColorFactor = 203;
	const SrcAlphaFactor = 204;
	const OneMinusSrcAlphaFactor = 205;
	const DstAlphaFactor = 206;
	const OneMinusDstAlphaFactor = 207;
	const DstColorFactor = 208;
	const OneMinusDstColorFactor = 209;
	const SrcAlphaSaturateFactor = 210;
	const ConstantColorFactor = 211;
	const OneMinusConstantColorFactor = 212;
	const ConstantAlphaFactor = 213;
	const OneMinusConstantAlphaFactor = 214;
	const NeverDepth = 0;
	const AlwaysDepth = 1;
	const LessDepth = 2;
	const LessEqualDepth = 3;
	const EqualDepth = 4;
	const GreaterEqualDepth = 5;
	const GreaterDepth = 6;
	const NotEqualDepth = 7;
	const MultiplyOperation = 0;
	const MixOperation = 1;
	const AddOperation = 2;
	const NoToneMapping = 0;
	const LinearToneMapping = 1;
	const ReinhardToneMapping = 2;
	const CineonToneMapping = 3;
	const ACESFilmicToneMapping = 4;
	const CustomToneMapping = 5;
	const AgXToneMapping = 6;

	const UVMapping = 300;
	const CubeReflectionMapping = 301;
	const CubeRefractionMapping = 302;
	const EquirectangularReflectionMapping = 303;
	const EquirectangularRefractionMapping = 304;
	const CubeUVReflectionMapping = 306;
	const RepeatWrapping = 1000;
	const ClampToEdgeWrapping = 1001;
	const MirroredRepeatWrapping = 1002;
	const NearestFilter = 1003;
	const NearestMipmapNearestFilter = 1004;
	const NearestMipmapLinearFilter = 1005;
	const LinearFilter = 1006;
	const LinearMipmapNearestFilter = 1007;
	const LinearMipmapLinearFilter = 1008;
	const UnsignedByteType = 1009;
	const ByteType = 1010;
	const ShortType = 1011;
	const UnsignedShortType = 1012;
	const IntType = 1013;
	const UnsignedIntType = 1014;
	const FloatType = 1015;
	const HalfFloatType = 1016;
	const UnsignedShort4444Type = 1017;
	const UnsignedShort5551Type = 1018;
	const UnsignedInt248Type = 1020;
	const AlphaFormat = 1021;
	const RGBAFormat = 1023;
	const LuminanceFormat = 1024;
	const LuminanceAlphaFormat = 1025;
	const DepthFormat = 1026;
	const DepthStencilFormat = 1027;
	const RedFormat = 1028;
	const RedIntegerFormat = 1029;
	const RGFormat = 1030;
	const RGIntegerFormat = 1031;
	const RGBAIntegerFormat = 1033;

	const RGB_S3TC_DXT1_Format = 33776;
	const RGBA_S3TC_DXT1_Format = 33777;
	const RGBA_S3TC_DXT3_Format = 33778;
	const RGBA_S3TC_DXT5_Format = 33779;
	const RGB_PVRTC_4BPPV1_Format = 35840;
	const RGB_PVRTC_2BPPV1_Format = 35841;
	const RGBA_PVRTC_4BPPV1_Format = 35842;
	const RGBA_PVRTC_2BPPV1_Format = 35843;
	const RGB_ETC1_Format = 36196;
	const RGB_ETC2_Format = 37492;
	const RGBA_ETC2_EAC_Format = 37496;
	const RGBA_ASTC_4x4_Format = 37808;
	const RGBA_ASTC_5x4_Format = 37809;
	const RGBA_ASTC_5x5_Format = 37810;
	const RGBA_ASTC_6x5_Format = 37811;
	const RGBA_ASTC_6x6_Format = 37812;
	const RGBA_ASTC_8x5_Format = 37813;
	const RGBA_ASTC_8x6_Format = 37814;
	const RGBA_ASTC_8x8_Format = 37815;
	const RGBA_ASTC_10x5_Format = 37816;
	const RGBA_ASTC_10x6_Format = 37817;
	const RGBA_ASTC_10x8_Format = 37818;
	const RGBA_ASTC_10x10_Format = 37819;
	const RGBA_ASTC_12x10_Format = 37820;
	const RGBA_ASTC_12x12_Format = 37821;
	const RGBA_BPTC_Format = 36492;
	const RGB_BPTC_SIGNED_Format = 36494;
	const RGB_BPTC_UNSIGNED_Format = 36495;
	const RED_RGTC1_Format = 36283;
	const SIGNED_RED_RGTC1_Format = 36284;
	const RED_GREEN_RGTC2_Format = 36285;
	const SIGNED_RED_GREEN_RGTC2_Format = 36286;
	/** @deprecated Use LinearSRGBColorSpace or NoColorSpace in three.js r152+. */
	const LinearEncoding = 3000;
	/** @deprecated Use SRGBColorSpace in three.js r152+. */
	const sRGBEncoding = 3001;
	const BasicDepthPacking = 3200;
	const RGBADepthPacking = 3201;
	const TangentSpaceNormalMap = 0;
	const ObjectSpaceNormalMap = 1;

	// Color space string identifiers, matching CSS Color Module Level 4 and WebGPU names where available.
	const NoColorSpace = '';
	const SRGBColorSpace = 'srgb';
	const LinearSRGBColorSpace = 'srgb-linear';
	const DisplayP3ColorSpace = 'display-p3';
	const LinearDisplayP3ColorSpace = 'display-p3-linear';

	const LinearTransfer = 'linear';
	const SRGBTransfer = 'srgb';

	const Rec709Primaries = 'rec709';
	const P3Primaries = 'p3';
	const KeepStencilOp = 7680;
	const AlwaysStencilFunc = 519;

	const NeverCompare = 512;
	const LessCompare = 513;
	const EqualCompare = 514;
	const LessEqualCompare = 515;
	const GreaterCompare = 516;
	const NotEqualCompare = 517;
	const GreaterEqualCompare = 518;
	const AlwaysCompare = 519;

	const StaticDrawUsage = 35044;
	const GLSL3 = '300 es';

	const _SRGBAFormat = 1035; // fallback for WebGL 1

	const WebGLCoordinateSystem = 2000;
	const WebGPUCoordinateSystem = 2001;

	/**
	 * https://github.com/mrdoob/eventdispatcher.js/
	 */

	class EventDispatcher {

		addEventListener( type, listener ) {

			if ( this._listeners === undefined ) this._listeners = {};

			const listeners = this._listeners;

			if ( listeners[ type ] === undefined ) {

				listeners[ type ] = [];

			}

			if ( listeners[ type ].indexOf( listener ) === - 1 ) {

				listeners[ type ].push( listener );

			}

		}

		hasEventListener( type, listener ) {

			if ( this._listeners === undefined ) return false;

			const listeners = this._listeners;

			return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

		}

		removeEventListener( type, listener ) {

			if ( this._listeners === undefined ) return;

			const listeners = this._listeners;
			const listenerArray = listeners[ type ];

			if ( listenerArray !== undefined ) {

				const index = listenerArray.indexOf( listener );

				if ( index !== - 1 ) {

					listenerArray.splice( index, 1 );

				}

			}

		}

		dispatchEvent( event ) {

			if ( this._listeners === undefined ) return;

			const listeners = this._listeners;
			const listenerArray = listeners[ event.type ];

			if ( listenerArray !== undefined ) {

				event.target = this;

				// Make a copy, in case listeners are removed while iterating.
				const array = listenerArray.slice( 0 );

				for ( let i = 0, l = array.length; i < l; i ++ ) {

					array[ i ].call( this, event );

				}

				event.target = null;

			}

		}

	}

	const _lut = [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff' ];

	let _seed = 1234567;


	const DEG2RAD = Math.PI / 180;
	const RAD2DEG = 180 / Math.PI;

	// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
	function generateUUID() {

		const d0 = Math.random() * 0xffffffff | 0;
		const d1 = Math.random() * 0xffffffff | 0;
		const d2 = Math.random() * 0xffffffff | 0;
		const d3 = Math.random() * 0xffffffff | 0;
		const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
				_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
				_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
				_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

		// .toLowerCase() here flattens concatenated strings to save heap memory space.
		return uuid.toLowerCase();

	}

	function clamp( value, min, max ) {

		return Math.max( min, Math.min( max, value ) );

	}

	// compute euclidean modulo of m % n
	// https://en.wikipedia.org/wiki/Modulo_operation
	function euclideanModulo( n, m ) {

		return ( ( n % m ) + m ) % m;

	}

	// Linear mapping from range <a1, a2> to range <b1, b2>
	function mapLinear( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	}

	// https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
	function inverseLerp( x, y, value ) {

		if ( x !== y ) {

			return ( value - x ) / ( y - x );

		} else {

			return 0;

		}

	}

	// https://en.wikipedia.org/wiki/Linear_interpolation
	function lerp( x, y, t ) {

		return ( 1 - t ) * x + t * y;

	}

	// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
	function damp( x, y, lambda, dt ) {

		return lerp( x, y, 1 - Math.exp( - lambda * dt ) );

	}

	// https://www.desmos.com/calculator/vcsjnyz7x4
	function pingpong( x, length = 1 ) {

		return length - Math.abs( euclideanModulo( x, length * 2 ) - length );

	}

	// http://en.wikipedia.org/wiki/Smoothstep
	function smoothstep( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	}

	function smootherstep( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	}

	// Random integer from <low, high> interval
	function randInt( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	}

	// Random float from <low, high> interval
	function randFloat( low, high ) {

		return low + Math.random() * ( high - low );

	}

	// Random float from <-range/2, range/2> interval
	function randFloatSpread( range ) {

		return range * ( 0.5 - Math.random() );

	}

	// Deterministic pseudo-random float in the interval [ 0, 1 ]
	function seededRandom( s ) {

		if ( s !== undefined ) _seed = s;

		// Mulberry32 generator

		let t = _seed += 0x6D2B79F5;

		t = Math.imul( t ^ t >>> 15, t | 1 );

		t ^= t + Math.imul( t ^ t >>> 7, t | 61 );

		return ( ( t ^ t >>> 14 ) >>> 0 ) / 4294967296;

	}

	function degToRad( degrees ) {

		return degrees * DEG2RAD;

	}

	function radToDeg( radians ) {

		return radians * RAD2DEG;

	}

	function isPowerOfTwo( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	}

	function ceilPowerOfTwo( value ) {

		return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

	}

	function floorPowerOfTwo( value ) {

		return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

	}

	function setQuaternionFromProperEuler( q, a, b, c, order ) {

		// Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

		// rotations are applied to the axes in the order specified by 'order'
		// rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
		// angles are in radians

		const cos = Math.cos;
		const sin = Math.sin;

		const c2 = cos( b / 2 );
		const s2 = sin( b / 2 );

		const c13 = cos( ( a + c ) / 2 );
		const s13 = sin( ( a + c ) / 2 );

		const c1_3 = cos( ( a - c ) / 2 );
		const s1_3 = sin( ( a - c ) / 2 );

		const c3_1 = cos( ( c - a ) / 2 );
		const s3_1 = sin( ( c - a ) / 2 );

		switch ( order ) {

			case 'XYX':
				q.set( c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13 );
				break;

			case 'YZY':
				q.set( s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13 );
				break;

			case 'ZXZ':
				q.set( s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13 );
				break;

			case 'XZX':
				q.set( c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13 );
				break;

			case 'YXY':
				q.set( s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13 );
				break;

			case 'ZYZ':
				q.set( s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13 );
				break;

			default:
				console.warn( 'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order );

		}

	}

	function denormalize( value, array ) {

		switch ( array.constructor ) {

			case Float32Array:

				return value;

			case Uint32Array:

				return value / 4294967295.0;

			case Uint16Array:

				return value / 65535.0;

			case Uint8Array:

				return value / 255.0;

			case Int32Array:

				return Math.max( value / 2147483647.0, - 1.0 );

			case Int16Array:

				return Math.max( value / 32767.0, - 1.0 );

			case Int8Array:

				return Math.max( value / 127.0, - 1.0 );

			default:

				throw new Error( 'Invalid component type.' );

		}

	}

	function normalize( value, array ) {

		switch ( array.constructor ) {

			case Float32Array:

				return value;

			case Uint32Array:

				return Math.round( value * 4294967295.0 );

			case Uint16Array:

				return Math.round( value * 65535.0 );

			case Uint8Array:

				return Math.round( value * 255.0 );

			case Int32Array:

				return Math.round( value * 2147483647.0 );

			case Int16Array:

				return Math.round( value * 32767.0 );

			case Int8Array:

				return Math.round( value * 127.0 );

			default:

				throw new Error( 'Invalid component type.' );

		}

	}

	const MathUtils = {
		DEG2RAD: DEG2RAD,
		RAD2DEG: RAD2DEG,
		generateUUID: generateUUID,
		clamp: clamp,
		euclideanModulo: euclideanModulo,
		mapLinear: mapLinear,
		inverseLerp: inverseLerp,
		lerp: lerp,
		damp: damp,
		pingpong: pingpong,
		smoothstep: smoothstep,
		smootherstep: smootherstep,
		randInt: randInt,
		randFloat: randFloat,
		randFloatSpread: randFloatSpread,
		seededRandom: seededRandom,
		degToRad: degToRad,
		radToDeg: radToDeg,
		isPowerOfTwo: isPowerOfTwo,
		ceilPowerOfTwo: ceilPowerOfTwo,
		floorPowerOfTwo: floorPowerOfTwo,
		setQuaternionFromProperEuler: setQuaternionFromProperEuler,
		normalize: normalize,
		denormalize: denormalize
	};

	class Vector2 {

		constructor( x = 0, y = 0 ) {

			Vector2.prototype.isVector2 = true;

			this.x = x;
			this.y = y;

		}

		get width() {

			return this.x;

		}

		set width( value ) {

			this.x = value;

		}

		get height() {

			return this.y;

		}

		set height( value ) {

			this.y = value;

		}

		set( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		}

		setScalar( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		}

		setX( x ) {

			this.x = x;

			return this;

		}

		setY( y ) {

			this.y = y;

			return this;

		}

		setComponent( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		}

		getComponent( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				default: throw new Error( 'index is out of range: ' + index );

			}

		}

		clone() {

			return new this.constructor( this.x, this.y );

		}

		copy( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		}

		add( v ) {

			this.x += v.x;
			this.y += v.y;

			return this;

		}

		addScalar( s ) {

			this.x += s;
			this.y += s;

			return this;

		}

		addVectors( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		}

		addScaledVector( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		}

		sub( v ) {

			this.x -= v.x;
			this.y -= v.y;

			return this;

		}

		subScalar( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		}

		subVectors( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		}

		multiply( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		}

		multiplyScalar( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		}

		divide( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		}

		divideScalar( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		}

		applyMatrix3( m ) {

			const x = this.x, y = this.y;
			const e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		}

		min( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		}

		max( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		}

		clamp( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		}

		clampScalar( minVal, maxVal ) {

			this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
			this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

			return this;

		}

		clampLength( min, max ) {

			const length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		}

		floor() {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		}

		ceil() {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		}

		round() {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		}

		roundToZero() {

			this.x = Math.trunc( this.x );
			this.y = Math.trunc( this.y );

			return this;

		}

		negate() {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		}

		dot( v ) {

			return this.x * v.x + this.y * v.y;

		}

		cross( v ) {

			return this.x * v.y - this.y * v.x;

		}

		lengthSq() {

			return this.x * this.x + this.y * this.y;

		}

		length() {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		}

		manhattanLength() {

			return Math.abs( this.x ) + Math.abs( this.y );

		}

		normalize() {

			return this.divideScalar( this.length() || 1 );

		}

		angle() {

			// computes the angle in radians with respect to the positive x-axis

			const angle = Math.atan2( - this.y, - this.x ) + Math.PI;

			return angle;

		}

		angleTo( v ) {

			const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

			if ( denominator === 0 ) return Math.PI / 2;

			const theta = this.dot( v ) / denominator;

			// clamp, to handle numerical problems

			return Math.acos( clamp( theta, - 1, 1 ) );

		}

		distanceTo( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		}

		distanceToSquared( v ) {

			const dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		}

		manhattanDistanceTo( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		}

		setLength( length ) {

			return this.normalize().multiplyScalar( length );

		}

		lerp( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		}

		lerpVectors( v1, v2, alpha ) {

			this.x = v1.x + ( v2.x - v1.x ) * alpha;
			this.y = v1.y + ( v2.y - v1.y ) * alpha;

			return this;

		}

		equals( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		}

		fromArray( array, offset = 0 ) {

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		}

		fromBufferAttribute( attribute, index ) {

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );

			return this;

		}

		rotateAround( center, angle ) {

			const c = Math.cos( angle ), s = Math.sin( angle );

			const x = this.x - center.x;
			const y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

		random() {

			this.x = Math.random();
			this.y = Math.random();

			return this;

		}

		*[ Symbol.iterator ]() {

			yield this.x;
			yield this.y;

		}

	}

	class Matrix3 {

		constructor( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

			Matrix3.prototype.isMatrix3 = true;

			this.elements = [

				1, 0, 0,
				0, 1, 0,
				0, 0, 1

			];

			if ( n11 !== undefined ) {

				this.set( n11, n12, n13, n21, n22, n23, n31, n32, n33 );

			}

		}

		set( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

			const te = this.elements;

			te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
			te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
			te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

			return this;

		}

		identity() {

			this.set(

				1, 0, 0,
				0, 1, 0,
				0, 0, 1

			);

			return this;

		}

		copy( m ) {

			const te = this.elements;
			const me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
			te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
			te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

			return this;

		}

		extractBasis( xAxis, yAxis, zAxis ) {

			xAxis.setFromMatrix3Column( this, 0 );
			yAxis.setFromMatrix3Column( this, 1 );
			zAxis.setFromMatrix3Column( this, 2 );

			return this;

		}

		setFromMatrix4( m ) {

			const me = m.elements;

			this.set(

				me[ 0 ], me[ 4 ], me[ 8 ],
				me[ 1 ], me[ 5 ], me[ 9 ],
				me[ 2 ], me[ 6 ], me[ 10 ]

			);

			return this;

		}

		multiply( m ) {

			return this.multiplyMatrices( this, m );

		}

		premultiply( m ) {

			return this.multiplyMatrices( m, this );

		}

		multiplyMatrices( a, b ) {

			const ae = a.elements;
			const be = b.elements;
			const te = this.elements;

			const a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
			const a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
			const a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

			const b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
			const b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
			const b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
			te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
			te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
			te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
			te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
			te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
			te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

			return this;

		}

		multiplyScalar( s ) {

			const te = this.elements;

			te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
			te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
			te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

			return this;

		}

		determinant() {

			const te = this.elements;

			const a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
				d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
				g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

			return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

		}

		invert() {

			const te = this.elements,

				n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
				n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
				n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],

				t11 = n33 * n22 - n32 * n23,
				t12 = n32 * n13 - n33 * n12,
				t13 = n23 * n12 - n22 * n13,

				det = n11 * t11 + n21 * t12 + n31 * t13;

			if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

			const detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
			te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

			te[ 3 ] = t12 * detInv;
			te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
			te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

			te[ 6 ] = t13 * detInv;
			te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
			te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

			return this;

		}

		transpose() {

			let tmp;
			const m = this.elements;

			tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
			tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
			tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

			return this;

		}

		getNormalMatrix( matrix4 ) {

			return this.setFromMatrix4( matrix4 ).invert().transpose();

		}

		transposeIntoArray( r ) {

			const m = this.elements;

			r[ 0 ] = m[ 0 ];
			r[ 1 ] = m[ 3 ];
			r[ 2 ] = m[ 6 ];
			r[ 3 ] = m[ 1 ];
			r[ 4 ] = m[ 4 ];
			r[ 5 ] = m[ 7 ];
			r[ 6 ] = m[ 2 ];
			r[ 7 ] = m[ 5 ];
			r[ 8 ] = m[ 8 ];

			return this;

		}

		setUvTransform( tx, ty, sx, sy, rotation, cx, cy ) {

			const c = Math.cos( rotation );
			const s = Math.sin( rotation );

			this.set(
				sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
				- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
				0, 0, 1
			);

			return this;

		}

		//

		scale( sx, sy ) {

			this.premultiply( _m3.makeScale( sx, sy ) );

			return this;

		}

		rotate( theta ) {

			this.premultiply( _m3.makeRotation( - theta ) );

			return this;

		}

		translate( tx, ty ) {

			this.premultiply( _m3.makeTranslation( tx, ty ) );

			return this;

		}

		// for 2D Transforms

		makeTranslation( x, y ) {

			if ( x.isVector2 ) {

				this.set(

					1, 0, x.x,
					0, 1, x.y,
					0, 0, 1

				);

			} else {

				this.set(

					1, 0, x,
					0, 1, y,
					0, 0, 1

				);

			}

			return this;

		}

		makeRotation( theta ) {

			// counterclockwise

			const c = Math.cos( theta );
			const s = Math.sin( theta );

			this.set(

				c, - s, 0,
				s, c, 0,
				0, 0, 1

			);

			return this;

		}

		makeScale( x, y ) {

			this.set(

				x, 0, 0,
				0, y, 0,
				0, 0, 1

			);

			return this;

		}

		//

		equals( matrix ) {

			const te = this.elements;
			const me = matrix.elements;

			for ( let i = 0; i < 9; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		}

		fromArray( array, offset = 0 ) {

			for ( let i = 0; i < 9; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		}

		toArray( array = [], offset = 0 ) {

			const te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];

			array[ offset + 3 ] = te[ 3 ];
			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];

			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];
			array[ offset + 8 ] = te[ 8 ];

			return array;

		}

		clone() {

			return new this.constructor().fromArray( this.elements );

		}

	}

	const _m3 = /*@__PURE__*/ new Matrix3();

	function arrayNeedsUint32( array ) {

		// assumes larger values usually on last

		for ( let i = array.length - 1; i >= 0; -- i ) {

			if ( array[ i ] >= 65535 ) return true; // account for PRIMITIVE_RESTART_FIXED_INDEX, #24565

		}

		return false;

	}

	function createElementNS( name ) {

		return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

	}

	function createCanvasElement() {

		const canvas = createElementNS( 'canvas' );
		canvas.style.display = 'block';
		return canvas;

	}

	const _cache = {};

	function warnOnce( message ) {

		if ( message in _cache ) return;

		_cache[ message ] = true;

		console.warn( message );

	}

	/**
	 * Matrices converting P3 <-> Rec. 709 primaries, without gamut mapping
	 * or clipping. Based on W3C specifications for sRGB and Display P3,
	 * and ICC specifications for the D50 connection space. Values in/out
	 * are _linear_ sRGB and _linear_ Display P3.
	 *
	 * Note that both sRGB and Display P3 use the sRGB transfer functions.
	 *
	 * Reference:
	 * - http://www.russellcottrell.com/photo/matrixCalculator.htm
	 */

	const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = /*@__PURE__*/ new Matrix3().set(
		0.8224621, 0.177538, 0.0,
		0.0331941, 0.9668058, 0.0,
		0.0170827, 0.0723974, 0.9105199,
	);

	const LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = /*@__PURE__*/ new Matrix3().set(
		1.2249401, - 0.2249404, 0.0,
		- 0.0420569, 1.0420571, 0.0,
		- 0.0196376, - 0.0786361, 1.0982735
	);

	/**
	 * Defines supported color spaces by transfer function and primaries,
	 * and provides conversions to/from the Linear-sRGB reference space.
	 */
	const COLOR_SPACES = {
		[ LinearSRGBColorSpace ]: {
			transfer: LinearTransfer,
			primaries: Rec709Primaries,
			toReference: ( color ) => color,
			fromReference: ( color ) => color,
		},
		[ SRGBColorSpace ]: {
			transfer: SRGBTransfer,
			primaries: Rec709Primaries,
			toReference: ( color ) => color.convertSRGBToLinear(),
			fromReference: ( color ) => color.convertLinearToSRGB(),
		},
		[ LinearDisplayP3ColorSpace ]: {
			transfer: LinearTransfer,
			primaries: P3Primaries,
			toReference: ( color ) => color.applyMatrix3( LINEAR_DISPLAY_P3_TO_LINEAR_SRGB ),
			fromReference: ( color ) => color.applyMatrix3( LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 ),
		},
		[ DisplayP3ColorSpace ]: {
			transfer: SRGBTransfer,
			primaries: P3Primaries,
			toReference: ( color ) => color.convertSRGBToLinear().applyMatrix3( LINEAR_DISPLAY_P3_TO_LINEAR_SRGB ),
			fromReference: ( color ) => color.applyMatrix3( LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 ).convertLinearToSRGB(),
		},
	};

	const SUPPORTED_WORKING_COLOR_SPACES = new Set( [ LinearSRGBColorSpace, LinearDisplayP3ColorSpace ] );

	const ColorManagement = {

		enabled: true,

		_workingColorSpace: LinearSRGBColorSpace,

		get workingColorSpace() {

			return this._workingColorSpace;

		},

		set workingColorSpace( colorSpace ) {

			if ( ! SUPPORTED_WORKING_COLOR_SPACES.has( colorSpace ) ) {

				throw new Error( `Unsupported working color space, "${ colorSpace }".` );

			}

			this._workingColorSpace = colorSpace;

		},

		convert: function ( color, sourceColorSpace, targetColorSpace ) {

			if ( this.enabled === false || sourceColorSpace === targetColorSpace || ! sourceColorSpace || ! targetColorSpace ) {

				return color;

			}

			const sourceToReference = COLOR_SPACES[ sourceColorSpace ].toReference;
			const targetFromReference = COLOR_SPACES[ targetColorSpace ].fromReference;

			return targetFromReference( sourceToReference( color ) );

		},

		fromWorkingColorSpace: function ( color, targetColorSpace ) {

			return this.convert( color, this._workingColorSpace, targetColorSpace );

		},

		toWorkingColorSpace: function ( color, sourceColorSpace ) {

			return this.convert( color, sourceColorSpace, this._workingColorSpace );

		},

		getPrimaries: function ( colorSpace ) {

			return COLOR_SPACES[ colorSpace ].primaries;

		},

		getTransfer: function ( colorSpace ) {

			if ( colorSpace === NoColorSpace ) return LinearTransfer;

			return COLOR_SPACES[ colorSpace ].transfer;

		},

	};


	function SRGBToLinear( c ) {

		return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

	}

	function LinearToSRGB( c ) {

		return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

	}

	let _canvas;

	class ImageUtils {

		static getDataURL( image ) {

			if ( /^data:/i.test( image.src ) ) {

				return image.src;

			}

			if ( typeof HTMLCanvasElement === 'undefined' ) {

				return image.src;

			}

			let canvas;

			if ( image instanceof HTMLCanvasElement ) {

				canvas = image;

			} else {

				if ( _canvas === undefined ) _canvas = createElementNS( 'canvas' );

				_canvas.width = image.width;
				_canvas.height = image.height;

				const context = _canvas.getContext( '2d' );

				if ( image instanceof ImageData ) {

					context.putImageData( image, 0, 0 );

				} else {

					context.drawImage( image, 0, 0, image.width, image.height );

				}

				canvas = _canvas;

			}

			if ( canvas.width > 2048 || canvas.height > 2048 ) {

				console.warn( 'THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', image );

				return canvas.toDataURL( 'image/jpeg', 0.6 );

			} else {

				return canvas.toDataURL( 'image/png' );

			}

		}

		static sRGBToLinear( image ) {

			if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
				( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
				( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

				const canvas = createElementNS( 'canvas' );

				canvas.width = image.width;
				canvas.height = image.height;

				const context = canvas.getContext( '2d' );
				context.drawImage( image, 0, 0, image.width, image.height );

				const imageData = context.getImageData( 0, 0, image.width, image.height );
				const data = imageData.data;

				for ( let i = 0; i < data.length; i ++ ) {

					data[ i ] = SRGBToLinear( data[ i ] / 255 ) * 255;

				}

				context.putImageData( imageData, 0, 0 );

				return canvas;

			} else if ( image.data ) {

				const data = image.data.slice( 0 );

				for ( let i = 0; i < data.length; i ++ ) {

					if ( data instanceof Uint8Array || data instanceof Uint8ClampedArray ) {

						data[ i ] = Math.floor( SRGBToLinear( data[ i ] / 255 ) * 255 );

					} else {

						// assuming float

						data[ i ] = SRGBToLinear( data[ i ] );

					}

				}

				return {
					data: data,
					width: image.width,
					height: image.height
				};

			} else {

				console.warn( 'THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.' );
				return image;

			}

		}

	}

	let _sourceId = 0;

	class Source {

		constructor( data = null ) {

			this.isSource = true;

			Object.defineProperty( this, 'id', { value: _sourceId ++ } );

			this.uuid = generateUUID();

			this.data = data;

			this.version = 0;

		}

		set needsUpdate( value ) {

			if ( value === true ) this.version ++;

		}

		toJSON( meta ) {

			const isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.images[ this.uuid ] !== undefined ) {

				return meta.images[ this.uuid ];

			}

			const output = {
				uuid: this.uuid,
				url: ''
			};

			const data = this.data;

			if ( data !== null ) {

				let url;

				if ( Array.isArray( data ) ) {

					// cube texture

					url = [];

					for ( let i = 0, l = data.length; i < l; i ++ ) {

						if ( data[ i ].isDataTexture ) {

							url.push( serializeImage( data[ i ].image ) );

						} else {

							url.push( serializeImage( data[ i ] ) );

						}

					}

				} else {

					// texture

					url = serializeImage( data );

				}

				output.url = url;

			}

			if ( ! isRootObject ) {

				meta.images[ this.uuid ] = output;

			}

			return output;

		}

	}

	function serializeImage( image ) {

		if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
			( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
			( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

			// default images

			return ImageUtils.getDataURL( image );

		} else {

			if ( image.data ) {

				// images of DataTexture

				return {
					data: Array.from( image.data ),
					width: image.width,
					height: image.height,
					type: image.data.constructor.name
				};

			} else {

				console.warn( 'THREE.Texture: Unable to serialize Texture.' );
				return {};

			}

		}

	}

	let _textureId = 0;

	class Texture extends EventDispatcher {

		constructor( image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace ) {

			super();

			this.isTexture = true;

			Object.defineProperty( this, 'id', { value: _textureId ++ } );

			this.uuid = generateUUID();

			this.name = '';

			this.source = new Source( image );
			this.mipmaps = [];

			this.mapping = mapping;
			this.channel = 0;

			this.wrapS = wrapS;
			this.wrapT = wrapT;

			this.magFilter = magFilter;
			this.minFilter = minFilter;

			this.anisotropy = anisotropy;

			this.format = format;
			this.internalFormat = null;
			this.type = type;

			this.offset = new Vector2( 0, 0 );
			this.repeat = new Vector2( 1, 1 );
			this.center = new Vector2( 0, 0 );
			this.rotation = 0;

			this.matrixAutoUpdate = true;
			this.matrix = new Matrix3();

			this.generateMipmaps = true;
			this.premultiplyAlpha = false;
			this.flipY = true;
			this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

			if ( typeof colorSpace === 'string' ) {

				this.colorSpace = colorSpace;

			} else { // @deprecated, r152

				warnOnce( 'THREE.Texture: Property .encoding has been replaced by .colorSpace.' );
				this.colorSpace = colorSpace === sRGBEncoding ? SRGBColorSpace : NoColorSpace;

			}


			this.userData = {};

			this.version = 0;
			this.onUpdate = null;

			this.isRenderTargetTexture = false; // indicates whether a texture belongs to a render target or not
			this.needsPMREMUpdate = false; // indicates whether this texture should be processed by PMREMGenerator or not (only relevant for render target textures)

		}

		get image() {

			return this.source.data;

		}

		set image( value = null ) {

			this.source.data = value;

		}

		updateMatrix() {

			this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( source ) {

			this.name = source.name;

			this.source = source.source;
			this.mipmaps = source.mipmaps.slice( 0 );

			this.mapping = source.mapping;
			this.channel = source.channel;

			this.wrapS = source.wrapS;
			this.wrapT = source.wrapT;

			this.magFilter = source.magFilter;
			this.minFilter = source.minFilter;

			this.anisotropy = source.anisotropy;

			this.format = source.format;
			this.internalFormat = source.internalFormat;
			this.type = source.type;

			this.offset.copy( source.offset );
			this.repeat.copy( source.repeat );
			this.center.copy( source.center );
			this.rotation = source.rotation;

			this.matrixAutoUpdate = source.matrixAutoUpdate;
			this.matrix.copy( source.matrix );

			this.generateMipmaps = source.generateMipmaps;
			this.premultiplyAlpha = source.premultiplyAlpha;
			this.flipY = source.flipY;
			this.unpackAlignment = source.unpackAlignment;
			this.colorSpace = source.colorSpace;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			this.needsUpdate = true;

			return this;

		}

		toJSON( meta ) {

			const isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

				return meta.textures[ this.uuid ];

			}

			const output = {

				metadata: {
					version: 4.6,
					type: 'Texture',
					generator: 'Texture.toJSON'
				},

				uuid: this.uuid,
				name: this.name,

				image: this.source.toJSON( meta ).uuid,

				mapping: this.mapping,
				channel: this.channel,

				repeat: [ this.repeat.x, this.repeat.y ],
				offset: [ this.offset.x, this.offset.y ],
				center: [ this.center.x, this.center.y ],
				rotation: this.rotation,

				wrap: [ this.wrapS, this.wrapT ],

				format: this.format,
				internalFormat: this.internalFormat,
				type: this.type,
				colorSpace: this.colorSpace,

				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,

				flipY: this.flipY,

				generateMipmaps: this.generateMipmaps,
				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment

			};

			if ( Object.keys( this.userData ).length > 0 ) output.userData = this.userData;

			if ( ! isRootObject ) {

				meta.textures[ this.uuid ] = output;

			}

			return output;

		}

		dispose() {

			this.dispatchEvent( { type: 'dispose' } );

		}

		transformUv( uv ) {

			if ( this.mapping !== UVMapping ) return uv;

			uv.applyMatrix3( this.matrix );

			if ( uv.x < 0 || uv.x > 1 ) {

				switch ( this.wrapS ) {

					case RepeatWrapping:

						uv.x = uv.x - Math.floor( uv.x );
						break;

					case ClampToEdgeWrapping:

						uv.x = uv.x < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

							uv.x = Math.ceil( uv.x ) - uv.x;

						} else {

							uv.x = uv.x - Math.floor( uv.x );

						}

						break;

				}

			}

			if ( uv.y < 0 || uv.y > 1 ) {

				switch ( this.wrapT ) {

					case RepeatWrapping:

						uv.y = uv.y - Math.floor( uv.y );
						break;

					case ClampToEdgeWrapping:

						uv.y = uv.y < 0 ? 0 : 1;
						break;

					case MirroredRepeatWrapping:

						if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

							uv.y = Math.ceil( uv.y ) - uv.y;

						} else {

							uv.y = uv.y - Math.floor( uv.y );

						}

						break;

				}

			}

			if ( this.flipY ) {

				uv.y = 1 - uv.y;

			}

			return uv;

		}

		set needsUpdate( value ) {

			if ( value === true ) {

				this.version ++;
				this.source.needsUpdate = true;

			}

		}

		get encoding() { // @deprecated, r152

			warnOnce( 'THREE.Texture: Property .encoding has been replaced by .colorSpace.' );
			return this.colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;

		}

		set encoding( encoding ) { // @deprecated, r152

			warnOnce( 'THREE.Texture: Property .encoding has been replaced by .colorSpace.' );
			this.colorSpace = encoding === sRGBEncoding ? SRGBColorSpace : NoColorSpace;

		}

	}

	Texture.DEFAULT_IMAGE = null;
	Texture.DEFAULT_MAPPING = UVMapping;
	Texture.DEFAULT_ANISOTROPY = 1;

	class Vector4 {

		constructor( x = 0, y = 0, z = 0, w = 1 ) {

			Vector4.prototype.isVector4 = true;

			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;

		}

		get width() {

			return this.z;

		}

		set width( value ) {

			this.z = value;

		}

		get height() {

			return this.w;

		}

		set height( value ) {

			this.w = value;

		}

		set( x, y, z, w ) {

			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;

			return this;

		}

		setScalar( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;
			this.w = scalar;

			return this;

		}

		setX( x ) {

			this.x = x;

			return this;

		}

		setY( y ) {

			this.y = y;

			return this;

		}

		setZ( z ) {

			this.z = z;

			return this;

		}

		setW( w ) {

			this.w = w;

			return this;

		}

		setComponent( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				case 3: this.w = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		}

		getComponent( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				case 3: return this.w;
				default: throw new Error( 'index is out of range: ' + index );

			}

		}

		clone() {

			return new this.constructor( this.x, this.y, this.z, this.w );

		}

		copy( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
			this.w = ( v.w !== undefined ) ? v.w : 1;

			return this;

		}

		add( v ) {

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
			this.w += v.w;

			return this;

		}

		addScalar( s ) {

			this.x += s;
			this.y += s;
			this.z += s;
			this.w += s;

			return this;

		}

		addVectors( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;
			this.w = a.w + b.w;

			return this;

		}

		addScaledVector( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;
			this.w += v.w * s;

			return this;

		}

		sub( v ) {

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
			this.w -= v.w;

			return this;

		}

		subScalar( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;
			this.w -= s;

			return this;

		}

		subVectors( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;
			this.w = a.w - b.w;

			return this;

		}

		multiply( v ) {

			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;
			this.w *= v.w;

			return this;

		}

		multiplyScalar( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			this.w *= scalar;

			return this;

		}

		applyMatrix4( m ) {

			const x = this.x, y = this.y, z = this.z, w = this.w;
			const e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
			this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

			return this;

		}

		divideScalar( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		}

		setAxisAngleFromQuaternion( q ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

			// q is assumed to be normalized

			this.w = 2 * Math.acos( q.w );

			const s = Math.sqrt( 1 - q.w * q.w );

			if ( s < 0.0001 ) {

				this.x = 1;
				this.y = 0;
				this.z = 0;

			} else {

				this.x = q.x / s;
				this.y = q.y / s;
				this.z = q.z / s;

			}

			return this;

		}

		setAxisAngleFromRotationMatrix( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			let angle, x, y, z; // variables for result
			const epsilon = 0.01,		// margin to allow for rounding errors
				epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

				te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
			     ( Math.abs( m13 - m31 ) < epsilon ) &&
			     ( Math.abs( m23 - m32 ) < epsilon ) ) {

				// singularity found
				// first check for identity matrix which must have +1 for all terms
				// in leading diagonal and zero in other terms

				if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
				     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
				     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
				     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

					// this singularity is identity matrix so angle = 0

					this.set( 1, 0, 0, 0 );

					return this; // zero angle, arbitrary axis

				}

				// otherwise this singularity is angle = 180

				angle = Math.PI;

				const xx = ( m11 + 1 ) / 2;
				const yy = ( m22 + 1 ) / 2;
				const zz = ( m33 + 1 ) / 2;
				const xy = ( m12 + m21 ) / 4;
				const xz = ( m13 + m31 ) / 4;
				const yz = ( m23 + m32 ) / 4;

				if ( ( xx > yy ) && ( xx > zz ) ) {

					// m11 is the largest diagonal term

					if ( xx < epsilon ) {

						x = 0;
						y = 0.707106781;
						z = 0.707106781;

					} else {

						x = Math.sqrt( xx );
						y = xy / x;
						z = xz / x;

					}

				} else if ( yy > zz ) {

					// m22 is the largest diagonal term

					if ( yy < epsilon ) {

						x = 0.707106781;
						y = 0;
						z = 0.707106781;

					} else {

						y = Math.sqrt( yy );
						x = xy / y;
						z = yz / y;

					}

				} else {

					// m33 is the largest diagonal term so base result on this

					if ( zz < epsilon ) {

						x = 0.707106781;
						y = 0.707106781;
						z = 0;

					} else {

						z = Math.sqrt( zz );
						x = xz / z;
						y = yz / z;

					}

				}

				this.set( x, y, z, angle );

				return this; // return 180 deg rotation

			}

			// as we have reached here there are no singularities so we can handle normally

			let s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
				( m13 - m31 ) * ( m13 - m31 ) +
				( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

			if ( Math.abs( s ) < 0.001 ) s = 1;

			// prevent divide by zero, should not happen if matrix is orthogonal and should be
			// caught by singularity test above, but I've left it in just in case

			this.x = ( m32 - m23 ) / s;
			this.y = ( m13 - m31 ) / s;
			this.z = ( m21 - m12 ) / s;
			this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

			return this;

		}

		min( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );
			this.w = Math.min( this.w, v.w );

			return this;

		}

		max( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );
			this.w = Math.max( this.w, v.w );

			return this;

		}

		clamp( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );
			this.w = Math.max( min.w, Math.min( max.w, this.w ) );

			return this;

		}

		clampScalar( minVal, maxVal ) {

			this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
			this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
			this.z = Math.max( minVal, Math.min( maxVal, this.z ) );
			this.w = Math.max( minVal, Math.min( maxVal, this.w ) );

			return this;

		}

		clampLength( min, max ) {

			const length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		}

		floor() {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );
			this.w = Math.floor( this.w );

			return this;

		}

		ceil() {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );
			this.w = Math.ceil( this.w );

			return this;

		}

		round() {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );
			this.w = Math.round( this.w );

			return this;

		}

		roundToZero() {

			this.x = Math.trunc( this.x );
			this.y = Math.trunc( this.y );
			this.z = Math.trunc( this.z );
			this.w = Math.trunc( this.w );

			return this;

		}

		negate() {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;
			this.w = - this.w;

			return this;

		}

		dot( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

		}

		lengthSq() {

			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

		}

		length() {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

		}

		manhattanLength() {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

		}

		normalize() {

			return this.divideScalar( this.length() || 1 );

		}

		setLength( length ) {

			return this.normalize().multiplyScalar( length );

		}

		lerp( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;
			this.z += ( v.z - this.z ) * alpha;
			this.w += ( v.w - this.w ) * alpha;

			return this;

		}

		lerpVectors( v1, v2, alpha ) {

			this.x = v1.x + ( v2.x - v1.x ) * alpha;
			this.y = v1.y + ( v2.y - v1.y ) * alpha;
			this.z = v1.z + ( v2.z - v1.z ) * alpha;
			this.w = v1.w + ( v2.w - v1.w ) * alpha;

			return this;

		}

		equals( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

		}

		fromArray( array, offset = 0 ) {

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];
			this.w = array[ offset + 3 ];

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;
			array[ offset + 3 ] = this.w;

			return array;

		}

		fromBufferAttribute( attribute, index ) {

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );
			this.w = attribute.getW( index );

			return this;

		}

		random() {

			this.x = Math.random();
			this.y = Math.random();
			this.z = Math.random();
			this.w = Math.random();

			return this;

		}

		*[ Symbol.iterator ]() {

			yield this.x;
			yield this.y;
			yield this.z;
			yield this.w;

		}

	}

	/*
	 In options, we can specify:
	 * Texture parameters for an auto-generated target texture
	 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
	*/
	class RenderTarget extends EventDispatcher {

		constructor( width = 1, height = 1, options = {} ) {

			super();

			this.isRenderTarget = true;

			this.width = width;
			this.height = height;
			this.depth = 1;

			this.scissor = new Vector4( 0, 0, width, height );
			this.scissorTest = false;

			this.viewport = new Vector4( 0, 0, width, height );

			const image = { width: width, height: height, depth: 1 };

			if ( options.encoding !== undefined ) {

				// @deprecated, r152
				warnOnce( 'THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.' );
				options.colorSpace = options.encoding === sRGBEncoding ? SRGBColorSpace : NoColorSpace;

			}

			options = Object.assign( {
				generateMipmaps: false,
				internalFormat: null,
				minFilter: LinearFilter,
				depthBuffer: true,
				stencilBuffer: false,
				depthTexture: null,
				samples: 0
			}, options );

			this.texture = new Texture( image, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.colorSpace );
			this.texture.isRenderTargetTexture = true;

			this.texture.flipY = false;
			this.texture.generateMipmaps = options.generateMipmaps;
			this.texture.internalFormat = options.internalFormat;

			this.depthBuffer = options.depthBuffer;
			this.stencilBuffer = options.stencilBuffer;

			this.depthTexture = options.depthTexture;

			this.samples = options.samples;

		}

		setSize( width, height, depth = 1 ) {

			if ( this.width !== width || this.height !== height || this.depth !== depth ) {

				this.width = width;
				this.height = height;
				this.depth = depth;

				this.texture.image.width = width;
				this.texture.image.height = height;
				this.texture.image.depth = depth;

				this.dispose();

			}

			this.viewport.set( 0, 0, width, height );
			this.scissor.set( 0, 0, width, height );

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( source ) {

			this.width = source.width;
			this.height = source.height;
			this.depth = source.depth;

			this.scissor.copy( source.scissor );
			this.scissorTest = source.scissorTest;

			this.viewport.copy( source.viewport );

			this.texture = source.texture.clone();
			this.texture.isRenderTargetTexture = true;

			// ensure image object is not shared, see #20328

			const image = Object.assign( {}, source.texture.image );
			this.texture.source = new Source( image );

			this.depthBuffer = source.depthBuffer;
			this.stencilBuffer = source.stencilBuffer;

			if ( source.depthTexture !== null ) this.depthTexture = source.depthTexture.clone();

			this.samples = source.samples;

			return this;

		}

		dispose() {

			this.dispatchEvent( { type: 'dispose' } );

		}

	}

	class WebGLRenderTarget extends RenderTarget {

		constructor( width = 1, height = 1, options = {} ) {

			super( width, height, options );

			this.isWebGLRenderTarget = true;

		}

	}

	class DataArrayTexture extends Texture {

		constructor( data = null, width = 1, height = 1, depth = 1 ) {

			super( null );

			this.isDataArrayTexture = true;

			this.image = { data, width, height, depth };

			this.magFilter = NearestFilter;
			this.minFilter = NearestFilter;

			this.wrapR = ClampToEdgeWrapping;

			this.generateMipmaps = false;
			this.flipY = false;
			this.unpackAlignment = 1;

		}

	}

	class Data3DTexture extends Texture {

		constructor( data = null, width = 1, height = 1, depth = 1 ) {

			// We're going to add .setXXX() methods for setting properties later.
			// Users can still set in DataTexture3D directly.
			//
			//	const texture = new THREE.DataTexture3D( data, width, height, depth );
			// 	texture.anisotropy = 16;
			//
			// See #14839

			super( null );

			this.isData3DTexture = true;

			this.image = { data, width, height, depth };

			this.magFilter = NearestFilter;
			this.minFilter = NearestFilter;

			this.wrapR = ClampToEdgeWrapping;

			this.generateMipmaps = false;
			this.flipY = false;
			this.unpackAlignment = 1;

		}

	}

	class Quaternion {

		constructor( x = 0, y = 0, z = 0, w = 1 ) {

			this.isQuaternion = true;

			this._x = x;
			this._y = y;
			this._z = z;
			this._w = w;

		}

		static slerpFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

			// fuzz-free, array-based Quaternion SLERP operation

			let x0 = src0[ srcOffset0 + 0 ],
				y0 = src0[ srcOffset0 + 1 ],
				z0 = src0[ srcOffset0 + 2 ],
				w0 = src0[ srcOffset0 + 3 ];

			const x1 = src1[ srcOffset1 + 0 ],
				y1 = src1[ srcOffset1 + 1 ],
				z1 = src1[ srcOffset1 + 2 ],
				w1 = src1[ srcOffset1 + 3 ];

			if ( t === 0 ) {

				dst[ dstOffset + 0 ] = x0;
				dst[ dstOffset + 1 ] = y0;
				dst[ dstOffset + 2 ] = z0;
				dst[ dstOffset + 3 ] = w0;
				return;

			}

			if ( t === 1 ) {

				dst[ dstOffset + 0 ] = x1;
				dst[ dstOffset + 1 ] = y1;
				dst[ dstOffset + 2 ] = z1;
				dst[ dstOffset + 3 ] = w1;
				return;

			}

			if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

				let s = 1 - t;
				const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
					dir = ( cos >= 0 ? 1 : - 1 ),
					sqrSin = 1 - cos * cos;

				// Skip the Slerp for tiny steps to avoid numeric problems:
				if ( sqrSin > Number.EPSILON ) {

					const sin = Math.sqrt( sqrSin ),
						len = Math.atan2( sin, cos * dir );

					s = Math.sin( s * len ) / sin;
					t = Math.sin( t * len ) / sin;

				}

				const tDir = t * dir;

				x0 = x0 * s + x1 * tDir;
				y0 = y0 * s + y1 * tDir;
				z0 = z0 * s + z1 * tDir;
				w0 = w0 * s + w1 * tDir;

				// Normalize in case we just did a lerp:
				if ( s === 1 - t ) {

					const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

					x0 *= f;
					y0 *= f;
					z0 *= f;
					w0 *= f;

				}

			}

			dst[ dstOffset ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;

		}

		static multiplyQuaternionsFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

			const x0 = src0[ srcOffset0 ];
			const y0 = src0[ srcOffset0 + 1 ];
			const z0 = src0[ srcOffset0 + 2 ];
			const w0 = src0[ srcOffset0 + 3 ];

			const x1 = src1[ srcOffset1 ];
			const y1 = src1[ srcOffset1 + 1 ];
			const z1 = src1[ srcOffset1 + 2 ];
			const w1 = src1[ srcOffset1 + 3 ];

			dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
			dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
			dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
			dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

			return dst;

		}

		get x() {

			return this._x;

		}

		set x( value ) {

			this._x = value;
			this._onChangeCallback();

		}

		get y() {

			return this._y;

		}

		set y( value ) {

			this._y = value;
			this._onChangeCallback();

		}

		get z() {

			return this._z;

		}

		set z( value ) {

			this._z = value;
			this._onChangeCallback();

		}

		get w() {

			return this._w;

		}

		set w( value ) {

			this._w = value;
			this._onChangeCallback();

		}

		set( x, y, z, w ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._w = w;

			this._onChangeCallback();

			return this;

		}

		clone() {

			return new this.constructor( this._x, this._y, this._z, this._w );

		}

		copy( quaternion ) {

			this._x = quaternion.x;
			this._y = quaternion.y;
			this._z = quaternion.z;
			this._w = quaternion.w;

			this._onChangeCallback();

			return this;

		}

		setFromEuler( euler, update = true ) {

			const x = euler._x, y = euler._y, z = euler._z, order = euler._order;

			// http://www.mathworks.com/matlabcentral/fileexchange/
			// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
			//	content/SpinCalc.m

			const cos = Math.cos;
			const sin = Math.sin;

			const c1 = cos( x / 2 );
			const c2 = cos( y / 2 );
			const c3 = cos( z / 2 );

			const s1 = sin( x / 2 );
			const s2 = sin( y / 2 );
			const s3 = sin( z / 2 );

			switch ( order ) {

				case 'XYZ':
					this._x = s1 * c2 * c3 + c1 * s2 * s3;
					this._y = c1 * s2 * c3 - s1 * c2 * s3;
					this._z = c1 * c2 * s3 + s1 * s2 * c3;
					this._w = c1 * c2 * c3 - s1 * s2 * s3;
					break;

				case 'YXZ':
					this._x = s1 * c2 * c3 + c1 * s2 * s3;
					this._y = c1 * s2 * c3 - s1 * c2 * s3;
					this._z = c1 * c2 * s3 - s1 * s2 * c3;
					this._w = c1 * c2 * c3 + s1 * s2 * s3;
					break;

				case 'ZXY':
					this._x = s1 * c2 * c3 - c1 * s2 * s3;
					this._y = c1 * s2 * c3 + s1 * c2 * s3;
					this._z = c1 * c2 * s3 + s1 * s2 * c3;
					this._w = c1 * c2 * c3 - s1 * s2 * s3;
					break;

				case 'ZYX':
					this._x = s1 * c2 * c3 - c1 * s2 * s3;
					this._y = c1 * s2 * c3 + s1 * c2 * s3;
					this._z = c1 * c2 * s3 - s1 * s2 * c3;
					this._w = c1 * c2 * c3 + s1 * s2 * s3;
					break;

				case 'YZX':
					this._x = s1 * c2 * c3 + c1 * s2 * s3;
					this._y = c1 * s2 * c3 + s1 * c2 * s3;
					this._z = c1 * c2 * s3 - s1 * s2 * c3;
					this._w = c1 * c2 * c3 - s1 * s2 * s3;
					break;

				case 'XZY':
					this._x = s1 * c2 * c3 - c1 * s2 * s3;
					this._y = c1 * s2 * c3 - s1 * c2 * s3;
					this._z = c1 * c2 * s3 + s1 * s2 * c3;
					this._w = c1 * c2 * c3 + s1 * s2 * s3;
					break;

				default:
					console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

			}

			if ( update === true ) this._onChangeCallback();

			return this;

		}

		setFromAxisAngle( axis, angle ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

			// assumes axis is normalized

			const halfAngle = angle / 2, s = Math.sin( halfAngle );

			this._x = axis.x * s;
			this._y = axis.y * s;
			this._z = axis.z * s;
			this._w = Math.cos( halfAngle );

			this._onChangeCallback();

			return this;

		}

		setFromRotationMatrix( m ) {

			// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			const te = m.elements,

				m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
				m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
				m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

				trace = m11 + m22 + m33;

			if ( trace > 0 ) {

				const s = 0.5 / Math.sqrt( trace + 1.0 );

				this._w = 0.25 / s;
				this._x = ( m32 - m23 ) * s;
				this._y = ( m13 - m31 ) * s;
				this._z = ( m21 - m12 ) * s;

			} else if ( m11 > m22 && m11 > m33 ) {

				const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

				this._w = ( m32 - m23 ) / s;
				this._x = 0.25 * s;
				this._y = ( m12 + m21 ) / s;
				this._z = ( m13 + m31 ) / s;

			} else if ( m22 > m33 ) {

				const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

				this._w = ( m13 - m31 ) / s;
				this._x = ( m12 + m21 ) / s;
				this._y = 0.25 * s;
				this._z = ( m23 + m32 ) / s;

			} else {

				const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

				this._w = ( m21 - m12 ) / s;
				this._x = ( m13 + m31 ) / s;
				this._y = ( m23 + m32 ) / s;
				this._z = 0.25 * s;

			}

			this._onChangeCallback();

			return this;

		}

		setFromUnitVectors( vFrom, vTo ) {

			// assumes direction vectors vFrom and vTo are normalized

			let r = vFrom.dot( vTo ) + 1;

			if ( r < Number.EPSILON ) {

				// vFrom and vTo point in opposite directions

				r = 0;

				if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

					this._x = - vFrom.y;
					this._y = vFrom.x;
					this._z = 0;
					this._w = r;

				} else {

					this._x = 0;
					this._y = - vFrom.z;
					this._z = vFrom.y;
					this._w = r;

				}

			} else {

				// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

				this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
				this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
				this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
				this._w = r;

			}

			return this.normalize();

		}

		angleTo( q ) {

			return 2 * Math.acos( Math.abs( clamp( this.dot( q ), - 1, 1 ) ) );

		}

		rotateTowards( q, step ) {

			const angle = this.angleTo( q );

			if ( angle === 0 ) return this;

			const t = Math.min( 1, step / angle );

			this.slerp( q, t );

			return this;

		}

		identity() {

			return this.set( 0, 0, 0, 1 );

		}

		invert() {

			// quaternion is assumed to have unit length

			return this.conjugate();

		}

		conjugate() {

			this._x *= - 1;
			this._y *= - 1;
			this._z *= - 1;

			this._onChangeCallback();

			return this;

		}

		dot( v ) {

			return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

		}

		lengthSq() {

			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

		}

		length() {

			return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

		}

		normalize() {

			let l = this.length();

			if ( l === 0 ) {

				this._x = 0;
				this._y = 0;
				this._z = 0;
				this._w = 1;

			} else {

				l = 1 / l;

				this._x = this._x * l;
				this._y = this._y * l;
				this._z = this._z * l;
				this._w = this._w * l;

			}

			this._onChangeCallback();

			return this;

		}

		multiply( q ) {

			return this.multiplyQuaternions( this, q );

		}

		premultiply( q ) {

			return this.multiplyQuaternions( q, this );

		}

		multiplyQuaternions( a, b ) {

			// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

			const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
			const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

			this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
			this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
			this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
			this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

			this._onChangeCallback();

			return this;

		}

		slerp( qb, t ) {

			if ( t === 0 ) return this;
			if ( t === 1 ) return this.copy( qb );

			const x = this._x, y = this._y, z = this._z, w = this._w;

			// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

			let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

			if ( cosHalfTheta < 0 ) {

				this._w = - qb._w;
				this._x = - qb._x;
				this._y = - qb._y;
				this._z = - qb._z;

				cosHalfTheta = - cosHalfTheta;

			} else {

				this.copy( qb );

			}

			if ( cosHalfTheta >= 1.0 ) {

				this._w = w;
				this._x = x;
				this._y = y;
				this._z = z;

				return this;

			}

			const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

			if ( sqrSinHalfTheta <= Number.EPSILON ) {

				const s = 1 - t;
				this._w = s * w + t * this._w;
				this._x = s * x + t * this._x;
				this._y = s * y + t * this._y;
				this._z = s * z + t * this._z;

				this.normalize(); // normalize calls _onChangeCallback()

				return this;

			}

			const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
			const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
			const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
				ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

			this._w = ( w * ratioA + this._w * ratioB );
			this._x = ( x * ratioA + this._x * ratioB );
			this._y = ( y * ratioA + this._y * ratioB );
			this._z = ( z * ratioA + this._z * ratioB );

			this._onChangeCallback();

			return this;

		}

		slerpQuaternions( qa, qb, t ) {

			return this.copy( qa ).slerp( qb, t );

		}

		random() {

			// Derived from http://planning.cs.uiuc.edu/node198.html
			// Note, this source uses w, x, y, z ordering,
			// so we swap the order below.

			const u1 = Math.random();
			const sqrt1u1 = Math.sqrt( 1 - u1 );
			const sqrtu1 = Math.sqrt( u1 );

			const u2 = 2 * Math.PI * Math.random();

			const u3 = 2 * Math.PI * Math.random();

			return this.set(
				sqrt1u1 * Math.cos( u2 ),
				sqrtu1 * Math.sin( u3 ),
				sqrtu1 * Math.cos( u3 ),
				sqrt1u1 * Math.sin( u2 ),
			);

		}

		equals( quaternion ) {

			return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

		}

		fromArray( array, offset = 0 ) {

			this._x = array[ offset ];
			this._y = array[ offset + 1 ];
			this._z = array[ offset + 2 ];
			this._w = array[ offset + 3 ];

			this._onChangeCallback();

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._w;

			return array;

		}

		fromBufferAttribute( attribute, index ) {

			this._x = attribute.getX( index );
			this._y = attribute.getY( index );
			this._z = attribute.getZ( index );
			this._w = attribute.getW( index );

			this._onChangeCallback();

			return this;

		}

		toJSON() {

			return this.toArray();

		}

		_onChange( callback ) {

			this._onChangeCallback = callback;

			return this;

		}

		_onChangeCallback() {}

		*[ Symbol.iterator ]() {

			yield this._x;
			yield this._y;
			yield this._z;
			yield this._w;

		}

	}

	class Vector3 {

		constructor( x = 0, y = 0, z = 0 ) {

			Vector3.prototype.isVector3 = true;

			this.x = x;
			this.y = y;
			this.z = z;

		}

		set( x, y, z ) {

			if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		}

		setScalar( scalar ) {

			this.x = scalar;
			this.y = scalar;
			this.z = scalar;

			return this;

		}

		setX( x ) {

			this.x = x;

			return this;

		}

		setY( y ) {

			this.y = y;

			return this;

		}

		setZ( z ) {

			this.z = z;

			return this;

		}

		setComponent( index, value ) {

			switch ( index ) {

				case 0: this.x = value; break;
				case 1: this.y = value; break;
				case 2: this.z = value; break;
				default: throw new Error( 'index is out of range: ' + index );

			}

			return this;

		}

		getComponent( index ) {

			switch ( index ) {

				case 0: return this.x;
				case 1: return this.y;
				case 2: return this.z;
				default: throw new Error( 'index is out of range: ' + index );

			}

		}

		clone() {

			return new this.constructor( this.x, this.y, this.z );

		}

		copy( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;

			return this;

		}

		add( v ) {

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;

			return this;

		}

		addScalar( s ) {

			this.x += s;
			this.y += s;
			this.z += s;

			return this;

		}

		addVectors( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;

			return this;

		}

		addScaledVector( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;
			this.z += v.z * s;

			return this;

		}

		sub( v ) {

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;

			return this;

		}

		subScalar( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;

			return this;

		}

		subVectors( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;

			return this;

		}

		multiply( v ) {

			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;

			return this;

		}

		multiplyScalar( scalar ) {

			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;

			return this;

		}

		multiplyVectors( a, b ) {

			this.x = a.x * b.x;
			this.y = a.y * b.y;
			this.z = a.z * b.z;

			return this;

		}

		applyEuler( euler ) {

			return this.applyQuaternion( _quaternion$4.setFromEuler( euler ) );

		}

		applyAxisAngle( axis, angle ) {

			return this.applyQuaternion( _quaternion$4.setFromAxisAngle( axis, angle ) );

		}

		applyMatrix3( m ) {

			const x = this.x, y = this.y, z = this.z;
			const e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
			this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

			return this;

		}

		applyNormalMatrix( m ) {

			return this.applyMatrix3( m ).normalize();

		}

		applyMatrix4( m ) {

			const x = this.x, y = this.y, z = this.z;
			const e = m.elements;

			const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

			this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
			this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
			this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

			return this;

		}

		applyQuaternion( q ) {

			// quaternion q is assumed to have unit length

			const vx = this.x, vy = this.y, vz = this.z;
			const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

			// t = 2 * cross( q.xyz, v );
			const tx = 2 * ( qy * vz - qz * vy );
			const ty = 2 * ( qz * vx - qx * vz );
			const tz = 2 * ( qx * vy - qy * vx );

			// v + q.w * t + cross( q.xyz, t );
			this.x = vx + qw * tx + qy * tz - qz * ty;
			this.y = vy + qw * ty + qz * tx - qx * tz;
			this.z = vz + qw * tz + qx * ty - qy * tx;

			return this;

		}

		project( camera ) {

			return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

		}

		unproject( camera ) {

			return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

		}

		transformDirection( m ) {

			// input: THREE.Matrix4 affine matrix
			// vector interpreted as a direction

			const x = this.x, y = this.y, z = this.z;
			const e = m.elements;

			this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
			this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
			this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

			return this.normalize();

		}

		divide( v ) {

			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;

			return this;

		}

		divideScalar( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		}

		min( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );

			return this;

		}

		max( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );

			return this;

		}

		clamp( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );

			return this;

		}

		clampScalar( minVal, maxVal ) {

			this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
			this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
			this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

			return this;

		}

		clampLength( min, max ) {

			const length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		}

		floor() {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );
			this.z = Math.floor( this.z );

			return this;

		}

		ceil() {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );
			this.z = Math.ceil( this.z );

			return this;

		}

		round() {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );
			this.z = Math.round( this.z );

			return this;

		}

		roundToZero() {

			this.x = Math.trunc( this.x );
			this.y = Math.trunc( this.y );
			this.z = Math.trunc( this.z );

			return this;

		}

		negate() {

			this.x = - this.x;
			this.y = - this.y;
			this.z = - this.z;

			return this;

		}

		dot( v ) {

			return this.x * v.x + this.y * v.y + this.z * v.z;

		}

		// TODO lengthSquared?

		lengthSq() {

			return this.x * this.x + this.y * this.y + this.z * this.z;

		}

		length() {

			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

		}

		manhattanLength() {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

		}

		normalize() {

			return this.divideScalar( this.length() || 1 );

		}

		setLength( length ) {

			return this.normalize().multiplyScalar( length );

		}

		lerp( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;
			this.z += ( v.z - this.z ) * alpha;

			return this;

		}

		lerpVectors( v1, v2, alpha ) {

			this.x = v1.x + ( v2.x - v1.x ) * alpha;
			this.y = v1.y + ( v2.y - v1.y ) * alpha;
			this.z = v1.z + ( v2.z - v1.z ) * alpha;

			return this;

		}

		cross( v ) {

			return this.crossVectors( this, v );

		}

		crossVectors( a, b ) {

			const ax = a.x, ay = a.y, az = a.z;
			const bx = b.x, by = b.y, bz = b.z;

			this.x = ay * bz - az * by;
			this.y = az * bx - ax * bz;
			this.z = ax * by - ay * bx;

			return this;

		}

		projectOnVector( v ) {

			const denominator = v.lengthSq();

			if ( denominator === 0 ) return this.set( 0, 0, 0 );

			const scalar = v.dot( this ) / denominator;

			return this.copy( v ).multiplyScalar( scalar );

		}

		projectOnPlane( planeNormal ) {

			_vector$c.copy( this ).projectOnVector( planeNormal );

			return this.sub( _vector$c );

		}

		reflect( normal ) {

			// reflect incident vector off plane orthogonal to normal
			// normal is assumed to have unit length

			return this.sub( _vector$c.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		}

		angleTo( v ) {

			const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

			if ( denominator === 0 ) return Math.PI / 2;

			const theta = this.dot( v ) / denominator;

			// clamp, to handle numerical problems

			return Math.acos( clamp( theta, - 1, 1 ) );

		}

		distanceTo( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		}

		distanceToSquared( v ) {

			const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

			return dx * dx + dy * dy + dz * dz;

		}

		manhattanDistanceTo( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

		}

		setFromSpherical( s ) {

			return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

		}

		setFromSphericalCoords( radius, phi, theta ) {

			const sinPhiRadius = Math.sin( phi ) * radius;

			this.x = sinPhiRadius * Math.sin( theta );
			this.y = Math.cos( phi ) * radius;
			this.z = sinPhiRadius * Math.cos( theta );

			return this;

		}

		setFromCylindrical( c ) {

			return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

		}

		setFromCylindricalCoords( radius, theta, y ) {

			this.x = radius * Math.sin( theta );
			this.y = y;
			this.z = radius * Math.cos( theta );

			return this;

		}

		setFromMatrixPosition( m ) {

			const e = m.elements;

			this.x = e[ 12 ];
			this.y = e[ 13 ];
			this.z = e[ 14 ];

			return this;

		}

		setFromMatrixScale( m ) {

			const sx = this.setFromMatrixColumn( m, 0 ).length();
			const sy = this.setFromMatrixColumn( m, 1 ).length();
			const sz = this.setFromMatrixColumn( m, 2 ).length();

			this.x = sx;
			this.y = sy;
			this.z = sz;

			return this;

		}

		setFromMatrixColumn( m, index ) {

			return this.fromArray( m.elements, index * 4 );

		}

		setFromMatrix3Column( m, index ) {

			return this.fromArray( m.elements, index * 3 );

		}

		setFromEuler( e ) {

			this.x = e._x;
			this.y = e._y;
			this.z = e._z;

			return this;

		}

		setFromColor( c ) {

			this.x = c.r;
			this.y = c.g;
			this.z = c.b;

			return this;

		}

		equals( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

		}

		fromArray( array, offset = 0 ) {

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;

			return array;

		}

		fromBufferAttribute( attribute, index ) {

			this.x = attribute.getX( index );
			this.y = attribute.getY( index );
			this.z = attribute.getZ( index );

			return this;

		}

		random() {

			this.x = Math.random();
			this.y = Math.random();
			this.z = Math.random();

			return this;

		}

		randomDirection() {

			// Derived from https://mathworld.wolfram.com/SpherePointPicking.html

			const u = ( Math.random() - 0.5 ) * 2;
			const t = Math.random() * Math.PI * 2;
			const f = Math.sqrt( 1 - u ** 2 );

			this.x = f * Math.cos( t );
			this.y = f * Math.sin( t );
			this.z = u;

			return this;

		}

		*[ Symbol.iterator ]() {

			yield this.x;
			yield this.y;
			yield this.z;

		}

	}

	const _vector$c = /*@__PURE__*/ new Vector3();
	const _quaternion$4 = /*@__PURE__*/ new Quaternion();

	class Box3 {

		constructor( min = new Vector3( + Infinity, + Infinity, + Infinity ), max = new Vector3( - Infinity, - Infinity, - Infinity ) ) {

			this.isBox3 = true;

			this.min = min;
			this.max = max;

		}

		set( min, max ) {

			this.min.copy( min );
			this.max.copy( max );

			return this;

		}

		setFromArray( array ) {

			this.makeEmpty();

			for ( let i = 0, il = array.length; i < il; i += 3 ) {

				this.expandByPoint( _vector$b.fromArray( array, i ) );

			}

			return this;

		}

		setFromBufferAttribute( attribute ) {

			this.makeEmpty();

			for ( let i = 0, il = attribute.count; i < il; i ++ ) {

				this.expandByPoint( _vector$b.fromBufferAttribute( attribute, i ) );

			}

			return this;

		}

		setFromPoints( points ) {

			this.makeEmpty();

			for ( let i = 0, il = points.length; i < il; i ++ ) {

				this.expandByPoint( points[ i ] );

			}

			return this;

		}

		setFromCenterAndSize( center, size ) {

			const halfSize = _vector$b.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		}

		setFromObject( object, precise = false ) {

			this.makeEmpty();

			return this.expandByObject( object, precise );

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( box ) {

			this.min.copy( box.min );
			this.max.copy( box.max );

			return this;

		}

		makeEmpty() {

			this.min.x = this.min.y = this.min.z = + Infinity;
			this.max.x = this.max.y = this.max.z = - Infinity;

			return this;

		}

		isEmpty() {

			// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

			return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

		}

		getCenter( target ) {

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

		}

		getSize( target ) {

			return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

		}

		expandByPoint( point ) {

			this.min.min( point );
			this.max.max( point );

			return this;

		}

		expandByVector( vector ) {

			this.min.sub( vector );
			this.max.add( vector );

			return this;

		}

		expandByScalar( scalar ) {

			this.min.addScalar( - scalar );
			this.max.addScalar( scalar );

			return this;

		}

		expandByObject( object, precise = false ) {

			// Computes the world-axis-aligned bounding box of an object (including its children),
			// accounting for both the object's, and children's, world transforms

			object.updateWorldMatrix( false, false );

			const geometry = object.geometry;

			if ( geometry !== undefined ) {

				const positionAttribute = geometry.getAttribute( 'position' );

				// precise AABB computation based on vertex data requires at least a position attribute.
				// instancing isn't supported so far and uses the normal (conservative) code path.

				if ( precise === true && positionAttribute !== undefined && object.isInstancedMesh !== true ) {

					for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

						if ( object.isMesh === true ) {

							object.getVertexPosition( i, _vector$b );

						} else {

							_vector$b.fromBufferAttribute( positionAttribute, i );

						}

						_vector$b.applyMatrix4( object.matrixWorld );
						this.expandByPoint( _vector$b );

					}

				} else {

					if ( object.boundingBox !== undefined ) {

						// object-level bounding box

						if ( object.boundingBox === null ) {

							object.computeBoundingBox();

						}

						_box$4.copy( object.boundingBox );


					} else {

						// geometry-level bounding box

						if ( geometry.boundingBox === null ) {

							geometry.computeBoundingBox();

						}

						_box$4.copy( geometry.boundingBox );

					}

					_box$4.applyMatrix4( object.matrixWorld );

					this.union( _box$4 );

				}

			}

			const children = object.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				this.expandByObject( children[ i ], precise );

			}

			return this;

		}

		containsPoint( point ) {

			return point.x < this.min.x || point.x > this.max.x ||
				point.y < this.min.y || point.y > this.max.y ||
				point.z < this.min.z || point.z > this.max.z ? false : true;

		}

		containsBox( box ) {

			return this.min.x <= box.min.x && box.max.x <= this.max.x &&
				this.min.y <= box.min.y && box.max.y <= this.max.y &&
				this.min.z <= box.min.z && box.max.z <= this.max.z;

		}

		getParameter( point, target ) {

			// This can potentially have a divide by zero if the box
			// has a size dimension of 0.

			return target.set(
				( point.x - this.min.x ) / ( this.max.x - this.min.x ),
				( point.y - this.min.y ) / ( this.max.y - this.min.y ),
				( point.z - this.min.z ) / ( this.max.z - this.min.z )
			);

		}

		intersectsBox( box ) {

			// using 6 splitting planes to rule out intersections.
			return box.max.x < this.min.x || box.min.x > this.max.x ||
				box.max.y < this.min.y || box.min.y > this.max.y ||
				box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

		}

		intersectsSphere( sphere ) {

			// Find the point on the AABB closest to the sphere center.
			this.clampPoint( sphere.center, _vector$b );

			// If that point is inside the sphere, the AABB and sphere intersect.
			return _vector$b.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

		}

		intersectsPlane( plane ) {

			// We compute the minimum and maximum dot product values. If those values
			// are on the same side (back or front) of the plane, then there is no intersection.

			let min, max;

			if ( plane.normal.x > 0 ) {

				min = plane.normal.x * this.min.x;
				max = plane.normal.x * this.max.x;

			} else {

				min = plane.normal.x * this.max.x;
				max = plane.normal.x * this.min.x;

			}

			if ( plane.normal.y > 0 ) {

				min += plane.normal.y * this.min.y;
				max += plane.normal.y * this.max.y;

			} else {

				min += plane.normal.y * this.max.y;
				max += plane.normal.y * this.min.y;

			}

			if ( plane.normal.z > 0 ) {

				min += plane.normal.z * this.min.z;
				max += plane.normal.z * this.max.z;

			} else {

				min += plane.normal.z * this.max.z;
				max += plane.normal.z * this.min.z;

			}

			return ( min <= - plane.constant && max >= - plane.constant );

		}

		intersectsTriangle( triangle ) {

			if ( this.isEmpty() ) {

				return false;

			}

			// compute box center and extents
			this.getCenter( _center );
			_extents.subVectors( this.max, _center );

			// translate triangle to aabb origin
			_v0$2.subVectors( triangle.a, _center );
			_v1$7.subVectors( triangle.b, _center );
			_v2$4.subVectors( triangle.c, _center );

			// compute edge vectors for triangle
			_f0.subVectors( _v1$7, _v0$2 );
			_f1.subVectors( _v2$4, _v1$7 );
			_f2.subVectors( _v0$2, _v2$4 );

			// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
			// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
			// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
			let axes = [
				0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
				_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
				- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
			];
			if ( ! satForAxes( axes, _v0$2, _v1$7, _v2$4, _extents ) ) {

				return false;

			}

			// test 3 face normals from the aabb
			axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
			if ( ! satForAxes( axes, _v0$2, _v1$7, _v2$4, _extents ) ) {

				return false;

			}

			// finally testing the face normal of the triangle
			// use already existing triangle edge vectors here
			_triangleNormal.crossVectors( _f0, _f1 );
			axes = [ _triangleNormal.x, _triangleNormal.y, _triangleNormal.z ];

			return satForAxes( axes, _v0$2, _v1$7, _v2$4, _extents );

		}

		clampPoint( point, target ) {

			return target.copy( point ).clamp( this.min, this.max );

		}

		distanceToPoint( point ) {

			return this.clampPoint( point, _vector$b ).distanceTo( point );

		}

		getBoundingSphere( target ) {

			if ( this.isEmpty() ) {

				target.makeEmpty();

			} else {

				this.getCenter( target.center );

				target.radius = this.getSize( _vector$b ).length() * 0.5;

			}

			return target;

		}

		intersect( box ) {

			this.min.max( box.min );
			this.max.min( box.max );

			// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
			if ( this.isEmpty() ) this.makeEmpty();

			return this;

		}

		union( box ) {

			this.min.min( box.min );
			this.max.max( box.max );

			return this;

		}

		applyMatrix4( matrix ) {

			// transform of empty box is an empty box.
			if ( this.isEmpty() ) return this;

			// NOTE: I am using a binary pattern to specify all 2^3 combinations below
			_points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
			_points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
			_points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
			_points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
			_points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
			_points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
			_points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
			_points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

			this.setFromPoints( _points );

			return this;

		}

		translate( offset ) {

			this.min.add( offset );
			this.max.add( offset );

			return this;

		}

		equals( box ) {

			return box.min.equals( this.min ) && box.max.equals( this.max );

		}

	}

	const _points = [
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3(),
		/*@__PURE__*/ new Vector3()
	];

	const _vector$b = /*@__PURE__*/ new Vector3();

	const _box$4 = /*@__PURE__*/ new Box3();

	// triangle centered vertices

	const _v0$2 = /*@__PURE__*/ new Vector3();
	const _v1$7 = /*@__PURE__*/ new Vector3();
	const _v2$4 = /*@__PURE__*/ new Vector3();

	// triangle edge vectors

	const _f0 = /*@__PURE__*/ new Vector3();
	const _f1 = /*@__PURE__*/ new Vector3();
	const _f2 = /*@__PURE__*/ new Vector3();

	const _center = /*@__PURE__*/ new Vector3();
	const _extents = /*@__PURE__*/ new Vector3();
	const _triangleNormal = /*@__PURE__*/ new Vector3();
	const _testAxis = /*@__PURE__*/ new Vector3();

	function satForAxes( axes, v0, v1, v2, extents ) {

		for ( let i = 0, j = axes.length - 3; i <= j; i += 3 ) {

			_testAxis.fromArray( axes, i );
			// project the aabb onto the separating axis
			const r = extents.x * Math.abs( _testAxis.x ) + extents.y * Math.abs( _testAxis.y ) + extents.z * Math.abs( _testAxis.z );
			// project all 3 vertices of the triangle onto the separating axis
			const p0 = v0.dot( _testAxis );
			const p1 = v1.dot( _testAxis );
			const p2 = v2.dot( _testAxis );
			// actual test, basically see if either of the most extreme of the triangle points intersects r
			if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

				// points of the projected triangle are outside the projected half-length of the aabb
				// the axis is separating and we can exit
				return false;

			}

		}

		return true;

	}

	const _box$3 = /*@__PURE__*/ new Box3();
	const _v1$6 = /*@__PURE__*/ new Vector3();
	const _v2$3 = /*@__PURE__*/ new Vector3();

	class Sphere {

		constructor( center = new Vector3(), radius = - 1 ) {

			this.isSphere = true;

			this.center = center;
			this.radius = radius;

		}

		set( center, radius ) {

			this.center.copy( center );
			this.radius = radius;

			return this;

		}

		setFromPoints( points, optionalCenter ) {

			const center = this.center;

			if ( optionalCenter !== undefined ) {

				center.copy( optionalCenter );

			} else {

				_box$3.setFromPoints( points ).getCenter( center );

			}

			let maxRadiusSq = 0;

			for ( let i = 0, il = points.length; i < il; i ++ ) {

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

			}

			this.radius = Math.sqrt( maxRadiusSq );

			return this;

		}

		copy( sphere ) {

			this.center.copy( sphere.center );
			this.radius = sphere.radius;

			return this;

		}

		isEmpty() {

			return ( this.radius < 0 );

		}

		makeEmpty() {

			this.center.set( 0, 0, 0 );
			this.radius = - 1;

			return this;

		}

		containsPoint( point ) {

			return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

		}

		distanceToPoint( point ) {

			return ( point.distanceTo( this.center ) - this.radius );

		}

		intersectsSphere( sphere ) {

			const radiusSum = this.radius + sphere.radius;

			return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

		}

		intersectsBox( box ) {

			return box.intersectsSphere( this );

		}

		intersectsPlane( plane ) {

			return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

		}

		clampPoint( point, target ) {

			const deltaLengthSq = this.center.distanceToSquared( point );

			target.copy( point );

			if ( deltaLengthSq > ( this.radius * this.radius ) ) {

				target.sub( this.center ).normalize();
				target.multiplyScalar( this.radius ).add( this.center );

			}

			return target;

		}

		getBoundingBox( target ) {

			if ( this.isEmpty() ) {

				// Empty sphere produces empty bounding box
				target.makeEmpty();
				return target;

			}

			target.set( this.center, this.center );
			target.expandByScalar( this.radius );

			return target;

		}

		applyMatrix4( matrix ) {

			this.center.applyMatrix4( matrix );
			this.radius = this.radius * matrix.getMaxScaleOnAxis();

			return this;

		}

		translate( offset ) {

			this.center.add( offset );

			return this;

		}

		expandByPoint( point ) {

			if ( this.isEmpty() ) {

				this.center.copy( point );

				this.radius = 0;

				return this;

			}

			_v1$6.subVectors( point, this.center );

			const lengthSq = _v1$6.lengthSq();

			if ( lengthSq > ( this.radius * this.radius ) ) {

				// calculate the minimal sphere

				const length = Math.sqrt( lengthSq );

				const delta = ( length - this.radius ) * 0.5;

				this.center.addScaledVector( _v1$6, delta / length );

				this.radius += delta;

			}

			return this;

		}

		union( sphere ) {

			if ( sphere.isEmpty() ) {

				return this;

			}

			if ( this.isEmpty() ) {

				this.copy( sphere );

				return this;

			}

			if ( this.center.equals( sphere.center ) === true ) {

				 this.radius = Math.max( this.radius, sphere.radius );

			} else {

				_v2$3.subVectors( sphere.center, this.center ).setLength( sphere.radius );

				this.expandByPoint( _v1$6.copy( sphere.center ).add( _v2$3 ) );

				this.expandByPoint( _v1$6.copy( sphere.center ).sub( _v2$3 ) );

			}

			return this;

		}

		equals( sphere ) {

			return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	const _vector$a = /*@__PURE__*/ new Vector3();
	const _segCenter = /*@__PURE__*/ new Vector3();
	const _segDir = /*@__PURE__*/ new Vector3();
	const _diff = /*@__PURE__*/ new Vector3();

	const _edge1 = /*@__PURE__*/ new Vector3();
	const _edge2 = /*@__PURE__*/ new Vector3();
	const _normal$1 = /*@__PURE__*/ new Vector3();

	class Ray {

		constructor( origin = new Vector3(), direction = new Vector3( 0, 0, - 1 ) ) {

			this.origin = origin;
			this.direction = direction;

		}

		set( origin, direction ) {

			this.origin.copy( origin );
			this.direction.copy( direction );

			return this;

		}

		copy( ray ) {

			this.origin.copy( ray.origin );
			this.direction.copy( ray.direction );

			return this;

		}

		at( t, target ) {

			return target.copy( this.origin ).addScaledVector( this.direction, t );

		}

		lookAt( v ) {

			this.direction.copy( v ).sub( this.origin ).normalize();

			return this;

		}

		recast( t ) {

			this.origin.copy( this.at( t, _vector$a ) );

			return this;

		}

		closestPointToPoint( point, target ) {

			target.subVectors( point, this.origin );

			const directionDistance = target.dot( this.direction );

			if ( directionDistance < 0 ) {

				return target.copy( this.origin );

			}

			return target.copy( this.origin ).addScaledVector( this.direction, directionDistance );

		}

		distanceToPoint( point ) {

			return Math.sqrt( this.distanceSqToPoint( point ) );

		}

		distanceSqToPoint( point ) {

			const directionDistance = _vector$a.subVectors( point, this.origin ).dot( this.direction );

			// point behind the ray

			if ( directionDistance < 0 ) {

				return this.origin.distanceToSquared( point );

			}

			_vector$a.copy( this.origin ).addScaledVector( this.direction, directionDistance );

			return _vector$a.distanceToSquared( point );

		}

		distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

			// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteDistRaySegment.h
			// It returns the min distance between the ray and the segment
			// defined by v0 and v1
			// It can also set two optional targets :
			// - The closest point on the ray
			// - The closest point on the segment

			_segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
			_segDir.copy( v1 ).sub( v0 ).normalize();
			_diff.copy( this.origin ).sub( _segCenter );

			const segExtent = v0.distanceTo( v1 ) * 0.5;
			const a01 = - this.direction.dot( _segDir );
			const b0 = _diff.dot( this.direction );
			const b1 = - _diff.dot( _segDir );
			const c = _diff.lengthSq();
			const det = Math.abs( 1 - a01 * a01 );
			let s0, s1, sqrDist, extDet;

			if ( det > 0 ) {

				// The ray and segment are not parallel.

				s0 = a01 * b1 - b0;
				s1 = a01 * b0 - b1;
				extDet = segExtent * det;

				if ( s0 >= 0 ) {

					if ( s1 >= - extDet ) {

						if ( s1 <= extDet ) {

							// region 0
							// Minimum at interior points of ray and segment.

							const invDet = 1 / det;
							s0 *= invDet;
							s1 *= invDet;
							sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

						} else {

							// region 1

							s1 = segExtent;
							s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					} else {

						// region 5

						s1 = - segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					if ( s1 <= - extDet ) {

						// region 4

						s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
						s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					} else if ( s1 <= extDet ) {

						// region 3

						s0 = 0;
						s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = s1 * ( s1 + 2 * b1 ) + c;

					} else {

						// region 2

						s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
						s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				}

			} else {

				// Ray and segment are parallel.

				s1 = ( a01 > 0 ) ? - segExtent : segExtent;
				s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
				sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

			}

			if ( optionalPointOnRay ) {

				optionalPointOnRay.copy( this.origin ).addScaledVector( this.direction, s0 );

			}

			if ( optionalPointOnSegment ) {

				optionalPointOnSegment.copy( _segCenter ).addScaledVector( _segDir, s1 );

			}

			return sqrDist;

		}

		intersectSphere( sphere, target ) {

			_vector$a.subVectors( sphere.center, this.origin );
			const tca = _vector$a.dot( this.direction );
			const d2 = _vector$a.dot( _vector$a ) - tca * tca;
			const radius2 = sphere.radius * sphere.radius;

			if ( d2 > radius2 ) return null;

			const thc = Math.sqrt( radius2 - d2 );

			// t0 = first intersect point - entrance on front of sphere
			const t0 = tca - thc;

			// t1 = second intersect point - exit point on back of sphere
			const t1 = tca + thc;

			// test to see if t1 is behind the ray - if so, return null
			if ( t1 < 0 ) return null;

			// test to see if t0 is behind the ray:
			// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
			// in order to always return an intersect point that is in front of the ray.
			if ( t0 < 0 ) return this.at( t1, target );

			// else t0 is in front of the ray, so return the first collision point scaled by t0
			return this.at( t0, target );

		}

		intersectsSphere( sphere ) {

			return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

		}

		distanceToPlane( plane ) {

			const denominator = plane.normal.dot( this.direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( plane.distanceToPoint( this.origin ) === 0 ) {

					return 0;

				}

				// Null is preferable to undefined since undefined means.... it is undefined

				return null;

			}

			const t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

			// Return if the ray never intersects the plane

			return t >= 0 ? t : null;

		}

		intersectPlane( plane, target ) {

			const t = this.distanceToPlane( plane );

			if ( t === null ) {

				return null;

			}

			return this.at( t, target );

		}

		intersectsPlane( plane ) {

			// check if the ray lies on the plane first

			const distToPoint = plane.distanceToPoint( this.origin );

			if ( distToPoint === 0 ) {

				return true;

			}

			const denominator = plane.normal.dot( this.direction );

			if ( denominator * distToPoint < 0 ) {

				return true;

			}

			// ray origin is behind the plane (and is pointing behind it)

			return false;

		}

		intersectBox( box, target ) {

			let tmin, tmax, tymin, tymax, tzmin, tzmax;

			const invdirx = 1 / this.direction.x,
				invdiry = 1 / this.direction.y,
				invdirz = 1 / this.direction.z;

			const origin = this.origin;

			if ( invdirx >= 0 ) {

				tmin = ( box.min.x - origin.x ) * invdirx;
				tmax = ( box.max.x - origin.x ) * invdirx;

			} else {

				tmin = ( box.max.x - origin.x ) * invdirx;
				tmax = ( box.min.x - origin.x ) * invdirx;

			}

			if ( invdiry >= 0 ) {

				tymin = ( box.min.y - origin.y ) * invdiry;
				tymax = ( box.max.y - origin.y ) * invdiry;

			} else {

				tymin = ( box.max.y - origin.y ) * invdiry;
				tymax = ( box.min.y - origin.y ) * invdiry;

			}

			if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

			if ( tymin > tmin || isNaN( tmin ) ) tmin = tymin;

			if ( tymax < tmax || isNaN( tmax ) ) tmax = tymax;

			if ( invdirz >= 0 ) {

				tzmin = ( box.min.z - origin.z ) * invdirz;
				tzmax = ( box.max.z - origin.z ) * invdirz;

			} else {

				tzmin = ( box.max.z - origin.z ) * invdirz;
				tzmax = ( box.min.z - origin.z ) * invdirz;

			}

			if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

			if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

			if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

			//return point closest to the ray (positive side)

			if ( tmax < 0 ) return null;

			return this.at( tmin >= 0 ? tmin : tmax, target );

		}

		intersectsBox( box ) {

			return this.intersectBox( box, _vector$a ) !== null;

		}

		intersectTriangle( a, b, c, backfaceCulling, target ) {

			// Compute the offset origin, edges, and normal.

			// from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

			_edge1.subVectors( b, a );
			_edge2.subVectors( c, a );
			_normal$1.crossVectors( _edge1, _edge2 );

			// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
			// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
			//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
			//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
			//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
			let DdN = this.direction.dot( _normal$1 );
			let sign;

			if ( DdN > 0 ) {

				if ( backfaceCulling ) return null;
				sign = 1;

			} else if ( DdN < 0 ) {

				sign = - 1;
				DdN = - DdN;

			} else {

				return null;

			}

			_diff.subVectors( this.origin, a );
			const DdQxE2 = sign * this.direction.dot( _edge2.crossVectors( _diff, _edge2 ) );

			// b1 < 0, no intersection
			if ( DdQxE2 < 0 ) {

				return null;

			}

			const DdE1xQ = sign * this.direction.dot( _edge1.cross( _diff ) );

			// b2 < 0, no intersection
			if ( DdE1xQ < 0 ) {

				return null;

			}

			// b1+b2 > 1, no intersection
			if ( DdQxE2 + DdE1xQ > DdN ) {

				return null;

			}

			// Line intersects triangle, check if ray does.
			const QdN = - sign * _diff.dot( _normal$1 );

			// t < 0, no intersection
			if ( QdN < 0 ) {

				return null;

			}

			// Ray intersects triangle.
			return this.at( QdN / DdN, target );

		}

		applyMatrix4( matrix4 ) {

			this.origin.applyMatrix4( matrix4 );
			this.direction.transformDirection( matrix4 );

			return this;

		}

		equals( ray ) {

			return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	class Matrix4 {

		constructor( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

			Matrix4.prototype.isMatrix4 = true;

			this.elements = [

				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			];

			if ( n11 !== undefined ) {

				this.set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 );

			}

		}

		set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

			const te = this.elements;

			te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
			te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
			te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
			te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

			return this;

		}

		identity() {

			this.set(

				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		}

		clone() {

			return new Matrix4().fromArray( this.elements );

		}

		copy( m ) {

			const te = this.elements;
			const me = m.elements;

			te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
			te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
			te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
			te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

			return this;

		}

		copyPosition( m ) {

			const te = this.elements, me = m.elements;

			te[ 12 ] = me[ 12 ];
			te[ 13 ] = me[ 13 ];
			te[ 14 ] = me[ 14 ];

			return this;

		}

		setFromMatrix3( m ) {

			const me = m.elements;

			this.set(

				me[ 0 ], me[ 3 ], me[ 6 ], 0,
				me[ 1 ], me[ 4 ], me[ 7 ], 0,
				me[ 2 ], me[ 5 ], me[ 8 ], 0,
				0, 0, 0, 1

			);

			return this;

		}

		extractBasis( xAxis, yAxis, zAxis ) {

			xAxis.setFromMatrixColumn( this, 0 );
			yAxis.setFromMatrixColumn( this, 1 );
			zAxis.setFromMatrixColumn( this, 2 );

			return this;

		}

		makeBasis( xAxis, yAxis, zAxis ) {

			this.set(
				xAxis.x, yAxis.x, zAxis.x, 0,
				xAxis.y, yAxis.y, zAxis.y, 0,
				xAxis.z, yAxis.z, zAxis.z, 0,
				0, 0, 0, 1
			);

			return this;

		}

		extractRotation( m ) {

			// this method does not support reflection matrices

			const te = this.elements;
			const me = m.elements;

			const scaleX = 1 / _v1$5.setFromMatrixColumn( m, 0 ).length();
			const scaleY = 1 / _v1$5.setFromMatrixColumn( m, 1 ).length();
			const scaleZ = 1 / _v1$5.setFromMatrixColumn( m, 2 ).length();

			te[ 0 ] = me[ 0 ] * scaleX;
			te[ 1 ] = me[ 1 ] * scaleX;
			te[ 2 ] = me[ 2 ] * scaleX;
			te[ 3 ] = 0;

			te[ 4 ] = me[ 4 ] * scaleY;
			te[ 5 ] = me[ 5 ] * scaleY;
			te[ 6 ] = me[ 6 ] * scaleY;
			te[ 7 ] = 0;

			te[ 8 ] = me[ 8 ] * scaleZ;
			te[ 9 ] = me[ 9 ] * scaleZ;
			te[ 10 ] = me[ 10 ] * scaleZ;
			te[ 11 ] = 0;

			te[ 12 ] = 0;
			te[ 13 ] = 0;
			te[ 14 ] = 0;
			te[ 15 ] = 1;

			return this;

		}

		makeRotationFromEuler( euler ) {

			const te = this.elements;

			const x = euler.x, y = euler.y, z = euler.z;
			const a = Math.cos( x ), b = Math.sin( x );
			const c = Math.cos( y ), d = Math.sin( y );
			const e = Math.cos( z ), f = Math.sin( z );

			if ( euler.order === 'XYZ' ) {

				const ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = - c * f;
				te[ 8 ] = d;

				te[ 1 ] = af + be * d;
				te[ 5 ] = ae - bf * d;
				te[ 9 ] = - b * c;

				te[ 2 ] = bf - ae * d;
				te[ 6 ] = be + af * d;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YXZ' ) {

				const ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce + df * b;
				te[ 4 ] = de * b - cf;
				te[ 8 ] = a * d;

				te[ 1 ] = a * f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b;

				te[ 2 ] = cf * b - de;
				te[ 6 ] = df + ce * b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZXY' ) {

				const ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[ 0 ] = ce - df * b;
				te[ 4 ] = - a * f;
				te[ 8 ] = de + cf * b;

				te[ 1 ] = cf + de * b;
				te[ 5 ] = a * e;
				te[ 9 ] = df - ce * b;

				te[ 2 ] = - a * d;
				te[ 6 ] = b;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'ZYX' ) {

				const ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[ 0 ] = c * e;
				te[ 4 ] = be * d - af;
				te[ 8 ] = ae * d + bf;

				te[ 1 ] = c * f;
				te[ 5 ] = bf * d + ae;
				te[ 9 ] = af * d - be;

				te[ 2 ] = - d;
				te[ 6 ] = b * c;
				te[ 10 ] = a * c;

			} else if ( euler.order === 'YZX' ) {

				const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = bd - ac * f;
				te[ 8 ] = bc * f + ad;

				te[ 1 ] = f;
				te[ 5 ] = a * e;
				te[ 9 ] = - b * e;

				te[ 2 ] = - d * e;
				te[ 6 ] = ad * f + bc;
				te[ 10 ] = ac - bd * f;

			} else if ( euler.order === 'XZY' ) {

				const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[ 0 ] = c * e;
				te[ 4 ] = - f;
				te[ 8 ] = d * e;

				te[ 1 ] = ac * f + bd;
				te[ 5 ] = a * e;
				te[ 9 ] = ad * f - bc;

				te[ 2 ] = bc * f - ad;
				te[ 6 ] = b * e;
				te[ 10 ] = bd * f + ac;

			}

			// bottom row
			te[ 3 ] = 0;
			te[ 7 ] = 0;
			te[ 11 ] = 0;

			// last column
			te[ 12 ] = 0;
			te[ 13 ] = 0;
			te[ 14 ] = 0;
			te[ 15 ] = 1;

			return this;

		}

		makeRotationFromQuaternion( q ) {

			return this.compose( _zero, q, _one );

		}

		lookAt( eye, target, up ) {

			const te = this.elements;

			_z.subVectors( eye, target );

			if ( _z.lengthSq() === 0 ) {

				// eye and target are in the same position

				_z.z = 1;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

			if ( _x.lengthSq() === 0 ) {

				// up and z are parallel

				if ( Math.abs( up.z ) === 1 ) {

					_z.x += 0.0001;

				} else {

					_z.z += 0.0001;

				}

				_z.normalize();
				_x.crossVectors( up, _z );

			}

			_x.normalize();
			_y.crossVectors( _z, _x );

			te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
			te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
			te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

			return this;

		}

		multiply( m ) {

			return this.multiplyMatrices( this, m );

		}

		premultiply( m ) {

			return this.multiplyMatrices( m, this );

		}

		multiplyMatrices( a, b ) {

			const ae = a.elements;
			const be = b.elements;
			const te = this.elements;

			const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
			const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
			const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
			const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

			const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
			const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
			const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
			const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

			te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
			te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
			te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
			te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

			te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
			te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
			te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
			te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

			te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
			te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
			te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
			te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

			te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
			te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
			te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
			te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

			return this;

		}

		multiplyScalar( s ) {

			const te = this.elements;

			te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
			te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
			te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
			te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

			return this;

		}

		determinant() {

			const te = this.elements;

			const n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
			const n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
			const n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
			const n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

			//TODO: make this more efficient
			//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

			return (
				n41 * (
					+ n14 * n23 * n32
					 - n13 * n24 * n32
					 - n14 * n22 * n33
					 + n12 * n24 * n33
					 + n13 * n22 * n34
					 - n12 * n23 * n34
				) +
				n42 * (
					+ n11 * n23 * n34
					 - n11 * n24 * n33
					 + n14 * n21 * n33
					 - n13 * n21 * n34
					 + n13 * n24 * n31
					 - n14 * n23 * n31
				) +
				n43 * (
					+ n11 * n24 * n32
					 - n11 * n22 * n34
					 - n14 * n21 * n32
					 + n12 * n21 * n34
					 + n14 * n22 * n31
					 - n12 * n24 * n31
				) +
				n44 * (
					- n13 * n22 * n31
					 - n11 * n23 * n32
					 + n11 * n22 * n33
					 + n13 * n21 * n32
					 - n12 * n21 * n33
					 + n12 * n23 * n31
				)

			);

		}

		transpose() {

			const te = this.elements;
			let tmp;

			tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
			tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
			tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

			tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
			tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
			tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

			return this;

		}

		setPosition( x, y, z ) {

			const te = this.elements;

			if ( x.isVector3 ) {

				te[ 12 ] = x.x;
				te[ 13 ] = x.y;
				te[ 14 ] = x.z;

			} else {

				te[ 12 ] = x;
				te[ 13 ] = y;
				te[ 14 ] = z;

			}

			return this;

		}

		invert() {

			// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
			const te = this.elements,

				n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
				n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
				n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
				n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

				t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
				t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
				t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
				t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

			const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

			if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

			const detInv = 1 / det;

			te[ 0 ] = t11 * detInv;
			te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
			te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
			te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

			te[ 4 ] = t12 * detInv;
			te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
			te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
			te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

			te[ 8 ] = t13 * detInv;
			te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
			te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
			te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

			te[ 12 ] = t14 * detInv;
			te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
			te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
			te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

			return this;

		}

		scale( v ) {

			const te = this.elements;
			const x = v.x, y = v.y, z = v.z;

			te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
			te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
			te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
			te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

			return this;

		}

		getMaxScaleOnAxis() {

			const te = this.elements;

			const scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
			const scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
			const scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

			return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

		}

		makeTranslation( x, y, z ) {

			if ( x.isVector3 ) {

				this.set(

					1, 0, 0, x.x,
					0, 1, 0, x.y,
					0, 0, 1, x.z,
					0, 0, 0, 1

				);

			} else {

				this.set(

					1, 0, 0, x,
					0, 1, 0, y,
					0, 0, 1, z,
					0, 0, 0, 1

				);

			}

			return this;

		}

		makeRotationX( theta ) {

			const c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				1, 0, 0, 0,
				0, c, - s, 0,
				0, s, c, 0,
				0, 0, 0, 1

			);

			return this;

		}

		makeRotationY( theta ) {

			const c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				 c, 0, s, 0,
				 0, 1, 0, 0,
				- s, 0, c, 0,
				 0, 0, 0, 1

			);

			return this;

		}

		makeRotationZ( theta ) {

			const c = Math.cos( theta ), s = Math.sin( theta );

			this.set(

				c, - s, 0, 0,
				s, c, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1

			);

			return this;

		}

		makeRotationAxis( axis, angle ) {

			// Based on http://www.gamedev.net/reference/articles/article1199.asp

			const c = Math.cos( angle );
			const s = Math.sin( angle );
			const t = 1 - c;
			const x = axis.x, y = axis.y, z = axis.z;
			const tx = t * x, ty = t * y;

			this.set(

				tx * x + c, tx * y - s * z, tx * z + s * y, 0,
				tx * y + s * z, ty * y + c, ty * z - s * x, 0,
				tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
				0, 0, 0, 1

			);

			return this;

		}

		makeScale( x, y, z ) {

			this.set(

				x, 0, 0, 0,
				0, y, 0, 0,
				0, 0, z, 0,
				0, 0, 0, 1

			);

			return this;

		}

		makeShear( xy, xz, yx, yz, zx, zy ) {

			this.set(

				1, yx, zx, 0,
				xy, 1, zy, 0,
				xz, yz, 1, 0,
				0, 0, 0, 1

			);

			return this;

		}

		compose( position, quaternion, scale ) {

			const te = this.elements;

			const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
			const x2 = x + x,	y2 = y + y, z2 = z + z;
			const xx = x * x2, xy = x * y2, xz = x * z2;
			const yy = y * y2, yz = y * z2, zz = z * z2;
			const wx = w * x2, wy = w * y2, wz = w * z2;

			const sx = scale.x, sy = scale.y, sz = scale.z;

			te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
			te[ 1 ] = ( xy + wz ) * sx;
			te[ 2 ] = ( xz - wy ) * sx;
			te[ 3 ] = 0;

			te[ 4 ] = ( xy - wz ) * sy;
			te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
			te[ 6 ] = ( yz + wx ) * sy;
			te[ 7 ] = 0;

			te[ 8 ] = ( xz + wy ) * sz;
			te[ 9 ] = ( yz - wx ) * sz;
			te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
			te[ 11 ] = 0;

			te[ 12 ] = position.x;
			te[ 13 ] = position.y;
			te[ 14 ] = position.z;
			te[ 15 ] = 1;

			return this;

		}

		decompose( position, quaternion, scale ) {

			const te = this.elements;

			let sx = _v1$5.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
			const sy = _v1$5.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
			const sz = _v1$5.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

			// if determine is negative, we need to invert one scale
			const det = this.determinant();
			if ( det < 0 ) sx = - sx;

			position.x = te[ 12 ];
			position.y = te[ 13 ];
			position.z = te[ 14 ];

			// scale the rotation part
			_m1$2.copy( this );

			const invSX = 1 / sx;
			const invSY = 1 / sy;
			const invSZ = 1 / sz;

			_m1$2.elements[ 0 ] *= invSX;
			_m1$2.elements[ 1 ] *= invSX;
			_m1$2.elements[ 2 ] *= invSX;

			_m1$2.elements[ 4 ] *= invSY;
			_m1$2.elements[ 5 ] *= invSY;
			_m1$2.elements[ 6 ] *= invSY;

			_m1$2.elements[ 8 ] *= invSZ;
			_m1$2.elements[ 9 ] *= invSZ;
			_m1$2.elements[ 10 ] *= invSZ;

			quaternion.setFromRotationMatrix( _m1$2 );

			scale.x = sx;
			scale.y = sy;
			scale.z = sz;

			return this;

		}

		makePerspective( left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem ) {

			const te = this.elements;
			const x = 2 * near / ( right - left );
			const y = 2 * near / ( top - bottom );

			const a = ( right + left ) / ( right - left );
			const b = ( top + bottom ) / ( top - bottom );

			let c, d;

			if ( coordinateSystem === WebGLCoordinateSystem ) {

				c = - ( far + near ) / ( far - near );
				d = ( - 2 * far * near ) / ( far - near );

			} else if ( coordinateSystem === WebGPUCoordinateSystem ) {

				c = - far / ( far - near );
				d = ( - far * near ) / ( far - near );

			} else {

				throw new Error( 'THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + coordinateSystem );

			}

			te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a; 	te[ 12 ] = 0;
			te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b; 	te[ 13 ] = 0;
			te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c; 	te[ 14 ] = d;
			te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

			return this;

		}

		makeOrthographic( left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem ) {

			const te = this.elements;
			const w = 1.0 / ( right - left );
			const h = 1.0 / ( top - bottom );
			const p = 1.0 / ( far - near );

			const x = ( right + left ) * w;
			const y = ( top + bottom ) * h;

			let z, zInv;

			if ( coordinateSystem === WebGLCoordinateSystem ) {

				z = ( far + near ) * p;
				zInv = - 2 * p;

			} else if ( coordinateSystem === WebGPUCoordinateSystem ) {

				z = near * p;
				zInv = - 1 * p;

			} else {

				throw new Error( 'THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + coordinateSystem );

			}

			te[ 0 ] = 2 * w;	te[ 4 ] = 0;		te[ 8 ] = 0; 		te[ 12 ] = - x;
			te[ 1 ] = 0; 		te[ 5 ] = 2 * h;	te[ 9 ] = 0; 		te[ 13 ] = - y;
			te[ 2 ] = 0; 		te[ 6 ] = 0;		te[ 10 ] = zInv;	te[ 14 ] = - z;
			te[ 3 ] = 0; 		te[ 7 ] = 0;		te[ 11 ] = 0;		te[ 15 ] = 1;

			return this;

		}

		equals( matrix ) {

			const te = this.elements;
			const me = matrix.elements;

			for ( let i = 0; i < 16; i ++ ) {

				if ( te[ i ] !== me[ i ] ) return false;

			}

			return true;

		}

		fromArray( array, offset = 0 ) {

			for ( let i = 0; i < 16; i ++ ) {

				this.elements[ i ] = array[ i + offset ];

			}

			return this;

		}

		toArray( array = [], offset = 0 ) {

			const te = this.elements;

			array[ offset ] = te[ 0 ];
			array[ offset + 1 ] = te[ 1 ];
			array[ offset + 2 ] = te[ 2 ];
			array[ offset + 3 ] = te[ 3 ];

			array[ offset + 4 ] = te[ 4 ];
			array[ offset + 5 ] = te[ 5 ];
			array[ offset + 6 ] = te[ 6 ];
			array[ offset + 7 ] = te[ 7 ];

			array[ offset + 8 ] = te[ 8 ];
			array[ offset + 9 ] = te[ 9 ];
			array[ offset + 10 ] = te[ 10 ];
			array[ offset + 11 ] = te[ 11 ];

			array[ offset + 12 ] = te[ 12 ];
			array[ offset + 13 ] = te[ 13 ];
			array[ offset + 14 ] = te[ 14 ];
			array[ offset + 15 ] = te[ 15 ];

			return array;

		}

	}

	const _v1$5 = /*@__PURE__*/ new Vector3();
	const _m1$2 = /*@__PURE__*/ new Matrix4();
	const _zero = /*@__PURE__*/ new Vector3( 0, 0, 0 );
	const _one = /*@__PURE__*/ new Vector3( 1, 1, 1 );
	const _x = /*@__PURE__*/ new Vector3();
	const _y = /*@__PURE__*/ new Vector3();
	const _z = /*@__PURE__*/ new Vector3();

	const _matrix$1 = /*@__PURE__*/ new Matrix4();
	const _quaternion$3 = /*@__PURE__*/ new Quaternion();

	class Euler {

		constructor( x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER ) {

			this.isEuler = true;

			this._x = x;
			this._y = y;
			this._z = z;
			this._order = order;

		}

		get x() {

			return this._x;

		}

		set x( value ) {

			this._x = value;
			this._onChangeCallback();

		}

		get y() {

			return this._y;

		}

		set y( value ) {

			this._y = value;
			this._onChangeCallback();

		}

		get z() {

			return this._z;

		}

		set z( value ) {

			this._z = value;
			this._onChangeCallback();

		}

		get order() {

			return this._order;

		}

		set order( value ) {

			this._order = value;
			this._onChangeCallback();

		}

		set( x, y, z, order = this._order ) {

			this._x = x;
			this._y = y;
			this._z = z;
			this._order = order;

			this._onChangeCallback();

			return this;

		}

		clone() {

			return new this.constructor( this._x, this._y, this._z, this._order );

		}

		copy( euler ) {

			this._x = euler._x;
			this._y = euler._y;
			this._z = euler._z;
			this._order = euler._order;

			this._onChangeCallback();

			return this;

		}

		setFromRotationMatrix( m, order = this._order, update = true ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			const te = m.elements;
			const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
			const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
			const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

			switch ( order ) {

				case 'XYZ':

					this._y = Math.asin( clamp( m13, - 1, 1 ) );

					if ( Math.abs( m13 ) < 0.9999999 ) {

						this._x = Math.atan2( - m23, m33 );
						this._z = Math.atan2( - m12, m11 );

					} else {

						this._x = Math.atan2( m32, m22 );
						this._z = 0;

					}

					break;

				case 'YXZ':

					this._x = Math.asin( - clamp( m23, - 1, 1 ) );

					if ( Math.abs( m23 ) < 0.9999999 ) {

						this._y = Math.atan2( m13, m33 );
						this._z = Math.atan2( m21, m22 );

					} else {

						this._y = Math.atan2( - m31, m11 );
						this._z = 0;

					}

					break;

				case 'ZXY':

					this._x = Math.asin( clamp( m32, - 1, 1 ) );

					if ( Math.abs( m32 ) < 0.9999999 ) {

						this._y = Math.atan2( - m31, m33 );
						this._z = Math.atan2( - m12, m22 );

					} else {

						this._y = 0;
						this._z = Math.atan2( m21, m11 );

					}

					break;

				case 'ZYX':

					this._y = Math.asin( - clamp( m31, - 1, 1 ) );

					if ( Math.abs( m31 ) < 0.9999999 ) {

						this._x = Math.atan2( m32, m33 );
						this._z = Math.atan2( m21, m11 );

					} else {

						this._x = 0;
						this._z = Math.atan2( - m12, m22 );

					}

					break;

				case 'YZX':

					this._z = Math.asin( clamp( m21, - 1, 1 ) );

					if ( Math.abs( m21 ) < 0.9999999 ) {

						this._x = Math.atan2( - m23, m22 );
						this._y = Math.atan2( - m31, m11 );

					} else {

						this._x = 0;
						this._y = Math.atan2( m13, m33 );

					}

					break;

				case 'XZY':

					this._z = Math.asin( - clamp( m12, - 1, 1 ) );

					if ( Math.abs( m12 ) < 0.9999999 ) {

						this._x = Math.atan2( m32, m22 );
						this._y = Math.atan2( m13, m11 );

					} else {

						this._x = Math.atan2( - m23, m33 );
						this._y = 0;

					}

					break;

				default:

					console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

			}

			this._order = order;

			if ( update === true ) this._onChangeCallback();

			return this;

		}

		setFromQuaternion( q, order, update ) {

			_matrix$1.makeRotationFromQuaternion( q );

			return this.setFromRotationMatrix( _matrix$1, order, update );

		}

		setFromVector3( v, order = this._order ) {

			return this.set( v.x, v.y, v.z, order );

		}

		reorder( newOrder ) {

			// WARNING: this discards revolution information -bhouston

			_quaternion$3.setFromEuler( this );

			return this.setFromQuaternion( _quaternion$3, newOrder );

		}

		equals( euler ) {

			return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

		}

		fromArray( array ) {

			this._x = array[ 0 ];
			this._y = array[ 1 ];
			this._z = array[ 2 ];
			if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

			this._onChangeCallback();

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this._x;
			array[ offset + 1 ] = this._y;
			array[ offset + 2 ] = this._z;
			array[ offset + 3 ] = this._order;

			return array;

		}

		_onChange( callback ) {

			this._onChangeCallback = callback;

			return this;

		}

		_onChangeCallback() {}

		*[ Symbol.iterator ]() {

			yield this._x;
			yield this._y;
			yield this._z;
			yield this._order;

		}

	}

	Euler.DEFAULT_ORDER = 'XYZ';

	class Layers {

		constructor() {

			this.mask = 1 | 0;

		}

		set( channel ) {

			this.mask = ( 1 << channel | 0 ) >>> 0;

		}

		enable( channel ) {

			this.mask |= 1 << channel | 0;

		}

		enableAll() {

			this.mask = 0xffffffff | 0;

		}

		toggle( channel ) {

			this.mask ^= 1 << channel | 0;

		}

		disable( channel ) {

			this.mask &= ~ ( 1 << channel | 0 );

		}

		disableAll() {

			this.mask = 0;

		}

		test( layers ) {

			return ( this.mask & layers.mask ) !== 0;

		}

		isEnabled( channel ) {

			return ( this.mask & ( 1 << channel | 0 ) ) !== 0;

		}

	}

	let _object3DId = 0;

	const _v1$4 = /*@__PURE__*/ new Vector3();
	const _q1 = /*@__PURE__*/ new Quaternion();
	const _m1$1 = /*@__PURE__*/ new Matrix4();
	const _target = /*@__PURE__*/ new Vector3();

	const _position$3 = /*@__PURE__*/ new Vector3();
	const _scale$2 = /*@__PURE__*/ new Vector3();
	const _quaternion$2 = /*@__PURE__*/ new Quaternion();

	const _xAxis = /*@__PURE__*/ new Vector3( 1, 0, 0 );
	const _yAxis = /*@__PURE__*/ new Vector3( 0, 1, 0 );
	const _zAxis = /*@__PURE__*/ new Vector3( 0, 0, 1 );

	const _addedEvent = { type: 'added' };
	const _removedEvent = { type: 'removed' };

	class Object3D extends EventDispatcher {

		constructor() {

			super();

			this.isObject3D = true;

			Object.defineProperty( this, 'id', { value: _object3DId ++ } );

			this.uuid = generateUUID();

			this.name = '';
			this.type = 'Object3D';

			this.parent = null;
			this.children = [];

			this.up = Object3D.DEFAULT_UP.clone();

			const position = new Vector3();
			const rotation = new Euler();
			const quaternion = new Quaternion();
			const scale = new Vector3( 1, 1, 1 );

			function onRotationChange() {

				quaternion.setFromEuler( rotation, false );

			}

			function onQuaternionChange() {

				rotation.setFromQuaternion( quaternion, undefined, false );

			}

			rotation._onChange( onRotationChange );
			quaternion._onChange( onQuaternionChange );

			Object.defineProperties( this, {
				position: {
					configurable: true,
					enumerable: true,
					value: position
				},
				rotation: {
					configurable: true,
					enumerable: true,
					value: rotation
				},
				quaternion: {
					configurable: true,
					enumerable: true,
					value: quaternion
				},
				scale: {
					configurable: true,
					enumerable: true,
					value: scale
				},
				modelViewMatrix: {
					value: new Matrix4()
				},
				normalMatrix: {
					value: new Matrix3()
				}
			} );

			this.matrix = new Matrix4();
			this.matrixWorld = new Matrix4();

			this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;

			this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE; // checked by the renderer
			this.matrixWorldNeedsUpdate = false;

			this.layers = new Layers();
			this.visible = true;

			this.castShadow = false;
			this.receiveShadow = false;

			this.frustumCulled = true;
			this.renderOrder = 0;

			this.animations = [];

			this.userData = {};

		}

		onBeforeShadow( /* renderer, object, camera, shadowCamera, geometry, depthMaterial, group */ ) {}

		onAfterShadow( /* renderer, object, camera, shadowCamera, geometry, depthMaterial, group */ ) {}

		onBeforeRender( /* renderer, scene, camera, geometry, material, group */ ) {}

		onAfterRender( /* renderer, scene, camera, geometry, material, group */ ) {}

		applyMatrix4( matrix ) {

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			this.matrix.premultiply( matrix );

			this.matrix.decompose( this.position, this.quaternion, this.scale );

		}

		applyQuaternion( q ) {

			this.quaternion.premultiply( q );

			return this;

		}

		setRotationFromAxisAngle( axis, angle ) {

			// assumes axis is normalized

			this.quaternion.setFromAxisAngle( axis, angle );

		}

		setRotationFromEuler( euler ) {

			this.quaternion.setFromEuler( euler, true );

		}

		setRotationFromMatrix( m ) {

			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

			this.quaternion.setFromRotationMatrix( m );

		}

		setRotationFromQuaternion( q ) {

			// assumes q is normalized

			this.quaternion.copy( q );

		}

		rotateOnAxis( axis, angle ) {

			// rotate object on axis in object space
			// axis is assumed to be normalized

			_q1.setFromAxisAngle( axis, angle );

			this.quaternion.multiply( _q1 );

			return this;

		}

		rotateOnWorldAxis( axis, angle ) {

			// rotate object on axis in world space
			// axis is assumed to be normalized
			// method assumes no rotated parent

			_q1.setFromAxisAngle( axis, angle );

			this.quaternion.premultiply( _q1 );

			return this;

		}

		rotateX( angle ) {

			return this.rotateOnAxis( _xAxis, angle );

		}

		rotateY( angle ) {

			return this.rotateOnAxis( _yAxis, angle );

		}

		rotateZ( angle ) {

			return this.rotateOnAxis( _zAxis, angle );

		}

		translateOnAxis( axis, distance ) {

			// translate object by distance along axis in object space
			// axis is assumed to be normalized

			_v1$4.copy( axis ).applyQuaternion( this.quaternion );

			this.position.add( _v1$4.multiplyScalar( distance ) );

			return this;

		}

		translateX( distance ) {

			return this.translateOnAxis( _xAxis, distance );

		}

		translateY( distance ) {

			return this.translateOnAxis( _yAxis, distance );

		}

		translateZ( distance ) {

			return this.translateOnAxis( _zAxis, distance );

		}

		localToWorld( vector ) {

			this.updateWorldMatrix( true, false );

			return vector.applyMatrix4( this.matrixWorld );

		}

		worldToLocal( vector ) {

			this.updateWorldMatrix( true, false );

			return vector.applyMatrix4( _m1$1.copy( this.matrixWorld ).invert() );

		}

		lookAt( x, y, z ) {

			// This method does not support objects having non-uniformly-scaled parent(s)

			if ( x.isVector3 ) {

				_target.copy( x );

			} else {

				_target.set( x, y, z );

			}

			const parent = this.parent;

			this.updateWorldMatrix( true, false );

			_position$3.setFromMatrixPosition( this.matrixWorld );

			if ( this.isCamera || this.isLight ) {

				_m1$1.lookAt( _position$3, _target, this.up );

			} else {

				_m1$1.lookAt( _target, _position$3, this.up );

			}

			this.quaternion.setFromRotationMatrix( _m1$1 );

			if ( parent ) {

				_m1$1.extractRotation( parent.matrixWorld );
				_q1.setFromRotationMatrix( _m1$1 );
				this.quaternion.premultiply( _q1.invert() );

			}

		}

		add( object ) {

			if ( arguments.length > 1 ) {

				for ( let i = 0; i < arguments.length; i ++ ) {

					this.add( arguments[ i ] );

				}

				return this;

			}

			if ( object === this ) {

				console.error( 'THREE.Object3D.add: object can\'t be added as a child of itself.', object );
				return this;

			}

			if ( object && object.isObject3D ) {

				if ( object.parent !== null ) {

					object.parent.remove( object );

				}

				object.parent = this;
				this.children.push( object );

				object.dispatchEvent( _addedEvent );

			} else {

				console.error( 'THREE.Object3D.add: object not an instance of THREE.Object3D.', object );

			}

			return this;

		}

		remove( object ) {

			if ( arguments.length > 1 ) {

				for ( let i = 0; i < arguments.length; i ++ ) {

					this.remove( arguments[ i ] );

				}

				return this;

			}

			const index = this.children.indexOf( object );

			if ( index !== - 1 ) {

				object.parent = null;
				this.children.splice( index, 1 );

				object.dispatchEvent( _removedEvent );

			}

			return this;

		}

		removeFromParent() {

			const parent = this.parent;

			if ( parent !== null ) {

				parent.remove( this );

			}

			return this;

		}

		clear() {

			return this.remove( ... this.children );

		}

		attach( object ) {

			// adds object as a child of this, while maintaining the object's world transform

			// Note: This method does not support scene graphs having non-uniformly-scaled nodes(s)

			this.updateWorldMatrix( true, false );

			_m1$1.copy( this.matrixWorld ).invert();

			if ( object.parent !== null ) {

				object.parent.updateWorldMatrix( true, false );

				_m1$1.multiply( object.parent.matrixWorld );

			}

			object.applyMatrix4( _m1$1 );

			this.add( object );

			object.updateWorldMatrix( false, true );

			return this;

		}

		getObjectById( id ) {

			return this.getObjectByProperty( 'id', id );

		}

		getObjectByName( name ) {

			return this.getObjectByProperty( 'name', name );

		}

		getObjectByProperty( name, value ) {

			if ( this[ name ] === value ) return this;

			for ( let i = 0, l = this.children.length; i < l; i ++ ) {

				const child = this.children[ i ];
				const object = child.getObjectByProperty( name, value );

				if ( object !== undefined ) {

					return object;

				}

			}

			return undefined;

		}

		getObjectsByProperty( name, value, result = [] ) {

			if ( this[ name ] === value ) result.push( this );

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].getObjectsByProperty( name, value, result );

			}

			return result;

		}

		getWorldPosition( target ) {

			this.updateWorldMatrix( true, false );

			return target.setFromMatrixPosition( this.matrixWorld );

		}

		getWorldQuaternion( target ) {

			this.updateWorldMatrix( true, false );

			this.matrixWorld.decompose( _position$3, target, _scale$2 );

			return target;

		}

		getWorldScale( target ) {

			this.updateWorldMatrix( true, false );

			this.matrixWorld.decompose( _position$3, _quaternion$2, target );

			return target;

		}

		getWorldDirection( target ) {

			this.updateWorldMatrix( true, false );

			const e = this.matrixWorld.elements;

			return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

		}

		raycast( /* raycaster, intersects */ ) {}

		traverse( callback ) {

			callback( this );

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverse( callback );

			}

		}

		traverseVisible( callback ) {

			if ( this.visible === false ) return;

			callback( this );

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].traverseVisible( callback );

			}

		}

		traverseAncestors( callback ) {

			const parent = this.parent;

			if ( parent !== null ) {

				callback( parent );

				parent.traverseAncestors( callback );

			}

		}

		updateMatrix() {

			this.matrix.compose( this.position, this.quaternion, this.scale );

			this.matrixWorldNeedsUpdate = true;

		}

		updateMatrixWorld( force ) {

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.matrixWorldNeedsUpdate || force ) {

				if ( this.parent === null ) {

					this.matrixWorld.copy( this.matrix );

				} else {

					this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				}

				this.matrixWorldNeedsUpdate = false;

				force = true;

			}

			// update children

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				const child = children[ i ];

				if ( child.matrixWorldAutoUpdate === true || force === true ) {

					child.updateMatrixWorld( force );

				}

			}

		}

		updateWorldMatrix( updateParents, updateChildren ) {

			const parent = this.parent;

			if ( updateParents === true && parent !== null && parent.matrixWorldAutoUpdate === true ) {

				parent.updateWorldMatrix( true, false );

			}

			if ( this.matrixAutoUpdate ) this.updateMatrix();

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			// update children

			if ( updateChildren === true ) {

				const children = this.children;

				for ( let i = 0, l = children.length; i < l; i ++ ) {

					const child = children[ i ];

					if ( child.matrixWorldAutoUpdate === true ) {

						child.updateWorldMatrix( false, true );

					}

				}

			}

		}

		toJSON( meta ) {

			// meta is a string when called from JSON.stringify
			const isRootObject = ( meta === undefined || typeof meta === 'string' );

			const output = {};

			// meta is a hash used to collect geometries, materials.
			// not providing it implies that this is the root object
			// being serialized.
			if ( isRootObject ) {

				// initialize meta obj
				meta = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {},
					skeletons: {},
					animations: {},
					nodes: {}
				};

				output.metadata = {
					version: 4.6,
					type: 'Object',
					generator: 'Object3D.toJSON'
				};

			}

			// standard Object3D serialization

			const object = {};

			object.uuid = this.uuid;
			object.type = this.type;

			if ( this.name !== '' ) object.name = this.name;
			if ( this.castShadow === true ) object.castShadow = true;
			if ( this.receiveShadow === true ) object.receiveShadow = true;
			if ( this.visible === false ) object.visible = false;
			if ( this.frustumCulled === false ) object.frustumCulled = false;
			if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
			if ( Object.keys( this.userData ).length > 0 ) object.userData = this.userData;

			object.layers = this.layers.mask;
			object.matrix = this.matrix.toArray();
			object.up = this.up.toArray();

			if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

			// object specific properties

			if ( this.isInstancedMesh ) {

				object.type = 'InstancedMesh';
				object.count = this.count;
				object.instanceMatrix = this.instanceMatrix.toJSON();
				if ( this.instanceColor !== null ) object.instanceColor = this.instanceColor.toJSON();

			}

			if ( this.isBatchedMesh ) {

				object.type = 'BatchedMesh';
				object.perObjectFrustumCulled = this.perObjectFrustumCulled;
				object.sortObjects = this.sortObjects;

				object.drawRanges = this._drawRanges;
				object.reservedRanges = this._reservedRanges;

				object.visibility = this._visibility;
				object.active = this._active;
				object.bounds = this._bounds.map( bound => ( {
					boxInitialized: bound.boxInitialized,
					boxMin: bound.box.min.toArray(),
					boxMax: bound.box.max.toArray(),

					sphereInitialized: bound.sphereInitialized,
					sphereRadius: bound.sphere.radius,
					sphereCenter: bound.sphere.center.toArray()
				} ) );

				object.maxGeometryCount = this._maxGeometryCount;
				object.maxVertexCount = this._maxVertexCount;
				object.maxIndexCount = this._maxIndexCount;

				object.geometryInitialized = this._geometryInitialized;
				object.geometryCount = this._geometryCount;

				object.matricesTexture = this._matricesTexture.toJSON( meta );

				if ( this.boundingSphere !== null ) {

					object.boundingSphere = {
						center: object.boundingSphere.center.toArray(),
						radius: object.boundingSphere.radius
					};

				}

				if ( this.boundingBox !== null ) {

					object.boundingBox = {
						min: object.boundingBox.min.toArray(),
						max: object.boundingBox.max.toArray()
					};

				}

			}

			//

			function serialize( library, element ) {

				if ( library[ element.uuid ] === undefined ) {

					library[ element.uuid ] = element.toJSON( meta );

				}

				return element.uuid;

			}

			if ( this.isScene ) {

				if ( this.background ) {

					if ( this.background.isColor ) {

						object.background = this.background.toJSON();

					} else if ( this.background.isTexture ) {

						object.background = this.background.toJSON( meta ).uuid;

					}

				}

				if ( this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true ) {

					object.environment = this.environment.toJSON( meta ).uuid;

				}

			} else if ( this.isMesh || this.isLine || this.isPoints ) {

				object.geometry = serialize( meta.geometries, this.geometry );

				const parameters = this.geometry.parameters;

				if ( parameters !== undefined && parameters.shapes !== undefined ) {

					const shapes = parameters.shapes;

					if ( Array.isArray( shapes ) ) {

						for ( let i = 0, l = shapes.length; i < l; i ++ ) {

							const shape = shapes[ i ];

							serialize( meta.shapes, shape );

						}

					} else {

						serialize( meta.shapes, shapes );

					}

				}

			}

			if ( this.isSkinnedMesh ) {

				object.bindMode = this.bindMode;
				object.bindMatrix = this.bindMatrix.toArray();

				if ( this.skeleton !== undefined ) {

					serialize( meta.skeletons, this.skeleton );

					object.skeleton = this.skeleton.uuid;

				}

			}

			if ( this.material !== undefined ) {

				if ( Array.isArray( this.material ) ) {

					const uuids = [];

					for ( let i = 0, l = this.material.length; i < l; i ++ ) {

						uuids.push( serialize( meta.materials, this.material[ i ] ) );

					}

					object.material = uuids;

				} else {

					object.material = serialize( meta.materials, this.material );

				}

			}

			//

			if ( this.children.length > 0 ) {

				object.children = [];

				for ( let i = 0; i < this.children.length; i ++ ) {

					object.children.push( this.children[ i ].toJSON( meta ).object );

				}

			}

			//

			if ( this.animations.length > 0 ) {

				object.animations = [];

				for ( let i = 0; i < this.animations.length; i ++ ) {

					const animation = this.animations[ i ];

					object.animations.push( serialize( meta.animations, animation ) );

				}

			}

			if ( isRootObject ) {

				const geometries = extractFromCache( meta.geometries );
				const materials = extractFromCache( meta.materials );
				const textures = extractFromCache( meta.textures );
				const images = extractFromCache( meta.images );
				const shapes = extractFromCache( meta.shapes );
				const skeletons = extractFromCache( meta.skeletons );
				const animations = extractFromCache( meta.animations );
				const nodes = extractFromCache( meta.nodes );

				if ( geometries.length > 0 ) output.geometries = geometries;
				if ( materials.length > 0 ) output.materials = materials;
				if ( textures.length > 0 ) output.textures = textures;
				if ( images.length > 0 ) output.images = images;
				if ( shapes.length > 0 ) output.shapes = shapes;
				if ( skeletons.length > 0 ) output.skeletons = skeletons;
				if ( animations.length > 0 ) output.animations = animations;
				if ( nodes.length > 0 ) output.nodes = nodes;

			}

			output.object = object;

			return output;

			// extract data from the cache hash
			// remove metadata on each item
			// and return as array
			function extractFromCache( cache ) {

				const values = [];
				for ( const key in cache ) {

					const data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

		}

		clone( recursive ) {

			return new this.constructor().copy( this, recursive );

		}

		copy( source, recursive = true ) {

			this.name = source.name;

			this.up.copy( source.up );

			this.position.copy( source.position );
			this.rotation.order = source.rotation.order;
			this.quaternion.copy( source.quaternion );
			this.scale.copy( source.scale );

			this.matrix.copy( source.matrix );
			this.matrixWorld.copy( source.matrixWorld );

			this.matrixAutoUpdate = source.matrixAutoUpdate;

			this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
			this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

			this.layers.mask = source.layers.mask;
			this.visible = source.visible;

			this.castShadow = source.castShadow;
			this.receiveShadow = source.receiveShadow;

			this.frustumCulled = source.frustumCulled;
			this.renderOrder = source.renderOrder;

			this.animations = source.animations.slice();

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			if ( recursive === true ) {

				for ( let i = 0; i < source.children.length; i ++ ) {

					const child = source.children[ i ];
					this.add( child.clone() );

				}

			}

			return this;

		}

	}

	Object3D.DEFAULT_UP = /*@__PURE__*/ new Vector3( 0, 1, 0 );
	Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
	Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;

	const _v0$1 = /*@__PURE__*/ new Vector3();
	const _v1$3 = /*@__PURE__*/ new Vector3();
	const _v2$2 = /*@__PURE__*/ new Vector3();
	const _v3$1 = /*@__PURE__*/ new Vector3();

	const _vab = /*@__PURE__*/ new Vector3();
	const _vac = /*@__PURE__*/ new Vector3();
	const _vbc = /*@__PURE__*/ new Vector3();
	const _vap = /*@__PURE__*/ new Vector3();
	const _vbp = /*@__PURE__*/ new Vector3();
	const _vcp = /*@__PURE__*/ new Vector3();

	let warnedGetUV = false;

	class Triangle {

		constructor( a = new Vector3(), b = new Vector3(), c = new Vector3() ) {

			this.a = a;
			this.b = b;
			this.c = c;

		}

		static getNormal( a, b, c, target ) {

			target.subVectors( c, b );
			_v0$1.subVectors( a, b );
			target.cross( _v0$1 );

			const targetLengthSq = target.lengthSq();
			if ( targetLengthSq > 0 ) {

				return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

			}

			return target.set( 0, 0, 0 );

		}

		// static/instance method to calculate barycentric coordinates
		// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
		static getBarycoord( point, a, b, c, target ) {

			_v0$1.subVectors( c, a );
			_v1$3.subVectors( b, a );
			_v2$2.subVectors( point, a );

			const dot00 = _v0$1.dot( _v0$1 );
			const dot01 = _v0$1.dot( _v1$3 );
			const dot02 = _v0$1.dot( _v2$2 );
			const dot11 = _v1$3.dot( _v1$3 );
			const dot12 = _v1$3.dot( _v2$2 );

			const denom = ( dot00 * dot11 - dot01 * dot01 );

			// collinear or singular triangle
			if ( denom === 0 ) {

				target.set( 0, 0, 0 );
				return null;

			}

			const invDenom = 1 / denom;
			const u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
			const v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

			// barycentric coordinates must always sum to 1
			return target.set( 1 - u - v, v, u );

		}

		static containsPoint( point, a, b, c ) {

			// if the triangle is degenerate then we can't contain a point
			if ( this.getBarycoord( point, a, b, c, _v3$1 ) === null ) {

				return false;

			}

			return ( _v3$1.x >= 0 ) && ( _v3$1.y >= 0 ) && ( ( _v3$1.x + _v3$1.y ) <= 1 );

		}

		static getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) { // @deprecated, r151

			if ( warnedGetUV === false ) {

				console.warn( 'THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().' );

				warnedGetUV = true;

			}

			return this.getInterpolation( point, p1, p2, p3, uv1, uv2, uv3, target );

		}

		static getInterpolation( point, p1, p2, p3, v1, v2, v3, target ) {

			if ( this.getBarycoord( point, p1, p2, p3, _v3$1 ) === null ) {

				target.x = 0;
				target.y = 0;
				if ( 'z' in target ) target.z = 0;
				if ( 'w' in target ) target.w = 0;
				return null;

			}

			target.setScalar( 0 );
			target.addScaledVector( v1, _v3$1.x );
			target.addScaledVector( v2, _v3$1.y );
			target.addScaledVector( v3, _v3$1.z );

			return target;

		}

		static isFrontFacing( a, b, c, direction ) {

			_v0$1.subVectors( c, b );
			_v1$3.subVectors( a, b );

			// strictly front facing
			return ( _v0$1.cross( _v1$3 ).dot( direction ) < 0 ) ? true : false;

		}

		set( a, b, c ) {

			this.a.copy( a );
			this.b.copy( b );
			this.c.copy( c );

			return this;

		}

		setFromPointsAndIndices( points, i0, i1, i2 ) {

			this.a.copy( points[ i0 ] );
			this.b.copy( points[ i1 ] );
			this.c.copy( points[ i2 ] );

			return this;

		}

		setFromAttributeAndIndices( attribute, i0, i1, i2 ) {

			this.a.fromBufferAttribute( attribute, i0 );
			this.b.fromBufferAttribute( attribute, i1 );
			this.c.fromBufferAttribute( attribute, i2 );

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( triangle ) {

			this.a.copy( triangle.a );
			this.b.copy( triangle.b );
			this.c.copy( triangle.c );

			return this;

		}

		getArea() {

			_v0$1.subVectors( this.c, this.b );
			_v1$3.subVectors( this.a, this.b );

			return _v0$1.cross( _v1$3 ).length() * 0.5;

		}

		getMidpoint( target ) {

			return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

		}

		getNormal( target ) {

			return Triangle.getNormal( this.a, this.b, this.c, target );

		}

		getPlane( target ) {

			return target.setFromCoplanarPoints( this.a, this.b, this.c );

		}

		getBarycoord( point, target ) {

			return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

		}

		getUV( point, uv1, uv2, uv3, target ) { // @deprecated, r151

			if ( warnedGetUV === false ) {

				console.warn( 'THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().' );

				warnedGetUV = true;

			}

			return Triangle.getInterpolation( point, this.a, this.b, this.c, uv1, uv2, uv3, target );

		}

		getInterpolation( point, v1, v2, v3, target ) {

			return Triangle.getInterpolation( point, this.a, this.b, this.c, v1, v2, v3, target );

		}

		containsPoint( point ) {

			return Triangle.containsPoint( point, this.a, this.b, this.c );

		}

		isFrontFacing( direction ) {

			return Triangle.isFrontFacing( this.a, this.b, this.c, direction );

		}

		intersectsBox( box ) {

			return box.intersectsTriangle( this );

		}

		closestPointToPoint( p, target ) {

			const a = this.a, b = this.b, c = this.c;
			let v, w;

			// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
			// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
			// under the accompanying license; see chapter 5.1.5 for detailed explanation.
			// basically, we're distinguishing which of the voronoi regions of the triangle
			// the point lies in with the minimum amount of redundant computation.

			_vab.subVectors( b, a );
			_vac.subVectors( c, a );
			_vap.subVectors( p, a );
			const d1 = _vab.dot( _vap );
			const d2 = _vac.dot( _vap );
			if ( d1 <= 0 && d2 <= 0 ) {

				// vertex region of A; barycentric coords (1, 0, 0)
				return target.copy( a );

			}

			_vbp.subVectors( p, b );
			const d3 = _vab.dot( _vbp );
			const d4 = _vac.dot( _vbp );
			if ( d3 >= 0 && d4 <= d3 ) {

				// vertex region of B; barycentric coords (0, 1, 0)
				return target.copy( b );

			}

			const vc = d1 * d4 - d3 * d2;
			if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

				v = d1 / ( d1 - d3 );
				// edge region of AB; barycentric coords (1-v, v, 0)
				return target.copy( a ).addScaledVector( _vab, v );

			}

			_vcp.subVectors( p, c );
			const d5 = _vab.dot( _vcp );
			const d6 = _vac.dot( _vcp );
			if ( d6 >= 0 && d5 <= d6 ) {

				// vertex region of C; barycentric coords (0, 0, 1)
				return target.copy( c );

			}

			const vb = d5 * d2 - d1 * d6;
			if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

				w = d2 / ( d2 - d6 );
				// edge region of AC; barycentric coords (1-w, 0, w)
				return target.copy( a ).addScaledVector( _vac, w );

			}

			const va = d3 * d6 - d5 * d4;
			if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

				_vbc.subVectors( c, b );
				w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
				// edge region of BC; barycentric coords (0, 1-w, w)
				return target.copy( b ).addScaledVector( _vbc, w ); // edge region of BC

			}

			// face region
			const denom = 1 / ( va + vb + vc );
			// u = va * denom
			v = vb * denom;
			w = vc * denom;

			return target.copy( a ).addScaledVector( _vab, v ).addScaledVector( _vac, w );

		}

		equals( triangle ) {

			return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

		}

	}

	const _colorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
		'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
		'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
		'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
		'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
		'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
		'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
		'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
		'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
		'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
		'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
		'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
		'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
		'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
		'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
		'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
		'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
		'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
		'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
		'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
		'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
		'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
		'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
		'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

	const _hslA = { h: 0, s: 0, l: 0 };
	const _hslB = { h: 0, s: 0, l: 0 };

	function hue2rgb( p, q, t ) {

		if ( t < 0 ) t += 1;
		if ( t > 1 ) t -= 1;
		if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
		if ( t < 1 / 2 ) return q;
		if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
		return p;

	}

	class Color {

		constructor( r, g, b ) {

			this.isColor = true;

			this.r = 1;
			this.g = 1;
			this.b = 1;

			return this.set( r, g, b );

		}

		set( r, g, b ) {

			if ( g === undefined && b === undefined ) {

				// r is THREE.Color, hex or string

				const value = r;

				if ( value && value.isColor ) {

					this.copy( value );

				} else if ( typeof value === 'number' ) {

					this.setHex( value );

				} else if ( typeof value === 'string' ) {

					this.setStyle( value );

				}

			} else {

				this.setRGB( r, g, b );

			}

			return this;

		}

		setScalar( scalar ) {

			this.r = scalar;
			this.g = scalar;
			this.b = scalar;

			return this;

		}

		setHex( hex, colorSpace = SRGBColorSpace ) {

			hex = Math.floor( hex );

			this.r = ( hex >> 16 & 255 ) / 255;
			this.g = ( hex >> 8 & 255 ) / 255;
			this.b = ( hex & 255 ) / 255;

			ColorManagement.toWorkingColorSpace( this, colorSpace );

			return this;

		}

		setRGB( r, g, b, colorSpace = ColorManagement.workingColorSpace ) {

			this.r = r;
			this.g = g;
			this.b = b;

			ColorManagement.toWorkingColorSpace( this, colorSpace );

			return this;

		}

		setHSL( h, s, l, colorSpace = ColorManagement.workingColorSpace ) {

			// h,s,l ranges are in 0.0 - 1.0
			h = euclideanModulo( h, 1 );
			s = clamp( s, 0, 1 );
			l = clamp( l, 0, 1 );

			if ( s === 0 ) {

				this.r = this.g = this.b = l;

			} else {

				const p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
				const q = ( 2 * l ) - p;

				this.r = hue2rgb( q, p, h + 1 / 3 );
				this.g = hue2rgb( q, p, h );
				this.b = hue2rgb( q, p, h - 1 / 3 );

			}

			ColorManagement.toWorkingColorSpace( this, colorSpace );

			return this;

		}

		setStyle( style, colorSpace = SRGBColorSpace ) {

			function handleAlpha( string ) {

				if ( string === undefined ) return;

				if ( parseFloat( string ) < 1 ) {

					console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

				}

			}


			let m;

			if ( m = /^(\w+)\(([^\)]*)\)/.exec( style ) ) {

				// rgb / hsl

				let color;
				const name = m[ 1 ];
				const components = m[ 2 ];

				switch ( name ) {

					case 'rgb':
					case 'rgba':

						if ( color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

							// rgb(255,0,0) rgba(255,0,0,0.5)

							handleAlpha( color[ 4 ] );

							return this.setRGB(
								Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255,
								Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255,
								Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255,
								colorSpace
							);

						}

						if ( color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

							// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)

							handleAlpha( color[ 4 ] );

							return this.setRGB(
								Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100,
								Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100,
								Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100,
								colorSpace
							);

						}

						break;

					case 'hsl':
					case 'hsla':

						if ( color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

							// hsl(120,50%,50%) hsla(120,50%,50%,0.5)

							handleAlpha( color[ 4 ] );

							return this.setHSL(
								parseFloat( color[ 1 ] ) / 360,
								parseFloat( color[ 2 ] ) / 100,
								parseFloat( color[ 3 ] ) / 100,
								colorSpace
							);

						}

						break;

					default:

						console.warn( 'THREE.Color: Unknown color model ' + style );

				}

			} else if ( m = /^\#([A-Fa-f\d]+)$/.exec( style ) ) {

				// hex color

				const hex = m[ 1 ];
				const size = hex.length;

				if ( size === 3 ) {

					// #ff0
					return this.setRGB(
						parseInt( hex.charAt( 0 ), 16 ) / 15,
						parseInt( hex.charAt( 1 ), 16 ) / 15,
						parseInt( hex.charAt( 2 ), 16 ) / 15,
						colorSpace
					);

				} else if ( size === 6 ) {

					// #ff0000
					return this.setHex( parseInt( hex, 16 ), colorSpace );

				} else {

					console.warn( 'THREE.Color: Invalid hex color ' + style );

				}

			} else if ( style && style.length > 0 ) {

				return this.setColorName( style, colorSpace );

			}

			return this;

		}

		setColorName( style, colorSpace = SRGBColorSpace ) {

			// color keywords
			const hex = _colorKeywords[ style.toLowerCase() ];

			if ( hex !== undefined ) {

				// red
				this.setHex( hex, colorSpace );

			} else {

				// unknown color
				console.warn( 'THREE.Color: Unknown color ' + style );

			}

			return this;

		}

		clone() {

			return new this.constructor( this.r, this.g, this.b );

		}

		copy( color ) {

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;

			return this;

		}

		copySRGBToLinear( color ) {

			this.r = SRGBToLinear( color.r );
			this.g = SRGBToLinear( color.g );
			this.b = SRGBToLinear( color.b );

			return this;

		}

		copyLinearToSRGB( color ) {

			this.r = LinearToSRGB( color.r );
			this.g = LinearToSRGB( color.g );
			this.b = LinearToSRGB( color.b );

			return this;

		}

		convertSRGBToLinear() {

			this.copySRGBToLinear( this );

			return this;

		}

		convertLinearToSRGB() {

			this.copyLinearToSRGB( this );

			return this;

		}

		getHex( colorSpace = SRGBColorSpace ) {

			ColorManagement.fromWorkingColorSpace( _color.copy( this ), colorSpace );

			return Math.round( clamp( _color.r * 255, 0, 255 ) ) * 65536 + Math.round( clamp( _color.g * 255, 0, 255 ) ) * 256 + Math.round( clamp( _color.b * 255, 0, 255 ) );

		}

		getHexString( colorSpace = SRGBColorSpace ) {

			return ( '000000' + this.getHex( colorSpace ).toString( 16 ) ).slice( - 6 );

		}

		getHSL( target, colorSpace = ColorManagement.workingColorSpace ) {

			// h,s,l ranges are in 0.0 - 1.0

			ColorManagement.fromWorkingColorSpace( _color.copy( this ), colorSpace );

			const r = _color.r, g = _color.g, b = _color.b;

			const max = Math.max( r, g, b );
			const min = Math.min( r, g, b );

			let hue, saturation;
			const lightness = ( min + max ) / 2.0;

			if ( min === max ) {

				hue = 0;
				saturation = 0;

			} else {

				const delta = max - min;

				saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

				switch ( max ) {

					case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
					case g: hue = ( b - r ) / delta + 2; break;
					case b: hue = ( r - g ) / delta + 4; break;

				}

				hue /= 6;

			}

			target.h = hue;
			target.s = saturation;
			target.l = lightness;

			return target;

		}

		getRGB( target, colorSpace = ColorManagement.workingColorSpace ) {

			ColorManagement.fromWorkingColorSpace( _color.copy( this ), colorSpace );

			target.r = _color.r;
			target.g = _color.g;
			target.b = _color.b;

			return target;

		}

		getStyle( colorSpace = SRGBColorSpace ) {

			ColorManagement.fromWorkingColorSpace( _color.copy( this ), colorSpace );

			const r = _color.r, g = _color.g, b = _color.b;

			if ( colorSpace !== SRGBColorSpace ) {

				// Requires CSS Color Module Level 4 (https://www.w3.org/TR/css-color-4/).
				return `color(${ colorSpace } ${ r.toFixed( 3 ) } ${ g.toFixed( 3 ) } ${ b.toFixed( 3 ) })`;

			}

			return `rgb(${ Math.round( r * 255 ) },${ Math.round( g * 255 ) },${ Math.round( b * 255 ) })`;

		}

		offsetHSL( h, s, l ) {

			this.getHSL( _hslA );

			return this.setHSL( _hslA.h + h, _hslA.s + s, _hslA.l + l );

		}

		add( color ) {

			this.r += color.r;
			this.g += color.g;
			this.b += color.b;

			return this;

		}

		addColors( color1, color2 ) {

			this.r = color1.r + color2.r;
			this.g = color1.g + color2.g;
			this.b = color1.b + color2.b;

			return this;

		}

		addScalar( s ) {

			this.r += s;
			this.g += s;
			this.b += s;

			return this;

		}

		sub( color ) {

			this.r = Math.max( 0, this.r - color.r );
			this.g = Math.max( 0, this.g - color.g );
			this.b = Math.max( 0, this.b - color.b );

			return this;

		}

		multiply( color ) {

			this.r *= color.r;
			this.g *= color.g;
			this.b *= color.b;

			return this;

		}

		multiplyScalar( s ) {

			this.r *= s;
			this.g *= s;
			this.b *= s;

			return this;

		}

		lerp( color, alpha ) {

			this.r += ( color.r - this.r ) * alpha;
			this.g += ( color.g - this.g ) * alpha;
			this.b += ( color.b - this.b ) * alpha;

			return this;

		}

		lerpColors( color1, color2, alpha ) {

			this.r = color1.r + ( color2.r - color1.r ) * alpha;
			this.g = color1.g + ( color2.g - color1.g ) * alpha;
			this.b = color1.b + ( color2.b - color1.b ) * alpha;

			return this;

		}

		lerpHSL( color, alpha ) {

			this.getHSL( _hslA );
			color.getHSL( _hslB );

			const h = lerp( _hslA.h, _hslB.h, alpha );
			const s = lerp( _hslA.s, _hslB.s, alpha );
			const l = lerp( _hslA.l, _hslB.l, alpha );

			this.setHSL( h, s, l );

			return this;

		}

		setFromVector3( v ) {

			this.r = v.x;
			this.g = v.y;
			this.b = v.z;

			return this;

		}

		applyMatrix3( m ) {

			const r = this.r, g = this.g, b = this.b;
			const e = m.elements;

			this.r = e[ 0 ] * r + e[ 3 ] * g + e[ 6 ] * b;
			this.g = e[ 1 ] * r + e[ 4 ] * g + e[ 7 ] * b;
			this.b = e[ 2 ] * r + e[ 5 ] * g + e[ 8 ] * b;

			return this;

		}

		equals( c ) {

			return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

		}

		fromArray( array, offset = 0 ) {

			this.r = array[ offset ];
			this.g = array[ offset + 1 ];
			this.b = array[ offset + 2 ];

			return this;

		}

		toArray( array = [], offset = 0 ) {

			array[ offset ] = this.r;
			array[ offset + 1 ] = this.g;
			array[ offset + 2 ] = this.b;

			return array;

		}

		fromBufferAttribute( attribute, index ) {

			this.r = attribute.getX( index );
			this.g = attribute.getY( index );
			this.b = attribute.getZ( index );

			return this;

		}

		toJSON() {

			return this.getHex();

		}

		*[ Symbol.iterator ]() {

			yield this.r;
			yield this.g;
			yield this.b;

		}

	}

	const _color = /*@__PURE__*/ new Color();

	Color.NAMES = _colorKeywords;

	let _materialId = 0;

	class Material extends EventDispatcher {

		constructor() {

			super();

			this.isMaterial = true;

			Object.defineProperty( this, 'id', { value: _materialId ++ } );

			this.uuid = generateUUID();

			this.name = '';
			this.type = 'Material';

			this.blending = NormalBlending;
			this.side = FrontSide;
			this.vertexColors = false;

			this.opacity = 1;
			this.transparent = false;
			this.alphaHash = false;

			this.blendSrc = SrcAlphaFactor;
			this.blendDst = OneMinusSrcAlphaFactor;
			this.blendEquation = AddEquation;
			this.blendSrcAlpha = null;
			this.blendDstAlpha = null;
			this.blendEquationAlpha = null;
			this.blendColor = new Color( 0, 0, 0 );
			this.blendAlpha = 0;

			this.depthFunc = LessEqualDepth;
			this.depthTest = true;
			this.depthWrite = true;

			this.stencilWriteMask = 0xff;
			this.stencilFunc = AlwaysStencilFunc;
			this.stencilRef = 0;
			this.stencilFuncMask = 0xff;
			this.stencilFail = KeepStencilOp;
			this.stencilZFail = KeepStencilOp;
			this.stencilZPass = KeepStencilOp;
			this.stencilWrite = false;

			this.clippingPlanes = null;
			this.clipIntersection = false;
			this.clipShadows = false;

			this.shadowSide = null;

			this.colorWrite = true;

			this.precision = null; // override the renderer's default precision for this material

			this.polygonOffset = false;
			this.polygonOffsetFactor = 0;
			this.polygonOffsetUnits = 0;

			this.dithering = false;

			this.alphaToCoverage = false;
			this.premultipliedAlpha = false;
			this.forceSinglePass = false;

			this.visible = true;

			this.toneMapped = true;

			this.userData = {};

			this.version = 0;

			this._alphaTest = 0;

		}

		get alphaTest() {

			return this._alphaTest;

		}

		set alphaTest( value ) {

			if ( this._alphaTest > 0 !== value > 0 ) {

				this.version ++;

			}

			this._alphaTest = value;

		}

		onBuild( /* shaderobject, renderer */ ) {}

		onBeforeRender( /* renderer, scene, camera, geometry, object, group */ ) {}

		onBeforeCompile( /* shaderobject, renderer */ ) {}

		customProgramCacheKey() {

			return this.onBeforeCompile.toString();

		}

		setValues( values ) {

			if ( values === undefined ) return;

			for ( const key in values ) {

				const newValue = values[ key ];

				if ( newValue === undefined ) {

					console.warn( `THREE.Material: parameter '${ key }' has value of undefined.` );
					continue;

				}

				const currentValue = this[ key ];

				if ( currentValue === undefined ) {

					console.warn( `THREE.Material: '${ key }' is not a property of THREE.${ this.type }.` );
					continue;

				}

				if ( currentValue && currentValue.isColor ) {

					currentValue.set( newValue );

				} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

					currentValue.copy( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		}

		toJSON( meta ) {

			const isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( isRootObject ) {

				meta = {
					textures: {},
					images: {}
				};

			}

			const data = {
				metadata: {
					version: 4.6,
					type: 'Material',
					generator: 'Material.toJSON'
				}
			};

			// standard Material serialization
			data.uuid = this.uuid;
			data.type = this.type;

			if ( this.name !== '' ) data.name = this.name;

			if ( this.color && this.color.isColor ) data.color = this.color.getHex();

			if ( this.roughness !== undefined ) data.roughness = this.roughness;
			if ( this.metalness !== undefined ) data.metalness = this.metalness;

			if ( this.sheen !== undefined ) data.sheen = this.sheen;
			if ( this.sheenColor && this.sheenColor.isColor ) data.sheenColor = this.sheenColor.getHex();
			if ( this.sheenRoughness !== undefined ) data.sheenRoughness = this.sheenRoughness;
			if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
			if ( this.emissiveIntensity && this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

			if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
			if ( this.specularIntensity !== undefined ) data.specularIntensity = this.specularIntensity;
			if ( this.specularColor && this.specularColor.isColor ) data.specularColor = this.specularColor.getHex();
			if ( this.shininess !== undefined ) data.shininess = this.shininess;
			if ( this.clearcoat !== undefined ) data.clearcoat = this.clearcoat;
			if ( this.clearcoatRoughness !== undefined ) data.clearcoatRoughness = this.clearcoatRoughness;

			if ( this.clearcoatMap && this.clearcoatMap.isTexture ) {

				data.clearcoatMap = this.clearcoatMap.toJSON( meta ).uuid;

			}

			if ( this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture ) {

				data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON( meta ).uuid;

			}

			if ( this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture ) {

				data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON( meta ).uuid;
				data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();

			}

			if ( this.iridescence !== undefined ) data.iridescence = this.iridescence;
			if ( this.iridescenceIOR !== undefined ) data.iridescenceIOR = this.iridescenceIOR;
			if ( this.iridescenceThicknessRange !== undefined ) data.iridescenceThicknessRange = this.iridescenceThicknessRange;

			if ( this.iridescenceMap && this.iridescenceMap.isTexture ) {

				data.iridescenceMap = this.iridescenceMap.toJSON( meta ).uuid;

			}

			if ( this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture ) {

				data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON( meta ).uuid;

			}

			if ( this.anisotropy !== undefined ) data.anisotropy = this.anisotropy;
			if ( this.anisotropyRotation !== undefined ) data.anisotropyRotation = this.anisotropyRotation;

			if ( this.anisotropyMap && this.anisotropyMap.isTexture ) {

				data.anisotropyMap = this.anisotropyMap.toJSON( meta ).uuid;

			}

			if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
			if ( this.matcap && this.matcap.isTexture ) data.matcap = this.matcap.toJSON( meta ).uuid;
			if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;

			if ( this.lightMap && this.lightMap.isTexture ) {

				data.lightMap = this.lightMap.toJSON( meta ).uuid;
				data.lightMapIntensity = this.lightMapIntensity;

			}

			if ( this.aoMap && this.aoMap.isTexture ) {

				data.aoMap = this.aoMap.toJSON( meta ).uuid;
				data.aoMapIntensity = this.aoMapIntensity;

			}

			if ( this.bumpMap && this.bumpMap.isTexture ) {

				data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
				data.bumpScale = this.bumpScale;

			}

			if ( this.normalMap && this.normalMap.isTexture ) {

				data.normalMap = this.normalMap.toJSON( meta ).uuid;
				data.normalMapType = this.normalMapType;
				data.normalScale = this.normalScale.toArray();

			}

			if ( this.displacementMap && this.displacementMap.isTexture ) {

				data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
				data.displacementScale = this.displacementScale;
				data.displacementBias = this.displacementBias;

			}

			if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
			if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

			if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
			if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;
			if ( this.specularIntensityMap && this.specularIntensityMap.isTexture ) data.specularIntensityMap = this.specularIntensityMap.toJSON( meta ).uuid;
			if ( this.specularColorMap && this.specularColorMap.isTexture ) data.specularColorMap = this.specularColorMap.toJSON( meta ).uuid;

			if ( this.envMap && this.envMap.isTexture ) {

				data.envMap = this.envMap.toJSON( meta ).uuid;

				if ( this.combine !== undefined ) data.combine = this.combine;

			}

			if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;
			if ( this.reflectivity !== undefined ) data.reflectivity = this.reflectivity;
			if ( this.refractionRatio !== undefined ) data.refractionRatio = this.refractionRatio;

			if ( this.gradientMap && this.gradientMap.isTexture ) {

				data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

			}

			if ( this.transmission !== undefined ) data.transmission = this.transmission;
			if ( this.transmissionMap && this.transmissionMap.isTexture ) data.transmissionMap = this.transmissionMap.toJSON( meta ).uuid;
			if ( this.thickness !== undefined ) data.thickness = this.thickness;
			if ( this.thicknessMap && this.thicknessMap.isTexture ) data.thicknessMap = this.thicknessMap.toJSON( meta ).uuid;
			if ( this.attenuationDistance !== undefined && this.attenuationDistance !== Infinity ) data.attenuationDistance = this.attenuationDistance;
			if ( this.attenuationColor !== undefined ) data.attenuationColor = this.attenuationColor.getHex();

			if ( this.size !== undefined ) data.size = this.size;
			if ( this.shadowSide !== null ) data.shadowSide = this.shadowSide;
			if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

			if ( this.blending !== NormalBlending ) data.blending = this.blending;
			if ( this.side !== FrontSide ) data.side = this.side;
			if ( this.vertexColors === true ) data.vertexColors = true;

			if ( this.opacity < 1 ) data.opacity = this.opacity;
			if ( this.transparent === true ) data.transparent = true;

			if ( this.blendSrc !== SrcAlphaFactor ) data.blendSrc = this.blendSrc;
			if ( this.blendDst !== OneMinusSrcAlphaFactor ) data.blendDst = this.blendDst;
			if ( this.blendEquation !== AddEquation ) data.blendEquation = this.blendEquation;
			if ( this.blendSrcAlpha !== null ) data.blendSrcAlpha = this.blendSrcAlpha;
			if ( this.blendDstAlpha !== null ) data.blendDstAlpha = this.blendDstAlpha;
			if ( this.blendEquationAlpha !== null ) data.blendEquationAlpha = this.blendEquationAlpha;
			if ( this.blendColor && this.blendColor.isColor ) data.blendColor = this.blendColor.getHex();
			if ( this.blendAlpha !== 0 ) data.blendAlpha = this.blendAlpha;

			if ( this.depthFunc !== LessEqualDepth ) data.depthFunc = this.depthFunc;
			if ( this.depthTest === false ) data.depthTest = this.depthTest;
			if ( this.depthWrite === false ) data.depthWrite = this.depthWrite;
			if ( this.colorWrite === false ) data.colorWrite = this.colorWrite;

			if ( this.stencilWriteMask !== 0xff ) data.stencilWriteMask = this.stencilWriteMask;
			if ( this.stencilFunc !== AlwaysStencilFunc ) data.stencilFunc = this.stencilFunc;
			if ( this.stencilRef !== 0 ) data.stencilRef = this.stencilRef;
			if ( this.stencilFuncMask !== 0xff ) data.stencilFuncMask = this.stencilFuncMask;
			if ( this.stencilFail !== KeepStencilOp ) data.stencilFail = this.stencilFail;
			if ( this.stencilZFail !== KeepStencilOp ) data.stencilZFail = this.stencilZFail;
			if ( this.stencilZPass !== KeepStencilOp ) data.stencilZPass = this.stencilZPass;
			if ( this.stencilWrite === true ) data.stencilWrite = this.stencilWrite;

			// rotation (SpriteMaterial)
			if ( this.rotation !== undefined && this.rotation !== 0 ) data.rotation = this.rotation;

			if ( this.polygonOffset === true ) data.polygonOffset = true;
			if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
			if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

			if ( this.linewidth !== undefined && this.linewidth !== 1 ) data.linewidth = this.linewidth;
			if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
			if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
			if ( this.scale !== undefined ) data.scale = this.scale;

			if ( this.dithering === true ) data.dithering = true;

			if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
			if ( this.alphaHash === true ) data.alphaHash = true;
			if ( this.alphaToCoverage === true ) data.alphaToCoverage = true;
			if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = true;
			if ( this.forceSinglePass === true ) data.forceSinglePass = true;

			if ( this.wireframe === true ) data.wireframe = true;
			if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
			if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
			if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

			if ( this.flatShading === true ) data.flatShading = true;

			if ( this.visible === false ) data.visible = false;

			if ( this.toneMapped === false ) data.toneMapped = false;

			if ( this.fog === false ) data.fog = false;

			if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

			// TODO: Copied from Object3D.toJSON

			function extractFromCache( cache ) {

				const values = [];

				for ( const key in cache ) {

					const data = cache[ key ];
					delete data.metadata;
					values.push( data );

				}

				return values;

			}

			if ( isRootObject ) {

				const textures = extractFromCache( meta.textures );
				const images = extractFromCache( meta.images );

				if ( textures.length > 0 ) data.textures = textures;
				if ( images.length > 0 ) data.images = images;

			}

			return data;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( source ) {

			this.name = source.name;

			this.blending = source.blending;
			this.side = source.side;
			this.vertexColors = source.vertexColors;

			this.opacity = source.opacity;
			this.transparent = source.transparent;

			this.blendSrc = source.blendSrc;
			this.blendDst = source.blendDst;
			this.blendEquation = source.blendEquation;
			this.blendSrcAlpha = source.blendSrcAlpha;
			this.blendDstAlpha = source.blendDstAlpha;
			this.blendEquationAlpha = source.blendEquationAlpha;
			this.blendColor.copy( source.blendColor );
			this.blendAlpha = source.blendAlpha;

			this.depthFunc = source.depthFunc;
			this.depthTest = source.depthTest;
			this.depthWrite = source.depthWrite;

			this.stencilWriteMask = source.stencilWriteMask;
			this.stencilFunc = source.stencilFunc;
			this.stencilRef = source.stencilRef;
			this.stencilFuncMask = source.stencilFuncMask;
			this.stencilFail = source.stencilFail;
			this.stencilZFail = source.stencilZFail;
			this.stencilZPass = source.stencilZPass;
			this.stencilWrite = source.stencilWrite;

			const srcPlanes = source.clippingPlanes;
			let dstPlanes = null;

			if ( srcPlanes !== null ) {

				const n = srcPlanes.length;
				dstPlanes = new Array( n );

				for ( let i = 0; i !== n; ++ i ) {

					dstPlanes[ i ] = srcPlanes[ i ].clone();

				}

			}

			this.clippingPlanes = dstPlanes;
			this.clipIntersection = source.clipIntersection;
			this.clipShadows = source.clipShadows;

			this.shadowSide = source.shadowSide;

			this.colorWrite = source.colorWrite;

			this.precision = source.precision;

			this.polygonOffset = source.polygonOffset;
			this.polygonOffsetFactor = source.polygonOffsetFactor;
			this.polygonOffsetUnits = source.polygonOffsetUnits;

			this.dithering = source.dithering;

			this.alphaTest = source.alphaTest;
			this.alphaHash = source.alphaHash;
			this.alphaToCoverage = source.alphaToCoverage;
			this.premultipliedAlpha = source.premultipliedAlpha;
			this.forceSinglePass = source.forceSinglePass;

			this.visible = source.visible;

			this.toneMapped = source.toneMapped;

			this.userData = JSON.parse( JSON.stringify( source.userData ) );

			return this;

		}

		dispose() {

			this.dispatchEvent( { type: 'dispose' } );

		}

		set needsUpdate( value ) {

			if ( value === true ) this.version ++;

		}

	}

	class MeshBasicMaterial extends Material {

		constructor( parameters ) {

			super();

			this.isMeshBasicMaterial = true;

			this.type = 'MeshBasicMaterial';

			this.color = new Color( 0xffffff ); // emissive

			this.map = null;

			this.lightMap = null;
			this.lightMapIntensity = 1.0;

			this.aoMap = null;
			this.aoMapIntensity = 1.0;

			this.specularMap = null;

			this.alphaMap = null;

			this.envMap = null;
			this.combine = MultiplyOperation;
			this.reflectivity = 1;
			this.refractionRatio = 0.98;

			this.wireframe = false;
			this.wireframeLinewidth = 1;
			this.wireframeLinecap = 'round';
			this.wireframeLinejoin = 'round';

			this.fog = true;

			this.setValues( parameters );

		}

		copy( source ) {

			super.copy( source );

			this.color.copy( source.color );

			this.map = source.map;

			this.lightMap = source.lightMap;
			this.lightMapIntensity = source.lightMapIntensity;

			this.aoMap = source.aoMap;
			this.aoMapIntensity = source.aoMapIntensity;

			this.specularMap = source.specularMap;

			this.alphaMap = source.alphaMap;

			this.envMap = source.envMap;
			this.combine = source.combine;
			this.reflectivity = source.reflectivity;
			this.refractionRatio = source.refractionRatio;

			this.wireframe = source.wireframe;
			this.wireframeLinewidth = source.wireframeLinewidth;
			this.wireframeLinecap = source.wireframeLinecap;
			this.wireframeLinejoin = source.wireframeLinejoin;

			this.fog = source.fog;

			return this;

		}

	}

	const _vector$9 = /*@__PURE__*/ new Vector3();
	const _vector2$1 = /*@__PURE__*/ new Vector2();

	class BufferAttribute {

		constructor( array, itemSize, normalized = false ) {

			if ( Array.isArray( array ) ) {

				throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

			}

			this.isBufferAttribute = true;

			this.name = '';

			this.array = array;
			this.itemSize = itemSize;
			this.count = array !== undefined ? array.length / itemSize : 0;
			this.normalized = normalized;

			this.usage = StaticDrawUsage;
			this._updateRange = { offset: 0, count: - 1 };
			this.updateRanges = [];
			this.gpuType = FloatType;

			this.version = 0;

		}

		onUploadCallback() {}

		set needsUpdate( value ) {

			if ( value === true ) this.version ++;

		}

		get updateRange() {

			console.warn( 'THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead.' ); // @deprecated, r159
			return this._updateRange;

		}

		setUsage( value ) {

			this.usage = value;

			return this;

		}

		addUpdateRange( start, count ) {

			this.updateRanges.push( { start, count } );

		}

		clearUpdateRanges() {

			this.updateRanges.length = 0;

		}

		copy( source ) {

			this.name = source.name;
			this.array = new source.array.constructor( source.array );
			this.itemSize = source.itemSize;
			this.count = source.count;
			this.normalized = source.normalized;

			this.usage = source.usage;
			this.gpuType = source.gpuType;

			return this;

		}

		copyAt( index1, attribute, index2 ) {

			index1 *= this.itemSize;
			index2 *= attribute.itemSize;

			for ( let i = 0, l = this.itemSize; i < l; i ++ ) {

				this.array[ index1 + i ] = attribute.array[ index2 + i ];

			}

			return this;

		}

		copyArray( array ) {

			this.array.set( array );

			return this;

		}

		applyMatrix3( m ) {

			if ( this.itemSize === 2 ) {

				for ( let i = 0, l = this.count; i < l; i ++ ) {

					_vector2$1.fromBufferAttribute( this, i );
					_vector2$1.applyMatrix3( m );

					this.setXY( i, _vector2$1.x, _vector2$1.y );

				}

			} else if ( this.itemSize === 3 ) {

				for ( let i = 0, l = this.count; i < l; i ++ ) {

					_vector$9.fromBufferAttribute( this, i );
					_vector$9.applyMatrix3( m );

					this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

				}

			}

			return this;

		}

		applyMatrix4( m ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector$9.fromBufferAttribute( this, i );

				_vector$9.applyMatrix4( m );

				this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

			}

			return this;

		}

		applyNormalMatrix( m ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector$9.fromBufferAttribute( this, i );

				_vector$9.applyNormalMatrix( m );

				this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

			}

			return this;

		}

		transformDirection( m ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector$9.fromBufferAttribute( this, i );

				_vector$9.transformDirection( m );

				this.setXYZ( i, _vector$9.x, _vector$9.y, _vector$9.z );

			}

			return this;

		}

		set( value, offset = 0 ) {

			// Matching BufferAttribute constructor, do not normalize the array.
			this.array.set( value, offset );

			return this;

		}

		getComponent( index, component ) {

			let value = this.array[ index * this.itemSize + component ];

			if ( this.normalized ) value = denormalize( value, this.array );

			return value;

		}

		setComponent( index, component, value ) {

			if ( this.normalized ) value = normalize( value, this.array );

			this.array[ index * this.itemSize + component ] = value;

			return this;

		}

		getX( index ) {

			let x = this.array[ index * this.itemSize ];

			if ( this.normalized ) x = denormalize( x, this.array );

			return x;

		}

		setX( index, x ) {

			if ( this.normalized ) x = normalize( x, this.array );

			this.array[ index * this.itemSize ] = x;

			return this;

		}

		getY( index ) {

			let y = this.array[ index * this.itemSize + 1 ];

			if ( this.normalized ) y = denormalize( y, this.array );

			return y;

		}

		setY( index, y ) {

			if ( this.normalized ) y = normalize( y, this.array );

			this.array[ index * this.itemSize + 1 ] = y;

			return this;

		}

		getZ( index ) {

			let z = this.array[ index * this.itemSize + 2 ];

			if ( this.normalized ) z = denormalize( z, this.array );

			return z;

		}

		setZ( index, z ) {

			if ( this.normalized ) z = normalize( z, this.array );

			this.array[ index * this.itemSize + 2 ] = z;

			return this;

		}

		getW( index ) {

			let w = this.array[ index * this.itemSize + 3 ];

			if ( this.normalized ) w = denormalize( w, this.array );

			return w;

		}

		setW( index, w ) {

			if ( this.normalized ) w = normalize( w, this.array );

			this.array[ index * this.itemSize + 3 ] = w;

			return this;

		}

		setXY( index, x, y ) {

			index *= this.itemSize;

			if ( this.normalized ) {

				x = normalize( x, this.array );
				y = normalize( y, this.array );

			}

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;

			return this;

		}

		setXYZ( index, x, y, z ) {

			index *= this.itemSize;

			if ( this.normalized ) {

				x = normalize( x, this.array );
				y = normalize( y, this.array );
				z = normalize( z, this.array );

			}

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;

			return this;

		}

		setXYZW( index, x, y, z, w ) {

			index *= this.itemSize;

			if ( this.normalized ) {

				x = normalize( x, this.array );
				y = normalize( y, this.array );
				z = normalize( z, this.array );
				w = normalize( w, this.array );

			}

			this.array[ index + 0 ] = x;
			this.array[ index + 1 ] = y;
			this.array[ index + 2 ] = z;
			this.array[ index + 3 ] = w;

			return this;

		}

		onUpload( callback ) {

			this.onUploadCallback = callback;

			return this;

		}

		clone() {

			return new this.constructor( this.array, this.itemSize ).copy( this );

		}

		toJSON() {

			const data = {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: Array.from( this.array ),
				normalized: this.normalized
			};

			if ( this.name !== '' ) data.name = this.name;
			if ( this.usage !== StaticDrawUsage ) data.usage = this.usage;

			return data;

		}

	}

	class Uint16BufferAttribute extends BufferAttribute {

		constructor( array, itemSize, normalized ) {

			super( new Uint16Array( array ), itemSize, normalized );

		}

	}

	class Uint32BufferAttribute extends BufferAttribute {

		constructor( array, itemSize, normalized ) {

			super( new Uint32Array( array ), itemSize, normalized );

		}

	}


	class Float32BufferAttribute extends BufferAttribute {

		constructor( array, itemSize, normalized ) {

			super( new Float32Array( array ), itemSize, normalized );

		}

	}

	let _id$2 = 0;

	const _m1 = /*@__PURE__*/ new Matrix4();
	const _obj = /*@__PURE__*/ new Object3D();
	const _offset = /*@__PURE__*/ new Vector3();
	const _box$2 = /*@__PURE__*/ new Box3();
	const _boxMorphTargets = /*@__PURE__*/ new Box3();
	const _vector$8 = /*@__PURE__*/ new Vector3();

	class BufferGeometry extends EventDispatcher {

		constructor() {

			super();

			this.isBufferGeometry = true;

			Object.defineProperty( this, 'id', { value: _id$2 ++ } );

			this.uuid = generateUUID();

			this.name = '';
			this.type = 'BufferGeometry';

			this.index = null;
			this.attributes = {};

			this.morphAttributes = {};
			this.morphTargetsRelative = false;

			this.groups = [];

			this.boundingBox = null;
			this.boundingSphere = null;

			this.drawRange = { start: 0, count: Infinity };

			this.userData = {};

		}

		getIndex() {

			return this.index;

		}

		setIndex( index ) {

			if ( Array.isArray( index ) ) {

				this.index = new ( arrayNeedsUint32( index ) ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

			} else {

				this.index = index;

			}

			return this;

		}

		getAttribute( name ) {

			return this.attributes[ name ];

		}

		setAttribute( name, attribute ) {

			this.attributes[ name ] = attribute;

			return this;

		}

		deleteAttribute( name ) {

			delete this.attributes[ name ];

			return this;

		}

		hasAttribute( name ) {

			return this.attributes[ name ] !== undefined;

		}

		addGroup( start, count, materialIndex = 0 ) {

			this.groups.push( {

				start: start,
				count: count,
				materialIndex: materialIndex

			} );

		}

		clearGroups() {

			this.groups = [];

		}

		setDrawRange( start, count ) {

			this.drawRange.start = start;
			this.drawRange.count = count;

		}

		applyMatrix4( matrix ) {

			const position = this.attributes.position;

			if ( position !== undefined ) {

				position.applyMatrix4( matrix );

				position.needsUpdate = true;

			}

			const normal = this.attributes.normal;

			if ( normal !== undefined ) {

				const normalMatrix = new Matrix3().getNormalMatrix( matrix );

				normal.applyNormalMatrix( normalMatrix );

				normal.needsUpdate = true;

			}

			const tangent = this.attributes.tangent;

			if ( tangent !== undefined ) {

				tangent.transformDirection( matrix );

				tangent.needsUpdate = true;

			}

			if ( this.boundingBox !== null ) {

				this.computeBoundingBox();

			}

			if ( this.boundingSphere !== null ) {

				this.computeBoundingSphere();

			}

			return this;

		}

		applyQuaternion( q ) {

			_m1.makeRotationFromQuaternion( q );

			this.applyMatrix4( _m1 );

			return this;

		}

		rotateX( angle ) {

			// rotate geometry around world x-axis

			_m1.makeRotationX( angle );

			this.applyMatrix4( _m1 );

			return this;

		}

		rotateY( angle ) {

			// rotate geometry around world y-axis

			_m1.makeRotationY( angle );

			this.applyMatrix4( _m1 );

			return this;

		}

		rotateZ( angle ) {

			// rotate geometry around world z-axis

			_m1.makeRotationZ( angle );

			this.applyMatrix4( _m1 );

			return this;

		}

		translate( x, y, z ) {

			// translate geometry

			_m1.makeTranslation( x, y, z );

			this.applyMatrix4( _m1 );

			return this;

		}

		scale( x, y, z ) {

			// scale geometry

			_m1.makeScale( x, y, z );

			this.applyMatrix4( _m1 );

			return this;

		}

		lookAt( vector ) {

			_obj.lookAt( vector );

			_obj.updateMatrix();

			this.applyMatrix4( _obj.matrix );

			return this;

		}

		center() {

			this.computeBoundingBox();

			this.boundingBox.getCenter( _offset ).negate();

			this.translate( _offset.x, _offset.y, _offset.z );

			return this;

		}

		setFromPoints( points ) {

			const position = [];

			for ( let i = 0, l = points.length; i < l; i ++ ) {

				const point = points[ i ];
				position.push( point.x, point.y, point.z || 0 );

			}

			this.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

			return this;

		}

		computeBoundingBox() {

			if ( this.boundingBox === null ) {

				this.boundingBox = new Box3();

			}

			const position = this.attributes.position;
			const morphAttributesPosition = this.morphAttributes.position;

			if ( position && position.isGLBufferAttribute ) {

				console.error( 'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this );

				this.boundingBox.set(
					new Vector3( - Infinity, - Infinity, - Infinity ),
					new Vector3( + Infinity, + Infinity, + Infinity )
				);

				return;

			}

			if ( position !== undefined ) {

				this.boundingBox.setFromBufferAttribute( position );

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

						const morphAttribute = morphAttributesPosition[ i ];
						_box$2.setFromBufferAttribute( morphAttribute );

						if ( this.morphTargetsRelative ) {

							_vector$8.addVectors( this.boundingBox.min, _box$2.min );
							this.boundingBox.expandByPoint( _vector$8 );

							_vector$8.addVectors( this.boundingBox.max, _box$2.max );
							this.boundingBox.expandByPoint( _vector$8 );

						} else {

							this.boundingBox.expandByPoint( _box$2.min );
							this.boundingBox.expandByPoint( _box$2.max );

						}

					}

				}

			} else {

				this.boundingBox.makeEmpty();

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				console.error( 'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

			}

		}

		computeBoundingSphere() {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new Sphere();

			}

			const position = this.attributes.position;
			const morphAttributesPosition = this.morphAttributes.position;

			if ( position && position.isGLBufferAttribute ) {

				console.error( 'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this );

				this.boundingSphere.set( new Vector3(), Infinity );

				return;

			}

			if ( position ) {

				// first, find the center of the bounding sphere

				const center = this.boundingSphere.center;

				_box$2.setFromBufferAttribute( position );

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

						const morphAttribute = morphAttributesPosition[ i ];
						_boxMorphTargets.setFromBufferAttribute( morphAttribute );

						if ( this.morphTargetsRelative ) {

							_vector$8.addVectors( _box$2.min, _boxMorphTargets.min );
							_box$2.expandByPoint( _vector$8 );

							_vector$8.addVectors( _box$2.max, _boxMorphTargets.max );
							_box$2.expandByPoint( _vector$8 );

						} else {

							_box$2.expandByPoint( _boxMorphTargets.min );
							_box$2.expandByPoint( _boxMorphTargets.max );

						}

					}

				}

				_box$2.getCenter( center );

				// second, try to find a boundingSphere with a radius smaller than the
				// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

				let maxRadiusSq = 0;

				for ( let i = 0, il = position.count; i < il; i ++ ) {

					_vector$8.fromBufferAttribute( position, i );

					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$8 ) );

				}

				// process morph attributes if present

				if ( morphAttributesPosition ) {

					for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

						const morphAttribute = morphAttributesPosition[ i ];
						const morphTargetsRelative = this.morphTargetsRelative;

						for ( let j = 0, jl = morphAttribute.count; j < jl; j ++ ) {

							_vector$8.fromBufferAttribute( morphAttribute, j );

							if ( morphTargetsRelative ) {

								_offset.fromBufferAttribute( position, j );
								_vector$8.add( _offset );

							}

							maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$8 ) );

						}

					}

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

				}

			}

		}

		computeTangents() {

			const index = this.index;
			const attributes = this.attributes;

			// based on http://www.terathon.com/code/tangent.html
			// (per vertex tangents)

			if ( index === null ||
				 attributes.position === undefined ||
				 attributes.normal === undefined ||
				 attributes.uv === undefined ) {

				console.error( 'THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)' );
				return;

			}

			const indices = index.array;
			const positions = attributes.position.array;
			const normals = attributes.normal.array;
			const uvs = attributes.uv.array;

			const nVertices = positions.length / 3;

			if ( this.hasAttribute( 'tangent' ) === false ) {

				this.setAttribute( 'tangent', new BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

			}

			const tangents = this.getAttribute( 'tangent' ).array;

			const tan1 = [], tan2 = [];

			for ( let i = 0; i < nVertices; i ++ ) {

				tan1[ i ] = new Vector3();
				tan2[ i ] = new Vector3();

			}

			const vA = new Vector3(),
				vB = new Vector3(),
				vC = new Vector3(),

				uvA = new Vector2(),
				uvB = new Vector2(),
				uvC = new Vector2(),

				sdir = new Vector3(),
				tdir = new Vector3();

			function handleTriangle( a, b, c ) {

				vA.fromArray( positions, a * 3 );
				vB.fromArray( positions, b * 3 );
				vC.fromArray( positions, c * 3 );

				uvA.fromArray( uvs, a * 2 );
				uvB.fromArray( uvs, b * 2 );
				uvC.fromArray( uvs, c * 2 );

				vB.sub( vA );
				vC.sub( vA );

				uvB.sub( uvA );
				uvC.sub( uvA );

				const r = 1.0 / ( uvB.x * uvC.y - uvC.x * uvB.y );

				// silently ignore degenerate uv triangles having coincident or colinear vertices

				if ( ! isFinite( r ) ) return;

				sdir.copy( vB ).multiplyScalar( uvC.y ).addScaledVector( vC, - uvB.y ).multiplyScalar( r );
				tdir.copy( vC ).multiplyScalar( uvB.x ).addScaledVector( vB, - uvC.x ).multiplyScalar( r );

				tan1[ a ].add( sdir );
				tan1[ b ].add( sdir );
				tan1[ c ].add( sdir );

				tan2[ a ].add( tdir );
				tan2[ b ].add( tdir );
				tan2[ c ].add( tdir );

			}

			let groups = this.groups;

			if ( groups.length === 0 ) {

				groups = [ {
					start: 0,
					count: indices.length
				} ];

			}

			for ( let i = 0, il = groups.length; i < il; ++ i ) {

				const group = groups[ i ];

				const start = group.start;
				const count = group.count;

				for ( let j = start, jl = start + count; j < jl; j += 3 ) {

					handleTriangle(
						indices[ j + 0 ],
						indices[ j + 1 ],
						indices[ j + 2 ]
					);

				}

			}

			const tmp = new Vector3(), tmp2 = new Vector3();
			const n = new Vector3(), n2 = new Vector3();

			function handleVertex( v ) {

				n.fromArray( normals, v * 3 );
				n2.copy( n );

				const t = tan1[ v ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness

				tmp2.crossVectors( n2, t );
				const test = tmp2.dot( tan2[ v ] );
				const w = ( test < 0.0 ) ? - 1.0 : 1.0;

				tangents[ v * 4 ] = tmp.x;
				tangents[ v * 4 + 1 ] = tmp.y;
				tangents[ v * 4 + 2 ] = tmp.z;
				tangents[ v * 4 + 3 ] = w;

			}

			for ( let i = 0, il = groups.length; i < il; ++ i ) {

				const group = groups[ i ];

				const start = group.start;
				const count = group.count;

				for ( let j = start, jl = start + count; j < jl; j += 3 ) {

					handleVertex( indices[ j + 0 ] );
					handleVertex( indices[ j + 1 ] );
					handleVertex( indices[ j + 2 ] );

				}

			}

		}

		computeVertexNormals() {

			const index = this.index;
			const positionAttribute = this.getAttribute( 'position' );

			if ( positionAttribute !== undefined ) {

				let normalAttribute = this.getAttribute( 'normal' );

				if ( normalAttribute === undefined ) {

					normalAttribute = new BufferAttribute( new Float32Array( positionAttribute.count * 3 ), 3 );
					this.setAttribute( 'normal', normalAttribute );

				} else {

					// reset existing normals to zero

					for ( let i = 0, il = normalAttribute.count; i < il; i ++ ) {

						normalAttribute.setXYZ( i, 0, 0, 0 );

					}

				}

				const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
				const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
				const cb = new Vector3(), ab = new Vector3();

				// indexed elements

				if ( index ) {

					for ( let i = 0, il = index.count; i < il; i += 3 ) {

						const vA = index.getX( i + 0 );
						const vB = index.getX( i + 1 );
						const vC = index.getX( i + 2 );

						pA.fromBufferAttribute( positionAttribute, vA );
						pB.fromBufferAttribute( positionAttribute, vB );
						pC.fromBufferAttribute( positionAttribute, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						nA.fromBufferAttribute( normalAttribute, vA );
						nB.fromBufferAttribute( normalAttribute, vB );
						nC.fromBufferAttribute( normalAttribute, vC );

						nA.add( cb );
						nB.add( cb );
						nC.add( cb );

						normalAttribute.setXYZ( vA, nA.x, nA.y, nA.z );
						normalAttribute.setXYZ( vB, nB.x, nB.y, nB.z );
						normalAttribute.setXYZ( vC, nC.x, nC.y, nC.z );

					}

				} else {

					// non-indexed elements (unconnected triangle soup)

					for ( let i = 0, il = positionAttribute.count; i < il; i += 3 ) {

						pA.fromBufferAttribute( positionAttribute, i + 0 );
						pB.fromBufferAttribute( positionAttribute, i + 1 );
						pC.fromBufferAttribute( positionAttribute, i + 2 );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normalAttribute.setXYZ( i + 0, cb.x, cb.y, cb.z );
						normalAttribute.setXYZ( i + 1, cb.x, cb.y, cb.z );
						normalAttribute.setXYZ( i + 2, cb.x, cb.y, cb.z );

					}

				}

				this.normalizeNormals();

				normalAttribute.needsUpdate = true;

			}

		}

		normalizeNormals() {

			const normals = this.attributes.normal;

			for ( let i = 0, il = normals.count; i < il; i ++ ) {

				_vector$8.fromBufferAttribute( normals, i );

				_vector$8.normalize();

				normals.setXYZ( i, _vector$8.x, _vector$8.y, _vector$8.z );

			}

		}

		toNonIndexed() {

			function convertBufferAttribute( attribute, indices ) {

				const array = attribute.array;
				const itemSize = attribute.itemSize;
				const normalized = attribute.normalized;

				const array2 = new array.constructor( indices.length * itemSize );

				let index = 0, index2 = 0;

				for ( let i = 0, l = indices.length; i < l; i ++ ) {

					if ( attribute.isInterleavedBufferAttribute ) {

						index = indices[ i ] * attribute.data.stride + attribute.offset;

					} else {

						index = indices[ i ] * itemSize;

					}

					for ( let j = 0; j < itemSize; j ++ ) {

						array2[ index2 ++ ] = array[ index ++ ];

					}

				}

				return new BufferAttribute( array2, itemSize, normalized );

			}

			//

			if ( this.index === null ) {

				console.warn( 'THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.' );
				return this;

			}

			const geometry2 = new BufferGeometry();

			const indices = this.index.array;
			const attributes = this.attributes;

			// attributes

			for ( const name in attributes ) {

				const attribute = attributes[ name ];

				const newAttribute = convertBufferAttribute( attribute, indices );

				geometry2.setAttribute( name, newAttribute );

			}

			// morph attributes

			const morphAttributes = this.morphAttributes;

			for ( const name in morphAttributes ) {

				const morphArray = [];
				const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

					const attribute = morphAttribute[ i ];

					const newAttribute = convertBufferAttribute( attribute, indices );

					morphArray.push( newAttribute );

				}

				geometry2.morphAttributes[ name ] = morphArray;

			}

			geometry2.morphTargetsRelative = this.morphTargetsRelative;

			// groups

			const groups = this.groups;

			for ( let i = 0, l = groups.length; i < l; i ++ ) {

				const group = groups[ i ];
				geometry2.addGroup( group.start, group.count, group.materialIndex );

			}

			return geometry2;

		}

		toJSON() {

			const data = {
				metadata: {
					version: 4.6,
					type: 'BufferGeometry',
					generator: 'BufferGeometry.toJSON'
				}
			};

			// standard BufferGeometry serialization

			data.uuid = this.uuid;
			data.type = this.type;
			if ( this.name !== '' ) data.name = this.name;
			if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

			if ( this.parameters !== undefined ) {

				const parameters = this.parameters;

				for ( const key in parameters ) {

					if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

				}

				return data;

			}

			// for simplicity the code assumes attributes are not shared across geometries, see #15811

			data.data = { attributes: {} };

			const index = this.index;

			if ( index !== null ) {

				data.data.index = {
					type: index.array.constructor.name,
					array: Array.prototype.slice.call( index.array )
				};

			}

			const attributes = this.attributes;

			for ( const key in attributes ) {

				const attribute = attributes[ key ];

				data.data.attributes[ key ] = attribute.toJSON( data.data );

			}

			const morphAttributes = {};
			let hasMorphAttributes = false;

			for ( const key in this.morphAttributes ) {

				const attributeArray = this.morphAttributes[ key ];

				const array = [];

				for ( let i = 0, il = attributeArray.length; i < il; i ++ ) {

					const attribute = attributeArray[ i ];

					array.push( attribute.toJSON( data.data ) );

				}

				if ( array.length > 0 ) {

					morphAttributes[ key ] = array;

					hasMorphAttributes = true;

				}

			}

			if ( hasMorphAttributes ) {

				data.data.morphAttributes = morphAttributes;
				data.data.morphTargetsRelative = this.morphTargetsRelative;

			}

			const groups = this.groups;

			if ( groups.length > 0 ) {

				data.data.groups = JSON.parse( JSON.stringify( groups ) );

			}

			const boundingSphere = this.boundingSphere;

			if ( boundingSphere !== null ) {

				data.data.boundingSphere = {
					center: boundingSphere.center.toArray(),
					radius: boundingSphere.radius
				};

			}

			return data;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		copy( source ) {

			// reset

			this.index = null;
			this.attributes = {};
			this.morphAttributes = {};
			this.groups = [];
			this.boundingBox = null;
			this.boundingSphere = null;

			// used for storing cloned, shared data

			const data = {};

			// name

			this.name = source.name;

			// index

			const index = source.index;

			if ( index !== null ) {

				this.setIndex( index.clone( data ) );

			}

			// attributes

			const attributes = source.attributes;

			for ( const name in attributes ) {

				const attribute = attributes[ name ];
				this.setAttribute( name, attribute.clone( data ) );

			}

			// morph attributes

			const morphAttributes = source.morphAttributes;

			for ( const name in morphAttributes ) {

				const array = [];
				const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

				for ( let i = 0, l = morphAttribute.length; i < l; i ++ ) {

					array.push( morphAttribute[ i ].clone( data ) );

				}

				this.morphAttributes[ name ] = array;

			}

			this.morphTargetsRelative = source.morphTargetsRelative;

			// groups

			const groups = source.groups;

			for ( let i = 0, l = groups.length; i < l; i ++ ) {

				const group = groups[ i ];
				this.addGroup( group.start, group.count, group.materialIndex );

			}

			// bounding box

			const boundingBox = source.boundingBox;

			if ( boundingBox !== null ) {

				this.boundingBox = boundingBox.clone();

			}

			// bounding sphere

			const boundingSphere = source.boundingSphere;

			if ( boundingSphere !== null ) {

				this.boundingSphere = boundingSphere.clone();

			}

			// draw range

			this.drawRange.start = source.drawRange.start;
			this.drawRange.count = source.drawRange.count;

			// user data

			this.userData = source.userData;

			return this;

		}

		dispose() {

			this.dispatchEvent( { type: 'dispose' } );

		}

	}

	const _inverseMatrix$3 = /*@__PURE__*/ new Matrix4();
	const _ray$3 = /*@__PURE__*/ new Ray();
	const _sphere$6 = /*@__PURE__*/ new Sphere();
	const _sphereHitAt = /*@__PURE__*/ new Vector3();

	const _vA$1 = /*@__PURE__*/ new Vector3();
	const _vB$1 = /*@__PURE__*/ new Vector3();
	const _vC$1 = /*@__PURE__*/ new Vector3();

	const _tempA = /*@__PURE__*/ new Vector3();
	const _morphA = /*@__PURE__*/ new Vector3();

	const _uvA$1 = /*@__PURE__*/ new Vector2();
	const _uvB$1 = /*@__PURE__*/ new Vector2();
	const _uvC$1 = /*@__PURE__*/ new Vector2();

	const _normalA = /*@__PURE__*/ new Vector3();
	const _normalB = /*@__PURE__*/ new Vector3();
	const _normalC = /*@__PURE__*/ new Vector3();

	const _intersectionPoint = /*@__PURE__*/ new Vector3();
	const _intersectionPointWorld = /*@__PURE__*/ new Vector3();

	class Mesh extends Object3D {

		constructor( geometry = new BufferGeometry(), material = new MeshBasicMaterial() ) {

			super();

			this.isMesh = true;

			this.type = 'Mesh';

			this.geometry = geometry;
			this.material = material;

			this.updateMorphTargets();

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			if ( source.morphTargetInfluences !== undefined ) {

				this.morphTargetInfluences = source.morphTargetInfluences.slice();

			}

			if ( source.morphTargetDictionary !== undefined ) {

				this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

			}

			this.material = Array.isArray( source.material ) ? source.material.slice() : source.material;
			this.geometry = source.geometry;

			return this;

		}

		updateMorphTargets() {

			const geometry = this.geometry;

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys( morphAttributes );

			if ( keys.length > 0 ) {

				const morphAttribute = morphAttributes[ keys[ 0 ] ];

				if ( morphAttribute !== undefined ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( let m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

						const name = morphAttribute[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		}

		getVertexPosition( index, target ) {

			const geometry = this.geometry;
			const position = geometry.attributes.position;
			const morphPosition = geometry.morphAttributes.position;
			const morphTargetsRelative = geometry.morphTargetsRelative;

			target.fromBufferAttribute( position, index );

			const morphInfluences = this.morphTargetInfluences;

			if ( morphPosition && morphInfluences ) {

				_morphA.set( 0, 0, 0 );

				for ( let i = 0, il = morphPosition.length; i < il; i ++ ) {

					const influence = morphInfluences[ i ];
					const morphAttribute = morphPosition[ i ];

					if ( influence === 0 ) continue;

					_tempA.fromBufferAttribute( morphAttribute, index );

					if ( morphTargetsRelative ) {

						_morphA.addScaledVector( _tempA, influence );

					} else {

						_morphA.addScaledVector( _tempA.sub( target ), influence );

					}

				}

				target.add( _morphA );

			}

			return target;

		}

		raycast( raycaster, intersects ) {

			const geometry = this.geometry;
			const material = this.material;
			const matrixWorld = this.matrixWorld;

			if ( material === undefined ) return;

			// test with bounding sphere in world space

			if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

			_sphere$6.copy( geometry.boundingSphere );
			_sphere$6.applyMatrix4( matrixWorld );

			// check distance from ray origin to bounding sphere

			_ray$3.copy( raycaster.ray ).recast( raycaster.near );

			if ( _sphere$6.containsPoint( _ray$3.origin ) === false ) {

				if ( _ray$3.intersectSphere( _sphere$6, _sphereHitAt ) === null ) return;

				if ( _ray$3.origin.distanceToSquared( _sphereHitAt ) > ( raycaster.far - raycaster.near ) ** 2 ) return;

			}

			// convert ray to local space of mesh

			_inverseMatrix$3.copy( matrixWorld ).invert();
			_ray$3.copy( raycaster.ray ).applyMatrix4( _inverseMatrix$3 );

			// test with bounding box in local space

			if ( geometry.boundingBox !== null ) {

				if ( _ray$3.intersectsBox( geometry.boundingBox ) === false ) return;

			}

			// test for intersections with geometry

			this._computeIntersections( raycaster, intersects, _ray$3 );

		}

		_computeIntersections( raycaster, intersects, rayLocalSpace ) {

			let intersection;

			const geometry = this.geometry;
			const material = this.material;

			const index = geometry.index;
			const position = geometry.attributes.position;
			const uv = geometry.attributes.uv;
			const uv1 = geometry.attributes.uv1;
			const normal = geometry.attributes.normal;
			const groups = geometry.groups;
			const drawRange = geometry.drawRange;

			if ( index !== null ) {

				// indexed buffer geometry

				if ( Array.isArray( material ) ) {

					for ( let i = 0, il = groups.length; i < il; i ++ ) {

						const group = groups[ i ];
						const groupMaterial = material[ group.materialIndex ];

						const start = Math.max( group.start, drawRange.start );
						const end = Math.min( index.count, Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) ) );

						for ( let j = start, jl = end; j < jl; j += 3 ) {

							const a = index.getX( j );
							const b = index.getX( j + 1 );
							const c = index.getX( j + 2 );

							intersection = checkGeometryIntersection( this, groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
								intersection.face.materialIndex = group.materialIndex;
								intersects.push( intersection );

							}

						}

					}

				} else {

					const start = Math.max( 0, drawRange.start );
					const end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

					for ( let i = start, il = end; i < il; i += 3 ) {

						const a = index.getX( i );
						const b = index.getX( i + 1 );
						const c = index.getX( i + 2 );

						intersection = checkGeometryIntersection( this, material, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
							intersects.push( intersection );

						}

					}

				}

			} else if ( position !== undefined ) {

				// non-indexed buffer geometry

				if ( Array.isArray( material ) ) {

					for ( let i = 0, il = groups.length; i < il; i ++ ) {

						const group = groups[ i ];
						const groupMaterial = material[ group.materialIndex ];

						const start = Math.max( group.start, drawRange.start );
						const end = Math.min( position.count, Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) ) );

						for ( let j = start, jl = end; j < jl; j += 3 ) {

							const a = j;
							const b = j + 1;
							const c = j + 2;

							intersection = checkGeometryIntersection( this, groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
								intersection.face.materialIndex = group.materialIndex;
								intersects.push( intersection );

							}

						}

					}

				} else {

					const start = Math.max( 0, drawRange.start );
					const end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

					for ( let i = start, il = end; i < il; i += 3 ) {

						const a = i;
						const b = i + 1;
						const c = i + 2;

						intersection = checkGeometryIntersection( this, material, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
							intersects.push( intersection );

						}

					}

				}

			}

		}

	}

	function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

		let intersect;

		if ( material.side === BackSide ) {

			intersect = ray.intersectTriangle( pC, pB, pA, true, point );

		} else {

			intersect = ray.intersectTriangle( pA, pB, pC, ( material.side === FrontSide ), point );

		}

		if ( intersect === null ) return null;

		_intersectionPointWorld.copy( point );
		_intersectionPointWorld.applyMatrix4( object.matrixWorld );

		const distance = raycaster.ray.origin.distanceTo( _intersectionPointWorld );

		if ( distance < raycaster.near || distance > raycaster.far ) return null;

		return {
			distance: distance,
			point: _intersectionPointWorld.clone(),
			object: object
		};

	}

	function checkGeometryIntersection( object, material, raycaster, ray, uv, uv1, normal, a, b, c ) {

		object.getVertexPosition( a, _vA$1 );
		object.getVertexPosition( b, _vB$1 );
		object.getVertexPosition( c, _vC$1 );

		const intersection = checkIntersection( object, material, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint );

		if ( intersection ) {

			if ( uv ) {

				_uvA$1.fromBufferAttribute( uv, a );
				_uvB$1.fromBufferAttribute( uv, b );
				_uvC$1.fromBufferAttribute( uv, c );

				intersection.uv = Triangle.getInterpolation( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );

			}

			if ( uv1 ) {

				_uvA$1.fromBufferAttribute( uv1, a );
				_uvB$1.fromBufferAttribute( uv1, b );
				_uvC$1.fromBufferAttribute( uv1, c );

				intersection.uv1 = Triangle.getInterpolation( _intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2() );
				intersection.uv2 = intersection.uv1; // @deprecated, r152

			}

			if ( normal ) {

				_normalA.fromBufferAttribute( normal, a );
				_normalB.fromBufferAttribute( normal, b );
				_normalC.fromBufferAttribute( normal, c );

				intersection.normal = Triangle.getInterpolation( _intersectionPoint, _vA$1, _vB$1, _vC$1, _normalA, _normalB, _normalC, new Vector3() );

				if ( intersection.normal.dot( ray.direction ) > 0 ) {

					intersection.normal.multiplyScalar( - 1 );

				}

			}

			const face = {
				a: a,
				b: b,
				c: c,
				normal: new Vector3(),
				materialIndex: 0
			};

			Triangle.getNormal( _vA$1, _vB$1, _vC$1, face.normal );

			intersection.face = face;

		}

		return intersection;

	}

	class BoxGeometry extends BufferGeometry {

		constructor( width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1 ) {

			super();

			this.type = 'BoxGeometry';

			this.parameters = {
				width: width,
				height: height,
				depth: depth,
				widthSegments: widthSegments,
				heightSegments: heightSegments,
				depthSegments: depthSegments
			};

			const scope = this;

			// segments

			widthSegments = Math.floor( widthSegments );
			heightSegments = Math.floor( heightSegments );
			depthSegments = Math.floor( depthSegments );

			// buffers

			const indices = [];
			const vertices = [];
			const normals = [];
			const uvs = [];

			// helper variables

			let numberOfVertices = 0;
			let groupStart = 0;

			// build each side of the box geometry

			buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
			buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
			buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
			buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
			buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
			buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

			// build geometry

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

			function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

				const segmentWidth = width / gridX;
				const segmentHeight = height / gridY;

				const widthHalf = width / 2;
				const heightHalf = height / 2;
				const depthHalf = depth / 2;

				const gridX1 = gridX + 1;
				const gridY1 = gridY + 1;

				let vertexCounter = 0;
				let groupCount = 0;

				const vector = new Vector3();

				// generate vertices, normals and uvs

				for ( let iy = 0; iy < gridY1; iy ++ ) {

					const y = iy * segmentHeight - heightHalf;

					for ( let ix = 0; ix < gridX1; ix ++ ) {

						const x = ix * segmentWidth - widthHalf;

						// set values to correct vector component

						vector[ u ] = x * udir;
						vector[ v ] = y * vdir;
						vector[ w ] = depthHalf;

						// now apply vector to vertex buffer

						vertices.push( vector.x, vector.y, vector.z );

						// set values to correct vector component

						vector[ u ] = 0;
						vector[ v ] = 0;
						vector[ w ] = depth > 0 ? 1 : - 1;

						// now apply vector to normal buffer

						normals.push( vector.x, vector.y, vector.z );

						// uvs

						uvs.push( ix / gridX );
						uvs.push( 1 - ( iy / gridY ) );

						// counters

						vertexCounter += 1;

					}

				}

				// indices

				// 1. you need three indices to draw a single face
				// 2. a single segment consists of two faces
				// 3. so we need to generate six (2*3) indices per segment

				for ( let iy = 0; iy < gridY; iy ++ ) {

					for ( let ix = 0; ix < gridX; ix ++ ) {

						const a = numberOfVertices + ix + gridX1 * iy;
						const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
						const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
						const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

						// faces

						indices.push( a, b, d );
						indices.push( b, c, d );

						// increase counter

						groupCount += 6;

					}

				}

				// add a group to the geometry. this will ensure multi material support

				scope.addGroup( groupStart, groupCount, materialIndex );

				// calculate new start value for groups

				groupStart += groupCount;

				// update total number of vertices

				numberOfVertices += vertexCounter;

			}

		}

		copy( source ) {

			super.copy( source );

			this.parameters = Object.assign( {}, source.parameters );

			return this;

		}

		static fromJSON( data ) {

			return new BoxGeometry( data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments );

		}

	}

	/**
	 * Uniform Utilities
	 */

	function cloneUniforms( src ) {

		const dst = {};

		for ( const u in src ) {

			dst[ u ] = {};

			for ( const p in src[ u ] ) {

				const property = src[ u ][ p ];

				if ( property && ( property.isColor ||
					property.isMatrix3 || property.isMatrix4 ||
					property.isVector2 || property.isVector3 || property.isVector4 ||
					property.isTexture || property.isQuaternion ) ) {

					if ( property.isRenderTargetTexture ) {

						console.warn( 'UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().' );
						dst[ u ][ p ] = null;

					} else {

						dst[ u ][ p ] = property.clone();

					}

				} else if ( Array.isArray( property ) ) {

					dst[ u ][ p ] = property.slice();

				} else {

					dst[ u ][ p ] = property;

				}

			}

		}

		return dst;

	}

	function mergeUniforms( uniforms ) {

		const merged = {};

		for ( let u = 0; u < uniforms.length; u ++ ) {

			const tmp = cloneUniforms( uniforms[ u ] );

			for ( const p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	}

	function cloneUniformsGroups( src ) {

		const dst = [];

		for ( let u = 0; u < src.length; u ++ ) {

			dst.push( src[ u ].clone() );

		}

		return dst;

	}

	function getUnlitUniformColorSpace( renderer ) {

		if ( renderer.getRenderTarget() === null ) {

			// https://github.com/mrdoob/three.js/pull/23937#issuecomment-1111067398
			return renderer.outputColorSpace;

		}

		return ColorManagement.workingColorSpace;

	}

	// Legacy

	const UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };

	var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

	var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

	class ShaderMaterial extends Material {

		constructor( parameters ) {

			super();

			this.isShaderMaterial = true;

			this.type = 'ShaderMaterial';

			this.defines = {};
			this.uniforms = {};
			this.uniformsGroups = [];

			this.vertexShader = default_vertex;
			this.fragmentShader = default_fragment;

			this.linewidth = 1;

			this.wireframe = false;
			this.wireframeLinewidth = 1;

			this.fog = false; // set to use scene fog
			this.lights = false; // set to use scene lights
			this.clipping = false; // set to use user-defined clipping planes

			this.forceSinglePass = true;

			this.extensions = {
				derivatives: false, // set to use derivatives
				fragDepth: false, // set to use fragment depth values
				drawBuffers: false, // set to use draw buffers
				shaderTextureLOD: false, // set to use shader texture LOD
				clipCullDistance: false // set to use vertex shader clipping
			};

			// When rendered geometry doesn't include these attributes but the material does,
			// use these default values in WebGL. This avoids errors when buffer data is missing.
			this.defaultAttributeValues = {
				'color': [ 1, 1, 1 ],
				'uv': [ 0, 0 ],
				'uv1': [ 0, 0 ]
			};

			this.index0AttributeName = undefined;
			this.uniformsNeedUpdate = false;

			this.glslVersion = null;

			if ( parameters !== undefined ) {

				this.setValues( parameters );

			}

		}

		copy( source ) {

			super.copy( source );

			this.fragmentShader = source.fragmentShader;
			this.vertexShader = source.vertexShader;

			this.uniforms = cloneUniforms( source.uniforms );
			this.uniformsGroups = cloneUniformsGroups( source.uniformsGroups );

			this.defines = Object.assign( {}, source.defines );

			this.wireframe = source.wireframe;
			this.wireframeLinewidth = source.wireframeLinewidth;

			this.fog = source.fog;
			this.lights = source.lights;
			this.clipping = source.clipping;

			this.extensions = Object.assign( {}, source.extensions );

			this.glslVersion = source.glslVersion;

			return this;

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			data.glslVersion = this.glslVersion;
			data.uniforms = {};

			for ( const name in this.uniforms ) {

				const uniform = this.uniforms[ name ];
				const value = uniform.value;

				if ( value && value.isTexture ) {

					data.uniforms[ name ] = {
						type: 't',
						value: value.toJSON( meta ).uuid
					};

				} else if ( value && value.isColor ) {

					data.uniforms[ name ] = {
						type: 'c',
						value: value.getHex()
					};

				} else if ( value && value.isVector2 ) {

					data.uniforms[ name ] = {
						type: 'v2',
						value: value.toArray()
					};

				} else if ( value && value.isVector3 ) {

					data.uniforms[ name ] = {
						type: 'v3',
						value: value.toArray()
					};

				} else if ( value && value.isVector4 ) {

					data.uniforms[ name ] = {
						type: 'v4',
						value: value.toArray()
					};

				} else if ( value && value.isMatrix3 ) {

					data.uniforms[ name ] = {
						type: 'm3',
						value: value.toArray()
					};

				} else if ( value && value.isMatrix4 ) {

					data.uniforms[ name ] = {
						type: 'm4',
						value: value.toArray()
					};

				} else {

					data.uniforms[ name ] = {
						value: value
					};

					// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

				}

			}

			if ( Object.keys( this.defines ).length > 0 ) data.defines = this.defines;

			data.vertexShader = this.vertexShader;
			data.fragmentShader = this.fragmentShader;

			data.lights = this.lights;
			data.clipping = this.clipping;

			const extensions = {};

			for ( const key in this.extensions ) {

				if ( this.extensions[ key ] === true ) extensions[ key ] = true;

			}

			if ( Object.keys( extensions ).length > 0 ) data.extensions = extensions;

			return data;

		}

	}

	class Camera extends Object3D {

		constructor() {

			super();

			this.isCamera = true;

			this.type = 'Camera';

			this.matrixWorldInverse = new Matrix4();

			this.projectionMatrix = new Matrix4();
			this.projectionMatrixInverse = new Matrix4();

			this.coordinateSystem = WebGLCoordinateSystem;

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			this.matrixWorldInverse.copy( source.matrixWorldInverse );

			this.projectionMatrix.copy( source.projectionMatrix );
			this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

			this.coordinateSystem = source.coordinateSystem;

			return this;

		}

		getWorldDirection( target ) {

			return super.getWorldDirection( target ).negate();

		}

		updateMatrixWorld( force ) {

			super.updateMatrixWorld( force );

			this.matrixWorldInverse.copy( this.matrixWorld ).invert();

		}

		updateWorldMatrix( updateParents, updateChildren ) {

			super.updateWorldMatrix( updateParents, updateChildren );

			this.matrixWorldInverse.copy( this.matrixWorld ).invert();

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	class PerspectiveCamera extends Camera {

		constructor( fov = 50, aspect = 1, near = 0.1, far = 2000 ) {

			super();

			this.isPerspectiveCamera = true;

			this.type = 'PerspectiveCamera';

			this.fov = fov;
			this.zoom = 1;

			this.near = near;
			this.far = far;
			this.focus = 10;

			this.aspect = aspect;
			this.view = null;

			this.filmGauge = 35;	// width of the film (default in millimeters)
			this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

			this.updateProjectionMatrix();

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			this.fov = source.fov;
			this.zoom = source.zoom;

			this.near = source.near;
			this.far = source.far;
			this.focus = source.focus;

			this.aspect = source.aspect;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			this.filmGauge = source.filmGauge;
			this.filmOffset = source.filmOffset;

			return this;

		}

		/**
		 * Sets the FOV by focal length in respect to the current .filmGauge.
		 *
		 * The default film gauge is 35, so that the focal length can be specified for
		 * a 35mm (full frame) camera.
		 *
		 * Values for focal length and film gauge must have the same unit.
		 */
		setFocalLength( focalLength ) {

			/** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */
			const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

			this.fov = RAD2DEG * 2 * Math.atan( vExtentSlope );
			this.updateProjectionMatrix();

		}

		/**
		 * Calculates the focal length from the current .fov and .filmGauge.
		 */
		getFocalLength() {

			const vExtentSlope = Math.tan( DEG2RAD * 0.5 * this.fov );

			return 0.5 * this.getFilmHeight() / vExtentSlope;

		}

		getEffectiveFOV() {

			return RAD2DEG * 2 * Math.atan(
				Math.tan( DEG2RAD * 0.5 * this.fov ) / this.zoom );

		}

		getFilmWidth() {

			// film not completely covered in portrait format (aspect < 1)
			return this.filmGauge * Math.min( this.aspect, 1 );

		}

		getFilmHeight() {

			// film not completely covered in landscape format (aspect > 1)
			return this.filmGauge / Math.max( this.aspect, 1 );

		}

		/**
		 * Sets an offset in a larger frustum. This is useful for multi-window or
		 * multi-monitor/multi-machine setups.
		 *
		 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
		 * the monitors are in grid like this
		 *
		 *   +---+---+---+
		 *   | A | B | C |
		 *   +---+---+---+
		 *   | D | E | F |
		 *   +---+---+---+
		 *
		 * then for each monitor you would call it like this
		 *
		 *   const w = 1920;
		 *   const h = 1080;
		 *   const fullWidth = w * 3;
		 *   const fullHeight = h * 2;
		 *
		 *   --A--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
		 *   --B--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
		 *   --C--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
		 *   --D--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
		 *   --E--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
		 *   --F--
		 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
		 *
		 *   Note there is no reason monitors have to be the same size or in a grid.
		 */
		setViewOffset( fullWidth, fullHeight, x, y, width, height ) {

			this.aspect = fullWidth / fullHeight;

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		}

		clearViewOffset() {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		}

		updateProjectionMatrix() {

			const near = this.near;
			let top = near * Math.tan( DEG2RAD * 0.5 * this.fov ) / this.zoom;
			let height = 2 * top;
			let width = this.aspect * height;
			let left = - 0.5 * width;
			const view = this.view;

			if ( this.view !== null && this.view.enabled ) {

				const fullWidth = view.fullWidth,
					fullHeight = view.fullHeight;

				left += view.offsetX * width / fullWidth;
				top -= view.offsetY * height / fullHeight;
				width *= view.width / fullWidth;
				height *= view.height / fullHeight;

			}

			const skew = this.filmOffset;
			if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

			this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far, this.coordinateSystem );

			this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			data.object.fov = this.fov;
			data.object.zoom = this.zoom;

			data.object.near = this.near;
			data.object.far = this.far;
			data.object.focus = this.focus;

			data.object.aspect = this.aspect;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			data.object.filmGauge = this.filmGauge;
			data.object.filmOffset = this.filmOffset;

			return data;

		}

	}

	const fov = - 90; // negative fov is not an error
	const aspect = 1;

	class CubeCamera extends Object3D {

		constructor( near, far, renderTarget ) {

			super();

			this.type = 'CubeCamera';

			this.renderTarget = renderTarget;
			this.coordinateSystem = null;
			this.activeMipmapLevel = 0;

			const cameraPX = new PerspectiveCamera( fov, aspect, near, far );
			cameraPX.layers = this.layers;
			this.add( cameraPX );

			const cameraNX = new PerspectiveCamera( fov, aspect, near, far );
			cameraNX.layers = this.layers;
			this.add( cameraNX );

			const cameraPY = new PerspectiveCamera( fov, aspect, near, far );
			cameraPY.layers = this.layers;
			this.add( cameraPY );

			const cameraNY = new PerspectiveCamera( fov, aspect, near, far );
			cameraNY.layers = this.layers;
			this.add( cameraNY );

			const cameraPZ = new PerspectiveCamera( fov, aspect, near, far );
			cameraPZ.layers = this.layers;
			this.add( cameraPZ );

			const cameraNZ = new PerspectiveCamera( fov, aspect, near, far );
			cameraNZ.layers = this.layers;
			this.add( cameraNZ );

		}

		updateCoordinateSystem() {

			const coordinateSystem = this.coordinateSystem;

			const cameras = this.children.concat();

			const [ cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ ] = cameras;

			for ( const camera of cameras ) this.remove( camera );

			if ( coordinateSystem === WebGLCoordinateSystem ) {

				cameraPX.up.set( 0, 1, 0 );
				cameraPX.lookAt( 1, 0, 0 );

				cameraNX.up.set( 0, 1, 0 );
				cameraNX.lookAt( - 1, 0, 0 );

				cameraPY.up.set( 0, 0, - 1 );
				cameraPY.lookAt( 0, 1, 0 );

				cameraNY.up.set( 0, 0, 1 );
				cameraNY.lookAt( 0, - 1, 0 );

				cameraPZ.up.set( 0, 1, 0 );
				cameraPZ.lookAt( 0, 0, 1 );

				cameraNZ.up.set( 0, 1, 0 );
				cameraNZ.lookAt( 0, 0, - 1 );

			} else if ( coordinateSystem === WebGPUCoordinateSystem ) {

				cameraPX.up.set( 0, - 1, 0 );
				cameraPX.lookAt( - 1, 0, 0 );

				cameraNX.up.set( 0, - 1, 0 );
				cameraNX.lookAt( 1, 0, 0 );

				cameraPY.up.set( 0, 0, 1 );
				cameraPY.lookAt( 0, 1, 0 );

				cameraNY.up.set( 0, 0, - 1 );
				cameraNY.lookAt( 0, - 1, 0 );

				cameraPZ.up.set( 0, - 1, 0 );
				cameraPZ.lookAt( 0, 0, 1 );

				cameraNZ.up.set( 0, - 1, 0 );
				cameraNZ.lookAt( 0, 0, - 1 );

			} else {

				throw new Error( 'THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: ' + coordinateSystem );

			}

			for ( const camera of cameras ) {

				this.add( camera );

				camera.updateMatrixWorld();

			}

		}

		update( renderer, scene ) {

			if ( this.parent === null ) this.updateMatrixWorld();

			const { renderTarget, activeMipmapLevel } = this;

			if ( this.coordinateSystem !== renderer.coordinateSystem ) {

				this.coordinateSystem = renderer.coordinateSystem;

				this.updateCoordinateSystem();

			}

			const [ cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ ] = this.children;

			const currentRenderTarget = renderer.getRenderTarget();
			const currentActiveCubeFace = renderer.getActiveCubeFace();
			const currentActiveMipmapLevel = renderer.getActiveMipmapLevel();

			const currentXrEnabled = renderer.xr.enabled;

			renderer.xr.enabled = false;

			const generateMipmaps = renderTarget.texture.generateMipmaps;

			renderTarget.texture.generateMipmaps = false;

			renderer.setRenderTarget( renderTarget, 0, activeMipmapLevel );
			renderer.render( scene, cameraPX );

			renderer.setRenderTarget( renderTarget, 1, activeMipmapLevel );
			renderer.render( scene, cameraNX );

			renderer.setRenderTarget( renderTarget, 2, activeMipmapLevel );
			renderer.render( scene, cameraPY );

			renderer.setRenderTarget( renderTarget, 3, activeMipmapLevel );
			renderer.render( scene, cameraNY );

			renderer.setRenderTarget( renderTarget, 4, activeMipmapLevel );
			renderer.render( scene, cameraPZ );

			// mipmaps are generated during the last call of render()
			// at this point, all sides of the cube render target are defined

			renderTarget.texture.generateMipmaps = generateMipmaps;

			renderer.setRenderTarget( renderTarget, 5, activeMipmapLevel );
			renderer.render( scene, cameraNZ );

			renderer.setRenderTarget( currentRenderTarget, currentActiveCubeFace, currentActiveMipmapLevel );

			renderer.xr.enabled = currentXrEnabled;

			renderTarget.texture.needsPMREMUpdate = true;

		}

	}

	class CubeTexture extends Texture {

		constructor( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace ) {

			images = images !== undefined ? images : [];
			mapping = mapping !== undefined ? mapping : CubeReflectionMapping;

			super( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace );

			this.isCubeTexture = true;

			this.flipY = false;

		}

		get images() {

			return this.image;

		}

		set images( value ) {

			this.image = value;

		}

	}

	class WebGLCubeRenderTarget extends WebGLRenderTarget {

		constructor( size = 1, options = {} ) {

			super( size, size, options );

			this.isWebGLCubeRenderTarget = true;

			const image = { width: size, height: size, depth: 1 };
			const images = [ image, image, image, image, image, image ];

			if ( options.encoding !== undefined ) {

				// @deprecated, r152
				warnOnce( 'THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.' );
				options.colorSpace = options.encoding === sRGBEncoding ? SRGBColorSpace : NoColorSpace;

			}

			this.texture = new CubeTexture( images, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.colorSpace );

			// By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by WebGL (and three.js)
			// in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
			// in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.

			// three.js uses a right-handed coordinate system. So environment maps used in three.js appear to have px and nx swapped
			// and the flag isRenderTargetTexture controls this conversion. The flip is not required when using WebGLCubeRenderTarget.texture
			// as a cube texture (this is detected when isRenderTargetTexture is set to true for cube textures).

			this.texture.isRenderTargetTexture = true;

			this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
			this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;

		}

		fromEquirectangularTexture( renderer, texture ) {

			this.texture.type = texture.type;
			this.texture.colorSpace = texture.colorSpace;

			this.texture.generateMipmaps = texture.generateMipmaps;
			this.texture.minFilter = texture.minFilter;
			this.texture.magFilter = texture.magFilter;

			const shader = {

				uniforms: {
					tEquirect: { value: null },
				},

				vertexShader: /* glsl */`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,

				fragmentShader: /* glsl */`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
			};

			const geometry = new BoxGeometry( 5, 5, 5 );

			const material = new ShaderMaterial( {

				name: 'CubemapFromEquirect',

				uniforms: cloneUniforms( shader.uniforms ),
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader,
				side: BackSide,
				blending: NoBlending

			} );

			material.uniforms.tEquirect.value = texture;

			const mesh = new Mesh( geometry, material );

			const currentMinFilter = texture.minFilter;

			// Avoid blurred poles
			if ( texture.minFilter === LinearMipmapLinearFilter ) texture.minFilter = LinearFilter;

			const camera = new CubeCamera( 1, 10, this );
			camera.update( renderer, mesh );

			texture.minFilter = currentMinFilter;

			mesh.geometry.dispose();
			mesh.material.dispose();

			return this;

		}

		clear( renderer, color, depth, stencil ) {

			const currentRenderTarget = renderer.getRenderTarget();

			for ( let i = 0; i < 6; i ++ ) {

				renderer.setRenderTarget( this, i );

				renderer.clear( color, depth, stencil );

			}

			renderer.setRenderTarget( currentRenderTarget );

		}

	}

	const _vector1 = /*@__PURE__*/ new Vector3();
	const _vector2 = /*@__PURE__*/ new Vector3();
	const _normalMatrix = /*@__PURE__*/ new Matrix3();

	class Plane {

		constructor( normal = new Vector3( 1, 0, 0 ), constant = 0 ) {

			this.isPlane = true;

			// normal is assumed to be normalized

			this.normal = normal;
			this.constant = constant;

		}

		set( normal, constant ) {

			this.normal.copy( normal );
			this.constant = constant;

			return this;

		}

		setComponents( x, y, z, w ) {

			this.normal.set( x, y, z );
			this.constant = w;

			return this;

		}

		setFromNormalAndCoplanarPoint( normal, point ) {

			this.normal.copy( normal );
			this.constant = - point.dot( this.normal );

			return this;

		}

		setFromCoplanarPoints( a, b, c ) {

			const normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

			// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

			this.setFromNormalAndCoplanarPoint( normal, a );

			return this;

		}

		copy( plane ) {

			this.normal.copy( plane.normal );
			this.constant = plane.constant;

			return this;

		}

		normalize() {

			// Note: will lead to a divide by zero if the plane is invalid.

			const inverseNormalLength = 1.0 / this.normal.length();
			this.normal.multiplyScalar( inverseNormalLength );
			this.constant *= inverseNormalLength;

			return this;

		}

		negate() {

			this.constant *= - 1;
			this.normal.negate();

			return this;

		}

		distanceToPoint( point ) {

			return this.normal.dot( point ) + this.constant;

		}

		distanceToSphere( sphere ) {

			return this.distanceToPoint( sphere.center ) - sphere.radius;

		}

		projectPoint( point, target ) {

			return target.copy( point ).addScaledVector( this.normal, - this.distanceToPoint( point ) );

		}

		intersectLine( line, target ) {

			const direction = line.delta( _vector1 );

			const denominator = this.normal.dot( direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( this.distanceToPoint( line.start ) === 0 ) {

					return target.copy( line.start );

				}

				// Unsure if this is the correct method to handle this case.
				return null;

			}

			const t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

			if ( t < 0 || t > 1 ) {

				return null;

			}

			return target.copy( line.start ).addScaledVector( direction, t );

		}

		intersectsLine( line ) {

			// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

			const startSign = this.distanceToPoint( line.start );
			const endSign = this.distanceToPoint( line.end );

			return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

		}

		intersectsBox( box ) {

			return box.intersectsPlane( this );

		}

		intersectsSphere( sphere ) {

			return sphere.intersectsPlane( this );

		}

		coplanarPoint( target ) {

			return target.copy( this.normal ).multiplyScalar( - this.constant );

		}

		applyMatrix4( matrix, optionalNormalMatrix ) {

			const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

			const referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

			const normal = this.normal.applyMatrix3( normalMatrix ).normalize();

			this.constant = - referencePoint.dot( normal );

			return this;

		}

		translate( offset ) {

			this.constant -= offset.dot( this.normal );

			return this;

		}

		equals( plane ) {

			return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	const _sphere$5 = /*@__PURE__*/ new Sphere();
	const _vector$7 = /*@__PURE__*/ new Vector3();

	class Frustum {

		constructor( p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane() ) {

			this.planes = [ p0, p1, p2, p3, p4, p5 ];

		}

		set( p0, p1, p2, p3, p4, p5 ) {

			const planes = this.planes;

			planes[ 0 ].copy( p0 );
			planes[ 1 ].copy( p1 );
			planes[ 2 ].copy( p2 );
			planes[ 3 ].copy( p3 );
			planes[ 4 ].copy( p4 );
			planes[ 5 ].copy( p5 );

			return this;

		}

		copy( frustum ) {

			const planes = this.planes;

			for ( let i = 0; i < 6; i ++ ) {

				planes[ i ].copy( frustum.planes[ i ] );

			}

			return this;

		}

		setFromProjectionMatrix( m, coordinateSystem = WebGLCoordinateSystem ) {

			const planes = this.planes;
			const me = m.elements;
			const me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
			const me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
			const me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
			const me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

			planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
			planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
			planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
			planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
			planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();

			if ( coordinateSystem === WebGLCoordinateSystem ) {

				planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

			} else if ( coordinateSystem === WebGPUCoordinateSystem ) {

				planes[ 5 ].setComponents( me2, me6, me10, me14 ).normalize();

			} else {

				throw new Error( 'THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ' + coordinateSystem );

			}

			return this;

		}

		intersectsObject( object ) {

			if ( object.boundingSphere !== undefined ) {

				if ( object.boundingSphere === null ) object.computeBoundingSphere();

				_sphere$5.copy( object.boundingSphere ).applyMatrix4( object.matrixWorld );

			} else {

				const geometry = object.geometry;

				if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

				_sphere$5.copy( geometry.boundingSphere ).applyMatrix4( object.matrixWorld );

			}

			return this.intersectsSphere( _sphere$5 );

		}

		intersectsSprite( sprite ) {

			_sphere$5.center.set( 0, 0, 0 );
			_sphere$5.radius = 0.7071067811865476;
			_sphere$5.applyMatrix4( sprite.matrixWorld );

			return this.intersectsSphere( _sphere$5 );

		}

		intersectsSphere( sphere ) {

			const planes = this.planes;
			const center = sphere.center;
			const negRadius = - sphere.radius;

			for ( let i = 0; i < 6; i ++ ) {

				const distance = planes[ i ].distanceToPoint( center );

				if ( distance < negRadius ) {

					return false;

				}

			}

			return true;

		}

		intersectsBox( box ) {

			const planes = this.planes;

			for ( let i = 0; i < 6; i ++ ) {

				const plane = planes[ i ];

				// corner at max distance

				_vector$7.x = plane.normal.x > 0 ? box.max.x : box.min.x;
				_vector$7.y = plane.normal.y > 0 ? box.max.y : box.min.y;
				_vector$7.z = plane.normal.z > 0 ? box.max.z : box.min.z;

				if ( plane.distanceToPoint( _vector$7 ) < 0 ) {

					return false;

				}

			}

			return true;

		}

		containsPoint( point ) {

			const planes = this.planes;

			for ( let i = 0; i < 6; i ++ ) {

				if ( planes[ i ].distanceToPoint( point ) < 0 ) {

					return false;

				}

			}

			return true;

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	function WebGLAnimation() {

		let context = null;
		let isAnimating = false;
		let animationLoop = null;
		let requestId = null;

		function onAnimationFrame( time, frame ) {

			animationLoop( time, frame );

			requestId = context.requestAnimationFrame( onAnimationFrame );

		}

		return {

			start: function () {

				if ( isAnimating === true ) return;
				if ( animationLoop === null ) return;

				requestId = context.requestAnimationFrame( onAnimationFrame );

				isAnimating = true;

			},

			stop: function () {

				context.cancelAnimationFrame( requestId );

				isAnimating = false;

			},

			setAnimationLoop: function ( callback ) {

				animationLoop = callback;

			},

			setContext: function ( value ) {

				context = value;

			}

		};

	}

	function WebGLAttributes( gl, capabilities ) {

		const isWebGL2 = capabilities.isWebGL2;

		const buffers = new WeakMap();

		function createBuffer( attribute, bufferType ) {

			const array = attribute.array;
			const usage = attribute.usage;
			const size = array.byteLength;

			const buffer = gl.createBuffer();

			gl.bindBuffer( bufferType, buffer );
			gl.bufferData( bufferType, array, usage );

			attribute.onUploadCallback();

			let type;

			if ( array instanceof Float32Array ) {

				type = gl.FLOAT;

			} else if ( array instanceof Uint16Array ) {

				if ( attribute.isFloat16BufferAttribute ) {

					if ( isWebGL2 ) {

						type = gl.HALF_FLOAT;

					} else {

						throw new Error( 'THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.' );

					}

				} else {

					type = gl.UNSIGNED_SHORT;

				}

			} else if ( array instanceof Int16Array ) {

				type = gl.SHORT;

			} else if ( array instanceof Uint32Array ) {

				type = gl.UNSIGNED_INT;

			} else if ( array instanceof Int32Array ) {

				type = gl.INT;

			} else if ( array instanceof Int8Array ) {

				type = gl.BYTE;

			} else if ( array instanceof Uint8Array ) {

				type = gl.UNSIGNED_BYTE;

			} else if ( array instanceof Uint8ClampedArray ) {

				type = gl.UNSIGNED_BYTE;

			} else {

				throw new Error( 'THREE.WebGLAttributes: Unsupported buffer data format: ' + array );

			}

			return {
				buffer: buffer,
				type: type,
				bytesPerElement: array.BYTES_PER_ELEMENT,
				version: attribute.version,
				size: size
			};

		}

		function updateBuffer( buffer, attribute, bufferType ) {

			const array = attribute.array;
			const updateRange = attribute._updateRange; // deprecated
			const updateRanges = attribute.updateRanges;

			gl.bindBuffer( bufferType, buffer );

			if ( updateRange.count === - 1 && updateRanges.length === 0 ) {

				// Not using update ranges
				gl.bufferSubData( bufferType, 0, array );

			}

			if ( updateRanges.length !== 0 ) {

				for ( let i = 0, l = updateRanges.length; i < l; i ++ ) {

					const range = updateRanges[ i ];
					if ( isWebGL2 ) {

						gl.bufferSubData( bufferType, range.start * array.BYTES_PER_ELEMENT,
							array, range.start, range.count );

					} else {

						gl.bufferSubData( bufferType, range.start * array.BYTES_PER_ELEMENT,
							array.subarray( range.start, range.start + range.count ) );

					}

				}

				attribute.clearUpdateRanges();

			}

			// deprecated
			if ( updateRange.count !== - 1 ) {

				if ( isWebGL2 ) {

					gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
						array, updateRange.offset, updateRange.count );

				} else {

					gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
						array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

				}

				updateRange.count = - 1; // reset range

			}

			attribute.onUploadCallback();

		}

		//

		function get( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			return buffers.get( attribute );

		}

		function remove( attribute ) {

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			const data = buffers.get( attribute );

			if ( data ) {

				gl.deleteBuffer( data.buffer );

				buffers.delete( attribute );

			}

		}

		function update( attribute, bufferType ) {

			if ( attribute.isGLBufferAttribute ) {

				const cached = buffers.get( attribute );

				if ( ! cached || cached.version < attribute.version ) {

					buffers.set( attribute, {
						buffer: attribute.buffer,
						type: attribute.type,
						bytesPerElement: attribute.elementSize,
						version: attribute.version
					} );

				}

				return;

			}

			if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

			const data = buffers.get( attribute );

			if ( data === undefined ) {

				buffers.set( attribute, createBuffer( attribute, bufferType ) );

			} else if ( data.version < attribute.version ) {

				if ( data.size !== attribute.array.byteLength ) {

					throw new Error( 'THREE.WebGLAttributes: The size of the buffer attribute\'s array buffer does not match the original size. Resizing buffer attributes is not supported.' );

				}

				updateBuffer( data.buffer, attribute, bufferType );

				data.version = attribute.version;

			}

		}

		return {

			get: get,
			remove: remove,
			update: update

		};

	}

	class PlaneGeometry extends BufferGeometry {

		constructor( width = 1, height = 1, widthSegments = 1, heightSegments = 1 ) {

			super();

			this.type = 'PlaneGeometry';

			this.parameters = {
				width: width,
				height: height,
				widthSegments: widthSegments,
				heightSegments: heightSegments
			};

			const width_half = width / 2;
			const height_half = height / 2;

			const gridX = Math.floor( widthSegments );
			const gridY = Math.floor( heightSegments );

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			const segment_width = width / gridX;
			const segment_height = height / gridY;

			//

			const indices = [];
			const vertices = [];
			const normals = [];
			const uvs = [];

			for ( let iy = 0; iy < gridY1; iy ++ ) {

				const y = iy * segment_height - height_half;

				for ( let ix = 0; ix < gridX1; ix ++ ) {

					const x = ix * segment_width - width_half;

					vertices.push( x, - y, 0 );

					normals.push( 0, 0, 1 );

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

				}

			}

			for ( let iy = 0; iy < gridY; iy ++ ) {

				for ( let ix = 0; ix < gridX; ix ++ ) {

					const a = ix + gridX1 * iy;
					const b = ix + gridX1 * ( iy + 1 );
					const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
					const d = ( ix + 1 ) + gridX1 * iy;

					indices.push( a, b, d );
					indices.push( b, c, d );

				}

			}

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		}

		copy( source ) {

			super.copy( source );

			this.parameters = Object.assign( {}, source.parameters );

			return this;

		}

		static fromJSON( data ) {

			return new PlaneGeometry( data.width, data.height, data.widthSegments, data.heightSegments );

		}

	}

	var alphahash_fragment = "#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif";

	var alphahash_pars_fragment = "#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif";

	var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif";

	var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

	var alphatest_fragment = "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif";

	var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif";

	var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif";

	var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

	var batching_pars_vertex = "#ifdef USE_BATCHING\n\tattribute float batchId;\n\tuniform highp sampler2D batchingTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif";

	var batching_vertex = "#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( batchId );\n#endif";

	var begin_vertex = "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif";

	var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";

	var bsdfs = "float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated";

	var iridescence_fragment = "#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif";

	var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";

	var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";

	var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";

	var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";

	var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";

	var color_fragment = "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif";

	var color_pars_fragment = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif";

	var color_pars_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";

	var color_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";

	var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat luminance( const in vec3 rgb ) {\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\treturn dot( weights, rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated";

	var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";

	var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";

	var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";

	var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif";

	var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";

	var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";

	var colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";

	var colorspace_pars_fragment = "\nconst mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(\n\tvec3( 0.8224621, 0.177538, 0.0 ),\n\tvec3( 0.0331941, 0.9668058, 0.0 ),\n\tvec3( 0.0170827, 0.0723974, 0.9105199 )\n);\nconst mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.2249401, - 0.2249404, 0.0 ),\n\tvec3( - 0.0420569, 1.0420571, 0.0 ),\n\tvec3( - 0.0196376, - 0.0786361, 1.0982735 )\n);\nvec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );\n}\nvec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );\n}\nvec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn sRGBTransferOETF( value );\n}";

	var envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";

	var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";

	var envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";

	var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";

	var envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";

	var fog_vertex = "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif";

	var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif";

	var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";

	var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";

	var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}";

	var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif";

	var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

	var lights_lambert_fragment = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;";

	var lights_lambert_pars_fragment = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert";

	var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( LEGACY_LIGHTS )\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#else\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif";

	var envmap_physical_pars_fragment = "#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif";

	var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";

	var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon";

	var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";

	var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong";

	var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif";

	var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\t\treturn saturate(v);\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\t#endif\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";

	var lights_fragment_begin = "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";

	var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif";

	var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif";

	var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

	var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";

	var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";

	var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";

	var map_fragment = "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif";

	var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";

	var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";

	var map_particle_pars_fragment = "#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

	var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";

	var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

	var morphcolor_vertex = "#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif";

	var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif";

	var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif";

	var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif";

	var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;";

	var normal_fragment_maps = "#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";

	var normal_pars_fragment = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";

	var normal_pars_vertex = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";

	var normal_vertex = "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif";

	var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif";

	var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif";

	var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif";

	var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif";

	var iridescence_pars_fragment = "#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif";

	var opaque_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";

	var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}";

	var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";

	var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";

	var dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";

	var dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";

	var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";

	var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

	var shadowmap_pars_fragment = "#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";

	var shadowmap_pars_vertex = "#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";

	var shadowmap_vertex = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif";

	var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";

	var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

	var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif";

	var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";

	var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";

	var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

	var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

	var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";

	var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\tconst float AgxMinEv = - 12.47393;\tconst float AgxMaxEv = 4.026069;\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\tcolor *= toneMappingExposure;\n\tcolor = AgXInsetMatrix * color;\n\tcolor = max( color, 1e-10 );\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\tcolor = clamp( color, 0.0, 1.0 );\n\tcolor = agxDefaultContrastApprox( color );\n\tcolor = AgXOutsetMatrix * color;\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\treturn color;\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";

	var transmission_fragment = "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif";

	var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif";

	var uv_pars_fragment = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif";

	var uv_pars_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif";

	var uv_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif";

	var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";

	const vertex$h = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";

	const fragment$h = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";

	const vertex$g = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";

	const fragment$g = "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";

	const vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";

	const fragment$f = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";

	const vertex$e = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";

	const fragment$e = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";

	const vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";

	const fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";

	const vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";

	const fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";

	const vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

	const vertex$a = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$9 = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$9 = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";

	const fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";

	const fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}";

	const vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}";

	const fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

	const vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

	const vertex$2 = "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}";

	const vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

	const fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}";

	const ShaderChunk = {
		alphahash_fragment: alphahash_fragment,
		alphahash_pars_fragment: alphahash_pars_fragment,
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		alphatest_pars_fragment: alphatest_pars_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		batching_pars_vertex: batching_pars_vertex,
		batching_vertex: batching_vertex,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		iridescence_fragment: iridescence_fragment,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		colorspace_fragment: colorspace_fragment,
		colorspace_pars_fragment: colorspace_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_common_pars_fragment: envmap_common_pars_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_fragment: lights_lambert_fragment,
		lights_lambert_pars_fragment: lights_lambert_pars_fragment,
		lights_pars_begin: lights_pars_begin,
		lights_toon_fragment: lights_toon_fragment,
		lights_toon_pars_fragment: lights_toon_pars_fragment,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphcolor_vertex: morphcolor_vertex,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normal_pars_fragment: normal_pars_fragment,
		normal_pars_vertex: normal_pars_vertex,
		normal_vertex: normal_vertex,
		normalmap_pars_fragment: normalmap_pars_fragment,
		clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
		clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
		clearcoat_pars_fragment: clearcoat_pars_fragment,
		iridescence_pars_fragment: iridescence_pars_fragment,
		opaque_fragment: opaque_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		transmission_fragment: transmission_fragment,
		transmission_pars_fragment: transmission_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		worldpos_vertex: worldpos_vertex,

		background_vert: vertex$h,
		background_frag: fragment$h,
		backgroundCube_vert: vertex$g,
		backgroundCube_frag: fragment$g,
		cube_vert: vertex$f,
		cube_frag: fragment$f,
		depth_vert: vertex$e,
		depth_frag: fragment$e,
		distanceRGBA_vert: vertex$d,
		distanceRGBA_frag: fragment$d,
		equirect_vert: vertex$c,
		equirect_frag: fragment$c,
		linedashed_vert: vertex$b,
		linedashed_frag: fragment$b,
		meshbasic_vert: vertex$a,
		meshbasic_frag: fragment$a,
		meshlambert_vert: vertex$9,
		meshlambert_frag: fragment$9,
		meshmatcap_vert: vertex$8,
		meshmatcap_frag: fragment$8,
		meshnormal_vert: vertex$7,
		meshnormal_frag: fragment$7,
		meshphong_vert: vertex$6,
		meshphong_frag: fragment$6,
		meshphysical_vert: vertex$5,
		meshphysical_frag: fragment$5,
		meshtoon_vert: vertex$4,
		meshtoon_frag: fragment$4,
		points_vert: vertex$3,
		points_frag: fragment$3,
		shadow_vert: vertex$2,
		shadow_frag: fragment$2,
		sprite_vert: vertex$1,
		sprite_frag: fragment$1
	};

	/**
	 * Uniforms library for shared webgl shaders
	 */

	const UniformsLib = {

		common: {

			diffuse: { value: /*@__PURE__*/ new Color( 0xffffff ) },
			opacity: { value: 1.0 },

			map: { value: null },
			mapTransform: { value: /*@__PURE__*/ new Matrix3() },

			alphaMap: { value: null },
			alphaMapTransform: { value: /*@__PURE__*/ new Matrix3() },

			alphaTest: { value: 0 }

		},

		specularmap: {

			specularMap: { value: null },
			specularMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		envmap: {

			envMap: { value: null },
			flipEnvMap: { value: - 1 },
			reflectivity: { value: 1.0 }, // basic, lambert, phong
			ior: { value: 1.5 }, // physical
			refractionRatio: { value: 0.98 }, // basic, lambert, phong

		},

		aomap: {

			aoMap: { value: null },
			aoMapIntensity: { value: 1 },
			aoMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		lightmap: {

			lightMap: { value: null },
			lightMapIntensity: { value: 1 },
			lightMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		bumpmap: {

			bumpMap: { value: null },
			bumpMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			bumpScale: { value: 1 }

		},

		normalmap: {

			normalMap: { value: null },
			normalMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			normalScale: { value: /*@__PURE__*/ new Vector2( 1, 1 ) }

		},

		displacementmap: {

			displacementMap: { value: null },
			displacementMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			displacementScale: { value: 1 },
			displacementBias: { value: 0 }

		},

		emissivemap: {

			emissiveMap: { value: null },
			emissiveMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		metalnessmap: {

			metalnessMap: { value: null },
			metalnessMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		roughnessmap: {

			roughnessMap: { value: null },
			roughnessMapTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		gradientmap: {

			gradientMap: { value: null }

		},

		fog: {

			fogDensity: { value: 0.00025 },
			fogNear: { value: 1 },
			fogFar: { value: 2000 },
			fogColor: { value: /*@__PURE__*/ new Color( 0xffffff ) }

		},

		lights: {

			ambientLightColor: { value: [] },

			lightProbe: { value: [] },

			directionalLights: { value: [], properties: {
				direction: {},
				color: {}
			} },

			directionalLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			directionalShadowMap: { value: [] },
			directionalShadowMatrix: { value: [] },

			spotLights: { value: [], properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			} },

			spotLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			} },

			spotLightMap: { value: [] },
			spotShadowMap: { value: [] },
			spotLightMatrix: { value: [] },

			pointLights: { value: [], properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			} },

			pointLightShadows: { value: [], properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			} },

			pointShadowMap: { value: [] },
			pointShadowMatrix: { value: [] },

			hemisphereLights: { value: [], properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			} },

			// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
			rectAreaLights: { value: [], properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			} },

			ltc_1: { value: null },
			ltc_2: { value: null }

		},

		points: {

			diffuse: { value: /*@__PURE__*/ new Color( 0xffffff ) },
			opacity: { value: 1.0 },
			size: { value: 1.0 },
			scale: { value: 1.0 },
			map: { value: null },
			alphaMap: { value: null },
			alphaMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			alphaTest: { value: 0 },
			uvTransform: { value: /*@__PURE__*/ new Matrix3() }

		},

		sprite: {

			diffuse: { value: /*@__PURE__*/ new Color( 0xffffff ) },
			opacity: { value: 1.0 },
			center: { value: /*@__PURE__*/ new Vector2( 0.5, 0.5 ) },
			rotation: { value: 0.0 },
			map: { value: null },
			mapTransform: { value: /*@__PURE__*/ new Matrix3() },
			alphaMap: { value: null },
			alphaMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			alphaTest: { value: 0 }

		}

	};

	const ShaderLib = {

		basic: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.meshbasic_vert,
			fragmentShader: ShaderChunk.meshbasic_frag

		},

		lambert: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: /*@__PURE__*/ new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshlambert_vert,
			fragmentShader: ShaderChunk.meshlambert_frag

		},

		phong: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.specularmap,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: /*@__PURE__*/ new Color( 0x000000 ) },
					specular: { value: /*@__PURE__*/ new Color( 0x111111 ) },
					shininess: { value: 30 }
				}
			] ),

			vertexShader: ShaderChunk.meshphong_vert,
			fragmentShader: ShaderChunk.meshphong_frag

		},

		standard: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.envmap,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: /*@__PURE__*/ new Color( 0x000000 ) },
					roughness: { value: 1.0 },
					metalness: { value: 0.0 },
					envMapIntensity: { value: 1 } // temporary
				}
			] ),

			vertexShader: ShaderChunk.meshphysical_vert,
			fragmentShader: ShaderChunk.meshphysical_frag

		},

		toon: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.gradientmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive: { value: /*@__PURE__*/ new Color( 0x000000 ) }
				}
			] ),

			vertexShader: ShaderChunk.meshtoon_vert,
			fragmentShader: ShaderChunk.meshtoon_frag

		},

		matcap: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.fog,
				{
					matcap: { value: null }
				}
			] ),

			vertexShader: ShaderChunk.meshmatcap_vert,
			fragmentShader: ShaderChunk.meshmatcap_frag

		},

		points: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.points,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.points_vert,
			fragmentShader: ShaderChunk.points_frag

		},

		dashed: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.fog,
				{
					scale: { value: 1 },
					dashSize: { value: 1 },
					totalSize: { value: 2 }
				}
			] ),

			vertexShader: ShaderChunk.linedashed_vert,
			fragmentShader: ShaderChunk.linedashed_frag

		},

		depth: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap
			] ),

			vertexShader: ShaderChunk.depth_vert,
			fragmentShader: ShaderChunk.depth_frag

		},

		normal: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				{
					opacity: { value: 1.0 }
				}
			] ),

			vertexShader: ShaderChunk.meshnormal_vert,
			fragmentShader: ShaderChunk.meshnormal_frag

		},

		sprite: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.sprite,
				UniformsLib.fog
			] ),

			vertexShader: ShaderChunk.sprite_vert,
			fragmentShader: ShaderChunk.sprite_frag

		},

		background: {

			uniforms: {
				uvTransform: { value: /*@__PURE__*/ new Matrix3() },
				t2D: { value: null },
				backgroundIntensity: { value: 1 }
			},

			vertexShader: ShaderChunk.background_vert,
			fragmentShader: ShaderChunk.background_frag

		},

		backgroundCube: {

			uniforms: {
				envMap: { value: null },
				flipEnvMap: { value: - 1 },
				backgroundBlurriness: { value: 0 },
				backgroundIntensity: { value: 1 }
			},

			vertexShader: ShaderChunk.backgroundCube_vert,
			fragmentShader: ShaderChunk.backgroundCube_frag

		},

		cube: {

			uniforms: {
				tCube: { value: null },
				tFlip: { value: - 1 },
				opacity: { value: 1.0 }
			},

			vertexShader: ShaderChunk.cube_vert,
			fragmentShader: ShaderChunk.cube_frag

		},

		equirect: {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: ShaderChunk.equirect_vert,
			fragmentShader: ShaderChunk.equirect_frag

		},

		distanceRGBA: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.common,
				UniformsLib.displacementmap,
				{
					referencePosition: { value: /*@__PURE__*/ new Vector3() },
					nearDistance: { value: 1 },
					farDistance: { value: 1000 }
				}
			] ),

			vertexShader: ShaderChunk.distanceRGBA_vert,
			fragmentShader: ShaderChunk.distanceRGBA_frag

		},

		shadow: {

			uniforms: /*@__PURE__*/ mergeUniforms( [
				UniformsLib.lights,
				UniformsLib.fog,
				{
					color: { value: /*@__PURE__*/ new Color( 0x00000 ) },
					opacity: { value: 1.0 }
				},
			] ),

			vertexShader: ShaderChunk.shadow_vert,
			fragmentShader: ShaderChunk.shadow_frag

		}

	};

	ShaderLib.physical = {

		uniforms: /*@__PURE__*/ mergeUniforms( [
			ShaderLib.standard.uniforms,
			{
				clearcoat: { value: 0 },
				clearcoatMap: { value: null },
				clearcoatMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				clearcoatNormalMap: { value: null },
				clearcoatNormalMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				clearcoatNormalScale: { value: /*@__PURE__*/ new Vector2( 1, 1 ) },
				clearcoatRoughness: { value: 0 },
				clearcoatRoughnessMap: { value: null },
				clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				iridescence: { value: 0 },
				iridescenceMap: { value: null },
				iridescenceMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				iridescenceIOR: { value: 1.3 },
				iridescenceThicknessMinimum: { value: 100 },
				iridescenceThicknessMaximum: { value: 400 },
				iridescenceThicknessMap: { value: null },
				iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				sheen: { value: 0 },
				sheenColor: { value: /*@__PURE__*/ new Color( 0x000000 ) },
				sheenColorMap: { value: null },
				sheenColorMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				sheenRoughness: { value: 1 },
				sheenRoughnessMap: { value: null },
				sheenRoughnessMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				transmission: { value: 0 },
				transmissionMap: { value: null },
				transmissionMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				transmissionSamplerSize: { value: /*@__PURE__*/ new Vector2() },
				transmissionSamplerMap: { value: null },
				thickness: { value: 0 },
				thicknessMap: { value: null },
				thicknessMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				attenuationDistance: { value: 0 },
				attenuationColor: { value: /*@__PURE__*/ new Color( 0x000000 ) },
				specularColor: { value: /*@__PURE__*/ new Color( 1, 1, 1 ) },
				specularColorMap: { value: null },
				specularColorMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				specularIntensity: { value: 1 },
				specularIntensityMap: { value: null },
				specularIntensityMapTransform: { value: /*@__PURE__*/ new Matrix3() },
				anisotropyVector: { value: /*@__PURE__*/ new Vector2() },
				anisotropyMap: { value: null },
				anisotropyMapTransform: { value: /*@__PURE__*/ new Matrix3() },
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	};

	const _rgb = { r: 0, b: 0, g: 0 };

	function WebGLBackground( renderer, cubemaps, cubeuvmaps, state, objects, alpha, premultipliedAlpha ) {

		const clearColor = new Color( 0x000000 );
		let clearAlpha = alpha === true ? 0 : 1;

		let planeMesh;
		let boxMesh;

		let currentBackground = null;
		let currentBackgroundVersion = 0;
		let currentTonemapping = null;

		function render( renderList, scene ) {

			let forceClear = false;
			let background = scene.isScene === true ? scene.background : null;

			if ( background && background.isTexture ) {

				const usePMREM = scene.backgroundBlurriness > 0; // use PMREM if the user wants to blur the background
				background = ( usePMREM ? cubeuvmaps : cubemaps ).get( background );

			}

			if ( background === null ) {

				setClear( clearColor, clearAlpha );

			} else if ( background && background.isColor ) {

				setClear( background, 1 );
				forceClear = true;

			}

			const environmentBlendMode = renderer.xr.getEnvironmentBlendMode();

			if ( environmentBlendMode === 'additive' ) {

				state.buffers.color.setClear( 0, 0, 0, 1, premultipliedAlpha );

			} else if ( environmentBlendMode === 'alpha-blend' ) {

				state.buffers.color.setClear( 0, 0, 0, 0, premultipliedAlpha );

			}

			if ( renderer.autoClear || forceClear ) {

				renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );

			}

			if ( background && ( background.isCubeTexture || background.mapping === CubeUVReflectionMapping ) ) {

				if ( boxMesh === undefined ) {

					boxMesh = new Mesh(
						new BoxGeometry( 1, 1, 1 ),
						new ShaderMaterial( {
							name: 'BackgroundCubeMaterial',
							uniforms: cloneUniforms( ShaderLib.backgroundCube.uniforms ),
							vertexShader: ShaderLib.backgroundCube.vertexShader,
							fragmentShader: ShaderLib.backgroundCube.fragmentShader,
							side: BackSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					boxMesh.geometry.deleteAttribute( 'normal' );
					boxMesh.geometry.deleteAttribute( 'uv' );

					boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

						this.matrixWorld.copyPosition( camera.matrixWorld );

					};

					// add "envMap" material property so the renderer can evaluate it like for built-in materials
					Object.defineProperty( boxMesh.material, 'envMap', {

						get: function () {

							return this.uniforms.envMap.value;

						}

					} );

					objects.update( boxMesh );

				}

				boxMesh.material.uniforms.envMap.value = background;
				boxMesh.material.uniforms.flipEnvMap.value = ( background.isCubeTexture && background.isRenderTargetTexture === false ) ? - 1 : 1;
				boxMesh.material.uniforms.backgroundBlurriness.value = scene.backgroundBlurriness;
				boxMesh.material.uniforms.backgroundIntensity.value = scene.backgroundIntensity;
				boxMesh.material.toneMapped = ColorManagement.getTransfer( background.colorSpace ) !== SRGBTransfer;

				if ( currentBackground !== background ||
					currentBackgroundVersion !== background.version ||
					currentTonemapping !== renderer.toneMapping ) {

					boxMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = background.version;
					currentTonemapping = renderer.toneMapping;

				}

				boxMesh.layers.enableAll();

				// push to the pre-sorted opaque render list
				renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

			} else if ( background && background.isTexture ) {

				if ( planeMesh === undefined ) {

					planeMesh = new Mesh(
						new PlaneGeometry( 2, 2 ),
						new ShaderMaterial( {
							name: 'BackgroundMaterial',
							uniforms: cloneUniforms( ShaderLib.background.uniforms ),
							vertexShader: ShaderLib.background.vertexShader,
							fragmentShader: ShaderLib.background.fragmentShader,
							side: FrontSide,
							depthTest: false,
							depthWrite: false,
							fog: false
						} )
					);

					planeMesh.geometry.deleteAttribute( 'normal' );

					// add "map" material property so the renderer can evaluate it like for built-in materials
					Object.defineProperty( planeMesh.material, 'map', {

						get: function () {

							return this.uniforms.t2D.value;

						}

					} );

					objects.update( planeMesh );

				}

				planeMesh.material.uniforms.t2D.value = background;
				planeMesh.material.uniforms.backgroundIntensity.value = scene.backgroundIntensity;
				planeMesh.material.toneMapped = ColorManagement.getTransfer( background.colorSpace ) !== SRGBTransfer;

				if ( background.matrixAutoUpdate === true ) {

					background.updateMatrix();

				}

				planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

				if ( currentBackground !== background ||
					currentBackgroundVersion !== background.version ||
					currentTonemapping !== renderer.toneMapping ) {

					planeMesh.material.needsUpdate = true;

					currentBackground = background;
					currentBackgroundVersion = background.version;
					currentTonemapping = renderer.toneMapping;

				}

				planeMesh.layers.enableAll();

				// push to the pre-sorted opaque render list
				renderList.unshift( planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null );

			}

		}

		function setClear( color, alpha ) {

			color.getRGB( _rgb, getUnlitUniformColorSpace( renderer ) );

			state.buffers.color.setClear( _rgb.r, _rgb.g, _rgb.b, alpha, premultipliedAlpha );

		}

		return {

			getClearColor: function () {

				return clearColor;

			},
			setClearColor: function ( color, alpha = 1 ) {

				clearColor.set( color );
				clearAlpha = alpha;
				setClear( clearColor, clearAlpha );

			},
			getClearAlpha: function () {

				return clearAlpha;

			},
			setClearAlpha: function ( alpha ) {

				clearAlpha = alpha;
				setClear( clearColor, clearAlpha );

			},
			render: render

		};

	}

	function WebGLBindingStates( gl, extensions, attributes, capabilities ) {

		const maxVertexAttributes = gl.getParameter( gl.MAX_VERTEX_ATTRIBS );

		const extension = capabilities.isWebGL2 ? null : extensions.get( 'OES_vertex_array_object' );
		const vaoAvailable = capabilities.isWebGL2 || extension !== null;

		const bindingStates = {};

		const defaultState = createBindingState( null );
		let currentState = defaultState;
		let forceUpdate = false;

		function setup( object, material, program, geometry, index ) {

			let updateBuffers = false;

			if ( vaoAvailable ) {

				const state = getBindingState( geometry, program, material );

				if ( currentState !== state ) {

					currentState = state;
					bindVertexArrayObject( currentState.object );

				}

				updateBuffers = needsUpdate( object, geometry, program, index );

				if ( updateBuffers ) saveCache( object, geometry, program, index );

			} else {

				const wireframe = ( material.wireframe === true );

				if ( currentState.geometry !== geometry.id ||
					currentState.program !== program.id ||
					currentState.wireframe !== wireframe ) {

					currentState.geometry = geometry.id;
					currentState.program = program.id;
					currentState.wireframe = wireframe;

					updateBuffers = true;

				}

			}

			if ( index !== null ) {

				attributes.update( index, gl.ELEMENT_ARRAY_BUFFER );

			}

			if ( updateBuffers || forceUpdate ) {

				forceUpdate = false;

				setupVertexAttributes( object, material, program, geometry );

				if ( index !== null ) {

					gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, attributes.get( index ).buffer );

				}

			}

		}

		function createVertexArrayObject() {

			if ( capabilities.isWebGL2 ) return gl.createVertexArray();

			return extension.createVertexArrayOES();

		}

		function bindVertexArrayObject( vao ) {

			if ( capabilities.isWebGL2 ) return gl.bindVertexArray( vao );

			return extension.bindVertexArrayOES( vao );

		}

		function deleteVertexArrayObject( vao ) {

			if ( capabilities.isWebGL2 ) return gl.deleteVertexArray( vao );

			return extension.deleteVertexArrayOES( vao );

		}

		function getBindingState( geometry, program, material ) {

			const wireframe = ( material.wireframe === true );

			let programMap = bindingStates[ geometry.id ];

			if ( programMap === undefined ) {

				programMap = {};
				bindingStates[ geometry.id ] = programMap;

			}

			let stateMap = programMap[ program.id ];

			if ( stateMap === undefined ) {

				stateMap = {};
				programMap[ program.id ] = stateMap;

			}

			let state = stateMap[ wireframe ];

			if ( state === undefined ) {

				state = createBindingState( createVertexArrayObject() );
				stateMap[ wireframe ] = state;

			}

			return state;

		}

		function createBindingState( vao ) {

			const newAttributes = [];
			const enabledAttributes = [];
			const attributeDivisors = [];

			for ( let i = 0; i < maxVertexAttributes; i ++ ) {

				newAttributes[ i ] = 0;
				enabledAttributes[ i ] = 0;
				attributeDivisors[ i ] = 0;

			}

			return {

				// for backward compatibility on non-VAO support browser
				geometry: null,
				program: null,
				wireframe: false,

				newAttributes: newAttributes,
				enabledAttributes: enabledAttributes,
				attributeDivisors: attributeDivisors,
				object: vao,
				attributes: {},
				index: null

			};

		}

		function needsUpdate( object, geometry, program, index ) {

			const cachedAttributes = currentState.attributes;
			const geometryAttributes = geometry.attributes;

			let attributesNum = 0;

			const programAttributes = program.getAttributes();

			for ( const name in programAttributes ) {

				const programAttribute = programAttributes[ name ];

				if ( programAttribute.location >= 0 ) {

					const cachedAttribute = cachedAttributes[ name ];
					let geometryAttribute = geometryAttributes[ name ];

					if ( geometryAttribute === undefined ) {

						if ( name === 'instanceMatrix' && object.instanceMatrix ) geometryAttribute = object.instanceMatrix;
						if ( name === 'instanceColor' && object.instanceColor ) geometryAttribute = object.instanceColor;

					}

					if ( cachedAttribute === undefined ) return true;

					if ( cachedAttribute.attribute !== geometryAttribute ) return true;

					if ( geometryAttribute && cachedAttribute.data !== geometryAttribute.data ) return true;

					attributesNum ++;

				}

			}

			if ( currentState.attributesNum !== attributesNum ) return true;

			if ( currentState.index !== index ) return true;

			return false;

		}

		function saveCache( object, geometry, program, index ) {

			const cache = {};
			const attributes = geometry.attributes;
			let attributesNum = 0;

			const programAttributes = program.getAttributes();

			for ( const name in programAttributes ) {

				const programAttribute = programAttributes[ name ];

				if ( programAttribute.location >= 0 ) {

					let attribute = attributes[ name ];

					if ( attribute === undefined ) {

						if ( name === 'instanceMatrix' && object.instanceMatrix ) attribute = object.instanceMatrix;
						if ( name === 'instanceColor' && object.instanceColor ) attribute = object.instanceColor;

					}

					const data = {};
					data.attribute = attribute;

					if ( attribute && attribute.data ) {

						data.data = attribute.data;

					}

					cache[ name ] = data;

					attributesNum ++;

				}

			}

			currentState.attributes = cache;
			currentState.attributesNum = attributesNum;

			currentState.index = index;

		}

		function initAttributes() {

			const newAttributes = currentState.newAttributes;

			for ( let i = 0, il = newAttributes.length; i < il; i ++ ) {

				newAttributes[ i ] = 0;

			}

		}

		function enableAttribute( attribute ) {

			enableAttributeAndDivisor( attribute, 0 );

		}

		function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

			const newAttributes = currentState.newAttributes;
			const enabledAttributes = currentState.enabledAttributes;
			const attributeDivisors = currentState.attributeDivisors;

			newAttributes[ attribute ] = 1;

			if ( enabledAttributes[ attribute ] === 0 ) {

				gl.enableVertexAttribArray( attribute );
				enabledAttributes[ attribute ] = 1;

			}

			if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

				const extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

				extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
				attributeDivisors[ attribute ] = meshPerAttribute;

			}

		}

		function disableUnusedAttributes() {

			const newAttributes = currentState.newAttributes;
			const enabledAttributes = currentState.enabledAttributes;

			for ( let i = 0, il = enabledAttributes.length; i < il; i ++ ) {

				if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

					gl.disableVertexAttribArray( i );
					enabledAttributes[ i ] = 0;

				}

			}

		}

		function vertexAttribPointer( index, size, type, normalized, stride, offset, integer ) {

			if ( integer === true ) {

				gl.vertexAttribIPointer( index, size, type, stride, offset );

			} else {

				gl.vertexAttribPointer( index, size, type, normalized, stride, offset );

			}

		}

		function setupVertexAttributes( object, material, program, geometry ) {

			if ( capabilities.isWebGL2 === false && ( object.isInstancedMesh || geometry.isInstancedBufferGeometry ) ) {

				if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) return;

			}

			initAttributes();

			const geometryAttributes = geometry.attributes;

			const programAttributes = program.getAttributes();

			const materialDefaultAttributeValues = material.defaultAttributeValues;

			for ( const name in programAttributes ) {

				const programAttribute = programAttributes[ name ];

				if ( programAttribute.location >= 0 ) {

					let geometryAttribute = geometryAttributes[ name ];

					if ( geometryAttribute === undefined ) {

						if ( name === 'instanceMatrix' && object.instanceMatrix ) geometryAttribute = object.instanceMatrix;
						if ( name === 'instanceColor' && object.instanceColor ) geometryAttribute = object.instanceColor;

					}

					if ( geometryAttribute !== undefined ) {

						const normalized = geometryAttribute.normalized;
						const size = geometryAttribute.itemSize;

						const attribute = attributes.get( geometryAttribute );

						// TODO Attribute may not be available on context restore

						if ( attribute === undefined ) continue;

						const buffer = attribute.buffer;
						const type = attribute.type;
						const bytesPerElement = attribute.bytesPerElement;

						// check for integer attributes (WebGL 2 only)

						const integer = ( capabilities.isWebGL2 === true && ( type === gl.INT || type === gl.UNSIGNED_INT || geometryAttribute.gpuType === IntType ) );

						if ( geometryAttribute.isInterleavedBufferAttribute ) {

							const data = geometryAttribute.data;
							const stride = data.stride;
							const offset = geometryAttribute.offset;

							if ( data.isInstancedInterleavedBuffer ) {

								for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

									enableAttributeAndDivisor( programAttribute.location + i, data.meshPerAttribute );

								}

								if ( object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined ) {

									geometry._maxInstanceCount = data.meshPerAttribute * data.count;

								}

							} else {

								for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

									enableAttribute( programAttribute.location + i );

								}

							}

							gl.bindBuffer( gl.ARRAY_BUFFER, buffer );

							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

								vertexAttribPointer(
									programAttribute.location + i,
									size / programAttribute.locationSize,
									type,
									normalized,
									stride * bytesPerElement,
									( offset + ( size / programAttribute.locationSize ) * i ) * bytesPerElement,
									integer
								);

							}

						} else {

							if ( geometryAttribute.isInstancedBufferAttribute ) {

								for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

									enableAttributeAndDivisor( programAttribute.location + i, geometryAttribute.meshPerAttribute );

								}

								if ( object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined ) {

									geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

								}

							} else {

								for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

									enableAttribute( programAttribute.location + i );

								}

							}

							gl.bindBuffer( gl.ARRAY_BUFFER, buffer );

							for ( let i = 0; i < programAttribute.locationSize; i ++ ) {

								vertexAttribPointer(
									programAttribute.location + i,
									size / programAttribute.locationSize,
									type,
									normalized,
									size * bytesPerElement,
									( size / programAttribute.locationSize ) * i * bytesPerElement,
									integer
								);

							}

						}

					} else if ( materialDefaultAttributeValues !== undefined ) {

						const value = materialDefaultAttributeValues[ name ];

						if ( value !== undefined ) {

							switch ( value.length ) {

								case 2:
									gl.vertexAttrib2fv( programAttribute.location, value );
									break;

								case 3:
									gl.vertexAttrib3fv( programAttribute.location, value );
									break;

								case 4:
									gl.vertexAttrib4fv( programAttribute.location, value );
									break;

								default:
									gl.vertexAttrib1fv( programAttribute.location, value );

							}

						}

					}

				}

			}

			disableUnusedAttributes();

		}

		function dispose() {

			reset();

			for ( const geometryId in bindingStates ) {

				const programMap = bindingStates[ geometryId ];

				for ( const programId in programMap ) {

					const stateMap = programMap[ programId ];

					for ( const wireframe in stateMap ) {

						deleteVertexArrayObject( stateMap[ wireframe ].object );

						delete stateMap[ wireframe ];

					}

					delete programMap[ programId ];

				}

				delete bindingStates[ geometryId ];

			}

		}

		function releaseStatesOfGeometry( geometry ) {

			if ( bindingStates[ geometry.id ] === undefined ) return;

			const programMap = bindingStates[ geometry.id ];

			for ( const programId in programMap ) {

				const stateMap = programMap[ programId ];

				for ( const wireframe in stateMap ) {

					deleteVertexArrayObject( stateMap[ wireframe ].object );

					delete stateMap[ wireframe ];

				}

				delete programMap[ programId ];

			}

			delete bindingStates[ geometry.id ];

		}

		function releaseStatesOfProgram( program ) {

			for ( const geometryId in bindingStates ) {

				const programMap = bindingStates[ geometryId ];

				if ( programMap[ program.id ] === undefined ) continue;

				const stateMap = programMap[ program.id ];

				for ( const wireframe in stateMap ) {

					deleteVertexArrayObject( stateMap[ wireframe ].object );

					delete stateMap[ wireframe ];

				}

				delete programMap[ program.id ];

			}

		}

		function reset() {

			resetDefaultState();
			forceUpdate = true;

			if ( currentState === defaultState ) return;

			currentState = defaultState;
			bindVertexArrayObject( currentState.object );

		}

		// for backward-compatibility

		function resetDefaultState() {

			defaultState.geometry = null;
			defaultState.program = null;
			defaultState.wireframe = false;

		}

		return {

			setup: setup,
			reset: reset,
			resetDefaultState: resetDefaultState,
			dispose: dispose,
			releaseStatesOfGeometry: releaseStatesOfGeometry,
			releaseStatesOfProgram: releaseStatesOfProgram,

			initAttributes: initAttributes,
			enableAttribute: enableAttribute,
			disableUnusedAttributes: disableUnusedAttributes

		};

	}

	function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

		const isWebGL2 = capabilities.isWebGL2;

		let mode;

		function setMode( value ) {

			mode = value;

		}

		function render( start, count ) {

			gl.drawArrays( mode, start, count );

			info.update( count, mode, 1 );

		}

		function renderInstances( start, count, primcount ) {

			if ( primcount === 0 ) return;

			let extension, methodName;

			if ( isWebGL2 ) {

				extension = gl;
				methodName = 'drawArraysInstanced';

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );
				methodName = 'drawArraysInstancedANGLE';

				if ( extension === null ) {

					console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ methodName ]( mode, start, count, primcount );

			info.update( count, mode, primcount );

		}

		function renderMultiDraw( starts, counts, drawCount ) {

			if ( drawCount === 0 ) return;

			const extension = extensions.get( 'WEBGL_multi_draw' );
			if ( extension === null ) {

				for ( let i = 0; i < drawCount; i ++ ) {

					this.render( starts[ i ], counts[ i ] );

				}

			} else {

				extension.multiDrawArraysWEBGL( mode, starts, 0, counts, 0, drawCount );

				let elementCount = 0;
				for ( let i = 0; i < drawCount; i ++ ) {

					elementCount += counts[ i ];

				}

				info.update( elementCount, mode, 1 );

			}

		}

		//

		this.setMode = setMode;
		this.render = render;
		this.renderInstances = renderInstances;
		this.renderMultiDraw = renderMultiDraw;

	}

	function WebGLCapabilities( gl, extensions, parameters ) {

		let maxAnisotropy;

		function getMaxAnisotropy() {

			if ( maxAnisotropy !== undefined ) return maxAnisotropy;

			if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

				const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

				maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

			} else {

				maxAnisotropy = 0;

			}

			return maxAnisotropy;

		}

		function getMaxPrecision( precision ) {

			if ( precision === 'highp' ) {

				if ( gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision > 0 &&
					gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision > 0 ) {

					return 'highp';

				}

				precision = 'mediump';

			}

			if ( precision === 'mediump' ) {

				if ( gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision > 0 &&
					gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision > 0 ) {

					return 'mediump';

				}

			}

			return 'lowp';

		}

		const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl.constructor.name === 'WebGL2RenderingContext';

		let precision = parameters.precision !== undefined ? parameters.precision : 'highp';
		const maxPrecision = getMaxPrecision( precision );

		if ( maxPrecision !== precision ) {

			console.warn( 'THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
			precision = maxPrecision;

		}

		const drawBuffers = isWebGL2 || extensions.has( 'WEBGL_draw_buffers' );

		const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

		const maxTextures = gl.getParameter( gl.MAX_TEXTURE_IMAGE_UNITS );
		const maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
		const maxTextureSize = gl.getParameter( gl.MAX_TEXTURE_SIZE );
		const maxCubemapSize = gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );

		const maxAttributes = gl.getParameter( gl.MAX_VERTEX_ATTRIBS );
		const maxVertexUniforms = gl.getParameter( gl.MAX_VERTEX_UNIFORM_VECTORS );
		const maxVaryings = gl.getParameter( gl.MAX_VARYING_VECTORS );
		const maxFragmentUniforms = gl.getParameter( gl.MAX_FRAGMENT_UNIFORM_VECTORS );

		const vertexTextures = maxVertexTextures > 0;
		const floatFragmentTextures = isWebGL2 || extensions.has( 'OES_texture_float' );
		const floatVertexTextures = vertexTextures && floatFragmentTextures;

		const maxSamples = isWebGL2 ? gl.getParameter( gl.MAX_SAMPLES ) : 0;

		return {

			isWebGL2: isWebGL2,

			drawBuffers: drawBuffers,

			getMaxAnisotropy: getMaxAnisotropy,
			getMaxPrecision: getMaxPrecision,

			precision: precision,
			logarithmicDepthBuffer: logarithmicDepthBuffer,

			maxTextures: maxTextures,
			maxVertexTextures: maxVertexTextures,
			maxTextureSize: maxTextureSize,
			maxCubemapSize: maxCubemapSize,

			maxAttributes: maxAttributes,
			maxVertexUniforms: maxVertexUniforms,
			maxVaryings: maxVaryings,
			maxFragmentUniforms: maxFragmentUniforms,

			vertexTextures: vertexTextures,
			floatFragmentTextures: floatFragmentTextures,
			floatVertexTextures: floatVertexTextures,

			maxSamples: maxSamples

		};

	}

	function WebGLClipping( properties ) {

		const scope = this;

		let globalState = null,
			numGlobalPlanes = 0,
			localClippingEnabled = false,
			renderingShadows = false;

		const plane = new Plane(),
			viewNormalMatrix = new Matrix3(),

			uniform = { value: null, needsUpdate: false };

		this.uniform = uniform;
		this.numPlanes = 0;
		this.numIntersection = 0;

		this.init = function ( planes, enableLocalClipping ) {

			const enabled =
				planes.length !== 0 ||
				enableLocalClipping ||
				// enable state of previous frame - the clipping code has to
				// run another frame in order to reset the state:
				numGlobalPlanes !== 0 ||
				localClippingEnabled;

			localClippingEnabled = enableLocalClipping;

			numGlobalPlanes = planes.length;

			return enabled;

		};

		this.beginShadows = function () {

			renderingShadows = true;
			projectPlanes( null );

		};

		this.endShadows = function () {

			renderingShadows = false;

		};

		this.setGlobalState = function ( planes, camera ) {

			globalState = projectPlanes( planes, camera, 0 );

		};

		this.setState = function ( material, camera, useCache ) {

			const planes = material.clippingPlanes,
				clipIntersection = material.clipIntersection,
				clipShadows = material.clipShadows;

			const materialProperties = properties.get( material );

			if ( ! localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && ! clipShadows ) {

				// there's no local clipping

				if ( renderingShadows ) {

					// there's no global clipping

					projectPlanes( null );

				} else {

					resetGlobalState();

				}

			} else {

				const nGlobal = renderingShadows ? 0 : numGlobalPlanes,
					lGlobal = nGlobal * 4;

				let dstArray = materialProperties.clippingState || null;

				uniform.value = dstArray; // ensure unique state

				dstArray = projectPlanes( planes, camera, lGlobal, useCache );

				for ( let i = 0; i !== lGlobal; ++ i ) {

					dstArray[ i ] = globalState[ i ];

				}

				materialProperties.clippingState = dstArray;
				this.numIntersection = clipIntersection ? this.numPlanes : 0;
				this.numPlanes += nGlobal;

			}


		};

		function resetGlobalState() {

			if ( uniform.value !== globalState ) {

				uniform.value = globalState;
				uniform.needsUpdate = numGlobalPlanes > 0;

			}

			scope.numPlanes = numGlobalPlanes;
			scope.numIntersection = 0;

		}

		function projectPlanes( planes, camera, dstOffset, skipTransform ) {

			const nPlanes = planes !== null ? planes.length : 0;
			let dstArray = null;

			if ( nPlanes !== 0 ) {

				dstArray = uniform.value;

				if ( skipTransform !== true || dstArray === null ) {

					const flatSize = dstOffset + nPlanes * 4,
						viewMatrix = camera.matrixWorldInverse;

					viewNormalMatrix.getNormalMatrix( viewMatrix );

					if ( dstArray === null || dstArray.length < flatSize ) {

						dstArray = new Float32Array( flatSize );

					}

					for ( let i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

						plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

						plane.normal.toArray( dstArray, i4 );
						dstArray[ i4 + 3 ] = plane.constant;

					}

				}

				uniform.value = dstArray;
				uniform.needsUpdate = true;

			}

			scope.numPlanes = nPlanes;
			scope.numIntersection = 0;

			return dstArray;

		}

	}

	function WebGLCubeMaps( renderer ) {

		let cubemaps = new WeakMap();

		function mapTextureMapping( texture, mapping ) {

			if ( mapping === EquirectangularReflectionMapping ) {

				texture.mapping = CubeReflectionMapping;

			} else if ( mapping === EquirectangularRefractionMapping ) {

				texture.mapping = CubeRefractionMapping;

			}

			return texture;

		}

		function get( texture ) {

			if ( texture && texture.isTexture ) {

				const mapping = texture.mapping;

				if ( mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping ) {

					if ( cubemaps.has( texture ) ) {

						const cubemap = cubemaps.get( texture ).texture;
						return mapTextureMapping( cubemap, texture.mapping );

					} else {

						const image = texture.image;

						if ( image && image.height > 0 ) {

							const renderTarget = new WebGLCubeRenderTarget( image.height / 2 );
							renderTarget.fromEquirectangularTexture( renderer, texture );
							cubemaps.set( texture, renderTarget );

							texture.addEventListener( 'dispose', onTextureDispose );

							return mapTextureMapping( renderTarget.texture, texture.mapping );

						} else {

							// image not yet ready. try the conversion next frame

							return null;

						}

					}

				}

			}

			return texture;

		}

		function onTextureDispose( event ) {

			const texture = event.target;

			texture.removeEventListener( 'dispose', onTextureDispose );

			const cubemap = cubemaps.get( texture );

			if ( cubemap !== undefined ) {

				cubemaps.delete( texture );
				cubemap.dispose();

			}

		}

		function dispose() {

			cubemaps = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	class OrthographicCamera extends Camera {

		constructor( left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000 ) {

			super();

			this.isOrthographicCamera = true;

			this.type = 'OrthographicCamera';

			this.zoom = 1;
			this.view = null;

			this.left = left;
			this.right = right;
			this.top = top;
			this.bottom = bottom;

			this.near = near;
			this.far = far;

			this.updateProjectionMatrix();

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			this.left = source.left;
			this.right = source.right;
			this.top = source.top;
			this.bottom = source.bottom;
			this.near = source.near;
			this.far = source.far;

			this.zoom = source.zoom;
			this.view = source.view === null ? null : Object.assign( {}, source.view );

			return this;

		}

		setViewOffset( fullWidth, fullHeight, x, y, width, height ) {

			if ( this.view === null ) {

				this.view = {
					enabled: true,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				};

			}

			this.view.enabled = true;
			this.view.fullWidth = fullWidth;
			this.view.fullHeight = fullHeight;
			this.view.offsetX = x;
			this.view.offsetY = y;
			this.view.width = width;
			this.view.height = height;

			this.updateProjectionMatrix();

		}

		clearViewOffset() {

			if ( this.view !== null ) {

				this.view.enabled = false;

			}

			this.updateProjectionMatrix();

		}

		updateProjectionMatrix() {

			const dx = ( this.right - this.left ) / ( 2 * this.zoom );
			const dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
			const cx = ( this.right + this.left ) / 2;
			const cy = ( this.top + this.bottom ) / 2;

			let left = cx - dx;
			let right = cx + dx;
			let top = cy + dy;
			let bottom = cy - dy;

			if ( this.view !== null && this.view.enabled ) {

				const scaleW = ( this.right - this.left ) / this.view.fullWidth / this.zoom;
				const scaleH = ( this.top - this.bottom ) / this.view.fullHeight / this.zoom;

				left += scaleW * this.view.offsetX;
				right = left + scaleW * this.view.width;
				top -= scaleH * this.view.offsetY;
				bottom = top - scaleH * this.view.height;

			}

			this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far, this.coordinateSystem );

			this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			data.object.zoom = this.zoom;
			data.object.left = this.left;
			data.object.right = this.right;
			data.object.top = this.top;
			data.object.bottom = this.bottom;
			data.object.near = this.near;
			data.object.far = this.far;

			if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

			return data;

		}

	}

	const LOD_MIN = 4;

	// The standard deviations (radians) associated with the extra mips. These are
	// chosen to approximate a Trowbridge-Reitz distribution function times the
	// geometric shadowing function. These sigma values squared must match the
	// variance #defines in cube_uv_reflection_fragment.glsl.js.
	const EXTRA_LOD_SIGMA = [ 0.125, 0.215, 0.35, 0.446, 0.526, 0.582 ];

	// The maximum length of the blur for loop. Smaller sigmas will use fewer
	// samples and exit early, but not recompile the shader.
	const MAX_SAMPLES = 20;

	const _flatCamera = /*@__PURE__*/ new OrthographicCamera();
	const _clearColor = /*@__PURE__*/ new Color();
	let _oldTarget = null;
	let _oldActiveCubeFace = 0;
	let _oldActiveMipmapLevel = 0;

	// Golden Ratio
	const PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
	const INV_PHI = 1 / PHI;

	// Vertices of a dodecahedron (except the opposites, which represent the
	// same axis), used as axis directions evenly spread on a sphere.
	const _axisDirections = [
		/*@__PURE__*/ new Vector3( 1, 1, 1 ),
		/*@__PURE__*/ new Vector3( - 1, 1, 1 ),
		/*@__PURE__*/ new Vector3( 1, 1, - 1 ),
		/*@__PURE__*/ new Vector3( - 1, 1, - 1 ),
		/*@__PURE__*/ new Vector3( 0, PHI, INV_PHI ),
		/*@__PURE__*/ new Vector3( 0, PHI, - INV_PHI ),
		/*@__PURE__*/ new Vector3( INV_PHI, 0, PHI ),
		/*@__PURE__*/ new Vector3( - INV_PHI, 0, PHI ),
		/*@__PURE__*/ new Vector3( PHI, INV_PHI, 0 ),
		/*@__PURE__*/ new Vector3( - PHI, INV_PHI, 0 ) ];

	/**
	 * This class generates a Prefiltered, Mipmapped Radiance Environment Map
	 * (PMREM) from a cubeMap environment texture. This allows different levels of
	 * blur to be quickly accessed based on material roughness. It is packed into a
	 * special CubeUV format that allows us to perform custom interpolation so that
	 * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
	 * chain, it only goes down to the LOD_MIN level (above), and then creates extra
	 * even more filtered 'mips' at the same LOD_MIN resolution, associated with
	 * higher roughness levels. In this way we maintain resolution to smoothly
	 * interpolate diffuse lighting while limiting sampling computation.
	 *
	 * Paper: Fast, Accurate Image-Based Lighting
	 * https://drive.google.com/file/d/15y8r_UpKlU9SvV4ILb0C3qCPecS8pvLz/view
	*/

	class PMREMGenerator {

		constructor( renderer ) {

			this._renderer = renderer;
			this._pingPongRenderTarget = null;

			this._lodMax = 0;
			this._cubeSize = 0;
			this._lodPlanes = [];
			this._sizeLods = [];
			this._sigmas = [];

			this._blurMaterial = null;
			this._cubemapMaterial = null;
			this._equirectMaterial = null;

			this._compileMaterial( this._blurMaterial );

		}

		/**
		 * Generates a PMREM from a supplied Scene, which can be faster than using an
		 * image if networking bandwidth is low. Optional sigma specifies a blur radius
		 * in radians to be applied to the scene before PMREM generation. Optional near
		 * and far planes ensure the scene is rendered in its entirety (the cubeCamera
		 * is placed at the origin).
		 */
		fromScene( scene, sigma = 0, near = 0.1, far = 100 ) {

			_oldTarget = this._renderer.getRenderTarget();
			_oldActiveCubeFace = this._renderer.getActiveCubeFace();
			_oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();

			this._setSize( 256 );

			const cubeUVRenderTarget = this._allocateTargets();
			cubeUVRenderTarget.depthBuffer = true;

			this._sceneToCubeUV( scene, near, far, cubeUVRenderTarget );

			if ( sigma > 0 ) {

				this._blur( cubeUVRenderTarget, 0, 0, sigma );

			}

			this._applyPMREM( cubeUVRenderTarget );
			this._cleanup( cubeUVRenderTarget );

			return cubeUVRenderTarget;

		}

		/**
		 * Generates a PMREM from an equirectangular texture, which can be either LDR
		 * or HDR. The ideal input image size is 1k (1024 x 512),
		 * as this matches best with the 256 x 256 cubemap output.
		 */
		fromEquirectangular( equirectangular, renderTarget = null ) {

			return this._fromTexture( equirectangular, renderTarget );

		}

		/**
		 * Generates a PMREM from an cubemap texture, which can be either LDR
		 * or HDR. The ideal input cube size is 256 x 256,
		 * as this matches best with the 256 x 256 cubemap output.
		 */
		fromCubemap( cubemap, renderTarget = null ) {

			return this._fromTexture( cubemap, renderTarget );

		}

		/**
		 * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
		 * your texture's network fetch for increased concurrency.
		 */
		compileCubemapShader() {

			if ( this._cubemapMaterial === null ) {

				this._cubemapMaterial = _getCubemapMaterial();
				this._compileMaterial( this._cubemapMaterial );

			}

		}

		/**
		 * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
		 * your texture's network fetch for increased concurrency.
		 */
		compileEquirectangularShader() {

			if ( this._equirectMaterial === null ) {

				this._equirectMaterial = _getEquirectMaterial();
				this._compileMaterial( this._equirectMaterial );

			}

		}

		/**
		 * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
		 * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
		 * one of them will cause any others to also become unusable.
		 */
		dispose() {

			this._dispose();

			if ( this._cubemapMaterial !== null ) this._cubemapMaterial.dispose();
			if ( this._equirectMaterial !== null ) this._equirectMaterial.dispose();

		}

		// private interface

		_setSize( cubeSize ) {

			this._lodMax = Math.floor( Math.log2( cubeSize ) );
			this._cubeSize = Math.pow( 2, this._lodMax );

		}

		_dispose() {

			if ( this._blurMaterial !== null ) this._blurMaterial.dispose();

			if ( this._pingPongRenderTarget !== null ) this._pingPongRenderTarget.dispose();

			for ( let i = 0; i < this._lodPlanes.length; i ++ ) {

				this._lodPlanes[ i ].dispose();

			}

		}

		_cleanup( outputTarget ) {

			this._renderer.setRenderTarget( _oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel );
			outputTarget.scissorTest = false;
			_setViewport( outputTarget, 0, 0, outputTarget.width, outputTarget.height );

		}

		_fromTexture( texture, renderTarget ) {

			if ( texture.mapping === CubeReflectionMapping || texture.mapping === CubeRefractionMapping ) {

				this._setSize( texture.image.length === 0 ? 16 : ( texture.image[ 0 ].width || texture.image[ 0 ].image.width ) );

			} else { // Equirectangular

				this._setSize( texture.image.width / 4 );

			}

			_oldTarget = this._renderer.getRenderTarget();
			_oldActiveCubeFace = this._renderer.getActiveCubeFace();
			_oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();

			const cubeUVRenderTarget = renderTarget || this._allocateTargets();
			this._textureToCubeUV( texture, cubeUVRenderTarget );
			this._applyPMREM( cubeUVRenderTarget );
			this._cleanup( cubeUVRenderTarget );

			return cubeUVRenderTarget;

		}

		_allocateTargets() {

			const width = 3 * Math.max( this._cubeSize, 16 * 7 );
			const height = 4 * this._cubeSize;

			const params = {
				magFilter: LinearFilter,
				minFilter: LinearFilter,
				generateMipmaps: false,
				type: HalfFloatType,
				format: RGBAFormat,
				colorSpace: LinearSRGBColorSpace,
				depthBuffer: false
			};

			const cubeUVRenderTarget = _createRenderTarget( width, height, params );

			if ( this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== width || this._pingPongRenderTarget.height !== height ) {

				if ( this._pingPongRenderTarget !== null ) {

					this._dispose();

				}

				this._pingPongRenderTarget = _createRenderTarget( width, height, params );

				const { _lodMax } = this;
				( { sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = _createPlanes( _lodMax ) );

				this._blurMaterial = _getBlurShader( _lodMax, width, height );

			}

			return cubeUVRenderTarget;

		}

		_compileMaterial( material ) {

			const tmpMesh = new Mesh( this._lodPlanes[ 0 ], material );
			this._renderer.compile( tmpMesh, _flatCamera );

		}

		_sceneToCubeUV( scene, near, far, cubeUVRenderTarget ) {

			const fov = 90;
			const aspect = 1;
			const cubeCamera = new PerspectiveCamera( fov, aspect, near, far );
			const upSign = [ 1, - 1, 1, 1, 1, 1 ];
			const forwardSign = [ 1, 1, 1, - 1, - 1, - 1 ];
			const renderer = this._renderer;

			const originalAutoClear = renderer.autoClear;
			const toneMapping = renderer.toneMapping;
			renderer.getClearColor( _clearColor );

			renderer.toneMapping = NoToneMapping;
			renderer.autoClear = false;

			const backgroundMaterial = new MeshBasicMaterial( {
				name: 'PMREM.Background',
				side: BackSide,
				depthWrite: false,
				depthTest: false,
			} );

			const backgroundBox = new Mesh( new BoxGeometry(), backgroundMaterial );

			let useSolidColor = false;
			const background = scene.background;

			if ( background ) {

				if ( background.isColor ) {

					backgroundMaterial.color.copy( background );
					scene.background = null;
					useSolidColor = true;

				}

			} else {

				backgroundMaterial.color.copy( _clearColor );
				useSolidColor = true;

			}

			for ( let i = 0; i < 6; i ++ ) {

				const col = i % 3;

				if ( col === 0 ) {

					cubeCamera.up.set( 0, upSign[ i ], 0 );
					cubeCamera.lookAt( forwardSign[ i ], 0, 0 );

				} else if ( col === 1 ) {

					cubeCamera.up.set( 0, 0, upSign[ i ] );
					cubeCamera.lookAt( 0, forwardSign[ i ], 0 );

				} else {

					cubeCamera.up.set( 0, upSign[ i ], 0 );
					cubeCamera.lookAt( 0, 0, forwardSign[ i ] );

				}

				const size = this._cubeSize;

				_setViewport( cubeUVRenderTarget, col * size, i > 2 ? size : 0, size, size );

				renderer.setRenderTarget( cubeUVRenderTarget );

				if ( useSolidColor ) {

					renderer.render( backgroundBox, cubeCamera );

				}

				renderer.render( scene, cubeCamera );

			}

			backgroundBox.geometry.dispose();
			backgroundBox.material.dispose();

			renderer.toneMapping = toneMapping;
			renderer.autoClear = originalAutoClear;
			scene.background = background;

		}

		_textureToCubeUV( texture, cubeUVRenderTarget ) {

			const renderer = this._renderer;

			const isCubeTexture = ( texture.mapping === CubeReflectionMapping || texture.mapping === CubeRefractionMapping );

			if ( isCubeTexture ) {

				if ( this._cubemapMaterial === null ) {

					this._cubemapMaterial = _getCubemapMaterial();

				}

				this._cubemapMaterial.uniforms.flipEnvMap.value = ( texture.isRenderTargetTexture === false ) ? - 1 : 1;

			} else {

				if ( this._equirectMaterial === null ) {

					this._equirectMaterial = _getEquirectMaterial();

				}

			}

			const material = isCubeTexture ? this._cubemapMaterial : this._equirectMaterial;
			const mesh = new Mesh( this._lodPlanes[ 0 ], material );

			const uniforms = material.uniforms;

			uniforms[ 'envMap' ].value = texture;

			const size = this._cubeSize;

			_setViewport( cubeUVRenderTarget, 0, 0, 3 * size, 2 * size );

			renderer.setRenderTarget( cubeUVRenderTarget );
			renderer.render( mesh, _flatCamera );

		}

		_applyPMREM( cubeUVRenderTarget ) {

			const renderer = this._renderer;
			const autoClear = renderer.autoClear;
			renderer.autoClear = false;

			for ( let i = 1; i < this._lodPlanes.length; i ++ ) {

				const sigma = Math.sqrt( this._sigmas[ i ] * this._sigmas[ i ] - this._sigmas[ i - 1 ] * this._sigmas[ i - 1 ] );

				const poleAxis = _axisDirections[ ( i - 1 ) % _axisDirections.length ];

				this._blur( cubeUVRenderTarget, i - 1, i, sigma, poleAxis );

			}

			renderer.autoClear = autoClear;

		}

		/**
		 * This is a two-pass Gaussian blur for a cubemap. Normally this is done
		 * vertically and horizontally, but this breaks down on a cube. Here we apply
		 * the blur latitudinally (around the poles), and then longitudinally (towards
		 * the poles) to approximate the orthogonally-separable blur. It is least
		 * accurate at the poles, but still does a decent job.
		 */
		_blur( cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis ) {

			const pingPongRenderTarget = this._pingPongRenderTarget;

			this._halfBlur(
				cubeUVRenderTarget,
				pingPongRenderTarget,
				lodIn,
				lodOut,
				sigma,
				'latitudinal',
				poleAxis );

			this._halfBlur(
				pingPongRenderTarget,
				cubeUVRenderTarget,
				lodOut,
				lodOut,
				sigma,
				'longitudinal',
				poleAxis );

		}

		_halfBlur( targetIn, targetOut, lodIn, lodOut, sigmaRadians, direction, poleAxis ) {

			const renderer = this._renderer;
			const blurMaterial = this._blurMaterial;

			if ( direction !== 'latitudinal' && direction !== 'longitudinal' ) {

				console.error(
					'blur direction must be either latitudinal or longitudinal!' );

			}

			// Number of standard deviations at which to cut off the discrete approximation.
			const STANDARD_DEVIATIONS = 3;

			const blurMesh = new Mesh( this._lodPlanes[ lodOut ], blurMaterial );
			const blurUniforms = blurMaterial.uniforms;

			const pixels = this._sizeLods[ lodIn ] - 1;
			const radiansPerPixel = isFinite( sigmaRadians ) ? Math.PI / ( 2 * pixels ) : 2 * Math.PI / ( 2 * MAX_SAMPLES - 1 );
			const sigmaPixels = sigmaRadians / radiansPerPixel;
			const samples = isFinite( sigmaRadians ) ? 1 + Math.floor( STANDARD_DEVIATIONS * sigmaPixels ) : MAX_SAMPLES;

			if ( samples > MAX_SAMPLES ) {

				console.warn( `sigmaRadians, ${
				sigmaRadians}, is too large and will clip, as it requested ${
				samples} samples when the maximum is set to ${MAX_SAMPLES}` );

			}

			const weights = [];
			let sum = 0;

			for ( let i = 0; i < MAX_SAMPLES; ++ i ) {

				const x = i / sigmaPixels;
				const weight = Math.exp( - x * x / 2 );
				weights.push( weight );

				if ( i === 0 ) {

					sum += weight;

				} else if ( i < samples ) {

					sum += 2 * weight;

				}

			}

			for ( let i = 0; i < weights.length; i ++ ) {

				weights[ i ] = weights[ i ] / sum;

			}

			blurUniforms[ 'envMap' ].value = targetIn.texture;
			blurUniforms[ 'samples' ].value = samples;
			blurUniforms[ 'weights' ].value = weights;
			blurUniforms[ 'latitudinal' ].value = direction === 'latitudinal';

			if ( poleAxis ) {

				blurUniforms[ 'poleAxis' ].value = poleAxis;

			}

			const { _lodMax } = this;
			blurUniforms[ 'dTheta' ].value = radiansPerPixel;
			blurUniforms[ 'mipInt' ].value = _lodMax - lodIn;

			const outputSize = this._sizeLods[ lodOut ];
			const x = 3 * outputSize * ( lodOut > _lodMax - LOD_MIN ? lodOut - _lodMax + LOD_MIN : 0 );
			const y = 4 * ( this._cubeSize - outputSize );

			_setViewport( targetOut, x, y, 3 * outputSize, 2 * outputSize );
			renderer.setRenderTarget( targetOut );
			renderer.render( blurMesh, _flatCamera );

		}

	}



	function _createPlanes( lodMax ) {

		const lodPlanes = [];
		const sizeLods = [];
		const sigmas = [];

		let lod = lodMax;

		const totalLods = lodMax - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;

		for ( let i = 0; i < totalLods; i ++ ) {

			const sizeLod = Math.pow( 2, lod );
			sizeLods.push( sizeLod );
			let sigma = 1.0 / sizeLod;

			if ( i > lodMax - LOD_MIN ) {

				sigma = EXTRA_LOD_SIGMA[ i - lodMax + LOD_MIN - 1 ];

			} else if ( i === 0 ) {

				sigma = 0;

			}

			sigmas.push( sigma );

			const texelSize = 1.0 / ( sizeLod - 2 );
			const min = - texelSize;
			const max = 1 + texelSize;
			const uv1 = [ min, min, max, min, max, max, min, min, max, max, min, max ];

			const cubeFaces = 6;
			const vertices = 6;
			const positionSize = 3;
			const uvSize = 2;
			const faceIndexSize = 1;

			const position = new Float32Array( positionSize * vertices * cubeFaces );
			const uv = new Float32Array( uvSize * vertices * cubeFaces );
			const faceIndex = new Float32Array( faceIndexSize * vertices * cubeFaces );

			for ( let face = 0; face < cubeFaces; face ++ ) {

				const x = ( face % 3 ) * 2 / 3 - 1;
				const y = face > 2 ? 0 : - 1;
				const coordinates = [
					x, y, 0,
					x + 2 / 3, y, 0,
					x + 2 / 3, y + 1, 0,
					x, y, 0,
					x + 2 / 3, y + 1, 0,
					x, y + 1, 0
				];
				position.set( coordinates, positionSize * vertices * face );
				uv.set( uv1, uvSize * vertices * face );
				const fill = [ face, face, face, face, face, face ];
				faceIndex.set( fill, faceIndexSize * vertices * face );

			}

			const planes = new BufferGeometry();
			planes.setAttribute( 'position', new BufferAttribute( position, positionSize ) );
			planes.setAttribute( 'uv', new BufferAttribute( uv, uvSize ) );
			planes.setAttribute( 'faceIndex', new BufferAttribute( faceIndex, faceIndexSize ) );
			lodPlanes.push( planes );

			if ( lod > LOD_MIN ) {

				lod --;

			}

		}

		return { lodPlanes, sizeLods, sigmas };

	}

	function _createRenderTarget( width, height, params ) {

		const cubeUVRenderTarget = new WebGLRenderTarget( width, height, params );
		cubeUVRenderTarget.texture.mapping = CubeUVReflectionMapping;
		cubeUVRenderTarget.texture.name = 'PMREM.cubeUv';
		cubeUVRenderTarget.scissorTest = true;
		return cubeUVRenderTarget;

	}

	function _setViewport( target, x, y, width, height ) {

		target.viewport.set( x, y, width, height );
		target.scissor.set( x, y, width, height );

	}

	function _getBlurShader( lodMax, width, height ) {

		const weights = new Float32Array( MAX_SAMPLES );
		const poleAxis = new Vector3( 0, 1, 0 );
		const shaderMaterial = new ShaderMaterial( {

			name: 'SphericalGaussianBlur',

			defines: {
				'n': MAX_SAMPLES,
				'CUBEUV_TEXEL_WIDTH': 1.0 / width,
				'CUBEUV_TEXEL_HEIGHT': 1.0 / height,
				'CUBEUV_MAX_MIP': `${lodMax}.0`,
			},

			uniforms: {
				'envMap': { value: null },
				'samples': { value: 1 },
				'weights': { value: weights },
				'latitudinal': { value: false },
				'dTheta': { value: 0 },
				'mipInt': { value: 0 },
				'poleAxis': { value: poleAxis }
			},

			vertexShader: _getCommonVertexShader(),

			fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,

			blending: NoBlending,
			depthTest: false,
			depthWrite: false

		} );

		return shaderMaterial;

	}

	function _getEquirectMaterial() {

		return new ShaderMaterial( {

			name: 'EquirectangularToCubeUV',

			uniforms: {
				'envMap': { value: null }
			},

			vertexShader: _getCommonVertexShader(),

			fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,

			blending: NoBlending,
			depthTest: false,
			depthWrite: false

		} );

	}

	function _getCubemapMaterial() {

		return new ShaderMaterial( {

			name: 'CubemapToCubeUV',

			uniforms: {
				'envMap': { value: null },
				'flipEnvMap': { value: - 1 }
			},

			vertexShader: _getCommonVertexShader(),

			fragmentShader: /* glsl */`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,

			blending: NoBlending,
			depthTest: false,
			depthWrite: false

		} );

	}

	function _getCommonVertexShader() {

		return /* glsl */`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;

	}

	function WebGLCubeUVMaps( renderer ) {

		let cubeUVmaps = new WeakMap();

		let pmremGenerator = null;

		function get( texture ) {

			if ( texture && texture.isTexture ) {

				const mapping = texture.mapping;

				const isEquirectMap = ( mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping );
				const isCubeMap = ( mapping === CubeReflectionMapping || mapping === CubeRefractionMapping );

				// equirect/cube map to cubeUV conversion

				if ( isEquirectMap || isCubeMap ) {

					if ( texture.isRenderTargetTexture && texture.needsPMREMUpdate === true ) {

						texture.needsPMREMUpdate = false;

						let renderTarget = cubeUVmaps.get( texture );

						if ( pmremGenerator === null ) pmremGenerator = new PMREMGenerator( renderer );

						renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular( texture, renderTarget ) : pmremGenerator.fromCubemap( texture, renderTarget );
						cubeUVmaps.set( texture, renderTarget );

						return renderTarget.texture;

					} else {

						if ( cubeUVmaps.has( texture ) ) {

							return cubeUVmaps.get( texture ).texture;

						} else {

							const image = texture.image;

							if ( ( isEquirectMap && image && image.height > 0 ) || ( isCubeMap && image && isCubeTextureComplete( image ) ) ) {

								if ( pmremGenerator === null ) pmremGenerator = new PMREMGenerator( renderer );

								const renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular( texture ) : pmremGenerator.fromCubemap( texture );
								cubeUVmaps.set( texture, renderTarget );

								texture.addEventListener( 'dispose', onTextureDispose );

								return renderTarget.texture;

							} else {

								// image not yet ready. try the conversion next frame

								return null;

							}

						}

					}

				}

			}

			return texture;

		}

		function isCubeTextureComplete( image ) {

			let count = 0;
			const length = 6;

			for ( let i = 0; i < length; i ++ ) {

				if ( image[ i ] !== undefined ) count ++;

			}

			return count === length;


		}

		function onTextureDispose( event ) {

			const texture = event.target;

			texture.removeEventListener( 'dispose', onTextureDispose );

			const cubemapUV = cubeUVmaps.get( texture );

			if ( cubemapUV !== undefined ) {

				cubeUVmaps.delete( texture );
				cubemapUV.dispose();

			}

		}

		function dispose() {

			cubeUVmaps = new WeakMap();

			if ( pmremGenerator !== null ) {

				pmremGenerator.dispose();
				pmremGenerator = null;

			}

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	function WebGLExtensions( gl ) {

		const extensions = {};

		function getExtension( name ) {

			if ( extensions[ name ] !== undefined ) {

				return extensions[ name ];

			}

			let extension;

			switch ( name ) {

				case 'WEBGL_depth_texture':
					extension = gl.getExtension( 'WEBGL_depth_texture' ) || gl.getExtension( 'MOZ_WEBGL_depth_texture' ) || gl.getExtension( 'WEBKIT_WEBGL_depth_texture' );
					break;

				case 'EXT_texture_filter_anisotropic':
					extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
					break;

				case 'WEBGL_compressed_texture_s3tc':
					extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
					break;

				case 'WEBGL_compressed_texture_pvrtc':
					extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
					break;

				default:
					extension = gl.getExtension( name );

			}

			extensions[ name ] = extension;

			return extension;

		}

		return {

			has: function ( name ) {

				return getExtension( name ) !== null;

			},

			init: function ( capabilities ) {

				if ( capabilities.isWebGL2 ) {

					getExtension( 'EXT_color_buffer_float' );
					getExtension( 'WEBGL_clip_cull_distance' );

				} else {

					getExtension( 'WEBGL_depth_texture' );
					getExtension( 'OES_texture_float' );
					getExtension( 'OES_texture_half_float' );
					getExtension( 'OES_texture_half_float_linear' );
					getExtension( 'OES_standard_derivatives' );
					getExtension( 'OES_element_index_uint' );
					getExtension( 'OES_vertex_array_object' );
					getExtension( 'ANGLE_instanced_arrays' );

				}

				getExtension( 'OES_texture_float_linear' );
				getExtension( 'EXT_color_buffer_half_float' );
				getExtension( 'WEBGL_multisampled_render_to_texture' );

			},

			get: function ( name ) {

				const extension = getExtension( name );

				if ( extension === null ) {

					console.warn( 'THREE.WebGLRenderer: ' + name + ' extension not supported.' );

				}

				return extension;

			}

		};

	}

	function WebGLGeometries( gl, attributes, info, bindingStates ) {

		const geometries = {};
		const wireframeAttributes = new WeakMap();

		function onGeometryDispose( event ) {

			const geometry = event.target;

			if ( geometry.index !== null ) {

				attributes.remove( geometry.index );

			}

			for ( const name in geometry.attributes ) {

				attributes.remove( geometry.attributes[ name ] );

			}

			for ( const name in geometry.morphAttributes ) {

				const array = geometry.morphAttributes[ name ];

				for ( let i = 0, l = array.length; i < l; i ++ ) {

					attributes.remove( array[ i ] );

				}

			}

			geometry.removeEventListener( 'dispose', onGeometryDispose );

			delete geometries[ geometry.id ];

			const attribute = wireframeAttributes.get( geometry );

			if ( attribute ) {

				attributes.remove( attribute );
				wireframeAttributes.delete( geometry );

			}

			bindingStates.releaseStatesOfGeometry( geometry );

			if ( geometry.isInstancedBufferGeometry === true ) {

				delete geometry._maxInstanceCount;

			}

			//

			info.memory.geometries --;

		}

		function get( object, geometry ) {

			if ( geometries[ geometry.id ] === true ) return geometry;

			geometry.addEventListener( 'dispose', onGeometryDispose );

			geometries[ geometry.id ] = true;

			info.memory.geometries ++;

			return geometry;

		}

		function update( geometry ) {

			const geometryAttributes = geometry.attributes;

			// Updating index buffer in VAO now. See WebGLBindingStates.

			for ( const name in geometryAttributes ) {

				attributes.update( geometryAttributes[ name ], gl.ARRAY_BUFFER );

			}

			// morph targets

			const morphAttributes = geometry.morphAttributes;

			for ( const name in morphAttributes ) {

				const array = morphAttributes[ name ];

				for ( let i = 0, l = array.length; i < l; i ++ ) {

					attributes.update( array[ i ], gl.ARRAY_BUFFER );

				}

			}

		}

		function updateWireframeAttribute( geometry ) {

			const indices = [];

			const geometryIndex = geometry.index;
			const geometryPosition = geometry.attributes.position;
			let version = 0;

			if ( geometryIndex !== null ) {

				const array = geometryIndex.array;
				version = geometryIndex.version;

				for ( let i = 0, l = array.length; i < l; i += 3 ) {

					const a = array[ i + 0 ];
					const b = array[ i + 1 ];
					const c = array[ i + 2 ];

					indices.push( a, b, b, c, c, a );

				}

			} else if ( geometryPosition !== undefined ) {

				const array = geometryPosition.array;
				version = geometryPosition.version;

				for ( let i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

					const a = i + 0;
					const b = i + 1;
					const c = i + 2;

					indices.push( a, b, b, c, c, a );

				}

			} else {

				return;

			}

			const attribute = new ( arrayNeedsUint32( indices ) ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );
			attribute.version = version;

			// Updating index buffer in VAO now. See WebGLBindingStates

			//

			const previousAttribute = wireframeAttributes.get( geometry );

			if ( previousAttribute ) attributes.remove( previousAttribute );

			//

			wireframeAttributes.set( geometry, attribute );

		}

		function getWireframeAttribute( geometry ) {

			const currentAttribute = wireframeAttributes.get( geometry );

			if ( currentAttribute ) {

				const geometryIndex = geometry.index;

				if ( geometryIndex !== null ) {

					// if the attribute is obsolete, create a new one

					if ( currentAttribute.version < geometryIndex.version ) {

						updateWireframeAttribute( geometry );

					}

				}

			} else {

				updateWireframeAttribute( geometry );

			}

			return wireframeAttributes.get( geometry );

		}

		return {

			get: get,
			update: update,

			getWireframeAttribute: getWireframeAttribute

		};

	}

	function WebGLIndexedBufferRenderer( gl, extensions, info, capabilities ) {

		const isWebGL2 = capabilities.isWebGL2;

		let mode;

		function setMode( value ) {

			mode = value;

		}

		let type, bytesPerElement;

		function setIndex( value ) {

			type = value.type;
			bytesPerElement = value.bytesPerElement;

		}

		function render( start, count ) {

			gl.drawElements( mode, count, type, start * bytesPerElement );

			info.update( count, mode, 1 );

		}

		function renderInstances( start, count, primcount ) {

			if ( primcount === 0 ) return;

			let extension, methodName;

			if ( isWebGL2 ) {

				extension = gl;
				methodName = 'drawElementsInstanced';

			} else {

				extension = extensions.get( 'ANGLE_instanced_arrays' );
				methodName = 'drawElementsInstancedANGLE';

				if ( extension === null ) {

					console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
					return;

				}

			}

			extension[ methodName ]( mode, count, type, start * bytesPerElement, primcount );

			info.update( count, mode, primcount );

		}

		function renderMultiDraw( starts, counts, drawCount ) {

			if ( drawCount === 0 ) return;

			const extension = extensions.get( 'WEBGL_multi_draw' );
			if ( extension === null ) {

				for ( let i = 0; i < drawCount; i ++ ) {

					this.render( starts[ i ] / bytesPerElement, counts[ i ] );

				}

			} else {

				extension.multiDrawElementsWEBGL( mode, counts, 0, type, starts, 0, drawCount );

				let elementCount = 0;
				for ( let i = 0; i < drawCount; i ++ ) {

					elementCount += counts[ i ];

				}

				info.update( elementCount, mode, 1 );

			}

		}

		//

		this.setMode = setMode;
		this.setIndex = setIndex;
		this.render = render;
		this.renderInstances = renderInstances;
		this.renderMultiDraw = renderMultiDraw;

	}

	function WebGLInfo( gl ) {

		const memory = {
			geometries: 0,
			textures: 0
		};

		const render = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};

		function update( count, mode, instanceCount ) {

			render.calls ++;

			switch ( mode ) {

				case gl.TRIANGLES:
					render.triangles += instanceCount * ( count / 3 );
					break;

				case gl.LINES:
					render.lines += instanceCount * ( count / 2 );
					break;

				case gl.LINE_STRIP:
					render.lines += instanceCount * ( count - 1 );
					break;

				case gl.LINE_LOOP:
					render.lines += instanceCount * count;
					break;

				case gl.POINTS:
					render.points += instanceCount * count;
					break;

				default:
					console.error( 'THREE.WebGLInfo: Unknown draw mode:', mode );
					break;

			}

		}

		function reset() {

			render.calls = 0;
			render.triangles = 0;
			render.points = 0;
			render.lines = 0;

		}

		return {
			memory: memory,
			render: render,
			programs: null,
			autoReset: true,
			reset: reset,
			update: update
		};

	}

	function numericalSort( a, b ) {

		return a[ 0 ] - b[ 0 ];

	}

	function absNumericalSort( a, b ) {

		return Math.abs( b[ 1 ] ) - Math.abs( a[ 1 ] );

	}

	function WebGLMorphtargets( gl, capabilities, textures ) {

		const influencesList = {};
		const morphInfluences = new Float32Array( 8 );
		const morphTextures = new WeakMap();
		const morph = new Vector4();

		const workInfluences = [];

		for ( let i = 0; i < 8; i ++ ) {

			workInfluences[ i ] = [ i, 0 ];

		}

		function update( object, geometry, program ) {

			const objectInfluences = object.morphTargetInfluences;

			if ( capabilities.isWebGL2 === true ) {

				// instead of using attributes, the WebGL 2 code path encodes morph targets
				// into an array of data textures. Each layer represents a single morph target.

				const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
				const morphTargetsCount = ( morphAttribute !== undefined ) ? morphAttribute.length : 0;

				let entry = morphTextures.get( geometry );

				if ( entry === undefined || entry.count !== morphTargetsCount ) {

					if ( entry !== undefined ) entry.texture.dispose();

					const hasMorphPosition = geometry.morphAttributes.position !== undefined;
					const hasMorphNormals = geometry.morphAttributes.normal !== undefined;
					const hasMorphColors = geometry.morphAttributes.color !== undefined;

					const morphTargets = geometry.morphAttributes.position || [];
					const morphNormals = geometry.morphAttributes.normal || [];
					const morphColors = geometry.morphAttributes.color || [];

					let vertexDataCount = 0;

					if ( hasMorphPosition === true ) vertexDataCount = 1;
					if ( hasMorphNormals === true ) vertexDataCount = 2;
					if ( hasMorphColors === true ) vertexDataCount = 3;

					let width = geometry.attributes.position.count * vertexDataCount;
					let height = 1;

					if ( width > capabilities.maxTextureSize ) {

						height = Math.ceil( width / capabilities.maxTextureSize );
						width = capabilities.maxTextureSize;

					}

					const buffer = new Float32Array( width * height * 4 * morphTargetsCount );

					const texture = new DataArrayTexture( buffer, width, height, morphTargetsCount );
					texture.type = FloatType;
					texture.needsUpdate = true;

					// fill buffer

					const vertexDataStride = vertexDataCount * 4;

					for ( let i = 0; i < morphTargetsCount; i ++ ) {

						const morphTarget = morphTargets[ i ];
						const morphNormal = morphNormals[ i ];
						const morphColor = morphColors[ i ];

						const offset = width * height * 4 * i;

						for ( let j = 0; j < morphTarget.count; j ++ ) {

							const stride = j * vertexDataStride;

							if ( hasMorphPosition === true ) {

								morph.fromBufferAttribute( morphTarget, j );

								buffer[ offset + stride + 0 ] = morph.x;
								buffer[ offset + stride + 1 ] = morph.y;
								buffer[ offset + stride + 2 ] = morph.z;
								buffer[ offset + stride + 3 ] = 0;

							}

							if ( hasMorphNormals === true ) {

								morph.fromBufferAttribute( morphNormal, j );

								buffer[ offset + stride + 4 ] = morph.x;
								buffer[ offset + stride + 5 ] = morph.y;
								buffer[ offset + stride + 6 ] = morph.z;
								buffer[ offset + stride + 7 ] = 0;

							}

							if ( hasMorphColors === true ) {

								morph.fromBufferAttribute( morphColor, j );

								buffer[ offset + stride + 8 ] = morph.x;
								buffer[ offset + stride + 9 ] = morph.y;
								buffer[ offset + stride + 10 ] = morph.z;
								buffer[ offset + stride + 11 ] = ( morphColor.itemSize === 4 ) ? morph.w : 1;

							}

						}

					}

					entry = {
						count: morphTargetsCount,
						texture: texture,
						size: new Vector2( width, height )
					};

					morphTextures.set( geometry, entry );

					function disposeTexture() {

						texture.dispose();

						morphTextures.delete( geometry );

						geometry.removeEventListener( 'dispose', disposeTexture );

					}

					geometry.addEventListener( 'dispose', disposeTexture );

				}

				//

				let morphInfluencesSum = 0;

				for ( let i = 0; i < objectInfluences.length; i ++ ) {

					morphInfluencesSum += objectInfluences[ i ];

				}

				const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;

				program.getUniforms().setValue( gl, 'morphTargetBaseInfluence', morphBaseInfluence );
				program.getUniforms().setValue( gl, 'morphTargetInfluences', objectInfluences );

				program.getUniforms().setValue( gl, 'morphTargetsTexture', entry.texture, textures );
				program.getUniforms().setValue( gl, 'morphTargetsTextureSize', entry.size );


			} else {

				// When object doesn't have morph target influences defined, we treat it as a 0-length array
				// This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences

				const length = objectInfluences === undefined ? 0 : objectInfluences.length;

				let influences = influencesList[ geometry.id ];

				if ( influences === undefined || influences.length !== length ) {

					// initialise list

					influences = [];

					for ( let i = 0; i < length; i ++ ) {

						influences[ i ] = [ i, 0 ];

					}

					influencesList[ geometry.id ] = influences;

				}

				// Collect influences

				for ( let i = 0; i < length; i ++ ) {

					const influence = influences[ i ];

					influence[ 0 ] = i;
					influence[ 1 ] = objectInfluences[ i ];

				}

				influences.sort( absNumericalSort );

				for ( let i = 0; i < 8; i ++ ) {

					if ( i < length && influences[ i ][ 1 ] ) {

						workInfluences[ i ][ 0 ] = influences[ i ][ 0 ];
						workInfluences[ i ][ 1 ] = influences[ i ][ 1 ];

					} else {

						workInfluences[ i ][ 0 ] = Number.MAX_SAFE_INTEGER;
						workInfluences[ i ][ 1 ] = 0;

					}

				}

				workInfluences.sort( numericalSort );

				const morphTargets = geometry.morphAttributes.position;
				const morphNormals = geometry.morphAttributes.normal;

				let morphInfluencesSum = 0;

				for ( let i = 0; i < 8; i ++ ) {

					const influence = workInfluences[ i ];
					const index = influence[ 0 ];
					const value = influence[ 1 ];

					if ( index !== Number.MAX_SAFE_INTEGER && value ) {

						if ( morphTargets && geometry.getAttribute( 'morphTarget' + i ) !== morphTargets[ index ] ) {

							geometry.setAttribute( 'morphTarget' + i, morphTargets[ index ] );

						}

						if ( morphNormals && geometry.getAttribute( 'morphNormal' + i ) !== morphNormals[ index ] ) {

							geometry.setAttribute( 'morphNormal' + i, morphNormals[ index ] );

						}

						morphInfluences[ i ] = value;
						morphInfluencesSum += value;

					} else {

						if ( morphTargets && geometry.hasAttribute( 'morphTarget' + i ) === true ) {

							geometry.deleteAttribute( 'morphTarget' + i );

						}

						if ( morphNormals && geometry.hasAttribute( 'morphNormal' + i ) === true ) {

							geometry.deleteAttribute( 'morphNormal' + i );

						}

						morphInfluences[ i ] = 0;

					}

				}

				// GLSL shader uses formula baseinfluence * base + sum(target * influence)
				// This allows us to switch between absolute morphs and relative morphs without changing shader code
				// When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
				const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;

				program.getUniforms().setValue( gl, 'morphTargetBaseInfluence', morphBaseInfluence );
				program.getUniforms().setValue( gl, 'morphTargetInfluences', morphInfluences );

			}

		}

		return {

			update: update

		};

	}

	function WebGLObjects( gl, geometries, attributes, info ) {

		let updateMap = new WeakMap();

		function update( object ) {

			const frame = info.render.frame;

			const geometry = object.geometry;
			const buffergeometry = geometries.get( object, geometry );

			// Update once per frame

			if ( updateMap.get( buffergeometry ) !== frame ) {

				geometries.update( buffergeometry );

				updateMap.set( buffergeometry, frame );

			}

			if ( object.isInstancedMesh ) {

				if ( object.hasEventListener( 'dispose', onInstancedMeshDispose ) === false ) {

					object.addEventListener( 'dispose', onInstancedMeshDispose );

				}

				if ( updateMap.get( object ) !== frame ) {

					attributes.update( object.instanceMatrix, gl.ARRAY_BUFFER );

					if ( object.instanceColor !== null ) {

						attributes.update( object.instanceColor, gl.ARRAY_BUFFER );

					}

					updateMap.set( object, frame );

				}

			}

			if ( object.isSkinnedMesh ) {

				const skeleton = object.skeleton;

				if ( updateMap.get( skeleton ) !== frame ) {

					skeleton.update();

					updateMap.set( skeleton, frame );

				}

			}

			return buffergeometry;

		}

		function dispose() {

			updateMap = new WeakMap();

		}

		function onInstancedMeshDispose( event ) {

			const instancedMesh = event.target;

			instancedMesh.removeEventListener( 'dispose', onInstancedMeshDispose );

			attributes.remove( instancedMesh.instanceMatrix );

			if ( instancedMesh.instanceColor !== null ) attributes.remove( instancedMesh.instanceColor );

		}

		return {

			update: update,
			dispose: dispose

		};

	}

	class DepthTexture extends Texture {

		constructor( width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format ) {

			format = format !== undefined ? format : DepthFormat;

			if ( format !== DepthFormat && format !== DepthStencilFormat ) {

				throw new Error( 'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat' );

			}

			if ( type === undefined && format === DepthFormat ) type = UnsignedIntType;
			if ( type === undefined && format === DepthStencilFormat ) type = UnsignedInt248Type;

			super( null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

			this.isDepthTexture = true;

			this.image = { width: width, height: height };

			this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
			this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

			this.flipY = false;
			this.generateMipmaps = false;

			this.compareFunction = null;

		}


		copy( source ) {

			super.copy( source );

			this.compareFunction = source.compareFunction;

			return this;

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			if ( this.compareFunction !== null ) data.compareFunction = this.compareFunction;

			return data;

		}

	}

	/**
	 * Uniforms of a program.
	 * Those form a tree structure with a special top-level container for the root,
	 * which you get by calling 'new WebGLUniforms( gl, program )'.
	 *
	 *
	 * Properties of inner nodes including the top-level container:
	 *
	 * .seq - array of nested uniforms
	 * .map - nested uniforms by name
	 *
	 *
	 * Methods of all nodes except the top-level container:
	 *
	 * .setValue( gl, value, [textures] )
	 *
	 * 		uploads a uniform value(s)
	 *  	the 'textures' parameter is needed for sampler uniforms
	 *
	 *
	 * Static methods of the top-level container (textures factorizations):
	 *
	 * .upload( gl, seq, values, textures )
	 *
	 * 		sets uniforms in 'seq' to 'values[id].value'
	 *
	 * .seqWithValue( seq, values ) : filteredSeq
	 *
	 * 		filters 'seq' entries with corresponding entry in values
	 *
	 *
	 * Methods of the top-level container (textures factorizations):
	 *
	 * .setValue( gl, name, value, textures )
	 *
	 * 		sets uniform with  name 'name' to 'value'
	 *
	 * .setOptional( gl, obj, prop )
	 *
	 * 		like .set for an optional property of the object
	 *
	 */


	const emptyTexture = /*@__PURE__*/ new Texture();

	const emptyShadowTexture = /*@__PURE__*/ new DepthTexture( 1, 1 );
	emptyShadowTexture.compareFunction = LessEqualCompare;

	const emptyArrayTexture = /*@__PURE__*/ new DataArrayTexture();
	const empty3dTexture = /*@__PURE__*/ new Data3DTexture();
	const emptyCubeTexture = /*@__PURE__*/ new CubeTexture();

	// --- Utilities ---

	// Array Caches (provide typed arrays for temporary by size)

	const arrayCacheF32 = [];
	const arrayCacheI32 = [];

	// Float32Array caches used for uploading Matrix uniforms

	const mat4array = new Float32Array( 16 );
	const mat3array = new Float32Array( 9 );
	const mat2array = new Float32Array( 4 );

	// Flattening for arrays of vectors and matrices

	function flatten( array, nBlocks, blockSize ) {

		const firstElem = array[ 0 ];

		if ( firstElem <= 0 || firstElem > 0 ) return array;
		// unoptimized: ! isNaN( firstElem )
		// see http://jacksondunstan.com/articles/983

		const n = nBlocks * blockSize;
		let r = arrayCacheF32[ n ];

		if ( r === undefined ) {

			r = new Float32Array( n );
			arrayCacheF32[ n ] = r;

		}

		if ( nBlocks !== 0 ) {

			firstElem.toArray( r, 0 );

			for ( let i = 1, offset = 0; i !== nBlocks; ++ i ) {

				offset += blockSize;
				array[ i ].toArray( r, offset );

			}

		}

		return r;

	}

	function arraysEqual( a, b ) {

		if ( a.length !== b.length ) return false;

		for ( let i = 0, l = a.length; i < l; i ++ ) {

			if ( a[ i ] !== b[ i ] ) return false;

		}

		return true;

	}

	function copyArray( a, b ) {

		for ( let i = 0, l = b.length; i < l; i ++ ) {

			a[ i ] = b[ i ];

		}

	}

	// Texture unit allocation

	function allocTexUnits( textures, n ) {

		let r = arrayCacheI32[ n ];

		if ( r === undefined ) {

			r = new Int32Array( n );
			arrayCacheI32[ n ] = r;

		}

		for ( let i = 0; i !== n; ++ i ) {

			r[ i ] = textures.allocateTextureUnit();

		}

		return r;

	}

	// --- Setters ---

	// Note: Defining these methods externally, because they come in a bunch
	// and this way their names minify.

	// Single scalar

	function setValueV1f( gl, v ) {

		const cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1f( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single float vector (from flat array or THREE.VectorN)

	function setValueV2f( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2f( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform2fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV3f( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3f( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else if ( v.r !== undefined ) {

			if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

				gl.uniform3f( this.addr, v.r, v.g, v.b );

				cache[ 0 ] = v.r;
				cache[ 1 ] = v.g;
				cache[ 2 ] = v.b;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform3fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV4f( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform4fv( this.addr, v );

			copyArray( cache, v );

		}

	}

	// Single matrix (from flat array or THREE.MatrixN)

	function setValueM2( gl, v ) {

		const cache = this.cache;
		const elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix2fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat2array.set( elements );

			gl.uniformMatrix2fv( this.addr, false, mat2array );

			copyArray( cache, elements );

		}

	}

	function setValueM3( gl, v ) {

		const cache = this.cache;
		const elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix3fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat3array.set( elements );

			gl.uniformMatrix3fv( this.addr, false, mat3array );

			copyArray( cache, elements );

		}

	}

	function setValueM4( gl, v ) {

		const cache = this.cache;
		const elements = v.elements;

		if ( elements === undefined ) {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniformMatrix4fv( this.addr, false, v );

			copyArray( cache, v );

		} else {

			if ( arraysEqual( cache, elements ) ) return;

			mat4array.set( elements );

			gl.uniformMatrix4fv( this.addr, false, mat4array );

			copyArray( cache, elements );

		}

	}

	// Single integer / boolean

	function setValueV1i( gl, v ) {

		const cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1i( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single integer / boolean vector (from flat array or THREE.VectorN)

	function setValueV2i( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2i( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform2iv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV3i( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3i( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform3iv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV4i( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4i( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform4iv( this.addr, v );

			copyArray( cache, v );

		}

	}

	// Single unsigned integer

	function setValueV1ui( gl, v ) {

		const cache = this.cache;

		if ( cache[ 0 ] === v ) return;

		gl.uniform1ui( this.addr, v );

		cache[ 0 ] = v;

	}

	// Single unsigned integer vector (from flat array or THREE.VectorN)

	function setValueV2ui( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

				gl.uniform2ui( this.addr, v.x, v.y );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform2uiv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV3ui( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

				gl.uniform3ui( this.addr, v.x, v.y, v.z );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform3uiv( this.addr, v );

			copyArray( cache, v );

		}

	}

	function setValueV4ui( gl, v ) {

		const cache = this.cache;

		if ( v.x !== undefined ) {

			if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

				gl.uniform4ui( this.addr, v.x, v.y, v.z, v.w );

				cache[ 0 ] = v.x;
				cache[ 1 ] = v.y;
				cache[ 2 ] = v.z;
				cache[ 3 ] = v.w;

			}

		} else {

			if ( arraysEqual( cache, v ) ) return;

			gl.uniform4uiv( this.addr, v );

			copyArray( cache, v );

		}

	}


	// Single texture (2D / Cube)

	function setValueT1( gl, v, textures ) {

		const cache = this.cache;
		const unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		const emptyTexture2D = ( this.type === gl.SAMPLER_2D_SHADOW ) ? emptyShadowTexture : emptyTexture;

		textures.setTexture2D( v || emptyTexture2D, unit );

	}

	function setValueT3D1( gl, v, textures ) {

		const cache = this.cache;
		const unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.setTexture3D( v || empty3dTexture, unit );

	}

	function setValueT6( gl, v, textures ) {

		const cache = this.cache;
		const unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.setTextureCube( v || emptyCubeTexture, unit );

	}

	function setValueT2DArray1( gl, v, textures ) {

		const cache = this.cache;
		const unit = textures.allocateTextureUnit();

		if ( cache[ 0 ] !== unit ) {

			gl.uniform1i( this.addr, unit );
			cache[ 0 ] = unit;

		}

		textures.setTexture2DArray( v || emptyArrayTexture, unit );

	}

	// Helper to pick the right setter for the singular case

	function getSingularSetter( type ) {

		switch ( type ) {

			case 0x1406: return setValueV1f; // FLOAT
			case 0x8b50: return setValueV2f; // _VEC2
			case 0x8b51: return setValueV3f; // _VEC3
			case 0x8b52: return setValueV4f; // _VEC4

			case 0x8b5a: return setValueM2; // _MAT2
			case 0x8b5b: return setValueM3; // _MAT3
			case 0x8b5c: return setValueM4; // _MAT4

			case 0x1404: case 0x8b56: return setValueV1i; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValueV2i; // _VEC2
			case 0x8b54: case 0x8b58: return setValueV3i; // _VEC3
			case 0x8b55: case 0x8b59: return setValueV4i; // _VEC4

			case 0x1405: return setValueV1ui; // UINT
			case 0x8dc6: return setValueV2ui; // _VEC2
			case 0x8dc7: return setValueV3ui; // _VEC3
			case 0x8dc8: return setValueV4ui; // _VEC4

			case 0x8b5e: // SAMPLER_2D
			case 0x8d66: // SAMPLER_EXTERNAL_OES
			case 0x8dca: // INT_SAMPLER_2D
			case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
			case 0x8b62: // SAMPLER_2D_SHADOW
				return setValueT1;

			case 0x8b5f: // SAMPLER_3D
			case 0x8dcb: // INT_SAMPLER_3D
			case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
				return setValueT3D1;

			case 0x8b60: // SAMPLER_CUBE
			case 0x8dcc: // INT_SAMPLER_CUBE
			case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
			case 0x8dc5: // SAMPLER_CUBE_SHADOW
				return setValueT6;

			case 0x8dc1: // SAMPLER_2D_ARRAY
			case 0x8dcf: // INT_SAMPLER_2D_ARRAY
			case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
			case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
				return setValueT2DArray1;

		}

	}


	// Array of scalars

	function setValueV1fArray( gl, v ) {

		gl.uniform1fv( this.addr, v );

	}

	// Array of vectors (from flat array or array of THREE.VectorN)

	function setValueV2fArray( gl, v ) {

		const data = flatten( v, this.size, 2 );

		gl.uniform2fv( this.addr, data );

	}

	function setValueV3fArray( gl, v ) {

		const data = flatten( v, this.size, 3 );

		gl.uniform3fv( this.addr, data );

	}

	function setValueV4fArray( gl, v ) {

		const data = flatten( v, this.size, 4 );

		gl.uniform4fv( this.addr, data );

	}

	// Array of matrices (from flat array or array of THREE.MatrixN)

	function setValueM2Array( gl, v ) {

		const data = flatten( v, this.size, 4 );

		gl.uniformMatrix2fv( this.addr, false, data );

	}

	function setValueM3Array( gl, v ) {

		const data = flatten( v, this.size, 9 );

		gl.uniformMatrix3fv( this.addr, false, data );

	}

	function setValueM4Array( gl, v ) {

		const data = flatten( v, this.size, 16 );

		gl.uniformMatrix4fv( this.addr, false, data );

	}

	// Array of integer / boolean

	function setValueV1iArray( gl, v ) {

		gl.uniform1iv( this.addr, v );

	}

	// Array of integer / boolean vectors (from flat array)

	function setValueV2iArray( gl, v ) {

		gl.uniform2iv( this.addr, v );

	}

	function setValueV3iArray( gl, v ) {

		gl.uniform3iv( this.addr, v );

	}

	function setValueV4iArray( gl, v ) {

		gl.uniform4iv( this.addr, v );

	}

	// Array of unsigned integer

	function setValueV1uiArray( gl, v ) {

		gl.uniform1uiv( this.addr, v );

	}

	// Array of unsigned integer vectors (from flat array)

	function setValueV2uiArray( gl, v ) {

		gl.uniform2uiv( this.addr, v );

	}

	function setValueV3uiArray( gl, v ) {

		gl.uniform3uiv( this.addr, v );

	}

	function setValueV4uiArray( gl, v ) {

		gl.uniform4uiv( this.addr, v );

	}


	// Array of textures (2D / 3D / Cube / 2DArray)

	function setValueT1Array( gl, v, textures ) {

		const cache = this.cache;

		const n = v.length;

		const units = allocTexUnits( textures, n );

		if ( ! arraysEqual( cache, units ) ) {

			gl.uniform1iv( this.addr, units );

			copyArray( cache, units );

		}

		for ( let i = 0; i !== n; ++ i ) {

			textures.setTexture2D( v[ i ] || emptyTexture, units[ i ] );

		}

	}

	function setValueT3DArray( gl, v, textures ) {

		const cache = this.cache;

		const n = v.length;

		const units = allocTexUnits( textures, n );

		if ( ! arraysEqual( cache, units ) ) {

			gl.uniform1iv( this.addr, units );

			copyArray( cache, units );

		}

		for ( let i = 0; i !== n; ++ i ) {

			textures.setTexture3D( v[ i ] || empty3dTexture, units[ i ] );

		}

	}

	function setValueT6Array( gl, v, textures ) {

		const cache = this.cache;

		const n = v.length;

		const units = allocTexUnits( textures, n );

		if ( ! arraysEqual( cache, units ) ) {

			gl.uniform1iv( this.addr, units );

			copyArray( cache, units );

		}

		for ( let i = 0; i !== n; ++ i ) {

			textures.setTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

		}

	}

	function setValueT2DArrayArray( gl, v, textures ) {

		const cache = this.cache;

		const n = v.length;

		const units = allocTexUnits( textures, n );

		if ( ! arraysEqual( cache, units ) ) {

			gl.uniform1iv( this.addr, units );

			copyArray( cache, units );

		}

		for ( let i = 0; i !== n; ++ i ) {

			textures.setTexture2DArray( v[ i ] || emptyArrayTexture, units[ i ] );

		}

	}


	// Helper to pick the right setter for a pure (bottom-level) array

	function getPureArraySetter( type ) {

		switch ( type ) {

			case 0x1406: return setValueV1fArray; // FLOAT
			case 0x8b50: return setValueV2fArray; // _VEC2
			case 0x8b51: return setValueV3fArray; // _VEC3
			case 0x8b52: return setValueV4fArray; // _VEC4

			case 0x8b5a: return setValueM2Array; // _MAT2
			case 0x8b5b: return setValueM3Array; // _MAT3
			case 0x8b5c: return setValueM4Array; // _MAT4

			case 0x1404: case 0x8b56: return setValueV1iArray; // INT, BOOL
			case 0x8b53: case 0x8b57: return setValueV2iArray; // _VEC2
			case 0x8b54: case 0x8b58: return setValueV3iArray; // _VEC3
			case 0x8b55: case 0x8b59: return setValueV4iArray; // _VEC4

			case 0x1405: return setValueV1uiArray; // UINT
			case 0x8dc6: return setValueV2uiArray; // _VEC2
			case 0x8dc7: return setValueV3uiArray; // _VEC3
			case 0x8dc8: return setValueV4uiArray; // _VEC4

			case 0x8b5e: // SAMPLER_2D
			case 0x8d66: // SAMPLER_EXTERNAL_OES
			case 0x8dca: // INT_SAMPLER_2D
			case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
			case 0x8b62: // SAMPLER_2D_SHADOW
				return setValueT1Array;

			case 0x8b5f: // SAMPLER_3D
			case 0x8dcb: // INT_SAMPLER_3D
			case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
				return setValueT3DArray;

			case 0x8b60: // SAMPLER_CUBE
			case 0x8dcc: // INT_SAMPLER_CUBE
			case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
			case 0x8dc5: // SAMPLER_CUBE_SHADOW
				return setValueT6Array;

			case 0x8dc1: // SAMPLER_2D_ARRAY
			case 0x8dcf: // INT_SAMPLER_2D_ARRAY
			case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
			case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
				return setValueT2DArrayArray;

		}

	}

	// --- Uniform Classes ---

	class SingleUniform {

		constructor( id, activeInfo, addr ) {

			this.id = id;
			this.addr = addr;
			this.cache = [];
			this.type = activeInfo.type;
			this.setValue = getSingularSetter( activeInfo.type );

			// this.path = activeInfo.name; // DEBUG

		}

	}

	class PureArrayUniform {

		constructor( id, activeInfo, addr ) {

			this.id = id;
			this.addr = addr;
			this.cache = [];
			this.type = activeInfo.type;
			this.size = activeInfo.size;
			this.setValue = getPureArraySetter( activeInfo.type );

			// this.path = activeInfo.name; // DEBUG

		}

	}

	class StructuredUniform {

		constructor( id ) {

			this.id = id;

			this.seq = [];
			this.map = {};

		}

		setValue( gl, value, textures ) {

			const seq = this.seq;

			for ( let i = 0, n = seq.length; i !== n; ++ i ) {

				const u = seq[ i ];
				u.setValue( gl, value[ u.id ], textures );

			}

		}

	}

	// --- Top-level ---

	// Parser - builds up the property tree from the path strings

	const RePathPart = /(\w+)(\])?(\[|\.)?/g;

	// extracts
	// 	- the identifier (member name or array index)
	//  - followed by an optional right bracket (found when array index)
	//  - followed by an optional left bracket or dot (type of subscript)
	//
	// Note: These portions can be read in a non-overlapping fashion and
	// allow straightforward parsing of the hierarchy that WebGL encodes
	// in the uniform names.

	function addUniform( container, uniformObject ) {

		container.seq.push( uniformObject );
		container.map[ uniformObject.id ] = uniformObject;

	}

	function parseUniform( activeInfo, addr, container ) {

		const path = activeInfo.name,
			pathLength = path.length;

		// reset RegExp object, because of the early exit of a previous run
		RePathPart.lastIndex = 0;

		while ( true ) {

			const match = RePathPart.exec( path ),
				matchEnd = RePathPart.lastIndex;

			let id = match[ 1 ];
			const idIsIndex = match[ 2 ] === ']',
				subscript = match[ 3 ];

			if ( idIsIndex ) id = id | 0; // convert to integer

			if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

				// bare name or "pure" bottom-level array "[0]" suffix

				addUniform( container, subscript === undefined ?
					new SingleUniform( id, activeInfo, addr ) :
					new PureArrayUniform( id, activeInfo, addr ) );

				break;

			} else {

				// step into inner node / create it in case it doesn't exist

				const map = container.map;
				let next = map[ id ];

				if ( next === undefined ) {

					next = new StructuredUniform( id );
					addUniform( container, next );

				}

				container = next;

			}

		}

	}

	// Root Container

	class WebGLUniforms {

		constructor( gl, program ) {

			this.seq = [];
			this.map = {};

			const n = gl.getProgramParameter( program, gl.ACTIVE_UNIFORMS );

			for ( let i = 0; i < n; ++ i ) {

				const info = gl.getActiveUniform( program, i ),
					addr = gl.getUniformLocation( program, info.name );

				parseUniform( info, addr, this );

			}

		}

		setValue( gl, name, value, textures ) {

			const u = this.map[ name ];

			if ( u !== undefined ) u.setValue( gl, value, textures );

		}

		setOptional( gl, object, name ) {

			const v = object[ name ];

			if ( v !== undefined ) this.setValue( gl, name, v );

		}

		static upload( gl, seq, values, textures ) {

			for ( let i = 0, n = seq.length; i !== n; ++ i ) {

				const u = seq[ i ],
					v = values[ u.id ];

				if ( v.needsUpdate !== false ) {

					// note: always updating when .needsUpdate is undefined
					u.setValue( gl, v.value, textures );

				}

			}

		}

		static seqWithValue( seq, values ) {

			const r = [];

			for ( let i = 0, n = seq.length; i !== n; ++ i ) {

				const u = seq[ i ];
				if ( u.id in values ) r.push( u );

			}

			return r;

		}

	}

	function WebGLShader( gl, type, string ) {

		const shader = gl.createShader( type );

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		return shader;

	}

	// From https://www.khronos.org/registry/webgl/extensions/KHR_parallel_shader_compile/
	const COMPLETION_STATUS_KHR = 0x91B1;

	let programIdCount = 0;

	function handleSource( string, errorLine ) {

		const lines = string.split( '\n' );
		const lines2 = [];

		const from = Math.max( errorLine - 6, 0 );
		const to = Math.min( errorLine + 6, lines.length );

		for ( let i = from; i < to; i ++ ) {

			const line = i + 1;
			lines2.push( `${line === errorLine ? '>' : ' '} ${line}: ${lines[ i ]}` );

		}

		return lines2.join( '\n' );

	}

	function getEncodingComponents( colorSpace ) {

		const workingPrimaries = ColorManagement.getPrimaries( ColorManagement.workingColorSpace );
		const encodingPrimaries = ColorManagement.getPrimaries( colorSpace );

		let gamutMapping;

		if ( workingPrimaries === encodingPrimaries ) {

			gamutMapping = '';

		} else if ( workingPrimaries === P3Primaries && encodingPrimaries === Rec709Primaries ) {

			gamutMapping = 'LinearDisplayP3ToLinearSRGB';

		} else if ( workingPrimaries === Rec709Primaries && encodingPrimaries === P3Primaries ) {

			gamutMapping = 'LinearSRGBToLinearDisplayP3';

		}

		switch ( colorSpace ) {

			case LinearSRGBColorSpace:
			case LinearDisplayP3ColorSpace:
				return [ gamutMapping, 'LinearTransferOETF' ];

			case SRGBColorSpace:
			case DisplayP3ColorSpace:
				return [ gamutMapping, 'sRGBTransferOETF' ];

			default:
				console.warn( 'THREE.WebGLProgram: Unsupported color space:', colorSpace );
				return [ gamutMapping, 'LinearTransferOETF' ];

		}

	}

	function getShaderErrors( gl, shader, type ) {

		const status = gl.getShaderParameter( shader, gl.COMPILE_STATUS );
		const errors = gl.getShaderInfoLog( shader ).trim();

		if ( status && errors === '' ) return '';

		const errorMatches = /ERROR: 0:(\d+)/.exec( errors );
		if ( errorMatches ) {

			// --enable-privileged-webgl-extension
			// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

			const errorLine = parseInt( errorMatches[ 1 ] );
			return type.toUpperCase() + '\n\n' + errors + '\n\n' + handleSource( gl.getShaderSource( shader ), errorLine );

		} else {

			return errors;

		}

	}

	function getTexelEncodingFunction( functionName, colorSpace ) {

		const components = getEncodingComponents( colorSpace );
		return `vec4 ${functionName}( vec4 value ) { return ${components[ 0 ]}( ${components[ 1 ]}( value ) ); }`;

	}

	function getToneMappingFunction( functionName, toneMapping ) {

		let toneMappingName;

		switch ( toneMapping ) {

			case LinearToneMapping:
				toneMappingName = 'Linear';
				break;

			case ReinhardToneMapping:
				toneMappingName = 'Reinhard';
				break;

			case CineonToneMapping:
				toneMappingName = 'OptimizedCineon';
				break;

			case ACESFilmicToneMapping:
				toneMappingName = 'ACESFilmic';
				break;

			case AgXToneMapping:
				toneMappingName = 'AgX';
				break;

			case CustomToneMapping:
				toneMappingName = 'Custom';
				break;

			default:
				console.warn( 'THREE.WebGLProgram: Unsupported toneMapping:', toneMapping );
				toneMappingName = 'Linear';

		}

		return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

	}

	function generateExtensions( parameters ) {

		const chunks = [
			( parameters.extensionDerivatives || !! parameters.envMapCubeUVHeight || parameters.bumpMap || parameters.normalMapTangentSpace || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ) ? '#extension GL_OES_standard_derivatives : enable' : '',
			( parameters.extensionFragDepth || parameters.logarithmicDepthBuffer ) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
			( parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ) ? '#extension GL_EXT_draw_buffers : require' : '',
			( parameters.extensionShaderTextureLOD || parameters.envMap || parameters.transmission ) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
		];

		return chunks.filter( filterEmptyLine ).join( '\n' );

	}

	function generateVertexExtensions( parameters ) {

		const chunks = [
			parameters.extensionClipCullDistance ? '#extension GL_ANGLE_clip_cull_distance : require' : ''
		];

		return chunks.filter( filterEmptyLine ).join( '\n' );

	}

	function generateDefines( defines ) {

		const chunks = [];

		for ( const name in defines ) {

			const value = defines[ name ];

			if ( value === false ) continue;

			chunks.push( '#define ' + name + ' ' + value );

		}

		return chunks.join( '\n' );

	}

	function fetchAttributeLocations( gl, program ) {

		const attributes = {};

		const n = gl.getProgramParameter( program, gl.ACTIVE_ATTRIBUTES );

		for ( let i = 0; i < n; i ++ ) {

			const info = gl.getActiveAttrib( program, i );
			const name = info.name;

			let locationSize = 1;
			if ( info.type === gl.FLOAT_MAT2 ) locationSize = 2;
			if ( info.type === gl.FLOAT_MAT3 ) locationSize = 3;
			if ( info.type === gl.FLOAT_MAT4 ) locationSize = 4;

			// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

			attributes[ name ] = {
				type: info.type,
				location: gl.getAttribLocation( program, name ),
				locationSize: locationSize
			};

		}

		return attributes;

	}

	function filterEmptyLine( string ) {

		return string !== '';

	}

	function replaceLightNums( string, parameters ) {

		const numSpotLightCoords = parameters.numSpotLightShadows + parameters.numSpotLightMaps - parameters.numSpotLightShadowsWithMaps;

		return string
			.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
			.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
			.replace( /NUM_SPOT_LIGHT_MAPS/g, parameters.numSpotLightMaps )
			.replace( /NUM_SPOT_LIGHT_COORDS/g, numSpotLightCoords )
			.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
			.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
			.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights )
			.replace( /NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows )
			.replace( /NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, parameters.numSpotLightShadowsWithMaps )
			.replace( /NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows )
			.replace( /NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows );

	}

	function replaceClippingPlaneNums( string, parameters ) {

		return string
			.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
			.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

	}

	// Resolve Includes

	const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function resolveIncludes( string ) {

		return string.replace( includePattern, includeReplacer );

	}

	const shaderChunkMap = new Map( [
		[ 'encodings_fragment', 'colorspace_fragment' ], // @deprecated, r154
		[ 'encodings_pars_fragment', 'colorspace_pars_fragment' ], // @deprecated, r154
		[ 'output_fragment', 'opaque_fragment' ], // @deprecated, r154
	] );

	function includeReplacer( match, include ) {

		let string = ShaderChunk[ include ];

		if ( string === undefined ) {

			const newInclude = shaderChunkMap.get( include );

			if ( newInclude !== undefined ) {

				string = ShaderChunk[ newInclude ];
				console.warn( 'THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', include, newInclude );

			} else {

				throw new Error( 'Can not resolve #include <' + include + '>' );

			}

		}

		return resolveIncludes( string );

	}

	// Unroll Loops

	const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

	function unrollLoops( string ) {

		return string.replace( unrollLoopPattern, loopReplacer );

	}

	function loopReplacer( match, start, end, snippet ) {

		let string = '';

		for ( let i = parseInt( start ); i < parseInt( end ); i ++ ) {

			string += snippet
				.replace( /\[\s*i\s*\]/g, '[ ' + i + ' ]' )
				.replace( /UNROLLED_LOOP_INDEX/g, i );

		}

		return string;

	}

	//

	function generatePrecision( parameters ) {

		let precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';

		if ( parameters.precision === 'highp' ) {

			precisionstring += '\n#define HIGH_PRECISION';

		} else if ( parameters.precision === 'mediump' ) {

			precisionstring += '\n#define MEDIUM_PRECISION';

		} else if ( parameters.precision === 'lowp' ) {

			precisionstring += '\n#define LOW_PRECISION';

		}

		return precisionstring;

	}

	function generateShadowMapTypeDefine( parameters ) {

		let shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

		if ( parameters.shadowMapType === PCFShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

		} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

		} else if ( parameters.shadowMapType === VSMShadowMap ) {

			shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';

		}

		return shadowMapTypeDefine;

	}

	function generateEnvMapTypeDefine( parameters ) {

		let envMapTypeDefine = 'ENVMAP_TYPE_CUBE';

		if ( parameters.envMap ) {

			switch ( parameters.envMapMode ) {

				case CubeReflectionMapping:
				case CubeRefractionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
					break;

				case CubeUVReflectionMapping:
					envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
					break;

			}

		}

		return envMapTypeDefine;

	}

	function generateEnvMapModeDefine( parameters ) {

		let envMapModeDefine = 'ENVMAP_MODE_REFLECTION';

		if ( parameters.envMap ) {

			switch ( parameters.envMapMode ) {

				case CubeRefractionMapping:

					envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
					break;

			}

		}

		return envMapModeDefine;

	}

	function generateEnvMapBlendingDefine( parameters ) {

		let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';

		if ( parameters.envMap ) {

			switch ( parameters.combine ) {

				case MultiplyOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
					break;

				case MixOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
					break;

				case AddOperation:
					envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
					break;

			}

		}

		return envMapBlendingDefine;

	}

	function generateCubeUVSize( parameters ) {

		const imageHeight = parameters.envMapCubeUVHeight;

		if ( imageHeight === null ) return null;

		const maxMip = Math.log2( imageHeight ) - 2;

		const texelHeight = 1.0 / imageHeight;

		const texelWidth = 1.0 / ( 3 * Math.max( Math.pow( 2, maxMip ), 7 * 16 ) );

		return { texelWidth, texelHeight, maxMip };

	}

	function WebGLProgram( renderer, cacheKey, parameters, bindingStates ) {

		// TODO Send this event to Three.js DevTools
		// console.log( 'WebGLProgram', cacheKey );

		const gl = renderer.getContext();

		const defines = parameters.defines;

		let vertexShader = parameters.vertexShader;
		let fragmentShader = parameters.fragmentShader;

		const shadowMapTypeDefine = generateShadowMapTypeDefine( parameters );
		const envMapTypeDefine = generateEnvMapTypeDefine( parameters );
		const envMapModeDefine = generateEnvMapModeDefine( parameters );
		const envMapBlendingDefine = generateEnvMapBlendingDefine( parameters );
		const envMapCubeUVSize = generateCubeUVSize( parameters );

		const customExtensions = parameters.isWebGL2 ? '' : generateExtensions( parameters );

		const customVertexExtensions = generateVertexExtensions( parameters );

		const customDefines = generateDefines( defines );

		const program = gl.createProgram();

		let prefixVertex, prefixFragment;
		let versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';

		if ( parameters.isRawShaderMaterial ) {

			prefixVertex = [

				'#define SHADER_TYPE ' + parameters.shaderType,
				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixVertex.length > 0 ) {

				prefixVertex += '\n';

			}

			prefixFragment = [

				customExtensions,

				'#define SHADER_TYPE ' + parameters.shaderType,
				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines

			].filter( filterEmptyLine ).join( '\n' );

			if ( prefixFragment.length > 0 ) {

				prefixFragment += '\n';

			}

		} else {

			prefixVertex = [

				generatePrecision( parameters ),

				'#define SHADER_TYPE ' + parameters.shaderType,
				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines,

				parameters.extensionClipCullDistance ? '#define USE_CLIP_DISTANCE' : '',
				parameters.batching ? '#define USE_BATCHING' : '',
				parameters.instancing ? '#define USE_INSTANCING' : '',
				parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '',

				parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
				parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				parameters.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
				parameters.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
				parameters.displacementMap ? '#define USE_DISPLACEMENTMAP' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',

				parameters.anisotropy ? '#define USE_ANISOTROPY' : '',
				parameters.anisotropyMap ? '#define USE_ANISOTROPYMAP' : '',

				parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
				parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
				parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',

				parameters.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
				parameters.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',

				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
				parameters.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',

				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
				parameters.alphaHash ? '#define USE_ALPHAHASH' : '',

				parameters.transmission ? '#define USE_TRANSMISSION' : '',
				parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
				parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',

				parameters.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
				parameters.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',

				//

				parameters.mapUv ? '#define MAP_UV ' + parameters.mapUv : '',
				parameters.alphaMapUv ? '#define ALPHAMAP_UV ' + parameters.alphaMapUv : '',
				parameters.lightMapUv ? '#define LIGHTMAP_UV ' + parameters.lightMapUv : '',
				parameters.aoMapUv ? '#define AOMAP_UV ' + parameters.aoMapUv : '',
				parameters.emissiveMapUv ? '#define EMISSIVEMAP_UV ' + parameters.emissiveMapUv : '',
				parameters.bumpMapUv ? '#define BUMPMAP_UV ' + parameters.bumpMapUv : '',
				parameters.normalMapUv ? '#define NORMALMAP_UV ' + parameters.normalMapUv : '',
				parameters.displacementMapUv ? '#define DISPLACEMENTMAP_UV ' + parameters.displacementMapUv : '',

				parameters.metalnessMapUv ? '#define METALNESSMAP_UV ' + parameters.metalnessMapUv : '',
				parameters.roughnessMapUv ? '#define ROUGHNESSMAP_UV ' + parameters.roughnessMapUv : '',

				parameters.anisotropyMapUv ? '#define ANISOTROPYMAP_UV ' + parameters.anisotropyMapUv : '',

				parameters.clearcoatMapUv ? '#define CLEARCOATMAP_UV ' + parameters.clearcoatMapUv : '',
				parameters.clearcoatNormalMapUv ? '#define CLEARCOAT_NORMALMAP_UV ' + parameters.clearcoatNormalMapUv : '',
				parameters.clearcoatRoughnessMapUv ? '#define CLEARCOAT_ROUGHNESSMAP_UV ' + parameters.clearcoatRoughnessMapUv : '',

				parameters.iridescenceMapUv ? '#define IRIDESCENCEMAP_UV ' + parameters.iridescenceMapUv : '',
				parameters.iridescenceThicknessMapUv ? '#define IRIDESCENCE_THICKNESSMAP_UV ' + parameters.iridescenceThicknessMapUv : '',

				parameters.sheenColorMapUv ? '#define SHEEN_COLORMAP_UV ' + parameters.sheenColorMapUv : '',
				parameters.sheenRoughnessMapUv ? '#define SHEEN_ROUGHNESSMAP_UV ' + parameters.sheenRoughnessMapUv : '',

				parameters.specularMapUv ? '#define SPECULARMAP_UV ' + parameters.specularMapUv : '',
				parameters.specularColorMapUv ? '#define SPECULAR_COLORMAP_UV ' + parameters.specularColorMapUv : '',
				parameters.specularIntensityMapUv ? '#define SPECULAR_INTENSITYMAP_UV ' + parameters.specularIntensityMapUv : '',

				parameters.transmissionMapUv ? '#define TRANSMISSIONMAP_UV ' + parameters.transmissionMapUv : '',
				parameters.thicknessMapUv ? '#define THICKNESSMAP_UV ' + parameters.thicknessMapUv : '',

				//

				parameters.vertexTangents && parameters.flatShading === false ? '#define USE_TANGENT' : '',
				parameters.vertexColors ? '#define USE_COLOR' : '',
				parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
				parameters.vertexUv1s ? '#define USE_UV1' : '',
				parameters.vertexUv2s ? '#define USE_UV2' : '',
				parameters.vertexUv3s ? '#define USE_UV3' : '',

				parameters.pointsUvs ? '#define USE_POINTS_UV' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.skinning ? '#define USE_SKINNING' : '',

				parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
				parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
				( parameters.morphColors && parameters.isWebGL2 ) ? '#define USE_MORPHCOLORS' : '',
				( parameters.morphTargetsCount > 0 && parameters.isWebGL2 ) ? '#define MORPHTARGETS_TEXTURE' : '',
				( parameters.morphTargetsCount > 0 && parameters.isWebGL2 ) ? '#define MORPHTARGETS_TEXTURE_STRIDE ' + parameters.morphTextureStride : '',
				( parameters.morphTargetsCount > 0 && parameters.isWebGL2 ) ? '#define MORPHTARGETS_COUNT ' + parameters.morphTargetsCount : '',
				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

				parameters.numLightProbes > 0 ? '#define USE_LIGHT_PROBES' : '',

				parameters.useLegacyLights ? '#define LEGACY_LIGHTS' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				'uniform mat4 modelMatrix;',
				'uniform mat4 modelViewMatrix;',
				'uniform mat4 projectionMatrix;',
				'uniform mat4 viewMatrix;',
				'uniform mat3 normalMatrix;',
				'uniform vec3 cameraPosition;',
				'uniform bool isOrthographic;',

				'#ifdef USE_INSTANCING',

				'	attribute mat4 instanceMatrix;',

				'#endif',

				'#ifdef USE_INSTANCING_COLOR',

				'	attribute vec3 instanceColor;',

				'#endif',

				'attribute vec3 position;',
				'attribute vec3 normal;',
				'attribute vec2 uv;',

				'#ifdef USE_UV1',

				'	attribute vec2 uv1;',

				'#endif',

				'#ifdef USE_UV2',

				'	attribute vec2 uv2;',

				'#endif',

				'#ifdef USE_UV3',

				'	attribute vec2 uv3;',

				'#endif',

				'#ifdef USE_TANGENT',

				'	attribute vec4 tangent;',

				'#endif',

				'#if defined( USE_COLOR_ALPHA )',

				'	attribute vec4 color;',

				'#elif defined( USE_COLOR )',

				'	attribute vec3 color;',

				'#endif',

				'#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )',

				'	attribute vec3 morphTarget0;',
				'	attribute vec3 morphTarget1;',
				'	attribute vec3 morphTarget2;',
				'	attribute vec3 morphTarget3;',

				'	#ifdef USE_MORPHNORMALS',

				'		attribute vec3 morphNormal0;',
				'		attribute vec3 morphNormal1;',
				'		attribute vec3 morphNormal2;',
				'		attribute vec3 morphNormal3;',

				'	#else',

				'		attribute vec3 morphTarget4;',
				'		attribute vec3 morphTarget5;',
				'		attribute vec3 morphTarget6;',
				'		attribute vec3 morphTarget7;',

				'	#endif',

				'#endif',

				'#ifdef USE_SKINNING',

				'	attribute vec4 skinIndex;',
				'	attribute vec4 skinWeight;',

				'#endif',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

			prefixFragment = [

				customExtensions,

				generatePrecision( parameters ),

				'#define SHADER_TYPE ' + parameters.shaderType,
				'#define SHADER_NAME ' + parameters.shaderName,

				customDefines,

				parameters.useFog && parameters.fog ? '#define USE_FOG' : '',
				parameters.useFog && parameters.fogExp2 ? '#define FOG_EXP2' : '',

				parameters.map ? '#define USE_MAP' : '',
				parameters.matcap ? '#define USE_MATCAP' : '',
				parameters.envMap ? '#define USE_ENVMAP' : '',
				parameters.envMap ? '#define ' + envMapTypeDefine : '',
				parameters.envMap ? '#define ' + envMapModeDefine : '',
				parameters.envMap ? '#define ' + envMapBlendingDefine : '',
				envMapCubeUVSize ? '#define CUBEUV_TEXEL_WIDTH ' + envMapCubeUVSize.texelWidth : '',
				envMapCubeUVSize ? '#define CUBEUV_TEXEL_HEIGHT ' + envMapCubeUVSize.texelHeight : '',
				envMapCubeUVSize ? '#define CUBEUV_MAX_MIP ' + envMapCubeUVSize.maxMip + '.0' : '',
				parameters.lightMap ? '#define USE_LIGHTMAP' : '',
				parameters.aoMap ? '#define USE_AOMAP' : '',
				parameters.bumpMap ? '#define USE_BUMPMAP' : '',
				parameters.normalMap ? '#define USE_NORMALMAP' : '',
				parameters.normalMapObjectSpace ? '#define USE_NORMALMAP_OBJECTSPACE' : '',
				parameters.normalMapTangentSpace ? '#define USE_NORMALMAP_TANGENTSPACE' : '',
				parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',

				parameters.anisotropy ? '#define USE_ANISOTROPY' : '',
				parameters.anisotropyMap ? '#define USE_ANISOTROPYMAP' : '',

				parameters.clearcoat ? '#define USE_CLEARCOAT' : '',
				parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
				parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
				parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',

				parameters.iridescence ? '#define USE_IRIDESCENCE' : '',
				parameters.iridescenceMap ? '#define USE_IRIDESCENCEMAP' : '',
				parameters.iridescenceThicknessMap ? '#define USE_IRIDESCENCE_THICKNESSMAP' : '',

				parameters.specularMap ? '#define USE_SPECULARMAP' : '',
				parameters.specularColorMap ? '#define USE_SPECULAR_COLORMAP' : '',
				parameters.specularIntensityMap ? '#define USE_SPECULAR_INTENSITYMAP' : '',

				parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
				parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',

				parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
				parameters.alphaTest ? '#define USE_ALPHATEST' : '',
				parameters.alphaHash ? '#define USE_ALPHAHASH' : '',

				parameters.sheen ? '#define USE_SHEEN' : '',
				parameters.sheenColorMap ? '#define USE_SHEEN_COLORMAP' : '',
				parameters.sheenRoughnessMap ? '#define USE_SHEEN_ROUGHNESSMAP' : '',

				parameters.transmission ? '#define USE_TRANSMISSION' : '',
				parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',
				parameters.thicknessMap ? '#define USE_THICKNESSMAP' : '',

				parameters.vertexTangents && parameters.flatShading === false ? '#define USE_TANGENT' : '',
				parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
				parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
				parameters.vertexUv1s ? '#define USE_UV1' : '',
				parameters.vertexUv2s ? '#define USE_UV2' : '',
				parameters.vertexUv3s ? '#define USE_UV3' : '',

				parameters.pointsUvs ? '#define USE_POINTS_UV' : '',

				parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

				parameters.flatShading ? '#define FLAT_SHADED' : '',

				parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
				parameters.flipSided ? '#define FLIP_SIDED' : '',

				parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
				parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

				parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

				parameters.numLightProbes > 0 ? '#define USE_LIGHT_PROBES' : '',

				parameters.useLegacyLights ? '#define LEGACY_LIGHTS' : '',

				parameters.decodeVideoTexture ? '#define DECODE_VIDEO_TEXTURE' : '',

				parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
				( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

				'uniform mat4 viewMatrix;',
				'uniform vec3 cameraPosition;',
				'uniform bool isOrthographic;',

				( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
				( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
				( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

				parameters.dithering ? '#define DITHERING' : '',
				parameters.opaque ? '#define OPAQUE' : '',

				ShaderChunk[ 'colorspace_pars_fragment' ], // this code is required here because it is used by the various encoding/decoding function defined below
				getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputColorSpace ),

				parameters.useDepthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',

				'\n'

			].filter( filterEmptyLine ).join( '\n' );

		}

		vertexShader = resolveIncludes( vertexShader );
		vertexShader = replaceLightNums( vertexShader, parameters );
		vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

		fragmentShader = resolveIncludes( fragmentShader );
		fragmentShader = replaceLightNums( fragmentShader, parameters );
		fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

		vertexShader = unrollLoops( vertexShader );
		fragmentShader = unrollLoops( fragmentShader );

		if ( parameters.isWebGL2 && parameters.isRawShaderMaterial !== true ) {

			// GLSL 3.0 conversion for built-in materials and ShaderMaterial

			versionString = '#version 300 es\n';

			prefixVertex = [
				customVertexExtensions,
				'precision mediump sampler2DArray;',
				'#define attribute in',
				'#define varying out',
				'#define texture2D texture'
			].join( '\n' ) + '\n' + prefixVertex;

			prefixFragment = [
				'precision mediump sampler2DArray;',
				'#define varying in',
				( parameters.glslVersion === GLSL3 ) ? '' : 'layout(location = 0) out highp vec4 pc_fragColor;',
				( parameters.glslVersion === GLSL3 ) ? '' : '#define gl_FragColor pc_fragColor',
				'#define gl_FragDepthEXT gl_FragDepth',
				'#define texture2D texture',
				'#define textureCube texture',
				'#define texture2DProj textureProj',
				'#define texture2DLodEXT textureLod',
				'#define texture2DProjLodEXT textureProjLod',
				'#define textureCubeLodEXT textureLod',
				'#define texture2DGradEXT textureGrad',
				'#define texture2DProjGradEXT textureProjGrad',
				'#define textureCubeGradEXT textureGrad'
			].join( '\n' ) + '\n' + prefixFragment;

		}

		const vertexGlsl = versionString + prefixVertex + vertexShader;
		const fragmentGlsl = versionString + prefixFragment + fragmentShader;

		// console.log( '*VERTEX*', vertexGlsl );
		// console.log( '*FRAGMENT*', fragmentGlsl );

		const glVertexShader = WebGLShader( gl, gl.VERTEX_SHADER, vertexGlsl );
		const glFragmentShader = WebGLShader( gl, gl.FRAGMENT_SHADER, fragmentGlsl );

		gl.attachShader( program, glVertexShader );
		gl.attachShader( program, glFragmentShader );

		// Force a particular attribute to index 0.

		if ( parameters.index0AttributeName !== undefined ) {

			gl.bindAttribLocation( program, 0, parameters.index0AttributeName );

		} else if ( parameters.morphTargets === true ) {

			// programs with morphTargets displace position out of attribute 0
			gl.bindAttribLocation( program, 0, 'position' );

		}

		gl.linkProgram( program );

		function onFirstUse( self ) {

			// check for link errors
			if ( renderer.debug.checkShaderErrors ) {

				const programLog = gl.getProgramInfoLog( program ).trim();
				const vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
				const fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

				let runnable = true;
				let haveDiagnostics = true;

				if ( gl.getProgramParameter( program, gl.LINK_STATUS ) === false ) {

					runnable = false;

					if ( typeof renderer.debug.onShaderError === 'function' ) {

						renderer.debug.onShaderError( gl, program, glVertexShader, glFragmentShader );

					} else {

						// default error reporting

						const vertexErrors = getShaderErrors( gl, glVertexShader, 'vertex' );
						const fragmentErrors = getShaderErrors( gl, glFragmentShader, 'fragment' );

						console.error(
							'THREE.WebGLProgram: Shader Error ' + gl.getError() + ' - ' +
							'VALIDATE_STATUS ' + gl.getProgramParameter( program, gl.VALIDATE_STATUS ) + '\n\n' +
							'Program Info Log: ' + programLog + '\n' +
							vertexErrors + '\n' +
							fragmentErrors
						);

					}

				} else if ( programLog !== '' ) {

					console.warn( 'THREE.WebGLProgram: Program Info Log:', programLog );

				} else if ( vertexLog === '' || fragmentLog === '' ) {

					haveDiagnostics = false;

				}

				if ( haveDiagnostics ) {

					self.diagnostics = {

						runnable: runnable,

						programLog: programLog,

						vertexShader: {

							log: vertexLog,
							prefix: prefixVertex

						},

						fragmentShader: {

							log: fragmentLog,
							prefix: prefixFragment

						}

					};

				}

			}

			// Clean up

			// Crashes in iOS9 and iOS10. #18402
			// gl.detachShader( program, glVertexShader );
			// gl.detachShader( program, glFragmentShader );

			gl.deleteShader( glVertexShader );
			gl.deleteShader( glFragmentShader );

			cachedUniforms = new WebGLUniforms( gl, program );
			cachedAttributes = fetchAttributeLocations( gl, program );

		}

		// set up caching for uniform locations

		let cachedUniforms;

		this.getUniforms = function () {

			if ( cachedUniforms === undefined ) {

				// Populates cachedUniforms and cachedAttributes
				onFirstUse( this );

			}

			return cachedUniforms;

		};

		// set up caching for attribute locations

		let cachedAttributes;

		this.getAttributes = function () {

			if ( cachedAttributes === undefined ) {

				// Populates cachedAttributes and cachedUniforms
				onFirstUse( this );

			}

			return cachedAttributes;

		};

		// indicate when the program is ready to be used. if the KHR_parallel_shader_compile extension isn't supported,
		// flag the program as ready immediately. It may cause a stall when it's first used.

		let programReady = ( parameters.rendererExtensionParallelShaderCompile === false );

		this.isReady = function () {

			if ( programReady === false ) {

				programReady = gl.getProgramParameter( program, COMPLETION_STATUS_KHR );

			}

			return programReady;

		};

		// free resource

		this.destroy = function () {

			bindingStates.releaseStatesOfProgram( this );

			gl.deleteProgram( program );
			this.program = undefined;

		};

		//

		this.type = parameters.shaderType;
		this.name = parameters.shaderName;
		this.id = programIdCount ++;
		this.cacheKey = cacheKey;
		this.usedTimes = 1;
		this.program = program;
		this.vertexShader = glVertexShader;
		this.fragmentShader = glFragmentShader;

		return this;

	}

	let _id$1 = 0;

	class WebGLShaderCache {

		constructor() {

			this.shaderCache = new Map();
			this.materialCache = new Map();

		}

		update( material ) {

			const vertexShader = material.vertexShader;
			const fragmentShader = material.fragmentShader;

			const vertexShaderStage = this._getShaderStage( vertexShader );
			const fragmentShaderStage = this._getShaderStage( fragmentShader );

			const materialShaders = this._getShaderCacheForMaterial( material );

			if ( materialShaders.has( vertexShaderStage ) === false ) {

				materialShaders.add( vertexShaderStage );
				vertexShaderStage.usedTimes ++;

			}

			if ( materialShaders.has( fragmentShaderStage ) === false ) {

				materialShaders.add( fragmentShaderStage );
				fragmentShaderStage.usedTimes ++;

			}

			return this;

		}

		remove( material ) {

			const materialShaders = this.materialCache.get( material );

			for ( const shaderStage of materialShaders ) {

				shaderStage.usedTimes --;

				if ( shaderStage.usedTimes === 0 ) this.shaderCache.delete( shaderStage.code );

			}

			this.materialCache.delete( material );

			return this;

		}

		getVertexShaderID( material ) {

			return this._getShaderStage( material.vertexShader ).id;

		}

		getFragmentShaderID( material ) {

			return this._getShaderStage( material.fragmentShader ).id;

		}

		dispose() {

			this.shaderCache.clear();
			this.materialCache.clear();

		}

		_getShaderCacheForMaterial( material ) {

			const cache = this.materialCache;
			let set = cache.get( material );

			if ( set === undefined ) {

				set = new Set();
				cache.set( material, set );

			}

			return set;

		}

		_getShaderStage( code ) {

			const cache = this.shaderCache;
			let stage = cache.get( code );

			if ( stage === undefined ) {

				stage = new WebGLShaderStage( code );
				cache.set( code, stage );

			}

			return stage;

		}

	}

	class WebGLShaderStage {

		constructor( code ) {

			this.id = _id$1 ++;

			this.code = code;
			this.usedTimes = 0;

		}

	}

	function WebGLPrograms( renderer, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping ) {

		const _programLayers = new Layers();
		const _customShaders = new WebGLShaderCache();
		const programs = [];

		const IS_WEBGL2 = capabilities.isWebGL2;
		const logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
		const SUPPORTS_VERTEX_TEXTURES = capabilities.vertexTextures;

		let precision = capabilities.precision;

		const shaderIDs = {
			MeshDepthMaterial: 'depth',
			MeshDistanceMaterial: 'distanceRGBA',
			MeshNormalMaterial: 'normal',
			MeshBasicMaterial: 'basic',
			MeshLambertMaterial: 'lambert',
			MeshPhongMaterial: 'phong',
			MeshToonMaterial: 'toon',
			MeshStandardMaterial: 'physical',
			MeshPhysicalMaterial: 'physical',
			MeshMatcapMaterial: 'matcap',
			LineBasicMaterial: 'basic',
			LineDashedMaterial: 'dashed',
			PointsMaterial: 'points',
			ShadowMaterial: 'shadow',
			SpriteMaterial: 'sprite'
		};

		function getChannel( value ) {

			if ( value === 0 ) return 'uv';

			return `uv${ value }`;

		}

		function getParameters( material, lights, shadows, scene, object ) {

			const fog = scene.fog;
			const geometry = object.geometry;
			const environment = material.isMeshStandardMaterial ? scene.environment : null;

			const envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || environment );
			const envMapCubeUVHeight = ( !! envMap ) && ( envMap.mapping === CubeUVReflectionMapping ) ? envMap.image.height : null;

			const shaderID = shaderIDs[ material.type ];

			// heuristics to create shader parameters according to lights in the scene
			// (not to blow over maxLights budget)

			if ( material.precision !== null ) {

				precision = capabilities.getMaxPrecision( material.precision );

				if ( precision !== material.precision ) {

					console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

				}

			}

			//

			const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
			const morphTargetsCount = ( morphAttribute !== undefined ) ? morphAttribute.length : 0;

			let morphTextureStride = 0;

			if ( geometry.morphAttributes.position !== undefined ) morphTextureStride = 1;
			if ( geometry.morphAttributes.normal !== undefined ) morphTextureStride = 2;
			if ( geometry.morphAttributes.color !== undefined ) morphTextureStride = 3;

			//

			let vertexShader, fragmentShader;
			let customVertexShaderID, customFragmentShaderID;

			if ( shaderID ) {

				const shader = ShaderLib[ shaderID ];

				vertexShader = shader.vertexShader;
				fragmentShader = shader.fragmentShader;

			} else {

				vertexShader = material.vertexShader;
				fragmentShader = material.fragmentShader;

				_customShaders.update( material );

				customVertexShaderID = _customShaders.getVertexShaderID( material );
				customFragmentShaderID = _customShaders.getFragmentShaderID( material );

			}

			const currentRenderTarget = renderer.getRenderTarget();

			const IS_INSTANCEDMESH = object.isInstancedMesh === true;
			const IS_BATCHEDMESH = object.isBatchedMesh === true;

			const HAS_MAP = !! material.map;
			const HAS_MATCAP = !! material.matcap;
			const HAS_ENVMAP = !! envMap;
			const HAS_AOMAP = !! material.aoMap;
			const HAS_LIGHTMAP = !! material.lightMap;
			const HAS_BUMPMAP = !! material.bumpMap;
			const HAS_NORMALMAP = !! material.normalMap;
			const HAS_DISPLACEMENTMAP = !! material.displacementMap;
			const HAS_EMISSIVEMAP = !! material.emissiveMap;

			const HAS_METALNESSMAP = !! material.metalnessMap;
			const HAS_ROUGHNESSMAP = !! material.roughnessMap;

			const HAS_ANISOTROPY = material.anisotropy > 0;
			const HAS_CLEARCOAT = material.clearcoat > 0;
			const HAS_IRIDESCENCE = material.iridescence > 0;
			const HAS_SHEEN = material.sheen > 0;
			const HAS_TRANSMISSION = material.transmission > 0;

			const HAS_ANISOTROPYMAP = HAS_ANISOTROPY && !! material.anisotropyMap;

			const HAS_CLEARCOATMAP = HAS_CLEARCOAT && !! material.clearcoatMap;
			const HAS_CLEARCOAT_NORMALMAP = HAS_CLEARCOAT && !! material.clearcoatNormalMap;
			const HAS_CLEARCOAT_ROUGHNESSMAP = HAS_CLEARCOAT && !! material.clearcoatRoughnessMap;

			const HAS_IRIDESCENCEMAP = HAS_IRIDESCENCE && !! material.iridescenceMap;
			const HAS_IRIDESCENCE_THICKNESSMAP = HAS_IRIDESCENCE && !! material.iridescenceThicknessMap;

			const HAS_SHEEN_COLORMAP = HAS_SHEEN && !! material.sheenColorMap;
			const HAS_SHEEN_ROUGHNESSMAP = HAS_SHEEN && !! material.sheenRoughnessMap;

			const HAS_SPECULARMAP = !! material.specularMap;
			const HAS_SPECULAR_COLORMAP = !! material.specularColorMap;
			const HAS_SPECULAR_INTENSITYMAP = !! material.specularIntensityMap;

			const HAS_TRANSMISSIONMAP = HAS_TRANSMISSION && !! material.transmissionMap;
			const HAS_THICKNESSMAP = HAS_TRANSMISSION && !! material.thicknessMap;

			const HAS_GRADIENTMAP = !! material.gradientMap;

			const HAS_ALPHAMAP = !! material.alphaMap;

			const HAS_ALPHATEST = material.alphaTest > 0;

			const HAS_ALPHAHASH = !! material.alphaHash;

			const HAS_EXTENSIONS = !! material.extensions;

			const HAS_ATTRIBUTE_UV1 = !! geometry.attributes.uv1;
			const HAS_ATTRIBUTE_UV2 = !! geometry.attributes.uv2;
			const HAS_ATTRIBUTE_UV3 = !! geometry.attributes.uv3;

			let toneMapping = NoToneMapping;

			if ( material.toneMapped ) {

				if ( currentRenderTarget === null || currentRenderTarget.isXRRenderTarget === true ) {

					toneMapping = renderer.toneMapping;

				}

			}

			const parameters = {

				isWebGL2: IS_WEBGL2,

				shaderID: shaderID,
				shaderType: material.type,
				shaderName: material.name,

				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				defines: material.defines,

				customVertexShaderID: customVertexShaderID,
				customFragmentShaderID: customFragmentShaderID,

				isRawShaderMaterial: material.isRawShaderMaterial === true,
				glslVersion: material.glslVersion,

				precision: precision,

				batching: IS_BATCHEDMESH,
				instancing: IS_INSTANCEDMESH,
				instancingColor: IS_INSTANCEDMESH && object.instanceColor !== null,

				supportsVertexTextures: SUPPORTS_VERTEX_TEXTURES,
				outputColorSpace: ( currentRenderTarget === null ) ? renderer.outputColorSpace : ( currentRenderTarget.isXRRenderTarget === true ? currentRenderTarget.texture.colorSpace : LinearSRGBColorSpace ),

				map: HAS_MAP,
				matcap: HAS_MATCAP,
				envMap: HAS_ENVMAP,
				envMapMode: HAS_ENVMAP && envMap.mapping,
				envMapCubeUVHeight: envMapCubeUVHeight,
				aoMap: HAS_AOMAP,
				lightMap: HAS_LIGHTMAP,
				bumpMap: HAS_BUMPMAP,
				normalMap: HAS_NORMALMAP,
				displacementMap: SUPPORTS_VERTEX_TEXTURES && HAS_DISPLACEMENTMAP,
				emissiveMap: HAS_EMISSIVEMAP,

				normalMapObjectSpace: HAS_NORMALMAP && material.normalMapType === ObjectSpaceNormalMap,
				normalMapTangentSpace: HAS_NORMALMAP && material.normalMapType === TangentSpaceNormalMap,

				metalnessMap: HAS_METALNESSMAP,
				roughnessMap: HAS_ROUGHNESSMAP,

				anisotropy: HAS_ANISOTROPY,
				anisotropyMap: HAS_ANISOTROPYMAP,

				clearcoat: HAS_CLEARCOAT,
				clearcoatMap: HAS_CLEARCOATMAP,
				clearcoatNormalMap: HAS_CLEARCOAT_NORMALMAP,
				clearcoatRoughnessMap: HAS_CLEARCOAT_ROUGHNESSMAP,

				iridescence: HAS_IRIDESCENCE,
				iridescenceMap: HAS_IRIDESCENCEMAP,
				iridescenceThicknessMap: HAS_IRIDESCENCE_THICKNESSMAP,

				sheen: HAS_SHEEN,
				sheenColorMap: HAS_SHEEN_COLORMAP,
				sheenRoughnessMap: HAS_SHEEN_ROUGHNESSMAP,

				specularMap: HAS_SPECULARMAP,
				specularColorMap: HAS_SPECULAR_COLORMAP,
				specularIntensityMap: HAS_SPECULAR_INTENSITYMAP,

				transmission: HAS_TRANSMISSION,
				transmissionMap: HAS_TRANSMISSIONMAP,
				thicknessMap: HAS_THICKNESSMAP,

				gradientMap: HAS_GRADIENTMAP,

				opaque: material.transparent === false && material.blending === NormalBlending,

				alphaMap: HAS_ALPHAMAP,
				alphaTest: HAS_ALPHATEST,
				alphaHash: HAS_ALPHAHASH,

				combine: material.combine,

				//

				mapUv: HAS_MAP && getChannel( material.map.channel ),
				aoMapUv: HAS_AOMAP && getChannel( material.aoMap.channel ),
				lightMapUv: HAS_LIGHTMAP && getChannel( material.lightMap.channel ),
				bumpMapUv: HAS_BUMPMAP && getChannel( material.bumpMap.channel ),
				normalMapUv: HAS_NORMALMAP && getChannel( material.normalMap.channel ),
				displacementMapUv: HAS_DISPLACEMENTMAP && getChannel( material.displacementMap.channel ),
				emissiveMapUv: HAS_EMISSIVEMAP && getChannel( material.emissiveMap.channel ),

				metalnessMapUv: HAS_METALNESSMAP && getChannel( material.metalnessMap.channel ),
				roughnessMapUv: HAS_ROUGHNESSMAP && getChannel( material.roughnessMap.channel ),

				anisotropyMapUv: HAS_ANISOTROPYMAP && getChannel( material.anisotropyMap.channel ),

				clearcoatMapUv: HAS_CLEARCOATMAP && getChannel( material.clearcoatMap.channel ),
				clearcoatNormalMapUv: HAS_CLEARCOAT_NORMALMAP && getChannel( material.clearcoatNormalMap.channel ),
				clearcoatRoughnessMapUv: HAS_CLEARCOAT_ROUGHNESSMAP && getChannel( material.clearcoatRoughnessMap.channel ),

				iridescenceMapUv: HAS_IRIDESCENCEMAP && getChannel( material.iridescenceMap.channel ),
				iridescenceThicknessMapUv: HAS_IRIDESCENCE_THICKNESSMAP && getChannel( material.iridescenceThicknessMap.channel ),

				sheenColorMapUv: HAS_SHEEN_COLORMAP && getChannel( material.sheenColorMap.channel ),
				sheenRoughnessMapUv: HAS_SHEEN_ROUGHNESSMAP && getChannel( material.sheenRoughnessMap.channel ),

				specularMapUv: HAS_SPECULARMAP && getChannel( material.specularMap.channel ),
				specularColorMapUv: HAS_SPECULAR_COLORMAP && getChannel( material.specularColorMap.channel ),
				specularIntensityMapUv: HAS_SPECULAR_INTENSITYMAP && getChannel( material.specularIntensityMap.channel ),

				transmissionMapUv: HAS_TRANSMISSIONMAP && getChannel( material.transmissionMap.channel ),
				thicknessMapUv: HAS_THICKNESSMAP && getChannel( material.thicknessMap.channel ),

				alphaMapUv: HAS_ALPHAMAP && getChannel( material.alphaMap.channel ),

				//

				vertexTangents: !! geometry.attributes.tangent && ( HAS_NORMALMAP || HAS_ANISOTROPY ),
				vertexColors: material.vertexColors,
				vertexAlphas: material.vertexColors === true && !! geometry.attributes.color && geometry.attributes.color.itemSize === 4,
				vertexUv1s: HAS_ATTRIBUTE_UV1,
				vertexUv2s: HAS_ATTRIBUTE_UV2,
				vertexUv3s: HAS_ATTRIBUTE_UV3,

				pointsUvs: object.isPoints === true && !! geometry.attributes.uv && ( HAS_MAP || HAS_ALPHAMAP ),

				fog: !! fog,
				useFog: material.fog === true,
				fogExp2: ( fog && fog.isFogExp2 ),

				flatShading: material.flatShading === true,

				sizeAttenuation: material.sizeAttenuation === true,
				logarithmicDepthBuffer: logarithmicDepthBuffer,

				skinning: object.isSkinnedMesh === true,

				morphTargets: geometry.morphAttributes.position !== undefined,
				morphNormals: geometry.morphAttributes.normal !== undefined,
				morphColors: geometry.morphAttributes.color !== undefined,
				morphTargetsCount: morphTargetsCount,
				morphTextureStride: morphTextureStride,

				numDirLights: lights.directional.length,
				numPointLights: lights.point.length,
				numSpotLights: lights.spot.length,
				numSpotLightMaps: lights.spotLightMap.length,
				numRectAreaLights: lights.rectArea.length,
				numHemiLights: lights.hemi.length,

				numDirLightShadows: lights.directionalShadowMap.length,
				numPointLightShadows: lights.pointShadowMap.length,
				numSpotLightShadows: lights.spotShadowMap.length,
				numSpotLightShadowsWithMaps: lights.numSpotLightShadowsWithMaps,

				numLightProbes: lights.numLightProbes,

				numClippingPlanes: clipping.numPlanes,
				numClipIntersection: clipping.numIntersection,

				dithering: material.dithering,

				shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
				shadowMapType: renderer.shadowMap.type,

				toneMapping: toneMapping,
				useLegacyLights: renderer._useLegacyLights,

				decodeVideoTexture: HAS_MAP && ( material.map.isVideoTexture === true ) && ( ColorManagement.getTransfer( material.map.colorSpace ) === SRGBTransfer ),

				premultipliedAlpha: material.premultipliedAlpha,

				doubleSided: material.side === DoubleSide,
				flipSided: material.side === BackSide,

				useDepthPacking: material.depthPacking >= 0,
				depthPacking: material.depthPacking || 0,

				index0AttributeName: material.index0AttributeName,

				extensionDerivatives: HAS_EXTENSIONS && material.extensions.derivatives === true,
				extensionFragDepth: HAS_EXTENSIONS && material.extensions.fragDepth === true,
				extensionDrawBuffers: HAS_EXTENSIONS && material.extensions.drawBuffers === true,
				extensionShaderTextureLOD: HAS_EXTENSIONS && material.extensions.shaderTextureLOD === true,
				extensionClipCullDistance: HAS_EXTENSIONS && material.extensions.clipCullDistance && extensions.has( 'WEBGL_clip_cull_distance' ),

				rendererExtensionFragDepth: IS_WEBGL2 || extensions.has( 'EXT_frag_depth' ),
				rendererExtensionDrawBuffers: IS_WEBGL2 || extensions.has( 'WEBGL_draw_buffers' ),
				rendererExtensionShaderTextureLod: IS_WEBGL2 || extensions.has( 'EXT_shader_texture_lod' ),
				rendererExtensionParallelShaderCompile: extensions.has( 'KHR_parallel_shader_compile' ),

				customProgramCacheKey: material.customProgramCacheKey()

			};

			return parameters;

		}

		function getProgramCacheKey( parameters ) {

			const array = [];

			if ( parameters.shaderID ) {

				array.push( parameters.shaderID );

			} else {

				array.push( parameters.customVertexShaderID );
				array.push( parameters.customFragmentShaderID );

			}

			if ( parameters.defines !== undefined ) {

				for ( const name in parameters.defines ) {

					array.push( name );
					array.push( parameters.defines[ name ] );

				}

			}

			if ( parameters.isRawShaderMaterial === false ) {

				getProgramCacheKeyParameters( array, parameters );
				getProgramCacheKeyBooleans( array, parameters );
				array.push( renderer.outputColorSpace );

			}

			array.push( parameters.customProgramCacheKey );

			return array.join();

		}

		function getProgramCacheKeyParameters( array, parameters ) {

			array.push( parameters.precision );
			array.push( parameters.outputColorSpace );
			array.push( parameters.envMapMode );
			array.push( parameters.envMapCubeUVHeight );
			array.push( parameters.mapUv );
			array.push( parameters.alphaMapUv );
			array.push( parameters.lightMapUv );
			array.push( parameters.aoMapUv );
			array.push( parameters.bumpMapUv );
			array.push( parameters.normalMapUv );
			array.push( parameters.displacementMapUv );
			array.push( parameters.emissiveMapUv );
			array.push( parameters.metalnessMapUv );
			array.push( parameters.roughnessMapUv );
			array.push( parameters.anisotropyMapUv );
			array.push( parameters.clearcoatMapUv );
			array.push( parameters.clearcoatNormalMapUv );
			array.push( parameters.clearcoatRoughnessMapUv );
			array.push( parameters.iridescenceMapUv );
			array.push( parameters.iridescenceThicknessMapUv );
			array.push( parameters.sheenColorMapUv );
			array.push( parameters.sheenRoughnessMapUv );
			array.push( parameters.specularMapUv );
			array.push( parameters.specularColorMapUv );
			array.push( parameters.specularIntensityMapUv );
			array.push( parameters.transmissionMapUv );
			array.push( parameters.thicknessMapUv );
			array.push( parameters.combine );
			array.push( parameters.fogExp2 );
			array.push( parameters.sizeAttenuation );
			array.push( parameters.morphTargetsCount );
			array.push( parameters.morphAttributeCount );
			array.push( parameters.numDirLights );
			array.push( parameters.numPointLights );
			array.push( parameters.numSpotLights );
			array.push( parameters.numSpotLightMaps );
			array.push( parameters.numHemiLights );
			array.push( parameters.numRectAreaLights );
			array.push( parameters.numDirLightShadows );
			array.push( parameters.numPointLightShadows );
			array.push( parameters.numSpotLightShadows );
			array.push( parameters.numSpotLightShadowsWithMaps );
			array.push( parameters.numLightProbes );
			array.push( parameters.shadowMapType );
			array.push( parameters.toneMapping );
			array.push( parameters.numClippingPlanes );
			array.push( parameters.numClipIntersection );
			array.push( parameters.depthPacking );

		}

		function getProgramCacheKeyBooleans( array, parameters ) {

			_programLayers.disableAll();

			if ( parameters.isWebGL2 )
				_programLayers.enable( 0 );
			if ( parameters.supportsVertexTextures )
				_programLayers.enable( 1 );
			if ( parameters.instancing )
				_programLayers.enable( 2 );
			if ( parameters.instancingColor )
				_programLayers.enable( 3 );
			if ( parameters.matcap )
				_programLayers.enable( 4 );
			if ( parameters.envMap )
				_programLayers.enable( 5 );
			if ( parameters.normalMapObjectSpace )
				_programLayers.enable( 6 );
			if ( parameters.normalMapTangentSpace )
				_programLayers.enable( 7 );
			if ( parameters.clearcoat )
				_programLayers.enable( 8 );
			if ( parameters.iridescence )
				_programLayers.enable( 9 );
			if ( parameters.alphaTest )
				_programLayers.enable( 10 );
			if ( parameters.vertexColors )
				_programLayers.enable( 11 );
			if ( parameters.vertexAlphas )
				_programLayers.enable( 12 );
			if ( parameters.vertexUv1s )
				_programLayers.enable( 13 );
			if ( parameters.vertexUv2s )
				_programLayers.enable( 14 );
			if ( parameters.vertexUv3s )
				_programLayers.enable( 15 );
			if ( parameters.vertexTangents )
				_programLayers.enable( 16 );
			if ( parameters.anisotropy )
				_programLayers.enable( 17 );
			if ( parameters.alphaHash )
				_programLayers.enable( 18 );
			if ( parameters.batching )
				_programLayers.enable( 19 );

			array.push( _programLayers.mask );
			_programLayers.disableAll();

			if ( parameters.fog )
				_programLayers.enable( 0 );
			if ( parameters.useFog )
				_programLayers.enable( 1 );
			if ( parameters.flatShading )
				_programLayers.enable( 2 );
			if ( parameters.logarithmicDepthBuffer )
				_programLayers.enable( 3 );
			if ( parameters.skinning )
				_programLayers.enable( 4 );
			if ( parameters.morphTargets )
				_programLayers.enable( 5 );
			if ( parameters.morphNormals )
				_programLayers.enable( 6 );
			if ( parameters.morphColors )
				_programLayers.enable( 7 );
			if ( parameters.premultipliedAlpha )
				_programLayers.enable( 8 );
			if ( parameters.shadowMapEnabled )
				_programLayers.enable( 9 );
			if ( parameters.useLegacyLights )
				_programLayers.enable( 10 );
			if ( parameters.doubleSided )
				_programLayers.enable( 11 );
			if ( parameters.flipSided )
				_programLayers.enable( 12 );
			if ( parameters.useDepthPacking )
				_programLayers.enable( 13 );
			if ( parameters.dithering )
				_programLayers.enable( 14 );
			if ( parameters.transmission )
				_programLayers.enable( 15 );
			if ( parameters.sheen )
				_programLayers.enable( 16 );
			if ( parameters.opaque )
				_programLayers.enable( 17 );
			if ( parameters.pointsUvs )
				_programLayers.enable( 18 );
			if ( parameters.decodeVideoTexture )
				_programLayers.enable( 19 );

			array.push( _programLayers.mask );

		}

		function getUniforms( material ) {

			const shaderID = shaderIDs[ material.type ];
			let uniforms;

			if ( shaderID ) {

				const shader = ShaderLib[ shaderID ];
				uniforms = UniformsUtils.clone( shader.uniforms );

			} else {

				uniforms = material.uniforms;

			}

			return uniforms;

		}

		function acquireProgram( parameters, cacheKey ) {

			let program;

			// Check if code has been already compiled
			for ( let p = 0, pl = programs.length; p < pl; p ++ ) {

				const preexistingProgram = programs[ p ];

				if ( preexistingProgram.cacheKey === cacheKey ) {

					program = preexistingProgram;
					++ program.usedTimes;

					break;

				}

			}

			if ( program === undefined ) {

				program = new WebGLProgram( renderer, cacheKey, parameters, bindingStates );
				programs.push( program );

			}

			return program;

		}

		function releaseProgram( program ) {

			if ( -- program.usedTimes === 0 ) {

				// Remove from unordered set
				const i = programs.indexOf( program );
				programs[ i ] = programs[ programs.length - 1 ];
				programs.pop();

				// Free WebGL resources
				program.destroy();

			}

		}

		function releaseShaderCache( material ) {

			_customShaders.remove( material );

		}

		function dispose() {

			_customShaders.dispose();

		}

		return {
			getParameters: getParameters,
			getProgramCacheKey: getProgramCacheKey,
			getUniforms: getUniforms,
			acquireProgram: acquireProgram,
			releaseProgram: releaseProgram,
			releaseShaderCache: releaseShaderCache,
			// Exposed for resource monitoring & error feedback via renderer.info:
			programs: programs,
			dispose: dispose
		};

	}

	function WebGLProperties() {

		let properties = new WeakMap();

		function get( object ) {

			let map = properties.get( object );

			if ( map === undefined ) {

				map = {};
				properties.set( object, map );

			}

			return map;

		}

		function remove( object ) {

			properties.delete( object );

		}

		function update( object, key, value ) {

			properties.get( object )[ key ] = value;

		}

		function dispose() {

			properties = new WeakMap();

		}

		return {
			get: get,
			remove: remove,
			update: update,
			dispose: dispose
		};

	}

	function painterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.material.id !== b.material.id ) {

			return a.material.id - b.material.id;

		} else if ( a.z !== b.z ) {

			return a.z - b.z;

		} else {

			return a.id - b.id;

		}

	}

	function reversePainterSortStable( a, b ) {

		if ( a.groupOrder !== b.groupOrder ) {

			return a.groupOrder - b.groupOrder;

		} else if ( a.renderOrder !== b.renderOrder ) {

			return a.renderOrder - b.renderOrder;

		} else if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return a.id - b.id;

		}

	}


	function WebGLRenderList() {

		const renderItems = [];
		let renderItemsIndex = 0;

		const opaque = [];
		const transmissive = [];
		const transparent = [];

		function init() {

			renderItemsIndex = 0;

			opaque.length = 0;
			transmissive.length = 0;
			transparent.length = 0;

		}

		function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

			let renderItem = renderItems[ renderItemsIndex ];

			if ( renderItem === undefined ) {

				renderItem = {
					id: object.id,
					object: object,
					geometry: geometry,
					material: material,
					groupOrder: groupOrder,
					renderOrder: object.renderOrder,
					z: z,
					group: group
				};

				renderItems[ renderItemsIndex ] = renderItem;

			} else {

				renderItem.id = object.id;
				renderItem.object = object;
				renderItem.geometry = geometry;
				renderItem.material = material;
				renderItem.groupOrder = groupOrder;
				renderItem.renderOrder = object.renderOrder;
				renderItem.z = z;
				renderItem.group = group;

			}

			renderItemsIndex ++;

			return renderItem;

		}

		function push( object, geometry, material, groupOrder, z, group ) {

			const renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			if ( material.transmission > 0.0 ) {

				transmissive.push( renderItem );

			} else if ( material.transparent === true ) {

				transparent.push( renderItem );

			} else {

				opaque.push( renderItem );

			}

		}

		function unshift( object, geometry, material, groupOrder, z, group ) {

			const renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

			if ( material.transmission > 0.0 ) {

				transmissive.unshift( renderItem );

			} else if ( material.transparent === true ) {

				transparent.unshift( renderItem );

			} else {

				opaque.unshift( renderItem );

			}

		}

		function sort( customOpaqueSort, customTransparentSort ) {

			if ( opaque.length > 1 ) opaque.sort( customOpaqueSort || painterSortStable );
			if ( transmissive.length > 1 ) transmissive.sort( customTransparentSort || reversePainterSortStable );
			if ( transparent.length > 1 ) transparent.sort( customTransparentSort || reversePainterSortStable );

		}

		function finish() {

			// Clear references from inactive renderItems in the list

			for ( let i = renderItemsIndex, il = renderItems.length; i < il; i ++ ) {

				const renderItem = renderItems[ i ];

				if ( renderItem.id === null ) break;

				renderItem.id = null;
				renderItem.object = null;
				renderItem.geometry = null;
				renderItem.material = null;
				renderItem.group = null;

			}

		}

		return {

			opaque: opaque,
			transmissive: transmissive,
			transparent: transparent,

			init: init,
			push: push,
			unshift: unshift,
			finish: finish,

			sort: sort
		};

	}

	function WebGLRenderLists() {

		let lists = new WeakMap();

		function get( scene, renderCallDepth ) {

			const listArray = lists.get( scene );
			let list;

			if ( listArray === undefined ) {

				list = new WebGLRenderList();
				lists.set( scene, [ list ] );

			} else {

				if ( renderCallDepth >= listArray.length ) {

					list = new WebGLRenderList();
					listArray.push( list );

				} else {

					list = listArray[ renderCallDepth ];

				}

			}

			return list;

		}

		function dispose() {

			lists = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	function UniformsCache() {

		const lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				let uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							direction: new Vector3(),
							color: new Color()
						};
						break;

					case 'SpotLight':
						uniforms = {
							position: new Vector3(),
							direction: new Vector3(),
							color: new Color(),
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0
						};
						break;

					case 'PointLight':
						uniforms = {
							position: new Vector3(),
							color: new Color(),
							distance: 0,
							decay: 0
						};
						break;

					case 'HemisphereLight':
						uniforms = {
							direction: new Vector3(),
							skyColor: new Color(),
							groundColor: new Color()
						};
						break;

					case 'RectAreaLight':
						uniforms = {
							color: new Color(),
							position: new Vector3(),
							halfWidth: new Vector3(),
							halfHeight: new Vector3()
						};
						break;

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}

	function ShadowUniformsCache() {

		const lights = {};

		return {

			get: function ( light ) {

				if ( lights[ light.id ] !== undefined ) {

					return lights[ light.id ];

				}

				let uniforms;

				switch ( light.type ) {

					case 'DirectionalLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'SpotLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2()
						};
						break;

					case 'PointLight':
						uniforms = {
							shadowBias: 0,
							shadowNormalBias: 0,
							shadowRadius: 1,
							shadowMapSize: new Vector2(),
							shadowCameraNear: 1,
							shadowCameraFar: 1000
						};
						break;

					// TODO (abelnation): set RectAreaLight shadow uniforms

				}

				lights[ light.id ] = uniforms;

				return uniforms;

			}

		};

	}



	let nextVersion = 0;

	function shadowCastingAndTexturingLightsFirst( lightA, lightB ) {

		return ( lightB.castShadow ? 2 : 0 ) - ( lightA.castShadow ? 2 : 0 ) + ( lightB.map ? 1 : 0 ) - ( lightA.map ? 1 : 0 );

	}

	function WebGLLights( extensions, capabilities ) {

		const cache = new UniformsCache();

		const shadowCache = ShadowUniformsCache();

		const state = {

			version: 0,

			hash: {
				directionalLength: - 1,
				pointLength: - 1,
				spotLength: - 1,
				rectAreaLength: - 1,
				hemiLength: - 1,

				numDirectionalShadows: - 1,
				numPointShadows: - 1,
				numSpotShadows: - 1,
				numSpotMaps: - 1,

				numLightProbes: - 1
			},

			ambient: [ 0, 0, 0 ],
			probe: [],
			directional: [],
			directionalShadow: [],
			directionalShadowMap: [],
			directionalShadowMatrix: [],
			spot: [],
			spotLightMap: [],
			spotShadow: [],
			spotShadowMap: [],
			spotLightMatrix: [],
			rectArea: [],
			rectAreaLTC1: null,
			rectAreaLTC2: null,
			point: [],
			pointShadow: [],
			pointShadowMap: [],
			pointShadowMatrix: [],
			hemi: [],
			numSpotLightShadowsWithMaps: 0,
			numLightProbes: 0

		};

		for ( let i = 0; i < 9; i ++ ) state.probe.push( new Vector3() );

		const vector3 = new Vector3();
		const matrix4 = new Matrix4();
		const matrix42 = new Matrix4();

		function setup( lights, useLegacyLights ) {

			let r = 0, g = 0, b = 0;

			for ( let i = 0; i < 9; i ++ ) state.probe[ i ].set( 0, 0, 0 );

			let directionalLength = 0;
			let pointLength = 0;
			let spotLength = 0;
			let rectAreaLength = 0;
			let hemiLength = 0;

			let numDirectionalShadows = 0;
			let numPointShadows = 0;
			let numSpotShadows = 0;
			let numSpotMaps = 0;
			let numSpotShadowsWithMaps = 0;

			let numLightProbes = 0;

			// ordering : [shadow casting + map texturing, map texturing, shadow casting, none ]
			lights.sort( shadowCastingAndTexturingLightsFirst );

			// artist-friendly light intensity scaling factor
			const scaleFactor = ( useLegacyLights === true ) ? Math.PI : 1;

			for ( let i = 0, l = lights.length; i < l; i ++ ) {

				const light = lights[ i ];

				const color = light.color;
				const intensity = light.intensity;
				const distance = light.distance;

				const shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;

				if ( light.isAmbientLight ) {

					r += color.r * intensity * scaleFactor;
					g += color.g * intensity * scaleFactor;
					b += color.b * intensity * scaleFactor;

				} else if ( light.isLightProbe ) {

					for ( let j = 0; j < 9; j ++ ) {

						state.probe[ j ].addScaledVector( light.sh.coefficients[ j ], intensity );

					}

					numLightProbes ++;

				} else if ( light.isDirectionalLight ) {

					const uniforms = cache.get( light );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity * scaleFactor );

					if ( light.castShadow ) {

						const shadow = light.shadow;

						const shadowUniforms = shadowCache.get( light );

						shadowUniforms.shadowBias = shadow.bias;
						shadowUniforms.shadowNormalBias = shadow.normalBias;
						shadowUniforms.shadowRadius = shadow.radius;
						shadowUniforms.shadowMapSize = shadow.mapSize;

						state.directionalShadow[ directionalLength ] = shadowUniforms;
						state.directionalShadowMap[ directionalLength ] = shadowMap;
						state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;

						numDirectionalShadows ++;

					}

					state.directional[ directionalLength ] = uniforms;

					directionalLength ++;

				} else if ( light.isSpotLight ) {

					const uniforms = cache.get( light );

					uniforms.position.setFromMatrixPosition( light.matrixWorld );

					uniforms.color.copy( color ).multiplyScalar( intensity * scaleFactor );
					uniforms.distance = distance;

					uniforms.coneCos = Math.cos( light.angle );
					uniforms.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
					uniforms.decay = light.decay;

					state.spot[ spotLength ] = uniforms;

					const shadow = light.shadow;

					if ( light.map ) {

						state.spotLightMap[ numSpotMaps ] = light.map;
						numSpotMaps ++;

						// make sure the lightMatrix is up to date
						// TODO : do it if required only
						shadow.updateMatrices( light );

						if ( light.castShadow ) numSpotShadowsWithMaps ++;

					}

					state.spotLightMatrix[ spotLength ] = shadow.matrix;

					if ( light.castShadow ) {

						const shadowUniforms = shadowCache.get( light );

						shadowUniforms.shadowBias = shadow.bias;
						shadowUniforms.shadowNormalBias = shadow.normalBias;
						shadowUniforms.shadowRadius = shadow.radius;
						shadowUniforms.shadowMapSize = shadow.mapSize;

						state.spotShadow[ spotLength ] = shadowUniforms;
						state.spotShadowMap[ spotLength ] = shadowMap;

						numSpotShadows ++;

					}

					spotLength ++;

				} else if ( light.isRectAreaLight ) {

					const uniforms = cache.get( light );

					uniforms.color.copy( color ).multiplyScalar( intensity );

					uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
					uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

					state.rectArea[ rectAreaLength ] = uniforms;

					rectAreaLength ++;

				} else if ( light.isPointLight ) {

					const uniforms = cache.get( light );

					uniforms.color.copy( light.color ).multiplyScalar( light.intensity * scaleFactor );
					uniforms.distance = light.distance;
					uniforms.decay = light.decay;

					if ( light.castShadow ) {

						const shadow = light.shadow;

						const shadowUniforms = shadowCache.get( light );

						shadowUniforms.shadowBias = shadow.bias;
						shadowUniforms.shadowNormalBias = shadow.normalBias;
						shadowUniforms.shadowRadius = shadow.radius;
						shadowUniforms.shadowMapSize = shadow.mapSize;
						shadowUniforms.shadowCameraNear = shadow.camera.near;
						shadowUniforms.shadowCameraFar = shadow.camera.far;

						state.pointShadow[ pointLength ] = shadowUniforms;
						state.pointShadowMap[ pointLength ] = shadowMap;
						state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;

						numPointShadows ++;

					}

					state.point[ pointLength ] = uniforms;

					pointLength ++;

				} else if ( light.isHemisphereLight ) {

					const uniforms = cache.get( light );

					uniforms.skyColor.copy( light.color ).multiplyScalar( intensity * scaleFactor );
					uniforms.groundColor.copy( light.groundColor ).multiplyScalar( intensity * scaleFactor );

					state.hemi[ hemiLength ] = uniforms;

					hemiLength ++;

				}

			}

			if ( rectAreaLength > 0 ) {

				if ( capabilities.isWebGL2 ) {

					// WebGL 2

					if ( extensions.has( 'OES_texture_float_linear' ) === true ) {

						state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
						state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;

					} else {

						state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
						state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;

					}

				} else {

					// WebGL 1

					if ( extensions.has( 'OES_texture_float_linear' ) === true ) {

						state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
						state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;

					} else if ( extensions.has( 'OES_texture_half_float_linear' ) === true ) {

						state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
						state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;

					} else {

						console.error( 'THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.' );

					}

				}

			}

			state.ambient[ 0 ] = r;
			state.ambient[ 1 ] = g;
			state.ambient[ 2 ] = b;

			const hash = state.hash;

			if ( hash.directionalLength !== directionalLength ||
				hash.pointLength !== pointLength ||
				hash.spotLength !== spotLength ||
				hash.rectAreaLength !== rectAreaLength ||
				hash.hemiLength !== hemiLength ||
				hash.numDirectionalShadows !== numDirectionalShadows ||
				hash.numPointShadows !== numPointShadows ||
				hash.numSpotShadows !== numSpotShadows ||
				hash.numSpotMaps !== numSpotMaps ||
				hash.numLightProbes !== numLightProbes ) {

				state.directional.length = directionalLength;
				state.spot.length = spotLength;
				state.rectArea.length = rectAreaLength;
				state.point.length = pointLength;
				state.hemi.length = hemiLength;

				state.directionalShadow.length = numDirectionalShadows;
				state.directionalShadowMap.length = numDirectionalShadows;
				state.pointShadow.length = numPointShadows;
				state.pointShadowMap.length = numPointShadows;
				state.spotShadow.length = numSpotShadows;
				state.spotShadowMap.length = numSpotShadows;
				state.directionalShadowMatrix.length = numDirectionalShadows;
				state.pointShadowMatrix.length = numPointShadows;
				state.spotLightMatrix.length = numSpotShadows + numSpotMaps - numSpotShadowsWithMaps;
				state.spotLightMap.length = numSpotMaps;
				state.numSpotLightShadowsWithMaps = numSpotShadowsWithMaps;
				state.numLightProbes = numLightProbes;

				hash.directionalLength = directionalLength;
				hash.pointLength = pointLength;
				hash.spotLength = spotLength;
				hash.rectAreaLength = rectAreaLength;
				hash.hemiLength = hemiLength;

				hash.numDirectionalShadows = numDirectionalShadows;
				hash.numPointShadows = numPointShadows;
				hash.numSpotShadows = numSpotShadows;
				hash.numSpotMaps = numSpotMaps;

				hash.numLightProbes = numLightProbes;

				state.version = nextVersion ++;

			}

		}

		function setupView( lights, camera ) {

			let directionalLength = 0;
			let pointLength = 0;
			let spotLength = 0;
			let rectAreaLength = 0;
			let hemiLength = 0;

			const viewMatrix = camera.matrixWorldInverse;

			for ( let i = 0, l = lights.length; i < l; i ++ ) {

				const light = lights[ i ];

				if ( light.isDirectionalLight ) {

					const uniforms = state.directional[ directionalLength ];

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					directionalLength ++;

				} else if ( light.isSpotLight ) {

					const uniforms = state.spot[ spotLength ];

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					vector3.setFromMatrixPosition( light.target.matrixWorld );
					uniforms.direction.sub( vector3 );
					uniforms.direction.transformDirection( viewMatrix );

					spotLength ++;

				} else if ( light.isRectAreaLight ) {

					const uniforms = state.rectArea[ rectAreaLength ];

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					// extract local rotation of light to derive width/height half vectors
					matrix42.identity();
					matrix4.copy( light.matrixWorld );
					matrix4.premultiply( viewMatrix );
					matrix42.extractRotation( matrix4 );

					uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
					uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

					uniforms.halfWidth.applyMatrix4( matrix42 );
					uniforms.halfHeight.applyMatrix4( matrix42 );

					rectAreaLength ++;

				} else if ( light.isPointLight ) {

					const uniforms = state.point[ pointLength ];

					uniforms.position.setFromMatrixPosition( light.matrixWorld );
					uniforms.position.applyMatrix4( viewMatrix );

					pointLength ++;

				} else if ( light.isHemisphereLight ) {

					const uniforms = state.hemi[ hemiLength ];

					uniforms.direction.setFromMatrixPosition( light.matrixWorld );
					uniforms.direction.transformDirection( viewMatrix );

					hemiLength ++;

				}

			}

		}

		return {
			setup: setup,
			setupView: setupView,
			state: state
		};

	}

	function WebGLRenderState( extensions, capabilities ) {

		const lights = new WebGLLights( extensions, capabilities );

		const lightsArray = [];
		const shadowsArray = [];

		function init() {

			lightsArray.length = 0;
			shadowsArray.length = 0;

		}

		function pushLight( light ) {

			lightsArray.push( light );

		}

		function pushShadow( shadowLight ) {

			shadowsArray.push( shadowLight );

		}

		function setupLights( useLegacyLights ) {

			lights.setup( lightsArray, useLegacyLights );

		}

		function setupLightsView( camera ) {

			lights.setupView( lightsArray, camera );

		}

		const state = {
			lightsArray: lightsArray,
			shadowsArray: shadowsArray,

			lights: lights
		};

		return {
			init: init,
			state: state,
			setupLights: setupLights,
			setupLightsView: setupLightsView,

			pushLight: pushLight,
			pushShadow: pushShadow
		};

	}

	function WebGLRenderStates( extensions, capabilities ) {

		let renderStates = new WeakMap();

		function get( scene, renderCallDepth = 0 ) {

			const renderStateArray = renderStates.get( scene );
			let renderState;

			if ( renderStateArray === undefined ) {

				renderState = new WebGLRenderState( extensions, capabilities );
				renderStates.set( scene, [ renderState ] );

			} else {

				if ( renderCallDepth >= renderStateArray.length ) {

					renderState = new WebGLRenderState( extensions, capabilities );
					renderStateArray.push( renderState );

				} else {

					renderState = renderStateArray[ renderCallDepth ];

				}

			}

			return renderState;

		}

		function dispose() {

			renderStates = new WeakMap();

		}

		return {
			get: get,
			dispose: dispose
		};

	}

	class MeshDepthMaterial extends Material {

		constructor( parameters ) {

			super();

			this.isMeshDepthMaterial = true;

			this.type = 'MeshDepthMaterial';

			this.depthPacking = BasicDepthPacking;

			this.map = null;

			this.alphaMap = null;

			this.displacementMap = null;
			this.displacementScale = 1;
			this.displacementBias = 0;

			this.wireframe = false;
			this.wireframeLinewidth = 1;

			this.setValues( parameters );

		}

		copy( source ) {

			super.copy( source );

			this.depthPacking = source.depthPacking;

			this.map = source.map;

			this.alphaMap = source.alphaMap;

			this.displacementMap = source.displacementMap;
			this.displacementScale = source.displacementScale;
			this.displacementBias = source.displacementBias;

			this.wireframe = source.wireframe;
			this.wireframeLinewidth = source.wireframeLinewidth;

			return this;

		}

	}

	class MeshDistanceMaterial extends Material {

		constructor( parameters ) {

			super();

			this.isMeshDistanceMaterial = true;

			this.type = 'MeshDistanceMaterial';

			this.map = null;

			this.alphaMap = null;

			this.displacementMap = null;
			this.displacementScale = 1;
			this.displacementBias = 0;

			this.setValues( parameters );

		}

		copy( source ) {

			super.copy( source );

			this.map = source.map;

			this.alphaMap = source.alphaMap;

			this.displacementMap = source.displacementMap;
			this.displacementScale = source.displacementScale;
			this.displacementBias = source.displacementBias;

			return this;

		}

	}

	const vertex = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";

	const fragment = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";

	function WebGLShadowMap( _renderer, _objects, _capabilities ) {

		let _frustum = new Frustum();

		const _shadowMapSize = new Vector2(),
			_viewportSize = new Vector2(),

			_viewport = new Vector4(),

			_depthMaterial = new MeshDepthMaterial( { depthPacking: RGBADepthPacking } ),
			_distanceMaterial = new MeshDistanceMaterial(),

			_materialCache = {},

			_maxTextureSize = _capabilities.maxTextureSize;

		const shadowSide = { [ FrontSide ]: BackSide, [ BackSide ]: FrontSide, [ DoubleSide ]: DoubleSide };

		const shadowMaterialVertical = new ShaderMaterial( {
			defines: {
				VSM_SAMPLES: 8
			},
			uniforms: {
				shadow_pass: { value: null },
				resolution: { value: new Vector2() },
				radius: { value: 4.0 }
			},

			vertexShader: vertex,
			fragmentShader: fragment

		} );

		const shadowMaterialHorizontal = shadowMaterialVertical.clone();
		shadowMaterialHorizontal.defines.HORIZONTAL_PASS = 1;

		const fullScreenTri = new BufferGeometry();
		fullScreenTri.setAttribute(
			'position',
			new BufferAttribute(
				new Float32Array( [ - 1, - 1, 0.5, 3, - 1, 0.5, - 1, 3, 0.5 ] ),
				3
			)
		);

		const fullScreenMesh = new Mesh( fullScreenTri, shadowMaterialVertical );

		const scope = this;

		this.enabled = false;

		this.autoUpdate = true;
		this.needsUpdate = false;

		this.type = PCFShadowMap;
		let _previousType = this.type;

		this.render = function ( lights, scene, camera ) {

			if ( scope.enabled === false ) return;
			if ( scope.autoUpdate === false && scope.needsUpdate === false ) return;

			if ( lights.length === 0 ) return;

			const currentRenderTarget = _renderer.getRenderTarget();
			const activeCubeFace = _renderer.getActiveCubeFace();
			const activeMipmapLevel = _renderer.getActiveMipmapLevel();

			const _state = _renderer.state;

			// Set GL state for depth map.
			_state.setBlending( NoBlending );
			_state.buffers.color.setClear( 1, 1, 1, 1 );
			_state.buffers.depth.setTest( true );
			_state.setScissorTest( false );

			// check for shadow map type changes

			const toVSM = ( _previousType !== VSMShadowMap && this.type === VSMShadowMap );
			const fromVSM = ( _previousType === VSMShadowMap && this.type !== VSMShadowMap );

			// render depth map

			for ( let i = 0, il = lights.length; i < il; i ++ ) {

				const light = lights[ i ];
				const shadow = light.shadow;

				if ( shadow === undefined ) {

					console.warn( 'THREE.WebGLShadowMap:', light, 'has no shadow.' );
					continue;

				}

				if ( shadow.autoUpdate === false && shadow.needsUpdate === false ) continue;

				_shadowMapSize.copy( shadow.mapSize );

				const shadowFrameExtents = shadow.getFrameExtents();

				_shadowMapSize.multiply( shadowFrameExtents );

				_viewportSize.copy( shadow.mapSize );

				if ( _shadowMapSize.x > _maxTextureSize || _shadowMapSize.y > _maxTextureSize ) {

					if ( _shadowMapSize.x > _maxTextureSize ) {

						_viewportSize.x = Math.floor( _maxTextureSize / shadowFrameExtents.x );
						_shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
						shadow.mapSize.x = _viewportSize.x;

					}

					if ( _shadowMapSize.y > _maxTextureSize ) {

						_viewportSize.y = Math.floor( _maxTextureSize / shadowFrameExtents.y );
						_shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
						shadow.mapSize.y = _viewportSize.y;

					}

				}

				if ( shadow.map === null || toVSM === true || fromVSM === true ) {

					const pars = ( this.type !== VSMShadowMap ) ? { minFilter: NearestFilter, magFilter: NearestFilter } : {};

					if ( shadow.map !== null ) {

						shadow.map.dispose();

					}

					shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
					shadow.map.texture.name = light.name + '.shadowMap';

					shadow.camera.updateProjectionMatrix();

				}

				_renderer.setRenderTarget( shadow.map );
				_renderer.clear();

				const viewportCount = shadow.getViewportCount();

				for ( let vp = 0; vp < viewportCount; vp ++ ) {

					const viewport = shadow.getViewport( vp );

					_viewport.set(
						_viewportSize.x * viewport.x,
						_viewportSize.y * viewport.y,
						_viewportSize.x * viewport.z,
						_viewportSize.y * viewport.w
					);

					_state.viewport( _viewport );

					shadow.updateMatrices( light, vp );

					_frustum = shadow.getFrustum();

					renderObject( scene, camera, shadow.camera, light, this.type );

				}

				// do blur pass for VSM

				if ( shadow.isPointLightShadow !== true && this.type === VSMShadowMap ) {

					VSMPass( shadow, camera );

				}

				shadow.needsUpdate = false;

			}

			_previousType = this.type;

			scope.needsUpdate = false;

			_renderer.setRenderTarget( currentRenderTarget, activeCubeFace, activeMipmapLevel );

		};

		function VSMPass( shadow, camera ) {

			const geometry = _objects.update( fullScreenMesh );

			if ( shadowMaterialVertical.defines.VSM_SAMPLES !== shadow.blurSamples ) {

				shadowMaterialVertical.defines.VSM_SAMPLES = shadow.blurSamples;
				shadowMaterialHorizontal.defines.VSM_SAMPLES = shadow.blurSamples;

				shadowMaterialVertical.needsUpdate = true;
				shadowMaterialHorizontal.needsUpdate = true;

			}

			if ( shadow.mapPass === null ) {

				shadow.mapPass = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y );

			}

			// vertical pass

			shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
			shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
			shadowMaterialVertical.uniforms.radius.value = shadow.radius;
			_renderer.setRenderTarget( shadow.mapPass );
			_renderer.clear();
			_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null );

			// horizontal pass

			shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
			shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
			shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
			_renderer.setRenderTarget( shadow.map );
			_renderer.clear();
			_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialHorizontal, fullScreenMesh, null );

		}

		function getDepthMaterial( object, material, light, type ) {

			let result = null;

			const customMaterial = ( light.isPointLight === true ) ? object.customDistanceMaterial : object.customDepthMaterial;

			if ( customMaterial !== undefined ) {

				result = customMaterial;

			} else {

				result = ( light.isPointLight === true ) ? _distanceMaterial : _depthMaterial;

				if ( ( _renderer.localClippingEnabled && material.clipShadows === true && Array.isArray( material.clippingPlanes ) && material.clippingPlanes.length !== 0 ) ||
					( material.displacementMap && material.displacementScale !== 0 ) ||
					( material.alphaMap && material.alphaTest > 0 ) ||
					( material.map && material.alphaTest > 0 ) ) {

					// in this case we need a unique material instance reflecting the
					// appropriate state

					const keyA = result.uuid, keyB = material.uuid;

					let materialsForVariant = _materialCache[ keyA ];

					if ( materialsForVariant === undefined ) {

						materialsForVariant = {};
						_materialCache[ keyA ] = materialsForVariant;

					}

					let cachedMaterial = materialsForVariant[ keyB ];

					if ( cachedMaterial === undefined ) {

						cachedMaterial = result.clone();
						materialsForVariant[ keyB ] = cachedMaterial;
						material.addEventListener( 'dispose', onMaterialDispose );

					}

					result = cachedMaterial;

				}

			}

			result.visible = material.visible;
			result.wireframe = material.wireframe;

			if ( type === VSMShadowMap ) {

				result.side = ( material.shadowSide !== null ) ? material.shadowSide : material.side;

			} else {

				result.side = ( material.shadowSide !== null ) ? material.shadowSide : shadowSide[ material.side ];

			}

			result.alphaMap = material.alphaMap;
			result.alphaTest = material.alphaTest;
			result.map = material.map;

			result.clipShadows = material.clipShadows;
			result.clippingPlanes = material.clippingPlanes;
			result.clipIntersection = material.clipIntersection;

			result.displacementMap = material.displacementMap;
			result.displacementScale = material.displacementScale;
			result.displacementBias = material.displacementBias;

			result.wireframeLinewidth = material.wireframeLinewidth;
			result.linewidth = material.linewidth;

			if ( light.isPointLight === true && result.isMeshDistanceMaterial === true ) {

				const materialProperties = _renderer.properties.get( result );
				materialProperties.light = light;

			}

			return result;

		}

		function renderObject( object, camera, shadowCamera, light, type ) {

			if ( object.visible === false ) return;

			const visible = object.layers.test( camera.layers );

			if ( visible && ( object.isMesh || object.isLine || object.isPoints ) ) {

				if ( ( object.castShadow || ( object.receiveShadow && type === VSMShadowMap ) ) && ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) ) {

					object.modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

					const geometry = _objects.update( object );
					const material = object.material;

					if ( Array.isArray( material ) ) {

						const groups = geometry.groups;

						for ( let k = 0, kl = groups.length; k < kl; k ++ ) {

							const group = groups[ k ];
							const groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								const depthMaterial = getDepthMaterial( object, groupMaterial, light, type );

								object.onBeforeShadow( _renderer, object, camera, shadowCamera, geometry, depthMaterial, group );

								_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, group );

								object.onAfterShadow( _renderer, object, camera, shadowCamera, geometry, depthMaterial, group );

							}

						}

					} else if ( material.visible ) {

						const depthMaterial = getDepthMaterial( object, material, light, type );

						object.onBeforeShadow( _renderer, object, camera, shadowCamera, geometry, depthMaterial, null );

						_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, null );

						object.onAfterShadow( _renderer, object, camera, shadowCamera, geometry, depthMaterial, null );

					}

				}

			}

			const children = object.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				renderObject( children[ i ], camera, shadowCamera, light, type );

			}

		}

		function onMaterialDispose( event ) {

			const material = event.target;

			material.removeEventListener( 'dispose', onMaterialDispose );

			// make sure to remove the unique distance/depth materials used for shadow map rendering

			for ( const id in _materialCache ) {

				const cache = _materialCache[ id ];

				const uuid = event.target.uuid;

				if ( uuid in cache ) {

					const shadowMaterial = cache[ uuid ];
					shadowMaterial.dispose();
					delete cache[ uuid ];

				}

			}

		}

	}

	function WebGLState( gl, extensions, capabilities ) {

		const isWebGL2 = capabilities.isWebGL2;

		function ColorBuffer() {

			let locked = false;

			const color = new Vector4();
			let currentColorMask = null;
			const currentColorClear = new Vector4( 0, 0, 0, 0 );

			return {

				setMask: function ( colorMask ) {

					if ( currentColorMask !== colorMask && ! locked ) {

						gl.colorMask( colorMask, colorMask, colorMask, colorMask );
						currentColorMask = colorMask;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( r, g, b, a, premultipliedAlpha ) {

					if ( premultipliedAlpha === true ) {

						r *= a; g *= a; b *= a;

					}

					color.set( r, g, b, a );

					if ( currentColorClear.equals( color ) === false ) {

						gl.clearColor( r, g, b, a );
						currentColorClear.copy( color );

					}

				},

				reset: function () {

					locked = false;

					currentColorMask = null;
					currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

				}

			};

		}

		function DepthBuffer() {

			let locked = false;

			let currentDepthMask = null;
			let currentDepthFunc = null;
			let currentDepthClear = null;

			return {

				setTest: function ( depthTest ) {

					if ( depthTest ) {

						enable( gl.DEPTH_TEST );

					} else {

						disable( gl.DEPTH_TEST );

					}

				},

				setMask: function ( depthMask ) {

					if ( currentDepthMask !== depthMask && ! locked ) {

						gl.depthMask( depthMask );
						currentDepthMask = depthMask;

					}

				},

				setFunc: function ( depthFunc ) {

					if ( currentDepthFunc !== depthFunc ) {

						switch ( depthFunc ) {

							case NeverDepth:

								gl.depthFunc( gl.NEVER );
								break;

							case AlwaysDepth:

								gl.depthFunc( gl.ALWAYS );
								break;

							case LessDepth:

								gl.depthFunc( gl.LESS );
								break;

							case LessEqualDepth:

								gl.depthFunc( gl.LEQUAL );
								break;

							case EqualDepth:

								gl.depthFunc( gl.EQUAL );
								break;

							case GreaterEqualDepth:

								gl.depthFunc( gl.GEQUAL );
								break;

							case GreaterDepth:

								gl.depthFunc( gl.GREATER );
								break;

							case NotEqualDepth:

								gl.depthFunc( gl.NOTEQUAL );
								break;

							default:

								gl.depthFunc( gl.LEQUAL );

						}

						currentDepthFunc = depthFunc;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( depth ) {

					if ( currentDepthClear !== depth ) {

						gl.clearDepth( depth );
						currentDepthClear = depth;

					}

				},

				reset: function () {

					locked = false;

					currentDepthMask = null;
					currentDepthFunc = null;
					currentDepthClear = null;

				}

			};

		}

		function StencilBuffer() {

			let locked = false;

			let currentStencilMask = null;
			let currentStencilFunc = null;
			let currentStencilRef = null;
			let currentStencilFuncMask = null;
			let currentStencilFail = null;
			let currentStencilZFail = null;
			let currentStencilZPass = null;
			let currentStencilClear = null;

			return {

				setTest: function ( stencilTest ) {

					if ( ! locked ) {

						if ( stencilTest ) {

							enable( gl.STENCIL_TEST );

						} else {

							disable( gl.STENCIL_TEST );

						}

					}

				},

				setMask: function ( stencilMask ) {

					if ( currentStencilMask !== stencilMask && ! locked ) {

						gl.stencilMask( stencilMask );
						currentStencilMask = stencilMask;

					}

				},

				setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

					if ( currentStencilFunc !== stencilFunc ||
					     currentStencilRef !== stencilRef ||
					     currentStencilFuncMask !== stencilMask ) {

						gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

						currentStencilFunc = stencilFunc;
						currentStencilRef = stencilRef;
						currentStencilFuncMask = stencilMask;

					}

				},

				setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

					if ( currentStencilFail !== stencilFail ||
					     currentStencilZFail !== stencilZFail ||
					     currentStencilZPass !== stencilZPass ) {

						gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

						currentStencilFail = stencilFail;
						currentStencilZFail = stencilZFail;
						currentStencilZPass = stencilZPass;

					}

				},

				setLocked: function ( lock ) {

					locked = lock;

				},

				setClear: function ( stencil ) {

					if ( currentStencilClear !== stencil ) {

						gl.clearStencil( stencil );
						currentStencilClear = stencil;

					}

				},

				reset: function () {

					locked = false;

					currentStencilMask = null;
					currentStencilFunc = null;
					currentStencilRef = null;
					currentStencilFuncMask = null;
					currentStencilFail = null;
					currentStencilZFail = null;
					currentStencilZPass = null;
					currentStencilClear = null;

				}

			};

		}

		//

		const colorBuffer = new ColorBuffer();
		const depthBuffer = new DepthBuffer();
		const stencilBuffer = new StencilBuffer();

		const uboBindings = new WeakMap();
		const uboProgramMap = new WeakMap();

		let enabledCapabilities = {};

		let currentBoundFramebuffers = {};
		let currentDrawbuffers = new WeakMap();
		let defaultDrawbuffers = [];

		let currentProgram = null;

		let currentBlendingEnabled = false;
		let currentBlending = null;
		let currentBlendEquation = null;
		let currentBlendSrc = null;
		let currentBlendDst = null;
		let currentBlendEquationAlpha = null;
		let currentBlendSrcAlpha = null;
		let currentBlendDstAlpha = null;
		let currentBlendColor = new Color( 0, 0, 0 );
		let currentBlendAlpha = 0;
		let currentPremultipledAlpha = false;

		let currentFlipSided = null;
		let currentCullFace = null;

		let currentLineWidth = null;

		let currentPolygonOffsetFactor = null;
		let currentPolygonOffsetUnits = null;

		const maxTextures = gl.getParameter( gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS );

		let lineWidthAvailable = false;
		let version = 0;
		const glVersion = gl.getParameter( gl.VERSION );

		if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

			version = parseFloat( /^WebGL (\d)/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 1.0 );

		} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

			version = parseFloat( /^OpenGL ES (\d)/.exec( glVersion )[ 1 ] );
			lineWidthAvailable = ( version >= 2.0 );

		}

		let currentTextureSlot = null;
		let currentBoundTextures = {};

		const scissorParam = gl.getParameter( gl.SCISSOR_BOX );
		const viewportParam = gl.getParameter( gl.VIEWPORT );

		const currentScissor = new Vector4().fromArray( scissorParam );
		const currentViewport = new Vector4().fromArray( viewportParam );

		function createTexture( type, target, count, dimensions ) {

			const data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
			const texture = gl.createTexture();

			gl.bindTexture( type, texture );
			gl.texParameteri( type, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
			gl.texParameteri( type, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

			for ( let i = 0; i < count; i ++ ) {

				if ( isWebGL2 && ( type === gl.TEXTURE_3D || type === gl.TEXTURE_2D_ARRAY ) ) {

					gl.texImage3D( target, 0, gl.RGBA, 1, 1, dimensions, 0, gl.RGBA, gl.UNSIGNED_BYTE, data );

				} else {

					gl.texImage2D( target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data );

				}

			}

			return texture;

		}

		const emptyTextures = {};
		emptyTextures[ gl.TEXTURE_2D ] = createTexture( gl.TEXTURE_2D, gl.TEXTURE_2D, 1 );
		emptyTextures[ gl.TEXTURE_CUBE_MAP ] = createTexture( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6 );

		if ( isWebGL2 ) {

			emptyTextures[ gl.TEXTURE_2D_ARRAY ] = createTexture( gl.TEXTURE_2D_ARRAY, gl.TEXTURE_2D_ARRAY, 1, 1 );
			emptyTextures[ gl.TEXTURE_3D ] = createTexture( gl.TEXTURE_3D, gl.TEXTURE_3D, 1, 1 );

		}

		// init

		colorBuffer.setClear( 0, 0, 0, 1 );
		depthBuffer.setClear( 1 );
		stencilBuffer.setClear( 0 );

		enable( gl.DEPTH_TEST );
		depthBuffer.setFunc( LessEqualDepth );

		setFlipSided( false );
		setCullFace( CullFaceBack );
		enable( gl.CULL_FACE );

		setBlending( NoBlending );

		//

		function enable( id ) {

			if ( enabledCapabilities[ id ] !== true ) {

				gl.enable( id );
				enabledCapabilities[ id ] = true;

			}

		}

		function disable( id ) {

			if ( enabledCapabilities[ id ] !== false ) {

				gl.disable( id );
				enabledCapabilities[ id ] = false;

			}

		}

		function bindFramebuffer( target, framebuffer ) {

			if ( currentBoundFramebuffers[ target ] !== framebuffer ) {

				gl.bindFramebuffer( target, framebuffer );

				currentBoundFramebuffers[ target ] = framebuffer;

				if ( isWebGL2 ) {

					// gl.DRAW_FRAMEBUFFER is equivalent to gl.FRAMEBUFFER

					if ( target === gl.DRAW_FRAMEBUFFER ) {

						currentBoundFramebuffers[ gl.FRAMEBUFFER ] = framebuffer;

					}

					if ( target === gl.FRAMEBUFFER ) {

						currentBoundFramebuffers[ gl.DRAW_FRAMEBUFFER ] = framebuffer;

					}

				}

				return true;

			}

			return false;

		}

		function drawBuffers( renderTarget, framebuffer ) {

			let drawBuffers = defaultDrawbuffers;

			let needsUpdate = false;

			if ( renderTarget ) {

				drawBuffers = currentDrawbuffers.get( framebuffer );

				if ( drawBuffers === undefined ) {

					drawBuffers = [];
					currentDrawbuffers.set( framebuffer, drawBuffers );

				}

				if ( renderTarget.isWebGLMultipleRenderTargets ) {

					const textures = renderTarget.texture;

					if ( drawBuffers.length !== textures.length || drawBuffers[ 0 ] !== gl.COLOR_ATTACHMENT0 ) {

						for ( let i = 0, il = textures.length; i < il; i ++ ) {

							drawBuffers[ i ] = gl.COLOR_ATTACHMENT0 + i;

						}

						drawBuffers.length = textures.length;

						needsUpdate = true;

					}

				} else {

					if ( drawBuffers[ 0 ] !== gl.COLOR_ATTACHMENT0 ) {

						drawBuffers[ 0 ] = gl.COLOR_ATTACHMENT0;

						needsUpdate = true;

					}

				}

			} else {

				if ( drawBuffers[ 0 ] !== gl.BACK ) {

					drawBuffers[ 0 ] = gl.BACK;

					needsUpdate = true;

				}

			}

			if ( needsUpdate ) {

				if ( capabilities.isWebGL2 ) {

					gl.drawBuffers( drawBuffers );

				} else {

					extensions.get( 'WEBGL_draw_buffers' ).drawBuffersWEBGL( drawBuffers );

				}

			}


		}

		function useProgram( program ) {

			if ( currentProgram !== program ) {

				gl.useProgram( program );

				currentProgram = program;

				return true;

			}

			return false;

		}

		const equationToGL = {
			[ AddEquation ]: gl.FUNC_ADD,
			[ SubtractEquation ]: gl.FUNC_SUBTRACT,
			[ ReverseSubtractEquation ]: gl.FUNC_REVERSE_SUBTRACT
		};

		if ( isWebGL2 ) {

			equationToGL[ MinEquation ] = gl.MIN;
			equationToGL[ MaxEquation ] = gl.MAX;

		} else {

			const extension = extensions.get( 'EXT_blend_minmax' );

			if ( extension !== null ) {

				equationToGL[ MinEquation ] = extension.MIN_EXT;
				equationToGL[ MaxEquation ] = extension.MAX_EXT;

			}

		}

		const factorToGL = {
			[ ZeroFactor ]: gl.ZERO,
			[ OneFactor ]: gl.ONE,
			[ SrcColorFactor ]: gl.SRC_COLOR,
			[ SrcAlphaFactor ]: gl.SRC_ALPHA,
			[ SrcAlphaSaturateFactor ]: gl.SRC_ALPHA_SATURATE,
			[ DstColorFactor ]: gl.DST_COLOR,
			[ DstAlphaFactor ]: gl.DST_ALPHA,
			[ OneMinusSrcColorFactor ]: gl.ONE_MINUS_SRC_COLOR,
			[ OneMinusSrcAlphaFactor ]: gl.ONE_MINUS_SRC_ALPHA,
			[ OneMinusDstColorFactor ]: gl.ONE_MINUS_DST_COLOR,
			[ OneMinusDstAlphaFactor ]: gl.ONE_MINUS_DST_ALPHA,
			[ ConstantColorFactor ]: gl.CONSTANT_COLOR,
			[ OneMinusConstantColorFactor ]: gl.ONE_MINUS_CONSTANT_COLOR,
			[ ConstantAlphaFactor ]: gl.CONSTANT_ALPHA,
			[ OneMinusConstantAlphaFactor ]: gl.ONE_MINUS_CONSTANT_ALPHA
		};

		function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, blendColor, blendAlpha, premultipliedAlpha ) {

			if ( blending === NoBlending ) {

				if ( currentBlendingEnabled === true ) {

					disable( gl.BLEND );
					currentBlendingEnabled = false;

				}

				return;

			}

			if ( currentBlendingEnabled === false ) {

				enable( gl.BLEND );
				currentBlendingEnabled = true;

			}

			if ( blending !== CustomBlending ) {

				if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

					if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

						gl.blendEquation( gl.FUNC_ADD );

						currentBlendEquation = AddEquation;
						currentBlendEquationAlpha = AddEquation;

					}

					if ( premultipliedAlpha ) {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
								break;

							case AdditiveBlending:
								gl.blendFunc( gl.ONE, gl.ONE );
								break;

							case SubtractiveBlending:
								gl.blendFuncSeparate( gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ZERO, gl.ONE );
								break;

							case MultiplyBlending:
								gl.blendFuncSeparate( gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					} else {

						switch ( blending ) {

							case NormalBlending:
								gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA );
								break;

							case AdditiveBlending:
								gl.blendFunc( gl.SRC_ALPHA, gl.ONE );
								break;

							case SubtractiveBlending:
								gl.blendFuncSeparate( gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ZERO, gl.ONE );
								break;

							case MultiplyBlending:
								gl.blendFunc( gl.ZERO, gl.SRC_COLOR );
								break;

							default:
								console.error( 'THREE.WebGLState: Invalid blending: ', blending );
								break;

						}

					}

					currentBlendSrc = null;
					currentBlendDst = null;
					currentBlendSrcAlpha = null;
					currentBlendDstAlpha = null;
					currentBlendColor.set( 0, 0, 0 );
					currentBlendAlpha = 0;

					currentBlending = blending;
					currentPremultipledAlpha = premultipliedAlpha;

				}

				return;

			}

			// custom blending

			blendEquationAlpha = blendEquationAlpha || blendEquation;
			blendSrcAlpha = blendSrcAlpha || blendSrc;
			blendDstAlpha = blendDstAlpha || blendDst;

			if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

				gl.blendEquationSeparate( equationToGL[ blendEquation ], equationToGL[ blendEquationAlpha ] );

				currentBlendEquation = blendEquation;
				currentBlendEquationAlpha = blendEquationAlpha;

			}

			if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

				gl.blendFuncSeparate( factorToGL[ blendSrc ], factorToGL[ blendDst ], factorToGL[ blendSrcAlpha ], factorToGL[ blendDstAlpha ] );

				currentBlendSrc = blendSrc;
				currentBlendDst = blendDst;
				currentBlendSrcAlpha = blendSrcAlpha;
				currentBlendDstAlpha = blendDstAlpha;

			}

			if ( blendColor.equals( currentBlendColor ) === false || blendAlpha !== currentBlendAlpha ) {

				gl.blendColor( blendColor.r, blendColor.g, blendColor.b, blendAlpha );

				currentBlendColor.copy( blendColor );
				currentBlendAlpha = blendAlpha;

			}

			currentBlending = blending;
			currentPremultipledAlpha = false;

		}

		function setMaterial( material, frontFaceCW ) {

			material.side === DoubleSide
				? disable( gl.CULL_FACE )
				: enable( gl.CULL_FACE );

			let flipSided = ( material.side === BackSide );
			if ( frontFaceCW ) flipSided = ! flipSided;

			setFlipSided( flipSided );

			( material.blending === NormalBlending && material.transparent === false )
				? setBlending( NoBlending )
				: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.blendColor, material.blendAlpha, material.premultipliedAlpha );

			depthBuffer.setFunc( material.depthFunc );
			depthBuffer.setTest( material.depthTest );
			depthBuffer.setMask( material.depthWrite );
			colorBuffer.setMask( material.colorWrite );

			const stencilWrite = material.stencilWrite;
			stencilBuffer.setTest( stencilWrite );
			if ( stencilWrite ) {

				stencilBuffer.setMask( material.stencilWriteMask );
				stencilBuffer.setFunc( material.stencilFunc, material.stencilRef, material.stencilFuncMask );
				stencilBuffer.setOp( material.stencilFail, material.stencilZFail, material.stencilZPass );

			}

			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

			material.alphaToCoverage === true
				? enable( gl.SAMPLE_ALPHA_TO_COVERAGE )
				: disable( gl.SAMPLE_ALPHA_TO_COVERAGE );

		}

		//

		function setFlipSided( flipSided ) {

			if ( currentFlipSided !== flipSided ) {

				if ( flipSided ) {

					gl.frontFace( gl.CW );

				} else {

					gl.frontFace( gl.CCW );

				}

				currentFlipSided = flipSided;

			}

		}

		function setCullFace( cullFace ) {

			if ( cullFace !== CullFaceNone ) {

				enable( gl.CULL_FACE );

				if ( cullFace !== currentCullFace ) {

					if ( cullFace === CullFaceBack ) {

						gl.cullFace( gl.BACK );

					} else if ( cullFace === CullFaceFront ) {

						gl.cullFace( gl.FRONT );

					} else {

						gl.cullFace( gl.FRONT_AND_BACK );

					}

				}

			} else {

				disable( gl.CULL_FACE );

			}

			currentCullFace = cullFace;

		}

		function setLineWidth( width ) {

			if ( width !== currentLineWidth ) {

				if ( lineWidthAvailable ) gl.lineWidth( width );

				currentLineWidth = width;

			}

		}

		function setPolygonOffset( polygonOffset, factor, units ) {

			if ( polygonOffset ) {

				enable( gl.POLYGON_OFFSET_FILL );

				if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

					gl.polygonOffset( factor, units );

					currentPolygonOffsetFactor = factor;
					currentPolygonOffsetUnits = units;

				}

			} else {

				disable( gl.POLYGON_OFFSET_FILL );

			}

		}

		function setScissorTest( scissorTest ) {

			if ( scissorTest ) {

				enable( gl.SCISSOR_TEST );

			} else {

				disable( gl.SCISSOR_TEST );

			}

		}

		// texture

		function activeTexture( webglSlot ) {

			if ( webglSlot === undefined ) webglSlot = gl.TEXTURE0 + maxTextures - 1;

			if ( currentTextureSlot !== webglSlot ) {

				gl.activeTexture( webglSlot );
				currentTextureSlot = webglSlot;

			}

		}

		function bindTexture( webglType, webglTexture, webglSlot ) {

			if ( webglSlot === undefined ) {

				if ( currentTextureSlot === null ) {

					webglSlot = gl.TEXTURE0 + maxTextures - 1;

				} else {

					webglSlot = currentTextureSlot;

				}

			}

			let boundTexture = currentBoundTextures[ webglSlot ];

			if ( boundTexture === undefined ) {

				boundTexture = { type: undefined, texture: undefined };
				currentBoundTextures[ webglSlot ] = boundTexture;

			}

			if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

				if ( currentTextureSlot !== webglSlot ) {

					gl.activeTexture( webglSlot );
					currentTextureSlot = webglSlot;

				}

				gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

				boundTexture.type = webglType;
				boundTexture.texture = webglTexture;

			}

		}

		function unbindTexture() {

			const boundTexture = currentBoundTextures[ currentTextureSlot ];

			if ( boundTexture !== undefined && boundTexture.type !== undefined ) {

				gl.bindTexture( boundTexture.type, null );

				boundTexture.type = undefined;
				boundTexture.texture = undefined;

			}

		}

		function compressedTexImage2D() {

			try {

				gl.compressedTexImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function compressedTexImage3D() {

			try {

				gl.compressedTexImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texSubImage2D() {

			try {

				gl.texSubImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texSubImage3D() {

			try {

				gl.texSubImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function compressedTexSubImage2D() {

			try {

				gl.compressedTexSubImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function compressedTexSubImage3D() {

			try {

				gl.compressedTexSubImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texStorage2D() {

			try {

				gl.texStorage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texStorage3D() {

			try {

				gl.texStorage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage2D() {

			try {

				gl.texImage2D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		function texImage3D() {

			try {

				gl.texImage3D.apply( gl, arguments );

			} catch ( error ) {

				console.error( 'THREE.WebGLState:', error );

			}

		}

		//

		function scissor( scissor ) {

			if ( currentScissor.equals( scissor ) === false ) {

				gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
				currentScissor.copy( scissor );

			}

		}

		function viewport( viewport ) {

			if ( currentViewport.equals( viewport ) === false ) {

				gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
				currentViewport.copy( viewport );

			}

		}

		function updateUBOMapping( uniformsGroup, program ) {

			let mapping = uboProgramMap.get( program );

			if ( mapping === undefined ) {

				mapping = new WeakMap();

				uboProgramMap.set( program, mapping );

			}

			let blockIndex = mapping.get( uniformsGroup );

			if ( blockIndex === undefined ) {

				blockIndex = gl.getUniformBlockIndex( program, uniformsGroup.name );

				mapping.set( uniformsGroup, blockIndex );

			}

		}

		function uniformBlockBinding( uniformsGroup, program ) {

			const mapping = uboProgramMap.get( program );
			const blockIndex = mapping.get( uniformsGroup );

			if ( uboBindings.get( program ) !== blockIndex ) {

				// bind shader specific block index to global block point
				gl.uniformBlockBinding( program, blockIndex, uniformsGroup.__bindingPointIndex );

				uboBindings.set( program, blockIndex );

			}

		}

		//

		function reset() {

			// reset state

			gl.disable( gl.BLEND );
			gl.disable( gl.CULL_FACE );
			gl.disable( gl.DEPTH_TEST );
			gl.disable( gl.POLYGON_OFFSET_FILL );
			gl.disable( gl.SCISSOR_TEST );
			gl.disable( gl.STENCIL_TEST );
			gl.disable( gl.SAMPLE_ALPHA_TO_COVERAGE );

			gl.blendEquation( gl.FUNC_ADD );
			gl.blendFunc( gl.ONE, gl.ZERO );
			gl.blendFuncSeparate( gl.ONE, gl.ZERO, gl.ONE, gl.ZERO );
			gl.blendColor( 0, 0, 0, 0 );

			gl.colorMask( true, true, true, true );
			gl.clearColor( 0, 0, 0, 0 );

			gl.depthMask( true );
			gl.depthFunc( gl.LESS );
			gl.clearDepth( 1 );

			gl.stencilMask( 0xffffffff );
			gl.stencilFunc( gl.ALWAYS, 0, 0xffffffff );
			gl.stencilOp( gl.KEEP, gl.KEEP, gl.KEEP );
			gl.clearStencil( 0 );

			gl.cullFace( gl.BACK );
			gl.frontFace( gl.CCW );

			gl.polygonOffset( 0, 0 );

			gl.activeTexture( gl.TEXTURE0 );

			gl.bindFramebuffer( gl.FRAMEBUFFER, null );

			if ( isWebGL2 === true ) {

				gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, null );
				gl.bindFramebuffer( gl.READ_FRAMEBUFFER, null );

			}

			gl.useProgram( null );

			gl.lineWidth( 1 );

			gl.scissor( 0, 0, gl.canvas.width, gl.canvas.height );
			gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

			// reset internals

			enabledCapabilities = {};

			currentTextureSlot = null;
			currentBoundTextures = {};

			currentBoundFramebuffers = {};
			currentDrawbuffers = new WeakMap();
			defaultDrawbuffers = [];

			currentProgram = null;

			currentBlendingEnabled = false;
			currentBlending = null;
			currentBlendEquation = null;
			currentBlendSrc = null;
			currentBlendDst = null;
			currentBlendEquationAlpha = null;
			currentBlendSrcAlpha = null;
			currentBlendDstAlpha = null;
			currentBlendColor = new Color( 0, 0, 0 );
			currentBlendAlpha = 0;
			currentPremultipledAlpha = false;

			currentFlipSided = null;
			currentCullFace = null;

			currentLineWidth = null;

			currentPolygonOffsetFactor = null;
			currentPolygonOffsetUnits = null;

			currentScissor.set( 0, 0, gl.canvas.width, gl.canvas.height );
			currentViewport.set( 0, 0, gl.canvas.width, gl.canvas.height );

			colorBuffer.reset();
			depthBuffer.reset();
			stencilBuffer.reset();

		}

		return {

			buffers: {
				color: colorBuffer,
				depth: depthBuffer,
				stencil: stencilBuffer
			},

			enable: enable,
			disable: disable,

			bindFramebuffer: bindFramebuffer,
			drawBuffers: drawBuffers,

			useProgram: useProgram,

			setBlending: setBlending,
			setMaterial: setMaterial,

			setFlipSided: setFlipSided,
			setCullFace: setCullFace,

			setLineWidth: setLineWidth,
			setPolygonOffset: setPolygonOffset,

			setScissorTest: setScissorTest,

			activeTexture: activeTexture,
			bindTexture: bindTexture,
			unbindTexture: unbindTexture,
			compressedTexImage2D: compressedTexImage2D,
			compressedTexImage3D: compressedTexImage3D,
			texImage2D: texImage2D,
			texImage3D: texImage3D,

			updateUBOMapping: updateUBOMapping,
			uniformBlockBinding: uniformBlockBinding,

			texStorage2D: texStorage2D,
			texStorage3D: texStorage3D,
			texSubImage2D: texSubImage2D,
			texSubImage3D: texSubImage3D,
			compressedTexSubImage2D: compressedTexSubImage2D,
			compressedTexSubImage3D: compressedTexSubImage3D,

			scissor: scissor,
			viewport: viewport,

			reset: reset

		};

	}

	function WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info ) {

		const isWebGL2 = capabilities.isWebGL2;
		const multisampledRTTExt = extensions.has( 'WEBGL_multisampled_render_to_texture' ) ? extensions.get( 'WEBGL_multisampled_render_to_texture' ) : null;
		const supportsInvalidateFramebuffer = typeof navigator === 'undefined' ? false : /OculusBrowser/g.test( navigator.userAgent );

		const _videoTextures = new WeakMap();
		let _canvas;

		const _sources = new WeakMap(); // maps WebglTexture objects to instances of Source

		// cordova iOS (as of 5.0) still uses UIWebView, which provides OffscreenCanvas,
		// also OffscreenCanvas.getContext("webgl"), but not OffscreenCanvas.getContext("2d")!
		// Some implementations may only implement OffscreenCanvas partially (e.g. lacking 2d).

		let useOffscreenCanvas = false;

		try {

			useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined'
				// eslint-disable-next-line compat/compat
				&& ( new OffscreenCanvas( 1, 1 ).getContext( '2d' ) ) !== null;

		} catch ( err ) {

			// Ignore any errors

		}

		function createCanvas( width, height ) {

			// Use OffscreenCanvas when available. Specially needed in web workers

			return useOffscreenCanvas ?
				// eslint-disable-next-line compat/compat
				new OffscreenCanvas( width, height ) : createElementNS( 'canvas' );

		}

		function resizeImage( image, needsPowerOfTwo, needsNewCanvas, maxSize ) {

			let scale = 1;

			// handle case if texture exceeds max size

			if ( image.width > maxSize || image.height > maxSize ) {

				scale = maxSize / Math.max( image.width, image.height );

			}

			// only perform resize if necessary

			if ( scale < 1 || needsPowerOfTwo === true ) {

				// only perform resize for certain image types

				if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
					( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
					( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

					const floor = needsPowerOfTwo ? floorPowerOfTwo : Math.floor;

					const width = floor( scale * image.width );
					const height = floor( scale * image.height );

					if ( _canvas === undefined ) _canvas = createCanvas( width, height );

					// cube textures can't reuse the same canvas

					const canvas = needsNewCanvas ? createCanvas( width, height ) : _canvas;

					canvas.width = width;
					canvas.height = height;

					const context = canvas.getContext( '2d' );
					context.drawImage( image, 0, 0, width, height );

					console.warn( 'THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').' );

					return canvas;

				} else {

					if ( 'data' in image ) {

						console.warn( 'THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').' );

					}

					return image;

				}

			}

			return image;

		}

		function isPowerOfTwo$1( image ) {

			return isPowerOfTwo( image.width ) && isPowerOfTwo( image.height );

		}

		function textureNeedsPowerOfTwo( texture ) {

			if ( isWebGL2 ) return false;

			return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
				( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

		}

		function textureNeedsGenerateMipmaps( texture, supportsMips ) {

			return texture.generateMipmaps && supportsMips &&
				texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

		}

		function generateMipmap( target ) {

			_gl.generateMipmap( target );

		}

		function getInternalFormat( internalFormatName, glFormat, glType, colorSpace, forceLinearTransfer = false ) {

			if ( isWebGL2 === false ) return glFormat;

			if ( internalFormatName !== null ) {

				if ( _gl[ internalFormatName ] !== undefined ) return _gl[ internalFormatName ];

				console.warn( 'THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'' );

			}

			let internalFormat = glFormat;

			if ( glFormat === _gl.RED ) {

				if ( glType === _gl.FLOAT ) internalFormat = _gl.R32F;
				if ( glType === _gl.HALF_FLOAT ) internalFormat = _gl.R16F;
				if ( glType === _gl.UNSIGNED_BYTE ) internalFormat = _gl.R8;

			}

			if ( glFormat === _gl.RED_INTEGER ) {

				if ( glType === _gl.UNSIGNED_BYTE ) internalFormat = _gl.R8UI;
				if ( glType === _gl.UNSIGNED_SHORT ) internalFormat = _gl.R16UI;
				if ( glType === _gl.UNSIGNED_INT ) internalFormat = _gl.R32UI;
				if ( glType === _gl.BYTE ) internalFormat = _gl.R8I;
				if ( glType === _gl.SHORT ) internalFormat = _gl.R16I;
				if ( glType === _gl.INT ) internalFormat = _gl.R32I;

			}

			if ( glFormat === _gl.RG ) {

				if ( glType === _gl.FLOAT ) internalFormat = _gl.RG32F;
				if ( glType === _gl.HALF_FLOAT ) internalFormat = _gl.RG16F;
				if ( glType === _gl.UNSIGNED_BYTE ) internalFormat = _gl.RG8;

			}

			if ( glFormat === _gl.RGBA ) {

				const transfer = forceLinearTransfer ? LinearTransfer : ColorManagement.getTransfer( colorSpace );

				if ( glType === _gl.FLOAT ) internalFormat = _gl.RGBA32F;
				if ( glType === _gl.HALF_FLOAT ) internalFormat = _gl.RGBA16F;
				if ( glType === _gl.UNSIGNED_BYTE ) internalFormat = ( transfer === SRGBTransfer ) ? _gl.SRGB8_ALPHA8 : _gl.RGBA8;
				if ( glType === _gl.UNSIGNED_SHORT_4_4_4_4 ) internalFormat = _gl.RGBA4;
				if ( glType === _gl.UNSIGNED_SHORT_5_5_5_1 ) internalFormat = _gl.RGB5_A1;

			}

			if ( internalFormat === _gl.R16F || internalFormat === _gl.R32F ||
				internalFormat === _gl.RG16F || internalFormat === _gl.RG32F ||
				internalFormat === _gl.RGBA16F || internalFormat === _gl.RGBA32F ) {

				extensions.get( 'EXT_color_buffer_float' );

			}

			return internalFormat;

		}

		function getMipLevels( texture, image, supportsMips ) {

			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) === true || ( texture.isFramebufferTexture && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) ) {

				return Math.log2( Math.max( image.width, image.height ) ) + 1;

			} else if ( texture.mipmaps !== undefined && texture.mipmaps.length > 0 ) {

				// user-defined mipmaps

				return texture.mipmaps.length;

			} else if ( texture.isCompressedTexture && Array.isArray( texture.image ) ) {

				return image.mipmaps.length;

			} else {

				// texture without mipmaps (only base level)

				return 1;

			}

		}

		// Fallback filters for non-power-of-2 textures

		function filterFallback( f ) {

			if ( f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter ) {

				return _gl.NEAREST;

			}

			return _gl.LINEAR;

		}

		//

		function onTextureDispose( event ) {

			const texture = event.target;

			texture.removeEventListener( 'dispose', onTextureDispose );

			deallocateTexture( texture );

			if ( texture.isVideoTexture ) {

				_videoTextures.delete( texture );

			}

		}

		function onRenderTargetDispose( event ) {

			const renderTarget = event.target;

			renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

			deallocateRenderTarget( renderTarget );

		}

		//

		function deallocateTexture( texture ) {

			const textureProperties = properties.get( texture );

			if ( textureProperties.__webglInit === undefined ) return;

			// check if it's necessary to remove the WebGLTexture object

			const source = texture.source;
			const webglTextures = _sources.get( source );

			if ( webglTextures ) {

				const webglTexture = webglTextures[ textureProperties.__cacheKey ];
				webglTexture.usedTimes --;

				// the WebGLTexture object is not used anymore, remove it

				if ( webglTexture.usedTimes === 0 ) {

					deleteTexture( texture );

				}

				// remove the weak map entry if no WebGLTexture uses the source anymore

				if ( Object.keys( webglTextures ).length === 0 ) {

					_sources.delete( source );

				}

			}

			properties.remove( texture );

		}

		function deleteTexture( texture ) {

			const textureProperties = properties.get( texture );
			_gl.deleteTexture( textureProperties.__webglTexture );

			const source = texture.source;
			const webglTextures = _sources.get( source );
			delete webglTextures[ textureProperties.__cacheKey ];

			info.memory.textures --;

		}

		function deallocateRenderTarget( renderTarget ) {

			const texture = renderTarget.texture;

			const renderTargetProperties = properties.get( renderTarget );
			const textureProperties = properties.get( texture );

			if ( textureProperties.__webglTexture !== undefined ) {

				_gl.deleteTexture( textureProperties.__webglTexture );

				info.memory.textures --;

			}

			if ( renderTarget.depthTexture ) {

				renderTarget.depthTexture.dispose();

			}

			if ( renderTarget.isWebGLCubeRenderTarget ) {

				for ( let i = 0; i < 6; i ++ ) {

					if ( Array.isArray( renderTargetProperties.__webglFramebuffer[ i ] ) ) {

						for ( let level = 0; level < renderTargetProperties.__webglFramebuffer[ i ].length; level ++ ) _gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ][ level ] );

					} else {

						_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ] );

					}

					if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer[ i ] );

				}

			} else {

				if ( Array.isArray( renderTargetProperties.__webglFramebuffer ) ) {

					for ( let level = 0; level < renderTargetProperties.__webglFramebuffer.length; level ++ ) _gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ level ] );

				} else {

					_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer );

				}

				if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer );
				if ( renderTargetProperties.__webglMultisampledFramebuffer ) _gl.deleteFramebuffer( renderTargetProperties.__webglMultisampledFramebuffer );

				if ( renderTargetProperties.__webglColorRenderbuffer ) {

					for ( let i = 0; i < renderTargetProperties.__webglColorRenderbuffer.length; i ++ ) {

						if ( renderTargetProperties.__webglColorRenderbuffer[ i ] ) _gl.deleteRenderbuffer( renderTargetProperties.__webglColorRenderbuffer[ i ] );

					}

				}

				if ( renderTargetProperties.__webglDepthRenderbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthRenderbuffer );

			}

			if ( renderTarget.isWebGLMultipleRenderTargets ) {

				for ( let i = 0, il = texture.length; i < il; i ++ ) {

					const attachmentProperties = properties.get( texture[ i ] );

					if ( attachmentProperties.__webglTexture ) {

						_gl.deleteTexture( attachmentProperties.__webglTexture );

						info.memory.textures --;

					}

					properties.remove( texture[ i ] );

				}

			}

			properties.remove( texture );
			properties.remove( renderTarget );

		}

		//

		let textureUnits = 0;

		function resetTextureUnits() {

			textureUnits = 0;

		}

		function allocateTextureUnit() {

			const textureUnit = textureUnits;

			if ( textureUnit >= capabilities.maxTextures ) {

				console.warn( 'THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + capabilities.maxTextures );

			}

			textureUnits += 1;

			return textureUnit;

		}

		function getTextureCacheKey( texture ) {

			const array = [];

			array.push( texture.wrapS );
			array.push( texture.wrapT );
			array.push( texture.wrapR || 0 );
			array.push( texture.magFilter );
			array.push( texture.minFilter );
			array.push( texture.anisotropy );
			array.push( texture.internalFormat );
			array.push( texture.format );
			array.push( texture.type );
			array.push( texture.generateMipmaps );
			array.push( texture.premultiplyAlpha );
			array.push( texture.flipY );
			array.push( texture.unpackAlignment );
			array.push( texture.colorSpace );

			return array.join();

		}

		//

		function setTexture2D( texture, slot ) {

			const textureProperties = properties.get( texture );

			if ( texture.isVideoTexture ) updateVideoTexture( texture );

			if ( texture.isRenderTargetTexture === false && texture.version > 0 && textureProperties.__version !== texture.version ) {

				const image = texture.image;

				if ( image === null ) {

					console.warn( 'THREE.WebGLRenderer: Texture marked for update but no image data found.' );

				} else if ( image.complete === false ) {

					console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is incomplete' );

				} else {

					uploadTexture( textureProperties, texture, slot );
					return;

				}

			}

			state.bindTexture( _gl.TEXTURE_2D, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

		}

		function setTexture2DArray( texture, slot ) {

			const textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

			state.bindTexture( _gl.TEXTURE_2D_ARRAY, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

		}

		function setTexture3D( texture, slot ) {

			const textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

			state.bindTexture( _gl.TEXTURE_3D, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

		}

		function setTextureCube( texture, slot ) {

			const textureProperties = properties.get( texture );

			if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

				uploadCubeTexture( textureProperties, texture, slot );
				return;

			}

			state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

		}

		const wrappingToGL = {
			[ RepeatWrapping ]: _gl.REPEAT,
			[ ClampToEdgeWrapping ]: _gl.CLAMP_TO_EDGE,
			[ MirroredRepeatWrapping ]: _gl.MIRRORED_REPEAT
		};

		const filterToGL = {
			[ NearestFilter ]: _gl.NEAREST,
			[ NearestMipmapNearestFilter ]: _gl.NEAREST_MIPMAP_NEAREST,
			[ NearestMipmapLinearFilter ]: _gl.NEAREST_MIPMAP_LINEAR,

			[ LinearFilter ]: _gl.LINEAR,
			[ LinearMipmapNearestFilter ]: _gl.LINEAR_MIPMAP_NEAREST,
			[ LinearMipmapLinearFilter ]: _gl.LINEAR_MIPMAP_LINEAR
		};

		const compareToGL = {
			[ NeverCompare ]: _gl.NEVER,
			[ AlwaysCompare ]: _gl.ALWAYS,
			[ LessCompare ]: _gl.LESS,
			[ LessEqualCompare ]: _gl.LEQUAL,
			[ EqualCompare ]: _gl.EQUAL,
			[ GreaterEqualCompare ]: _gl.GEQUAL,
			[ GreaterCompare ]: _gl.GREATER,
			[ NotEqualCompare ]: _gl.NOTEQUAL
		};

		function setTextureParameters( textureType, texture, supportsMips ) {

			if ( supportsMips ) {

				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, wrappingToGL[ texture.wrapS ] );
				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, wrappingToGL[ texture.wrapT ] );

				if ( textureType === _gl.TEXTURE_3D || textureType === _gl.TEXTURE_2D_ARRAY ) {

					_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_R, wrappingToGL[ texture.wrapR ] );

				}

				_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterToGL[ texture.magFilter ] );
				_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterToGL[ texture.minFilter ] );

			} else {

				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
				_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

				if ( textureType === _gl.TEXTURE_3D || textureType === _gl.TEXTURE_2D_ARRAY ) {

					_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_R, _gl.CLAMP_TO_EDGE );

				}

				if ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) {

					console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.' );

				}

				_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
				_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

				if ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) {

					console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.' );

				}

			}

			if ( texture.compareFunction ) {

				_gl.texParameteri( textureType, _gl.TEXTURE_COMPARE_MODE, _gl.COMPARE_REF_TO_TEXTURE );
				_gl.texParameteri( textureType, _gl.TEXTURE_COMPARE_FUNC, compareToGL[ texture.compareFunction ] );

			}

			if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

				const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

				if ( texture.magFilter === NearestFilter ) return;
				if ( texture.minFilter !== NearestMipmapLinearFilter && texture.minFilter !== LinearMipmapLinearFilter ) return;
				if ( texture.type === FloatType && extensions.has( 'OES_texture_float_linear' ) === false ) return; // verify extension for WebGL 1 and WebGL 2
				if ( isWebGL2 === false && ( texture.type === HalfFloatType && extensions.has( 'OES_texture_half_float_linear' ) === false ) ) return; // verify extension for WebGL 1 only

				if ( texture.anisotropy > 1 || properties.get( texture ).__currentAnisotropy ) {

					_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
					properties.get( texture ).__currentAnisotropy = texture.anisotropy;

				}

			}

		}

		function initTexture( textureProperties, texture ) {

			let forceUpload = false;

			if ( textureProperties.__webglInit === undefined ) {

				textureProperties.__webglInit = true;

				texture.addEventListener( 'dispose', onTextureDispose );

			}

			// create Source <-> WebGLTextures mapping if necessary

			const source = texture.source;
			let webglTextures = _sources.get( source );

			if ( webglTextures === undefined ) {

				webglTextures = {};
				_sources.set( source, webglTextures );

			}

			// check if there is already a WebGLTexture object for the given texture parameters

			const textureCacheKey = getTextureCacheKey( texture );

			if ( textureCacheKey !== textureProperties.__cacheKey ) {

				// if not, create a new instance of WebGLTexture

				if ( webglTextures[ textureCacheKey ] === undefined ) {

					// create new entry

					webglTextures[ textureCacheKey ] = {
						texture: _gl.createTexture(),
						usedTimes: 0
					};

					info.memory.textures ++;

					// when a new instance of WebGLTexture was created, a texture upload is required
					// even if the image contents are identical

					forceUpload = true;

				}

				webglTextures[ textureCacheKey ].usedTimes ++;

				// every time the texture cache key changes, it's necessary to check if an instance of
				// WebGLTexture can be deleted in order to avoid a memory leak.

				const webglTexture = webglTextures[ textureProperties.__cacheKey ];

				if ( webglTexture !== undefined ) {

					webglTextures[ textureProperties.__cacheKey ].usedTimes --;

					if ( webglTexture.usedTimes === 0 ) {

						deleteTexture( texture );

					}

				}

				// store references to cache key and WebGLTexture object

				textureProperties.__cacheKey = textureCacheKey;
				textureProperties.__webglTexture = webglTextures[ textureCacheKey ].texture;

			}

			return forceUpload;

		}

		function uploadTexture( textureProperties, texture, slot ) {

			let textureType = _gl.TEXTURE_2D;

			if ( texture.isDataArrayTexture || texture.isCompressedArrayTexture ) textureType = _gl.TEXTURE_2D_ARRAY;
			if ( texture.isData3DTexture ) textureType = _gl.TEXTURE_3D;

			const forceUpload = initTexture( textureProperties, texture );
			const source = texture.source;

			state.bindTexture( textureType, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

			const sourceProperties = properties.get( source );

			if ( source.version !== sourceProperties.__version || forceUpload === true ) {

				state.activeTexture( _gl.TEXTURE0 + slot );

				const workingPrimaries = ColorManagement.getPrimaries( ColorManagement.workingColorSpace );
				const texturePrimaries = texture.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries( texture.colorSpace );
				const unpackConversion = texture.colorSpace === NoColorSpace || workingPrimaries === texturePrimaries ? _gl.NONE : _gl.BROWSER_DEFAULT_WEBGL;

				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
				_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );
				_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, texture.unpackAlignment );
				_gl.pixelStorei( _gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, unpackConversion );

				const needsPowerOfTwo = textureNeedsPowerOfTwo( texture ) && isPowerOfTwo$1( texture.image ) === false;
				let image = resizeImage( texture.image, needsPowerOfTwo, false, capabilities.maxTextureSize );
				image = verifyColorSpace( texture, image );

				const supportsMips = isPowerOfTwo$1( image ) || isWebGL2,
					glFormat = utils.convert( texture.format, texture.colorSpace );

				let glType = utils.convert( texture.type ),
					glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace, texture.isVideoTexture );

				setTextureParameters( textureType, texture, supportsMips );

				let mipmap;
				const mipmaps = texture.mipmaps;

				const useTexStorage = ( isWebGL2 && texture.isVideoTexture !== true && glInternalFormat !== RGB_ETC1_Format );
				const allocateMemory = ( sourceProperties.__version === undefined ) || ( forceUpload === true );
				const levels = getMipLevels( texture, image, supportsMips );

				if ( texture.isDepthTexture ) {

					// populate depth texture with dummy data

					glInternalFormat = _gl.DEPTH_COMPONENT;

					if ( isWebGL2 ) {

						if ( texture.type === FloatType ) {

							glInternalFormat = _gl.DEPTH_COMPONENT32F;

						} else if ( texture.type === UnsignedIntType ) {

							glInternalFormat = _gl.DEPTH_COMPONENT24;

						} else if ( texture.type === UnsignedInt248Type ) {

							glInternalFormat = _gl.DEPTH24_STENCIL8;

						} else {

							glInternalFormat = _gl.DEPTH_COMPONENT16; // WebGL2 requires sized internalformat for glTexImage2D

						}

					} else {

						if ( texture.type === FloatType ) {

							console.error( 'WebGLRenderer: Floating point depth texture requires WebGL2.' );

						}

					}

					// validation checks for WebGL 1

					if ( texture.format === DepthFormat && glInternalFormat === _gl.DEPTH_COMPONENT ) {

						// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
						// DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
						// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
						if ( texture.type !== UnsignedShortType && texture.type !== UnsignedIntType ) {

							console.warn( 'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.' );

							texture.type = UnsignedIntType;
							glType = utils.convert( texture.type );

						}

					}

					if ( texture.format === DepthStencilFormat && glInternalFormat === _gl.DEPTH_COMPONENT ) {

						// Depth stencil textures need the DEPTH_STENCIL internal format
						// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
						glInternalFormat = _gl.DEPTH_STENCIL;

						// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
						// DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
						// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
						if ( texture.type !== UnsignedInt248Type ) {

							console.warn( 'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.' );

							texture.type = UnsignedInt248Type;
							glType = utils.convert( texture.type );

						}

					}

					//

					if ( allocateMemory ) {

						if ( useTexStorage ) {

							state.texStorage2D( _gl.TEXTURE_2D, 1, glInternalFormat, image.width, image.height );

						} else {

							state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null );

						}

					}

				} else if ( texture.isDataTexture ) {

					// use manually created mipmaps if available
					// if there are no manual mipmaps
					// set 0 level mipmap and then use GL to generate other mipmap levels

					if ( mipmaps.length > 0 && supportsMips ) {

						if ( useTexStorage && allocateMemory ) {

							state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[ 0 ].width, mipmaps[ 0 ].height );

						}

						for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

							mipmap = mipmaps[ i ];

							if ( useTexStorage ) {

								state.texSubImage2D( _gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data );

							} else {

								state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

							}

						}

						texture.generateMipmaps = false;

					} else {

						if ( useTexStorage ) {

							if ( allocateMemory ) {

								state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, image.width, image.height );

							}

							state.texSubImage2D( _gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, glFormat, glType, image.data );

						} else {

							state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data );

						}

					}

				} else if ( texture.isCompressedTexture ) {

					if ( texture.isCompressedArrayTexture ) {

						if ( useTexStorage && allocateMemory ) {

							state.texStorage3D( _gl.TEXTURE_2D_ARRAY, levels, glInternalFormat, mipmaps[ 0 ].width, mipmaps[ 0 ].height, image.depth );

						}

						for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

							mipmap = mipmaps[ i ];

							if ( texture.format !== RGBAFormat ) {

								if ( glFormat !== null ) {

									if ( useTexStorage ) {

										state.compressedTexSubImage3D( _gl.TEXTURE_2D_ARRAY, i, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, mipmap.data, 0, 0 );

									} else {

										state.compressedTexImage3D( _gl.TEXTURE_2D_ARRAY, i, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, mipmap.data, 0, 0 );

									}

								} else {

									console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

								}

							} else {

								if ( useTexStorage ) {

									state.texSubImage3D( _gl.TEXTURE_2D_ARRAY, i, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, glType, mipmap.data );

								} else {

									state.texImage3D( _gl.TEXTURE_2D_ARRAY, i, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, glFormat, glType, mipmap.data );

								}

							}

						}

					} else {

						if ( useTexStorage && allocateMemory ) {

							state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[ 0 ].width, mipmaps[ 0 ].height );

						}

						for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

							mipmap = mipmaps[ i ];

							if ( texture.format !== RGBAFormat ) {

								if ( glFormat !== null ) {

									if ( useTexStorage ) {

										state.compressedTexSubImage2D( _gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data );

									} else {

										state.compressedTexImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

									}

								} else {

									console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

								}

							} else {

								if ( useTexStorage ) {

									state.texSubImage2D( _gl.TEXTURE_2D, i, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data );

								} else {

									state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

								}

							}

						}

					}

				} else if ( texture.isDataArrayTexture ) {

					if ( useTexStorage ) {

						if ( allocateMemory ) {

							state.texStorage3D( _gl.TEXTURE_2D_ARRAY, levels, glInternalFormat, image.width, image.height, image.depth );

						}

						state.texSubImage3D( _gl.TEXTURE_2D_ARRAY, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data );

					} else {

						state.texImage3D( _gl.TEXTURE_2D_ARRAY, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );

					}

				} else if ( texture.isData3DTexture ) {

					if ( useTexStorage ) {

						if ( allocateMemory ) {

							state.texStorage3D( _gl.TEXTURE_3D, levels, glInternalFormat, image.width, image.height, image.depth );

						}

						state.texSubImage3D( _gl.TEXTURE_3D, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data );

					} else {

						state.texImage3D( _gl.TEXTURE_3D, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );

					}

				} else if ( texture.isFramebufferTexture ) {

					if ( allocateMemory ) {

						if ( useTexStorage ) {

							state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, image.width, image.height );

						} else {

							let width = image.width, height = image.height;

							for ( let i = 0; i < levels; i ++ ) {

								state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, width, height, 0, glFormat, glType, null );

								width >>= 1;
								height >>= 1;

							}

						}

					}

				} else {

					// regular Texture (image, video, canvas)

					// use manually created mipmaps if available
					// if there are no manual mipmaps
					// set 0 level mipmap and then use GL to generate other mipmap levels

					if ( mipmaps.length > 0 && supportsMips ) {

						if ( useTexStorage && allocateMemory ) {

							state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[ 0 ].width, mipmaps[ 0 ].height );

						}

						for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

							mipmap = mipmaps[ i ];

							if ( useTexStorage ) {

								state.texSubImage2D( _gl.TEXTURE_2D, i, 0, 0, glFormat, glType, mipmap );

							} else {

								state.texImage2D( _gl.TEXTURE_2D, i, glInternalFormat, glFormat, glType, mipmap );

							}

						}

						texture.generateMipmaps = false;

					} else {

						if ( useTexStorage ) {

							if ( allocateMemory ) {

								state.texStorage2D( _gl.TEXTURE_2D, levels, glInternalFormat, image.width, image.height );

							}

							state.texSubImage2D( _gl.TEXTURE_2D, 0, 0, 0, glFormat, glType, image );

						} else {

							state.texImage2D( _gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image );

						}

					}

				}

				if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

					generateMipmap( textureType );

				}

				sourceProperties.__version = source.version;

				if ( texture.onUpdate ) texture.onUpdate( texture );

			}

			textureProperties.__version = texture.version;

		}

		function uploadCubeTexture( textureProperties, texture, slot ) {

			if ( texture.image.length !== 6 ) return;

			const forceUpload = initTexture( textureProperties, texture );
			const source = texture.source;

			state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture, _gl.TEXTURE0 + slot );

			const sourceProperties = properties.get( source );

			if ( source.version !== sourceProperties.__version || forceUpload === true ) {

				state.activeTexture( _gl.TEXTURE0 + slot );

				const workingPrimaries = ColorManagement.getPrimaries( ColorManagement.workingColorSpace );
				const texturePrimaries = texture.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries( texture.colorSpace );
				const unpackConversion = texture.colorSpace === NoColorSpace || workingPrimaries === texturePrimaries ? _gl.NONE : _gl.BROWSER_DEFAULT_WEBGL;

				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
				_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );
				_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, texture.unpackAlignment );
				_gl.pixelStorei( _gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, unpackConversion );

				const isCompressed = ( texture.isCompressedTexture || texture.image[ 0 ].isCompressedTexture );
				const isDataTexture = ( texture.image[ 0 ] && texture.image[ 0 ].isDataTexture );

				const cubeImage = [];

				for ( let i = 0; i < 6; i ++ ) {

					if ( ! isCompressed && ! isDataTexture ) {

						cubeImage[ i ] = resizeImage( texture.image[ i ], false, true, capabilities.maxCubemapSize );

					} else {

						cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

					}

					cubeImage[ i ] = verifyColorSpace( texture, cubeImage[ i ] );

				}

				const image = cubeImage[ 0 ],
					supportsMips = isPowerOfTwo$1( image ) || isWebGL2,
					glFormat = utils.convert( texture.format, texture.colorSpace ),
					glType = utils.convert( texture.type ),
					glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace );

				const useTexStorage = ( isWebGL2 && texture.isVideoTexture !== true );
				const allocateMemory = ( sourceProperties.__version === undefined ) || ( forceUpload === true );
				let levels = getMipLevels( texture, image, supportsMips );

				setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, supportsMips );

				let mipmaps;

				if ( isCompressed ) {

					if ( useTexStorage && allocateMemory ) {

						state.texStorage2D( _gl.TEXTURE_CUBE_MAP, levels, glInternalFormat, image.width, image.height );

					}

					for ( let i = 0; i < 6; i ++ ) {

						mipmaps = cubeImage[ i ].mipmaps;

						for ( let j = 0; j < mipmaps.length; j ++ ) {

							const mipmap = mipmaps[ j ];

							if ( texture.format !== RGBAFormat ) {

								if ( glFormat !== null ) {

									if ( useTexStorage ) {

										state.compressedTexSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data );

									} else {

										state.compressedTexImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

									}

								} else {

									console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()' );

								}

							} else {

								if ( useTexStorage ) {

									state.texSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data );

								} else {

									state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

								}

							}

						}

					}

				} else {

					mipmaps = texture.mipmaps;

					if ( useTexStorage && allocateMemory ) {

						// TODO: Uniformly handle mipmap definitions
						// Normal textures and compressed cube textures define base level + mips with their mipmap array
						// Uncompressed cube textures use their mipmap array only for mips (no base level)

						if ( mipmaps.length > 0 ) levels ++;

						state.texStorage2D( _gl.TEXTURE_CUBE_MAP, levels, glInternalFormat, cubeImage[ 0 ].width, cubeImage[ 0 ].height );

					}

					for ( let i = 0; i < 6; i ++ ) {

						if ( isDataTexture ) {

							if ( useTexStorage ) {

								state.texSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, 0, 0, cubeImage[ i ].width, cubeImage[ i ].height, glFormat, glType, cubeImage[ i ].data );

							} else {

								state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

							}

							for ( let j = 0; j < mipmaps.length; j ++ ) {

								const mipmap = mipmaps[ j ];
								const mipmapImage = mipmap.image[ i ].image;

								if ( useTexStorage ) {

									state.texSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j + 1, 0, 0, mipmapImage.width, mipmapImage.height, glFormat, glType, mipmapImage.data );

								} else {

									state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data );

								}

							}

						} else {

							if ( useTexStorage ) {

								state.texSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, 0, 0, glFormat, glType, cubeImage[ i ] );

							} else {

								state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glInternalFormat, glFormat, glType, cubeImage[ i ] );

							}

							for ( let j = 0; j < mipmaps.length; j ++ ) {

								const mipmap = mipmaps[ j ];

								if ( useTexStorage ) {

									state.texSubImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j + 1, 0, 0, glFormat, glType, mipmap.image[ i ] );

								} else {

									state.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j + 1, glInternalFormat, glFormat, glType, mipmap.image[ i ] );

								}

							}

						}

					}

				}

				if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

					// We assume images for cube map have the same size.
					generateMipmap( _gl.TEXTURE_CUBE_MAP );

				}

				sourceProperties.__version = source.version;

				if ( texture.onUpdate ) texture.onUpdate( texture );

			}

			textureProperties.__version = texture.version;

		}

		// Render targets

		// Setup storage for target texture and bind it to correct framebuffer
		function setupFrameBufferTexture( framebuffer, renderTarget, texture, attachment, textureTarget, level ) {

			const glFormat = utils.convert( texture.format, texture.colorSpace );
			const glType = utils.convert( texture.type );
			const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace );
			const renderTargetProperties = properties.get( renderTarget );

			if ( ! renderTargetProperties.__hasExternalTextures ) {

				const width = Math.max( 1, renderTarget.width >> level );
				const height = Math.max( 1, renderTarget.height >> level );

				if ( textureTarget === _gl.TEXTURE_3D || textureTarget === _gl.TEXTURE_2D_ARRAY ) {

					state.texImage3D( textureTarget, level, glInternalFormat, width, height, renderTarget.depth, 0, glFormat, glType, null );

				} else {

					state.texImage2D( textureTarget, level, glInternalFormat, width, height, 0, glFormat, glType, null );

				}

			}

			state.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

			if ( useMultisampledRTT( renderTarget ) ) {

				multisampledRTTExt.framebufferTexture2DMultisampleEXT( _gl.FRAMEBUFFER, attachment, textureTarget, properties.get( texture ).__webglTexture, 0, getRenderTargetSamples( renderTarget ) );

			} else if ( textureTarget === _gl.TEXTURE_2D || ( textureTarget >= _gl.TEXTURE_CUBE_MAP_POSITIVE_X && textureTarget <= _gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ) ) { // see #24753

				_gl.framebufferTexture2D( _gl.FRAMEBUFFER, attachment, textureTarget, properties.get( texture ).__webglTexture, level );

			}

			state.bindFramebuffer( _gl.FRAMEBUFFER, null );

		}


		// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
		function setupRenderBufferStorage( renderbuffer, renderTarget, isMultisample ) {

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );

			if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

				let glInternalFormat = ( isWebGL2 === true ) ? _gl.DEPTH_COMPONENT24 : _gl.DEPTH_COMPONENT16;

				if ( isMultisample || useMultisampledRTT( renderTarget ) ) {

					const depthTexture = renderTarget.depthTexture;

					if ( depthTexture && depthTexture.isDepthTexture ) {

						if ( depthTexture.type === FloatType ) {

							glInternalFormat = _gl.DEPTH_COMPONENT32F;

						} else if ( depthTexture.type === UnsignedIntType ) {

							glInternalFormat = _gl.DEPTH_COMPONENT24;

						}

					}

					const samples = getRenderTargetSamples( renderTarget );

					if ( useMultisampledRTT( renderTarget ) ) {

						multisampledRTTExt.renderbufferStorageMultisampleEXT( _gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height );

					} else {

						_gl.renderbufferStorageMultisample( _gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height );

					}

				} else {

					_gl.renderbufferStorage( _gl.RENDERBUFFER, glInternalFormat, renderTarget.width, renderTarget.height );

				}

				_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

			} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

				const samples = getRenderTargetSamples( renderTarget );

				if ( isMultisample && useMultisampledRTT( renderTarget ) === false ) {

					_gl.renderbufferStorageMultisample( _gl.RENDERBUFFER, samples, _gl.DEPTH24_STENCIL8, renderTarget.width, renderTarget.height );

				} else if ( useMultisampledRTT( renderTarget ) ) {

					multisampledRTTExt.renderbufferStorageMultisampleEXT( _gl.RENDERBUFFER, samples, _gl.DEPTH24_STENCIL8, renderTarget.width, renderTarget.height );

				} else {

					_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );

				}


				_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

			} else {

				const textures = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture : [ renderTarget.texture ];

				for ( let i = 0; i < textures.length; i ++ ) {

					const texture = textures[ i ];

					const glFormat = utils.convert( texture.format, texture.colorSpace );
					const glType = utils.convert( texture.type );
					const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace );
					const samples = getRenderTargetSamples( renderTarget );

					if ( isMultisample && useMultisampledRTT( renderTarget ) === false ) {

						_gl.renderbufferStorageMultisample( _gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height );

					} else if ( useMultisampledRTT( renderTarget ) ) {

						multisampledRTTExt.renderbufferStorageMultisampleEXT( _gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height );

					} else {

						_gl.renderbufferStorage( _gl.RENDERBUFFER, glInternalFormat, renderTarget.width, renderTarget.height );

					}

				}

			}

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );

		}

		// Setup resources for a Depth Texture for a FBO (needs an extension)
		function setupDepthTexture( framebuffer, renderTarget ) {

			const isCube = ( renderTarget && renderTarget.isWebGLCubeRenderTarget );
			if ( isCube ) throw new Error( 'Depth Texture with cube render targets is not supported' );

			state.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

			if ( ! ( renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture ) ) {

				throw new Error( 'renderTarget.depthTexture must be an instance of THREE.DepthTexture' );

			}

			// upload an empty depth texture with framebuffer size
			if ( ! properties.get( renderTarget.depthTexture ).__webglTexture ||
					renderTarget.depthTexture.image.width !== renderTarget.width ||
					renderTarget.depthTexture.image.height !== renderTarget.height ) {

				renderTarget.depthTexture.image.width = renderTarget.width;
				renderTarget.depthTexture.image.height = renderTarget.height;
				renderTarget.depthTexture.needsUpdate = true;

			}

			setTexture2D( renderTarget.depthTexture, 0 );

			const webglDepthTexture = properties.get( renderTarget.depthTexture ).__webglTexture;
			const samples = getRenderTargetSamples( renderTarget );

			if ( renderTarget.depthTexture.format === DepthFormat ) {

				if ( useMultisampledRTT( renderTarget ) ) {

					multisampledRTTExt.framebufferTexture2DMultisampleEXT( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0, samples );

				} else {

					_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0 );

				}

			} else if ( renderTarget.depthTexture.format === DepthStencilFormat ) {

				if ( useMultisampledRTT( renderTarget ) ) {

					multisampledRTTExt.framebufferTexture2DMultisampleEXT( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0, samples );

				} else {

					_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0 );

				}

			} else {

				throw new Error( 'Unknown depthTexture format' );

			}

		}

		// Setup GL resources for a non-texture depth buffer
		function setupDepthRenderbuffer( renderTarget ) {

			const renderTargetProperties = properties.get( renderTarget );
			const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );

			if ( renderTarget.depthTexture && ! renderTargetProperties.__autoAllocateDepthBuffer ) {

				if ( isCube ) throw new Error( 'target.depthTexture not supported in Cube render targets' );

				setupDepthTexture( renderTargetProperties.__webglFramebuffer, renderTarget );

			} else {

				if ( isCube ) {

					renderTargetProperties.__webglDepthbuffer = [];

					for ( let i = 0; i < 6; i ++ ) {

						state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[ i ] );
						renderTargetProperties.__webglDepthbuffer[ i ] = _gl.createRenderbuffer();
						setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer[ i ], renderTarget, false );

					}

				} else {

					state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer );
					renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
					setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer, renderTarget, false );

				}

			}

			state.bindFramebuffer( _gl.FRAMEBUFFER, null );

		}

		// rebind framebuffer with external textures
		function rebindTextures( renderTarget, colorTexture, depthTexture ) {

			const renderTargetProperties = properties.get( renderTarget );

			if ( colorTexture !== undefined ) {

				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, renderTarget.texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, 0 );

			}

			if ( depthTexture !== undefined ) {

				setupDepthRenderbuffer( renderTarget );

			}

		}

		// Set up GL resources for the render target
		function setupRenderTarget( renderTarget ) {

			const texture = renderTarget.texture;

			const renderTargetProperties = properties.get( renderTarget );
			const textureProperties = properties.get( texture );

			renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

			if ( renderTarget.isWebGLMultipleRenderTargets !== true ) {

				if ( textureProperties.__webglTexture === undefined ) {

					textureProperties.__webglTexture = _gl.createTexture();

				}

				textureProperties.__version = texture.version;
				info.memory.textures ++;

			}

			const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );
			const isMultipleRenderTargets = ( renderTarget.isWebGLMultipleRenderTargets === true );
			const supportsMips = isPowerOfTwo$1( renderTarget ) || isWebGL2;

			// Setup framebuffer

			if ( isCube ) {

				renderTargetProperties.__webglFramebuffer = [];

				for ( let i = 0; i < 6; i ++ ) {

					if ( isWebGL2 && texture.mipmaps && texture.mipmaps.length > 0 ) {

						renderTargetProperties.__webglFramebuffer[ i ] = [];

						for ( let level = 0; level < texture.mipmaps.length; level ++ ) {

							renderTargetProperties.__webglFramebuffer[ i ][ level ] = _gl.createFramebuffer();

						}

					} else {

						renderTargetProperties.__webglFramebuffer[ i ] = _gl.createFramebuffer();

					}

				}

			} else {

				if ( isWebGL2 && texture.mipmaps && texture.mipmaps.length > 0 ) {

					renderTargetProperties.__webglFramebuffer = [];

					for ( let level = 0; level < texture.mipmaps.length; level ++ ) {

						renderTargetProperties.__webglFramebuffer[ level ] = _gl.createFramebuffer();

					}

				} else {

					renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

				}

				if ( isMultipleRenderTargets ) {

					if ( capabilities.drawBuffers ) {

						const textures = renderTarget.texture;

						for ( let i = 0, il = textures.length; i < il; i ++ ) {

							const attachmentProperties = properties.get( textures[ i ] );

							if ( attachmentProperties.__webglTexture === undefined ) {

								attachmentProperties.__webglTexture = _gl.createTexture();

								info.memory.textures ++;

							}

						}

					} else {

						console.warn( 'THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.' );

					}

				}

				if ( ( isWebGL2 && renderTarget.samples > 0 ) && useMultisampledRTT( renderTarget ) === false ) {

					const textures = isMultipleRenderTargets ? texture : [ texture ];

					renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
					renderTargetProperties.__webglColorRenderbuffer = [];

					state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer );

					for ( let i = 0; i < textures.length; i ++ ) {

						const texture = textures[ i ];
						renderTargetProperties.__webglColorRenderbuffer[ i ] = _gl.createRenderbuffer();

						_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[ i ] );

						const glFormat = utils.convert( texture.format, texture.colorSpace );
						const glType = utils.convert( texture.type );
						const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType, texture.colorSpace, renderTarget.isXRRenderTarget === true );
						const samples = getRenderTargetSamples( renderTarget );
						_gl.renderbufferStorageMultisample( _gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height );

						_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[ i ] );

					}

					_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );

					if ( renderTarget.depthBuffer ) {

						renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
						setupRenderBufferStorage( renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true );

					}

					state.bindFramebuffer( _gl.FRAMEBUFFER, null );

				}

			}

			// Setup color buffer

			if ( isCube ) {

				state.bindTexture( _gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture );
				setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, supportsMips );

				for ( let i = 0; i < 6; i ++ ) {

					if ( isWebGL2 && texture.mipmaps && texture.mipmaps.length > 0 ) {

						for ( let level = 0; level < texture.mipmaps.length; level ++ ) {

							setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ][ level ], renderTarget, texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level );

						}

					} else {

						setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ], renderTarget, texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0 );

					}

				}

				if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

					generateMipmap( _gl.TEXTURE_CUBE_MAP );

				}

				state.unbindTexture();

			} else if ( isMultipleRenderTargets ) {

				const textures = renderTarget.texture;

				for ( let i = 0, il = textures.length; i < il; i ++ ) {

					const attachment = textures[ i ];
					const attachmentProperties = properties.get( attachment );

					state.bindTexture( _gl.TEXTURE_2D, attachmentProperties.__webglTexture );
					setTextureParameters( _gl.TEXTURE_2D, attachment, supportsMips );
					setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, attachment, _gl.COLOR_ATTACHMENT0 + i, _gl.TEXTURE_2D, 0 );

					if ( textureNeedsGenerateMipmaps( attachment, supportsMips ) ) {

						generateMipmap( _gl.TEXTURE_2D );

					}

				}

				state.unbindTexture();

			} else {

				let glTextureType = _gl.TEXTURE_2D;

				if ( renderTarget.isWebGL3DRenderTarget || renderTarget.isWebGLArrayRenderTarget ) {

					if ( isWebGL2 ) {

						glTextureType = renderTarget.isWebGL3DRenderTarget ? _gl.TEXTURE_3D : _gl.TEXTURE_2D_ARRAY;

					} else {

						console.error( 'THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.' );

					}

				}

				state.bindTexture( glTextureType, textureProperties.__webglTexture );
				setTextureParameters( glTextureType, texture, supportsMips );

				if ( isWebGL2 && texture.mipmaps && texture.mipmaps.length > 0 ) {

					for ( let level = 0; level < texture.mipmaps.length; level ++ ) {

						setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ level ], renderTarget, texture, _gl.COLOR_ATTACHMENT0, glTextureType, level );

					}

				} else {

					setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, texture, _gl.COLOR_ATTACHMENT0, glTextureType, 0 );

				}

				if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

					generateMipmap( glTextureType );

				}

				state.unbindTexture();

			}

			// Setup depth and stencil buffers

			if ( renderTarget.depthBuffer ) {

				setupDepthRenderbuffer( renderTarget );

			}

		}

		function updateRenderTargetMipmap( renderTarget ) {

			const supportsMips = isPowerOfTwo$1( renderTarget ) || isWebGL2;

			const textures = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture : [ renderTarget.texture ];

			for ( let i = 0, il = textures.length; i < il; i ++ ) {

				const texture = textures[ i ];

				if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

					const target = renderTarget.isWebGLCubeRenderTarget ? _gl.TEXTURE_CUBE_MAP : _gl.TEXTURE_2D;
					const webglTexture = properties.get( texture ).__webglTexture;

					state.bindTexture( target, webglTexture );
					generateMipmap( target );
					state.unbindTexture();

				}

			}

		}

		function updateMultisampleRenderTarget( renderTarget ) {

			if ( ( isWebGL2 && renderTarget.samples > 0 ) && useMultisampledRTT( renderTarget ) === false ) {

				const textures = renderTarget.isWebGLMultipleRenderTargets ? renderTarget.texture : [ renderTarget.texture ];
				const width = renderTarget.width;
				const height = renderTarget.height;
				let mask = _gl.COLOR_BUFFER_BIT;
				const invalidationArray = [];
				const depthStyle = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
				const renderTargetProperties = properties.get( renderTarget );
				const isMultipleRenderTargets = ( renderTarget.isWebGLMultipleRenderTargets === true );

				// If MRT we need to remove FBO attachments
				if ( isMultipleRenderTargets ) {

					for ( let i = 0; i < textures.length; i ++ ) {

						state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer );
						_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i, _gl.RENDERBUFFER, null );

						state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer );
						_gl.framebufferTexture2D( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i, _gl.TEXTURE_2D, null, 0 );

					}

				}

				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer );
				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, renderTargetProperties.__webglFramebuffer );

				for ( let i = 0; i < textures.length; i ++ ) {

					invalidationArray.push( _gl.COLOR_ATTACHMENT0 + i );

					if ( renderTarget.depthBuffer ) {

						invalidationArray.push( depthStyle );

					}

					const ignoreDepthValues = ( renderTargetProperties.__ignoreDepthValues !== undefined ) ? renderTargetProperties.__ignoreDepthValues : false;

					if ( ignoreDepthValues === false ) {

						if ( renderTarget.depthBuffer ) mask |= _gl.DEPTH_BUFFER_BIT;
						if ( renderTarget.stencilBuffer ) mask |= _gl.STENCIL_BUFFER_BIT;

					}

					if ( isMultipleRenderTargets ) {

						_gl.framebufferRenderbuffer( _gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[ i ] );

					}

					if ( ignoreDepthValues === true ) {

						_gl.invalidateFramebuffer( _gl.READ_FRAMEBUFFER, [ depthStyle ] );
						_gl.invalidateFramebuffer( _gl.DRAW_FRAMEBUFFER, [ depthStyle ] );

					}

					if ( isMultipleRenderTargets ) {

						const webglTexture = properties.get( textures[ i ] ).__webglTexture;
						_gl.framebufferTexture2D( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, webglTexture, 0 );

					}

					_gl.blitFramebuffer( 0, 0, width, height, 0, 0, width, height, mask, _gl.NEAREST );

					if ( supportsInvalidateFramebuffer ) {

						_gl.invalidateFramebuffer( _gl.READ_FRAMEBUFFER, invalidationArray );

					}


				}

				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, null );
				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, null );

				// If MRT since pre-blit we removed the FBO we need to reconstruct the attachments
				if ( isMultipleRenderTargets ) {

					for ( let i = 0; i < textures.length; i ++ ) {

						state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer );
						_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[ i ] );

						const webglTexture = properties.get( textures[ i ] ).__webglTexture;

						state.bindFramebuffer( _gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer );
						_gl.framebufferTexture2D( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i, _gl.TEXTURE_2D, webglTexture, 0 );

					}

				}

				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer );

			}

		}

		function getRenderTargetSamples( renderTarget ) {

			return Math.min( capabilities.maxSamples, renderTarget.samples );

		}

		function useMultisampledRTT( renderTarget ) {

			const renderTargetProperties = properties.get( renderTarget );

			return isWebGL2 && renderTarget.samples > 0 && extensions.has( 'WEBGL_multisampled_render_to_texture' ) === true && renderTargetProperties.__useRenderToTexture !== false;

		}

		function updateVideoTexture( texture ) {

			const frame = info.render.frame;

			// Check the last frame we updated the VideoTexture

			if ( _videoTextures.get( texture ) !== frame ) {

				_videoTextures.set( texture, frame );
				texture.update();

			}

		}

		function verifyColorSpace( texture, image ) {

			const colorSpace = texture.colorSpace;
			const format = texture.format;
			const type = texture.type;

			if ( texture.isCompressedTexture === true || texture.isVideoTexture === true || texture.format === _SRGBAFormat ) return image;

			if ( colorSpace !== LinearSRGBColorSpace && colorSpace !== NoColorSpace ) {

				// sRGB

				if ( ColorManagement.getTransfer( colorSpace ) === SRGBTransfer ) {

					if ( isWebGL2 === false ) {

						// in WebGL 1, try to use EXT_sRGB extension and unsized formats

						if ( extensions.has( 'EXT_sRGB' ) === true && format === RGBAFormat ) {

							texture.format = _SRGBAFormat;

							// it's not possible to generate mips in WebGL 1 with this extension

							texture.minFilter = LinearFilter;
							texture.generateMipmaps = false;

						} else {

							// slow fallback (CPU decode)

							image = ImageUtils.sRGBToLinear( image );

						}

					} else {

						// in WebGL 2 uncompressed textures can only be sRGB encoded if they have the RGBA8 format

						if ( format !== RGBAFormat || type !== UnsignedByteType ) {

							console.warn( 'THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.' );

						}

					}

				} else {

					console.error( 'THREE.WebGLTextures: Unsupported texture color space:', colorSpace );

				}

			}

			return image;

		}

		//

		this.allocateTextureUnit = allocateTextureUnit;
		this.resetTextureUnits = resetTextureUnits;

		this.setTexture2D = setTexture2D;
		this.setTexture2DArray = setTexture2DArray;
		this.setTexture3D = setTexture3D;
		this.setTextureCube = setTextureCube;
		this.rebindTextures = rebindTextures;
		this.setupRenderTarget = setupRenderTarget;
		this.updateRenderTargetMipmap = updateRenderTargetMipmap;
		this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;
		this.setupDepthRenderbuffer = setupDepthRenderbuffer;
		this.setupFrameBufferTexture = setupFrameBufferTexture;
		this.useMultisampledRTT = useMultisampledRTT;

	}

	function WebGLUtils( gl, extensions, capabilities ) {

		const isWebGL2 = capabilities.isWebGL2;

		function convert( p, colorSpace = NoColorSpace ) {

			let extension;

			const transfer = ColorManagement.getTransfer( colorSpace );

			if ( p === UnsignedByteType ) return gl.UNSIGNED_BYTE;
			if ( p === UnsignedShort4444Type ) return gl.UNSIGNED_SHORT_4_4_4_4;
			if ( p === UnsignedShort5551Type ) return gl.UNSIGNED_SHORT_5_5_5_1;

			if ( p === ByteType ) return gl.BYTE;
			if ( p === ShortType ) return gl.SHORT;
			if ( p === UnsignedShortType ) return gl.UNSIGNED_SHORT;
			if ( p === IntType ) return gl.INT;
			if ( p === UnsignedIntType ) return gl.UNSIGNED_INT;
			if ( p === FloatType ) return gl.FLOAT;

			if ( p === HalfFloatType ) {

				if ( isWebGL2 ) return gl.HALF_FLOAT;

				extension = extensions.get( 'OES_texture_half_float' );

				if ( extension !== null ) {

					return extension.HALF_FLOAT_OES;

				} else {

					return null;

				}

			}

			if ( p === AlphaFormat ) return gl.ALPHA;
			if ( p === RGBAFormat ) return gl.RGBA;
			if ( p === LuminanceFormat ) return gl.LUMINANCE;
			if ( p === LuminanceAlphaFormat ) return gl.LUMINANCE_ALPHA;
			if ( p === DepthFormat ) return gl.DEPTH_COMPONENT;
			if ( p === DepthStencilFormat ) return gl.DEPTH_STENCIL;

			// WebGL 1 sRGB fallback

			if ( p === _SRGBAFormat ) {

				extension = extensions.get( 'EXT_sRGB' );

				if ( extension !== null ) {

					return extension.SRGB_ALPHA_EXT;

				} else {

					return null;

				}

			}

			// WebGL2 formats.

			if ( p === RedFormat ) return gl.RED;
			if ( p === RedIntegerFormat ) return gl.RED_INTEGER;
			if ( p === RGFormat ) return gl.RG;
			if ( p === RGIntegerFormat ) return gl.RG_INTEGER;
			if ( p === RGBAIntegerFormat ) return gl.RGBA_INTEGER;

			// S3TC

			if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format || p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

				if ( transfer === SRGBTransfer ) {

					extension = extensions.get( 'WEBGL_compressed_texture_s3tc_srgb' );

					if ( extension !== null ) {

						if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_SRGB_S3TC_DXT1_EXT;
						if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
						if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
						if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;

					} else {

						return null;

					}

				} else {

					extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

					if ( extension !== null ) {

						if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
						if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
						if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
						if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

					} else {

						return null;

					}

				}

			}

			// PVRTC

			if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format || p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

				if ( extension !== null ) {

					if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

				} else {

					return null;

				}

			}

			// ETC1

			if ( p === RGB_ETC1_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

				if ( extension !== null ) {

					return extension.COMPRESSED_RGB_ETC1_WEBGL;

				} else {

					return null;

				}

			}

			// ETC2

			if ( p === RGB_ETC2_Format || p === RGBA_ETC2_EAC_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_etc' );

				if ( extension !== null ) {

					if ( p === RGB_ETC2_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ETC2 : extension.COMPRESSED_RGB8_ETC2;
					if ( p === RGBA_ETC2_EAC_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : extension.COMPRESSED_RGBA8_ETC2_EAC;

				} else {

					return null;

				}

			}

			// ASTC

			if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
				p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
				p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
				p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
				p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ) {

				extension = extensions.get( 'WEBGL_compressed_texture_astc' );

				if ( extension !== null ) {

					if ( p === RGBA_ASTC_4x4_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : extension.COMPRESSED_RGBA_ASTC_4x4_KHR;
					if ( p === RGBA_ASTC_5x4_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : extension.COMPRESSED_RGBA_ASTC_5x4_KHR;
					if ( p === RGBA_ASTC_5x5_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : extension.COMPRESSED_RGBA_ASTC_5x5_KHR;
					if ( p === RGBA_ASTC_6x5_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : extension.COMPRESSED_RGBA_ASTC_6x5_KHR;
					if ( p === RGBA_ASTC_6x6_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : extension.COMPRESSED_RGBA_ASTC_6x6_KHR;
					if ( p === RGBA_ASTC_8x5_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : extension.COMPRESSED_RGBA_ASTC_8x5_KHR;
					if ( p === RGBA_ASTC_8x6_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : extension.COMPRESSED_RGBA_ASTC_8x6_KHR;
					if ( p === RGBA_ASTC_8x8_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : extension.COMPRESSED_RGBA_ASTC_8x8_KHR;
					if ( p === RGBA_ASTC_10x5_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : extension.COMPRESSED_RGBA_ASTC_10x5_KHR;
					if ( p === RGBA_ASTC_10x6_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : extension.COMPRESSED_RGBA_ASTC_10x6_KHR;
					if ( p === RGBA_ASTC_10x8_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : extension.COMPRESSED_RGBA_ASTC_10x8_KHR;
					if ( p === RGBA_ASTC_10x10_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : extension.COMPRESSED_RGBA_ASTC_10x10_KHR;
					if ( p === RGBA_ASTC_12x10_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : extension.COMPRESSED_RGBA_ASTC_12x10_KHR;
					if ( p === RGBA_ASTC_12x12_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : extension.COMPRESSED_RGBA_ASTC_12x12_KHR;

				} else {

					return null;

				}

			}

			// BPTC

			if ( p === RGBA_BPTC_Format || p === RGB_BPTC_SIGNED_Format || p === RGB_BPTC_UNSIGNED_Format ) {

				extension = extensions.get( 'EXT_texture_compression_bptc' );

				if ( extension !== null ) {

					if ( p === RGBA_BPTC_Format ) return ( transfer === SRGBTransfer ) ? extension.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : extension.COMPRESSED_RGBA_BPTC_UNORM_EXT;
					if ( p === RGB_BPTC_SIGNED_Format ) return extension.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
					if ( p === RGB_BPTC_UNSIGNED_Format ) return extension.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;

				} else {

					return null;

				}

			}

			// RGTC

			if ( p === RED_RGTC1_Format || p === SIGNED_RED_RGTC1_Format || p === RED_GREEN_RGTC2_Format || p === SIGNED_RED_GREEN_RGTC2_Format ) {

				extension = extensions.get( 'EXT_texture_compression_rgtc' );

				if ( extension !== null ) {

					if ( p === RGBA_BPTC_Format ) return extension.COMPRESSED_RED_RGTC1_EXT;
					if ( p === SIGNED_RED_RGTC1_Format ) return extension.COMPRESSED_SIGNED_RED_RGTC1_EXT;
					if ( p === RED_GREEN_RGTC2_Format ) return extension.COMPRESSED_RED_GREEN_RGTC2_EXT;
					if ( p === SIGNED_RED_GREEN_RGTC2_Format ) return extension.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;

				} else {

					return null;

				}

			}

			//

			if ( p === UnsignedInt248Type ) {

				if ( isWebGL2 ) return gl.UNSIGNED_INT_24_8;

				extension = extensions.get( 'WEBGL_depth_texture' );

				if ( extension !== null ) {

					return extension.UNSIGNED_INT_24_8_WEBGL;

				} else {

					return null;

				}

			}

			// if "p" can't be resolved, assume the user defines a WebGL constant as a string (fallback/workaround for packed RGB formats)

			return ( gl[ p ] !== undefined ) ? gl[ p ] : null;

		}

		return { convert: convert };

	}

	class ArrayCamera extends PerspectiveCamera {

		constructor( array = [] ) {

			super();

			this.isArrayCamera = true;

			this.cameras = array;

		}

	}

	class Group extends Object3D {

		constructor() {

			super();

			this.isGroup = true;

			this.type = 'Group';

		}

	}

	const _moveEvent = { type: 'move' };

	class WebXRController {

		constructor() {

			this._targetRay = null;
			this._grip = null;
			this._hand = null;

		}

		getHandSpace() {

			if ( this._hand === null ) {

				this._hand = new Group();
				this._hand.matrixAutoUpdate = false;
				this._hand.visible = false;

				this._hand.joints = {};
				this._hand.inputState = { pinching: false };

			}

			return this._hand;

		}

		getTargetRaySpace() {

			if ( this._targetRay === null ) {

				this._targetRay = new Group();
				this._targetRay.matrixAutoUpdate = false;
				this._targetRay.visible = false;
				this._targetRay.hasLinearVelocity = false;
				this._targetRay.linearVelocity = new Vector3();
				this._targetRay.hasAngularVelocity = false;
				this._targetRay.angularVelocity = new Vector3();

			}

			return this._targetRay;

		}

		getGripSpace() {

			if ( this._grip === null ) {

				this._grip = new Group();
				this._grip.matrixAutoUpdate = false;
				this._grip.visible = false;
				this._grip.hasLinearVelocity = false;
				this._grip.linearVelocity = new Vector3();
				this._grip.hasAngularVelocity = false;
				this._grip.angularVelocity = new Vector3();

			}

			return this._grip;

		}

		dispatchEvent( event ) {

			if ( this._targetRay !== null ) {

				this._targetRay.dispatchEvent( event );

			}

			if ( this._grip !== null ) {

				this._grip.dispatchEvent( event );

			}

			if ( this._hand !== null ) {

				this._hand.dispatchEvent( event );

			}

			return this;

		}

		connect( inputSource ) {

			if ( inputSource && inputSource.hand ) {

				const hand = this._hand;

				if ( hand ) {

					for ( const inputjoint of inputSource.hand.values() ) {

						// Initialize hand with joints when connected
						this._getHandJoint( hand, inputjoint );

					}

				}

			}

			this.dispatchEvent( { type: 'connected', data: inputSource } );

			return this;

		}

		disconnect( inputSource ) {

			this.dispatchEvent( { type: 'disconnected', data: inputSource } );

			if ( this._targetRay !== null ) {

				this._targetRay.visible = false;

			}

			if ( this._grip !== null ) {

				this._grip.visible = false;

			}

			if ( this._hand !== null ) {

				this._hand.visible = false;

			}

			return this;

		}

		update( inputSource, frame, referenceSpace ) {

			let inputPose = null;
			let gripPose = null;
			let handPose = null;

			const targetRay = this._targetRay;
			const grip = this._grip;
			const hand = this._hand;

			if ( inputSource && frame.session.visibilityState !== 'visible-blurred' ) {

				if ( hand && inputSource.hand ) {

					handPose = true;

					for ( const inputjoint of inputSource.hand.values() ) {

						// Update the joints groups with the XRJoint poses
						const jointPose = frame.getJointPose( inputjoint, referenceSpace );

						// The transform of this joint will be updated with the joint pose on each frame
						const joint = this._getHandJoint( hand, inputjoint );

						if ( jointPose !== null ) {

							joint.matrix.fromArray( jointPose.transform.matrix );
							joint.matrix.decompose( joint.position, joint.rotation, joint.scale );
							joint.matrixWorldNeedsUpdate = true;
							joint.jointRadius = jointPose.radius;

						}

						joint.visible = jointPose !== null;

					}

					// Custom events

					// Check pinchz
					const indexTip = hand.joints[ 'index-finger-tip' ];
					const thumbTip = hand.joints[ 'thumb-tip' ];
					const distance = indexTip.position.distanceTo( thumbTip.position );

					const distanceToPinch = 0.02;
					const threshold = 0.005;

					if ( hand.inputState.pinching && distance > distanceToPinch + threshold ) {

						hand.inputState.pinching = false;
						this.dispatchEvent( {
							type: 'pinchend',
							handedness: inputSource.handedness,
							target: this
						} );

					} else if ( ! hand.inputState.pinching && distance <= distanceToPinch - threshold ) {

						hand.inputState.pinching = true;
						this.dispatchEvent( {
							type: 'pinchstart',
							handedness: inputSource.handedness,
							target: this
						} );

					}

				} else {

					if ( grip !== null && inputSource.gripSpace ) {

						gripPose = frame.getPose( inputSource.gripSpace, referenceSpace );

						if ( gripPose !== null ) {

							grip.matrix.fromArray( gripPose.transform.matrix );
							grip.matrix.decompose( grip.position, grip.rotation, grip.scale );
							grip.matrixWorldNeedsUpdate = true;

							if ( gripPose.linearVelocity ) {

								grip.hasLinearVelocity = true;
								grip.linearVelocity.copy( gripPose.linearVelocity );

							} else {

								grip.hasLinearVelocity = false;

							}

							if ( gripPose.angularVelocity ) {

								grip.hasAngularVelocity = true;
								grip.angularVelocity.copy( gripPose.angularVelocity );

							} else {

								grip.hasAngularVelocity = false;

							}

						}

					}

				}

				if ( targetRay !== null ) {

					inputPose = frame.getPose( inputSource.targetRaySpace, referenceSpace );

					// Some runtimes (namely Vive Cosmos with Vive OpenXR Runtime) have only grip space and ray space is equal to it
					if ( inputPose === null && gripPose !== null ) {

						inputPose = gripPose;

					}

					if ( inputPose !== null ) {

						targetRay.matrix.fromArray( inputPose.transform.matrix );
						targetRay.matrix.decompose( targetRay.position, targetRay.rotation, targetRay.scale );
						targetRay.matrixWorldNeedsUpdate = true;

						if ( inputPose.linearVelocity ) {

							targetRay.hasLinearVelocity = true;
							targetRay.linearVelocity.copy( inputPose.linearVelocity );

						} else {

							targetRay.hasLinearVelocity = false;

						}

						if ( inputPose.angularVelocity ) {

							targetRay.hasAngularVelocity = true;
							targetRay.angularVelocity.copy( inputPose.angularVelocity );

						} else {

							targetRay.hasAngularVelocity = false;

						}

						this.dispatchEvent( _moveEvent );

					}

				}


			}

			if ( targetRay !== null ) {

				targetRay.visible = ( inputPose !== null );

			}

			if ( grip !== null ) {

				grip.visible = ( gripPose !== null );

			}

			if ( hand !== null ) {

				hand.visible = ( handPose !== null );

			}

			return this;

		}

		// private method

		_getHandJoint( hand, inputjoint ) {

			if ( hand.joints[ inputjoint.jointName ] === undefined ) {

				const joint = new Group();
				joint.matrixAutoUpdate = false;
				joint.visible = false;
				hand.joints[ inputjoint.jointName ] = joint;

				hand.add( joint );

			}

			return hand.joints[ inputjoint.jointName ];

		}

	}

	class WebXRManager extends EventDispatcher {

		constructor( renderer, gl ) {

			super();

			const scope = this;

			let session = null;

			let framebufferScaleFactor = 1.0;

			let referenceSpace = null;
			let referenceSpaceType = 'local-floor';
			// Set default foveation to maximum.
			let foveation = 1.0;
			let customReferenceSpace = null;

			let pose = null;
			let glBinding = null;
			let glProjLayer = null;
			let glBaseLayer = null;
			let xrFrame = null;
			const attributes = gl.getContextAttributes();
			let initialRenderTarget = null;
			let newRenderTarget = null;

			const controllers = [];
			const controllerInputSources = [];

			const currentSize = new Vector2();
			let currentPixelRatio = null;

			//

			const cameraL = new PerspectiveCamera();
			cameraL.layers.enable( 1 );
			cameraL.viewport = new Vector4();

			const cameraR = new PerspectiveCamera();
			cameraR.layers.enable( 2 );
			cameraR.viewport = new Vector4();

			const cameras = [ cameraL, cameraR ];

			const cameraXR = new ArrayCamera();
			cameraXR.layers.enable( 1 );
			cameraXR.layers.enable( 2 );

			let _currentDepthNear = null;
			let _currentDepthFar = null;

			//

			this.cameraAutoUpdate = true;
			this.enabled = false;

			this.isPresenting = false;

			this.getController = function ( index ) {

				let controller = controllers[ index ];

				if ( controller === undefined ) {

					controller = new WebXRController();
					controllers[ index ] = controller;

				}

				return controller.getTargetRaySpace();

			};

			this.getControllerGrip = function ( index ) {

				let controller = controllers[ index ];

				if ( controller === undefined ) {

					controller = new WebXRController();
					controllers[ index ] = controller;

				}

				return controller.getGripSpace();

			};

			this.getHand = function ( index ) {

				let controller = controllers[ index ];

				if ( controller === undefined ) {

					controller = new WebXRController();
					controllers[ index ] = controller;

				}

				return controller.getHandSpace();

			};

			//

			function onSessionEvent( event ) {

				const controllerIndex = controllerInputSources.indexOf( event.inputSource );

				if ( controllerIndex === - 1 ) {

					return;

				}

				const controller = controllers[ controllerIndex ];

				if ( controller !== undefined ) {

					controller.update( event.inputSource, event.frame, customReferenceSpace || referenceSpace );
					controller.dispatchEvent( { type: event.type, data: event.inputSource } );

				}

			}

			function onSessionEnd() {

				session.removeEventListener( 'select', onSessionEvent );
				session.removeEventListener( 'selectstart', onSessionEvent );
				session.removeEventListener( 'selectend', onSessionEvent );
				session.removeEventListener( 'squeeze', onSessionEvent );
				session.removeEventListener( 'squeezestart', onSessionEvent );
				session.removeEventListener( 'squeezeend', onSessionEvent );
				session.removeEventListener( 'end', onSessionEnd );
				session.removeEventListener( 'inputsourceschange', onInputSourcesChange );

				for ( let i = 0; i < controllers.length; i ++ ) {

					const inputSource = controllerInputSources[ i ];

					if ( inputSource === null ) continue;

					controllerInputSources[ i ] = null;

					controllers[ i ].disconnect( inputSource );

				}

				_currentDepthNear = null;
				_currentDepthFar = null;

				// restore framebuffer/rendering state

				renderer.setRenderTarget( initialRenderTarget );

				glBaseLayer = null;
				glProjLayer = null;
				glBinding = null;
				session = null;
				newRenderTarget = null;

				//

				animation.stop();

				scope.isPresenting = false;

				renderer.setPixelRatio( currentPixelRatio );
				renderer.setSize( currentSize.width, currentSize.height, false );

				scope.dispatchEvent( { type: 'sessionend' } );

			}

			this.setFramebufferScaleFactor = function ( value ) {

				framebufferScaleFactor = value;

				if ( scope.isPresenting === true ) {

					console.warn( 'THREE.WebXRManager: Cannot change framebuffer scale while presenting.' );

				}

			};

			this.setReferenceSpaceType = function ( value ) {

				referenceSpaceType = value;

				if ( scope.isPresenting === true ) {

					console.warn( 'THREE.WebXRManager: Cannot change reference space type while presenting.' );

				}

			};

			this.getReferenceSpace = function () {

				return customReferenceSpace || referenceSpace;

			};

			this.setReferenceSpace = function ( space ) {

				customReferenceSpace = space;

			};

			this.getBaseLayer = function () {

				return glProjLayer !== null ? glProjLayer : glBaseLayer;

			};

			this.getBinding = function () {

				return glBinding;

			};

			this.getFrame = function () {

				return xrFrame;

			};

			this.getSession = function () {

				return session;

			};

			this.setSession = async function ( value ) {

				session = value;

				if ( session !== null ) {

					initialRenderTarget = renderer.getRenderTarget();

					session.addEventListener( 'select', onSessionEvent );
					session.addEventListener( 'selectstart', onSessionEvent );
					session.addEventListener( 'selectend', onSessionEvent );
					session.addEventListener( 'squeeze', onSessionEvent );
					session.addEventListener( 'squeezestart', onSessionEvent );
					session.addEventListener( 'squeezeend', onSessionEvent );
					session.addEventListener( 'end', onSessionEnd );
					session.addEventListener( 'inputsourceschange', onInputSourcesChange );

					if ( attributes.xrCompatible !== true ) {

						await gl.makeXRCompatible();

					}

					currentPixelRatio = renderer.getPixelRatio();
					renderer.getSize( currentSize );

					if ( ( session.renderState.layers === undefined ) || ( renderer.capabilities.isWebGL2 === false ) ) {

						const layerInit = {
							antialias: ( session.renderState.layers === undefined ) ? attributes.antialias : true,
							alpha: true,
							depth: attributes.depth,
							stencil: attributes.stencil,
							framebufferScaleFactor: framebufferScaleFactor
						};

						glBaseLayer = new XRWebGLLayer( session, gl, layerInit );

						session.updateRenderState( { baseLayer: glBaseLayer } );

						renderer.setPixelRatio( 1 );
						renderer.setSize( glBaseLayer.framebufferWidth, glBaseLayer.framebufferHeight, false );

						newRenderTarget = new WebGLRenderTarget(
							glBaseLayer.framebufferWidth,
							glBaseLayer.framebufferHeight,
							{
								format: RGBAFormat,
								type: UnsignedByteType,
								colorSpace: renderer.outputColorSpace,
								stencilBuffer: attributes.stencil
							}
						);

					} else {

						let depthFormat = null;
						let depthType = null;
						let glDepthFormat = null;

						if ( attributes.depth ) {

							glDepthFormat = attributes.stencil ? gl.DEPTH24_STENCIL8 : gl.DEPTH_COMPONENT24;
							depthFormat = attributes.stencil ? DepthStencilFormat : DepthFormat;
							depthType = attributes.stencil ? UnsignedInt248Type : UnsignedIntType;

						}

						const projectionlayerInit = {
							colorFormat: gl.RGBA8,
							depthFormat: glDepthFormat,
							scaleFactor: framebufferScaleFactor
						};

						glBinding = new XRWebGLBinding( session, gl );

						glProjLayer = glBinding.createProjectionLayer( projectionlayerInit );

						session.updateRenderState( { layers: [ glProjLayer ] } );

						renderer.setPixelRatio( 1 );
						renderer.setSize( glProjLayer.textureWidth, glProjLayer.textureHeight, false );

						newRenderTarget = new WebGLRenderTarget(
							glProjLayer.textureWidth,
							glProjLayer.textureHeight,
							{
								format: RGBAFormat,
								type: UnsignedByteType,
								depthTexture: new DepthTexture( glProjLayer.textureWidth, glProjLayer.textureHeight, depthType, undefined, undefined, undefined, undefined, undefined, undefined, depthFormat ),
								stencilBuffer: attributes.stencil,
								colorSpace: renderer.outputColorSpace,
								samples: attributes.antialias ? 4 : 0
							} );

						const renderTargetProperties = renderer.properties.get( newRenderTarget );
						renderTargetProperties.__ignoreDepthValues = glProjLayer.ignoreDepthValues;

					}

					newRenderTarget.isXRRenderTarget = true; // TODO Remove this when possible, see #23278

					this.setFoveation( foveation );

					customReferenceSpace = null;
					referenceSpace = await session.requestReferenceSpace( referenceSpaceType );

					animation.setContext( session );
					animation.start();

					scope.isPresenting = true;

					scope.dispatchEvent( { type: 'sessionstart' } );

				}

			};

			this.getEnvironmentBlendMode = function () {

				if ( session !== null ) {

					return session.environmentBlendMode;

				}

			};

			function onInputSourcesChange( event ) {

				// Notify disconnected

				for ( let i = 0; i < event.removed.length; i ++ ) {

					const inputSource = event.removed[ i ];
					const index = controllerInputSources.indexOf( inputSource );

					if ( index >= 0 ) {

						controllerInputSources[ index ] = null;
						controllers[ index ].disconnect( inputSource );

					}

				}

				// Notify connected

				for ( let i = 0; i < event.added.length; i ++ ) {

					const inputSource = event.added[ i ];

					let controllerIndex = controllerInputSources.indexOf( inputSource );

					if ( controllerIndex === - 1 ) {

						// Assign input source a controller that currently has no input source

						for ( let i = 0; i < controllers.length; i ++ ) {

							if ( i >= controllerInputSources.length ) {

								controllerInputSources.push( inputSource );
								controllerIndex = i;
								break;

							} else if ( controllerInputSources[ i ] === null ) {

								controllerInputSources[ i ] = inputSource;
								controllerIndex = i;
								break;

							}

						}

						// If all controllers do currently receive input we ignore new ones

						if ( controllerIndex === - 1 ) break;

					}

					const controller = controllers[ controllerIndex ];

					if ( controller ) {

						controller.connect( inputSource );

					}

				}

			}

			//

			const cameraLPos = new Vector3();
			const cameraRPos = new Vector3();

			/**
			 * Assumes 2 cameras that are parallel and share an X-axis, and that
			 * the cameras' projection and world matrices have already been set.
			 * And that near and far planes are identical for both cameras.
			 * Visualization of this technique: https://computergraphics.stackexchange.com/a/4765
			 */
			function setProjectionFromUnion( camera, cameraL, cameraR ) {

				cameraLPos.setFromMatrixPosition( cameraL.matrixWorld );
				cameraRPos.setFromMatrixPosition( cameraR.matrixWorld );

				const ipd = cameraLPos.distanceTo( cameraRPos );

				const projL = cameraL.projectionMatrix.elements;
				const projR = cameraR.projectionMatrix.elements;

				// VR systems will have identical far and near planes, and
				// most likely identical top and bottom frustum extents.
				// Use the left camera for these values.
				const near = projL[ 14 ] / ( projL[ 10 ] - 1 );
				const far = projL[ 14 ] / ( projL[ 10 ] + 1 );
				const topFov = ( projL[ 9 ] + 1 ) / projL[ 5 ];
				const bottomFov = ( projL[ 9 ] - 1 ) / projL[ 5 ];

				const leftFov = ( projL[ 8 ] - 1 ) / projL[ 0 ];
				const rightFov = ( projR[ 8 ] + 1 ) / projR[ 0 ];
				const left = near * leftFov;
				const right = near * rightFov;

				// Calculate the new camera's position offset from the
				// left camera. xOffset should be roughly half `ipd`.
				const zOffset = ipd / ( - leftFov + rightFov );
				const xOffset = zOffset * - leftFov;

				// TODO: Better way to apply this offset?
				cameraL.matrixWorld.decompose( camera.position, camera.quaternion, camera.scale );
				camera.translateX( xOffset );
				camera.translateZ( zOffset );
				camera.matrixWorld.compose( camera.position, camera.quaternion, camera.scale );
				camera.matrixWorldInverse.copy( camera.matrixWorld ).invert();

				// Find the union of the frustum values of the cameras and scale
				// the values so that the near plane's position does not change in world space,
				// although must now be relative to the new union camera.
				const near2 = near + zOffset;
				const far2 = far + zOffset;
				const left2 = left - xOffset;
				const right2 = right + ( ipd - xOffset );
				const top2 = topFov * far / far2 * near2;
				const bottom2 = bottomFov * far / far2 * near2;

				camera.projectionMatrix.makePerspective( left2, right2, top2, bottom2, near2, far2 );
				camera.projectionMatrixInverse.copy( camera.projectionMatrix ).invert();

			}

			function updateCamera( camera, parent ) {

				if ( parent === null ) {

					camera.matrixWorld.copy( camera.matrix );

				} else {

					camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

				}

				camera.matrixWorldInverse.copy( camera.matrixWorld ).invert();

			}

			this.updateCamera = function ( camera ) {

				if ( session === null ) return;

				cameraXR.near = cameraR.near = cameraL.near = camera.near;
				cameraXR.far = cameraR.far = cameraL.far = camera.far;

				if ( _currentDepthNear !== cameraXR.near || _currentDepthFar !== cameraXR.far ) {

					// Note that the new renderState won't apply until the next frame. See #18320

					session.updateRenderState( {
						depthNear: cameraXR.near,
						depthFar: cameraXR.far
					} );

					_currentDepthNear = cameraXR.near;
					_currentDepthFar = cameraXR.far;

				}

				const parent = camera.parent;
				const cameras = cameraXR.cameras;

				updateCamera( cameraXR, parent );

				for ( let i = 0; i < cameras.length; i ++ ) {

					updateCamera( cameras[ i ], parent );

				}

				// update projection matrix for proper view frustum culling

				if ( cameras.length === 2 ) {

					setProjectionFromUnion( cameraXR, cameraL, cameraR );

				} else {

					// assume single camera setup (AR)

					cameraXR.projectionMatrix.copy( cameraL.projectionMatrix );

				}

				// update user camera and its children

				updateUserCamera( camera, cameraXR, parent );

			};

			function updateUserCamera( camera, cameraXR, parent ) {

				if ( parent === null ) {

					camera.matrix.copy( cameraXR.matrixWorld );

				} else {

					camera.matrix.copy( parent.matrixWorld );
					camera.matrix.invert();
					camera.matrix.multiply( cameraXR.matrixWorld );

				}

				camera.matrix.decompose( camera.position, camera.quaternion, camera.scale );
				camera.updateMatrixWorld( true );

				camera.projectionMatrix.copy( cameraXR.projectionMatrix );
				camera.projectionMatrixInverse.copy( cameraXR.projectionMatrixInverse );

				if ( camera.isPerspectiveCamera ) {

					camera.fov = RAD2DEG * 2 * Math.atan( 1 / camera.projectionMatrix.elements[ 5 ] );
					camera.zoom = 1;

				}

			}

			this.getCamera = function () {

				return cameraXR;

			};

			this.getFoveation = function () {

				if ( glProjLayer === null && glBaseLayer === null ) {

					return undefined;

				}

				return foveation;

			};

			this.setFoveation = function ( value ) {

				// 0 = no foveation = full resolution
				// 1 = maximum foveation = the edges render at lower resolution

				foveation = value;

				if ( glProjLayer !== null ) {

					glProjLayer.fixedFoveation = value;

				}

				if ( glBaseLayer !== null && glBaseLayer.fixedFoveation !== undefined ) {

					glBaseLayer.fixedFoveation = value;

				}

			};

			// Animation Loop

			let onAnimationFrameCallback = null;

			function onAnimationFrame( time, frame ) {

				pose = frame.getViewerPose( customReferenceSpace || referenceSpace );
				xrFrame = frame;

				if ( pose !== null ) {

					const views = pose.views;

					if ( glBaseLayer !== null ) {

						renderer.setRenderTargetFramebuffer( newRenderTarget, glBaseLayer.framebuffer );
						renderer.setRenderTarget( newRenderTarget );

					}

					let cameraXRNeedsUpdate = false;

					// check if it's necessary to rebuild cameraXR's camera list

					if ( views.length !== cameraXR.cameras.length ) {

						cameraXR.cameras.length = 0;
						cameraXRNeedsUpdate = true;

					}

					for ( let i = 0; i < views.length; i ++ ) {

						const view = views[ i ];

						let viewport = null;

						if ( glBaseLayer !== null ) {

							viewport = glBaseLayer.getViewport( view );

						} else {

							const glSubImage = glBinding.getViewSubImage( glProjLayer, view );
							viewport = glSubImage.viewport;

							// For side-by-side projection, we only produce a single texture for both eyes.
							if ( i === 0 ) {

								renderer.setRenderTargetTextures(
									newRenderTarget,
									glSubImage.colorTexture,
									glProjLayer.ignoreDepthValues ? undefined : glSubImage.depthStencilTexture );

								renderer.setRenderTarget( newRenderTarget );

							}

						}

						let camera = cameras[ i ];

						if ( camera === undefined ) {

							camera = new PerspectiveCamera();
							camera.layers.enable( i );
							camera.viewport = new Vector4();
							cameras[ i ] = camera;

						}

						camera.matrix.fromArray( view.transform.matrix );
						camera.matrix.decompose( camera.position, camera.quaternion, camera.scale );
						camera.projectionMatrix.fromArray( view.projectionMatrix );
						camera.projectionMatrixInverse.copy( camera.projectionMatrix ).invert();
						camera.viewport.set( viewport.x, viewport.y, viewport.width, viewport.height );

						if ( i === 0 ) {

							cameraXR.matrix.copy( camera.matrix );
							cameraXR.matrix.decompose( cameraXR.position, cameraXR.quaternion, cameraXR.scale );

						}

						if ( cameraXRNeedsUpdate === true ) {

							cameraXR.cameras.push( camera );

						}

					}

				}

				//

				for ( let i = 0; i < controllers.length; i ++ ) {

					const inputSource = controllerInputSources[ i ];
					const controller = controllers[ i ];

					if ( inputSource !== null && controller !== undefined ) {

						controller.update( inputSource, frame, customReferenceSpace || referenceSpace );

					}

				}

				if ( onAnimationFrameCallback ) onAnimationFrameCallback( time, frame );

				if ( frame.detectedPlanes ) {

					scope.dispatchEvent( { type: 'planesdetected', data: frame } );

				}

				xrFrame = null;

			}

			const animation = new WebGLAnimation();

			animation.setAnimationLoop( onAnimationFrame );

			this.setAnimationLoop = function ( callback ) {

				onAnimationFrameCallback = callback;

			};

			this.dispose = function () {};

		}

	}

	function WebGLMaterials( renderer, properties ) {

		function refreshTransformUniform( map, uniform ) {

			if ( map.matrixAutoUpdate === true ) {

				map.updateMatrix();

			}

			uniform.value.copy( map.matrix );

		}

		function refreshFogUniforms( uniforms, fog ) {

			fog.color.getRGB( uniforms.fogColor.value, getUnlitUniformColorSpace( renderer ) );

			if ( fog.isFog ) {

				uniforms.fogNear.value = fog.near;
				uniforms.fogFar.value = fog.far;

			} else if ( fog.isFogExp2 ) {

				uniforms.fogDensity.value = fog.density;

			}

		}

		function refreshMaterialUniforms( uniforms, material, pixelRatio, height, transmissionRenderTarget ) {

			if ( material.isMeshBasicMaterial ) {

				refreshUniformsCommon( uniforms, material );

			} else if ( material.isMeshLambertMaterial ) {

				refreshUniformsCommon( uniforms, material );

			} else if ( material.isMeshToonMaterial ) {

				refreshUniformsCommon( uniforms, material );
				refreshUniformsToon( uniforms, material );

			} else if ( material.isMeshPhongMaterial ) {

				refreshUniformsCommon( uniforms, material );
				refreshUniformsPhong( uniforms, material );

			} else if ( material.isMeshStandardMaterial ) {

				refreshUniformsCommon( uniforms, material );
				refreshUniformsStandard( uniforms, material );

				if ( material.isMeshPhysicalMaterial ) {

					refreshUniformsPhysical( uniforms, material, transmissionRenderTarget );

				}

			} else if ( material.isMeshMatcapMaterial ) {

				refreshUniformsCommon( uniforms, material );
				refreshUniformsMatcap( uniforms, material );

			} else if ( material.isMeshDepthMaterial ) {

				refreshUniformsCommon( uniforms, material );

			} else if ( material.isMeshDistanceMaterial ) {

				refreshUniformsCommon( uniforms, material );
				refreshUniformsDistance( uniforms, material );

			} else if ( material.isMeshNormalMaterial ) {

				refreshUniformsCommon( uniforms, material );

			} else if ( material.isLineBasicMaterial ) {

				refreshUniformsLine( uniforms, material );

				if ( material.isLineDashedMaterial ) {

					refreshUniformsDash( uniforms, material );

				}

			} else if ( material.isPointsMaterial ) {

				refreshUniformsPoints( uniforms, material, pixelRatio, height );

			} else if ( material.isSpriteMaterial ) {

				refreshUniformsSprites( uniforms, material );

			} else if ( material.isShadowMaterial ) {

				uniforms.color.value.copy( material.color );
				uniforms.opacity.value = material.opacity;

			} else if ( material.isShaderMaterial ) {

				material.uniformsNeedUpdate = false; // #15581

			}

		}

		function refreshUniformsCommon( uniforms, material ) {

			uniforms.opacity.value = material.opacity;

			if ( material.color ) {

				uniforms.diffuse.value.copy( material.color );

			}

			if ( material.emissive ) {

				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

			}

			if ( material.map ) {

				uniforms.map.value = material.map;

				refreshTransformUniform( material.map, uniforms.mapTransform );

			}

			if ( material.alphaMap ) {

				uniforms.alphaMap.value = material.alphaMap;

				refreshTransformUniform( material.alphaMap, uniforms.alphaMapTransform );

			}

			if ( material.bumpMap ) {

				uniforms.bumpMap.value = material.bumpMap;

				refreshTransformUniform( material.bumpMap, uniforms.bumpMapTransform );

				uniforms.bumpScale.value = material.bumpScale;

				if ( material.side === BackSide ) {

					uniforms.bumpScale.value *= - 1;

				}

			}

			if ( material.normalMap ) {

				uniforms.normalMap.value = material.normalMap;

				refreshTransformUniform( material.normalMap, uniforms.normalMapTransform );

				uniforms.normalScale.value.copy( material.normalScale );

				if ( material.side === BackSide ) {

					uniforms.normalScale.value.negate();

				}

			}

			if ( material.displacementMap ) {

				uniforms.displacementMap.value = material.displacementMap;

				refreshTransformUniform( material.displacementMap, uniforms.displacementMapTransform );

				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

			}

			if ( material.emissiveMap ) {

				uniforms.emissiveMap.value = material.emissiveMap;

				refreshTransformUniform( material.emissiveMap, uniforms.emissiveMapTransform );

			}

			if ( material.specularMap ) {

				uniforms.specularMap.value = material.specularMap;

				refreshTransformUniform( material.specularMap, uniforms.specularMapTransform );

			}

			if ( material.alphaTest > 0 ) {

				uniforms.alphaTest.value = material.alphaTest;

			}

			const envMap = properties.get( material ).envMap;

			if ( envMap ) {

				uniforms.envMap.value = envMap;

				uniforms.flipEnvMap.value = ( envMap.isCubeTexture && envMap.isRenderTargetTexture === false ) ? - 1 : 1;

				uniforms.reflectivity.value = material.reflectivity;
				uniforms.ior.value = material.ior;
				uniforms.refractionRatio.value = material.refractionRatio;

			}

			if ( material.lightMap ) {

				uniforms.lightMap.value = material.lightMap;

				// artist-friendly light intensity scaling factor
				const scaleFactor = ( renderer._useLegacyLights === true ) ? Math.PI : 1;

				uniforms.lightMapIntensity.value = material.lightMapIntensity * scaleFactor;

				refreshTransformUniform( material.lightMap, uniforms.lightMapTransform );

			}

			if ( material.aoMap ) {

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

				refreshTransformUniform( material.aoMap, uniforms.aoMapTransform );

			}

		}

		function refreshUniformsLine( uniforms, material ) {

			uniforms.diffuse.value.copy( material.color );
			uniforms.opacity.value = material.opacity;

			if ( material.map ) {

				uniforms.map.value = material.map;

				refreshTransformUniform( material.map, uniforms.mapTransform );

			}

		}

		function refreshUniformsDash( uniforms, material ) {

			uniforms.dashSize.value = material.dashSize;
			uniforms.totalSize.value = material.dashSize + material.gapSize;
			uniforms.scale.value = material.scale;

		}

		function refreshUniformsPoints( uniforms, material, pixelRatio, height ) {

			uniforms.diffuse.value.copy( material.color );
			uniforms.opacity.value = material.opacity;
			uniforms.size.value = material.size * pixelRatio;
			uniforms.scale.value = height * 0.5;

			if ( material.map ) {

				uniforms.map.value = material.map;

				refreshTransformUniform( material.map, uniforms.uvTransform );

			}

			if ( material.alphaMap ) {

				uniforms.alphaMap.value = material.alphaMap;

				refreshTransformUniform( material.alphaMap, uniforms.alphaMapTransform );

			}

			if ( material.alphaTest > 0 ) {

				uniforms.alphaTest.value = material.alphaTest;

			}

		}

		function refreshUniformsSprites( uniforms, material ) {

			uniforms.diffuse.value.copy( material.color );
			uniforms.opacity.value = material.opacity;
			uniforms.rotation.value = material.rotation;

			if ( material.map ) {

				uniforms.map.value = material.map;

				refreshTransformUniform( material.map, uniforms.mapTransform );

			}

			if ( material.alphaMap ) {

				uniforms.alphaMap.value = material.alphaMap;

				refreshTransformUniform( material.alphaMap, uniforms.alphaMapTransform );

			}

			if ( material.alphaTest > 0 ) {

				uniforms.alphaTest.value = material.alphaTest;

			}

		}

		function refreshUniformsPhong( uniforms, material ) {

			uniforms.specular.value.copy( material.specular );
			uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

		}

		function refreshUniformsToon( uniforms, material ) {

			if ( material.gradientMap ) {

				uniforms.gradientMap.value = material.gradientMap;

			}

		}

		function refreshUniformsStandard( uniforms, material ) {

			uniforms.metalness.value = material.metalness;

			if ( material.metalnessMap ) {

				uniforms.metalnessMap.value = material.metalnessMap;

				refreshTransformUniform( material.metalnessMap, uniforms.metalnessMapTransform );

			}

			uniforms.roughness.value = material.roughness;

			if ( material.roughnessMap ) {

				uniforms.roughnessMap.value = material.roughnessMap;

				refreshTransformUniform( material.roughnessMap, uniforms.roughnessMapTransform );

			}

			const envMap = properties.get( material ).envMap;

			if ( envMap ) {

				//uniforms.envMap.value = material.envMap; // part of uniforms common
				uniforms.envMapIntensity.value = material.envMapIntensity;

			}

		}

		function refreshUniformsPhysical( uniforms, material, transmissionRenderTarget ) {

			uniforms.ior.value = material.ior; // also part of uniforms common

			if ( material.sheen > 0 ) {

				uniforms.sheenColor.value.copy( material.sheenColor ).multiplyScalar( material.sheen );

				uniforms.sheenRoughness.value = material.sheenRoughness;

				if ( material.sheenColorMap ) {

					uniforms.sheenColorMap.value = material.sheenColorMap;

					refreshTransformUniform( material.sheenColorMap, uniforms.sheenColorMapTransform );

				}

				if ( material.sheenRoughnessMap ) {

					uniforms.sheenRoughnessMap.value = material.sheenRoughnessMap;

					refreshTransformUniform( material.sheenRoughnessMap, uniforms.sheenRoughnessMapTransform );

				}

			}

			if ( material.clearcoat > 0 ) {

				uniforms.clearcoat.value = material.clearcoat;
				uniforms.clearcoatRoughness.value = material.clearcoatRoughness;

				if ( material.clearcoatMap ) {

					uniforms.clearcoatMap.value = material.clearcoatMap;

					refreshTransformUniform( material.clearcoatMap, uniforms.clearcoatMapTransform );

				}

				if ( material.clearcoatRoughnessMap ) {

					uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;

					refreshTransformUniform( material.clearcoatRoughnessMap, uniforms.clearcoatRoughnessMapTransform );

				}

				if ( material.clearcoatNormalMap ) {

					uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;

					refreshTransformUniform( material.clearcoatNormalMap, uniforms.clearcoatNormalMapTransform );

					uniforms.clearcoatNormalScale.value.copy( material.clearcoatNormalScale );

					if ( material.side === BackSide ) {

						uniforms.clearcoatNormalScale.value.negate();

					}

				}

			}

			if ( material.iridescence > 0 ) {

				uniforms.iridescence.value = material.iridescence;
				uniforms.iridescenceIOR.value = material.iridescenceIOR;
				uniforms.iridescenceThicknessMinimum.value = material.iridescenceThicknessRange[ 0 ];
				uniforms.iridescenceThicknessMaximum.value = material.iridescenceThicknessRange[ 1 ];

				if ( material.iridescenceMap ) {

					uniforms.iridescenceMap.value = material.iridescenceMap;

					refreshTransformUniform( material.iridescenceMap, uniforms.iridescenceMapTransform );

				}

				if ( material.iridescenceThicknessMap ) {

					uniforms.iridescenceThicknessMap.value = material.iridescenceThicknessMap;

					refreshTransformUniform( material.iridescenceThicknessMap, uniforms.iridescenceThicknessMapTransform );

				}

			}

			if ( material.transmission > 0 ) {

				uniforms.transmission.value = material.transmission;
				uniforms.transmissionSamplerMap.value = transmissionRenderTarget.texture;
				uniforms.transmissionSamplerSize.value.set( transmissionRenderTarget.width, transmissionRenderTarget.height );

				if ( material.transmissionMap ) {

					uniforms.transmissionMap.value = material.transmissionMap;

					refreshTransformUniform( material.transmissionMap, uniforms.transmissionMapTransform );

				}

				uniforms.thickness.value = material.thickness;

				if ( material.thicknessMap ) {

					uniforms.thicknessMap.value = material.thicknessMap;

					refreshTransformUniform( material.thicknessMap, uniforms.thicknessMapTransform );

				}

				uniforms.attenuationDistance.value = material.attenuationDistance;
				uniforms.attenuationColor.value.copy( material.attenuationColor );

			}

			if ( material.anisotropy > 0 ) {

				uniforms.anisotropyVector.value.set( material.anisotropy * Math.cos( material.anisotropyRotation ), material.anisotropy * Math.sin( material.anisotropyRotation ) );

				if ( material.anisotropyMap ) {

					uniforms.anisotropyMap.value = material.anisotropyMap;

					refreshTransformUniform( material.anisotropyMap, uniforms.anisotropyMapTransform );

				}

			}

			uniforms.specularIntensity.value = material.specularIntensity;
			uniforms.specularColor.value.copy( material.specularColor );

			if ( material.specularColorMap ) {

				uniforms.specularColorMap.value = material.specularColorMap;

				refreshTransformUniform( material.specularColorMap, uniforms.specularColorMapTransform );

			}

			if ( material.specularIntensityMap ) {

				uniforms.specularIntensityMap.value = material.specularIntensityMap;

				refreshTransformUniform( material.specularIntensityMap, uniforms.specularIntensityMapTransform );

			}

		}

		function refreshUniformsMatcap( uniforms, material ) {

			if ( material.matcap ) {

				uniforms.matcap.value = material.matcap;

			}

		}

		function refreshUniformsDistance( uniforms, material ) {

			const light = properties.get( material ).light;

			uniforms.referencePosition.value.setFromMatrixPosition( light.matrixWorld );
			uniforms.nearDistance.value = light.shadow.camera.near;
			uniforms.farDistance.value = light.shadow.camera.far;

		}

		return {
			refreshFogUniforms: refreshFogUniforms,
			refreshMaterialUniforms: refreshMaterialUniforms
		};

	}

	function WebGLUniformsGroups( gl, info, capabilities, state ) {

		let buffers = {};
		let updateList = {};
		let allocatedBindingPoints = [];

		const maxBindingPoints = ( capabilities.isWebGL2 ) ? gl.getParameter( gl.MAX_UNIFORM_BUFFER_BINDINGS ) : 0; // binding points are global whereas block indices are per shader program

		function bind( uniformsGroup, program ) {

			const webglProgram = program.program;
			state.uniformBlockBinding( uniformsGroup, webglProgram );

		}

		function update( uniformsGroup, program ) {

			let buffer = buffers[ uniformsGroup.id ];

			if ( buffer === undefined ) {

				prepareUniformsGroup( uniformsGroup );

				buffer = createBuffer( uniformsGroup );
				buffers[ uniformsGroup.id ] = buffer;

				uniformsGroup.addEventListener( 'dispose', onUniformsGroupsDispose );

			}

			// ensure to update the binding points/block indices mapping for this program

			const webglProgram = program.program;
			state.updateUBOMapping( uniformsGroup, webglProgram );

			// update UBO once per frame

			const frame = info.render.frame;

			if ( updateList[ uniformsGroup.id ] !== frame ) {

				updateBufferData( uniformsGroup );

				updateList[ uniformsGroup.id ] = frame;

			}

		}

		function createBuffer( uniformsGroup ) {

			// the setup of an UBO is independent of a particular shader program but global

			const bindingPointIndex = allocateBindingPointIndex();
			uniformsGroup.__bindingPointIndex = bindingPointIndex;

			const buffer = gl.createBuffer();
			const size = uniformsGroup.__size;
			const usage = uniformsGroup.usage;

			gl.bindBuffer( gl.UNIFORM_BUFFER, buffer );
			gl.bufferData( gl.UNIFORM_BUFFER, size, usage );
			gl.bindBuffer( gl.UNIFORM_BUFFER, null );
			gl.bindBufferBase( gl.UNIFORM_BUFFER, bindingPointIndex, buffer );

			return buffer;

		}

		function allocateBindingPointIndex() {

			for ( let i = 0; i < maxBindingPoints; i ++ ) {

				if ( allocatedBindingPoints.indexOf( i ) === - 1 ) {

					allocatedBindingPoints.push( i );
					return i;

				}

			}

			console.error( 'THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.' );

			return 0;

		}

		function updateBufferData( uniformsGroup ) {

			const buffer = buffers[ uniformsGroup.id ];
			const uniforms = uniformsGroup.uniforms;
			const cache = uniformsGroup.__cache;

			gl.bindBuffer( gl.UNIFORM_BUFFER, buffer );

			for ( let i = 0, il = uniforms.length; i < il; i ++ ) {

				const uniformArray = Array.isArray( uniforms[ i ] ) ? uniforms[ i ] : [ uniforms[ i ] ];

				for ( let j = 0, jl = uniformArray.length; j < jl; j ++ ) {

					const uniform = uniformArray[ j ];

					if ( hasUniformChanged( uniform, i, j, cache ) === true ) {

						const offset = uniform.__offset;

						const values = Array.isArray( uniform.value ) ? uniform.value : [ uniform.value ];

						let arrayOffset = 0;

						for ( let k = 0; k < values.length; k ++ ) {

							const value = values[ k ];

							const info = getUniformSize( value );

							// TODO add integer and struct support
							if ( typeof value === 'number' || typeof value === 'boolean' ) {

								uniform.__data[ 0 ] = value;
								gl.bufferSubData( gl.UNIFORM_BUFFER, offset + arrayOffset, uniform.__data );

							} else if ( value.isMatrix3 ) {

								// manually converting 3x3 to 3x4

								uniform.__data[ 0 ] = value.elements[ 0 ];
								uniform.__data[ 1 ] = value.elements[ 1 ];
								uniform.__data[ 2 ] = value.elements[ 2 ];
								uniform.__data[ 3 ] = 0;
								uniform.__data[ 4 ] = value.elements[ 3 ];
								uniform.__data[ 5 ] = value.elements[ 4 ];
								uniform.__data[ 6 ] = value.elements[ 5 ];
								uniform.__data[ 7 ] = 0;
								uniform.__data[ 8 ] = value.elements[ 6 ];
								uniform.__data[ 9 ] = value.elements[ 7 ];
								uniform.__data[ 10 ] = value.elements[ 8 ];
								uniform.__data[ 11 ] = 0;

							} else {

								value.toArray( uniform.__data, arrayOffset );

								arrayOffset += info.storage / Float32Array.BYTES_PER_ELEMENT;

							}

						}

						gl.bufferSubData( gl.UNIFORM_BUFFER, offset, uniform.__data );

					}

				}

			}

			gl.bindBuffer( gl.UNIFORM_BUFFER, null );

		}

		function hasUniformChanged( uniform, index, indexArray, cache ) {

			const value = uniform.value;
			const indexString = index + '_' + indexArray;

			if ( cache[ indexString ] === undefined ) {

				// cache entry does not exist so far

				if ( typeof value === 'number' || typeof value === 'boolean' ) {

					cache[ indexString ] = value;

				} else {

					cache[ indexString ] = value.clone();

				}

				return true;

			} else {

				const cachedObject = cache[ indexString ];

				// compare current value with cached entry

				if ( typeof value === 'number' || typeof value === 'boolean' ) {

					if ( cachedObject !== value ) {

						cache[ indexString ] = value;
						return true;

					}

				} else {

					if ( cachedObject.equals( value ) === false ) {

						cachedObject.copy( value );
						return true;

					}

				}

			}

			return false;

		}

		function prepareUniformsGroup( uniformsGroup ) {

			// determine total buffer size according to the STD140 layout
			// Hint: STD140 is the only supported layout in WebGL 2

			const uniforms = uniformsGroup.uniforms;

			let offset = 0; // global buffer offset in bytes
			const chunkSize = 16; // size of a chunk in bytes

			for ( let i = 0, l = uniforms.length; i < l; i ++ ) {

				const uniformArray = Array.isArray( uniforms[ i ] ) ? uniforms[ i ] : [ uniforms[ i ] ];

				for ( let j = 0, jl = uniformArray.length; j < jl; j ++ ) {

					const uniform = uniformArray[ j ];

					const values = Array.isArray( uniform.value ) ? uniform.value : [ uniform.value ];

					for ( let k = 0, kl = values.length; k < kl; k ++ ) {

						const value = values[ k ];

						const info = getUniformSize( value );

						// Calculate the chunk offset
						const chunkOffsetUniform = offset % chunkSize;

						// Check for chunk overflow
						if ( chunkOffsetUniform !== 0 && ( chunkSize - chunkOffsetUniform ) < info.boundary ) {

							// Add padding and adjust offset
							offset += ( chunkSize - chunkOffsetUniform );

						}

						// the following two properties will be used for partial buffer updates

						uniform.__data = new Float32Array( info.storage / Float32Array.BYTES_PER_ELEMENT );
						uniform.__offset = offset;


						// Update the global offset
						offset += info.storage;


					}

				}

			}

			// ensure correct final padding

			const chunkOffset = offset % chunkSize;

			if ( chunkOffset > 0 ) offset += ( chunkSize - chunkOffset );

			//

			uniformsGroup.__size = offset;
			uniformsGroup.__cache = {};

			return this;

		}

		function getUniformSize( value ) {

			const info = {
				boundary: 0, // bytes
				storage: 0 // bytes
			};

			// determine sizes according to STD140

			if ( typeof value === 'number' || typeof value === 'boolean' ) {

				// float/int/bool

				info.boundary = 4;
				info.storage = 4;

			} else if ( value.isVector2 ) {

				// vec2

				info.boundary = 8;
				info.storage = 8;

			} else if ( value.isVector3 || value.isColor ) {

				// vec3

				info.boundary = 16;
				info.storage = 12; // evil: vec3 must start on a 16-byte boundary but it only consumes 12 bytes

			} else if ( value.isVector4 ) {

				// vec4

				info.boundary = 16;
				info.storage = 16;

			} else if ( value.isMatrix3 ) {

				// mat3 (in STD140 a 3x3 matrix is represented as 3x4)

				info.boundary = 48;
				info.storage = 48;

			} else if ( value.isMatrix4 ) {

				// mat4

				info.boundary = 64;
				info.storage = 64;

			} else if ( value.isTexture ) {

				console.warn( 'THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.' );

			} else {

				console.warn( 'THREE.WebGLRenderer: Unsupported uniform value type.', value );

			}

			return info;

		}

		function onUniformsGroupsDispose( event ) {

			const uniformsGroup = event.target;

			uniformsGroup.removeEventListener( 'dispose', onUniformsGroupsDispose );

			const index = allocatedBindingPoints.indexOf( uniformsGroup.__bindingPointIndex );
			allocatedBindingPoints.splice( index, 1 );

			gl.deleteBuffer( buffers[ uniformsGroup.id ] );

			delete buffers[ uniformsGroup.id ];
			delete updateList[ uniformsGroup.id ];

		}

		function dispose() {

			for ( const id in buffers ) {

				gl.deleteBuffer( buffers[ id ] );

			}

			allocatedBindingPoints = [];
			buffers = {};
			updateList = {};

		}

		return {

			bind: bind,
			update: update,

			dispose: dispose

		};

	}

	class WebGLRenderer {

		constructor( parameters = {} ) {

			const {
				canvas = createCanvasElement(),
				context = null,
				depth = true,
				stencil = true,
				alpha = false,
				antialias = false,
				premultipliedAlpha = true,
				preserveDrawingBuffer = false,
				powerPreference = 'default',
				failIfMajorPerformanceCaveat = false,
			} = parameters;

			this.isWebGLRenderer = true;

			let _alpha;

			if ( context !== null ) {

				_alpha = context.getContextAttributes().alpha;

			} else {

				_alpha = alpha;

			}

			const uintClearColor = new Uint32Array( 4 );
			const intClearColor = new Int32Array( 4 );

			let currentRenderList = null;
			let currentRenderState = null;

			// render() can be called from within a callback triggered by another render.
			// We track this so that the nested render call gets its list and state isolated from the parent render call.

			const renderListStack = [];
			const renderStateStack = [];

			// public properties

			this.domElement = canvas;

			// Debug configuration container
			this.debug = {

				/**
				 * Enables error checking and reporting when shader programs are being compiled
				 * @type {boolean}
				 */
				checkShaderErrors: true,
				/**
				 * Callback for custom error reporting.
				 * @type {?Function}
				 */
				onShaderError: null
			};

			// clearing

			this.autoClear = true;
			this.autoClearColor = true;
			this.autoClearDepth = true;
			this.autoClearStencil = true;

			// scene graph

			this.sortObjects = true;

			// user-defined clipping

			this.clippingPlanes = [];
			this.localClippingEnabled = false;

			// physically based shading

			this._outputColorSpace = SRGBColorSpace;

			// physical lights

			this._useLegacyLights = false;

			// tone mapping

			this.toneMapping = NoToneMapping;
			this.toneMappingExposure = 1.0;

			// internal properties

			const _this = this;

			let _isContextLost = false;

			// internal state cache

			let _currentActiveCubeFace = 0;
			let _currentActiveMipmapLevel = 0;
			let _currentRenderTarget = null;
			let _currentMaterialId = - 1;

			let _currentCamera = null;

			const _currentViewport = new Vector4();
			const _currentScissor = new Vector4();
			let _currentScissorTest = null;

			const _currentClearColor = new Color( 0x000000 );
			let _currentClearAlpha = 0;

			//

			let _width = canvas.width;
			let _height = canvas.height;

			let _pixelRatio = 1;
			let _opaqueSort = null;
			let _transparentSort = null;

			const _viewport = new Vector4( 0, 0, _width, _height );
			const _scissor = new Vector4( 0, 0, _width, _height );
			let _scissorTest = false;

			// frustum

			const _frustum = new Frustum();

			// clipping

			let _clippingEnabled = false;
			let _localClippingEnabled = false;

			// transmission

			let _transmissionRenderTarget = null;

			// camera matrices cache

			const _projScreenMatrix = new Matrix4();

			const _vector2 = new Vector2();
			const _vector3 = new Vector3();

			const _emptyScene = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };

			function getTargetPixelRatio() {

				return _currentRenderTarget === null ? _pixelRatio : 1;

			}

			// initialize

			let _gl = context;

			function getContext( contextNames, contextAttributes ) {

				for ( let i = 0; i < contextNames.length; i ++ ) {

					const contextName = contextNames[ i ];
					const context = canvas.getContext( contextName, contextAttributes );
					if ( context !== null ) return context;

				}

				return null;

			}

			try {

				const contextAttributes = {
					alpha: true,
					depth,
					stencil,
					antialias,
					premultipliedAlpha,
					preserveDrawingBuffer,
					powerPreference,
					failIfMajorPerformanceCaveat,
				};

				// OffscreenCanvas does not have setAttribute, see #22811
				if ( 'setAttribute' in canvas ) canvas.setAttribute( 'data-engine', `three.js r${REVISION}` );

				// event listeners must be registered before WebGL context is created, see #12753
				canvas.addEventListener( 'webglcontextlost', onContextLost, false );
				canvas.addEventListener( 'webglcontextrestored', onContextRestore, false );
				canvas.addEventListener( 'webglcontextcreationerror', onContextCreationError, false );

				if ( _gl === null ) {

					const contextNames = [ 'webgl2', 'webgl', 'experimental-webgl' ];

					if ( _this.isWebGL1Renderer === true ) {

						contextNames.shift();

					}

					_gl = getContext( contextNames, contextAttributes );

					if ( _gl === null ) {

						if ( getContext( contextNames ) ) {

							throw new Error( 'Error creating WebGL context with your selected attributes.' );

						} else {

							throw new Error( 'Error creating WebGL context.' );

						}

					}

				}

				if ( typeof WebGLRenderingContext !== 'undefined' && _gl instanceof WebGLRenderingContext ) { // @deprecated, r153

					console.warn( 'THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.' );

				}

				// Some experimental-webgl implementations do not have getShaderPrecisionFormat

				if ( _gl.getShaderPrecisionFormat === undefined ) {

					_gl.getShaderPrecisionFormat = function () {

						return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };

					};

				}

			} catch ( error ) {

				console.error( 'THREE.WebGLRenderer: ' + error.message );
				throw error;

			}

			let extensions, capabilities, state, info;
			let properties, textures, cubemaps, cubeuvmaps, attributes, geometries, objects;
			let programCache, materials, renderLists, renderStates, clipping, shadowMap;

			let background, morphtargets, bufferRenderer, indexedBufferRenderer;

			let utils, bindingStates, uniformsGroups;

			function initGLContext() {

				extensions = new WebGLExtensions( _gl );

				capabilities = new WebGLCapabilities( _gl, extensions, parameters );

				extensions.init( capabilities );

				utils = new WebGLUtils( _gl, extensions, capabilities );

				state = new WebGLState( _gl, extensions, capabilities );

				info = new WebGLInfo( _gl );
				properties = new WebGLProperties();
				textures = new WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info );
				cubemaps = new WebGLCubeMaps( _this );
				cubeuvmaps = new WebGLCubeUVMaps( _this );
				attributes = new WebGLAttributes( _gl, capabilities );
				bindingStates = new WebGLBindingStates( _gl, extensions, attributes, capabilities );
				geometries = new WebGLGeometries( _gl, attributes, info, bindingStates );
				objects = new WebGLObjects( _gl, geometries, attributes, info );
				morphtargets = new WebGLMorphtargets( _gl, capabilities, textures );
				clipping = new WebGLClipping( properties );
				programCache = new WebGLPrograms( _this, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping );
				materials = new WebGLMaterials( _this, properties );
				renderLists = new WebGLRenderLists();
				renderStates = new WebGLRenderStates( extensions, capabilities );
				background = new WebGLBackground( _this, cubemaps, cubeuvmaps, state, objects, _alpha, premultipliedAlpha );
				shadowMap = new WebGLShadowMap( _this, objects, capabilities );
				uniformsGroups = new WebGLUniformsGroups( _gl, info, capabilities, state );

				bufferRenderer = new WebGLBufferRenderer( _gl, extensions, info, capabilities );
				indexedBufferRenderer = new WebGLIndexedBufferRenderer( _gl, extensions, info, capabilities );

				info.programs = programCache.programs;

				_this.capabilities = capabilities;
				_this.extensions = extensions;
				_this.properties = properties;
				_this.renderLists = renderLists;
				_this.shadowMap = shadowMap;
				_this.state = state;
				_this.info = info;

			}

			initGLContext();

			// xr

			const xr = new WebXRManager( _this, _gl );

			this.xr = xr;

			// API

			this.getContext = function () {

				return _gl;

			};

			this.getContextAttributes = function () {

				return _gl.getContextAttributes();

			};

			this.forceContextLoss = function () {

				const extension = extensions.get( 'WEBGL_lose_context' );
				if ( extension ) extension.loseContext();

			};

			this.forceContextRestore = function () {

				const extension = extensions.get( 'WEBGL_lose_context' );
				if ( extension ) extension.restoreContext();

			};

			this.getPixelRatio = function () {

				return _pixelRatio;

			};

			this.setPixelRatio = function ( value ) {

				if ( value === undefined ) return;

				_pixelRatio = value;

				this.setSize( _width, _height, false );

			};

			this.getSize = function ( target ) {

				return target.set( _width, _height );

			};

			this.setSize = function ( width, height, updateStyle = true ) {

				if ( xr.isPresenting ) {

					console.warn( 'THREE.WebGLRenderer: Can\'t change size while VR device is presenting.' );
					return;

				}

				_width = width;
				_height = height;

				canvas.width = Math.floor( width * _pixelRatio );
				canvas.height = Math.floor( height * _pixelRatio );

				if ( updateStyle === true ) {

					canvas.style.width = width + 'px';
					canvas.style.height = height + 'px';

				}

				this.setViewport( 0, 0, width, height );

			};

			this.getDrawingBufferSize = function ( target ) {

				return target.set( _width * _pixelRatio, _height * _pixelRatio ).floor();

			};

			this.setDrawingBufferSize = function ( width, height, pixelRatio ) {

				_width = width;
				_height = height;

				_pixelRatio = pixelRatio;

				canvas.width = Math.floor( width * pixelRatio );
				canvas.height = Math.floor( height * pixelRatio );

				this.setViewport( 0, 0, width, height );

			};

			this.getCurrentViewport = function ( target ) {

				return target.copy( _currentViewport );

			};

			this.getViewport = function ( target ) {

				return target.copy( _viewport );

			};

			this.setViewport = function ( x, y, width, height ) {

				if ( x.isVector4 ) {

					_viewport.set( x.x, x.y, x.z, x.w );

				} else {

					_viewport.set( x, y, width, height );

				}

				state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor() );

			};

			this.getScissor = function ( target ) {

				return target.copy( _scissor );

			};

			this.setScissor = function ( x, y, width, height ) {

				if ( x.isVector4 ) {

					_scissor.set( x.x, x.y, x.z, x.w );

				} else {

					_scissor.set( x, y, width, height );

				}

				state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor() );

			};

			this.getScissorTest = function () {

				return _scissorTest;

			};

			this.setScissorTest = function ( boolean ) {

				state.setScissorTest( _scissorTest = boolean );

			};

			this.setOpaqueSort = function ( method ) {

				_opaqueSort = method;

			};

			this.setTransparentSort = function ( method ) {

				_transparentSort = method;

			};

			// Clearing

			this.getClearColor = function ( target ) {

				return target.copy( background.getClearColor() );

			};

			this.setClearColor = function () {

				background.setClearColor.apply( background, arguments );

			};

			this.getClearAlpha = function () {

				return background.getClearAlpha();

			};

			this.setClearAlpha = function () {

				background.setClearAlpha.apply( background, arguments );

			};

			this.clear = function ( color = true, depth = true, stencil = true ) {

				let bits = 0;

				if ( color ) {

					// check if we're trying to clear an integer target
					let isIntegerFormat = false;
					if ( _currentRenderTarget !== null ) {

						const targetFormat = _currentRenderTarget.texture.format;
						isIntegerFormat = targetFormat === RGBAIntegerFormat ||
							targetFormat === RGIntegerFormat ||
							targetFormat === RedIntegerFormat;

					}

					// use the appropriate clear functions to clear the target if it's a signed
					// or unsigned integer target
					if ( isIntegerFormat ) {

						const targetType = _currentRenderTarget.texture.type;
						const isUnsignedType = targetType === UnsignedByteType ||
							targetType === UnsignedIntType ||
							targetType === UnsignedShortType ||
							targetType === UnsignedInt248Type ||
							targetType === UnsignedShort4444Type ||
							targetType === UnsignedShort5551Type;

						const clearColor = background.getClearColor();
						const a = background.getClearAlpha();
						const r = clearColor.r;
						const g = clearColor.g;
						const b = clearColor.b;

						if ( isUnsignedType ) {

							uintClearColor[ 0 ] = r;
							uintClearColor[ 1 ] = g;
							uintClearColor[ 2 ] = b;
							uintClearColor[ 3 ] = a;
							_gl.clearBufferuiv( _gl.COLOR, 0, uintClearColor );

						} else {

							intClearColor[ 0 ] = r;
							intClearColor[ 1 ] = g;
							intClearColor[ 2 ] = b;
							intClearColor[ 3 ] = a;
							_gl.clearBufferiv( _gl.COLOR, 0, intClearColor );

						}

					} else {

						bits |= _gl.COLOR_BUFFER_BIT;

					}

				}

				if ( depth ) bits |= _gl.DEPTH_BUFFER_BIT;
				if ( stencil ) {

					bits |= _gl.STENCIL_BUFFER_BIT;
					this.state.buffers.stencil.setMask( 0xffffffff );

				}

				_gl.clear( bits );

			};

			this.clearColor = function () {

				this.clear( true, false, false );

			};

			this.clearDepth = function () {

				this.clear( false, true, false );

			};

			this.clearStencil = function () {

				this.clear( false, false, true );

			};

			//

			this.dispose = function () {

				canvas.removeEventListener( 'webglcontextlost', onContextLost, false );
				canvas.removeEventListener( 'webglcontextrestored', onContextRestore, false );
				canvas.removeEventListener( 'webglcontextcreationerror', onContextCreationError, false );

				renderLists.dispose();
				renderStates.dispose();
				properties.dispose();
				cubemaps.dispose();
				cubeuvmaps.dispose();
				objects.dispose();
				bindingStates.dispose();
				uniformsGroups.dispose();
				programCache.dispose();

				xr.dispose();

				xr.removeEventListener( 'sessionstart', onXRSessionStart );
				xr.removeEventListener( 'sessionend', onXRSessionEnd );

				if ( _transmissionRenderTarget ) {

					_transmissionRenderTarget.dispose();
					_transmissionRenderTarget = null;

				}

				animation.stop();

			};

			// Events

			function onContextLost( event ) {

				event.preventDefault();

				console.log( 'THREE.WebGLRenderer: Context Lost.' );

				_isContextLost = true;

			}

			function onContextRestore( /* event */ ) {

				console.log( 'THREE.WebGLRenderer: Context Restored.' );

				_isContextLost = false;

				const infoAutoReset = info.autoReset;
				const shadowMapEnabled = shadowMap.enabled;
				const shadowMapAutoUpdate = shadowMap.autoUpdate;
				const shadowMapNeedsUpdate = shadowMap.needsUpdate;
				const shadowMapType = shadowMap.type;

				initGLContext();

				info.autoReset = infoAutoReset;
				shadowMap.enabled = shadowMapEnabled;
				shadowMap.autoUpdate = shadowMapAutoUpdate;
				shadowMap.needsUpdate = shadowMapNeedsUpdate;
				shadowMap.type = shadowMapType;

			}

			function onContextCreationError( event ) {

				console.error( 'THREE.WebGLRenderer: A WebGL context could not be created. Reason: ', event.statusMessage );

			}

			function onMaterialDispose( event ) {

				const material = event.target;

				material.removeEventListener( 'dispose', onMaterialDispose );

				deallocateMaterial( material );

			}

			// Buffer deallocation

			function deallocateMaterial( material ) {

				releaseMaterialProgramReferences( material );

				properties.remove( material );

			}


			function releaseMaterialProgramReferences( material ) {

				const programs = properties.get( material ).programs;

				if ( programs !== undefined ) {

					programs.forEach( function ( program ) {

						programCache.releaseProgram( program );

					} );

					if ( material.isShaderMaterial ) {

						programCache.releaseShaderCache( material );

					}

				}

			}

			// Buffer rendering

			this.renderBufferDirect = function ( camera, scene, geometry, material, object, group ) {

				if ( scene === null ) scene = _emptyScene; // renderBufferDirect second parameter used to be fog (could be null)

				const frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );

				const program = setProgram( camera, scene, geometry, material, object );

				state.setMaterial( material, frontFaceCW );

				//

				let index = geometry.index;
				let rangeFactor = 1;

				if ( material.wireframe === true ) {

					index = geometries.getWireframeAttribute( geometry );

					if ( index === undefined ) return;

					rangeFactor = 2;

				}

				//

				const drawRange = geometry.drawRange;
				const position = geometry.attributes.position;

				let drawStart = drawRange.start * rangeFactor;
				let drawEnd = ( drawRange.start + drawRange.count ) * rangeFactor;

				if ( group !== null ) {

					drawStart = Math.max( drawStart, group.start * rangeFactor );
					drawEnd = Math.min( drawEnd, ( group.start + group.count ) * rangeFactor );

				}

				if ( index !== null ) {

					drawStart = Math.max( drawStart, 0 );
					drawEnd = Math.min( drawEnd, index.count );

				} else if ( position !== undefined && position !== null ) {

					drawStart = Math.max( drawStart, 0 );
					drawEnd = Math.min( drawEnd, position.count );

				}

				const drawCount = drawEnd - drawStart;

				if ( drawCount < 0 || drawCount === Infinity ) return;

				//

				bindingStates.setup( object, material, program, geometry, index );

				let attribute;
				let renderer = bufferRenderer;

				if ( index !== null ) {

					attribute = attributes.get( index );

					renderer = indexedBufferRenderer;
					renderer.setIndex( attribute );

				}

				//

				if ( object.isMesh ) {

					if ( material.wireframe === true ) {

						state.setLineWidth( material.wireframeLinewidth * getTargetPixelRatio() );
						renderer.setMode( _gl.LINES );

					} else {

						renderer.setMode( _gl.TRIANGLES );

					}

				} else if ( object.isLine ) {

					let lineWidth = material.linewidth;

					if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

					state.setLineWidth( lineWidth * getTargetPixelRatio() );

					if ( object.isLineSegments ) {

						renderer.setMode( _gl.LINES );

					} else if ( object.isLineLoop ) {

						renderer.setMode( _gl.LINE_LOOP );

					} else {

						renderer.setMode( _gl.LINE_STRIP );

					}

				} else if ( object.isPoints ) {

					renderer.setMode( _gl.POINTS );

				} else if ( object.isSprite ) {

					renderer.setMode( _gl.TRIANGLES );

				}

				if ( object.isBatchedMesh ) {

					renderer.renderMultiDraw( object._multiDrawStarts, object._multiDrawCounts, object._multiDrawCount );

				} else if ( object.isInstancedMesh ) {

					renderer.renderInstances( drawStart, drawCount, object.count );

				} else if ( geometry.isInstancedBufferGeometry ) {

					const maxInstanceCount = geometry._maxInstanceCount !== undefined ? geometry._maxInstanceCount : Infinity;
					const instanceCount = Math.min( geometry.instanceCount, maxInstanceCount );

					renderer.renderInstances( drawStart, drawCount, instanceCount );

				} else {

					renderer.render( drawStart, drawCount );

				}

			};

			// Compile

			function prepareMaterial( material, scene, object ) {

				if ( material.transparent === true && material.side === DoubleSide && material.forceSinglePass === false ) {

					material.side = BackSide;
					material.needsUpdate = true;
					getProgram( material, scene, object );

					material.side = FrontSide;
					material.needsUpdate = true;
					getProgram( material, scene, object );

					material.side = DoubleSide;

				} else {

					getProgram( material, scene, object );

				}

			}

			this.compile = function ( scene, camera, targetScene = null ) {

				if ( targetScene === null ) targetScene = scene;

				currentRenderState = renderStates.get( targetScene );
				currentRenderState.init();

				renderStateStack.push( currentRenderState );

				// gather lights from both the target scene and the new object that will be added to the scene.

				targetScene.traverseVisible( function ( object ) {

					if ( object.isLight && object.layers.test( camera.layers ) ) {

						currentRenderState.pushLight( object );

						if ( object.castShadow ) {

							currentRenderState.pushShadow( object );

						}

					}

				} );

				if ( scene !== targetScene ) {

					scene.traverseVisible( function ( object ) {

						if ( object.isLight && object.layers.test( camera.layers ) ) {

							currentRenderState.pushLight( object );

							if ( object.castShadow ) {

								currentRenderState.pushShadow( object );

							}

						}

					} );

				}

				currentRenderState.setupLights( _this._useLegacyLights );

				// Only initialize materials in the new scene, not the targetScene.

				const materials = new Set();

				scene.traverse( function ( object ) {

					const material = object.material;

					if ( material ) {

						if ( Array.isArray( material ) ) {

							for ( let i = 0; i < material.length; i ++ ) {

								const material2 = material[ i ];

								prepareMaterial( material2, targetScene, object );
								materials.add( material2 );

							}

						} else {

							prepareMaterial( material, targetScene, object );
							materials.add( material );

						}

					}

				} );

				renderStateStack.pop();
				currentRenderState = null;

				return materials;

			};

			// compileAsync

			this.compileAsync = function ( scene, camera, targetScene = null ) {

				const materials = this.compile( scene, camera, targetScene );

				// Wait for all the materials in the new object to indicate that they're
				// ready to be used before resolving the promise.

				return new Promise( ( resolve ) => {

					function checkMaterialsReady() {

						materials.forEach( function ( material ) {

							const materialProperties = properties.get( material );
							const program = materialProperties.currentProgram;

							if ( program.isReady() ) {

								// remove any programs that report they're ready to use from the list
								materials.delete( material );

							}

						} );

						// once the list of compiling materials is empty, call the callback

						if ( materials.size === 0 ) {

							resolve( scene );
							return;

						}

						// if some materials are still not ready, wait a bit and check again

						setTimeout( checkMaterialsReady, 10 );

					}

					if ( extensions.get( 'KHR_parallel_shader_compile' ) !== null ) {

						// If we can check the compilation status of the materials without
						// blocking then do so right away.

						checkMaterialsReady();

					} else {

						// Otherwise start by waiting a bit to give the materials we just
						// initialized a chance to finish.

						setTimeout( checkMaterialsReady, 10 );

					}

				} );

			};

			// Animation Loop

			let onAnimationFrameCallback = null;

			function onAnimationFrame( time ) {

				if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

			}

			function onXRSessionStart() {

				animation.stop();

			}

			function onXRSessionEnd() {

				animation.start();

			}

			const animation = new WebGLAnimation();
			animation.setAnimationLoop( onAnimationFrame );

			if ( typeof self !== 'undefined' ) animation.setContext( self );

			this.setAnimationLoop = function ( callback ) {

				onAnimationFrameCallback = callback;
				xr.setAnimationLoop( callback );

				( callback === null ) ? animation.stop() : animation.start();

			};

			xr.addEventListener( 'sessionstart', onXRSessionStart );
			xr.addEventListener( 'sessionend', onXRSessionEnd );

			// Rendering

			this.render = function ( scene, camera ) {

				if ( camera !== undefined && camera.isCamera !== true ) {

					console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
					return;

				}

				if ( _isContextLost === true ) return;

				// update scene graph

				if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();

				// update camera matrices and frustum

				if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

				if ( xr.enabled === true && xr.isPresenting === true ) {

					if ( xr.cameraAutoUpdate === true ) xr.updateCamera( camera );

					camera = xr.getCamera(); // use XR camera for rendering

				}

				//
				if ( scene.isScene === true ) scene.onBeforeRender( _this, scene, camera, _currentRenderTarget );

				currentRenderState = renderStates.get( scene, renderStateStack.length );
				currentRenderState.init();

				renderStateStack.push( currentRenderState );

				_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
				_frustum.setFromProjectionMatrix( _projScreenMatrix );

				_localClippingEnabled = this.localClippingEnabled;
				_clippingEnabled = clipping.init( this.clippingPlanes, _localClippingEnabled );

				currentRenderList = renderLists.get( scene, renderListStack.length );
				currentRenderList.init();

				renderListStack.push( currentRenderList );

				projectObject( scene, camera, 0, _this.sortObjects );

				currentRenderList.finish();

				if ( _this.sortObjects === true ) {

					currentRenderList.sort( _opaqueSort, _transparentSort );

				}

				//

				this.info.render.frame ++;

				if ( _clippingEnabled === true ) clipping.beginShadows();

				const shadowsArray = currentRenderState.state.shadowsArray;

				shadowMap.render( shadowsArray, scene, camera );

				if ( _clippingEnabled === true ) clipping.endShadows();

				//

				if ( this.info.autoReset === true ) this.info.reset();


				//

				background.render( currentRenderList, scene );

				// render scene

				currentRenderState.setupLights( _this._useLegacyLights );

				if ( camera.isArrayCamera ) {

					const cameras = camera.cameras;

					for ( let i = 0, l = cameras.length; i < l; i ++ ) {

						const camera2 = cameras[ i ];

						renderScene( currentRenderList, scene, camera2, camera2.viewport );

					}

				} else {

					renderScene( currentRenderList, scene, camera );

				}

				//

				if ( _currentRenderTarget !== null ) {

					// resolve multisample renderbuffers to a single-sample texture if necessary

					textures.updateMultisampleRenderTarget( _currentRenderTarget );

					// Generate mipmap if we're using any kind of mipmap filtering

					textures.updateRenderTargetMipmap( _currentRenderTarget );

				}

				//

				if ( scene.isScene === true ) scene.onAfterRender( _this, scene, camera );

				// _gl.finish();

				bindingStates.resetDefaultState();
				_currentMaterialId = - 1;
				_currentCamera = null;

				renderStateStack.pop();

				if ( renderStateStack.length > 0 ) {

					currentRenderState = renderStateStack[ renderStateStack.length - 1 ];

				} else {

					currentRenderState = null;

				}

				renderListStack.pop();

				if ( renderListStack.length > 0 ) {

					currentRenderList = renderListStack[ renderListStack.length - 1 ];

				} else {

					currentRenderList = null;

				}

			};

			function projectObject( object, camera, groupOrder, sortObjects ) {

				if ( object.visible === false ) return;

				const visible = object.layers.test( camera.layers );

				if ( visible ) {

					if ( object.isGroup ) {

						groupOrder = object.renderOrder;

					} else if ( object.isLOD ) {

						if ( object.autoUpdate === true ) object.update( camera );

					} else if ( object.isLight ) {

						currentRenderState.pushLight( object );

						if ( object.castShadow ) {

							currentRenderState.pushShadow( object );

						}

					} else if ( object.isSprite ) {

						if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

							if ( sortObjects ) {

								_vector3.setFromMatrixPosition( object.matrixWorld )
									.applyMatrix4( _projScreenMatrix );

							}

							const geometry = objects.update( object );
							const material = object.material;

							if ( material.visible ) {

								currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

							}

						}

					} else if ( object.isMesh || object.isLine || object.isPoints ) {

						if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

							const geometry = objects.update( object );
							const material = object.material;

							if ( sortObjects ) {

								if ( object.boundingSphere !== undefined ) {

									if ( object.boundingSphere === null ) object.computeBoundingSphere();
									_vector3.copy( object.boundingSphere.center );

								} else {

									if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();
									_vector3.copy( geometry.boundingSphere.center );

								}

								_vector3
									.applyMatrix4( object.matrixWorld )
									.applyMatrix4( _projScreenMatrix );

							}

							if ( Array.isArray( material ) ) {

								const groups = geometry.groups;

								for ( let i = 0, l = groups.length; i < l; i ++ ) {

									const group = groups[ i ];
									const groupMaterial = material[ group.materialIndex ];

									if ( groupMaterial && groupMaterial.visible ) {

										currentRenderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

									}

								}

							} else if ( material.visible ) {

								currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

							}

						}

					}

				}

				const children = object.children;

				for ( let i = 0, l = children.length; i < l; i ++ ) {

					projectObject( children[ i ], camera, groupOrder, sortObjects );

				}

			}

			function renderScene( currentRenderList, scene, camera, viewport ) {

				const opaqueObjects = currentRenderList.opaque;
				const transmissiveObjects = currentRenderList.transmissive;
				const transparentObjects = currentRenderList.transparent;

				currentRenderState.setupLightsView( camera );

				if ( _clippingEnabled === true ) clipping.setGlobalState( _this.clippingPlanes, camera );

				if ( transmissiveObjects.length > 0 ) renderTransmissionPass( opaqueObjects, transmissiveObjects, scene, camera );

				if ( viewport ) state.viewport( _currentViewport.copy( viewport ) );

				if ( opaqueObjects.length > 0 ) renderObjects( opaqueObjects, scene, camera );
				if ( transmissiveObjects.length > 0 ) renderObjects( transmissiveObjects, scene, camera );
				if ( transparentObjects.length > 0 ) renderObjects( transparentObjects, scene, camera );

				// Ensure depth buffer writing is enabled so it can be cleared on next render

				state.buffers.depth.setTest( true );
				state.buffers.depth.setMask( true );
				state.buffers.color.setMask( true );

				state.setPolygonOffset( false );

			}

			function renderTransmissionPass( opaqueObjects, transmissiveObjects, scene, camera ) {

				const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;

				if ( overrideMaterial !== null ) {

					return;

				}

				const isWebGL2 = capabilities.isWebGL2;

				if ( _transmissionRenderTarget === null ) {

					_transmissionRenderTarget = new WebGLRenderTarget( 1, 1, {
						generateMipmaps: true,
						type: extensions.has( 'EXT_color_buffer_half_float' ) ? HalfFloatType : UnsignedByteType,
						minFilter: LinearMipmapLinearFilter,
						samples: ( isWebGL2 ) ? 4 : 0
					} );

					// debug

					/*
					const geometry = new PlaneGeometry();
					const material = new MeshBasicMaterial( { map: _transmissionRenderTarget.texture } );

					const mesh = new Mesh( geometry, material );
					scene.add( mesh );
					*/

				}

				_this.getDrawingBufferSize( _vector2 );

				if ( isWebGL2 ) {

					_transmissionRenderTarget.setSize( _vector2.x, _vector2.y );

				} else {

					_transmissionRenderTarget.setSize( floorPowerOfTwo( _vector2.x ), floorPowerOfTwo( _vector2.y ) );

				}

				//

				const currentRenderTarget = _this.getRenderTarget();
				_this.setRenderTarget( _transmissionRenderTarget );

				_this.getClearColor( _currentClearColor );
				_currentClearAlpha = _this.getClearAlpha();
				if ( _currentClearAlpha < 1 ) _this.setClearColor( 0xffffff, 0.5 );

				_this.clear();

				// Turn off the features which can affect the frag color for opaque objects pass.
				// Otherwise they are applied twice in opaque objects pass and transmission objects pass.
				const currentToneMapping = _this.toneMapping;
				_this.toneMapping = NoToneMapping;

				renderObjects( opaqueObjects, scene, camera );

				textures.updateMultisampleRenderTarget( _transmissionRenderTarget );
				textures.updateRenderTargetMipmap( _transmissionRenderTarget );

				let renderTargetNeedsUpdate = false;

				for ( let i = 0, l = transmissiveObjects.length; i < l; i ++ ) {

					const renderItem = transmissiveObjects[ i ];

					const object = renderItem.object;
					const geometry = renderItem.geometry;
					const material = renderItem.material;
					const group = renderItem.group;

					if ( material.side === DoubleSide && object.layers.test( camera.layers ) ) {

						const currentSide = material.side;

						material.side = BackSide;
						material.needsUpdate = true;

						renderObject( object, scene, camera, geometry, material, group );

						material.side = currentSide;
						material.needsUpdate = true;

						renderTargetNeedsUpdate = true;

					}

				}

				if ( renderTargetNeedsUpdate === true ) {

					textures.updateMultisampleRenderTarget( _transmissionRenderTarget );
					textures.updateRenderTargetMipmap( _transmissionRenderTarget );

				}

				_this.setRenderTarget( currentRenderTarget );

				_this.setClearColor( _currentClearColor, _currentClearAlpha );

				_this.toneMapping = currentToneMapping;

			}

			function renderObjects( renderList, scene, camera ) {

				const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;

				for ( let i = 0, l = renderList.length; i < l; i ++ ) {

					const renderItem = renderList[ i ];

					const object = renderItem.object;
					const geometry = renderItem.geometry;
					const material = overrideMaterial === null ? renderItem.material : overrideMaterial;
					const group = renderItem.group;

					if ( object.layers.test( camera.layers ) ) {

						renderObject( object, scene, camera, geometry, material, group );

					}

				}

			}

			function renderObject( object, scene, camera, geometry, material, group ) {

				object.onBeforeRender( _this, scene, camera, geometry, material, group );

				object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
				object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

				material.onBeforeRender( _this, scene, camera, geometry, object, group );

				if ( material.transparent === true && material.side === DoubleSide && material.forceSinglePass === false ) {

					material.side = BackSide;
					material.needsUpdate = true;
					_this.renderBufferDirect( camera, scene, geometry, material, object, group );

					material.side = FrontSide;
					material.needsUpdate = true;
					_this.renderBufferDirect( camera, scene, geometry, material, object, group );

					material.side = DoubleSide;

				} else {

					_this.renderBufferDirect( camera, scene, geometry, material, object, group );

				}

				object.onAfterRender( _this, scene, camera, geometry, material, group );

			}

			function getProgram( material, scene, object ) {

				if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

				const materialProperties = properties.get( material );

				const lights = currentRenderState.state.lights;
				const shadowsArray = currentRenderState.state.shadowsArray;

				const lightsStateVersion = lights.state.version;

				const parameters = programCache.getParameters( material, lights.state, shadowsArray, scene, object );
				const programCacheKey = programCache.getProgramCacheKey( parameters );

				let programs = materialProperties.programs;

				// always update environment and fog - changing these trigger an getProgram call, but it's possible that the program doesn't change

				materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
				materialProperties.fog = scene.fog;
				materialProperties.envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || materialProperties.environment );

				if ( programs === undefined ) {

					// new material

					material.addEventListener( 'dispose', onMaterialDispose );

					programs = new Map();
					materialProperties.programs = programs;

				}

				let program = programs.get( programCacheKey );

				if ( program !== undefined ) {

					// early out if program and light state is identical

					if ( materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion ) {

						updateCommonMaterialProperties( material, parameters );

						return program;

					}

				} else {

					parameters.uniforms = programCache.getUniforms( material );

					material.onBuild( object, parameters, _this );

					material.onBeforeCompile( parameters, _this );

					program = programCache.acquireProgram( parameters, programCacheKey );
					programs.set( programCacheKey, program );

					materialProperties.uniforms = parameters.uniforms;

				}

				const uniforms = materialProperties.uniforms;

				if ( ( ! material.isShaderMaterial && ! material.isRawShaderMaterial ) || material.clipping === true ) {

					uniforms.clippingPlanes = clipping.uniform;

				}

				updateCommonMaterialProperties( material, parameters );

				// store the light setup it was created for

				materialProperties.needsLights = materialNeedsLights( material );
				materialProperties.lightsStateVersion = lightsStateVersion;

				if ( materialProperties.needsLights ) {

					// wire up the material to this renderer's lighting state

					uniforms.ambientLightColor.value = lights.state.ambient;
					uniforms.lightProbe.value = lights.state.probe;
					uniforms.directionalLights.value = lights.state.directional;
					uniforms.directionalLightShadows.value = lights.state.directionalShadow;
					uniforms.spotLights.value = lights.state.spot;
					uniforms.spotLightShadows.value = lights.state.spotShadow;
					uniforms.rectAreaLights.value = lights.state.rectArea;
					uniforms.ltc_1.value = lights.state.rectAreaLTC1;
					uniforms.ltc_2.value = lights.state.rectAreaLTC2;
					uniforms.pointLights.value = lights.state.point;
					uniforms.pointLightShadows.value = lights.state.pointShadow;
					uniforms.hemisphereLights.value = lights.state.hemi;

					uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
					uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
					uniforms.spotShadowMap.value = lights.state.spotShadowMap;
					uniforms.spotLightMatrix.value = lights.state.spotLightMatrix;
					uniforms.spotLightMap.value = lights.state.spotLightMap;
					uniforms.pointShadowMap.value = lights.state.pointShadowMap;
					uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
					// TODO (abelnation): add area lights shadow info to uniforms

				}

				materialProperties.currentProgram = program;
				materialProperties.uniformsList = null;

				return program;

			}

			function getUniformList( materialProperties ) {

				if ( materialProperties.uniformsList === null ) {

					const progUniforms = materialProperties.currentProgram.getUniforms();
					materialProperties.uniformsList = WebGLUniforms.seqWithValue( progUniforms.seq, materialProperties.uniforms );

				}

				return materialProperties.uniformsList;

			}

			function updateCommonMaterialProperties( material, parameters ) {

				const materialProperties = properties.get( material );

				materialProperties.outputColorSpace = parameters.outputColorSpace;
				materialProperties.batching = parameters.batching;
				materialProperties.instancing = parameters.instancing;
				materialProperties.instancingColor = parameters.instancingColor;
				materialProperties.skinning = parameters.skinning;
				materialProperties.morphTargets = parameters.morphTargets;
				materialProperties.morphNormals = parameters.morphNormals;
				materialProperties.morphColors = parameters.morphColors;
				materialProperties.morphTargetsCount = parameters.morphTargetsCount;
				materialProperties.numClippingPlanes = parameters.numClippingPlanes;
				materialProperties.numIntersection = parameters.numClipIntersection;
				materialProperties.vertexAlphas = parameters.vertexAlphas;
				materialProperties.vertexTangents = parameters.vertexTangents;
				materialProperties.toneMapping = parameters.toneMapping;

			}

			function setProgram( camera, scene, geometry, material, object ) {

				if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

				textures.resetTextureUnits();

				const fog = scene.fog;
				const environment = material.isMeshStandardMaterial ? scene.environment : null;
				const colorSpace = ( _currentRenderTarget === null ) ? _this.outputColorSpace : ( _currentRenderTarget.isXRRenderTarget === true ? _currentRenderTarget.texture.colorSpace : LinearSRGBColorSpace );
				const envMap = ( material.isMeshStandardMaterial ? cubeuvmaps : cubemaps ).get( material.envMap || environment );
				const vertexAlphas = material.vertexColors === true && !! geometry.attributes.color && geometry.attributes.color.itemSize === 4;
				const vertexTangents = !! geometry.attributes.tangent && ( !! material.normalMap || material.anisotropy > 0 );
				const morphTargets = !! geometry.morphAttributes.position;
				const morphNormals = !! geometry.morphAttributes.normal;
				const morphColors = !! geometry.morphAttributes.color;

				let toneMapping = NoToneMapping;

				if ( material.toneMapped ) {

					if ( _currentRenderTarget === null || _currentRenderTarget.isXRRenderTarget === true ) {

						toneMapping = _this.toneMapping;

					}

				}

				const morphAttribute = geometry.morphAttributes.position || geometry.morphAttributes.normal || geometry.morphAttributes.color;
				const morphTargetsCount = ( morphAttribute !== undefined ) ? morphAttribute.length : 0;

				const materialProperties = properties.get( material );
				const lights = currentRenderState.state.lights;

				if ( _clippingEnabled === true ) {

					if ( _localClippingEnabled === true || camera !== _currentCamera ) {

						const useCache =
							camera === _currentCamera &&
							material.id === _currentMaterialId;

						// we might want to call this function with some ClippingGroup
						// object instead of the material, once it becomes feasible
						// (#8465, #8379)
						clipping.setState( material, camera, useCache );

					}

				}

				//

				let needsProgramChange = false;

				if ( material.version === materialProperties.__version ) {

					if ( materialProperties.needsLights && ( materialProperties.lightsStateVersion !== lights.state.version ) ) {

						needsProgramChange = true;

					} else if ( materialProperties.outputColorSpace !== colorSpace ) {

						needsProgramChange = true;

					} else if ( object.isBatchedMesh && materialProperties.batching === false ) {

						needsProgramChange = true;

					} else if ( ! object.isBatchedMesh && materialProperties.batching === true ) {

						needsProgramChange = true;

					} else if ( object.isInstancedMesh && materialProperties.instancing === false ) {

						needsProgramChange = true;

					} else if ( ! object.isInstancedMesh && materialProperties.instancing === true ) {

						needsProgramChange = true;

					} else if ( object.isSkinnedMesh && materialProperties.skinning === false ) {

						needsProgramChange = true;

					} else if ( ! object.isSkinnedMesh && materialProperties.skinning === true ) {

						needsProgramChange = true;

					} else if ( object.isInstancedMesh && materialProperties.instancingColor === true && object.instanceColor === null ) {

						needsProgramChange = true;

					} else if ( object.isInstancedMesh && materialProperties.instancingColor === false && object.instanceColor !== null ) {

						needsProgramChange = true;

					} else if ( materialProperties.envMap !== envMap ) {

						needsProgramChange = true;

					} else if ( material.fog === true && materialProperties.fog !== fog ) {

						needsProgramChange = true;

					} else if ( materialProperties.numClippingPlanes !== undefined &&
						( materialProperties.numClippingPlanes !== clipping.numPlanes ||
						materialProperties.numIntersection !== clipping.numIntersection ) ) {

						needsProgramChange = true;

					} else if ( materialProperties.vertexAlphas !== vertexAlphas ) {

						needsProgramChange = true;

					} else if ( materialProperties.vertexTangents !== vertexTangents ) {

						needsProgramChange = true;

					} else if ( materialProperties.morphTargets !== morphTargets ) {

						needsProgramChange = true;

					} else if ( materialProperties.morphNormals !== morphNormals ) {

						needsProgramChange = true;

					} else if ( materialProperties.morphColors !== morphColors ) {

						needsProgramChange = true;

					} else if ( materialProperties.toneMapping !== toneMapping ) {

						needsProgramChange = true;

					} else if ( capabilities.isWebGL2 === true && materialProperties.morphTargetsCount !== morphTargetsCount ) {

						needsProgramChange = true;

					}

				} else {

					needsProgramChange = true;
					materialProperties.__version = material.version;

				}

				//

				let program = materialProperties.currentProgram;

				if ( needsProgramChange === true ) {

					program = getProgram( material, scene, object );

				}

				let refreshProgram = false;
				let refreshMaterial = false;
				let refreshLights = false;

				const p_uniforms = program.getUniforms(),
					m_uniforms = materialProperties.uniforms;

				if ( state.useProgram( program.program ) ) {

					refreshProgram = true;
					refreshMaterial = true;
					refreshLights = true;

				}

				if ( material.id !== _currentMaterialId ) {

					_currentMaterialId = material.id;

					refreshMaterial = true;

				}

				if ( refreshProgram || _currentCamera !== camera ) {

					// common camera uniforms

					p_uniforms.setValue( _gl, 'projectionMatrix', camera.projectionMatrix );
					p_uniforms.setValue( _gl, 'viewMatrix', camera.matrixWorldInverse );

					const uCamPos = p_uniforms.map.cameraPosition;

					if ( uCamPos !== undefined ) {

						uCamPos.setValue( _gl, _vector3.setFromMatrixPosition( camera.matrixWorld ) );

					}

					if ( capabilities.logarithmicDepthBuffer ) {

						p_uniforms.setValue( _gl, 'logDepthBufFC',
							2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

					}

					// consider moving isOrthographic to UniformLib and WebGLMaterials, see https://github.com/mrdoob/three.js/pull/26467#issuecomment-1645185067

					if ( material.isMeshPhongMaterial ||
						material.isMeshToonMaterial ||
						material.isMeshLambertMaterial ||
						material.isMeshBasicMaterial ||
						material.isMeshStandardMaterial ||
						material.isShaderMaterial ) {

						p_uniforms.setValue( _gl, 'isOrthographic', camera.isOrthographicCamera === true );

					}

					if ( _currentCamera !== camera ) {

						_currentCamera = camera;

						// lighting uniforms depend on the camera so enforce an update
						// now, in case this material supports lights - or later, when
						// the next material that does gets activated:

						refreshMaterial = true;		// set to true on material change
						refreshLights = true;		// remains set until update done

					}

				}

				// skinning and morph target uniforms must be set even if material didn't change
				// auto-setting of texture unit for bone and morph texture must go before other textures
				// otherwise textures used for skinning and morphing can take over texture units reserved for other material textures

				if ( object.isSkinnedMesh ) {

					p_uniforms.setOptional( _gl, object, 'bindMatrix' );
					p_uniforms.setOptional( _gl, object, 'bindMatrixInverse' );

					const skeleton = object.skeleton;

					if ( skeleton ) {

						if ( capabilities.floatVertexTextures ) {

							if ( skeleton.boneTexture === null ) skeleton.computeBoneTexture();

							p_uniforms.setValue( _gl, 'boneTexture', skeleton.boneTexture, textures );

						} else {

							console.warn( 'THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.' );

						}

					}

				}

				if ( object.isBatchedMesh ) {

					p_uniforms.setOptional( _gl, object, 'batchingTexture' );
					p_uniforms.setValue( _gl, 'batchingTexture', object._matricesTexture, textures );

				}

				const morphAttributes = geometry.morphAttributes;

				if ( morphAttributes.position !== undefined || morphAttributes.normal !== undefined || ( morphAttributes.color !== undefined && capabilities.isWebGL2 === true ) ) {

					morphtargets.update( object, geometry, program );

				}

				if ( refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow ) {

					materialProperties.receiveShadow = object.receiveShadow;
					p_uniforms.setValue( _gl, 'receiveShadow', object.receiveShadow );

				}

				// https://github.com/mrdoob/three.js/pull/24467#issuecomment-1209031512

				if ( material.isMeshGouraudMaterial && material.envMap !== null ) {

					m_uniforms.envMap.value = envMap;

					m_uniforms.flipEnvMap.value = ( envMap.isCubeTexture && envMap.isRenderTargetTexture === false ) ? - 1 : 1;

				}

				if ( refreshMaterial ) {

					p_uniforms.setValue( _gl, 'toneMappingExposure', _this.toneMappingExposure );

					if ( materialProperties.needsLights ) {

						// the current material requires lighting info

						// note: all lighting uniforms are always set correctly
						// they simply reference the renderer's state for their
						// values
						//
						// use the current material's .needsUpdate flags to set
						// the GL state when required

						markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );

					}

					// refresh uniforms common to several materials

					if ( fog && material.fog === true ) {

						materials.refreshFogUniforms( m_uniforms, fog );

					}

					materials.refreshMaterialUniforms( m_uniforms, material, _pixelRatio, _height, _transmissionRenderTarget );

					WebGLUniforms.upload( _gl, getUniformList( materialProperties ), m_uniforms, textures );

				}

				if ( material.isShaderMaterial && material.uniformsNeedUpdate === true ) {

					WebGLUniforms.upload( _gl, getUniformList( materialProperties ), m_uniforms, textures );
					material.uniformsNeedUpdate = false;

				}

				if ( material.isSpriteMaterial ) {

					p_uniforms.setValue( _gl, 'center', object.center );

				}

				// common matrices

				p_uniforms.setValue( _gl, 'modelViewMatrix', object.modelViewMatrix );
				p_uniforms.setValue( _gl, 'normalMatrix', object.normalMatrix );
				p_uniforms.setValue( _gl, 'modelMatrix', object.matrixWorld );

				// UBOs

				if ( material.isShaderMaterial || material.isRawShaderMaterial ) {

					const groups = material.uniformsGroups;

					for ( let i = 0, l = groups.length; i < l; i ++ ) {

						if ( capabilities.isWebGL2 ) {

							const group = groups[ i ];

							uniformsGroups.update( group, program );
							uniformsGroups.bind( group, program );

						} else {

							console.warn( 'THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.' );

						}

					}

				}

				return program;

			}

			// If uniforms are marked as clean, they don't need to be loaded to the GPU.

			function markUniformsLightsNeedsUpdate( uniforms, value ) {

				uniforms.ambientLightColor.needsUpdate = value;
				uniforms.lightProbe.needsUpdate = value;

				uniforms.directionalLights.needsUpdate = value;
				uniforms.directionalLightShadows.needsUpdate = value;
				uniforms.pointLights.needsUpdate = value;
				uniforms.pointLightShadows.needsUpdate = value;
				uniforms.spotLights.needsUpdate = value;
				uniforms.spotLightShadows.needsUpdate = value;
				uniforms.rectAreaLights.needsUpdate = value;
				uniforms.hemisphereLights.needsUpdate = value;

			}

			function materialNeedsLights( material ) {

				return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial ||
					material.isMeshStandardMaterial || material.isShadowMaterial ||
					( material.isShaderMaterial && material.lights === true );

			}

			this.getActiveCubeFace = function () {

				return _currentActiveCubeFace;

			};

			this.getActiveMipmapLevel = function () {

				return _currentActiveMipmapLevel;

			};

			this.getRenderTarget = function () {

				return _currentRenderTarget;

			};

			this.setRenderTargetTextures = function ( renderTarget, colorTexture, depthTexture ) {

				properties.get( renderTarget.texture ).__webglTexture = colorTexture;
				properties.get( renderTarget.depthTexture ).__webglTexture = depthTexture;

				const renderTargetProperties = properties.get( renderTarget );
				renderTargetProperties.__hasExternalTextures = true;

				if ( renderTargetProperties.__hasExternalTextures ) {

					renderTargetProperties.__autoAllocateDepthBuffer = depthTexture === undefined;

					if ( ! renderTargetProperties.__autoAllocateDepthBuffer ) {

						// The multisample_render_to_texture extension doesn't work properly if there
						// are midframe flushes and an external depth buffer. Disable use of the extension.
						if ( extensions.has( 'WEBGL_multisampled_render_to_texture' ) === true ) {

							console.warn( 'THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided' );
							renderTargetProperties.__useRenderToTexture = false;

						}

					}

				}

			};

			this.setRenderTargetFramebuffer = function ( renderTarget, defaultFramebuffer ) {

				const renderTargetProperties = properties.get( renderTarget );
				renderTargetProperties.__webglFramebuffer = defaultFramebuffer;
				renderTargetProperties.__useDefaultFramebuffer = defaultFramebuffer === undefined;

			};

			this.setRenderTarget = function ( renderTarget, activeCubeFace = 0, activeMipmapLevel = 0 ) {

				_currentRenderTarget = renderTarget;
				_currentActiveCubeFace = activeCubeFace;
				_currentActiveMipmapLevel = activeMipmapLevel;

				let useDefaultFramebuffer = true;
				let framebuffer = null;
				let isCube = false;
				let isRenderTarget3D = false;

				if ( renderTarget ) {

					const renderTargetProperties = properties.get( renderTarget );

					if ( renderTargetProperties.__useDefaultFramebuffer !== undefined ) {

						// We need to make sure to rebind the framebuffer.
						state.bindFramebuffer( _gl.FRAMEBUFFER, null );
						useDefaultFramebuffer = false;

					} else if ( renderTargetProperties.__webglFramebuffer === undefined ) {

						textures.setupRenderTarget( renderTarget );

					} else if ( renderTargetProperties.__hasExternalTextures ) {

						// Color and depth texture must be rebound in order for the swapchain to update.
						textures.rebindTextures( renderTarget, properties.get( renderTarget.texture ).__webglTexture, properties.get( renderTarget.depthTexture ).__webglTexture );

					}

					const texture = renderTarget.texture;

					if ( texture.isData3DTexture || texture.isDataArrayTexture || texture.isCompressedArrayTexture ) {

						isRenderTarget3D = true;

					}

					const __webglFramebuffer = properties.get( renderTarget ).__webglFramebuffer;

					if ( renderTarget.isWebGLCubeRenderTarget ) {

						if ( Array.isArray( __webglFramebuffer[ activeCubeFace ] ) ) {

							framebuffer = __webglFramebuffer[ activeCubeFace ][ activeMipmapLevel ];

						} else {

							framebuffer = __webglFramebuffer[ activeCubeFace ];

						}

						isCube = true;

					} else if ( ( capabilities.isWebGL2 && renderTarget.samples > 0 ) && textures.useMultisampledRTT( renderTarget ) === false ) {

						framebuffer = properties.get( renderTarget ).__webglMultisampledFramebuffer;

					} else {

						if ( Array.isArray( __webglFramebuffer ) ) {

							framebuffer = __webglFramebuffer[ activeMipmapLevel ];

						} else {

							framebuffer = __webglFramebuffer;

						}

					}

					_currentViewport.copy( renderTarget.viewport );
					_currentScissor.copy( renderTarget.scissor );
					_currentScissorTest = renderTarget.scissorTest;

				} else {

					_currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor();
					_currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor();
					_currentScissorTest = _scissorTest;

				}

				const framebufferBound = state.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

				if ( framebufferBound && capabilities.drawBuffers && useDefaultFramebuffer ) {

					state.drawBuffers( renderTarget, framebuffer );

				}

				state.viewport( _currentViewport );
				state.scissor( _currentScissor );
				state.setScissorTest( _currentScissorTest );

				if ( isCube ) {

					const textureProperties = properties.get( renderTarget.texture );
					_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel );

				} else if ( isRenderTarget3D ) {

					const textureProperties = properties.get( renderTarget.texture );
					const layer = activeCubeFace || 0;
					_gl.framebufferTextureLayer( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureProperties.__webglTexture, activeMipmapLevel || 0, layer );

				}

				_currentMaterialId = - 1; // reset current material to ensure correct uniform bindings

			};

			this.readRenderTargetPixels = function ( renderTarget, x, y, width, height, buffer, activeCubeFaceIndex ) {

				if ( ! ( renderTarget && renderTarget.isWebGLRenderTarget ) ) {

					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.' );
					return;

				}

				let framebuffer = properties.get( renderTarget ).__webglFramebuffer;

				if ( renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined ) {

					framebuffer = framebuffer[ activeCubeFaceIndex ];

				}

				if ( framebuffer ) {

					state.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

					try {

						const texture = renderTarget.texture;
						const textureFormat = texture.format;
						const textureType = texture.type;

						if ( textureFormat !== RGBAFormat && utils.convert( textureFormat ) !== _gl.getParameter( _gl.IMPLEMENTATION_COLOR_READ_FORMAT ) ) {

							console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
							return;

						}

						const halfFloatSupportedByExt = ( textureType === HalfFloatType ) && ( extensions.has( 'EXT_color_buffer_half_float' ) || ( capabilities.isWebGL2 && extensions.has( 'EXT_color_buffer_float' ) ) );

						if ( textureType !== UnsignedByteType && utils.convert( textureType ) !== _gl.getParameter( _gl.IMPLEMENTATION_COLOR_READ_TYPE ) && // Edge and Chrome Mac < 52 (#9513)
							! ( textureType === FloatType && ( capabilities.isWebGL2 || extensions.has( 'OES_texture_float' ) || extensions.has( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
							! halfFloatSupportedByExt ) {

							console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
							return;

						}

						// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

						if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) ) {

							_gl.readPixels( x, y, width, height, utils.convert( textureFormat ), utils.convert( textureType ), buffer );

						}

					} finally {

						// restore framebuffer of current render target if necessary

						const framebuffer = ( _currentRenderTarget !== null ) ? properties.get( _currentRenderTarget ).__webglFramebuffer : null;
						state.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );

					}

				}

			};

			this.copyFramebufferToTexture = function ( position, texture, level = 0 ) {

				const levelScale = Math.pow( 2, - level );
				const width = Math.floor( texture.image.width * levelScale );
				const height = Math.floor( texture.image.height * levelScale );

				textures.setTexture2D( texture, 0 );

				_gl.copyTexSubImage2D( _gl.TEXTURE_2D, level, 0, 0, position.x, position.y, width, height );

				state.unbindTexture();

			};

			this.copyTextureToTexture = function ( position, srcTexture, dstTexture, level = 0 ) {

				const width = srcTexture.image.width;
				const height = srcTexture.image.height;
				const glFormat = utils.convert( dstTexture.format );
				const glType = utils.convert( dstTexture.type );

				textures.setTexture2D( dstTexture, 0 );

				// As another texture upload may have changed pixelStorei
				// parameters, make sure they are correct for the dstTexture
				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, dstTexture.flipY );
				_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, dstTexture.premultiplyAlpha );
				_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, dstTexture.unpackAlignment );

				if ( srcTexture.isDataTexture ) {

					_gl.texSubImage2D( _gl.TEXTURE_2D, level, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data );

				} else {

					if ( srcTexture.isCompressedTexture ) {

						_gl.compressedTexSubImage2D( _gl.TEXTURE_2D, level, position.x, position.y, srcTexture.mipmaps[ 0 ].width, srcTexture.mipmaps[ 0 ].height, glFormat, srcTexture.mipmaps[ 0 ].data );

					} else {

						_gl.texSubImage2D( _gl.TEXTURE_2D, level, position.x, position.y, glFormat, glType, srcTexture.image );

					}

				}

				// Generate mipmaps only when copying level 0
				if ( level === 0 && dstTexture.generateMipmaps ) _gl.generateMipmap( _gl.TEXTURE_2D );

				state.unbindTexture();

			};

			this.copyTextureToTexture3D = function ( sourceBox, position, srcTexture, dstTexture, level = 0 ) {

				if ( _this.isWebGL1Renderer ) {

					console.warn( 'THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.' );
					return;

				}

				const width = sourceBox.max.x - sourceBox.min.x + 1;
				const height = sourceBox.max.y - sourceBox.min.y + 1;
				const depth = sourceBox.max.z - sourceBox.min.z + 1;
				const glFormat = utils.convert( dstTexture.format );
				const glType = utils.convert( dstTexture.type );
				let glTarget;

				if ( dstTexture.isData3DTexture ) {

					textures.setTexture3D( dstTexture, 0 );
					glTarget = _gl.TEXTURE_3D;

				} else if ( dstTexture.isDataArrayTexture || dstTexture.isCompressedArrayTexture ) {

					textures.setTexture2DArray( dstTexture, 0 );
					glTarget = _gl.TEXTURE_2D_ARRAY;

				} else {

					console.warn( 'THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.' );
					return;

				}

				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, dstTexture.flipY );
				_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, dstTexture.premultiplyAlpha );
				_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, dstTexture.unpackAlignment );

				const unpackRowLen = _gl.getParameter( _gl.UNPACK_ROW_LENGTH );
				const unpackImageHeight = _gl.getParameter( _gl.UNPACK_IMAGE_HEIGHT );
				const unpackSkipPixels = _gl.getParameter( _gl.UNPACK_SKIP_PIXELS );
				const unpackSkipRows = _gl.getParameter( _gl.UNPACK_SKIP_ROWS );
				const unpackSkipImages = _gl.getParameter( _gl.UNPACK_SKIP_IMAGES );

				const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[ level ] : srcTexture.image;

				_gl.pixelStorei( _gl.UNPACK_ROW_LENGTH, image.width );
				_gl.pixelStorei( _gl.UNPACK_IMAGE_HEIGHT, image.height );
				_gl.pixelStorei( _gl.UNPACK_SKIP_PIXELS, sourceBox.min.x );
				_gl.pixelStorei( _gl.UNPACK_SKIP_ROWS, sourceBox.min.y );
				_gl.pixelStorei( _gl.UNPACK_SKIP_IMAGES, sourceBox.min.z );

				if ( srcTexture.isDataTexture || srcTexture.isData3DTexture ) {

					_gl.texSubImage3D( glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image.data );

				} else {

					if ( srcTexture.isCompressedArrayTexture ) {

						console.warn( 'THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.' );
						_gl.compressedTexSubImage3D( glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, image.data );

					} else {

						_gl.texSubImage3D( glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image );

					}

				}

				_gl.pixelStorei( _gl.UNPACK_ROW_LENGTH, unpackRowLen );
				_gl.pixelStorei( _gl.UNPACK_IMAGE_HEIGHT, unpackImageHeight );
				_gl.pixelStorei( _gl.UNPACK_SKIP_PIXELS, unpackSkipPixels );
				_gl.pixelStorei( _gl.UNPACK_SKIP_ROWS, unpackSkipRows );
				_gl.pixelStorei( _gl.UNPACK_SKIP_IMAGES, unpackSkipImages );

				// Generate mipmaps only when copying level 0
				if ( level === 0 && dstTexture.generateMipmaps ) _gl.generateMipmap( glTarget );

				state.unbindTexture();

			};

			this.initTexture = function ( texture ) {

				if ( texture.isCubeTexture ) {

					textures.setTextureCube( texture, 0 );

				} else if ( texture.isData3DTexture ) {

					textures.setTexture3D( texture, 0 );

				} else if ( texture.isDataArrayTexture || texture.isCompressedArrayTexture ) {

					textures.setTexture2DArray( texture, 0 );

				} else {

					textures.setTexture2D( texture, 0 );

				}

				state.unbindTexture();

			};

			this.resetState = function () {

				_currentActiveCubeFace = 0;
				_currentActiveMipmapLevel = 0;
				_currentRenderTarget = null;

				state.reset();
				bindingStates.reset();

			};

			if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

				__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) );

			}

		}

		get coordinateSystem() {

			return WebGLCoordinateSystem;

		}

		get outputColorSpace() {

			return this._outputColorSpace;

		}

		set outputColorSpace( colorSpace ) {

			this._outputColorSpace = colorSpace;

			const gl = this.getContext();
			gl.drawingBufferColorSpace = colorSpace === DisplayP3ColorSpace ? 'display-p3' : 'srgb';
			gl.unpackColorSpace = ColorManagement.workingColorSpace === LinearDisplayP3ColorSpace ? 'display-p3' : 'srgb';

		}

		get outputEncoding() { // @deprecated, r152

			console.warn( 'THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.' );
			return this.outputColorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;

		}

		set outputEncoding( encoding ) { // @deprecated, r152

			console.warn( 'THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.' );
			this.outputColorSpace = encoding === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;

		}

		get useLegacyLights() { // @deprecated, r155

			console.warn( 'THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.' );
			return this._useLegacyLights;

		}

		set useLegacyLights( value ) { // @deprecated, r155

			console.warn( 'THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.' );
			this._useLegacyLights = value;

		}

	}

	class WebGL1Renderer extends WebGLRenderer {}

	WebGL1Renderer.prototype.isWebGL1Renderer = true;

	class Scene extends Object3D {

		constructor() {

			super();

			this.isScene = true;

			this.type = 'Scene';

			this.background = null;
			this.environment = null;
			this.fog = null;

			this.backgroundBlurriness = 0;
			this.backgroundIntensity = 1;

			this.overrideMaterial = null;

			if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

				__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) );

			}

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			if ( source.background !== null ) this.background = source.background.clone();
			if ( source.environment !== null ) this.environment = source.environment.clone();
			if ( source.fog !== null ) this.fog = source.fog.clone();

			this.backgroundBlurriness = source.backgroundBlurriness;
			this.backgroundIntensity = source.backgroundIntensity;

			if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

			this.matrixAutoUpdate = source.matrixAutoUpdate;

			return this;

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			if ( this.fog !== null ) data.object.fog = this.fog.toJSON();
			if ( this.backgroundBlurriness > 0 ) data.object.backgroundBlurriness = this.backgroundBlurriness;
			if ( this.backgroundIntensity !== 1 ) data.object.backgroundIntensity = this.backgroundIntensity;

			return data;

		}

	}

	class SphereGeometry extends BufferGeometry {

		constructor( radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI ) {

			super();

			this.type = 'SphereGeometry';

			this.parameters = {
				radius: radius,
				widthSegments: widthSegments,
				heightSegments: heightSegments,
				phiStart: phiStart,
				phiLength: phiLength,
				thetaStart: thetaStart,
				thetaLength: thetaLength
			};

			widthSegments = Math.max( 3, Math.floor( widthSegments ) );
			heightSegments = Math.max( 2, Math.floor( heightSegments ) );

			const thetaEnd = Math.min( thetaStart + thetaLength, Math.PI );

			let index = 0;
			const grid = [];

			const vertex = new Vector3();
			const normal = new Vector3();

			// buffers

			const indices = [];
			const vertices = [];
			const normals = [];
			const uvs = [];

			// generate vertices, normals and uvs

			for ( let iy = 0; iy <= heightSegments; iy ++ ) {

				const verticesRow = [];

				const v = iy / heightSegments;

				// special case for the poles

				let uOffset = 0;

				if ( iy === 0 && thetaStart === 0 ) {

					uOffset = 0.5 / widthSegments;

				} else if ( iy === heightSegments && thetaEnd === Math.PI ) {

					uOffset = - 0.5 / widthSegments;

				}

				for ( let ix = 0; ix <= widthSegments; ix ++ ) {

					const u = ix / widthSegments;

					// vertex

					vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
					vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
					vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

					vertices.push( vertex.x, vertex.y, vertex.z );

					// normal

					normal.copy( vertex ).normalize();
					normals.push( normal.x, normal.y, normal.z );

					// uv

					uvs.push( u + uOffset, 1 - v );

					verticesRow.push( index ++ );

				}

				grid.push( verticesRow );

			}

			// indices

			for ( let iy = 0; iy < heightSegments; iy ++ ) {

				for ( let ix = 0; ix < widthSegments; ix ++ ) {

					const a = grid[ iy ][ ix + 1 ];
					const b = grid[ iy ][ ix ];
					const c = grid[ iy + 1 ][ ix ];
					const d = grid[ iy + 1 ][ ix + 1 ];

					if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
					if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

				}

			}

			// build geometry

			this.setIndex( indices );
			this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
			this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
			this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		}

		copy( source ) {

			super.copy( source );

			this.parameters = Object.assign( {}, source.parameters );

			return this;

		}

		static fromJSON( data ) {

			return new SphereGeometry( data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength );

		}

	}

	class MeshPhongMaterial extends Material {

		constructor( parameters ) {

			super();

			this.isMeshPhongMaterial = true;

			this.type = 'MeshPhongMaterial';

			this.color = new Color( 0xffffff ); // diffuse
			this.specular = new Color( 0x111111 );
			this.shininess = 30;

			this.map = null;

			this.lightMap = null;
			this.lightMapIntensity = 1.0;

			this.aoMap = null;
			this.aoMapIntensity = 1.0;

			this.emissive = new Color( 0x000000 );
			this.emissiveIntensity = 1.0;
			this.emissiveMap = null;

			this.bumpMap = null;
			this.bumpScale = 1;

			this.normalMap = null;
			this.normalMapType = TangentSpaceNormalMap;
			this.normalScale = new Vector2( 1, 1 );

			this.displacementMap = null;
			this.displacementScale = 1;
			this.displacementBias = 0;

			this.specularMap = null;

			this.alphaMap = null;

			this.envMap = null;
			this.combine = MultiplyOperation;
			this.reflectivity = 1;
			this.refractionRatio = 0.98;

			this.wireframe = false;
			this.wireframeLinewidth = 1;
			this.wireframeLinecap = 'round';
			this.wireframeLinejoin = 'round';

			this.flatShading = false;

			this.fog = true;

			this.setValues( parameters );

		}

		copy( source ) {

			super.copy( source );

			this.color.copy( source.color );
			this.specular.copy( source.specular );
			this.shininess = source.shininess;

			this.map = source.map;

			this.lightMap = source.lightMap;
			this.lightMapIntensity = source.lightMapIntensity;

			this.aoMap = source.aoMap;
			this.aoMapIntensity = source.aoMapIntensity;

			this.emissive.copy( source.emissive );
			this.emissiveMap = source.emissiveMap;
			this.emissiveIntensity = source.emissiveIntensity;

			this.bumpMap = source.bumpMap;
			this.bumpScale = source.bumpScale;

			this.normalMap = source.normalMap;
			this.normalMapType = source.normalMapType;
			this.normalScale.copy( source.normalScale );

			this.displacementMap = source.displacementMap;
			this.displacementScale = source.displacementScale;
			this.displacementBias = source.displacementBias;

			this.specularMap = source.specularMap;

			this.alphaMap = source.alphaMap;

			this.envMap = source.envMap;
			this.combine = source.combine;
			this.reflectivity = source.reflectivity;
			this.refractionRatio = source.refractionRatio;

			this.wireframe = source.wireframe;
			this.wireframeLinewidth = source.wireframeLinewidth;
			this.wireframeLinecap = source.wireframeLinecap;
			this.wireframeLinejoin = source.wireframeLinejoin;

			this.flatShading = source.flatShading;

			this.fog = source.fog;

			return this;

		}

	}

	const Cache = {

		enabled: false,

		files: {},

		add: function ( key, file ) {

			if ( this.enabled === false ) return;

			// console.log( 'THREE.Cache', 'Adding key:', key );

			this.files[ key ] = file;

		},

		get: function ( key ) {

			if ( this.enabled === false ) return;

			// console.log( 'THREE.Cache', 'Checking key:', key );

			return this.files[ key ];

		},

		remove: function ( key ) {

			delete this.files[ key ];

		},

		clear: function () {

			this.files = {};

		}

	};

	class LoadingManager {

		constructor( onLoad, onProgress, onError ) {

			const scope = this;

			let isLoading = false;
			let itemsLoaded = 0;
			let itemsTotal = 0;
			let urlModifier = undefined;
			const handlers = [];

			// Refer to #5689 for the reason why we don't set .onStart
			// in the constructor

			this.onStart = undefined;
			this.onLoad = onLoad;
			this.onProgress = onProgress;
			this.onError = onError;

			this.itemStart = function ( url ) {

				itemsTotal ++;

				if ( isLoading === false ) {

					if ( scope.onStart !== undefined ) {

						scope.onStart( url, itemsLoaded, itemsTotal );

					}

				}

				isLoading = true;

			};

			this.itemEnd = function ( url ) {

				itemsLoaded ++;

				if ( scope.onProgress !== undefined ) {

					scope.onProgress( url, itemsLoaded, itemsTotal );

				}

				if ( itemsLoaded === itemsTotal ) {

					isLoading = false;

					if ( scope.onLoad !== undefined ) {

						scope.onLoad();

					}

				}

			};

			this.itemError = function ( url ) {

				if ( scope.onError !== undefined ) {

					scope.onError( url );

				}

			};

			this.resolveURL = function ( url ) {

				if ( urlModifier ) {

					return urlModifier( url );

				}

				return url;

			};

			this.setURLModifier = function ( transform ) {

				urlModifier = transform;

				return this;

			};

			this.addHandler = function ( regex, loader ) {

				handlers.push( regex, loader );

				return this;

			};

			this.removeHandler = function ( regex ) {

				const index = handlers.indexOf( regex );

				if ( index !== - 1 ) {

					handlers.splice( index, 2 );

				}

				return this;

			};

			this.getHandler = function ( file ) {

				for ( let i = 0, l = handlers.length; i < l; i += 2 ) {

					const regex = handlers[ i ];
					const loader = handlers[ i + 1 ];

					if ( regex.global ) regex.lastIndex = 0; // see #17920

					if ( regex.test( file ) ) {

						return loader;

					}

				}

				return null;

			};

		}

	}

	const DefaultLoadingManager = /*@__PURE__*/ new LoadingManager();

	class Loader {

		constructor( manager ) {

			this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

			this.crossOrigin = 'anonymous';
			this.withCredentials = false;
			this.path = '';
			this.resourcePath = '';
			this.requestHeader = {};

		}

		load( /* url, onLoad, onProgress, onError */ ) {}

		loadAsync( url, onProgress ) {

			const scope = this;

			return new Promise( function ( resolve, reject ) {

				scope.load( url, resolve, onProgress, reject );

			} );

		}

		parse( /* data */ ) {}

		setCrossOrigin( crossOrigin ) {

			this.crossOrigin = crossOrigin;
			return this;

		}

		setWithCredentials( value ) {

			this.withCredentials = value;
			return this;

		}

		setPath( path ) {

			this.path = path;
			return this;

		}

		setResourcePath( resourcePath ) {

			this.resourcePath = resourcePath;
			return this;

		}

		setRequestHeader( requestHeader ) {

			this.requestHeader = requestHeader;
			return this;

		}

	}

	Loader.DEFAULT_MATERIAL_NAME = '__DEFAULT';

	class ImageLoader extends Loader {

		constructor( manager ) {

			super( manager );

		}

		load( url, onLoad, onProgress, onError ) {

			if ( this.path !== undefined ) url = this.path + url;

			url = this.manager.resolveURL( url );

			const scope = this;

			const cached = Cache.get( url );

			if ( cached !== undefined ) {

				scope.manager.itemStart( url );

				setTimeout( function () {

					if ( onLoad ) onLoad( cached );

					scope.manager.itemEnd( url );

				}, 0 );

				return cached;

			}

			const image = createElementNS( 'img' );

			function onImageLoad() {

				removeEventListeners();

				Cache.add( url, this );

				if ( onLoad ) onLoad( this );

				scope.manager.itemEnd( url );

			}

			function onImageError( event ) {

				removeEventListeners();

				if ( onError ) onError( event );

				scope.manager.itemError( url );
				scope.manager.itemEnd( url );

			}

			function removeEventListeners() {

				image.removeEventListener( 'load', onImageLoad, false );
				image.removeEventListener( 'error', onImageError, false );

			}

			image.addEventListener( 'load', onImageLoad, false );
			image.addEventListener( 'error', onImageError, false );

			if ( url.slice( 0, 5 ) !== 'data:' ) {

				if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

			}

			scope.manager.itemStart( url );

			image.src = url;

			return image;

		}

	}

	class TextureLoader extends Loader {

		constructor( manager ) {

			super( manager );

		}

		load( url, onLoad, onProgress, onError ) {

			const texture = new Texture();

			const loader = new ImageLoader( this.manager );
			loader.setCrossOrigin( this.crossOrigin );
			loader.setPath( this.path );

			loader.load( url, function ( image ) {

				texture.image = image;
				texture.needsUpdate = true;

				if ( onLoad !== undefined ) {

					onLoad( texture );

				}

			}, onProgress, onError );

			return texture;

		}

	}

	class Light extends Object3D {

		constructor( color, intensity = 1 ) {

			super();

			this.isLight = true;

			this.type = 'Light';

			this.color = new Color( color );
			this.intensity = intensity;

		}

		dispose() {

			// Empty here in base class; some subclasses override.

		}

		copy( source, recursive ) {

			super.copy( source, recursive );

			this.color.copy( source.color );
			this.intensity = source.intensity;

			return this;

		}

		toJSON( meta ) {

			const data = super.toJSON( meta );

			data.object.color = this.color.getHex();
			data.object.intensity = this.intensity;

			if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

			if ( this.distance !== undefined ) data.object.distance = this.distance;
			if ( this.angle !== undefined ) data.object.angle = this.angle;
			if ( this.decay !== undefined ) data.object.decay = this.decay;
			if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

			if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

			return data;

		}

	}

	class AmbientLight extends Light {

		constructor( color, intensity ) {

			super( color, intensity );

			this.isAmbientLight = true;

			this.type = 'AmbientLight';

		}

	}

	class Raycaster {

		constructor( origin, direction, near = 0, far = Infinity ) {

			this.ray = new Ray( origin, direction );
			// direction is assumed to be normalized (for accurate distance calculations)

			this.near = near;
			this.far = far;
			this.camera = null;
			this.layers = new Layers();

			this.params = {
				Mesh: {},
				Line: { threshold: 1 },
				LOD: {},
				Points: { threshold: 1 },
				Sprite: {}
			};

		}

		set( origin, direction ) {

			// direction is assumed to be normalized (for accurate distance calculations)

			this.ray.set( origin, direction );

		}

		setFromCamera( coords, camera ) {

			if ( camera.isPerspectiveCamera ) {

				this.ray.origin.setFromMatrixPosition( camera.matrixWorld );
				this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( this.ray.origin ).normalize();
				this.camera = camera;

			} else if ( camera.isOrthographicCamera ) {

				this.ray.origin.set( coords.x, coords.y, ( camera.near + camera.far ) / ( camera.near - camera.far ) ).unproject( camera ); // set origin in plane of camera
				this.ray.direction.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
				this.camera = camera;

			} else {

				console.error( 'THREE.Raycaster: Unsupported camera type: ' + camera.type );

			}

		}

		intersectObject( object, recursive = true, intersects = [] ) {

			intersectObject( object, this, intersects, recursive );

			intersects.sort( ascSort );

			return intersects;

		}

		intersectObjects( objects, recursive = true, intersects = [] ) {

			for ( let i = 0, l = objects.length; i < l; i ++ ) {

				intersectObject( objects[ i ], this, intersects, recursive );

			}

			intersects.sort( ascSort );

			return intersects;

		}

	}

	function ascSort( a, b ) {

		return a.distance - b.distance;

	}

	function intersectObject( object, raycaster, intersects, recursive ) {

		if ( object.layers.test( raycaster.layers ) ) {

			object.raycast( raycaster, intersects );

		}

		if ( recursive === true ) {

			const children = object.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				intersectObject( children[ i ], raycaster, intersects, true );

			}

		}

	}

	/**
	 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
	 *
	 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
	 * The azimuthal angle (theta) is measured from the positive z-axis.
	 */


	class Spherical {

		constructor( radius = 1, phi = 0, theta = 0 ) {

			this.radius = radius;
			this.phi = phi; // polar angle
			this.theta = theta; // azimuthal angle

			return this;

		}

		set( radius, phi, theta ) {

			this.radius = radius;
			this.phi = phi;
			this.theta = theta;

			return this;

		}

		copy( other ) {

			this.radius = other.radius;
			this.phi = other.phi;
			this.theta = other.theta;

			return this;

		}

		// restrict phi to be between EPS and PI-EPS
		makeSafe() {

			const EPS = 0.000001;
			this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

			return this;

		}

		setFromVector3( v ) {

			return this.setFromCartesianCoords( v.x, v.y, v.z );

		}

		setFromCartesianCoords( x, y, z ) {

			this.radius = Math.sqrt( x * x + y * y + z * z );

			if ( this.radius === 0 ) {

				this.theta = 0;
				this.phi = 0;

			} else {

				this.theta = Math.atan2( x, z );
				this.phi = Math.acos( clamp( y / this.radius, - 1, 1 ) );

			}

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

		__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'register', { detail: {
			revision: REVISION,
		} } ) );

	}

	if ( typeof window !== 'undefined' ) {

		if ( window.__THREE__ ) {

			console.warn( 'WARNING: Multiple instances of Three.js being imported.' );

		} else {

			window.__THREE__ = REVISION;

		}

	}

	// OrbitControls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one-finger move
	//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

	const _changeEvent = { type: 'change' };
	const _startEvent = { type: 'start' };
	const _endEvent = { type: 'end' };
	const _ray = new Ray();
	const _plane = new Plane();
	const TILT_LIMIT = Math.cos( 70 * MathUtils.DEG2RAD );

	class OrbitControls extends EventDispatcher {

		constructor( object, domElement ) {

			super();

			this.object = object;
			this.domElement = domElement;
			this.domElement.style.touchAction = 'none'; // disable touch scroll

			// Set to false to disable this control
			this.enabled = true;

			// "target" sets the location of focus, where the object orbits around
			this.target = new Vector3();

			// Sets the 3D cursor (similar to Blender), from which the maxTargetRadius takes effect
			this.cursor = new Vector3();

			// How far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;

			// How far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;

			// Limit camera target within a spherical area around the cursor
			this.minTargetRadius = 0;
			this.maxTargetRadius = Infinity;

			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians

			// How far you can orbit horizontally, upper and lower limits.
			// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
			this.minAzimuthAngle = - Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians

			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.05;

			// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;

			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;

			// Set to false to disable panning
			this.enablePan = true;
			this.panSpeed = 1.0;
			this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
			this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
			this.zoomToCursor = false;

			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

			// The four arrow keys
			this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

			// Mouse buttons
			this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

			// Touch fingers
			this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

			// for reset
			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;

			// the target DOM element for key events
			this._domElementKeyEvents = null;

			//
			// public methods
			//

			this.getPolarAngle = function () {

				return spherical.phi;

			};

			this.getAzimuthalAngle = function () {

				return spherical.theta;

			};

			this.getDistance = function () {

				return this.object.position.distanceTo( this.target );

			};

			this.listenToKeyEvents = function ( domElement ) {

				domElement.addEventListener( 'keydown', onKeyDown );
				this._domElementKeyEvents = domElement;

			};

			this.stopListenToKeyEvents = function () {

				this._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );
				this._domElementKeyEvents = null;

			};

			this.saveState = function () {

				scope.target0.copy( scope.target );
				scope.position0.copy( scope.object.position );
				scope.zoom0 = scope.object.zoom;

			};

			this.reset = function () {

				scope.target.copy( scope.target0 );
				scope.object.position.copy( scope.position0 );
				scope.object.zoom = scope.zoom0;

				scope.object.updateProjectionMatrix();
				scope.dispatchEvent( _changeEvent );

				scope.update();

				state = STATE.NONE;

			};

			// this method is exposed, but perhaps it would be better if we can make it private...
			this.update = function () {

				const offset = new Vector3();

				// so camera.up is the orbit axis
				const quat = new Quaternion().setFromUnitVectors( object.up, new Vector3( 0, 1, 0 ) );
				const quatInverse = quat.clone().invert();

				const lastPosition = new Vector3();
				const lastQuaternion = new Quaternion();
				const lastTargetPosition = new Vector3();

				const twoPI = 2 * Math.PI;

				return function update( deltaTime = null ) {

					const position = scope.object.position;

					offset.copy( position ).sub( scope.target );

					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion( quat );

					// angle from z-axis around y-axis
					spherical.setFromVector3( offset );

					if ( scope.autoRotate && state === STATE.NONE ) {

						rotateLeft( getAutoRotationAngle( deltaTime ) );

					}

					if ( scope.enableDamping ) {

						spherical.theta += sphericalDelta.theta * scope.dampingFactor;
						spherical.phi += sphericalDelta.phi * scope.dampingFactor;

					} else {

						spherical.theta += sphericalDelta.theta;
						spherical.phi += sphericalDelta.phi;

					}

					// restrict theta to be between desired limits

					let min = scope.minAzimuthAngle;
					let max = scope.maxAzimuthAngle;

					if ( isFinite( min ) && isFinite( max ) ) {

						if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

						if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

						if ( min <= max ) {

							spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

						} else {

							spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
								Math.max( min, spherical.theta ) :
								Math.min( max, spherical.theta );

						}

					}

					// restrict phi to be between desired limits
					spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

					spherical.makeSafe();


					// move target to panned location

					if ( scope.enableDamping === true ) {

						scope.target.addScaledVector( panOffset, scope.dampingFactor );

					} else {

						scope.target.add( panOffset );

					}

					// Limit the target distance from the cursor to create a sphere around the center of interest
					scope.target.sub( scope.cursor );
					scope.target.clampLength( scope.minTargetRadius, scope.maxTargetRadius );
					scope.target.add( scope.cursor );

					// adjust the camera position based on zoom only if we're not zooming to the cursor or if it's an ortho camera
					// we adjust zoom later in these cases
					if ( scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera ) {

						spherical.radius = clampDistance( spherical.radius );

					} else {

						spherical.radius = clampDistance( spherical.radius * scale );

					}

					offset.setFromSpherical( spherical );

					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion( quatInverse );

					position.copy( scope.target ).add( offset );

					scope.object.lookAt( scope.target );

					if ( scope.enableDamping === true ) {

						sphericalDelta.theta *= ( 1 - scope.dampingFactor );
						sphericalDelta.phi *= ( 1 - scope.dampingFactor );

						panOffset.multiplyScalar( 1 - scope.dampingFactor );

					} else {

						sphericalDelta.set( 0, 0, 0 );

						panOffset.set( 0, 0, 0 );

					}

					// adjust camera position
					let zoomChanged = false;
					if ( scope.zoomToCursor && performCursorZoom ) {

						let newRadius = null;
						if ( scope.object.isPerspectiveCamera ) {

							// move the camera down the pointer ray
							// this method avoids floating point error
							const prevRadius = offset.length();
							newRadius = clampDistance( prevRadius * scale );

							const radiusDelta = prevRadius - newRadius;
							scope.object.position.addScaledVector( dollyDirection, radiusDelta );
							scope.object.updateMatrixWorld();

						} else if ( scope.object.isOrthographicCamera ) {

							// adjust the ortho camera position based on zoom changes
							const mouseBefore = new Vector3( mouse.x, mouse.y, 0 );
							mouseBefore.unproject( scope.object );

							scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / scale ) );
							scope.object.updateProjectionMatrix();
							zoomChanged = true;

							const mouseAfter = new Vector3( mouse.x, mouse.y, 0 );
							mouseAfter.unproject( scope.object );

							scope.object.position.sub( mouseAfter ).add( mouseBefore );
							scope.object.updateMatrixWorld();

							newRadius = offset.length();

						} else {

							console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.' );
							scope.zoomToCursor = false;

						}

						// handle the placement of the target
						if ( newRadius !== null ) {

							if ( this.screenSpacePanning ) {

								// position the orbit target in front of the new camera position
								scope.target.set( 0, 0, - 1 )
									.transformDirection( scope.object.matrix )
									.multiplyScalar( newRadius )
									.add( scope.object.position );

							} else {

								// get the ray and translation plane to compute target
								_ray.origin.copy( scope.object.position );
								_ray.direction.set( 0, 0, - 1 ).transformDirection( scope.object.matrix );

								// if the camera is 20 degrees above the horizon then don't adjust the focus target to avoid
								// extremely large values
								if ( Math.abs( scope.object.up.dot( _ray.direction ) ) < TILT_LIMIT ) {

									object.lookAt( scope.target );

								} else {

									_plane.setFromNormalAndCoplanarPoint( scope.object.up, scope.target );
									_ray.intersectPlane( _plane, scope.target );

								}

							}

						}

					} else if ( scope.object.isOrthographicCamera ) {

						scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / scale ) );
						scope.object.updateProjectionMatrix();
						zoomChanged = true;

					}

					scale = 1;
					performCursorZoom = false;

					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if ( zoomChanged ||
						lastPosition.distanceToSquared( scope.object.position ) > EPS ||
						8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ||
						lastTargetPosition.distanceToSquared( scope.target ) > 0 ) {

						scope.dispatchEvent( _changeEvent );

						lastPosition.copy( scope.object.position );
						lastQuaternion.copy( scope.object.quaternion );
						lastTargetPosition.copy( scope.target );

						return true;

					}

					return false;

				};

			}();

			this.dispose = function () {

				scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

				scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
				scope.domElement.removeEventListener( 'pointercancel', onPointerUp );
				scope.domElement.removeEventListener( 'wheel', onMouseWheel );

				scope.domElement.removeEventListener( 'pointermove', onPointerMove );
				scope.domElement.removeEventListener( 'pointerup', onPointerUp );


				if ( scope._domElementKeyEvents !== null ) {

					scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );
					scope._domElementKeyEvents = null;

				}

				//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

			};

			//
			// internals
			//

			const scope = this;

			const STATE = {
				NONE: - 1,
				ROTATE: 0,
				DOLLY: 1,
				PAN: 2,
				TOUCH_ROTATE: 3,
				TOUCH_PAN: 4,
				TOUCH_DOLLY_PAN: 5,
				TOUCH_DOLLY_ROTATE: 6
			};

			let state = STATE.NONE;

			const EPS = 0.000001;

			// current position in spherical coordinates
			const spherical = new Spherical();
			const sphericalDelta = new Spherical();

			let scale = 1;
			const panOffset = new Vector3();

			const rotateStart = new Vector2();
			const rotateEnd = new Vector2();
			const rotateDelta = new Vector2();

			const panStart = new Vector2();
			const panEnd = new Vector2();
			const panDelta = new Vector2();

			const dollyStart = new Vector2();
			const dollyEnd = new Vector2();
			const dollyDelta = new Vector2();

			const dollyDirection = new Vector3();
			const mouse = new Vector2();
			let performCursorZoom = false;

			const pointers = [];
			const pointerPositions = {};

			let controlActive = false;

			function getAutoRotationAngle( deltaTime ) {

				if ( deltaTime !== null ) {

					return ( 2 * Math.PI / 60 * scope.autoRotateSpeed ) * deltaTime;

				} else {

					return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

				}

			}

			function getZoomScale( delta ) {

				const normalizedDelta = Math.abs( delta * 0.01 );
				return Math.pow( 0.95, scope.zoomSpeed * normalizedDelta );

			}

			function rotateLeft( angle ) {

				sphericalDelta.theta -= angle;

			}

			function rotateUp( angle ) {

				sphericalDelta.phi -= angle;

			}

			const panLeft = function () {

				const v = new Vector3();

				return function panLeft( distance, objectMatrix ) {

					v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
					v.multiplyScalar( - distance );

					panOffset.add( v );

				};

			}();

			const panUp = function () {

				const v = new Vector3();

				return function panUp( distance, objectMatrix ) {

					if ( scope.screenSpacePanning === true ) {

						v.setFromMatrixColumn( objectMatrix, 1 );

					} else {

						v.setFromMatrixColumn( objectMatrix, 0 );
						v.crossVectors( scope.object.up, v );

					}

					v.multiplyScalar( distance );

					panOffset.add( v );

				};

			}();

			// deltaX and deltaY are in pixels; right and down are positive
			const pan = function () {

				const offset = new Vector3();

				return function pan( deltaX, deltaY ) {

					const element = scope.domElement;

					if ( scope.object.isPerspectiveCamera ) {

						// perspective
						const position = scope.object.position;
						offset.copy( position ).sub( scope.target );
						let targetDistance = offset.length();

						// half of the fov is center to top of screen
						targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

						// we use only clientHeight here so aspect ratio does not distort speed
						panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
						panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

					} else if ( scope.object.isOrthographicCamera ) {

						// orthographic
						panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
						panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

					} else {

						// camera neither orthographic nor perspective
						console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
						scope.enablePan = false;

					}

				};

			}();

			function dollyOut( dollyScale ) {

				if ( scope.object.isPerspectiveCamera || scope.object.isOrthographicCamera ) {

					scale /= dollyScale;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}

			function dollyIn( dollyScale ) {

				if ( scope.object.isPerspectiveCamera || scope.object.isOrthographicCamera ) {

					scale *= dollyScale;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
					scope.enableZoom = false;

				}

			}

			function updateZoomParameters( x, y ) {

				if ( ! scope.zoomToCursor ) {

					return;

				}

				performCursorZoom = true;

				const rect = scope.domElement.getBoundingClientRect();
				const dx = x - rect.left;
				const dy = y - rect.top;
				const w = rect.width;
				const h = rect.height;

				mouse.x = ( dx / w ) * 2 - 1;
				mouse.y = - ( dy / h ) * 2 + 1;

				dollyDirection.set( mouse.x, mouse.y, 1 ).unproject( scope.object ).sub( scope.object.position ).normalize();

			}

			function clampDistance( dist ) {

				return Math.max( scope.minDistance, Math.min( scope.maxDistance, dist ) );

			}

			//
			// event callbacks - update the object state
			//

			function handleMouseDownRotate( event ) {

				rotateStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownDolly( event ) {

				updateZoomParameters( event.clientX, event.clientX );
				dollyStart.set( event.clientX, event.clientY );

			}

			function handleMouseDownPan( event ) {

				panStart.set( event.clientX, event.clientY );

			}

			function handleMouseMoveRotate( event ) {

				rotateEnd.set( event.clientX, event.clientY );

				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

				const element = scope.domElement;

				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

				rotateStart.copy( rotateEnd );

				scope.update();

			}

			function handleMouseMoveDolly( event ) {

				dollyEnd.set( event.clientX, event.clientY );

				dollyDelta.subVectors( dollyEnd, dollyStart );

				if ( dollyDelta.y > 0 ) {

					dollyOut( getZoomScale( dollyDelta.y ) );

				} else if ( dollyDelta.y < 0 ) {

					dollyIn( getZoomScale( dollyDelta.y ) );

				}

				dollyStart.copy( dollyEnd );

				scope.update();

			}

			function handleMouseMovePan( event ) {

				panEnd.set( event.clientX, event.clientY );

				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

				pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

				scope.update();

			}

			function handleMouseWheel( event ) {

				updateZoomParameters( event.clientX, event.clientY );

				if ( event.deltaY < 0 ) {

					dollyIn( getZoomScale( event.deltaY ) );

				} else if ( event.deltaY > 0 ) {

					dollyOut( getZoomScale( event.deltaY ) );

				}

				scope.update();

			}

			function handleKeyDown( event ) {

				let needsUpdate = false;

				switch ( event.code ) {

					case scope.keys.UP:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							rotateUp( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

						} else {

							pan( 0, scope.keyPanSpeed );

						}

						needsUpdate = true;
						break;

					case scope.keys.BOTTOM:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							rotateUp( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

						} else {

							pan( 0, - scope.keyPanSpeed );

						}

						needsUpdate = true;
						break;

					case scope.keys.LEFT:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							rotateLeft( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

						} else {

							pan( scope.keyPanSpeed, 0 );

						}

						needsUpdate = true;
						break;

					case scope.keys.RIGHT:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							rotateLeft( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

						} else {

							pan( - scope.keyPanSpeed, 0 );

						}

						needsUpdate = true;
						break;

				}

				if ( needsUpdate ) {

					// prevent the browser from scrolling on cursor keys
					event.preventDefault();

					scope.update();

				}


			}

			function handleTouchStartRotate( event ) {

				if ( pointers.length === 1 ) {

					rotateStart.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					rotateStart.set( x, y );

				}

			}

			function handleTouchStartPan( event ) {

				if ( pointers.length === 1 ) {

					panStart.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					panStart.set( x, y );

				}

			}

			function handleTouchStartDolly( event ) {

				const position = getSecondPointerPosition( event );

				const dx = event.pageX - position.x;
				const dy = event.pageY - position.y;

				const distance = Math.sqrt( dx * dx + dy * dy );

				dollyStart.set( 0, distance );

			}

			function handleTouchStartDollyPan( event ) {

				if ( scope.enableZoom ) handleTouchStartDolly( event );

				if ( scope.enablePan ) handleTouchStartPan( event );

			}

			function handleTouchStartDollyRotate( event ) {

				if ( scope.enableZoom ) handleTouchStartDolly( event );

				if ( scope.enableRotate ) handleTouchStartRotate( event );

			}

			function handleTouchMoveRotate( event ) {

				if ( pointers.length == 1 ) {

					rotateEnd.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					rotateEnd.set( x, y );

				}

				rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

				const element = scope.domElement;

				rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

				rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

				rotateStart.copy( rotateEnd );

			}

			function handleTouchMovePan( event ) {

				if ( pointers.length === 1 ) {

					panEnd.set( event.pageX, event.pageY );

				} else {

					const position = getSecondPointerPosition( event );

					const x = 0.5 * ( event.pageX + position.x );
					const y = 0.5 * ( event.pageY + position.y );

					panEnd.set( x, y );

				}

				panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

				pan( panDelta.x, panDelta.y );

				panStart.copy( panEnd );

			}

			function handleTouchMoveDolly( event ) {

				const position = getSecondPointerPosition( event );

				const dx = event.pageX - position.x;
				const dy = event.pageY - position.y;

				const distance = Math.sqrt( dx * dx + dy * dy );

				dollyEnd.set( 0, distance );

				dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

				dollyOut( dollyDelta.y );

				dollyStart.copy( dollyEnd );

				const centerX = ( event.pageX + position.x ) * 0.5;
				const centerY = ( event.pageY + position.y ) * 0.5;

				updateZoomParameters( centerX, centerY );

			}

			function handleTouchMoveDollyPan( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );

				if ( scope.enablePan ) handleTouchMovePan( event );

			}

			function handleTouchMoveDollyRotate( event ) {

				if ( scope.enableZoom ) handleTouchMoveDolly( event );

				if ( scope.enableRotate ) handleTouchMoveRotate( event );

			}

			//
			// event handlers - FSM: listen for events and reset state
			//

			function onPointerDown( event ) {

				if ( scope.enabled === false ) return;

				if ( pointers.length === 0 ) {

					scope.domElement.setPointerCapture( event.pointerId );

					scope.domElement.addEventListener( 'pointermove', onPointerMove );
					scope.domElement.addEventListener( 'pointerup', onPointerUp );

				}

				//

				addPointer( event );

				if ( event.pointerType === 'touch' ) {

					onTouchStart( event );

				} else {

					onMouseDown( event );

				}

			}

			function onPointerMove( event ) {

				if ( scope.enabled === false ) return;

				if ( event.pointerType === 'touch' ) {

					onTouchMove( event );

				} else {

					onMouseMove( event );

				}

			}

			function onPointerUp( event ) {

				removePointer( event );

				if ( pointers.length === 0 ) {

					scope.domElement.releasePointerCapture( event.pointerId );

					scope.domElement.removeEventListener( 'pointermove', onPointerMove );
					scope.domElement.removeEventListener( 'pointerup', onPointerUp );

				}

				scope.dispatchEvent( _endEvent );

				state = STATE.NONE;

			}

			function onMouseDown( event ) {

				let mouseAction;

				switch ( event.button ) {

					case 0:

						mouseAction = scope.mouseButtons.LEFT;
						break;

					case 1:

						mouseAction = scope.mouseButtons.MIDDLE;
						break;

					case 2:

						mouseAction = scope.mouseButtons.RIGHT;
						break;

					default:

						mouseAction = - 1;

				}

				switch ( mouseAction ) {

					case MOUSE.DOLLY:

						if ( scope.enableZoom === false ) return;

						handleMouseDownDolly( event );

						state = STATE.DOLLY;

						break;

					case MOUSE.ROTATE:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enablePan === false ) return;

							handleMouseDownPan( event );

							state = STATE.PAN;

						} else {

							if ( scope.enableRotate === false ) return;

							handleMouseDownRotate( event );

							state = STATE.ROTATE;

						}

						break;

					case MOUSE.PAN:

						if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

							if ( scope.enableRotate === false ) return;

							handleMouseDownRotate( event );

							state = STATE.ROTATE;

						} else {

							if ( scope.enablePan === false ) return;

							handleMouseDownPan( event );

							state = STATE.PAN;

						}

						break;

					default:

						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.dispatchEvent( _startEvent );

				}

			}

			function onMouseMove( event ) {

				switch ( state ) {

					case STATE.ROTATE:

						if ( scope.enableRotate === false ) return;

						handleMouseMoveRotate( event );

						break;

					case STATE.DOLLY:

						if ( scope.enableZoom === false ) return;

						handleMouseMoveDolly( event );

						break;

					case STATE.PAN:

						if ( scope.enablePan === false ) return;

						handleMouseMovePan( event );

						break;

				}

			}

			function onMouseWheel( event ) {

				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

				event.preventDefault();

				scope.dispatchEvent( _startEvent );

				handleMouseWheel( customWheelEvent( event ) );

				scope.dispatchEvent( _endEvent );

			}

			function customWheelEvent( event ) {

				const mode = event.deltaMode;

				// minimal wheel event altered to meet delta-zoom demand
				const newEvent = {
					clientX: event.clientX,
					clientY: event.clientY,
					deltaY: event.deltaY,
				};

				switch ( mode ) {

					case 1: // LINE_MODE
						newEvent.deltaY *= 16;
						break;

					case 2: // PAGE_MODE
						newEvent.deltaY *= 100;
						break;

				}

				// detect if event was triggered by pinching
				if ( event.ctrlKey && !controlActive ) {

					newEvent.deltaY *= 10;

				}

				return newEvent;

			}

			function interceptControlDown( event ) {

				if ( event.key === "Control" ) {

					controlActive = true;
					
					document.addEventListener('keyup', interceptControlUp, { passive: true, capture: true });

				}

			}

			function interceptControlUp( event ) {

				if ( event.key === "Control" ) {

					controlActive = false;
					
					document.removeEventListener('keyup', interceptControlUp, { passive: true, capture: true });

				}

			}

			function onKeyDown( event ) {

				if ( scope.enabled === false || scope.enablePan === false ) return;

				handleKeyDown( event );

			}

			function onTouchStart( event ) {

				trackPointer( event );

				switch ( pointers.length ) {

					case 1:

						switch ( scope.touches.ONE ) {

							case TOUCH.ROTATE:

								if ( scope.enableRotate === false ) return;

								handleTouchStartRotate( event );

								state = STATE.TOUCH_ROTATE;

								break;

							case TOUCH.PAN:

								if ( scope.enablePan === false ) return;

								handleTouchStartPan( event );

								state = STATE.TOUCH_PAN;

								break;

							default:

								state = STATE.NONE;

						}

						break;

					case 2:

						switch ( scope.touches.TWO ) {

							case TOUCH.DOLLY_PAN:

								if ( scope.enableZoom === false && scope.enablePan === false ) return;

								handleTouchStartDollyPan( event );

								state = STATE.TOUCH_DOLLY_PAN;

								break;

							case TOUCH.DOLLY_ROTATE:

								if ( scope.enableZoom === false && scope.enableRotate === false ) return;

								handleTouchStartDollyRotate( event );

								state = STATE.TOUCH_DOLLY_ROTATE;

								break;

							default:

								state = STATE.NONE;

						}

						break;

					default:

						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) {

					scope.dispatchEvent( _startEvent );

				}

			}

			function onTouchMove( event ) {

				trackPointer( event );

				switch ( state ) {

					case STATE.TOUCH_ROTATE:

						if ( scope.enableRotate === false ) return;

						handleTouchMoveRotate( event );

						scope.update();

						break;

					case STATE.TOUCH_PAN:

						if ( scope.enablePan === false ) return;

						handleTouchMovePan( event );

						scope.update();

						break;

					case STATE.TOUCH_DOLLY_PAN:

						if ( scope.enableZoom === false && scope.enablePan === false ) return;

						handleTouchMoveDollyPan( event );

						scope.update();

						break;

					case STATE.TOUCH_DOLLY_ROTATE:

						if ( scope.enableZoom === false && scope.enableRotate === false ) return;

						handleTouchMoveDollyRotate( event );

						scope.update();

						break;

					default:

						state = STATE.NONE;

				}

			}

			function onContextMenu( event ) {

				if ( scope.enabled === false ) return;

				event.preventDefault();

			}

			function addPointer( event ) {

				pointers.push( event.pointerId );

			}

			function removePointer( event ) {

				delete pointerPositions[ event.pointerId ];

				for ( let i = 0; i < pointers.length; i ++ ) {

					if ( pointers[ i ] == event.pointerId ) {

						pointers.splice( i, 1 );
						return;

					}

				}

			}

			function trackPointer( event ) {

				let position = pointerPositions[ event.pointerId ];

				if ( position === undefined ) {

					position = new Vector2();
					pointerPositions[ event.pointerId ] = position;

				}

				position.set( event.pageX, event.pageY );

			}

			function getSecondPointerPosition( event ) {

				const pointerId = ( event.pointerId === pointers[ 0 ] ) ? pointers[ 1 ] : pointers[ 0 ];

				return pointerPositions[ pointerId ];

			}

			//

			scope.domElement.addEventListener( 'contextmenu', onContextMenu );

			scope.domElement.addEventListener( 'pointerdown', onPointerDown );
			scope.domElement.addEventListener( 'pointercancel', onPointerUp );
			scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );

			document.addEventListener( 'keydown', interceptControlDown, { passive: true, capture: true } );

			// force an update at start

			this.update();

		}

	}

	// MapControls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
	//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
	//    Pan - left mouse, or arrow keys / touch: one-finger move

	class MapControls extends OrbitControls {

		constructor( object, domElement ) {

			super( object, domElement );

			this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up

			this.mouseButtons = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.ROTATE };

			this.touches = { ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE };

		}

	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	class MapProvider {
	    constructor() {
	        this.name = '';
	        this.minZoom = 0;
	        this.maxZoom = 20;
	        this.bounds = [];
	        this.center = [];
	    }
	    fetchTile(zoom, x, y) {
	        return null;
	    }
	    getMetaData() {
	        return __awaiter(this, void 0, void 0, function* () { });
	    }
	}

	class OpenStreetMapsProvider extends MapProvider {
	    constructor(address = 'https://a.tile.openstreetmap.org/') {
	        super();
	        this.address = address;
	        this.format = 'png';
	        this.maxZoom = 19;
	    }
	    fetchTile(zoom, x, y) {
	        return new Promise((resolve, reject) => {
	            const image = document.createElement('img');
	            image.onload = function () {
	                resolve(image);
	            };
	            image.onerror = function () {
	                reject();
	            };
	            image.crossOrigin = 'Anonymous';
	            image.src = this.address + zoom + '/' + x + '/' + y + '.' + this.format;
	        });
	    }
	}

	class CanvasUtils {
	    static createOffscreenCanvas(width, height) {
	        if (typeof OffscreenCanvas !== 'undefined') {
	            return new OffscreenCanvas(width, height);
	        }
	        else {
	            let canvas = document.createElement('canvas');
	            canvas.width = width;
	            canvas.height = height;
	            return canvas;
	        }
	    }
	}

	class TextureUtils {
	    static createFillTexture(color = '#000000', width = 1, height = 1) {
	        const canvas = CanvasUtils.createOffscreenCanvas(width, height);
	        const context = canvas.getContext('2d');
	        context.fillStyle = color;
	        context.fillRect(0, 0, width, height);
	        const texture = new Texture(canvas);
	        texture.format = RGBAFormat;
	        texture.magFilter = LinearFilter;
	        texture.minFilter = LinearFilter;
	        texture.generateMipmaps = false;
	        texture.needsUpdate = true;
	        return texture;
	    }
	}

	class QuadTreePosition {
	}
	QuadTreePosition.root = -1;
	QuadTreePosition.topLeft = 0;
	QuadTreePosition.topRight = 1;
	QuadTreePosition.bottomLeft = 2;
	QuadTreePosition.bottomRight = 3;
	class MapNode extends Mesh {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0, geometry = null, material = null) {
	        super(geometry, material);
	        this.mapView = null;
	        this.parentNode = null;
	        this.subdivided = false;
	        this.disposed = false;
	        this.nodesLoaded = 0;
	        this.childrenCache = null;
	        this.isMesh = true;
	        this.mapView = mapView;
	        this.parentNode = parentNode;
	        this.disposed = false;
	        this.location = location;
	        this.level = level;
	        this.x = x;
	        this.y = y;
	        this.initialize();
	    }
	    initialize() {
	        return __awaiter(this, void 0, void 0, function* () { });
	    }
	    createChildNodes() { }
	    subdivide() {
	        const maxZoom = this.mapView.maxZoom();
	        if (this.children.length > 0 || this.level + 1 > maxZoom || this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.childrens) {
	            return;
	        }
	        if (this.mapView.cacheTiles && this.childrenCache !== null) {
	            this.isMesh = false;
	            this.children = this.childrenCache;
	            this.nodesLoaded = this.childrenCache.length;
	        }
	        else {
	            this.createChildNodes();
	        }
	        this.subdivided = true;
	    }
	    simplify() {
	        const minZoom = this.mapView.minZoom();
	        if (this.level - 1 < minZoom) {
	            return;
	        }
	        if (this.mapView.cacheTiles) {
	            this.childrenCache = this.children;
	        }
	        else {
	            for (let i = 0; i < this.children.length; i++) {
	                this.children[i].dispose();
	            }
	        }
	        this.subdivided = false;
	        this.isMesh = true;
	        this.children = [];
	        this.nodesLoaded = 0;
	    }
	    loadData() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.level < this.mapView.provider.minZoom || this.level > this.mapView.provider.maxZoom) {
	                console.warn('Geo-Three: Loading tile outside of provider range.', this);
	                this.material.map = MapNode.defaultTexture;
	                this.material.needsUpdate = true;
	                return;
	            }
	            try {
	                const image = yield this.mapView.provider.fetchTile(this.level, this.x, this.y);
	                yield this.applyTexture(image);
	            }
	            catch (e) {
	                if (this.disposed) {
	                    return;
	                }
	                console.warn('Geo-Three: Failed to load node tile data.', this);
	                this.material.map = MapNode.defaultTexture;
	            }
	            this.material.needsUpdate = true;
	        });
	    }
	    applyTexture(image) {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.disposed) {
	                return;
	            }
	            const texture = new Texture(image);
	            if (parseInt(REVISION) >= 152) {
	                texture.colorSpace = 'srgb';
	            }
	            texture.generateMipmaps = false;
	            texture.format = RGBAFormat;
	            texture.magFilter = LinearFilter;
	            texture.minFilter = LinearFilter;
	            texture.needsUpdate = true;
	            this.material.map = texture;
	        });
	    }
	    nodeReady() {
	        if (this.disposed) {
	            console.warn('Geo-Three: nodeReady() called for disposed node.', this);
	            this.dispose();
	            return;
	        }
	        if (this.parentNode !== null) {
	            this.parentNode.nodesLoaded++;
	            if (this.parentNode.nodesLoaded === MapNode.childrens) {
	                if (this.parentNode.subdivided === true) {
	                    this.parentNode.isMesh = false;
	                }
	                for (let i = 0; i < this.parentNode.children.length; i++) {
	                    this.parentNode.children[i].visible = true;
	                }
	            }
	            if (this.parentNode.nodesLoaded > MapNode.childrens) {
	                console.error('Geo-Three: Loaded more children objects than expected.', this.parentNode.nodesLoaded, this);
	            }
	        }
	        else {
	            this.visible = true;
	        }
	    }
	    dispose() {
	        this.disposed = true;
	        const self = this;
	        try {
	            const material = self.material;
	            material.dispose();
	            if (material.map && material.map !== MapNode.defaultTexture) {
	                material.map.dispose();
	            }
	        }
	        catch (e) { }
	        try {
	            self.geometry.dispose();
	        }
	        catch (e) { }
	    }
	}
	MapNode.defaultTexture = TextureUtils.createFillTexture();
	MapNode.baseGeometry = null;
	MapNode.baseScale = null;
	MapNode.childrens = 4;

	class MapNodeGeometry extends BufferGeometry {
	    constructor(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirt = false, skirtDepth = 10.0) {
	        super();
	        const indices = [];
	        const vertices = [];
	        const normals = [];
	        const uvs = [];
	        MapNodeGeometry.buildPlane(width, height, widthSegments, heightSegments, indices, vertices, normals, uvs);
	        if (skirt) {
	            MapNodeGeometry.buildSkirt(width, height, widthSegments, heightSegments, skirtDepth, indices, vertices, normals, uvs);
	        }
	        this.setIndex(indices);
	        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
	        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
	        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	    }
	    static buildPlane(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, indices, vertices, normals, uvs) {
	        const widthHalf = width / 2;
	        const heightHalf = height / 2;
	        const gridX = widthSegments + 1;
	        const gridZ = heightSegments + 1;
	        const segmentWidth = width / widthSegments;
	        const segmentHeight = height / heightSegments;
	        for (let iz = 0; iz < gridZ; iz++) {
	            const z = iz * segmentHeight - heightHalf;
	            for (let ix = 0; ix < gridX; ix++) {
	                const x = ix * segmentWidth - widthHalf;
	                vertices.push(x, 0, z);
	                normals.push(0, 1, 0);
	                uvs.push(ix / widthSegments, 1 - iz / heightSegments);
	            }
	        }
	        for (let iz = 0; iz < heightSegments; iz++) {
	            for (let ix = 0; ix < widthSegments; ix++) {
	                const a = ix + gridX * iz;
	                const b = ix + gridX * (iz + 1);
	                const c = ix + 1 + gridX * (iz + 1);
	                const d = ix + 1 + gridX * iz;
	                indices.push(a, b, d, b, c, d);
	            }
	        }
	    }
	    static buildSkirt(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirtDepth, indices, vertices, normals, uvs) {
	        const widthHalf = width / 2;
	        const heightHalf = height / 2;
	        const gridX = widthSegments + 1;
	        const gridZ = heightSegments + 1;
	        const segmentWidth = width / widthSegments;
	        const segmentHeight = height / heightSegments;
	        let start = vertices.length / 3;
	        for (let ix = 0; ix < gridX; ix++) {
	            const x = ix * segmentWidth - widthHalf;
	            const z = -heightHalf;
	            vertices.push(x, -skirtDepth, z);
	            normals.push(0, 1, 0);
	            uvs.push(ix / widthSegments, 1);
	        }
	        for (let ix = 0; ix < widthSegments; ix++) {
	            const a = ix;
	            const d = ix + 1;
	            const b = ix + start;
	            const c = ix + start + 1;
	            indices.push(d, b, a, d, c, b);
	        }
	        start = vertices.length / 3;
	        for (let ix = 0; ix < gridX; ix++) {
	            const x = ix * segmentWidth - widthHalf;
	            const z = heightSegments * segmentHeight - heightHalf;
	            vertices.push(x, -skirtDepth, z);
	            normals.push(0, 1, 0);
	            uvs.push(ix / widthSegments, 0);
	        }
	        let offset = gridX * gridZ - widthSegments - 1;
	        for (let ix = 0; ix < widthSegments; ix++) {
	            const a = offset + ix;
	            const d = offset + ix + 1;
	            const b = ix + start;
	            const c = ix + start + 1;
	            indices.push(a, b, d, b, c, d);
	        }
	        start = vertices.length / 3;
	        for (let iz = 0; iz < gridZ; iz++) {
	            const z = iz * segmentHeight - heightHalf;
	            const x = -widthHalf;
	            vertices.push(x, -skirtDepth, z);
	            normals.push(0, 1, 0);
	            uvs.push(0, 1 - iz / heightSegments);
	        }
	        for (let iz = 0; iz < heightSegments; iz++) {
	            const a = iz * gridZ;
	            const d = (iz + 1) * gridZ;
	            const b = iz + start;
	            const c = iz + start + 1;
	            indices.push(a, b, d, b, c, d);
	        }
	        start = vertices.length / 3;
	        for (let iz = 0; iz < gridZ; iz++) {
	            const z = iz * segmentHeight - heightHalf;
	            const x = widthSegments * segmentWidth - widthHalf;
	            vertices.push(x, -skirtDepth, z);
	            normals.push(0, 1, 0);
	            uvs.push(1.0, 1 - iz / heightSegments);
	        }
	        for (let iz = 0; iz < heightSegments; iz++) {
	            const a = iz * gridZ + heightSegments;
	            const d = (iz + 1) * gridZ + heightSegments;
	            const b = iz + start;
	            const c = iz + start + 1;
	            indices.push(d, b, a, d, c, b);
	        }
	    }
	}

	class Geolocation {
	    constructor(latitude, longitude) {
	        this.latitude = latitude;
	        this.longitude = longitude;
	    }
	}

	class UnitsUtils {
	    static datumsToSpherical(latitude, longitude) {
	        const x = longitude * UnitsUtils.EARTH_ORIGIN / 180.0;
	        let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);
	        y = y * UnitsUtils.EARTH_ORIGIN / 180.0;
	        return new Vector2(x, y);
	    }
	    static sphericalToDatums(x, y) {
	        const longitude = x / UnitsUtils.EARTH_ORIGIN * 180.0;
	        let latitude = y / UnitsUtils.EARTH_ORIGIN * 180.0;
	        latitude = 180.0 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180.0)) - Math.PI / 2.0);
	        return new Geolocation(latitude, longitude);
	    }
	    static quadtreeToDatums(zoom, x, y) {
	        const n = Math.pow(2.0, zoom);
	        const longitude = x / n * 360.0 - 180.0;
	        const latitudeRad = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / n)));
	        const latitude = 180.0 * (latitudeRad / Math.PI);
	        return new Geolocation(latitude, longitude);
	    }
	    static vectorToDatums(dir) {
	        const radToDeg = 180 / Math.PI;
	        const latitude = Math.atan2(dir.y, Math.sqrt(Math.pow(dir.x, 2) + Math.pow(-dir.z, 2))) * radToDeg;
	        const longitude = Math.atan2(-dir.z, dir.x) * radToDeg;
	        return new Geolocation(latitude, longitude);
	    }
	    static datumsToVector(latitude, longitude) {
	        const degToRad = Math.PI / 180;
	        const rotX = longitude * degToRad;
	        const rotY = latitude * degToRad;
	        var cos = Math.cos(rotY);
	        return new Vector3(-Math.cos(rotX + Math.PI) * cos, Math.sin(rotY), Math.sin(rotX + Math.PI) * cos);
	    }
	    static mapboxAltitude(color) {
	        return (color.r * 255.0 * 65536.0 + color.g * 255.0 * 256.0 + color.b * 255.0) * 0.1 - 10000.0;
	    }
	    static getTileSize(zoom) {
	        const maxExtent = UnitsUtils.WEB_MERCATOR_MAX_EXTENT;
	        const numTiles = Math.pow(2, zoom);
	        return 2 * maxExtent / numTiles;
	    }
	    static tileBounds(zoom, x, y) {
	        const tileSize = UnitsUtils.getTileSize(zoom);
	        const minX = -UnitsUtils.WEB_MERCATOR_MAX_EXTENT + x * tileSize;
	        const minY = UnitsUtils.WEB_MERCATOR_MAX_EXTENT - (y + 1) * tileSize;
	        return [minX, tileSize, minY, tileSize];
	    }
	    static webMercatorToLatitude(zoom, y) {
	        const yMerc = UnitsUtils.WEB_MERCATOR_MAX_EXTENT - y * UnitsUtils.getTileSize(zoom);
	        return Math.atan(Math.sinh(yMerc / UnitsUtils.EARTH_RADIUS));
	    }
	    static webMercatorToLongitude(zoom, x) {
	        const xMerc = -UnitsUtils.WEB_MERCATOR_MAX_EXTENT + x * UnitsUtils.getTileSize(zoom);
	        return xMerc / UnitsUtils.EARTH_RADIUS;
	    }
	}
	UnitsUtils.EARTH_RADIUS = 6371008;
	UnitsUtils.EARTH_RADIUS_A = 6378137.0;
	UnitsUtils.EARTH_RADIUS_B = 6356752.314245;
	UnitsUtils.EARTH_PERIMETER = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;
	UnitsUtils.EARTH_ORIGIN = UnitsUtils.EARTH_PERIMETER / 2.0;
	UnitsUtils.WEB_MERCATOR_MAX_EXTENT = 20037508.34;

	class MapPlaneNode extends MapNode {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0) {
	        super(parentNode, mapView, location, level, x, y, MapPlaneNode.geometry, new MeshBasicMaterial({ wireframe: false }));
	        this.matrixAutoUpdate = false;
	        this.isMesh = true;
	        this.visible = false;
	    }
	    initialize() {
	        const _super = Object.create(null, {
	            initialize: { get: () => super.initialize }
	        });
	        return __awaiter(this, void 0, void 0, function* () {
	            _super.initialize.call(this);
	            yield this.loadData();
	            this.nodeReady();
	        });
	    }
	    createChildNodes() {
	        const level = this.level + 1;
	        const x = this.x * 2;
	        const y = this.y * 2;
	        const Constructor = Object.getPrototypeOf(this).constructor;
	        let node = new Constructor(this, this.mapView, QuadTreePosition.topLeft, level, x, y);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(-0.25, 0, -0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.topRight, level, x + 1, y);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(0.25, 0, -0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomLeft, level, x, y + 1);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(-0.25, 0, 0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomRight, level, x + 1, y + 1);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(0.25, 0, 0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	    }
	    raycast(raycaster, intersects) {
	        if (this.isMesh === true) {
	            super.raycast(raycaster, intersects);
	        }
	    }
	}
	MapPlaneNode.geometry = new MapNodeGeometry(1, 1, 1, 1, false);
	MapPlaneNode.baseGeometry = MapPlaneNode.geometry;
	MapPlaneNode.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1.0, UnitsUtils.EARTH_PERIMETER);

	class MapNodeHeightGeometry extends BufferGeometry {
	    constructor(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirt = false, skirtDepth = 10.0, imageData = null, calculateNormals = true) {
	        super();
	        const indices = [];
	        const vertices = [];
	        const normals = [];
	        const uvs = [];
	        MapNodeGeometry.buildPlane(width, height, widthSegments, heightSegments, indices, vertices, normals, uvs);
	        const data = imageData.data;
	        for (let i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3) {
	            const r = data[i];
	            const g = data[i + 1];
	            const b = data[i + 2];
	            const value = (r * 65536 + g * 256 + b) * 0.1 - 1e4;
	            vertices[j + 1] = value;
	        }
	        if (skirt) {
	            MapNodeGeometry.buildSkirt(width, height, widthSegments, heightSegments, skirtDepth, indices, vertices, normals, uvs);
	        }
	        this.setIndex(indices);
	        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
	        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
	        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	        if (calculateNormals) {
	            this.computeNormals(widthSegments, heightSegments);
	        }
	    }
	    computeNormals(widthSegments, heightSegments) {
	        const positionAttribute = this.getAttribute('position');
	        if (positionAttribute !== undefined) {
	            let normalAttribute = this.getAttribute('normal');
	            const normalLength = heightSegments * widthSegments;
	            for (let i = 0; i < normalLength; i++) {
	                normalAttribute.setXYZ(i, 0, 0, 0);
	            }
	            const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
	            const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
	            const cb = new Vector3(), ab = new Vector3();
	            const indexLength = heightSegments * widthSegments * 6;
	            for (let i = 0; i < indexLength; i += 3) {
	                const vA = this.index.getX(i + 0);
	                const vB = this.index.getX(i + 1);
	                const vC = this.index.getX(i + 2);
	                pA.fromBufferAttribute(positionAttribute, vA);
	                pB.fromBufferAttribute(positionAttribute, vB);
	                pC.fromBufferAttribute(positionAttribute, vC);
	                cb.subVectors(pC, pB);
	                ab.subVectors(pA, pB);
	                cb.cross(ab);
	                nA.fromBufferAttribute(normalAttribute, vA);
	                nB.fromBufferAttribute(normalAttribute, vB);
	                nC.fromBufferAttribute(normalAttribute, vC);
	                nA.add(cb);
	                nB.add(cb);
	                nC.add(cb);
	                normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
	                normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
	                normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
	            }
	            this.normalizeNormals();
	            normalAttribute.needsUpdate = true;
	        }
	    }
	}

	class MapHeightNode extends MapNode {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0, geometry = MapHeightNode.geometry, material = new MeshPhongMaterial({ wireframe: false, color: 0xffffff })) {
	        super(parentNode, mapView, location, level, x, y, geometry, material);
	        this.heightLoaded = false;
	        this.textureLoaded = false;
	        this.geometrySize = 16;
	        this.geometryNormals = false;
	        this.isMesh = true;
	        this.visible = false;
	        this.matrixAutoUpdate = false;
	    }
	    initialize() {
	        const _super = Object.create(null, {
	            initialize: { get: () => super.initialize }
	        });
	        return __awaiter(this, void 0, void 0, function* () {
	            _super.initialize.call(this);
	            yield this.loadData();
	            yield this.loadHeightGeometry();
	            this.nodeReady();
	        });
	    }
	    loadData() {
	        const _super = Object.create(null, {
	            loadData: { get: () => super.loadData }
	        });
	        return __awaiter(this, void 0, void 0, function* () {
	            yield _super.loadData.call(this);
	            this.textureLoaded = true;
	        });
	    }
	    loadHeightGeometry() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.mapView.heightProvider === null) {
	                throw new Error('GeoThree: MapView.heightProvider provider is null.');
	            }
	            if (this.level < this.mapView.heightProvider.minZoom || this.level > this.mapView.heightProvider.maxZoom) {
	                console.warn('Geo-Three: Loading tile outside of provider range.', this);
	                this.geometry = MapPlaneNode.baseGeometry;
	                return;
	            }
	            try {
	                const image = yield this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
	                if (this.disposed) {
	                    return;
	                }
	                const canvas = CanvasUtils.createOffscreenCanvas(this.geometrySize + 1, this.geometrySize + 1);
	                const context = canvas.getContext('2d');
	                context.imageSmoothingEnabled = false;
	                context.drawImage(image, 0, 0, MapHeightNode.tileSize, MapHeightNode.tileSize, 0, 0, canvas.width, canvas.height);
	                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	                this.geometry = new MapNodeHeightGeometry(1, 1, this.geometrySize, this.geometrySize, true, 10.0, imageData, true);
	            }
	            catch (e) {
	                if (this.disposed) {
	                    return;
	                }
	                this.geometry = MapPlaneNode.baseGeometry;
	            }
	            this.heightLoaded = true;
	        });
	    }
	    createChildNodes() {
	        const level = this.level + 1;
	        const Constructor = Object.getPrototypeOf(this).constructor;
	        const x = this.x * 2;
	        const y = this.y * 2;
	        let node = new Constructor(this, this.mapView, QuadTreePosition.topLeft, level, x, y);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(-0.25, 0, -0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.topRight, level, x + 1, y);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(0.25, 0, -0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomLeft, level, x, y + 1);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(-0.25, 0, 0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomRight, level, x + 1, y + 1);
	        node.scale.set(0.5, 1.0, 0.5);
	        node.position.set(0.25, 0, 0.25);
	        this.add(node);
	        node.updateMatrix();
	        node.updateMatrixWorld(true);
	    }
	    raycast(raycaster, intersects) {
	        if (this.isMesh === true) {
	            super.raycast(raycaster, intersects);
	        }
	    }
	}
	MapHeightNode.tileSize = 256;
	MapHeightNode.geometry = new MapNodeGeometry(1, 1, 1, 1);
	MapHeightNode.baseGeometry = MapPlaneNode.geometry;
	MapHeightNode.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	class MapSphereNodeGeometry extends BufferGeometry {
	    constructor(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
	        super();
	        const thetaEnd = thetaStart + thetaLength;
	        let index = 0;
	        const grid = [];
	        const vertex = new Vector3();
	        const normal = new Vector3();
	        const indices = [];
	        const vertices = [];
	        const normals = [];
	        const uvs = [];
	        for (let iy = 0; iy <= heightSegments; iy++) {
	            const verticesRow = [];
	            const v = iy / heightSegments;
	            for (let ix = 0; ix <= widthSegments; ix++) {
	                const u = ix / widthSegments;
	                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
	                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
	                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
	                vertices.push(vertex.x, vertex.y, vertex.z);
	                normal.set(vertex.x, vertex.y, vertex.z).normalize();
	                normals.push(normal.x, normal.y, normal.z);
	                uvs.push(u, 1 - v);
	                verticesRow.push(index++);
	            }
	            grid.push(verticesRow);
	        }
	        for (let iy = 0; iy < heightSegments; iy++) {
	            for (let ix = 0; ix < widthSegments; ix++) {
	                const a = grid[iy][ix + 1];
	                const b = grid[iy][ix];
	                const c = grid[iy + 1][ix];
	                const d = grid[iy + 1][ix + 1];
	                if (iy !== 0 || thetaStart > 0) {
	                    indices.push(a, b, d);
	                }
	                if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
	                    indices.push(b, c, d);
	                }
	            }
	        }
	        this.setIndex(indices);
	        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
	        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
	        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	    }
	}

	class MapSphereNode extends MapNode {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0) {
	        let bounds = UnitsUtils.tileBounds(level, x, y);
	        const vertexShader = `
		varying vec3 vPosition;

		void main() {
			vPosition = position;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
		`;
	        const fragmentShader = `
		#define PI 3.1415926538
		varying vec3 vPosition;
		uniform sampler2D uTexture;
		uniform vec4 webMercatorBounds;

		void main() {
			// this could also be a constant, but for some reason using a constant causes more visible tile gaps at high zoom
			float radius = length(vPosition);

			float latitude = asin(vPosition.y / radius);
			float longitude = atan(-vPosition.z, vPosition.x);

			float web_mercator_x = radius * longitude;
			float web_mercator_y = radius * log(tan(PI / 4.0 + latitude / 2.0));
			float y = (web_mercator_y - webMercatorBounds.z) / webMercatorBounds.w;
			float x = (web_mercator_x - webMercatorBounds.x) / webMercatorBounds.y;

			vec4 color = texture2D(uTexture, vec2(x, y));
			gl_FragColor = color;
			${parseInt(REVISION) < 152 ? '' : `
				#include <tonemapping_fragment>
				#include ${(parseInt(REVISION) >= 154) ? '<colorspace_fragment>' : '<encodings_fragment>'}
				`}
		}
		`;
	        let vBounds = new Vector4(...bounds);
	        const material = new ShaderMaterial({
	            uniforms: { uTexture: { value: new Texture() }, webMercatorBounds: { value: vBounds } },
	            vertexShader: vertexShader,
	            fragmentShader: fragmentShader
	        });
	        super(parentNode, mapView, location, level, x, y, MapSphereNode.createGeometry(level, x, y), material);
	        this.applyScaleNode();
	        this.matrixAutoUpdate = false;
	        this.isMesh = true;
	        this.visible = false;
	    }
	    initialize() {
	        const _super = Object.create(null, {
	            initialize: { get: () => super.initialize }
	        });
	        return __awaiter(this, void 0, void 0, function* () {
	            _super.initialize.call(this);
	            yield this.loadData();
	            this.nodeReady();
	        });
	    }
	    static createGeometry(zoom, x, y) {
	        const range = Math.pow(2, zoom);
	        const max = 40;
	        const segments = Math.floor(MapSphereNode.segments * (max / (zoom + 1)) / max);
	        const lon1 = x > 0 ? UnitsUtils.webMercatorToLongitude(zoom, x) + Math.PI : 0;
	        const lon2 = x < range - 1 ? UnitsUtils.webMercatorToLongitude(zoom, x + 1) + Math.PI : 2 * Math.PI;
	        const phiStart = lon1;
	        const phiLength = lon2 - lon1;
	        const lat1 = y > 0 ? UnitsUtils.webMercatorToLatitude(zoom, y) : Math.PI / 2;
	        const lat2 = y < range - 1 ? UnitsUtils.webMercatorToLatitude(zoom, y + 1) : -Math.PI / 2;
	        const thetaLength = lat1 - lat2;
	        const thetaStart = Math.PI - (lat1 + Math.PI / 2);
	        return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
	    }
	    applyTexture(image) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const textureLoader = new TextureLoader();
	            const texture = textureLoader.load(image.src, function () {
	                if (parseInt(REVISION) >= 152) {
	                    texture.colorSpace = 'srgb';
	                }
	            });
	            this.material.uniforms.uTexture.value = texture;
	            this.material.uniforms.uTexture.needsUpdate = true;
	        });
	    }
	    applyScaleNode() {
	        this.geometry.computeBoundingBox();
	        const box = this.geometry.boundingBox.clone();
	        const center = box.getCenter(new Vector3());
	        const matrix = new Matrix4();
	        matrix.compose(new Vector3(-center.x, -center.y, -center.z), new Quaternion(), new Vector3(UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS));
	        this.geometry.applyMatrix4(matrix);
	        this.position.copy(center);
	        this.updateMatrix();
	        this.updateMatrixWorld();
	    }
	    updateMatrix() {
	        this.matrix.setPosition(this.position);
	        this.matrixWorldNeedsUpdate = true;
	    }
	    updateMatrixWorld(force = false) {
	        if (this.matrixWorldNeedsUpdate || force) {
	            this.matrixWorld.copy(this.matrix);
	            this.matrixWorldNeedsUpdate = false;
	        }
	    }
	    createChildNodes() {
	        const level = this.level + 1;
	        const x = this.x * 2;
	        const y = this.y * 2;
	        const Constructor = Object.getPrototypeOf(this).constructor;
	        let node = new Constructor(this, this.mapView, QuadTreePosition.topLeft, level, x, y);
	        this.add(node);
	        node = new Constructor(this, this.mapView, QuadTreePosition.topRight, level, x + 1, y);
	        this.add(node);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomLeft, level, x, y + 1);
	        this.add(node);
	        node = new Constructor(this, this.mapView, QuadTreePosition.bottomRight, level, x + 1, y + 1);
	        this.add(node);
	    }
	    raycast(raycaster, intersects) {
	        if (this.isMesh === true) {
	            super.raycast(raycaster, intersects);
	        }
	    }
	}
	MapSphereNode.baseGeometry = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);
	MapSphereNode.baseScale = new Vector3(1, 1, 1);
	MapSphereNode.segments = 80;

	class MapHeightNodeShader extends MapHeightNode {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0) {
	        const material = MapHeightNodeShader.prepareMaterial(new MeshPhongMaterial({ map: MapNode.defaultTexture, color: 0xFFFFFF }));
	        super(parentNode, mapView, location, level, x, y, MapHeightNodeShader.geometry, material);
	        this.frustumCulled = false;
	    }
	    static prepareMaterial(material) {
	        material.userData = { heightMap: { value: MapHeightNodeShader.defaultHeightTexture } };
	        material.onBeforeCompile = (shader) => {
	            for (const i in material.userData) {
	                shader.uniforms[i] = material.userData[i];
	            }
	            shader.vertexShader =
	                `
			uniform sampler2D heightMap;
			` + shader.vertexShader;
	            shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
			#include <fog_vertex>
	
			// Calculate height of the title
			vec4 _theight = texture2D(heightMap, vUv);
			float _height = ((_theight.r * 255.0 * 65536.0 + _theight.g * 255.0 * 256.0 + _theight.b * 255.0) * 0.1) - 10000.0;
			vec3 _transformed = position + _height * normal;
	
			// Vertex position based on height
			gl_Position = projectionMatrix * modelViewMatrix * vec4(_transformed, 1.0);
			`);
	        };
	        return material;
	    }
	    loadData() {
	        const _super = Object.create(null, {
	            loadData: { get: () => super.loadData }
	        });
	        return __awaiter(this, void 0, void 0, function* () {
	            yield _super.loadData.call(this);
	            this.textureLoaded = true;
	        });
	    }
	    loadHeightGeometry() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.mapView.heightProvider === null) {
	                throw new Error('GeoThree: MapView.heightProvider provider is null.');
	            }
	            if (this.level < this.mapView.heightProvider.minZoom || this.level > this.mapView.heightProvider.maxZoom) {
	                console.warn('Geo-Three: Loading tile outside of provider range.', this);
	                this.material.map = MapHeightNodeShader.defaultTexture;
	                this.material.needsUpdate = true;
	                return;
	            }
	            try {
	                const image = yield this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
	                if (this.disposed) {
	                    return;
	                }
	                const texture = new Texture(image);
	                texture.generateMipmaps = false;
	                texture.format = RGBAFormat;
	                texture.magFilter = NearestFilter;
	                texture.minFilter = NearestFilter;
	                texture.needsUpdate = true;
	                this.material.userData.heightMap.value = texture;
	            }
	            catch (e) {
	                if (this.disposed) {
	                    return;
	                }
	                console.error('Geo-Three: Failed to load node tile height data.', this);
	                this.material.userData.heightMap.value = MapHeightNodeShader.defaultHeightTexture;
	            }
	            this.material.needsUpdate = true;
	            this.heightLoaded = true;
	        });
	    }
	    raycast(raycaster, intersects) {
	        if (this.isMesh === true) {
	            this.geometry = MapPlaneNode.geometry;
	            super.raycast(raycaster, intersects);
	            this.geometry = MapHeightNodeShader.geometry;
	        }
	    }
	    dispose() {
	        super.dispose();
	        if (this.material.userData.heightMap.value && this.material.userData.heightMap.value !== MapHeightNodeShader.defaultHeightTexture) {
	            this.material.userData.heightMap.value.dispose();
	        }
	    }
	}
	MapHeightNodeShader.defaultHeightTexture = TextureUtils.createFillTexture('#0186C0');
	MapHeightNodeShader.geometrySize = 256;
	MapHeightNodeShader.geometry = new MapNodeGeometry(1.0, 1.0, MapHeightNodeShader.geometrySize, MapHeightNodeShader.geometrySize, true);
	MapHeightNodeShader.baseGeometry = MapPlaneNode.geometry;
	MapHeightNodeShader.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	class LODRaycast {
	    constructor() {
	        this.subdivisionRays = 1;
	        this.thresholdUp = 0.6;
	        this.thresholdDown = 0.15;
	        this.raycaster = new Raycaster();
	        this.mouse = new Vector2();
	        this.powerDistance = false;
	        this.scaleDistance = true;
	    }
	    updateLOD(view, camera, renderer, scene) {
	        const intersects = [];
	        for (let t = 0; t < this.subdivisionRays; t++) {
	            this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);
	            this.raycaster.setFromCamera(this.mouse, camera);
	            let myIntersects = [];
	            this.raycaster.intersectObjects(view.children, true, myIntersects);
	            if (myIntersects.length > 0) {
	                intersects.push(myIntersects[0]);
	            }
	        }
	        for (let i = 0; i < intersects.length; i++) {
	            const node = intersects[i].object;
	            let distance = intersects[i].distance;
	            if (this.powerDistance) {
	                distance = Math.pow(distance * 2, node.level);
	            }
	            if (this.scaleDistance) {
	                const matrix = node.matrixWorld.elements;
	                const vector = new Vector3(matrix[0], matrix[1], matrix[2]);
	                distance = vector.length() / distance;
	            }
	            if (distance > this.thresholdUp) {
	                node.subdivide();
	            }
	            else if (distance < this.thresholdDown && node.parentNode) {
	                node.parentNode.simplify();
	            }
	        }
	    }
	}

	class Martini {
	    constructor(gridSize = 257) {
	        this.gridSize = gridSize;
	        const tileSize = gridSize - 1;
	        if (tileSize & tileSize - 1) {
	            throw new Error(`Expected grid size to be 2^n+1, got ${gridSize}.`);
	        }
	        this.numTriangles = tileSize * tileSize * 2 - 2;
	        this.numParentTriangles = this.numTriangles - tileSize * tileSize;
	        this.indices = new Uint32Array(this.gridSize * this.gridSize);
	        this.coords = new Uint16Array(this.numTriangles * 4);
	        for (let i = 0; i < this.numTriangles; i++) {
	            let id = i + 2;
	            let ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0;
	            if (id & 1) {
	                bx = by = cx = tileSize;
	            }
	            else {
	                ax = ay = cy = tileSize;
	            }
	            while ((id >>= 1) > 1) {
	                const mx = ax + bx >> 1;
	                const my = ay + by >> 1;
	                if (id & 1) {
	                    bx = ax;
	                    by = ay;
	                    ax = cx;
	                    ay = cy;
	                }
	                else {
	                    ax = bx;
	                    ay = by;
	                    bx = cx;
	                    by = cy;
	                }
	                cx = mx;
	                cy = my;
	            }
	            const k = i * 4;
	            this.coords[k + 0] = ax;
	            this.coords[k + 1] = ay;
	            this.coords[k + 2] = bx;
	            this.coords[k + 3] = by;
	        }
	    }
	    createTile(terrain) {
	        return new Tile(terrain, this);
	    }
	}
	class Tile {
	    constructor(terrain, martini) {
	        const size = martini.gridSize;
	        if (terrain.length !== size * size) {
	            throw new Error(`Expected terrain data of length ${size * size} (${size} x ${size}), got ${terrain.length}.`);
	        }
	        this.terrain = terrain;
	        this.martini = martini;
	        this.errors = new Float32Array(terrain.length);
	        this.update();
	    }
	    update() {
	        const { numTriangles, numParentTriangles, coords, gridSize: size } = this.martini;
	        const { terrain, errors } = this;
	        for (let i = numTriangles - 1; i >= 0; i--) {
	            const k = i * 4;
	            const ax = coords[k + 0];
	            const ay = coords[k + 1];
	            const bx = coords[k + 2];
	            const by = coords[k + 3];
	            const mx = ax + bx >> 1;
	            const my = ay + by >> 1;
	            const cx = mx + my - ay;
	            const cy = my + ax - mx;
	            const interpolatedHeight = (terrain[ay * size + ax] + terrain[by * size + bx]) / 2;
	            const middleIndex = my * size + mx;
	            const middleError = Math.abs(interpolatedHeight - terrain[middleIndex]);
	            errors[middleIndex] = Math.max(errors[middleIndex], middleError);
	            if (i < numParentTriangles) {
	                const leftChildIndex = (ay + cy >> 1) * size + (ax + cx >> 1);
	                const rightChildIndex = (by + cy >> 1) * size + (bx + cx >> 1);
	                errors[middleIndex] = Math.max(errors[middleIndex], errors[leftChildIndex], errors[rightChildIndex]);
	            }
	        }
	    }
	    getMesh(maxError = 0, withSkirts = false) {
	        const { gridSize: size, indices } = this.martini;
	        const { errors } = this;
	        let numVertices = 0;
	        let numTriangles = 0;
	        const max = size - 1;
	        let aIndex, bIndex, cIndex = 0;
	        const leftSkirtIndices = [];
	        const rightSkirtIndices = [];
	        const bottomSkirtIndices = [];
	        const topSkirtIndices = [];
	        indices.fill(0);
	        function countElements(ax, ay, bx, by, cx, cy) {
	            const mx = ax + bx >> 1;
	            const my = ay + by >> 1;
	            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
	                countElements(cx, cy, ax, ay, mx, my);
	                countElements(bx, by, cx, cy, mx, my);
	            }
	            else {
	                aIndex = ay * size + ax;
	                bIndex = by * size + bx;
	                cIndex = cy * size + cx;
	                if (indices[aIndex] === 0) {
	                    if (withSkirts) {
	                        if (ax === 0) {
	                            leftSkirtIndices.push(numVertices);
	                        }
	                        else if (ax === max) {
	                            rightSkirtIndices.push(numVertices);
	                        }
	                        if (ay === 0) {
	                            bottomSkirtIndices.push(numVertices);
	                        }
	                        else if (ay === max) {
	                            topSkirtIndices.push(numVertices);
	                        }
	                    }
	                    indices[aIndex] = ++numVertices;
	                }
	                if (indices[bIndex] === 0) {
	                    if (withSkirts) {
	                        if (bx === 0) {
	                            leftSkirtIndices.push(numVertices);
	                        }
	                        else if (bx === max) {
	                            rightSkirtIndices.push(numVertices);
	                        }
	                        if (by === 0) {
	                            bottomSkirtIndices.push(numVertices);
	                        }
	                        else if (by === max) {
	                            topSkirtIndices.push(numVertices);
	                        }
	                    }
	                    indices[bIndex] = ++numVertices;
	                }
	                if (indices[cIndex] === 0) {
	                    if (withSkirts) {
	                        if (cx === 0) {
	                            leftSkirtIndices.push(numVertices);
	                        }
	                        else if (cx === max) {
	                            rightSkirtIndices.push(numVertices);
	                        }
	                        if (cy === 0) {
	                            bottomSkirtIndices.push(numVertices);
	                        }
	                        else if (cy === max) {
	                            topSkirtIndices.push(numVertices);
	                        }
	                    }
	                    indices[cIndex] = ++numVertices;
	                }
	                numTriangles++;
	            }
	        }
	        countElements(0, 0, max, max, max, 0);
	        countElements(max, max, 0, 0, 0, max);
	        let numTotalVertices = numVertices * 2;
	        let numTotalTriangles = numTriangles * 3;
	        if (withSkirts) {
	            numTotalVertices += (leftSkirtIndices.length + rightSkirtIndices.length + bottomSkirtIndices.length + topSkirtIndices.length) * 2;
	            numTotalTriangles += ((leftSkirtIndices.length - 1) * 2 + (rightSkirtIndices.length - 1) * 2 + (bottomSkirtIndices.length - 1) * 2 + (topSkirtIndices.length - 1) * 2) * 3;
	        }
	        const vertices = new Uint16Array(numTotalVertices);
	        const triangles = new Uint32Array(numTotalTriangles);
	        let triIndex = 0;
	        function processTriangle(ax, ay, bx, by, cx, cy) {
	            const mx = ax + bx >> 1;
	            const my = ay + by >> 1;
	            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
	                processTriangle(cx, cy, ax, ay, mx, my);
	                processTriangle(bx, by, cx, cy, mx, my);
	            }
	            else {
	                const a = indices[ay * size + ax] - 1;
	                const b = indices[by * size + bx] - 1;
	                const c = indices[cy * size + cx] - 1;
	                vertices[2 * a] = ax;
	                vertices[2 * a + 1] = ay;
	                vertices[2 * b] = bx;
	                vertices[2 * b + 1] = by;
	                vertices[2 * c] = cx;
	                vertices[2 * c + 1] = cy;
	                triangles[triIndex++] = a;
	                triangles[triIndex++] = b;
	                triangles[triIndex++] = c;
	            }
	        }
	        processTriangle(0, 0, max, max, max, 0);
	        processTriangle(max, max, 0, 0, 0, max);
	        if (withSkirts) {
	            leftSkirtIndices.sort((a, b) => { return vertices[2 * a + 1] - vertices[2 * b + 1]; });
	            rightSkirtIndices.sort((a, b) => { return vertices[2 * b + 1] - vertices[2 * a + 1]; });
	            bottomSkirtIndices.sort((a, b) => { return vertices[2 * b] - vertices[2 * a]; });
	            topSkirtIndices.sort((a, b) => { return vertices[2 * a] - vertices[2 * b]; });
	            let skirtIndex = numVertices * 2;
	            function constructSkirt(skirt) {
	                const skirtLength = skirt.length;
	                for (let i = 0; i < skirtLength - 1; i++) {
	                    const currIndex = skirt[i];
	                    const nextIndex = skirt[i + 1];
	                    const currentSkirt = skirtIndex / 2;
	                    const nextSkirt = (skirtIndex + 2) / 2;
	                    vertices[skirtIndex++] = vertices[2 * currIndex];
	                    vertices[skirtIndex++] = vertices[2 * currIndex + 1];
	                    triangles[triIndex++] = currIndex;
	                    triangles[triIndex++] = currentSkirt;
	                    triangles[triIndex++] = nextIndex;
	                    triangles[triIndex++] = currentSkirt;
	                    triangles[triIndex++] = nextSkirt;
	                    triangles[triIndex++] = nextIndex;
	                }
	                vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1]];
	                vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1] + 1];
	            }
	            constructSkirt(leftSkirtIndices);
	            constructSkirt(rightSkirtIndices);
	            constructSkirt(bottomSkirtIndices);
	            constructSkirt(topSkirtIndices);
	        }
	        return { vertices: vertices, triangles: triangles, numVerticesWithoutSkirts: numVertices };
	    }
	}

	class MapMartiniHeightNode extends MapHeightNode {
	    constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0, { elevationDecoder = null, meshMaxError = 10, exageration = 1 } = {}) {
	        super(parentNode, mapView, location, level, x, y, MapMartiniHeightNode.geometry, MapMartiniHeightNode.prepareMaterial(new MeshPhongMaterial({
	            map: MapMartiniHeightNode.emptyTexture,
	            color: 0xFFFFFF,
	            side: DoubleSide
	        }), level, exageration));
	        this.elevationDecoder = {
	            rScaler: 256,
	            gScaler: 1,
	            bScaler: 1 / 256,
	            offset: -32768
	        };
	        this.exageration = 1.0;
	        this.meshMaxError = 10;
	        if (elevationDecoder) {
	            this.elevationDecoder = elevationDecoder;
	        }
	        this.meshMaxError = meshMaxError;
	        this.exageration = exageration;
	        this.frustumCulled = false;
	    }
	    static prepareMaterial(material, level, exageration = 1.0) {
	        material.userData = {
	            heightMap: { value: MapMartiniHeightNode.emptyTexture },
	            drawNormals: { value: 0 },
	            drawBlack: { value: 0 },
	            zoomlevel: { value: level },
	            computeNormals: { value: 1 },
	            drawTexture: { value: 1 }
	        };
	        material.onBeforeCompile = (shader) => {
	            for (let i in material.userData) {
	                shader.uniforms[i] = material.userData[i];
	            }
	            shader.vertexShader =
	                `
				uniform bool computeNormals;
				uniform float zoomlevel;
				uniform sampler2D heightMap;
				` + shader.vertexShader;
	            shader.fragmentShader =
	                `
				uniform bool drawNormals;
				uniform bool drawTexture;
				uniform bool drawBlack;
				` + shader.fragmentShader;
	            shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
				if(drawBlack) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 1.0 );
				} else if(drawNormals) {
					gl_FragColor = vec4( ( 0.5 * vNormal + 0.5 ), 1.0 );
				} else if (!drawTexture) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 0.0 );
				}`);
	            shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
				#include <fog_vertex>

				// queried pixels:
				// +-----------+
				// |   |   |   |
				// | a | b | c |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | d | e | f |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | g | h | i |
				// |   |   |   |
				// +-----------+

				if (computeNormals) {
					float e = getElevation(vUv, 0.0);
					ivec2 size = textureSize(heightMap, 0);
					float offset = 1.0 / float(size.x);
					float a = getElevation(vUv + vec2(-offset, -offset), 0.0);
					float b = getElevation(vUv + vec2(0, -offset), 0.0);
					float c = getElevation(vUv + vec2(offset, -offset), 0.0);
					float d = getElevation(vUv + vec2(-offset, 0), 0.0);
					float f = getElevation(vUv + vec2(offset, 0), 0.0);
					float g = getElevation(vUv + vec2(-offset, offset), 0.0);
					float h = getElevation(vUv + vec2(0, offset), 0.0);
					float i = getElevation(vUv + vec2(offset,offset), 0.0);


					float normalLength = 500.0 / zoomlevel;

					vec3 v0 = vec3(0.0, 0.0, 0.0);
					vec3 v1 = vec3(0.0, normalLength, 0.0);
					vec3 v2 = vec3(normalLength, 0.0, 0.0);
					v0.z = (e + d + g + h) / 4.0;
					v1.z = (e+ b + a + d) / 4.0;
					v2.z = (e+ h + i + f) / 4.0;
					vNormal = (normalize(cross(v2 - v0, v1 - v0))).rbg;
				}
				`);
	        };
	        return material;
	    }
	    static getTerrain(imageData, tileSize, elevation) {
	        const { rScaler, bScaler, gScaler, offset } = elevation;
	        const gridSize = tileSize + 1;
	        const terrain = new Float32Array(gridSize * gridSize);
	        for (let i = 0, y = 0; y < tileSize; y++) {
	            for (let x = 0; x < tileSize; x++, i++) {
	                const k = i * 4;
	                const r = imageData[k + 0];
	                const g = imageData[k + 1];
	                const b = imageData[k + 2];
	                terrain[i + y] = r * rScaler + g * gScaler + b * bScaler + offset;
	            }
	        }
	        for (let i = gridSize * (gridSize - 1), x = 0; x < gridSize - 1; x++, i++) {
	            terrain[i] = terrain[i - gridSize];
	        }
	        for (let i = gridSize - 1, y = 0; y < gridSize; y++, i += gridSize) {
	            terrain[i] = terrain[i - 1];
	        }
	        return terrain;
	    }
	    static getMeshAttributes(vertices, terrain, tileSize, bounds, exageration) {
	        const gridSize = tileSize + 1;
	        const numOfVerticies = vertices.length / 2;
	        const positions = new Float32Array(numOfVerticies * 3);
	        const texCoords = new Float32Array(numOfVerticies * 2);
	        const [minX, minY, maxX, maxY] = bounds || [0, 0, tileSize, tileSize];
	        const xScale = (maxX - minX) / tileSize;
	        const yScale = (maxY - minY) / tileSize;
	        for (let i = 0; i < numOfVerticies; i++) {
	            const x = vertices[i * 2];
	            const y = vertices[i * 2 + 1];
	            const pixelIdx = y * gridSize + x;
	            positions[3 * i + 0] = x * xScale + minX;
	            positions[3 * i + 1] = -terrain[pixelIdx] * exageration;
	            positions[3 * i + 2] = -y * yScale + maxY;
	            texCoords[2 * i + 0] = x / tileSize;
	            texCoords[2 * i + 1] = y / tileSize;
	        }
	        return {
	            position: { value: positions, size: 3 },
	            uv: { value: texCoords, size: 2 }
	        };
	    }
	    processHeight(image) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const tileSize = image.width;
	            const gridSize = tileSize + 1;
	            var canvas = CanvasUtils.createOffscreenCanvas(tileSize, tileSize);
	            var context = canvas.getContext('2d');
	            context.imageSmoothingEnabled = false;
	            context.drawImage(image, 0, 0, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
	            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	            var data = imageData.data;
	            const terrain = MapMartiniHeightNode.getTerrain(data, tileSize, this.elevationDecoder);
	            const martini = new Martini(gridSize);
	            const tile = martini.createTile(terrain);
	            const { vertices, triangles } = tile.getMesh(typeof this.meshMaxError === 'function' ? this.meshMaxError(this.level) : this.meshMaxError);
	            const attributes = MapMartiniHeightNode.getMeshAttributes(vertices, terrain, tileSize, [-0.5, -0.5, 0.5, 0.5], this.exageration);
	            this.geometry = new BufferGeometry();
	            this.geometry.setIndex(new Uint32BufferAttribute(triangles, 1));
	            this.geometry.setAttribute('position', new Float32BufferAttribute(attributes.position.value, attributes.position.size));
	            this.geometry.setAttribute('uv', new Float32BufferAttribute(attributes.uv.value, attributes.uv.size));
	            this.geometry.rotateX(Math.PI);
	            var texture = new Texture(image);
	            texture.generateMipmaps = false;
	            texture.format = RGBAFormat;
	            texture.magFilter = NearestFilter;
	            texture.minFilter = NearestFilter;
	            texture.needsUpdate = true;
	            this.material.userData.heightMap.value = texture;
	            this.material.map = texture;
	            this.material.needsUpdate = true;
	        });
	    }
	    loadHeightGeometry() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.mapView.heightProvider === null) {
	                throw new Error('GeoThree: MapView.heightProvider provider is null.');
	            }
	            const image = yield this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
	            if (this.disposed) {
	                return;
	            }
	            this.processHeight(image);
	            this.heightLoaded = true;
	            this.nodeReady();
	        });
	    }
	}
	MapMartiniHeightNode.geometrySize = 16;
	MapMartiniHeightNode.emptyTexture = new Texture();
	MapMartiniHeightNode.geometry = new MapNodeGeometry(1, 1, 1, 1);
	MapMartiniHeightNode.tileSize = 256;

	class MapView extends Mesh {
	    constructor(root = MapView.PLANAR, provider = new OpenStreetMapsProvider(), heightProvider = null) {
	        super(undefined, new MeshBasicMaterial({ transparent: true, opacity: 0.0, depthWrite: false, colorWrite: false }));
	        this.lod = null;
	        this.provider = null;
	        this.heightProvider = null;
	        this.root = null;
	        this.cacheTiles = false;
	        this.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
	            this.lod.updateLOD(this, camera, renderer, scene);
	        };
	        this.lod = new LODRaycast();
	        this.provider = provider;
	        this.heightProvider = heightProvider;
	        this.setRoot(root);
	        this.preSubdivide();
	    }
	    setRoot(root) {
	        if (typeof root === 'number') {
	            if (!MapView.mapModes.has(root)) {
	                throw new Error('Map mode ' + root + ' does is not registered.');
	            }
	            const rootConstructor = MapView.mapModes.get(root);
	            root = new rootConstructor(null, this);
	        }
	        if (this.root !== null) {
	            this.remove(this.root);
	            this.root = null;
	        }
	        this.root = root;
	        if (this.root !== null) {
	            this.geometry = this.root.constructor.baseGeometry;
	            this.scale.copy(this.root.constructor.baseScale);
	            this.root.mapView = this;
	            this.add(this.root);
	            this.root.initialize();
	        }
	    }
	    preSubdivide() {
	        var _a, _b;
	        function subdivide(node, depth) {
	            if (depth <= 0) {
	                return;
	            }
	            node.subdivide();
	            for (let i = 0; i < node.children.length; i++) {
	                if (node.children[i] instanceof MapNode) {
	                    const child = node.children[i];
	                    subdivide(child, depth - 1);
	                }
	            }
	        }
	        const minZoom = Math.max(this.provider.minZoom, (_b = (_a = this.heightProvider) === null || _a === void 0 ? void 0 : _a.minZoom) !== null && _b !== void 0 ? _b : -Infinity);
	        if (minZoom > 0) {
	            subdivide(this.root, minZoom);
	        }
	    }
	    setProvider(provider) {
	        if (provider !== this.provider) {
	            this.provider = provider;
	            this.clear();
	        }
	    }
	    setHeightProvider(heightProvider) {
	        if (heightProvider !== this.heightProvider) {
	            this.heightProvider = heightProvider;
	            this.clear();
	        }
	    }
	    clear() {
	        this.traverse(function (children) {
	            if (children.childrenCache) {
	                children.childrenCache = null;
	            }
	            if (children.initialize) {
	                children.initialize();
	            }
	        });
	        return this;
	    }
	    minZoom() {
	        var _a, _b;
	        return Math.max(this.provider.minZoom, (_b = (_a = this.heightProvider) === null || _a === void 0 ? void 0 : _a.minZoom) !== null && _b !== void 0 ? _b : -Infinity);
	    }
	    maxZoom() {
	        var _a, _b;
	        return Math.min(this.provider.maxZoom, (_b = (_a = this.heightProvider) === null || _a === void 0 ? void 0 : _a.maxZoom) !== null && _b !== void 0 ? _b : Infinity);
	    }
	    getMetaData() {
	        this.provider.getMetaData();
	    }
	    raycast(raycaster, intersects) {
	        return false;
	    }
	}
	MapView.PLANAR = 200;
	MapView.SPHERICAL = 201;
	MapView.HEIGHT = 202;
	MapView.HEIGHT_SHADER = 203;
	MapView.MARTINI = 204;
	MapView.mapModes = new Map([
	    [MapView.PLANAR, MapPlaneNode],
	    [MapView.SPHERICAL, MapSphereNode],
	    [MapView.HEIGHT, MapHeightNode],
	    [MapView.HEIGHT_SHADER, MapHeightNodeShader],
	    [MapView.MARTINI, MapMartiniHeightNode]
	]);

	new Vector3();
	new Vector3();

	new Matrix4();
	new Vector3();
	new Frustum();
	new Vector3();

	class XHRUtils {
	    static get(url) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise(function (resolve, reject) {
	                const xhr = new XMLHttpRequest();
	                xhr.overrideMimeType('text/plain');
	                xhr.open('GET', url, true);
	                xhr.onload = function () {
	                    resolve(xhr.response);
	                };
	                xhr.onerror = reject;
	                xhr.send(null);
	            });
	        });
	    }
	    static getRaw(url) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.responseType = 'arraybuffer';
	                xhr.open('GET', url, true);
	                xhr.onload = function () {
	                    resolve(xhr.response);
	                };
	                xhr.onerror = reject;
	                xhr.send(null);
	            });
	        });
	    }
	    static request(url, type, header, body, onLoad, onError, onProgress) {
	        function parseResponse(response) {
	            try {
	                return JSON.parse(response);
	            }
	            catch (e) {
	                return response;
	            }
	        }
	        const xhr = new XMLHttpRequest();
	        xhr.overrideMimeType('text/plain');
	        xhr.open(type, url, true);
	        if (header !== null && header !== undefined) {
	            for (const i in header) {
	                xhr.setRequestHeader(i, header[i]);
	            }
	        }
	        if (onLoad !== undefined) {
	            xhr.onload = function (event) {
	                onLoad(parseResponse(xhr.response), xhr);
	            };
	        }
	        if (onError !== undefined) {
	            xhr.onerror = onError;
	        }
	        if (onProgress !== undefined) {
	            xhr.onprogress = onProgress;
	        }
	        xhr.send(body !== undefined ? body : null);
	        return xhr;
	    }
	}

	class BingMapsProvider extends MapProvider {
	    constructor(apiKey = '', type = BingMapsProvider.AERIAL) {
	        super();
	        this.maxZoom = 19;
	        this.minZoom = 1;
	        this.format = 'jpeg';
	        this.mapSize = 512;
	        this.subdomain = 't1';
	        this.meta = null;
	        this.apiKey = apiKey;
	        this.type = type;
	    }
	    getMetaData() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const address = BingMapsProvider.ADDRESS + '/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key=' + this.apiKey;
	            const data = yield XHRUtils.get(address);
	            this.meta = JSON.parse(data);
	        });
	    }
	    static quadKey(zoom, x, y) {
	        let quad = '';
	        for (let i = zoom; i > 0; i--) {
	            const mask = 1 << i - 1;
	            let cell = 0;
	            if ((x & mask) !== 0) {
	                cell++;
	            }
	            if ((y & mask) !== 0) {
	                cell += 2;
	            }
	            quad += cell;
	        }
	        return quad;
	    }
	    fetchTile(zoom, x, y) {
	        return new Promise((resolve, reject) => {
	            const image = document.createElement('img');
	            image.onload = function () {
	                resolve(image);
	            };
	            image.onerror = function () {
	                reject();
	            };
	            image.crossOrigin = 'Anonymous';
	            image.src = 'http://ecn.' + this.subdomain + '.tiles.virtualearth.net/tiles/' + this.type + BingMapsProvider.quadKey(zoom, x, y) + '.jpeg?g=1173';
	        });
	    }
	}
	BingMapsProvider.ADDRESS = 'https://dev.virtualearth.net';
	BingMapsProvider.AERIAL = 'a';
	BingMapsProvider.ROAD = 'r';
	BingMapsProvider.AERIAL_LABELS = 'h';
	BingMapsProvider.OBLIQUE = 'o';
	BingMapsProvider.OBLIQUE_LABELS = 'b';

	class HereMapsProvider extends MapProvider {
	    constructor(appId = '', appCode = '', style = 'base', scheme = 'normal.day', format = 'png', size = 512) {
	        super();
	        this.appId = appId;
	        this.appCode = appCode;
	        this.style = style;
	        this.scheme = scheme;
	        this.format = format;
	        this.size = size;
	        this.version = 'newest';
	        this.server = 1;
	    }
	    nextServer() {
	        this.server = this.server % 4 === 0 ? 1 : this.server + 1;
	    }
	    getMetaData() {
	        return __awaiter(this, void 0, void 0, function* () { });
	    }
	    fetchTile(zoom, x, y) {
	        this.nextServer();
	        return new Promise((resolve, reject) => {
	            const image = document.createElement('img');
	            image.onload = function () {
	                resolve(image);
	            };
	            image.onerror = function () {
	                reject();
	            };
	            image.crossOrigin = 'Anonymous';
	            image.src = 'https://' + this.server + '.' + this.style + '.maps.api.here.com/maptile/2.1/maptile/' +
	                this.version + '/' + this.scheme + '/' + zoom + '/' + x + '/' + y + '/' +
	                this.size + '/' + this.format + '?app_id=' + this.appId + '&app_code=' + this.appCode;
	        });
	    }
	}
	HereMapsProvider.PATH = '/maptile/2.1/';

	class MapBoxProvider extends MapProvider {
	    constructor(apiToken = '', id = '', mode = MapBoxProvider.STYLE, format = 'png', useHDPI = false, version = 'v4') {
	        super();
	        this.apiToken = apiToken;
	        this.format = format;
	        this.useHDPI = useHDPI;
	        this.mode = mode;
	        this.mapId = id;
	        this.style = id;
	        this.version = version;
	    }
	    getMetaData() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const address = MapBoxProvider.ADDRESS + this.version + '/' + this.mapId + '.json?access_token=' + this.apiToken;
	            const data = yield XHRUtils.get(address);
	            const meta = JSON.parse(data);
	            this.name = meta.name;
	            this.minZoom = meta.minZoom;
	            this.maxZoom = meta.maxZoom;
	            this.bounds = meta.bounds;
	            this.center = meta.center;
	        });
	    }
	    fetchTile(zoom, x, y) {
	        return new Promise((resolve, reject) => {
	            const image = document.createElement('img');
	            image.onload = function () {
	                resolve(image);
	            };
	            image.onerror = function () {
	                reject();
	            };
	            image.crossOrigin = 'Anonymous';
	            if (this.mode === MapBoxProvider.STYLE) {
	                image.src = MapBoxProvider.ADDRESS + 'styles/v1/' + this.style + '/tiles/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x?access_token=' : '?access_token=') + this.apiToken;
	            }
	            else {
	                image.src = MapBoxProvider.ADDRESS + 'v4/' + this.mapId + '/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x.' : '.') + this.format + '?access_token=' + this.apiToken;
	            }
	        });
	    }
	}
	MapBoxProvider.ADDRESS = 'https://api.mapbox.com/';
	MapBoxProvider.STYLE = 100;
	MapBoxProvider.MAP_ID = 101;

	var canvas = document.getElementById('canvas');
	const SPHERE = 0;
	const PLANE = 1;
	const scenes = [createWorldScene(), createMapScene()];
	let active = SPHERE;
	let renderer = new WebGLRenderer({
	    canvas: canvas,
	    antialias: true
	});
	function createWorldScene() {
	    var scene = new Scene();
	    scene.background = new Color(0x000000, LinearSRGBColorSpace);
	    var loader = new TextureLoader();
	    loader.load('2k_earth_daymap.jpg', function (texture) {
	        if (parseInt(REVISION) >= 152) {
	            texture.colorSpace = 'srgb';
	        }
	        var sphere = new Mesh(new SphereGeometry(UnitsUtils.EARTH_RADIUS, 256, 256), new MeshBasicMaterial({ map: texture }));
	        scene.add(sphere);
	    });
	    var camera = new PerspectiveCamera(60, 1, 0.01, 1e8);
	    var controls = new MapControls(camera, canvas);
	    controls.minDistance = UnitsUtils.EARTH_RADIUS + 3e4;
	    controls.maxDistance = UnitsUtils.EARTH_RADIUS * 1e1;
	    controls.enablePan = false;
	    controls.zoomSpeed = 0.7;
	    controls.rotateSpeed = 0.3;
	    controls.mouseButtons = {
	        LEFT: MOUSE.ROTATE,
	        MIDDLE: MOUSE.DOLLY,
	        RIGHT: MOUSE.PAN
	    };
	    camera.position.set(0, 0, UnitsUtils.EARTH_RADIUS + 1e7);
	    return { camera: camera, controls: controls, scene: scene };
	}
	function createMapScene() {
	    var camera = new PerspectiveCamera(60, 1, 0.01, 1e12);
	    var controls = new MapControls(camera, canvas);
	    controls.minDistance = 1.0;
	    controls.zoomSpeed = 1.0;
	    var scene = new Scene();
	    scene.background = new Color(0x444444, LinearSRGBColorSpace);
	    var provider = new BingMapsProvider('', BingMapsProvider.AERIAL);
	    var map = new MapView(MapView.PLANAR, provider);
	    scene.add(map);
	    map.updateMatrixWorld(true);
	    scene.add(new AmbientLight(0x777777, LinearSRGBColorSpace));
	    return { camera: camera, controls: controls, scene: scene };
	}
	var raycaster = new Raycaster();
	document.body.onresize = function () {
	    var width = window.innerWidth;
	    var height = window.innerHeight;
	    renderer.setSize(width, height);
	    for (let i = 0; i < scenes.length; i++) {
	        const s = scenes[i];
	        s.camera.aspect = width / height;
	        s.camera.updateProjectionMatrix();
	    }
	};
	document.body.onresize();
	function animate() {
	    requestAnimationFrame(animate);
	    const s = scenes[active];
	    s.controls.update();
	    renderer.render(s.scene, s.camera);
	    const toggleDistance = 2e6;
	    if (active === SPHERE) {
	        const distance = s.controls.getDistance() - UnitsUtils.EARTH_RADIUS;
	        if (distance < toggleDistance) {
	            const pointer = new Vector2(0.0, 0.0);
	            raycaster.setFromCamera(pointer, s.camera);
	            const intersects = raycaster.intersectObjects(s.scene.children);
	            if (intersects.length > 0) {
	                const point = intersects[0].point;
	                const pos = UnitsUtils.vectorToDatums(point);
	                const planeScene = scenes[PLANE];
	                var coords = UnitsUtils.datumsToSpherical(pos.latitude, pos.longitude);
	                planeScene.controls.target.set(coords.x, 0, -coords.y);
	                planeScene.camera.position.set(coords.x, distance, -coords.y);
	                console.log('Geo-Three: Switched scene from sphere to plane.', point, pos, coords);
	                active = PLANE;
	            }
	        }
	    }
	    else if (active === PLANE) {
	        const distance = s.controls.getDistance();
	        s.controls.minPolarAngle = 0;
	        s.controls.maxPolarAngle = Math.PI / 2;
	        s.controls.minAzimuthAngle = -Math.PI;
	        s.controls.maxAzimuthAngle = Math.PI;
	        const ratio = 0.4;
	        if (distance > toggleDistance * ratio) {
	            const progress = (toggleDistance - distance) / (toggleDistance * (1 - ratio));
	            s.controls.maxPolarAngle = progress * Math.PI / 2;
	            s.controls.minAzimuthAngle = progress * -Math.PI;
	            s.controls.maxAzimuthAngle = progress * Math.PI;
	        }
	        if (distance > toggleDistance) {
	            const target = s.controls.target;
	            const coords = UnitsUtils.sphericalToDatums(target.x, -target.z);
	            const dir = UnitsUtils.datumsToVector(coords.latitude, coords.longitude);
	            const sphereScene = scenes[SPHERE];
	            dir.multiplyScalar(UnitsUtils.EARTH_RADIUS + distance);
	            sphereScene.camera.position.copy(dir);
	            console.log('Geo-Three: Switched scene from plane to sphere.', s.controls, coords, dir);
	            active = SPHERE;
	        }
	    }
	}
	animate();

})();
