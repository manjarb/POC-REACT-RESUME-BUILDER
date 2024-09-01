import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { IBasicFormUserData } from '../../../../common/constants';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { useTemplateData } from '../../../../components/Templates/hooks/useTemplateData/useTemplateData';
import { Textarea } from '../../../../components/Textarea/Textarea';

const stringField = Yup.string().required('This field is required');

const validationSchema = Yup.object().shape({
  templateId: stringField,
  firstName: stringField,
  lastName: stringField,
  email: stringField,
  linkedin: stringField,
  address: stringField,
  description: Yup.string(),
});

interface IResumeForm {
  onUpdateFormValue: (data: IBasicFormUserData) => void;
}

export default function ResumeForm({ onUpdateFormValue }: IResumeForm) {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IBasicFormUserData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });
  const { fetchSaveTemplates, savedTemplates } = useTemplateData();

  // Watch all form values
  const formValues = watch();

  const sendFormValues = (values: IBasicFormUserData) => {
    // Simulate sending form values to an API or server
    onUpdateFormValue(values);
  };

  useEffect(() => {
    sendFormValues(formValues);
  }, [formValues, isValid]);

  useEffect(() => {
    fetchSaveTemplates();
  }, []);

  useEffect(() => {
    if (savedTemplates && savedTemplates.length) {
      setValue('templateId', savedTemplates[0].id);
    }
  }, [savedTemplates]);

  return (
    <form className="form-horizontal">
      <div className="row">
        <div className="col-sm-6 m-b-15">
          <Select
            label="Template Option"
            name="templateId"
            options={savedTemplates.map((t) => ({
              value: t.id,
              label: t.formValue.templateName || '',
            }))}
            register={register}
            error={errors.templateId?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Linkedin"
            name="linkedin"
            register={register}
            error={errors.linkedin?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Address"
            name="address"
            register={register}
            error={errors.address?.message}
          />
        </div>

        <div className="col-sm-12 m-b-15">
          <Textarea
            label="Description"
            name="description"
            register={register}
            error={errors.description?.message}
          />
        </div>
      </div>
    </form>
  );
}
