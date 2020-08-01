<template>
    <div>
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

                <button class="btn btn-lg btn-block btn-primary">Submit</button>
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
            loading: false
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
                //
            })
            .finally(() => {
                this.loading = false;
            });
    },
    computed: {
        alreadyReviewed() {
            return this.existingReview !== null;
        }
    }
};
</script>
