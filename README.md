# Select2 Component for Vue

[![npm version](https://badge.fury.io/js/select2-vue.svg)](https://badge.fury.io/js/select2-vue)

**`select2-vue`** is a Vue.js wrapper component for the popular jQuery Select2 library, providing you with a flexible and customizable select box with support for searching, tagging, remote data sources, and more. The package makes it easy to integrate the powerful features of Select2 into your Vue applications.

## Features

-   Support for all Select2 features (search, tagging, remote data, infinite scrolling).
-   Fully reactive with Vue.js.
-   Easy integration with existing Select2 options.
-   Configurable using props for quick customization.
-   Emits native Select2 events for more control.

## Installation

Install the package via npm:

```bash
npm install select2-vue --save
```

Or via yarn:

```bash
yarn add select2-vue
```

## Basic Usage

Import and register the `select2-vue` component, using the `<script setup>` syntax for simplicity.

### Example: Basic Select

```vue
<template>
    <select2-vue :options="selectOptions" v-model="selectedValue" placeholder="Select an option" />
</template>

<script setup>
import { ref } from 'vue';
import Select2 from 'select2-vue';

const selectedValue = ref(null);
const selectOptions = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' },
];
</script>
```

### Styles

To ensure proper styling, include the **Select2** CSS file in your project:

```js
import 'select2-vue/dist/select2-vue.css';
```

## Props

The `select2-vue` component accepts the following props for customization:

| Prop          | Type      | Default | Description                                                                                                                                                            |
| ------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`     | `Array`   | `[]`    | Array of select options. Each option should be an object with `id` and `text` properties.                                                                              |
| `modelValue`  | `Any`     | `null`  | The currently selected value (can be bound with `v-model`).                                                                                                            |
| `placeholder` | `String`  | `""`    | Placeholder text displayed in the select box.                                                                                                                          |
| `multiple`    | `Boolean` | `false` | Enables multiple selection.                                                                                                                                            |
| `disabled`    | `Boolean` | `false` | Disables the select box.                                                                                                                                               |
| `config`      | `Object`  | `{}`    | Custom settings to pass directly to the underlying Select2 instance. See [Select2 documentation](https://select2.org/configuration/options-api) for available options. |

## Events

The component emits several useful events for better control over the Select2 instance:

| Event              | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `select2:select`   | Fired when an option is selected. The selected item is passed as the event payload. |
| `select2:unselect` | Fired when an option is deselected (in `multiple` mode).                            |
| `select2:opening`  | Triggered when the dropdown is about to open.                                       |
| `select2:closing`  | Triggered when the dropdown is about to close.                                      |
| `change`           | Fired when the value changes, passing the new value.                                |

Example:

```vue
<template>
    <select2-vue
        :options="selectOptions"
        v-model="selectedValue"
        @select2:select="handleSelect"
        @select2:unselect="handleUnselect"
    />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const selectOptions = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' },
];

function handleSelect(selected) {
    console.log('Option selected:', selected);
}

function handleUnselect(unselected) {
    console.log('Option unselected:', unselected);
}
</script>
```

## Example: Using Remote Data

You can fetch data dynamically from a remote API using the `ajax` option:

```vue
<template>
    <select2-vue :settings="select2Settings" v-model="selectedValue" />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const select2Settings = {
    ajax: {
        url: 'https://api.example.com/data',
        dataType: 'json',
        processResults: function (data) {
            return {
                results: data.items.map((item) => ({
                    id: item.id,
                    text: item.name,
                })),
            };
        },
    },
};
</script>
```

## Example: Multiple Selection with Tagging

Here’s an example where you can add new tags or select multiple values:

```vue
<template>
    <select2-vue :settings="select2Settings" v-model="selectedTags" placeholder="Select or add tags" />
</template>

<script setup>
import { ref } from 'vue';

const selectedTags = ref([]);
const select2Settings = {
    tags: true,
    tokenSeparators: [',', ' '],
};
</script>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
