const parseCookie = (cookieString: string): { [key: string]: string } => {
  const cookieObj: { [key: string]: string } = {};
  const cookiePairs = cookieString.split('; ');

  cookiePairs.forEach(pair => {
    const [key, value] = pair.split('=');
    cookieObj[key] = value;
  });

  return cookieObj;
}


export { parseCookie }