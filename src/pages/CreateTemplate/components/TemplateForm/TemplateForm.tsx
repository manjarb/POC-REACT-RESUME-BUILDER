import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  ColorCode,
  colorRegex,
  FONT_FAMILIES,
  FontFamily,
  ITemplateFormData,
  TEMPLATE_OPTIONS,
  TemplateOption,
} from '../../../../common/constants';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { useEffect } from 'react';

const stringField = Yup.string().required('This field is required');
const numberField = Yup.number().required('This field is required');

const validationSchema = Yup.object().shape({
  baseFontSize: numberField,
  fontFamily: stringField,
  titleColor: stringField.matches(colorRegex, 'Invalid color format'),
  rightColumnBgColor: stringField.matches(colorRegex, 'Invalid color format'),
  templateOption: stringField,
  headerPadding: numberField.min(0, 'Padding must be at least 0'),
  lineSpacing: numberField,
  headerBackgroundColor: stringField.matches(
    colorRegex,
    'Invalid color format',
  ),
  headerTextColor: stringField.matches(colorRegex, 'Invalid color format'),
});

interface ITemplateFormProps {
  onUpdateFormValue: (data: ITemplateFormData) => void;
}

export default function TemplateForm({
  onUpdateFormValue,
}: ITemplateFormProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ITemplateFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      baseFontSize: 14,
      fontFamily: FontFamily.ARIAL,
      titleColor: ColorCode.BLACK,
      rightColumnBgColor: ColorCode.DARK_BLUE,
      templateOption: TemplateOption.BASIC,
      headerPadding: 20,
      lineSpacing: 1,
      headerBackgroundColor: ColorCode.WHITE,
      headerTextColor: ColorCode.BLACK,
    },
  });

  // Watch all form values
  const formValues = watch();

  const sendFormValues = (values: ITemplateFormData) => {
    // Simulate sending form values to an API or server
    onUpdateFormValue(values);
  };

  useEffect(() => {
    if (isValid) {
      console.log('sendFormValues sendFormValues');
      console.log(formValues, ' :formValues');
      sendFormValues(formValues);
    }
  }, [formValues, isValid]);

  return (
    <form className="form-horizontal">
      <div className="row">
        <div className="col-sm-4 m-b-15">
          <Select
            label="Template Option"
            name="templateOption"
            options={TEMPLATE_OPTIONS}
            register={register}
            error={errors.templateOption?.message}
          />
        </div>
        <div className="col-sm-4 m-b-15">
          <Input
            label="Base Font Size (px)"
            type="number"
            name="baseFontSize"
            register={register}
            error={errors.baseFontSize?.message}
          />
        </div>
        <div className="col-sm-4 m-b-15">
          <Select
            label="Font Family"
            name="fontFamily"
            options={FONT_FAMILIES}
            register={register}
            error={errors.fontFamily?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Title Color"
            type="text"
            name="titleColor"
            register={register}
            error={errors.titleColor?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Right Column Background Color"
            type="text"
            name="rightColumnBgColor"
            register={register}
            error={errors.rightColumnBgColor?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Header Vertical Padding (px)"
            type="number"
            name="headerPadding"
            register={register}
            error={errors.headerPadding?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Line Spacing"
            type="number"
            name="lineSpacing"
            register={register}
            error={errors.lineSpacing?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Header Background Color"
            type="text"
            name="headerBackgroundColor"
            register={register}
            error={errors.headerBackgroundColor?.message}
          />
        </div>

        <div className="col-sm-6 m-b-15">
          <Input
            label="Header Text Color"
            type="text"
            name="headerTextColor"
            register={register}
            error={errors.headerTextColor?.message}
          />
        </div>
      </div>
    </form>
  );
}
