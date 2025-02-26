import { defineConfig, presetUno } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';

export default defineConfig({
    presets: [presetUno(), presetAttributify()],
    preflights: [
        {
            getCSS: () => `
            :root {
                --color-base-100: oklch(97% .0035 67.78);
                --color-base-200: oklch(95% .0081 61.42);
                --color-base-300: oklch(90% .0081 61.42);
                --color-base-content: oklch(40% .0081 61.42);
                --color-primary: oklch(23.27% .0249 284.3);
                --color-primary-content: oklch(94.22% .2505 117.44);
                --color-secondary: oklch(23.27% .0249 284.3);
                --color-secondary-content: oklch(73.92% .2135 50.94);
                --color-accent: oklch(23.27% .0249 284.3);
                --color-accent-content: oklch(88.92% .2061 189.9);
                --color-neutral: oklch(20% 0 0);
                --color-neutral-content: oklch(80% .0081 61.42);
                --color-info: oklch(80.39% .1148 241.68);
                --color-info-content: oklch(30.39% .1148 241.68);
                --color-success: oklch(83.92% .0901 136.87);
                --color-success-content: oklch(23.92% .0901 136.87);
                --color-warning: oklch(83.92% .1085 80);
                --color-warning-content: oklch(43.92% .1085 80);
                --color-error: oklch(75.1% .1814 22.37);
                --color-error-content: oklch(35.1% .1814 22.37);
            }
            [data-theme='dark'] {
                --color-base-100: oklch(30.857% 0.023 264.149);
                --color-base-200: oklch(28.036% 0.019 264.182);
                --color-base-300: oklch(26.346% 0.018 262.177);
                --color-base-content: oklch(82.901% 0.031 222.959);
                --color-primary: oklch(86.133% 0.141 139.549);
                --color-primary-content: oklch(17.226% 0.028 139.549);
                --color-secondary: oklch(73.375% 0.165 35.353);
                --color-secondary-content: oklch(14.675% 0.033 35.353);
                --color-accent: oklch(74.229% 0.133 311.379);
                --color-accent-content: oklch(14.845% 0.026 311.379);
                --color-neutral: oklch(24.731% 0.02 264.094);
                --color-neutral-content: oklch(82.901% 0.031 222.959);
                --color-info: oklch(86.078% 0.142 206.182);
                --color-info-content: oklch(17.215% 0.028 206.182);
                --color-success: oklch(86.171% 0.142 166.534);
                --color-success-content: oklch(17.234% 0.028 166.534);
                --color-warning: oklch(86.163% 0.142 94.818);
                --color-warning-content: oklch(17.232% 0.028 94.818);
                --color-error: oklch(82.418% 0.099 33.756);
                --color-error-content: oklch(16.483% 0.019 33.756);
            }
            *::-webkit-scrollbar {
                width: 8px;
            }
            *::-webkit-scrollbar-thumb {
                background: color-mix(in oklab, var(--color-base-content) 30%, transparent);
                border-radius: 10px;
            }
            input[type='time']::-webkit-calendar-picker-indicator {
                display: none;
            }
          `
        }
    ],
    theme: {
        colors: {
            'base-100': 'var(--color-base-100)',
            'base-200': 'var(--color-base-200)',
            'base-300': 'var(--color-base-300)',
            'base-content': 'var(--color-base-content)',
            primary: 'var(--color-primary)',
            'primary-content': 'var(--color-primary-content)',
            secondary: 'var(--color-secondary)',
            'secondary-content': 'var(--color-secondary-content)',
            accent: 'var(--color-accent)',
            'accent-content': 'var(--color-accent-content)',
            neutral: 'var(--color-neutral)',
            'neutral-content': 'var(--color-neutral-content)',
            info: 'var(--color-info)',
            'info-content': 'var(--color-info-content)',
            success: 'var(--color-success)',
            'success-content': 'var(--color-success-content)',
            warning: 'var(--color-warning)',
            'warning-content': 'var(--color-warning-content)',
            error: 'var(--color-error)',
            'error-content': 'var(--color-error-content)'
        }
    },
    shortcuts: {
        // 药物子项
        'pill-item': [
            'before:content-[attr(aria-label)]',
            'before:block',
            'before:font-600',
            'before:text-3.5',
            'before:text-inherit',
            'after:content-[attr(data-quantity)]',
            'after:block',
            'after:text-xs'
        ],
        // 打卡子项
        'punch-item': ['border-b', 'border-base-300', 'pb-3', 'mb-3', 'last:border-none', 'last:p-0', 'last:m-0'],
        config: [
            'border-[color-mix(in_oklab,_var(--color-base-300),_black_3%)]',
            'border-l-2',
            'border-t-2',
            'bg-base-300',
            'rounded-tl-4',
            'px-3',
            'py-1.5',
            'flex',
            'items-center',
            'justify-end',
            'gap-1'
        ],
        'config-item': ['hover:bg-black/13', 'dark:hover:bg-white/8', 'rounded-full', 'p-1'],
        'setting-item': [
            'text-base-content',
            'bg-base-100',
            'border-[color-mix(in_oklab,_var(--color-base-content)_20%,_transparent)]',
            'border-2',
            'dark:border',
            'hover:bg-black/13',
            'rounded-full',
            'p-1'
        ],
        // 主题
        _topic: [
            'px-3',
            'py-1',
            'rounded-2',
            'flex',
            'items-center',
            'gap-2',
            'font-600',
            'border-base-content',
            'border'
        ],
        'topic-primary': [
            '_topic',
            'bg-primary-content',
            'text-primary',
            'dark:bg-primary',
            'dark:text-primary-content'
        ],
        'topic-secondary': [
            '_topic',
            'bg-secondary-content',
            'text-secondary',
            'dark:bg-secondary',
            'dark:text-secondary-content'
        ],
        'topic-accent': ['_topic', 'bg-accent-content', 'text-accent', 'dark:bg-accent', 'dark:text-accent-content'],
        'topic-neutral': [
            '_topic',
            'bg-neutral-content',
            'text-neutral',
            'dark:bg-neutral',
            'dark:text-neutral-content'
        ],
        'topic-info': ['_topic', 'bg-info', 'text-info-content'],
        'topic-success': ['_topic', 'bg-success', 'text-success-content'],
        'topic-warning': ['_topic', 'bg-warning', 'text-warning-content'],
        'topic-error': ['_topic', 'bg-error', 'text-error-content'],
        'topic-base': ['_topic', 'bg-base-300', 'text-base-content'],
        // 标签
        _tag: ['px-3', 'py-1', 'rounded-2', 'flex', 'items-center', 'gap-2', 'font-600'],
        'tag-primary': ['_tag', 'bg-primary', 'text-primary-content'],
        'tag-secondary': ['_tag', 'bg-secondary', 'text-secondary-content'],
        'tag-accent': ['_tag', 'bg-accent', 'text-accent-content'],
        'tag-neutral': ['_tag', 'bg-neutral', 'text-neutral-content'],
        'tag-info': ['_tag', 'bg-info', 'text-info-content'],
        'tag-success': ['_tag', 'bg-success', 'text-success-content'],
        'tag-warning': ['_tag', 'bg-warning', 'text-warning-content'],
        'tag-error': ['_tag', 'bg-error', 'text-error-content'],
        'tag-base': ['_tag', 'bg-base-300', 'text-base-content'],
        // 图表
        'chart-col-cell': [
            'transition-colors',
            'rounded-2',
            'text-center',
            'leading-none',
            'flex',
            'flex-col',
            'justify-evenly',
            'm-1',
            'h-[calc(100%_-_0.5rem)]'
        ],
        'chart-row-cell': [
            'flex',
            'items-start',
            'justify-center',
            'text-3.5',
            'relative',
            'before:content-empty',
            'before:absolute',
            'before:top-0',
            'before:right-2',
            'before:w-screen',
            'before:h-[1px]',
            'before:bg-base-200',
            'before:z-0'
        ],
        'chart-corner': [],
        'chart-cell': ['relative', 'z-1'],
        'chart-bar': [
            'border-base-content',
            'border',
            'rounded-2.5',
            'absolute',
            'left-1/4',
            'w-1/2',
            'top-0',
            'h-full'
        ],
        'chart-primary': ['bg-primary-content', 'text-primary', 'dark:bg-primary', 'dark:text-primary-content'],
        'chart-secondary': [
            'bg-secondary-content',
            'text-secondary',
            'dark:bg-secondary',
            'dark:text-secondary-content'
        ],
        'chart-accent': ['bg-accent-content', 'text-accent', 'dark:bg-accent', 'dark:text-accent-content'],
        'chart-neutral': ['bg-neutral-content', 'text-neutral', 'dark:bg-neutral', 'dark:text-neutral-content'],
        'chart-info': ['bg-info', 'text-info-content'],
        'chart-success': ['bg-success', 'text-success-content'],
        'chart-warning': ['bg-warning', 'text-warning-content'],
        'chart-error': ['bg-error', 'text-error-content'],
        'chart-base': ['bg-base-300', 'text-base-content'],
        // 次级文字
        'secondary-text': 'text-[color-mix(in_oklab,_var(--color-base-content)_50%,_transparent)]',
        // 卡片
        card: 'border border-base-300 rounded-2 relative',
        'card-editable': [
            'after:content-[attr(data-edit)]',
            'after:absolute',
            'after:left-0',
            'after:right-0',
            'after:top-0',
            'after:bottom-0',
            'after:flex',
            'after:items-center',
            'after:justify-center',
            'after:font-600',
            'after:text-5',
            'after:text-base-100',
            'dark:after:text-base-content',
            'after:bg-transparent',
            'after:rounded-2',
            'after:invisible',
            'hover:after:visible',
            'hover:after:cursor-pointer',
            'hover:after:bg-black/25',
            'hover:after:backdrop-blur-sm'
        ],
        // 分割线
        divider: ['bg-base-300', 'w-full', 'h-px'],
        // 组
        'join-item': ['not-first:border-l-0', 'not-first:rounded-l-0', 'not-last:rounded-r-0'],
        // 提示组件
        alert: [
            'grid',
            'auto-flow-col',
            'items-center',
            'justify-start',
            'cols-[auto_minmax(auto,_1fr)]',
            'gap-4',
            'p-block-3',
            'p-inline-4',
            'text-3.5',
            'leading-5',
            'text-start',
            'border-2',
            'rounded-4'
        ],
        'alert-info': 'text-info-content bg-info border-info',
        'alert-positive': 'text-success-content bg-success border-success',
        'alert-warning': 'text-warning-content bg-warning border-warning',
        'alert-danger': 'text-error-content bg-error border-error',
        // 按钮
        btn: [
            'inline-flex',
            'items-center',
            'justify-center',
            'vertical-middle',
            'gap-1.5',
            'transition-colors',
            'cursor-pointer',
            'appearance-none',
            'bg-transparent',
            'border-transparent',
            'border-2'
        ],
        'btn-circle': ['rounded-full', 'p-0.5'],
        'btn-small': ['rounded-2', 'px-1.5', 'py-1'],
        'btn-medium': ['rounded-2', 'px-4', 'py-1'],
        'btn-large': ['rounded-2', 'px-5', 'py-3'],
        'btn-default': [
            'text-base-content',
            'bg-base-200',
            'border-[color-mix(in_oklab,_var(--color-base-200),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-base-200),_black_7%)]'
        ],
        'btn-primary': [
            'text-primary-content',
            'bg-primary',
            'border-[color-mix(in_oklab,_var(--color-primary),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-primary),_black_7%)]'
        ],
        'btn-secondary': [
            'text-secondary-content',
            'bg-secondary',
            'border-[color-mix(in_oklab,_var(--color-secondary),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-secondary),_black_7%)]'
        ],
        'btn-accent': [
            'text-accent-content',
            'bg-accent',
            'border-[color-mix(in_oklab,_var(--color-accent),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-accent),_black_7%)]'
        ],
        'btn-positive': [
            'text-success-content',
            'bg-success',
            'border-[color-mix(in_oklab,_var(--color-success),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-success),_black_7%)]'
        ],
        'btn-warning': [
            'text-warning-content',
            'bg-warning',
            'border-[color-mix(in_oklab,_var(--color-warning),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-warning),_black_7%)]'
        ],
        'btn-danger': [
            'text-error-content',
            'bg-error',
            'border-[color-mix(in_oklab,_var(--color-error),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-error),_black_7%)]'
        ],
        'btn-info': [
            'text-info-content',
            'bg-info',
            'border-[color-mix(in_oklab,_var(--color-info),_black_5%)]',
            'hover:not-checked:bg-[color-mix(in_oklab,_var(--color-info),_black_7%)]'
        ],
        // 占位符
        'text-placeholder': 'text-[color-mix(in_oklch,_var(--color-base-content)_50%,_transparent)]',
        // 输入框
        input: [
            'appearance-none',
            'bg-transparent',
            'border-none',
            'outline-none',
            'w-full',
            'h-full',
            'inline-block',
            'placeholder:text-placeholder',
            'user-invalid:text-error'
        ],
        'input-outline': ['outline-2', 'outline-solid', 'outline-base-content', 'outline-offset-2'],
        'input-field': [
            'w-[clamp(3rem,_20rem,_100%)]',
            'h-10',
            'p-inline-3',
            'flex',
            'items-center',
            'gap-2',
            'text-3.5',
            'cursor-text',
            'vertical-middle',
            'whitespace-nowrap',
            'bg-base-100',
            'border-2',
            'border-[color-mix(in_oklab,_var(--color-base-content)_20%,_transparent)]',
            'rounded-2',
            'focus:input-outline',
            'focus-within:input-outline',
            'focus:border-base-content',
            'focus-within:border-base-content',
            'isolate'
        ],
        'input-label': [
            'relative',
            'before:content-[attr(data-label)]',
            'before:absolute',
            'before:left-0',
            'before:w-16',
            'before:text-4.5',
            'before:bg-base-100',
            'focus:before:opacity-0',
            'focus-within:before:opacity-0',
            'focus:before:invisible',
            'focus-within:before:invisible'
        ],
        // 下拉框
        'select-menu': [
            'min-w-12',
            'max-w-[80vw]',
            'max-h-52',
            'm-0',
            'p-1.5',
            'overflow-y-auto',
            'text-base-content',
            'bg-base-100',
            'border-2',
            'border-base-content',
            'rounded-2'
        ],
        'select-menu-item': 'px-1.5 py-1 rounded cursor-pointer relative',
        'select-menu-item-focus': 'bg-base-200',
        'select-menu-item-selected': 'text-[color-mix(in_oklab,_var(--color-success),_black_15%)]',
        'select-tag': 'px-1.5 bg-base-200 rounded',
        'select-arrow': 'text-[color-mix(in_oklab,_var(--color-base-content)_20%,_transparent)]',
        // 角标
        badge: [
            'inline-flex',
            'items-center',
            'justify-center',
            'vertical-middle',
            'p-inline-2',
            'h-5',
            'text-3.5',
            'rounded-full',
            'border-2'
        ],
        'badge-ghost': 'text-base-content bg-base-200 border-base-200',
        'badge-soft': [
            'text-[oklch(20%_0_0)]',
            'bg-[color-mix(in_oklab,_oklch(20%_0_0)_8%,_var(--color-base-100))]',
            'border-[color-mix(in_oklab,_oklch(20%_0_0)_10%,_var(--color-base-100))]',
            'dark:text-neutral-content',
            'dark:bg-neutral',
            'dark:border-neutral'
        ],
        'badge-secondary': 'text-secondary-content bg-secondary border-secondary',
        'badge-accent': 'text-accent-content bg-accent border-accent',
        // 选择框
        checkbox: [
            'text-transparent',
            'border-2',
            'rounded-full',
            'appearance-none',
            'align-middle',
            'cursor-pointer',
            'transition-colors',
            'w-4.5',
            'h-4.5',
            'before:content-["✔︎"]',
            'before:block',
            'before:text-3',
            'before:font-600',
            'before:ml-[2px]',
            'before:mt-[2px]',
            'before:leading-none'
        ],
        'checkbox-primary': ['border-primary', 'checked:bg-primary', 'checked:text-primary-content'],
        'checkbox-secondary': ['border-secondary', 'checked:bg-secondary', 'checked:text-secondary-content'],
        'checkbox-accent': ['border-accent', 'checked:bg-accent', 'checked:text-accent-content'],
        'checkbox-info': ['border-info', 'checked:bg-info', 'checked:text-info-content'],
        'checkbox-label': ['flex', 'gap-1', 'items-baseline'],
        marker: [
            'pl-4',
            'relative',
            'before:content-empty',
            'before:absolute',
            'before:left-0',
            'before:top-1/2',
            'before:-translate-y-[0.2em]',
            'before:w-[0.5em]',
            'before:h-[0.5em]',
            'before:rounded-full',
            'before:bg-secondary-content',
            'dark:before:bg-secondary'
        ]
    },
    safelist: [
        'alert-info',
        'alert-positive',
        'alert-warning',
        'alert-danger',
        'tag-primary',
        'tag-secondary',
        'tag-accent',
        'tag-neutral',
        'tag-info',
        'tag-success',
        'tag-warning',
        'tag-error',
        'tag-base',
        'topic-primary',
        'topic-secondary',
        'topic-accent',
        'topic-neutral',
        'topic-info',
        'topic-success',
        'topic-warning',
        'topic-error',
        'topic-base',
        'chart-primary',
        'chart-secondary',
        'chart-accent',
        'chart-neutral',
        'chart-info',
        'chart-success',
        'chart-warning',
        'chart-error',
        'chart-base'
    ],
    rules: [
        ['user-select-none', { 'user-select': 'none' }],
        [
            'drawer-side-transition',
            { transition: 'opacity 0.2s ease-out 0.1s allow-discrete, visibility 0.3s ease-out 0.1s allow-discrete' }
        ],
        ['drawer-content-transition', { transition: 'translate 0.3s ease-out' }]
    ]
});
