type UnaryOperator = "isNone" | "isNotNone";
type BinaryOperator = "eqTo" | "notEqualTo" | "isLessThan" | "isGreaterThan";
type GroupOperator = "and" | "or";

// interface that define the operation structure 
//Operation: {
// "operator": <UnaryOperator>
// }
// OR {
// "operator": <BinaryOperator>
// "operand": Any
// }
// OR {
// "operator": <GroupOperator>
// "operations": list[<Operation>]
// }
// the value of the operator could be UnaryOperator , BinaryOperator , GroupOperator

export interface Operation {
  operator: UnaryOperator | BinaryOperator | GroupOperator;
  operand?: any;
  operations?: Operation[];

}
// interface that define the Predicate object , contain feature and operation of type Operation
// Predicate: {
//   "feature": <string>
//   "operation": <Operation>
//   }

export interface PredicateObj {
  feature: string;
  operation: Operation;
}

