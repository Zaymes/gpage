export function getTopAndBottomElements(
    arr1: number[],
    arr2: number[]
): { top5: number[]; bottom5: number[] } {
    if (arr1.length < 5 || arr2.length < 5 || arr1.length !== arr2.length) {
        throw new Error("Both arrays must have at least 5 elements and the same length.");
    }

    // Create an array of indices and sort by values in `arr1`
    const indices = arr1.map((_, index) => index);

    const topIndices = indices
        .sort((a, b) => arr1[b] - arr1[a]) // Sort by descending values of arr1
        .slice(0, 5); // Top 5 indices

    const bottomIndices = indices
        .sort((a, b) => arr1[a] - arr1[b]) // Sort by ascending values of arr1
        .slice(0, 5); // Bottom 5 indices

    // Use the indices to get corresponding elements from `arr2`
    const top5 = topIndices.map(index => arr2[index]);
    const bottom5 = bottomIndices.map(index => arr2[index]);

    return { top5, bottom5 };
}


