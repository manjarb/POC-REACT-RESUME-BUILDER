export enum TemplateOption {
  BASIC = 'basic',
  MODERN = 'modern',
  HEADER = 'header',
}

export enum FontFamily {
  ARIAL = 'Arial',
  TIMES_NEW_ROMAN = 'Times New Roman',
  GEORGIA = 'Georgia',
  // TODO: In case we want to expand more font in the future
  // COURIER_NEW = 'Courier New',
  // VERDANA = 'Verdana',
}

export enum TemplateSection {
  EXPERIENCES = 'experiences',
  EDUCATION = 'education',
  CERTIFICATIONS = 'certifications',
  REFERENCES = 'references',
  SKILLS = 'skills',
  CONTACT = 'contact',
  DESCRIPTION = 'description',
}

export enum TemplateArea {
  LEFT = 'leftArea',
  RIGHT = 'rightArea',
}

export const TEMPLATE_OPTIONS = [
  { value: TemplateOption.BASIC, label: 'Basic Template' },
  { value: TemplateOption.MODERN, label: 'Modern Template' },
  { value: TemplateOption.HEADER, label: 'Header Template' },
];

export const FONT_FAMILIES = [
  { value: FontFamily.ARIAL, label: FontFamily.ARIAL },
  { value: FontFamily.TIMES_NEW_ROMAN, label: FontFamily.TIMES_NEW_ROMAN },
  { value: FontFamily.GEORGIA, label: FontFamily.GEORGIA },
  // TODO: In case we want to expand more font in the future
  // { value: FontFamily.COURIER_NEW, label: FontFamily.COURIER_NEW },
  // { value: FontFamily.VERDANA, label: FontFamily.VERDANA },
];

export enum DragElement {
  SECTION = 'section',
}

export const colorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export enum ErrorMessage {
  INVALID_COLOR = 'Invalid color format',
}

export enum ColorCode {
  WHITE = '#FFF',
  BLACK = '#000000',
  DARK_BLUE = '#082A4D',
}

export interface ITemplateSectionData {
  left: string[];
  right: string[];
}

export interface ITemplateFormData {
  templateName: string;
  baseFontSize: number;
  fontFamily: string;
  titleColor: string;
  rightColumnBgColor: string;
  templateOption: string;
  headerPadding: number;
  lineSpacing: number;
  headerBackgroundColor: string;
  headerTextColor: string;
  watermarkUrl?: string;
}

export interface ITemplateSectionDataDetail extends ITemplateSectionData {
  formValue: Partial<ITemplateFormData>;
}

export interface IUserExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IUserEducation {
  degree: string;
  major: string;
  university?: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  school?: string;
}

export interface IUserCertification {
  name: string;
  date: string;
}

export interface IUserSkill {
  name: string;
  score: number;
}

export interface IUserRef {
  name: string;
  email: string;
  relationship: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  experiences: IUserExperience[];
  education: IUserEducation[];
  certifications: IUserCertification[];
  description: string;
  references: IUserRef[];
  linkedin: string;
  skills: IUserSkill[];
}
