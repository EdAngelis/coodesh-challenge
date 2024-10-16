function getMemoryUsage() {
  const memoryUsage = process.memoryUsage();

  const memoryObject = {
    rss: Math.round(memoryUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    external: Math.round(memoryUsage.external / 1024 / 1024),
    arrayBuffers: Math.round(memoryUsage.arrayBuffers / 1024 / 1024),
  };
  return memoryObject;
}

export default getMemoryUsage;
