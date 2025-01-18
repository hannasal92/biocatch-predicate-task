import axios from "axios";
import { Predicate } from "../models/predicate";
export class RemotePredicateResource {
  //so i use here singltone pattern so we can access the same instane of predicate , with private contructore and get method to get the same predicate 
  private predicateInstance: Predicate | null = null;
  private etag: string | null = null;

  private constructor() {}

  static async from_env(): Promise<RemotePredicateResource> {
    // if there is no url in env throw an error
    const url = process.env.PREDICATE_SERVICE_URL;
    if (!url) throw new Error("PREDICATE_SERVICE_URL is not defined in the environment");

    const resource = new RemotePredicateResource();
    // send get request and parse the json and init predicate with feature and operation
    await resource.updatePredicate(url);
    resource.startFetchingEveryTwoMins(url);
    return resource;
  }

  get predicate(): Predicate | null {
    return this.predicateInstance;
  }

  private async updatePredicate(url: string): Promise<void> {
    try {
      const response = await axios.get(`${url}/api/v1/predicate`, {
        headers: this.etag ? { "If-None-Match": this.etag } : {},
      });

      if (response.status === 200) {
        this.etag = response.headers.etag || null;
        this.predicateInstance = Predicate.parseJsonToPredicate(response.data);
        
      }else {
        console.error(`Failed to fetch predicate status code: ${response.status}`);
      }
    } catch (e) {
      console.error("Failed to fetch predicate:", e);
    }
  }

  private startFetchingEveryTwoMins(url: string): void {
    //setInterval to run the code every two mins to fetch the data again
    setInterval(() => this.updatePredicate(url), 120000); // 2 minutes
  }
}