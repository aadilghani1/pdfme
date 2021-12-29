import { PDFImage } from 'pdf-lib';

type TemplateSchemaType =
  | 'text'
  | 'image'
  | 'qrcode'
  | 'japanpost'
  | 'ean13'
  | 'ean8'
  | 'code39'
  | 'code128'
  | 'nw7'
  | 'itf14'
  | 'upca'
  | 'upce';

export type BarCodeType = Exclude<TemplateSchemaType, 'text' | 'image'>;

export type Alignment = 'left' | 'right' | 'center';

export interface InputImageCache {
  [key: string]: PDFImage;
}
export interface PageSize {
  height: number;
  width: number;
}

interface FontValue {
  data: string | Uint8Array | ArrayBuffer;
  default?: boolean; // default is must be true only one
  subset?: boolean; // this value is used by generate.
  index?: number; // this value is used by TemplateDesigner.
}

export interface Font {
  [label: string]: FontValue;
}

export type Schemas = { [key: string]: TemplateSchema }[];

export type BasePdf = PageSize | string | Uint8Array | ArrayBuffer;

export const isPageSize = (arg: BasePdf): arg is PageSize =>
  typeof arg === 'object' && 'width' in arg;

export interface Template {
  schemas: Schemas;
  basePdf: BasePdf;
  sampledata?: { [key: string]: string }[];
  columns?: string[];
}

// TODO 画像やバーコードにはfontColorが使えないので無駄なプロパティ。typeで制御したい。
export interface TemplateSchema {
  type: TemplateSchemaType;
  position: { x: number; y: number };
  width: number;
  height: number;
  rotate?: number;
  alignment?: Alignment;
  fontSize?: number;
  fontName?: string;
  fontColor?: string;
  backgroundColor?: string;
  characterSpacing?: number;
  lineHeight?: number;
}

export type SchemaUIProp = {
  schema: Schema;
  editable: boolean;
  placeholder: string;
  tabIndex: number;
  onChange: (value: string) => void;
};

export type Schema = TemplateSchema & {
  id: string;
  key: string;
  data: string;
};

export type Lang = 'en' | 'ja';

export interface GuidesInterface {
  getGuides(): number[];
  scroll(pos: number): void;
  scrollGuides(pos: number): void;
  loadGuides(guides: number[]): void;
  resize(): void;
}

export interface GenerateArg {
  inputs: { [key: string]: string }[];
  template: Template;
  options?: { font?: Font; splitThreshold?: number };
}

export interface UIProps {
  domContainer: HTMLElement;
  template: Template;
  size: PageSize;
  options?: { lang?: Lang; font?: Font };
}

export interface TemplateDesignerProp extends Omit<UIProps, 'domContainer'> {
  saveTemplate: (template: Template) => void;
}

export interface PreviewUIProp extends Omit<UIProps, 'domContainer'> {
  inputs: { [key: string]: string }[];
  onChangeInput?: (arg: { index: number; value: string; key: string }) => void;
}
