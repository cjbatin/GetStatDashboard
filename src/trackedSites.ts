export function trackedSites(allSites: any[]): any[] {
    return allSites.filter((obj) => obj.Tracking === "true")
}