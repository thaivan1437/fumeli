export async function fetchConfigData() {
	const response = await fetch('/config.json');
	const data = await response.json();
	return data;
}
export async function getConfigUrl() {
  try {
    const configData = await fetchConfigData();
    return configData.apiHost;
  } catch (error) {
    console.error('Error fetching config data:', error);
    return null;
  }
}