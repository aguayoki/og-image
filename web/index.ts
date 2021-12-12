import { ParsedRequest, Theme, FileType } from '../api/_lib/types';
const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div',
        { className: wrapper },
        H('select',
            { onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
        H('div',
            { className: arrow },
            '▼'
        )
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface ButtonProps {
    label: string;
    onclick: () => void;
}

const Button = ({ label, onclick }: ButtonProps) => {
    return H('button', { onclick }, label);
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label',
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

const fileTypeOptions: DropdownOption[] = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

const fontSizeOptions: DropdownOption[] = Array
    .from({ length: 24 })
    .map((_, i) => i * 12)
    .filter(n => n < 108)
    .map(n => ({ text: n + 'px', value: n + 'px' }));

const markdownOptions: DropdownOption[] = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];

const imageLightOptions: DropdownOption[] = [
  { text: 'EA', value: 'https://eduardoaguayo.cl/assets/favicons/favicon.svg' },
  { text: 'user-story', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-story-dark.svg' },
  { text: 'marker-pens', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/marker-pens-dark.svg' },
  { text: 'usability-testing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/usability-testing-dark.svg' },
  { text: 'motivation', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/motivation-dark.svg' },
  { text: 'approach', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/approach-dark.svg' },
  { text: 'workshop', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/workshop-dark.svg' },
  { text: 'sticky-notes', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/sticky-notes-dark.svg' },
  { text: 'user-journey', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-journey-dark.svg' },
  { text: 'wireframe', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/wireframe-dark.svg' },
  { text: 'user-needs', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-needs-dark.svg' },
  { text: 'presentation', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/presentation-dark.svg' },
  { text: 'summary-report', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/summary-report-dark.svg' },
  { text: 'write-notes', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/write-notes-dark.svg' },
  { text: 'persona', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/persona-dark.svg' },
  { text: 'strategy', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/strategy-dark.svg' },
  { text: 'user-testing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-testing-dark.svg' },
  { text: 'question', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/question-dark.svg' },
  { text: 'stopwatch', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/stopwatch-dark.svg' },
  { text: 'steps', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/steps-dark.svg' },
  { text: 'goal', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/goal-dark.svg' },
  { text: 'meeting', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/meeting-dark.svg' },
  { text: 'prioritise', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/prioritise-dark.svg' },
  { text: 'roadmap', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/roadmap-dark.svg' },
  { text: 'post-it', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/post-it-dark.svg' },
  { text: 'painpoint', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/painpoint-dark.svg' },
  { text: 'task-analysis', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/task-analysis-dark.svg' },
  { text: 'draft', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/draft-dark.svg' },
  { text: 'planning', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/planning-dark.svg' },
  { text: 'client', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/client-dark.svg' },
  { text: 'solution', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/solution-dark.svg' },
  { text: 'design-thinking', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/design-thinking-dark.svg' },
  { text: 'competitors', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/competitors-dark.svg' },
  { text: 'problem', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/problem-dark.svg' },
  { text: 'problem-solving', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/problem-solving-dark.svg' },
  { text: 'idea', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/idea-dark.svg' },
  { text: 'user-research', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-research-dark.svg' },
  { text: 'product-design', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/product-design-dark.svg' },
  { text: 'development', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/development-dark.svg' },
  { text: 'product-phasing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/product-phasing-dark.svg' },
  { text: 'mindmap', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/mindmap-dark.svg' },
  { text: 'timeline', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/timeline-dark.svg' },
  { text: 'organize', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/organize-dark.svg' },
  { text: 'interview', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/interview-dark.svg' },
  { text: 'discovery', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/discovery-dark.svg' },
  { text: 'brainstorm', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/brainstorm-dark.svg' },
  { text: 'kickoff', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/kickoff-dark.svg' }
];

const imageDarkOptions: DropdownOption[] = [
  { text: 'EA', value: 'https://eduardoaguayo.cl/assets/favicons/favicon.svg' },
  { text: 'user-story', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-story-light.svg' },
  { text: 'marker-pens', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/marker-pens-light.svg' },
  { text: 'usability-testing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/usability-testing-light.svg' },
  { text: 'motivation', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/motivation-light.svg' },
  { text: 'approach', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/approach-light.svg' },
  { text: 'workshop', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/workshop-light.svg' },
  { text: 'sticky-notes', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/sticky-notes-light.svg' },
  { text: 'user-journey', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-journey-light.svg' },
  { text: 'wireframe', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/wireframe-light.svg' },
  { text: 'user-needs', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-needs-light.svg' },
  { text: 'presentation', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/presentation-light.svg' },
  { text: 'summary-report', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/summary-report-light.svg' },
  { text: 'write-notes', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/write-notes-light.svg' },
  { text: 'persona', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/persona-light.svg' },
  { text: 'strategy', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/strategy-light.svg' },
  { text: 'user-testing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-testing-light.svg' },
  { text: 'question', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/question-light.svg' },
  { text: 'stopwatch', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/stopwatch-light.svg' },
  { text: 'steps', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/steps-light.svg' },
  { text: 'goal', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/goal-light.svg' },
  { text: 'meeting', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/meeting-light.svg' },
  { text: 'prioritise', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/prioritise-light.svg' },
  { text: 'roadmap', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/roadmap-light.svg' },
  { text: 'post-it', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/post-it-light.svg' },
  { text: 'painpoint', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/painpoint-light.svg' },
  { text: 'task-analysis', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/task-analysis-light.svg' },
  { text: 'draft', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/draft-light.svg' },
  { text: 'planning', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/planning-light.svg' },
  { text: 'client', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/client-light.svg' },
  { text: 'solution', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/solution-light.svg' },
  { text: 'design-thinking', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/design-thinking-light.svg' },
  { text: 'competitors', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/competitors-light.svg' },
  { text: 'problem', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/problem-light.svg' },
  { text: 'problem-solving', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/problem-solving-light.svg' },
  { text: 'idea', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/idea-light.svg' },
  { text: 'user-research', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/user-research-light.svg' },
  { text: 'product-design', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/product-design-light.svg' },
  { text: 'development', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/development-light.svg' },
  { text: 'product-phasing', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/product-phasing-light.svg' },
  { text: 'mindmap', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/mindmap-light.svg' },
  { text: 'timeline', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/timeline-light.svg' },
  { text: 'organize', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/organize-light.svg' },
  { text: 'interview', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/interview-light.svg' },
  { text: 'discovery', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/discovery-light.svg' },
  { text: 'brainstorm', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/brainstorm-light.svg' },
  { text: 'kickoff', value: 'https://eduardoaguayo.cl/assets/dailypm-ux-workshop/kickoff-light.svg' }
];

const widthOptions = [
    { text: 'width', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];

const heightOptions = [
    { text: 'height', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
    widths: string[];
    heights: string[];
    overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        fileType = 'png',
        fontSize = '48px',
        theme = 'light',
        md = true,
        text = '**Eduardo** Aguayo',
        images=[imageLightOptions[0].value],
        widths=[],
        heights=[],
        showToast = false,
        messageToast = '',
        loading = true,
        selectedImageIndex = 0,
        overrideUrl = null,
    } = state;
    const mdValue = md ? '1' : '0';
    const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('fontSize', fontSize);
    for (let image of images) {
        url.searchParams.append('images', image);
    }
    for (let width of widths) {
        url.searchParams.append('widths', width);
    }
    for (let height of heights) {
        url.searchParams.append('heights', height);
    }

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Theme',
                    input: H(Dropdown, {
                        options: themeOptions,
                        value: theme,
                        onchange: (val: Theme) => {
                            const options = val === 'light' ? imageLightOptions : imageDarkOptions
                            let clone = [...images];
                            clone[0] = options[selectedImageIndex].value;
                            setLoadingState({ theme: val, images: clone });
                        }
                    })
                }),
                H(Field, {
                    label: 'File Type',
                    input: H(Dropdown, {
                        options: fileTypeOptions,
                        value: fileType,
                        onchange: (val: FileType) => setLoadingState({ fileType: val })
                    })
                }),
                H(Field, {
                    label: 'Font Size',
                    input: H(Dropdown, {
                        options: fontSizeOptions,
                        value: fontSize,
                        onchange: (val: string) => setLoadingState({ fontSize: val })
                    })
                }),
                H(Field, {
                    label: 'Text Type',
                    input: H(Dropdown, {
                        options: markdownOptions,
                        value: mdValue,
                        onchange: (val: string) => setLoadingState({ md: val === '1' })
                    })
                }),
                H(Field, {
                    label: 'Text Input',
                    input: H(TextInput, {
                        value: text,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ text: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Image 1',
                    input: H('div',
                        H(Dropdown, {
                            options: imageOptions,
                            value: imageOptions[selectedImageIndex].value,
                            onchange: (val: string) =>  {
                                let clone = [...images];
                                clone[0] = val;
                                const selected = imageOptions.map(o => o.value).indexOf(val);
                                setLoadingState({ images: clone, selectedImageIndex: selected });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(Dropdown, {
                                options: widthOptions,
                                value: widths[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[0] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(Dropdown, {
                                options: heightOptions,
                                value: heights[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[0] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        )
                    ),
                }),
                ...images.slice(1).map((image, i) => H(Field, {
                    label: `Image ${i + 2}`,
                    input: H('div',
                        H(TextInput, {
                            value: image,
                            oninput: (val: string) => {
                                let clone = [...images];
                                clone[i + 1] = val;
                                setLoadingState({ images: clone, overrideUrl: url });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(Dropdown, {
                                options: widthOptions,
                                value: widths[i + 1],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[i + 1] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(Dropdown, {
                                options: heightOptions,
                                value: heights[i + 1],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[i + 1] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        ),
                        H('div',
                            { className: 'field-flex' },
                            H(Button, {
                                label: `Remove Image ${i + 2}`,
                                onclick: (e: MouseEvent) => {
                                    e.preventDefault();
                                    const filter = (arr: any[]) => [...arr].filter((_, n) => n !== i + 1);
                                    const imagesClone = filter(images);
                                    const widthsClone = filter(widths);
                                    const heightsClone = filter(heights);
                                    setLoadingState({ images: imagesClone, widths: widthsClone, heights: heightsClone });
                                }
                            })
                        )
                    )
                })),
                H(Field, {
                    label: `Image ${images.length + 1}`,
                    input: H(Button, {
                        label: `Add Image ${images.length + 1}`,
                        onclick: () => {
                            const nextImage = images.length === 1
                                ? 'https://eduardoaguayo.cl/assets/favicons/favicon.svg'
                                : '';
                            setLoadingState({ images: [...images, nextImage] })
                        }
                    }),
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
