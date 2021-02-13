export function convertResultToArray(result: any): any[] {
    let results: any[]
    if (Array.isArray(result)) {
        results = result
    } else {
        results = [result as any]
    }
    return results
}