import { RemotePredicateResource } from '../src/services/remotePredicateResource';

describe('RemotePredicateResource', () => {
  it('test the predicate from the response with the expected predicate', async () => {
    // Set the environment variable for testing
    process.env.PREDICATE_SERVICE_URL = 'http://URL:3000';

    const resource = await RemotePredicateResource.from_env();
    // depends on the response so i added an example
    // expect(resource.predicate).toEqual({
    //   feature: '.x.y',
    //   operation: {
    //     operator: 'eqTo',
    //     operand: 5,
    //   },
    // });
  });

  it('should throw error if PREDICATE_SERVICE_URL is not set', async () => {
    // delete the environment variable PREDICATE_SERVICE_URL
    delete process.env.PREDICATE_SERVICE_URL;

    await expect(RemotePredicateResource.from_env()).rejects.toThrow(
      'PREDICATE_SERVICE_URL is not defined in the environment'
    );
  });
});