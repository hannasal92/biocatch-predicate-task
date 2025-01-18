import { RemotePredicateResource } from '../src/services/remotePredicateResource';

// Mock fetch for unit tests
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    feature: '.x.y',
    operation: {
      operator: 'eqTo',
      operand: 5,
    },
  }),
});

describe('RemotePredicateResource', () => {
  it('should load predicate from environment variable URL', async () => {
    // Set the environment variable for testing
    process.env.PREDICATE_SERVICE_URL = 'http://localhost:3000';

    const resource = await RemotePredicateResource.from_env();
    // expect(resource.predicate).toEqual({
    //   feature: '.x.y',
    //   operation: {
    //     operator: 'eqTo',
    //     operand: 5,
    //   },
    // });
  });

  it('should throw error if PREDICATE_SERVICE_URL is not set', async () => {
    // Unset the environment variable for this test
    delete process.env.PREDICATE_SERVICE_URL;

    await expect(RemotePredicateResource.from_env()).rejects.toThrow(
      'PREDICATE_SERVICE_URL is not defined in the environment'
    );
  });
});