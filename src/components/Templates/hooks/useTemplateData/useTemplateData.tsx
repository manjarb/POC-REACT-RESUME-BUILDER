import { useState } from 'react';

import { ITemplateSectionDataDetailSave, StorageKey } from '../../../../common/constants';

export function useTemplateData() {
  const [savedTemplates, setSavedTemplates] = useState<
      ITemplateSectionDataDetailSave[]
    >([]);

  const fetchSaveTemplates = () => {
    const templates = localStorage.getItem(StorageKey.TEMPLATES);
    if (templates) {
      setSavedTemplates(JSON.parse(templates));
    }
  };

  return {
    savedTemplates,
    fetchSaveTemplates,
  };
}
