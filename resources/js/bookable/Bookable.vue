<template>
    <div>
        <div class="row">
            <div class="col-md-8 pb-4">
                <div class="card">
                    <div class="card-body">
                        <div v-if="!loading">
                            <h2>{{ bookable.title }}</h2>
                            <hr />
                            <article>{{ bookable.description }}</article>
                        </div>
                        <div v-else>loading data...</div>
                    </div>
                </div>
                <review-list :bookable-id="this.$route.params.id"></review-list>
            </div>
            <div class="col-md-4 pb-4">
                <availability
                    :bookable-id="this.$route.params.id"
                    @availability="checkPrice($event)"
                ></availability>
            </div>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";

export default {
    components: {
        Availability,
        ReviewList
    },
    data() {
        return {
            bookable: null,
            loading: false
        };
    },
    async created() {
        this.loading = true;
        try {
            const response = await axios.get(
                `/api/bookables/${this.$route.params.id}`
            );
            this.bookable = response.data.data;
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        checkPrice(hasAvailability) {
            console.log(hasAvailability);
        }
    }
};
</script>
