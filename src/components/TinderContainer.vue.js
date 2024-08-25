import { ref, onMounted } from 'vue';
import TinderCard from './TinderCard.vue';
import TinderButtons from './TinderButtons.vue';
import { useMapStore } from '../stores/useMapStore';
import Hammer from 'hammerjs';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const mapStore = useMapStore();
const tinderContainer = ref(null);
const cardRefs = ref([]);
const initCards = () => {
    if (tinderContainer.value) {
        tinderContainer.value.classList.add('loaded');
    }
};
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
        // Update store based on swipe direction
        const index = [...cardRefs.value].indexOf(el);
        if (toX > 0) {
            mapStore.addToLove(index);
        }
        else {
            mapStore.addToNope(index);
        }
    }
    else {
        el.style.transform = '';
    }
    initCards();
};
const handleButtonAction = (love) => {
    // Convert NodeList to an array
    const cardsArray = [...cardRefs.value].filter(card => !card.classList.contains('removed'));
    const moveOutWidth = document.body.clientWidth * 1.5;
    if (!cardsArray.length)
        return;
    const card = cardsArray[0];
    card.classList.add('removed');
    const index = [...cardRefs.value].indexOf(card);
    if (love) {
        card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;
        mapStore.addToLove(index);
    }
    else {
        card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;
        mapStore.addToNope(index);
    }
    initCards();
};
const handleNopeClick = () => handleButtonAction(false);
const handleLoveClick = () => handleButtonAction(true);
const handleImageUploader = (love) => {
    mapStore.genImg(love);
};
onMounted(() => {
    mapStore.loadPanoramasSrc().then(() => {
        mapStore.loadFeatures().then(() => {
            initCards();
            cardRefs.value = tinderContainer.value.querySelectorAll('.tinder--card');
            cardRefs.value.forEach(el => {
                const hammer = new Hammer(el);
                hammer.on('pan', event => handlePan(event, el));
                hammer.on('panend', event => handlePanEnd(event, el));
            });
        });
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
        // @ts-ignore
        [TinderCard,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(TinderCard, new TinderCard({ ...{ 'onPan': {} }, ...{ 'onPanend': {} }, key: ((index)), card: ((card)), index: ((index)), zIndex: ((__VLS_ctx.mapStore.features.length - index)), ref: ("cardRefs"), }));
        const __VLS_1 = __VLS_0({ ...{ 'onPan': {} }, ...{ 'onPanend': {} }, key: ((index)), card: ((card)), index: ((index)), zIndex: ((__VLS_ctx.mapStore.features.length - index)), ref: ("cardRefs"), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({ ...{ 'onPan': {} }, ...{ 'onPanend': {} }, key: ((index)), card: ((card)), index: ((index)), zIndex: ((__VLS_ctx.mapStore.features.length - index)), ref: ("cardRefs"), }));
        // @ts-ignore
        (__VLS_ctx.cardRefs);
        let __VLS_5;
        const __VLS_6 = {
            onPan: (__VLS_ctx.handlePan)
        };
        const __VLS_7 = {
            onPanend: (__VLS_ctx.handlePanEnd)
        };
        const __VLS_4 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(TinderCard, __VLS_1));
        let __VLS_2;
        let __VLS_3;
        // @ts-ignore
        [mapStore, mapStore, cardRefs, handlePan, handlePanEnd,];
    }
    // @ts-ignore
    [TinderButtons,];
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(TinderButtons, new TinderButtons({ ...{ 'onNope': {} }, ...{ 'onLove': {} }, ...{ 'onUpload': {} }, }));
    const __VLS_9 = __VLS_8({ ...{ 'onNope': {} }, ...{ 'onLove': {} }, ...{ 'onUpload': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    ({}({ ...{ 'onNope': {} }, ...{ 'onLove': {} }, ...{ 'onUpload': {} }, }));
    let __VLS_13;
    const __VLS_14 = {
        onNope: (__VLS_ctx.handleNopeClick)
    };
    const __VLS_15 = {
        onLove: (__VLS_ctx.handleLoveClick)
    };
    const __VLS_16 = {
        onUpload: (__VLS_ctx.handleImageUploader)
    };
    const __VLS_12 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(TinderButtons, __VLS_9));
    let __VLS_10;
    let __VLS_11;
    // @ts-ignore
    [handleNopeClick, handleLoveClick, handleImageUploader,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['tinder'];
        __VLS_styleScopedClasses['tinder--status'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-remove'];
        __VLS_styleScopedClasses['fa'];
        __VLS_styleScopedClasses['fa-heart'];
        __VLS_styleScopedClasses['tinder--cards'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                TinderCard: TinderCard,
                TinderButtons: TinderButtons,
                mapStore: mapStore,
                tinderContainer: tinderContainer,
                cardRefs: cardRefs,
                handlePan: handlePan,
                handlePanEnd: handlePanEnd,
                handleNopeClick: handleNopeClick,
                handleLoveClick: handleLoveClick,
                handleImageUploader: handleImageUploader,
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
