<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStar"
            :key="'full' + star"
        ></i>
        <i class="fas fa-star-half-alt" v-if="halfStar"></i>
        <i
            class="far fa-star"
            v-for="star in emptyStar"
            :key="'empty' + star"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        rating: Number
    },
    computed: {
        fullStar() {
            // if rating == 1.9, round(1.9) = 2 full stars
            return Math.round(this.rating);
        },
        halfStar() {
            const fraction = Math.round(
                (this.rating - Math.floor(this.rating)) * 100
            );
            return fraction > 0 && fraction < 50;
        },
        emptyStar() {
            // if rating == 1.9, 5 - ceil(1.9) = 3 empty stars
            return 5 - Math.ceil(this.rating);
        }
    }
};
</script>
