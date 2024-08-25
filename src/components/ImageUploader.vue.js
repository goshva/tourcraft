import { ref } from 'vue';
export default (await import('vue')).defineComponent({
    setup() {
        const base64Image = ref(null); // Base64 encoded image
        const handleFileUpload = (event) => {
            const file = event.target.files[0]; // Get the first file from the input
            if (file) {
                const reader = new FileReader(); // Create a FileReader instance
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        const MAX_WIDTH = 420;
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        // Calculate the new height while maintaining the aspect ratio
                        const scaleFactor = MAX_WIDTH / img.width;
                        const newWidth = MAX_WIDTH;
                        const newHeight = img.height * scaleFactor;
                        // Set canvas dimensions
                        canvas.width = newWidth;
                        canvas.height = newHeight;
                        // Draw the resized image onto the canvas
                        ctx.drawImage(img, 0, 0, newWidth, newHeight);
                        // Convert canvas to Base64 string
                        base64Image.value = canvas.toDataURL('image/jpeg');
                    };
                };
                reader.readAsDataURL(file); // Read the file as a data URL (Base64)
            }
        };
        return {
            base64Image,
            handleFileUpload,
        };
    },
});
;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("image-uploader") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.handleFileUpload) }, type: ("file"), accept: ("image/*"), });
    // @ts-ignore
    [handleFileUpload,];
    if (__VLS_ctx.base64Image) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("preview") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        // @ts-ignore
        [base64Image,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.base64Image)), rows: ("10"), cols: ("50"), });
        // @ts-ignore
        [base64Image,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.base64Image)), alt: ("Uploaded Image"), });
        // @ts-ignore
        [base64Image,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['image-uploader'];
        __VLS_styleScopedClasses['preview'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = undefined;
    let __VLS_internalComponent;
}
