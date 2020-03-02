const Duration = ({ value }) => {
  const date = new Date(value * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds();

  const pad = input => input.toString().padStart(2, '0');

  if (hh) return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;

  return `${pad(mm)}:${pad(ss)}`;
};

export default Duration;
