import classes from './CreateTemplate.module.scss';
import { useCreateTemplate } from './useCreateTemplate';
import TemplateBuilderArea from './components/TemplateBuilderArea/TemplateBuilderArea';
import TemplateForm from './components/TemplateForm/TemplateForm';
import { PDFViewer } from '@react-pdf/renderer';
import BasicTemplate from '../../components/Templates/BasicTemplate/BasicTemplate';
import { useMemo } from 'react';
import { mockResumeData } from '../../data/resume';
import Button from '../../components/Button/Button';

export default function CreateTemplate() {
  const {
    onUpdateTemplateSectionDataDetail,
    onUpdateFormValue,
    templateSectionDataDetail,
  } = useCreateTemplate();

  const memoForm = useMemo(() => {
    return <TemplateForm onUpdateFormValue={onUpdateFormValue} />;
  }, []);

  return (
    <div className="p-t-20">
      <div className="row">
        <div className="col">
          <div className="p-l-20">
            <div className={`${classes.titleBox} m-b-15`}>
              <h3>Create Template</h3>
              <Button variant='success'>Save</Button>
            </div>
            {memoForm}
            <div className="m-t-15 p-b-50">
              <TemplateBuilderArea
                onUpdateTemplateSectionData={onUpdateTemplateSectionDataDetail}
              />
            </div>
          </div>
        </div>
        <div className="col text-center">
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <BasicTemplate
              userData={mockResumeData}
              templateData={templateSectionDataDetail}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}
