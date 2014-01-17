var aop = require( "../lib/aop" );

function add(a, b) {
    return a + b;
}

exports["aop has the correct interface"] = function ( test ) {

    test.expect( 9 );

    [
        "before_",
        "_before",
        "after_",
        "_after",
        "around_",
        "_around",
        "log",
        "warn",
        "error"

    ].forEach(function methodTest( name ) {

            test.ok( typeof aop[name] === "function", name + " should be a function" );

        });

    test.done();

};

exports["aop.before_ executes advices in the correct order"] = function ( test ) {

    var that = {};
    var caughtArgs = false;
    var caughtThis = false;
    var order = [];

    function catchArgs() {
        caughtArgs = arguments;
        order.push("catchArgs");
    }

    function catchThis() {
        caughtThis = this;
        order.push("catchThis");
    }

    test.expect(8);

    test.ok( caughtArgs === false );
    test.ok( caughtThis === false );
    test.ok( order.length === 0 );

    that.add = aop.before_( [catchArgs, catchThis] )( add );
    that.add(1, 2);

    test.ok( caughtArgs[0] === 1 );
    test.ok( caughtArgs[1] === 2 );
    test.ok( caughtThis === that );
    test.ok( order[0] === "catchArgs" );
    test.ok( order[1] === "catchThis" );

    test.done();
};

exports["aop._before executes advices in the correct order"] = function ( test ) {

    var that = {};
    var caughtArgs = false;
    var caughtThis = false;
    var order = [];

    function catchArgs() {
        caughtArgs = arguments;
        order.push("catchArgs");
    }

    function catchThis() {
        caughtThis = this;
        order.push("catchThis");
    }

    test.expect(8);

    test.ok( caughtArgs === false );
    test.ok( caughtThis === false );
    test.ok( order.length === 0 );

    that.add = aop._before( add )( [catchArgs, catchThis] );
    that.add(1, 2);

    test.ok( caughtArgs[0] === 1 );
    test.ok( caughtArgs[1] === 2 );
    test.ok( caughtThis === that );
    test.ok( order[0] === "catchArgs" );
    test.ok( order[1] === "catchThis" );

    test.done();
};

exports["aop.after_ executes advices in the correct order"] = function ( test ) {

    var that = {};
    var caughtArgs = false;
    var caughtThis = false;
    var order = [];

    function catchArgs() {
        caughtArgs = arguments;
        order.push("catchArgs");
    }

    function catchThis() {
        caughtThis = this;
        order.push("catchThis");
    }

    test.expect(9);

    test.ok( caughtArgs === false );
    test.ok( caughtThis === false );
    test.ok( order.length === 0 );

    that.add = aop.after_( [catchArgs, catchThis] )( add );
    that.add(1, 2);

    test.ok( caughtArgs[0] === 3 );
    test.ok( caughtArgs[1] === 1 );
    test.ok( caughtArgs[2].length === 3 );
    test.ok( caughtThis === that );
    test.ok( order[0] === "catchArgs" );
    test.ok( order[1] === "catchThis" );

    test.done();
};

exports["aop._after executes advices in the correct order"] = function ( test ) {

    var that = {};
    var caughtArgs = false;
    var caughtThis = false;
    var order = [];

    function catchArgs() {
        caughtArgs = arguments;
        order.push("catchArgs");
    }

    function catchThis() {
        caughtThis = this;
        order.push("catchThis");
    }

    test.expect(9);

    test.ok( caughtArgs === false );
    test.ok( caughtThis === false );
    test.ok( order.length === 0 );

    that.add = aop._after( add )( [catchArgs, catchThis] );
    that.add(1, 2);

    test.ok( caughtArgs[0] === 3 );
    test.ok( caughtArgs[1] === 1 );
    test.ok( caughtArgs[2].length === 3 );
    test.ok( caughtThis === that );
    test.ok( order[0] === "catchArgs" );
    test.ok( order[1] === "catchThis" );

    test.done();
};

exports["aop.around_ executes advices in the correct order"] = function ( test ) {

    var that = {};
    var beforeArgs = false;
    var afterArgs = false;
    var order = [];

    function catchBeforeArgs() {
        beforeArgs = arguments;
        order.push("catchBeforeArgs");
    }

    function catchAfterArgs() {
        afterArgs = arguments;
        order.push("catchAfterArgs");
    }

    test.expect(9);

    test.ok( beforeArgs === false );
    test.ok( afterArgs === false );
    test.ok( order.length === 0 );

    that.add = aop._around( add )( [catchBeforeArgs], [catchAfterArgs] );
    that.add(1, 2);

    test.ok( beforeArgs[0] === 1 );
    test.ok( beforeArgs[1] === 2 );
    test.ok( afterArgs[0] === 3 );
    test.ok( afterArgs[1] === 1 );
    test.ok( order[0] === "catchBeforeArgs" );
    test.ok( order[1] === "catchAfterArgs" );

    test.done();
};

exports["aop._around executes advices in the correct order"] = function ( test ) {

    var that = {};
    var beforeArgs = false;
    var afterArgs = false;
    var order = [];

    function catchBeforeArgs() {
        beforeArgs = arguments;
        order.push("catchBeforeArgs");
    }

    function catchAfterArgs() {
        afterArgs = arguments;
        order.push("catchAfterArgs");
    }

    test.expect(9);

    test.ok( beforeArgs === false );
    test.ok( afterArgs === false );
    test.ok( order.length === 0 );

    that.add = aop.around_( [catchBeforeArgs], [catchAfterArgs] )( add );
    that.add(1, 2);

    test.ok( beforeArgs[0] === 1 );
    test.ok( beforeArgs[1] === 2 );
    test.ok( afterArgs[0] === 3 );
    test.ok( afterArgs[1] === 1 );
    test.ok( order[0] === "catchBeforeArgs" );
    test.ok( order[1] === "catchAfterArgs" );

    test.done();
};