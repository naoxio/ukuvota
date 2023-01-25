<script lang="ts" setup>
import Icon from 'atoms/Icon.vue';
import { ref, watchEffect } from 'vue'

const props = defineProps({
    error: Boolean,
    success: Boolean,
    icon: String,
    trigger: Boolean,
})

const visible = ref(false)
const trig = ref(false)
watchEffect(() => {
    if (trig.value === props.trigger) return
    trig.value = props.trigger
    if (!visible.value) {
        visible.value = true
        setTimeout(() => {
            visible.value = false
        }, 4000)
    }

})


</script>
<template>
    <div v-if="visible" class="alert w-80 shadow-lg m-2 cursor-pointer" @click="visible = false" :class="{ 'alert-error': error, 'alert-success': success}" >
        <div>
            <Suspense>
                <Icon width="32" :name="icon" />
            </Suspense>
            <span><slot/></span>
        </div>
    </div>
</template>