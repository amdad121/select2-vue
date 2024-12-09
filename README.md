# Select2 Component for VueJS

A Vue 3 component wrapper for Select2 using jQuery.

## Installation

Install the package via npm:

```bash
npm install select2-vue
```

## Usage

Here’s an example of how to use the component:

```vue
<template>
    <MySelect2 v-model="selectedValue" :options="options" :multiple="true" />
</template>

<script>
import MySelect2 from 'vue-select2-component';

export default {
    components: {
        MySelect2,
    },
    data() {
        return {
            selectedValue: [],
            options: [
                { value: '1', text: 'Option 1' },
                { value: '2', text: 'Option 2' },
            ],
        };
    },
};
</script>
```

Make sure to import the necessary CSS:

```js
import 'select2/dist/css/select2.css';
```

## License

MIT
