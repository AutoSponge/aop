var _part_ = require( "part" );

var aop = {
    // identity
    // -----

    // returns the value of the first argument
    identity: function identity( id ) {

        return id;

    },

    augment: _part_.augment,

    borrow: _part_.borrow
};

aop.augment( "borrow", aop.borrow );

aop.borrow( Function.prototype, "apply" );

aop.borrow( Function.prototype, "call" );

// log, warn, and error
// --------------------

// see console api

["log", "warn", "error"].map( function ( name ) {
    aop[ name ] = aop._call( console[ name ], console );
} );

// \_after and after\_
// -------------------

// `_after` takes a function which will become the pointcut of the aspect
//  and returns a function which takes an array of *after* advices.

// `after_` takes an array of *after* advices and returns a function
// which takes a function that will become the pointcut of the aspect.

// *after* advices receive the following parameters:
// 1. pointcut's return value
// 1. index value of the advice (identity is always 0)
// 1. array of after advices

// Example:

// ```
// var add = function ( a, b ) { return a + b; }
// add = aop._after( add )( [aop.log] );
// add( 1, 2 );
// ```

// ```
// var add = function ( a, b ) { return a + b; }
// var log = aop.after_( [aop.log] );
// add = log( add );
// add( 1, 2 );
// ```
aop.augment( "after", function ( advices ) {

    var pointCut = aop._apply( this ),

        joinPoints = [ aop.identity ].concat( advices );

    return function () {

        return joinPoints.map( aop.call_( this, pointCut( this, arguments ) ) )[ 0 ];

    };
} );

// \_before and before\_
// ---------------------

// `_before` takes a function which will become the pointcut of the aspect
//  and returns a function which takes an array of *before* advices.

// `before_` takes an array of *before* advices and returns a function
// which takes a function that will become the pointcut of the aspect

// *before* advices receive the arguments as parameters

// Example:

// ```
// var add = function ( a, b ) { return a + b; }
// add = aop._before( add )( [aop.log] );
// add( 1, 2 );
// ```

// ```
// var add = function ( a, b ) { return a + b; }
// var log = aop.before_( [aop.log] );
// add = log( add );
// add( 1, 2 );
// ```
aop.augment( "before", function ( advices ) {

    var joinPoints = advices.concat( this );

    return function () {

        return joinPoints.map( aop.apply_( this, arguments ) )[ advices.length ];

    };
} );

// \_around and around\_
// ---------------------

// `_around` takes a function which will become the pointcut of the aspect
//  and returns a function which takes two arrays of *before* and *after* advices.

// `around_` takes two arrays of *before* and *after* advices and returns a function
// which takes a function that will become the pointcut of the aspect.

// Example:

// ```
// var add = function ( a, b ) { return a + b; }
// add = aop._around( add )( [aop.log], [aop.log] );
// add( 1, 2 );
// ```

// ```
// var add = function ( a, b ) { return a + b; }
// var log = aop.around_( [aop.log], [aop.log] );
// add = log( add );
// add( 1, 2 );
// ```
aop.augment( "around", function ( before, after ) {

    var aspect = aop._apply( aop.before_( before )( this ) ),

        joinPoints = [ aop.identity ].concat( after );

    return function () {

        return joinPoints.map( aop.call_( this, aspect( this, arguments ) ) )[ 0 ];

    };
} );

module.exports = aop;