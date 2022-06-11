/**
 * Wait for 1 second
 */
export const wait = async (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
