# Select2 Component for Vue

[![npm version](https://badge.fury.io/js/select2-vue.svg)](https://badge.fury.io/js/select2-vue)
[![Downloads](https://img.shields.io/npm/dm/select2-vue.svg)](https://www.npmjs.com/package/select2-vue)
[![Total Downloads](https://img.shields.io/npm/dt/select2-vue.svg)](https://www.npmjs.com/package/select2-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat&logo=vue.js)](https://vuejs.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/select2-vue)](https://bundlephobia.com/result?p=select2-vue)

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
npm install select2-vue
```

Or via yarn:

```bash
yarn add select2-vue
```

Or via pnpm:

```bash
pnpm add select2-vue
```

## Basic Usage

Import and register the `select2-vue` component, using the `<script setup>` syntax for simplicity.

### Example: Basic Select

```vue
<template>
    <select2-vue :options="selectOptions" v-model="selectedValue" :config="{ placeholder: 'Select an option' }" />
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

## TypeScript Support

This package includes TypeScript type definitions out of the box. The component and its utility functions are fully typed.

### TypeScript Example

```vue
<template>
    <select2-vue
        :options="countries"
        v-model="selectedCountry"
        :config="{ placeholder: 'Select a country' }"
        @select="handleSelect"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Select2, { Select2Option, Select2Config } from 'select2-vue';

interface Country extends Select2Option {
    code: string;
}

const selectedCountry = ref<string | null>(null);

const countries: Country[] = [
    { id: 1, text: 'United States', code: 'US' },
    { id: 2, text: 'Canada', code: 'CA' },
    { id: 3, text: 'United Kingdom', code: 'UK' },
];

const select2Config: Select2Config = {
    placeholder: 'Select a country',
    allowClear: true,
};

function handleSelect(option: Country) {
    console.log('Selected:', option);
}
</script>
```

### TypeScript Types

```ts
import type { Select2Option, Select2Config, Select2AjaxOptions } from 'select2-vue';

// Define your option type extending Select2Option
interface MyOption extends Select2Option {
    customProperty: string;
}

// Configure Select2 with typed options
const config: Select2Config = {
    minimumResultsForSearch: 10,
    tags: true,
};

// Setup ajax with typed options
const ajaxOptions: Select2AjaxOptions = {
    url: '/api/search',
    dataType: 'json',
    delay: 250,
    processResults: (data: any) => ({
        results: data.items,
    }),
};
```

### Styles

To ensure proper styling, include the **Select2** CSS file in your project:

```js
import 'select2/dist/css/select2.css';
```

## Props

The `select2-vue` component accepts the following props for customization:

| Prop          | Type      | Default     | Description                                                                                                                                                            |
| ------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`     | `Array`   | `[]`        | Array of select options. Each option should be an object with `id` and `text` properties.                                                                              |
| `modelValue`  | `Any`     | `null`      | The currently selected value (can be bound with `v-model`).                                                                                                            |
| `multiple`    | `Boolean` | `false`     | Enables multiple selection.                                                                                                                                            |
| `disabled`    | `Boolean` | `false`     | Disables the select box.                                                                                                                                               |
| `config`      | `Object`  | `{}`        | Custom settings to pass directly to the underlying Select2 instance (including `placeholder`). See [Select2 documentation](https://select2.org/configuration/options-api) for available options. |
| `ajaxOptions` | `Object`  | `null`      | Ajax options for remote data loading.                                                                                                                                 |
| `valueKey`    | `String`  | `'id'`      | Key to use for the option value.                                                                                                                                      |
| `textKey`     | `String`  | `'text'`    | Key to use for the option text.                                                                                                                                       |

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

### Comprehensive Event Reference

All standard Select2 events are available. Here's a complete list:

| Event               | Description                                                | Parameters                          |
| ------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `change`            | Fired when the value changes                               | `(value: string | string[])`       |
| `select`            | Fired when an option is selected                           | `(option: Select2Option)`          |
| `select2:open`      | Triggered when the dropdown opens                           | -                                   |
| `select2:closing`   | Triggered when the dropdown is about to close              | -                                   |
| `select2:closed`    | Triggered when the dropdown has closed                     | -                                   |
| `select2:select`    | Fired when a selection is made                             | `(params: { data: Select2Option })` |
| `select2:unselect`  | Fired when a selection is removed                          | `(params: { data: Select2Option })` |

### Advanced Event Example

```vue
<template>
    <select2-vue
        :options="options"
        v-model="value"
        @select2:opening="onOpening"
        @select2:closing="onClosing"
        @select2:select="onSelect"
        @select2:unselect="onUnselect"
        @change="onChange"
    />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
];

const onOpening = () => console.log('Dropdown opening');
const onClosing = () => console.log('Dropdown closing');
const onSelect = (e) => console.log('Selected:', e.params.data);
const onUnselect = (e) => console.log('Unselected:', e.params.data);
const onChange = (val) => console.log('Value changed:', val);
</script>
```

## Advanced Usage

### Using Global Configuration

Set global Select2 options that apply to all instances:

```vue
<template>
    <div>
        <select2-vue :options="options1" v-model="value1" />
        <select2-vue :options="options2" v-model="value2" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Select2, { setGlobalSelect2Options } from 'select2-vue';

// Set global options for all Select2 instances
setGlobalSelect2Options({
    width: '100%',
    dropdownParent: 'body',
});

const value1 = ref(null);
const value2 = ref(null);
const options1 = [{ id: 1, text: 'A' }];
const options2 = [{ id: 1, text: 'B' }];
</script>
```

### Custom Option Keys

Use custom keys for your options:

```vue
<template>
    <select2-vue
        :options="users"
        v-model="selectedUserId"
        value-key="userId"
        text-key="userName"
        :config="{ placeholder: 'Select a user' }"
    />
</template>

<script setup>
import { ref } from 'vue';

const selectedUserId = ref(null);
const users = [
    { userId: 101, userName: 'Alice Johnson' },
    { userId: 102, userName: 'Bob Smith' },
    { userId: 103, userName: 'Carol White' },
];
</script>
```

### Using Remote Data

You can fetch data dynamically from a remote API using the `config` prop:

```vue
<template>
    <select2-vue :config="select2Settings" v-model="selectedValue" :options="[]" />
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

Here's an example where you can add new tags or select multiple values:

```vue
<template>
    <select2-vue :config="select2Settings" v-model="selectedTags" :options="[]" :multiple="true" placeholder="Select or add tags" />
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

## Troubleshooting & FAQ

### Common Issues

**Q: Why isn't the select box styled?**

A: Make sure you import the Select2 CSS:

```js
import 'select2/dist/css/select2.css';
```

**Q: How do I programmatically set the value?**

A: Use `v-model` or update the ref bound to the component:

```vue
<script setup>
const value = ref('initial-value');

function resetSelection() {
    value.value = null;
}

function setToFirstOption() {
    value.value = 'option-1-id';
}
</script>
```

**Q: The dropdown appears behind other elements**

A: Use the `dropdownParent` config option:

```vue
<script setup>
const config = {
    dropdownParent: 'body', // or a specific element selector
};
</script>
```

**Q: How do I clear the selection?**

A: Set the value to `null`:

```vue
<script setup>
const value = ref('some-value');

function clear() {
    value.value = null;
}
</script>
```

**Q: Why are my options not showing when using `v-model`?**

A: Ensure your options have matching `id` values to what you're setting in `v-model`. Also, the `options` array must be provided.

**Q: Can I use this with Nuxt 3?**

A: Yes! You need to configure it to work with SSR:

```js
// nuxt.config.js
export default {
    build: {
        transpile: ['select2-vue']
    }
}
```

Then wrap the component in a `<ClientOnly>` tag:

```vue
<template>
    <ClientOnly>
        <select2-vue :options="options" v-model="value" />
    </ClientOnly>
</template>
```

### Performance Tips

1. **For large datasets (1000+ options)**: Consider using remote/ajax loading instead of passing all options as props.
2. **Debounce search input**: Use Select2's built-in `delay` option for ajax searches.
3. **Avoid unnecessary re-renders**: Ensure your options array reference is stable when options haven't changed.

## Browser Support

This component supports all modern browsers that support:
- Vue 3
- ES6+ JavaScript
- jQuery 3.7+

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
