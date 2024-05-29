const generateSorterAndFilter = (grader, points) => Object.entries(grader)
  .map(([sorterType, sorterPoints]) => ({
    type: sorterType,
    count: sorterPoints(points).length,
  }),
  );

export {generateSorterAndFilter};
