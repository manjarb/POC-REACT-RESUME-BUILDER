import { useEffect } from 'react';

import { useTemplateData } from '../../components/Templates/hooks/useTemplateData/useTemplateData';

export function useHomePage() {
  const { fetchSaveTemplates, savedTemplates } = useTemplateData();

  useEffect(() => {
    fetchSaveTemplates();
  }, []);

  return {
    savedTemplates,
  };
}
