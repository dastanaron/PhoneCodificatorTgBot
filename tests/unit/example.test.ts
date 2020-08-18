describe('Example tests', () => {
    let integer = 1;
    let booleanValue = true;
    test('example test', () => {
            expect(integer).toBe(1);
            expect(booleanValue).toBeTruthy();
    });
});
