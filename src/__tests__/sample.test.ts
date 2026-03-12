// describe: grouper les tests
describe('Configuration Jest', () => {
    // test: définir un test
  test('devrait additionner correctement', () => {
    expect(1 + 1).toBe(2);
  });


  test('devrait gérer les chaînes', () => {
    const message = 'Hello Jest';
    expect(message).toContain('Jest');
  });
});