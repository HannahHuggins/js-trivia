require('./game.js');

describe("The test environment", function() {
    it("should pass", function() {
        expect(true).toBe(true);
    });

    it("should access game", function() {
        expect(true).toBeDefined();
    });
});

describe("Your specs...", function() {
    // it ...
});