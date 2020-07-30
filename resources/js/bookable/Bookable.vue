<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div v-if="!loading">
              <h2>{{ bookable.title }}</h2>
              <hr>
              <article>{{ bookable.description }}</article>
            </div>
            <div v-else>loading data...</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        Availability & Total Price
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  }
};
</script>