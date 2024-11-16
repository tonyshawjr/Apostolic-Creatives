<template>
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
            <h3 class="text-gray-600 font-medium">{{ title }}</h3>
            <div :class="['p-2 rounded-lg', `bg-${color}-100`]">
                <slot name="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </slot>
            </div>
        </div>
        <p class="text-3xl font-bold text-gray-900 mt-4">
            {{ formattedValue }}
        </p>
        <a v-if="link" :href="link" 
           :class="['mt-4 text-sm flex items-center gap-1', `text-${color}-600`, `hover:text-${color}-700`]"
           @click="$emit('click')">
            <slot name="link-text">View Details</slot>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </a>
    </div>
</template>

<script>
export default {
    name: "MetricsCard",
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: [Number, String],
            required: true
        },
        link: {
            type: String,
            required: false
        },
        color: {
            type: String,
            default: "gray",
            validator: (value) => ['gray', 'green', 'yellow', 'blue', 'purple', 'red'].includes(value)
        },
        formatNumber: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        formattedValue() {
            if (this.formatNumber && typeof this.value === 'number') {
                return this.value.toLocaleString();
            }
            return this.value;
        }
    },
    emits: ['click']
};
</script>
