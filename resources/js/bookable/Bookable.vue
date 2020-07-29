<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      bookable: null
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `/api/bookables/${this.$route.params.id}`
      );
      this.bookable = response.data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>