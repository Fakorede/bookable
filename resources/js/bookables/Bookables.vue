<template>
  <div>
    <div v-if="loading">Loading data...</div>
    <div v-else>
      <div
        class="row mb-4"
        v-for="row in rows"
        :key="'row' + row"
      >
        <div
          class="col d-flex align-items-stretch"
          v-for="(bookable, column) in bookablesInRow(row)"
          :key="'row' + row + column"
        >
          <bookable-item v-bind="bookable"></bookable-item>
        </div>

        <div
          class="col"
          v-for="p in placeholdersInRow(row)"
          :key="'placeholder' + row + p"
        ></div>
      </div>

    </div>
  </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
  components: {
    bookableItem: BookableListItem
  },
  data() {
    return {
      bookables: null,
      loading: false,
      columns: 3
    };
  },
  methods: {
    bookablesInRow(row) {
      return this.bookables.slice((row - 1) * this.columns, row * this.columns);
    },
    placeholdersInRow(row) {
      return this.columns - this.bookablesInRow(row).length;
    }
  },
  computed: {
    rows() {
      return this.bookables === null
        ? 0
        : Math.ceil(this.bookables.length / this.columns);
    }
  },
  async created() {
    this.loading = true;

    try {
      const response = await axios.get("/api/bookables");
      this.bookables = response.data;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>