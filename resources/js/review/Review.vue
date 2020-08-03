<template>
    <div>
        <fatal-error v-if="error"></fatal-error>
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
                                :class="[{ 'is-invalid': errorFor('content') }]"
                            ></textarea>

                            <v-errors :errors="errorFor('content')"></v-errors>
                        </div>

                        <button
                            @click.prevent="submit"
                            :disabled="sending"
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
import { is404, is422 } from "../utils/response";
import vaidationErrors from "../mixins/validationErrors";

export default {
    mixins: [vaidationErrors],
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
            error: false,
            sending: false
        };
    },
    async created() {
        this.review.id = this.$route.params.id;
        this.loading = true;

        try {
            this.existingReview = (
                await axios.get(`/api/reviews/${this.review.id}`)
            ).data.data;
        } catch (error) {
            if (is404(error)) {
                try {
                    this.booking = (
                        await axios.get(
                            `/api/booking-by-review/${this.review.id}`
                        )
                    ).data.data;
                } catch (error) {
                    this.error = !is404(error);
                }
            } else {
                this.error = true;
            }
        }

        this.loading = false;
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
            this.errors = null;
            this.sending = true;

            axios
                .post(`/api/reviews`, this.review)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    if (is422(err)) {
                        const errors = err.response.data.errors;
                        if (errors["content"]) {
                            // && _.size(errors) === 1
                            this.errors = errors;
                            return;
                        }
                    }

                    this.error = true;
                })
                .finally(() => (this.sending = false));
        }
    }
};
</script>
