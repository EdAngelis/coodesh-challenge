const serverOnlineTime = () => {
  const processUptime = process.uptime();

  const uptimeHours = Math.floor(processUptime / 3600);
  const uptimeMinutes = Math.floor((processUptime % 3600) / 60);
  const uptimeSeconds = Math.floor(processUptime % 60);

  return `${uptimeHours}:${uptimeMinutes}:${uptimeSeconds}`;
};

export default serverOnlineTime;
