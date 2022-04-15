let i = 0;
const envs = {};

export function withEnv<Env, A extends ReadonlyArray<unknown>, B>(
  callback: (env: Env, ...args: A) => B,
): {
  withEnv<T>(env: T): (...args: A) => B;
  (...args: A): B;
} {
  function fn(...args: A) {
    return callback(envs[i - 1], ...args);
  }
  fn.withEnv = env => {
    envs[i] = env;
    i++;
    return (...args: A) => {
      return callback(env, ...args);
    };
  };
  return fn;
}
