import { ref, onMounted } from 'vue';
import Hammer from 'hammerjs';
import { useMapStore } from '../stores/useMapStore';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const cards = ref([
    {
        background: '#e7c1e1',
        imgSrc: 'https://www.careerslive.london/assets/img/hand.gif',
        title: 'Листай',
    },
    {
        imgSrc: 'https://sun9-17.userapi.com/impf/Id1_N41IsAWLfARgOCdAOJM6995defM1MJCEBg/Ilxncs2R9n0.jpg?size=1080x629&quality=95&sign=e6bc01c0e2262db586ead53f6a9c9c76&type=album',
        title: 'Видеоблогинг',
        description: 'Учимся делать качественный видеоконтент, уверенно держаться перед камерой и продвигать свой канал в YouTube и TikTok.',
    },
    {
        imgSrc: 'https://sun9-33.userapi.com/impf/qqKQ9Z7aZ5NKB41mXxKecOkdL2Cw4WoeLTs5gg/mABnJUyk4MQ.jpg?size=1080x544&quality=95&sign=46c85b09cf199b1cbef5e8ee3df31b06&type=album',
        title: 'Геймдизайн',
        description: 'Какими бы разными ни были дети, всех их объединяет одно: они любят игры! Мы научим их создавать свои. И поможем сделать первый шаг к востребованной профессии.',
    },
    // Add more cards here...
]);
const tinderContainer = ref(null);
const cardRefs = ref([]);
// Calculate the card transform based on index
const getCardTransform = (index) => `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
// Calculate the card opacity based on index
const getCardOpacity = (index) => (10 - index) / 10;
// Initialize cards stack
const initCards = () => {
    if (tinderContainer.value) {
        tinderContainer.value.classList.add('loaded');
    }
};
// Handle swipe events
const handlePan = (event, el) => {
    el.classList.add('moving');
    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0))
        return;
    tinderContainer.value.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.value.classList.toggle('tinder_nope', event.deltaX < 0);
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;
    el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
};
// Handle the end of the swipe
const handlePanEnd = (event, el) => {
    el.classList.remove('moving');
    tinderContainer.value.classList.remove('tinder_love', 'tinder_nope');
    const moveOutWidth = document.body.clientWidth;
    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (!keep) {
        const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * moveOutWidth;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;
        el.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
        el.classList.add('removed');
    }
    else {
        el.style.transform = '';
    }
    initCards();
};
// Handle button actions (like/dislike)
const handleButtonAction = (love) => {
    const cardsArray = cardRefs.value.filter(card => !card.classList.contains('removed'));
    const moveOutWidth = document.body.clientWidth * 1.5;
    if (!cardsArray.length)
        return;
    const card = cardsArray[0];
    card.classList.add('removed');
    if (love) {
        card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
    }
    else {
        card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
    }
    initCards();
};
const handleNopeClick = () => handleButtonAction(false);
const handleLoveClick = () => handleButtonAction(true);
const phoneMe = () => {
    window.location.replace('tel:+79620002200');
};
const whatsapp = () => {
    window.location.replace('https://chat.whatsapp.com/DaNtmgQ74GdCixHxdOBAVA');
};
// Setup Hammer.js events on mount
onMounted(() => {
    mapStore.loadFeatures().then(() => {
        initCards();
    });
    // Populate cardRefs with actual card elements
    cardRefs.value = tinderContainer.value.querySelectorAll('.tinder--card');
    cardRefs.value.forEach(el => {
        const hammer = new Hammer(el);
        hammer.on('pan', event => handlePan(event, el));
        hammer.on('panend', event => handlePanEnd(event, el));
    });
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tinder") }, ref: ("tinderContainer"), });
    // @ts-ignore
    (__VLS_ctx.tinderContainer);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tinder--status") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa fa-remove") }, });
    // @ts-ignore
    [tinderContainer,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa fa-heart") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tinder--cards") }, });
    for (const [card, index] of __VLS_getVForSourceType((__VLS_ctx.mapStore.features))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: ("tinder--card") }, ...{ style: (({
                    background: card.background || '',
                    zIndex: __VLS_ctx.mapStore.features.length - index,
                    /*transform: getCardTransform(index),
                    opacity: getCardOpacity(index)*/
                })) }, ref: ("cardRefs"), });
        // @ts-ignore
        (__VLS_ctx.cardRefs);
        if (card.content.text) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (card.content.text);
            // @ts-ignore
            [mapStore, mapStore, cardRefs,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((card.imgSrc || `https://picsum.photos/400/300/?=${index}`)), alt: ("Card image"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (card.title);
        if (card.content.text) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (card.content.text);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tinder--buttons") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleNopeClick) }, id: ("nope"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa fa-trash") }, });
    // @ts-ignore
    [handleNopeClick,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleLoveClick) }, id: ("love"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("fa fa-shopping-cart") }, });
    // @ts-ignore
    [handleLoveClick,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['tinder'];
        __VLS_styleScopedClasses['tinder--status'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-remove'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-heart'];
        __VLS_styleScopedClasses['tinder--cards'];
        __VLS_styleScopedClasses['tinder--card'];
        __VLS_styleScopedClasses['tinder--buttons'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-trash'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-shopping-cart'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                mapStore: mapStore,
                tinderContainer: tinderContainer,
                cardRefs: cardRefs,
                handleNopeClick: handleNopeClick,
                handleLoveClick: handleLoveClick,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
