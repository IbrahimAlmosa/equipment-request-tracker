export const PRIORITY_FILTER_OPTIONS = ["All", "High", "Normal", "Low"];

/**
 * Returns the saved requests that should be visible for the selected priority.
 * Never mutates the input array or the saved request objects.
 */
export function filterRequestsByPriority(requests, priority = "All") {
  if (!PRIORITY_FILTER_OPTIONS.includes(priority)) {
    throw new RangeError("Unsupported priority filter.");
  }

  if (priority === "All") return [...requests];

  return requests.filter((request) => (request.priority ?? "Normal") === priority);
}
