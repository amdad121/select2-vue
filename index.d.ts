import { DefineComponent, EmitsOptions } from 'vue';

export interface Select2Option {
    id: string | number;
    text: string;
    [key: string]: any;
}

export interface Select2Config {
    [key: string]: any;
}

export interface Select2AjaxOptions {
    url?: string;
    dataType?: string;
    delay?: number;
    data?: (params: any) => any;
    processResults?: (data: any) => { results: Select2Option[] };
    transport?: (params: any, success: Function, failure: Function) => any;
    [key: string]: any;
}

export interface Select2Emits extends EmitsOptions {
    'update:modelValue': (value: string | number | Array<string | number> | null) => void;
    'change': (value: string | number | Array<string | number> | null) => void;
    'select': (option: Select2Option) => void;
    'select2:select': (event: { params: { data: Select2Option } }) => void;
    'select2:unselect': (event: { params: { data: Select2Option } }) => void;
    'select2:opening': () => void;
    'select2:closing': () => void;
    'select2:open': () => void;
    'select2:closed': () => void;
}

export interface Select2Props {
    options: Select2Option[];
    modelValue?: string | number | Array<string | number> | null;
    multiple?: boolean;
    disabled?: boolean;
    config?: Select2Config;
    ajaxOptions?: Select2AjaxOptions | null;
    valueKey?: string;
    textKey?: string;
}

declare const Select2: DefineComponent<Select2Props, {}, {}>;

export function setGlobalSelect2Options(options: Select2Config): void;

export default Select2;
