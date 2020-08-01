<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStar"
            :key="'full' + star"
            @click="$emit('input', star)"
        ></i>
        <i class="fas fa-star-half-alt" v-if="halfStar"></i>
        <i
            class="far fa-star"
            v-for="star in emptyStar"
            :key="'empty' + star"
            @click="$emit('input', fullStar + star)"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        value: Number
    },
    computed: {
        fullStar() {
            // if value == 1.9, round(1.9) = 2 full stars
            return Math.round(this.value);
        },
        halfStar() {
            const fraction = Math.round(
                (this.value - Math.floor(this.value)) * 100
            );
            return fraction > 0 && fraction < 50;
        },
        emptyStar() {
            // if value == 1.9, 5 - ceil(1.9) = 3 empty stars
            return 5 - Math.ceil(this.value);
        }
    }
};
</script>
