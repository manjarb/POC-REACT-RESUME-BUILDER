export function useTemplateLayout() {
  const calculateHeaderTitle = (baseSize = 16, proportion = 1.5) => {
    return `${baseSize * proportion}px`;
  };

  return {
    calculateHeaderTitle,
  };
}
