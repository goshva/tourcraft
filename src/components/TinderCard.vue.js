import { computed, ref, onMounted } from 'vue';
import Hammer from 'hammerjs';
import { useMapStore } from '../stores/useMapStore'; // Ensure the path to your store is correct
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Props from parent
const props = defineProps({
    card: Object,
    index: Number,
    zIndex: Number
});
// Reference to the card DOM element
const cardRef = ref(null);
// Use the map store
const mapStore = useMapStore();
// Fetch panorama image source based on coordinates
const imgSrc = computed(() => {
    if (!props.card.coordinates || props.card.coordinates.length !== 2) {
        return '../500x240.png'; // Return a default placeholder image if coordinates are not valid
    }
    const [lng, lat] = props.card.coordinates;
    const coordinatesString = `${lng.toFixed(6)}%2C${lat.toFixed(6)}`;
    // Call the store action to get panorama source
    return mapStore.getPanoramasSrc(coordinatesString);
});
// Computed property to construct Yandex Maps link using card coordinates
const yandexMapLink = computed(() => {
    if (!props.card.coordinates || props.card.coordinates.length !== 2) {
        return '#'; // Return a default link if coordinates are not valid
    }
    const [lng, lat] = props.card.coordinates;
    // Construct Yandex Maps URL
    return `https://yandex.ru/maps/?ll=${lng}%2C${lat}&z=16&mode=search&sll=${lng}%2C${lat}&text=${encodeURIComponent(props.card.title || 'Location')}`;
});
// Emit events for pan and panend
const emit = defineEmits(['pan', 'panend']);
onMounted(() => {
    const hammer = new Hammer(cardRef.value);
    hammer.on('pan', event => emit('pan', event, cardRef.value));
    hammer.on('panend', event => emit('panend', event, cardRef.value));
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        card: Object,
        index: Number,
        zIndex: Number
    },
    emits: {},
});
;
let __VLS_functionalComponentProps;
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tinder--card") }, ...{ style: (({
                background: __VLS_ctx.card.background || '',
                zIndex: __VLS_ctx.zIndex
            })) }, ref: ("cardRef"), });
    // @ts-ignore
    (__VLS_ctx.cardRef);
    if (__VLS_ctx.card.content.text) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.card.content.text);
        // @ts-ignore
        [card, card, card, zIndex, cardRef,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imgSrc || `./500x240.png`)), alt: ("Card image"), });
    // @ts-ignore
    [imgSrc,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.yandexMapLink)), target: ("_blank"), });
    // @ts-ignore
    [yandexMapLink,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.card.title);
    // @ts-ignore
    [card,];
    if (__VLS_ctx.card.content.text) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.card.content.text);
        // @ts-ignore
        [card, card,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['tinder--card'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                $props: __VLS_makeOptional(props),
                ...props,
                $emit: emit,
                cardRef: cardRef,
                imgSrc: imgSrc,
                yandexMapLink: yandexMapLink,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
;
