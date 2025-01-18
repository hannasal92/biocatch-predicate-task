import { Operation, PredicateObj } from "../interfaces/predicateInterfaces";
import  operatorMessages from '../operatorMessages/operatorMessages';
import { responseObj } from '../interfaces/responseInterface';
export class Predicate {
  private feature: string;
  private operation: Operation;

  constructor(feature: string, operation: Operation) {
    this.feature = feature;
    this.operation = operation;
  }

  //a function that can parse a json string and init a predicate
  static buildFromJson(jsonString: string): Predicate {
    try {
      const parsed = JSON.parse(jsonString) as PredicateObj;
  
      //check if the parsed object contains feature and operation
      if (!parsed.feature || !parsed.operation) {
        throw new Error("Missing 'feature' or 'operation'.");
      }
      return new Predicate(parsed.feature, parsed.operation);
    } catch (error:any) {
      console.error("Invalid json input:", error);
      throw new Error(`Invalid json input: ${error.message}`);
    }
  }
  evaluate(root: any): responseObj {
    try {
      const value = this.extractFeatureValue(root, this.feature);
  
      return this.evaluateOperation(value, this.operation);
    } catch (error : any) {

      console.error("Evaluation failed:", error);

      return {
        result: false,
        message: `Evaluation failed: ${error.message}`,
      };
    }
  }

  private extractFeatureValue(root: any, feature: string): any {

    //if the attirbute is empty means to test the root directly
    if (!feature) {
      return root;
    }
    
    //.filter(Boolean) step removes any “falsy” values i used it because when split by dot (.) the first value in the array empty string
    const attributes = feature.split(".").filter(Boolean);
  
    let current = root;
    for (const attr of attributes) {

      const validAttributePattern = /^[A-Za-z][A-Za-z0-9_]*$/;
      if (!validAttributePattern.test(attr)) {
        console.warn(`invalid attribute`);
        throw new Error("invalid attribute'.");
      }

      if (current == null) {
        console.warn(`current is null.`);
        return undefined;
      }
  
      if (!(attr in current)) {
        console.warn(`'${attr}' does not exist in the current object.`);
        return undefined;
      }
  
      current = current[attr];
    }
  
    return current;
  }

  private evaluateOperation(value: any, operation: Operation): responseObj {
    const { operator, operand, operations } = operation;
  
    // so i added the result boolean to return if the evalute pass or failed , and i added a message to explain why
    const buildResult = (result: boolean, message: string): responseObj => {
      // log the message if the result is false
      if(!result){
        console.warn(message);
      }
      return { result, message };
    };
    
    switch (operator) {
      case "isNone":
        return value === null || value === undefined
          ? buildResult(true, operatorMessages.IS_NONE_SUCCESS)
          : buildResult(false, operatorMessages.IS_NONE_FAIL);
  
      case "isNotNone":
        return value !== null && value !== undefined
          ? buildResult(true, operatorMessages.IS_NOT_NONE_SUCCESS)
          : buildResult(false, operatorMessages.IS_NOT_NONE_FAIL);
  
      case "eqTo":
        return value === operand
          ? buildResult(true, operatorMessages.EQUAL_SUCCESS)
          : buildResult(false, operatorMessages.EQUAL_FAIL);
  
      case "notEqualTo":
        return value !== operand
          ? buildResult(true, operatorMessages.NOT_EQUAL_SUCCESS)
          : buildResult(false, operatorMessages.NOT_EQUAL_FAIL);
  
      case "isLessThan":
        return value < operand
          ? buildResult(true, operatorMessages.IS_LESS_THAN_SUCCESS)
          : buildResult(false, operatorMessages.IS_LESS_THAN_FAIL);
  
      case "isGreaterThan":
        return value > operand
          ? buildResult(true, operatorMessages.IS_GREATER_THAN_SUCCESS)
          : buildResult(false, operatorMessages.IS_GREATER_THAN_FAIL);
  
      case "and":
        //The .every() method is a JavaScript array method that checks if every element in the array satisfies the provided condition 
        //The ?. syntax is called optional chaining. It ensures that if operations is null or undefined, the code will not throw an error. 
        const andResult =
          operations?.every((op) => this.evaluateOperation(value, op).result) ?? false;
        return andResult
          ? buildResult(true, operatorMessages.AND_SUCCESS)
          : buildResult(false, operatorMessages.AND_FAIL);
  
      case "or":
        //.some() method is a JavaScript array method that checks if any element in the array satisfies the provided condition
        //The ?. syntax is called optional chaining. It ensures that if operations is null or undefined, the code will not throw an error. 
        const orResult =
          operations?.some((op) => this.evaluateOperation(value, op).result) ?? false;
        return orResult
          ? buildResult(true, operatorMessages.OR_SUCCESS)
          : buildResult(false, operatorMessages.OR_FAIL);
  
      default:
        throw new Error(`operator not supported: ${operator}`);
    }
  }
}