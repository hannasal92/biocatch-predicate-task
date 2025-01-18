import axios from "axios";
import { Predicate } from "../models/predicate";

export class RemotePredicateResource {
  private predicateInstance: Predicate | null = null;
  private etag: string | null = null;

  private constructor() {}

  static async from_env(): Promise<RemotePredicateResource> {
    const url = process.env.PREDICATE_SERVICE_URL;
    if (!url) throw new Error("PREDICATE_SERVICE_URL is not defined in the environment");

    const resource = new RemotePredicateResource();
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
      }
    } catch (e) {
      console.error("Failed to fetch predicate:", e);
    }
  }

  private startFetchingEveryTwoMins(url: string): void {
    setInterval(() => this.updatePredicate(url), 120000); // 2 minutes
  }
}