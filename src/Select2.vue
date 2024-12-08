<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import $ from 'jquery';
import 'select2/dist/css/select2.css';
import select2 from 'select2';

select2();

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Array],
        default: () => [],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const selectElement = ref(null);

let isUpdating = false;

const initializeSelect2 = () => {
    $(selectElement.value)
        .select2({
            multiple: props.multiple,
            disabled: props.disabled,
        })
        .val(props.modelValue)
        .trigger('change');
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
    }
};

onMounted(() => {
    initializeSelect2();
    $(selectElement.value).on('change', onSelect2Change);
});

onBeforeUnmount(() => {
    if (selectElement.value) {
        $(selectElement.value).off('change', onSelect2Change);
        $(selectElement.value).select2('destroy');
    }
});
</script>

<template>
    <div>
        <select ref="selectElement" class="select2" :multiple="multiple" :disabled="disabled">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.select2 {
    width: 100%;
}
</style>
