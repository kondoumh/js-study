const unstableRondomTimeout = id => {
  const ms = 1000 + Math.random() * 2000;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        console.log('reject', id);
        reject(id);
      } else {
        console.log('resolve', id);
        resolve(id);
      }
    }, ms);
  });
};

(async () => {
  const promises = [
    unstableRondomTimeout(1),
    unstableRondomTimeout(2),
    unstableRondomTimeout(3),
    unstableRondomTimeout(4),
    unstableRondomTimeout(5)
  ];
  try {
    const values = await Promise.all(promises);
    console.log('[success]', values);
  }
  catch (err) {
    console.error('[failure]', err);
  }
})();
