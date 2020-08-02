<template>
    <div>
        <div class="row" v-if="error">
            An unknown error has occured, please try again later!
        </div>
        <div class="row" v-else>
            <div :class="[{ 'col-md-4': twoColumns }, { 'd-none': oneColumn }]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading"></div>
                        <div v-if="hasBooking">
                            Stayed at
                            <p>
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: {
                                            id: booking.bookable.bookable_id
                                        }
                                    }"
                                    >{{ booking.bookable.title }}</router-link
                                >
                            </p>
                            <p>From {{ booking.from }} to {{ booking.to }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                :class="[
                    { 'col-md-8': twoColumns },
                    { 'col-md-12': oneColumn }
                ]"
            >
                <div v-if="loading">loading data...</div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You already left a review for this booking! 🎉</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label class="text-muted"
                                >Select the star rating on a scale of 1-5</label
                            >
                            <star-rating
                                class="fa-3x"
                                v-model="review.rating"
                            ></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted"
                                >Describe your experience</label
                            >
                            <textarea
                                name="content"
                                cols="30"
                                rows="10"
                                class="form-control"
                                v-model="review.content"
                            ></textarea>
                        </div>

                        <button
                            @click.prevent="submit"
                            :disabled="loading"
                            class="btn btn-lg btn-block btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404 } from "../utils/response";
export default {
    data() {
        return {
            review: {
                id: null,
                rating: null,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false
        };
    },
    created() {
        this.review.id = this.$route.params.id;
        this.loading = true;
        axios
            .get(`/api/reviews/${this.review.id}`)
            .then(response => {
                this.existingReview = response.data.data;
            })
            .catch(error => {
                if (is404(error)) {
                    return axios
                        .get(`/api/booking-by-review/${this.review.id}`)
                        .then(response => {
                            this.booking = response.data.data;
                        })
                        .catch(error => {
                            this.error = !is404(error);
                        });
                }
                this.error = true;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed;
        },
        twoColumns() {
            return this.loading || !this.alreadyReviewed;
        }
    },
    methods: {
        submit() {
            this.loading = true;
            axios
                .post(`/api/reviews`, this.review)
                .then(response => {
                    console.log(response);
                })
                .catch(err => (this.error = true))
                .finally(() => (this.loading = false));
        }
    }
};
</script>
