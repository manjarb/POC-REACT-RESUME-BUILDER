import { PDFViewer } from '@react-pdf/renderer';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TemplateOption } from '../../common/constants';
import Button from '../../components/Button/Button';
import CodeBlockEditor from '../../components/CodeBlockEditor/CodeBlockEditor';
import BasicTemplate from '../../components/Templates/BasicTemplate/BasicTemplate';

import ResumeForm from './components/ResumeForm/ResumeForm';
import { useCreateResume } from './useCreateResume';

import classes from './CreateResume.module.scss';

export default function CreateResume() {
  const {
    onUpdateBasicUserData,
    onUpdateEducation,
    selectedTemplate,
    combinedUserData,
    educationsData,
  } = useCreateResume();

  const detailForm = useMemo(() => {
    return <ResumeForm onUpdateFormValue={onUpdateBasicUserData} />;
  }, []);

  const PreviewResume = () => {
    if (selectedTemplate && combinedUserData) {
      switch (selectedTemplate.formValue.templateOption) {
      case TemplateOption.BASIC:
        return (
          <BasicTemplate
            templateData={selectedTemplate}
            userData={combinedUserData}
          />
        );
      default:
        break;
      }
    }

    return null;
  };

  const EducationData = () => {
    return (
      <CodeBlockEditor
        onChange={onUpdateEducation}
        defaultValue={educationsData}
      />
    );
  };

  return (
    <div className="p-t-20">
      <div className="row min-full-height">
        <div className="col">
          <div className="p-l-20">
            <div className={`${classes.titleBox} m-b-15`}>
              <Link to="/">
                <Button variant="link">Back</Button>
              </Link>
              <h3>Create Resume</h3>
            </div>
            {detailForm}
            <p>Education</p>
            <EducationData />
          </div>
        </div>
        <div className="col">
          {selectedTemplate && (
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <PreviewResume />
            </PDFViewer>
          )}
        </div>
      </div>
    </div>
  );
}
