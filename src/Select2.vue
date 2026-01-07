<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import $ from 'jquery';
import select2 from 'select2';
import { getGlobalSelect2Options } from './globalSelect2Config';
import 'select2/dist/css/select2.css';

select2();

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Number, Array],
        default: null,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    config: {
        type: Object,
        default: () => ({}),
    },
    ajaxOptions: {
        type: Object,
        default: null,
    },
    valueKey: {
        type: String,
        default: 'id',
    },
    textKey: {
        type: String,
        default: 'text',
    },
});

const emit = defineEmits([
    'update:modelValue',
    'change',
    'select',
    'select2:select',
    'select2:unselect',
    'select2:opening',
    'select2:closing',
    'select2:open',
    'select2:closed',
]);

const selectElement = ref(null);

let isUpdating = false;

const initializeSelect2 = () => {
    // Get global Select2 options
    const globalOptions = getGlobalSelect2Options();

    const defaultOptions = {
        multiple: props.multiple,
        disabled: props.disabled,
    };

    let mergedOptions = {
        ...defaultOptions,
        ...globalOptions,
        ...props.config,
    };

    if (props.ajaxOptions) {
        mergedOptions = {
            ...mergedOptions,
            ajax: props.ajaxOptions,
        };
    }

    $(selectElement.value).select2(mergedOptions).val(props.modelValue).trigger('change');
};

watch(
    () => props.modelValue,
    (newValue, oldValue) => {
        if (!isUpdating && newValue !== oldValue) {
            isUpdating = true;
            $(selectElement.value).val(newValue).trigger('change');
            isUpdating = false;
        }
    }
);

const onSelect2Change = () => {
    if (!isUpdating) {
        const selectedValues = $(selectElement.value).val();
        emit('update:modelValue', selectedValues);
        emit('change', selectedValues);
    }
};

const onSelect2Select = (e) => {
    const selectedOption = e.params.data;
    emit('select', selectedOption);
    emit('select2:select', e);
};

const onSelect2Unselect = (e) => {
    const unselectedOption = e.params.data;
    emit('select2:unselect', e);
};

const onSelect2Opening = () => {
    emit('select2:opening');
};

const onSelect2Closing = () => {
    emit('select2:closing');
};

const onSelect2Open = () => {
    emit('select2:open');
};

const onSelect2Closed = () => {
    emit('select2:closed');
};

onMounted(() => {
    initializeSelect2();
    $(selectElement.value).on('change', onSelect2Change);
    $(selectElement.value).on('select2:select', onSelect2Select);
    $(selectElement.value).on('select2:unselect', onSelect2Unselect);
    $(selectElement.value).on('select2:opening', onSelect2Opening);
    $(selectElement.value).on('select2:closing', onSelect2Closing);
    $(selectElement.value).on('select2:open', onSelect2Open);
    $(selectElement.value).on('select2:closed', onSelect2Closed);
});

onBeforeUnmount(() => {
    if (selectElement.value) {
        $(selectElement.value).off('change', onSelect2Change);
        $(selectElement.value).off('select2:select', onSelect2Select);
        $(selectElement.value).off('select2:unselect', onSelect2Unselect);
        $(selectElement.value).off('select2:opening', onSelect2Opening);
        $(selectElement.value).off('select2:closing', onSelect2Closing);
        $(selectElement.value).off('select2:open', onSelect2Open);
        $(selectElement.value).off('select2:closed', onSelect2Closed);
        $(selectElement.value).select2('destroy');
    }
});
</script>

<template>
    <div>
        <select ref="selectElement" class="select2" :multiple="multiple" :disabled="disabled">
            <option v-for="option in options" :key="option[valueKey]" :value="option[valueKey]">
                {{ option[textKey] }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.select2 {
    width: 100%;
}
</style>
