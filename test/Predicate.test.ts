import { Predicate } from '../src/models/predicate';

describe('Predicate', () => {
  it('should test "eqTo" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'eqTo', operand: 5 });
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "eqTo" correctly with calling the parseJsonToPredicate function', () => {
    const jsonString = "{\"feature\": \".x.y\", \"operation\": {\"operator\": \"eqTo\", \"operand\": 5}}";
    const predicate = Predicate.parseJsonToPredicate(jsonString);
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });

  it('should test "eqTo" false feature does not exist in the current object', () => {
    const predicate = new Predicate('.x.y', { operator: 'eqTo', operand: 5 });
    const root = { x: { z: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });
  it('should test "eqTo" correctly', () => {
    const predicate = new Predicate('.user.name', { operator: 'eqTo', operand: 'bob' });
    const root = { user: { name: 'bob' } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "eqTo" ,should return false feature is missing', () => {
    const predicate = new Predicate('_', { operator: 'eqTo', operand: 'bob' });
    const root = { user: { name: 'bob' } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });
  it('should test "eqTo" ,empty attribute', () => {
    const predicate = new Predicate('', { operator: 'eqTo', operand: 'bob' });
    const root = 'bob';
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "eqTo" correctly', () => {
    const predicate = new Predicate('.user.level', { operator: 'isLessThan', operand: '3.6' });
    const root = { user: { level: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });
  it('should test "eqTo" should return false because the value not equal to operand', () => {
    const predicate = new Predicate('.x.y', { operator: 'eqTo', operand: 5 });
    const root = { x: { y: 7 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "isNone" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'isNone' });
    const root = { x: { y: undefined } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "isNone" should return false because the value is not none', () => {
    const predicate = new Predicate('.x.y', { operator: 'isNone' });
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "isNotNone" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'isNotNone'});
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "isNotNone" should return false because the value is null or undefined', () => {
    const predicate = new Predicate('.x.y', { operator: 'isNotNone' });
    const root = { x: { y: null } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "isGreaterThan" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'isGreaterThan', operand: 3 });
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "isGreaterThan" should return false because the value smaller than the operand', () => {
    const predicate = new Predicate('.x.y', { operator: 'isGreaterThan', operand: 3 });
    const root = { x: { y: 2 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "isLessThan" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'isLessThan', operand: 7 });
    const root = { x: { y: 6 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "isLessThan" should return false because the value bigger than the operand', () => {
    const predicate = new Predicate('.x.y', { operator: 'isLessThan', operand: 7 });
    const root = { x: { y: 8 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should return false if the feature does not exist', () => {
    const predicate = new Predicate('.x.y.z', { operator: 'eqTo', operand: 5 });
    const root = { x: { y: 3 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "and" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'and',operations: [
      { "operator": "isNotNone" },
      { "operator": "isGreaterThan", "operand": 10 }
    ] });
    const root = { x: { y: 15 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "and" should return false', () => {
    const predicate = new Predicate('.x.y', { operator: 'and',operations: [
      { "operator": "isNotNone" },
      { "operator": "isGreaterThan", "operand": 10 }
    ] });
    const root = { x: { y: 9 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });

  it('should test "or" correctly', () => {
    const predicate = new Predicate('.x.y', { operator: 'or',operations: [
      { "operator": "isNone" },
      { "operator": "eqTo", "operand": 5 }
    ] });
    const root = { x: { y: 5 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(true);
  });
  it('should test "or" should return false', () => {
    const predicate = new Predicate('.x.y', { operator: 'or',operations: [
      { "operator": "isNone" },
      { "operator": "eqTo", "operand": 5 }
    ] });
    const root = { x: { y: 6 } };
    const result = predicate.evaluate(root).result;
    expect(result).toBe(false);
  });
});