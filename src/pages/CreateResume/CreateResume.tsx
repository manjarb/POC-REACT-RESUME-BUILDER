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
    onUpdateExperience,
    onUpdateCertification,
    onUpdateSkill,
    selectedTemplate,
    combinedUserData,
    educationsData,
    experiencesData,
    certificationsData,
    skillsData,
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
      <div className='m-b-15'>
        <p>Education</p>
        <CodeBlockEditor
          onChange={onUpdateEducation}
          defaultValue={educationsData}
        />
      </div>
    );
  };

  const ExperienceData = () => {
    return (
      <div className='m-b-15'>
        <p>Experience</p>
        <CodeBlockEditor
          onChange={onUpdateExperience}
          defaultValue={experiencesData}
        />
      </div>
    );
  };

  const CertificationData = () => {
    return (
      <div className="m-b-15">
        <p>Certification</p>
        <CodeBlockEditor
          onChange={onUpdateCertification}
          defaultValue={certificationsData}
        />
      </div>
    );
  };

  const SkillData = () => {
    return (
      <div className="m-b-15">
        <p>Skill</p>
        <CodeBlockEditor onChange={onUpdateSkill} defaultValue={skillsData} />
      </div>
    );
  };

  return (
    <div className="row min-full-height">
      <div className={`col p-t-15 ${classes.detailColBox}`}>
        <div className="p-l-20">
          <div className={`${classes.titleBox} m-b-15`}>
            <Link to="/">
              <Button variant="link">Back</Button>
            </Link>
            <h3>Create Resume</h3>
            <div></div>
          </div>
          {detailForm}
          <ExperienceData />
          <EducationData />
          <CertificationData />
          <SkillData />
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
  );
}
