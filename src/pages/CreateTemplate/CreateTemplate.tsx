import { useCreateTemplate } from './useCreateTemplate';
import TemplateBuilderArea from './components/TemplateBuilderArea/TemplateBuilderArea';
import TemplateForm from './components/TemplateForm/TemplateForm';

export default function CreateTemplate() {
  const {
    onUpdateTemplateSectionDataDetail,
    onUpdateFormValue,
  } = useCreateTemplate();

  return (
    <div className="p-t-20">
      <div className="row">
        <div className="col">
          <div className="p-l-20">
            <h3 className="text-center m-b-15">Create Template</h3>
            <TemplateForm onUpdateFormValue={onUpdateFormValue} />
            <div className="m-t-15 p-b-50">
              <TemplateBuilderArea
                onUpdateTemplateSectionData={onUpdateTemplateSectionDataDetail}
              />
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
