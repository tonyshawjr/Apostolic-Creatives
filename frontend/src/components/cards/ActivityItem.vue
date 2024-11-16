<template>
    <div class="flex items-start gap-3">
        <!-- Icon Section -->
        <div 
            :class="iconWrapperClasses" 
            @click="handleIconClick"
            v-if="clickable"
            role="button"
            tabindex="0"
            @keydown.enter="handleIconClick"
            @keydown.space.prevent="handleIconClick"
            :aria-label="iconLabel"
        >
            <slot name="icon" :type="type" :color="iconColor">
                <cached-icon 
                    :path="iconPath" 
                    :color="iconColor"
                />
            </slot>
        </div>
        <div 
            v-else
            :class="iconWrapperClasses"
            aria-hidden="true"
        >
            <slot name="icon" :type="type" :color="iconColor">
                <cached-icon 
                    :path="iconPath" 
                    :color="iconColor"
                />
            </slot>
        </div>

        <!-- Content Section -->
        <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900 break-words">
                <slot 
                    name="message" 
                    :type="type" 
                    :message="message"
                    :raw-time="time"
                >
                    {{ message }}
                </slot>
            </p>
            <p class="text-xs text-gray-500 mt-1">
                <slot 
                    name="time" 
                    :formatted-time="formattedTime"
                    :raw-time="time"
                    :time-format="timeFormat"
                >
                    {{ formattedTime }}
                </slot>
            </p>
        </div>
    </div>
</template>

<script>
import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { defineComponent } from 'vue';

// Cached Icon Component
const CachedIcon = defineComponent({
    name: 'CachedIcon',
    props: {
        path: String,
        color: String
    },
    template: `
        <svg 
            class="h-4 w-4" 
            :class="color" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="path"
            />
        </svg>
    `
});

export default {
    name: 'ActivityItem',
    components: {
        CachedIcon
    },
    props: {
        bgColor: {
            type: String,
            required: true,
            validator: (value) => value.startsWith('bg-')
        },
        iconColor: {
            type: String,
            required: true,
            validator: (value) => value.startsWith('text-')
        },
        iconPath: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true,
            validator: (value) => {
                try {
                    const parsed = parseISO(value);
                    return isValid(parsed);
                } catch {
                    return false;
                }
            }
        },
        type: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
        },
        clickable: {
            type: Boolean,
            default: true
        },
        timeFormat: {
            type: String,
            default: 'relative',
            validator: (value) => ['relative', 'absolute', 'custom'].includes(value)
        },
        customTimeFormat: {
            type: Function,
            default: null
        },
        fallbackTimeDisplay: {
            type: String,
            default: 'Invalid date'
        }
    },

    emits: ['iconClick', 'timeError'],

    computed: {
        parsedTime() {
            try {
                const parsed = parseISO(this.time);
                if (!isValid(parsed)) {
                    this.$emit('timeError', new Error('Invalid date format'));
                    return null;
                }
                return parsed;
            } catch (error) {
                this.$emit('timeError', error);
                return null;
            }
        },

        formattedTime() {
            if (!this.parsedTime) {
                return this.fallbackTimeDisplay;
            }

            try {
                if (this.timeFormat === 'absolute') {
                    return format(this.parsedTime, 'MMM dd, yyyy, h:mm a');
                }

                if (this.timeFormat === 'custom' && this.customTimeFormat) {
                    return this.customTimeFormat(this.parsedTime);
                }

                return formatDistanceToNow(this.parsedTime, { 
                    addSuffix: true,
                    includeSeconds: true 
                });
            } catch (error) {
                this.$emit('timeError', error);
                return this.fallbackTimeDisplay;
            }
        },

        iconLabel() {
            const typeLabels = {
                default: 'Activity',
                success: 'Success',
                warning: 'Warning',
                error: 'Error',
                info: 'Information'
            };
            return `${typeLabels[this.type]} activity - ${this.message}`;
        },

        iconWrapperClasses() {
            return [
                'p-2 rounded-lg',
                this.bgColor,
                this.clickable && 'cursor-pointer hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            ].filter(Boolean);
        }
    },

    methods: {
        handleIconClick() {
            if (this.clickable) {
                this.$emit('iconClick', {
                    type: this.type,
                    time: this.time,
                    message: this.message
                });
            }
        }
    }
};
</script>