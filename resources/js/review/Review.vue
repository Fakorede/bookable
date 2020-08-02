<template>
    <div class="row">
        <div
            :class="[
                { 'col-md-4': loading || !alreadyReviewed },
                { 'd-none': !loading && alreadyReviewed }
            ]"
        >
            <div class="card">
                <div class="card-body">
                    <div v-if="loading"></div>
                    <div v-else>
                        Stayed at
                        <p>
                            <router-link
                                :to="{
                                    name: 'bookable',
                                    params: { id: booking.bookable.bookable_id }
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
                { 'col-md-8': loading || !alreadyReviewed },
                { 'col-md-12': !loading && alreadyReviewed }
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

                    <button class="btn btn-lg btn-block btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: null,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null
        };
    },
    created() {
        this.loading = true;
        axios
            .get(`/api/reviews/${this.$route.params.id}`)
            .then(response => {
                this.existingReview = response.data.data;
            })
            .catch(error => {
                if (
                    error.response &&
                    error.response.status &&
                    404 === error.response.status
                ) {
                    return axios
                        .get(`/api/booking-by-review/${this.$route.params.id}`)
                        .then(response => {
                            this.booking = response.data.data;
                        });
                }
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
        }
    }
};
</script>
