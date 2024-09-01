import { JsonData, JsonEditor } from 'json-edit-react';
import { useState } from 'react';

interface ICodeBlockEditorProps {
  defaultValue: JsonData
  onChange: (value: JsonData) => void;
}

export default function CodeBlockEditor({ defaultValue, onChange }: ICodeBlockEditorProps) {
  const [data, setData] = useState<JsonData>(defaultValue);

  const onSetData = (value: JsonData) => {
    setData(value);
    onChange(value);
  };

  return (
    <JsonEditor
      data={data}
      setData={onSetData}
    />
  );
}
