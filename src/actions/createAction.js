/**
 * create-action 的高阶函数
 */
const Request = (resource, operation) => ({
  type: `${operation}_${resource}_REQUEST`,
});

const Success = (data, resource, operation) => ({
  type: `${operation}_${resource}_SUCCESS`,
  payload: {
    data,
  },
});

const Failure = (error, resource, operation) => ({
  type: `${operation}_${resource}_FAILURE`,
  payload: {
    error,
  },
});

export {
  Request,
  Success,
  Failure,
}