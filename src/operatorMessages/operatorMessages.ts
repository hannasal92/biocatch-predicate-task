const operatorMessages = {
    IS_NONE_SUCCESS: "success because the value is none or undefined",
    IS_NONE_FAIL: "fail because value is not none or is not undefined",

    IS_NOT_NONE_SUCCESS: "success because there is a value",
    IS_NOT_NONE_FAIL: "fail because value is none or is undefined",

    EQUAL_SUCCESS:"success because the value equal to operand",
    EQUAL_FAIL:"fail because the value not equal to operand",

    NOT_EQUAL_SUCCESS:"success because the value not equal to operand",
    NOT_EQUAL_FAIL:"fail because the value equal to operand",

    IS_LESS_THAN_SUCCESS:"success because the value less than the operand",
    IS_LESS_THAN_FAIL:"fail because the value bigger than operand",

    IS_GREATER_THAN_SUCCESS:"success because the value greater than the operand",
    IS_GREATER_THAN_FAIL:"fail because the value smaller than operand",

    AND_SUCCESS:"success because all the operrations list evaluate true",
    AND_FAIL:"fail because all or some of the operations list return false",

    OR_SUCCESS:"success because any of the operations in the operations array evaluate to true",
    OR_FAIL:"fail because all or some of the operations list return false"

  };
  
  export default operatorMessages;