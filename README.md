# Remote Predicate Evaluation API

This project is a Node.js application that allows you to evaluate predicates against given data objects. The predicates are in JSON format and can be evaluated for features using various operations. The project supports a variety of unary, binary, and group operators for testing different conditions.

The project also includes a feature to periodically fetch and update the predicate from a remote service, allowing for dynamic updates of the predicates.

## Features

- **Predicate Parsing:** Parse and evaluate predicates from JSON format.
- **Supported Operations:** Includes operators like `eqTo`, `isNone`, `isNotNone`, `isLessThan`, `isGreaterThan`, `and`, and `or`.
- **Remote Predicate Fetching:** Periodically fetch predicates from a remote service and update them in real-time with a 2-minute delay.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   git clone https://github.com/hannasal92/biocatch-predicate-task.git
   cd biocatch-predicate-task
   npm install

2. Testing with Jest

   This project uses Jest as the testing framework to ensure the correctness of the implemented features. Jest is a powerful testing framework widely used for JavaScript and TypeScript applications.

   How to Run Tests

   To execute all the tests in the project, use the following command:
   npm run test

   ### by VSCODE go to extensions and download jest to debug the tests.

   ## so i added a test folder for testing