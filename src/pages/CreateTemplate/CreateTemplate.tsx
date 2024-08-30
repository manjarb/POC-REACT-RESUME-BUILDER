import Select from '../../components/Select/Select';
import { useCreateTemplate } from './useCreateTemplate';
import TemplateBuilderArea from './components/TemplateBuilderArea/TemplateBuilderArea';

export default function CreateTemplate() {
  const { selectedTemplate, handleTemplateChange, TEMPLATE_OPTIONS } =
    useCreateTemplate();

  return (
    <div className="p-t-30">
      <div className="row">
        <div className="col">
          <div className="p-l-20">
            <h2 className="text-center m-b-15">Create Template</h2>
            <div className="text-center">
              <p>Select Template</p>
              <div className="max-w-300 m-h-auto">
                <Select
                  options={TEMPLATE_OPTIONS}
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  className="mb-3"
                  placeholder="Choose a template"
                />
              </div>
            </div>
            <div className="m-t-15">
              <TemplateBuilderArea />
            </div>
          </div>
        </div>
        <div className="col text-center">
          <h1>Preview</h1>
        </div>
      </div>
    </div>
  );
}
