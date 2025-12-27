export const objectToQueryString = (
  params: Record<string, string | number | boolean>
) => {
  const filteredEntries = Object.entries(params)
    .filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    )
    .map(([key, value]) => [key, String(value)]);

  return new URLSearchParams(filteredEntries as [string, string][]).toString();
};